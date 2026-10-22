import asyncio
import json
import os
import edge_tts

VOICE = "en-US-AvaMultilingualNeural"
OUT_DIR = os.path.join("audio", "voiceovers")
os.makedirs(OUT_DIR, exist_ok=True)

with open("audio/voiceover_manifest.json", "r", encoding="utf-8") as f:
    manifest = json.load(f)

sem = asyncio.Semaphore(14)

async def synth_one(key, text):
    out_path = os.path.join(OUT_DIR, f"{key}.mp3")
    async with sem:
        for attempt in range(3):
            try:
                communicate = edge_tts.Communicate(text, VOICE, rate="+0%", pitch="+0Hz")
                await communicate.save(out_path)
                return key
            except Exception as e:
                if attempt == 2:
                    print(f"Failed {key}: {e}")
                await asyncio.sleep(0.5)

async def main():
    tasks = [synth_one(item["key"], item["text"]) for item in manifest]
    done = await asyncio.gather(*tasks)
    print(f"Successfully generated {len([x for x in done if x])} / {len(manifest)} First-Principles Neural HD MP3 voiceovers!")

if __name__ == "__main__":
    asyncio.run(main())
