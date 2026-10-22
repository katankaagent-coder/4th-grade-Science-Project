#!/usr/bin/env python3
"""Generate cached TTS mp3 + word timings via edge-tts and ffmpeg."""

from __future__ import annotations

import argparse
import asyncio
import hashlib
import json
import os
import re
import subprocess
import sys
import tempfile
import time
from pathlib import Path

import edge_tts

VOICE = "en-US-AvaMultilingualNeural"
RATE = "-6%"
CONCURRENCY = 6
MAX_RETRIES = 3
PROGRESS_EVERY = 25

TOOLS_DIR = Path(__file__).resolve().parent
OPUS_DIR = TOOLS_DIR.parent
DEFAULT_TEXTS = OPUS_DIR / ".voice-cache" / "texts.json"
CACHE_DIR = OPUS_DIR / ".voice-cache"


def text_key(text: str) -> str:
    return hashlib.sha1(text.encode("utf-8")).hexdigest()


def word_boundary_timing(chunk: dict) -> list:
    """Return [startMs, durMs, word] from a WordBoundary chunk."""
    offset = chunk.get("offset", chunk.get("Offset", 0))
    duration = chunk.get("duration", chunk.get("Duration", 0))
    word = chunk.get("text", chunk.get("Text", ""))
    start_ms = int(offset) // 10000
    dur_ms = int(duration) // 10000
    return [start_ms, dur_ms, word]


async def synthesize_one(text: str, mp3_path: Path, json_path: Path) -> None:
    communicate = edge_tts.Communicate(
        text, VOICE, rate=RATE, boundary="WordBoundary"
    )
    audio_chunks: list[bytes] = []
    timings: list[list] = []

    async for chunk in communicate.stream():
        if chunk["type"] == "audio":
            audio_chunks.append(chunk["data"])
        elif chunk["type"] == "WordBoundary":
            timings.append(word_boundary_timing(chunk))

    raw = b"".join(audio_chunks)
    if not raw:
        raise RuntimeError("No audio data received")

    with tempfile.NamedTemporaryFile(suffix=".mp3", delete=False) as tmp:
        tmp_path = Path(tmp.name)
        tmp.write(raw)

    try:
        subprocess.run(
            [
                "ffmpeg",
                "-y",
                "-loglevel",
                "error",
                "-i",
                str(tmp_path),
                "-ac",
                "1",
                "-ar",
                "22050",
                "-b:a",
                "20k",
                str(mp3_path),
            ],
            check=True,
        )
    finally:
        tmp_path.unlink(missing_ok=True)

    json_path.write_text(json.dumps({"w": timings}, separators=(",", ":")), encoding="utf-8")


async def process_text(
    sem: asyncio.Semaphore,
    text: str,
    stats: dict,
    index: int,
    total: int,
) -> None:
    key = text_key(text)
    mp3_path = CACHE_DIR / f"{key}.mp3"
    json_path = CACHE_DIR / f"{key}.json"

    if mp3_path.is_file() and json_path.is_file():
        stats["skipped"] += 1
        return

    for attempt in range(1, MAX_RETRIES + 1):
        try:
            async with sem:
                await synthesize_one(text, mp3_path, json_path)
            stats["made"] += 1
            return
        except Exception as exc:
            if attempt >= MAX_RETRIES:
                stats["failed"] += 1
                stats["errors"].append(f"{key[:8]}… {exc}")
                mp3_path.unlink(missing_ok=True)
                json_path.unlink(missing_ok=True)
            else:
                await asyncio.sleep(0.5 * (2 ** (attempt - 1)))


def cleanup_stale(valid_keys: set[str]) -> int:
    removed = 0
    if not CACHE_DIR.is_dir():
        return 0
    for path in CACHE_DIR.iterdir():
        m = re.match(r"^([a-f0-9]{40})\.(mp3|json)$", path.name)
        if m and m.group(1) not in valid_keys:
            path.unlink(missing_ok=True)
            removed += 1
    return removed


async def verify_word_boundary_fields() -> None:
    """One-shot probe so we log field names for edge-tts 7.x."""
    communicate = edge_tts.Communicate(
        "Short test.", VOICE, rate=RATE, boundary="WordBoundary"
    )
    async for chunk in communicate.stream():
        if chunk["type"] == "WordBoundary":
            keys = sorted(k for k in chunk.keys() if k != "type")
            print(f"WordBoundary fields: {keys}")
            return
    print("WordBoundary fields: (none received in probe)")


async def run(texts_path: Path) -> int:
    await verify_word_boundary_fields()

    if not texts_path.is_file():
        print(f"Missing texts file: {texts_path}", file=sys.stderr)
        return 1

    texts: list[str] = json.loads(texts_path.read_text(encoding="utf-8"))
    CACHE_DIR.mkdir(parents=True, exist_ok=True)

    valid_keys = {text_key(t) for t in texts}
    stale = cleanup_stale(valid_keys)
    if stale:
        print(f"Removed {stale} stale cache file(s)")

    stats = {"made": 0, "skipped": 0, "failed": 0, "errors": []}
    sem = asyncio.Semaphore(CONCURRENCY)
    total = len(texts)

    async def wrapped(i: int, text: str) -> None:
        await process_text(sem, text, stats, i, total)
        done = stats["made"] + stats["skipped"] + stats["failed"]
        if done % PROGRESS_EVERY == 0 or done == total:
            print(f"Progress: {done}/{total} (made {stats['made']}, skipped {stats['skipped']}, failed {stats['failed']})")

    await asyncio.gather(*(wrapped(i, t) for i, t in enumerate(texts, 1)))

    print(
        f"Done: made {stats['made']}, skipped {stats['skipped']}, failed {stats['failed']}"
    )
    for err in stats["errors"][:10]:
        print(f"  error: {err}")
    if len(stats["errors"]) > 10:
        print(f"  … and {len(stats['errors']) - 10} more")

    return 1 if stats["failed"] else 0


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--texts",
        type=Path,
        default=DEFAULT_TEXTS,
        help="Path to texts.json (default: opus/.voice-cache/texts.json)",
    )
    args = parser.parse_args()
    texts_path = args.texts.resolve()
    raise SystemExit(asyncio.run(run(texts_path)))


if __name__ == "__main__":
    main()
