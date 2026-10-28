# Handover: continue Kelenna's Science Lab

Written 27 Oct 2026, after the Cursor rebuild. Read this first, then `opus/docs/STYLE.md`, `opus/docs/SPEC.md`, and `opus/docs/WORKER_BRIEF.md`. The older file `OPUS_5_5_HANDOVER.md` is Gemini's brief from before this rebuild. Keep it. Do not treat it as the current build.

## Who this is for

Kelenna, 9, 4th grade at Dunbar Middle School, Dickinson ISD, Texas. Attention drops when talk is long, dry, or full of jargon. Teach every idea from something he can see or touch, in short sentences, and still cover Texas TEKS and STAAR-style questions. Dickinson, Galveston Bay, and the Texas coast are the examples.

The parent asked for 12 deep lessons, one app, 3D with Three.js, narration, and sound. Output is one HTML file that works offline.

## Do not touch

- `dist/kelenna-science-3d-suite.html` is Gemini's original. Never edit it.
- Write the app to `dist/kelenna-science-3d-suite Opus.html`.
- Do not use Grok to write or rewrite lessons. The parent stopped that. Opus (or another Claude model) rebuilds the four Grok drafts below.
- `opus/.voice-cache/` is generated and gitignored. Do not commit mp3s.

GitHub: `https://github.com/katankaagent-coder/4th-grade-Science-Project` on `main`. Latest push when this note was written: `08bbc0c`.

## Where the code is

All new work is in `opus/`. Spec is `opus/docs/SPEC.md`.

```
opus/content/lessons/   lesson data, one file per lesson
opus/content/index.js   LESSONS array, L01–L12
opus/src/scenes/        one Three.js scene per lesson, default export createScene(kit)
opus/src/engine/        stage, kit, audio, voice, quiz, progress, vespa
opus/src/app/           main, home, player, vocab, comeback, parent
opus/src/styles/app.css
opus/tools/             build, lint, voices, collect-texts, offline-check, qa-driver
```

From `opus/`:

```
npm run lint          node tools/lint-language.mjs
npm run build:fast    one HTML file, no voice (use this while editing)
npm run texts         collect spoken lines into .voice-cache/texts.json
npm run voices        edge-tts + ffmpeg, cached by sha1 of the text
npm run build         embed voice into the HTML file
npm run offline       fail if the HTML asks the network for anything
```

Node 24 and Python are already on this machine. `three` r186 is bundled by esbuild. No CDN.

Serve the **project root** (not `dist/`) so the QA driver can load:

```
cd "D:\Antigravity Projects\Kelenna Science Project"
python -m http.server 8765
```

Open `http://localhost:8765/dist/kelenna-science-3d-suite%20Opus.html`. The file cannot be opened as `file://`.

## How a lesson works

5E is mapped to phases: wonder, play, why, words, useit, then Prove It (10 questions from a larger pool, missed ones first), then Teach It Back. A warm-up pulls questions from earlier lessons. A wiggle break lands every 3 steps. Progress is `localStorage` key `kelenna-science-lab-opus-v1`.

Spoken sentences: 14 words max. Question text, options, why, explain, vocab: 20 words max. Lint enforces that and a jargon list. Every wrong option needs a `why`. Gold standard for tone and scene craft: `L01-matter.js` and `src/scenes/L01.js`. Lesson 2 (`L02-mixtures.js`, `src/scenes/L02.js`) is the second example; it won the bake-off.

Scenes take `kit` and must not import Three themselves (`kit.THREE`). Anything that can move two ways (drop, then reset) must use the `claim` / `glide` helpers at the top of the motion code in `src/scenes/L01.js` (around the `drop` function). A newer motion cancels the older one. Without that, skipping narration leaves the object stuck and untappable.

## Lesson status

| Lesson | Title | Who wrote the full lesson | Browser playthrough |
| --- | --- | --- | --- |
| L01 | What Is Stuff Made Of? | Lead build (this Cursor session) | Played through. Real click drops the log. |
| L02 | Mix It, Split It | Sonnet 5.5 (bake-off winner) | Finished, 0 JS errors. Sieve drag was not completed by the auto driver. |
| L03 | Push, Pull, and Invisible Hands | Sonnet 5.5 | Finished, 0 JS errors. "Push the crate on all four surfaces" was skipped by the driver. |
| L04 | Energy on the Move | **Grok draft. Rebuild.** | Not played through. |
| L05 | Make the Light Turn On | **Grok draft. Rebuild.** | Not played through. |
| L06 | Why Summer Is Hot | Sonnet 5.5 | Finished, 0 JS errors, tasks solved. |
| L07 | The Moon's Changing Face | Sonnet 5.5 | Finished, 0 JS errors, tasks solved. |
| L08 | Water's Never-Ending Trip | Sonnet 5.5 | Finished, 0 JS errors. Four tasks skipped by the driver (see below). |
| L09 | Break It, Move It, Drop It | Sonnet 5.5 | Finished, 0 JS errors. Four tasks skipped by the driver. |
| L10 | Earth's Treasure Chest | Sonnet 5.5 | Finished, 0 JS errors. Card-sort drag skipped by the driver. |
| L11 | Who Eats Who? | **Grok draft. Rebuild.** | Auto driver finished with 0 JS errors, but the parent still wants this rewritten by Claude. |
| L12 | Built to Survive | **Grok draft. Rebuild.** | Not played through. |

"Finished" means `opus/tools/qa-driver.js` reached the end with an empty error list. It answers questions from the answer key, so a green run does **not** prove the science or that a child can complete every 3D task. The driver also presses tray buttons, including reset buttons, so a "task skipped" line is a clue, not proof the task is broken. Click those tasks yourself.

Driver skips still worth a real click:

- L02: "Drag the sieve side to side to shake it."
- L03: "Push the crate once on all four surfaces."
- L08: make a cloud, keep the Sun on until it rains, tap Next day three times, tap Add 10 years three times.
- L09: freeze/thaw the rock, water-speed slider, river until a delta, wind until a dune.
- L10: "Drag each card into the right bin."

## Rebuild L04, L05, L11, L12 from the original briefs

Grok filled those four after Sonnet hit its usage limit. The parent rejected that and will have Opus redo them. The design briefs (phenomenon, predictions, scene, tasks, vocab, misconceptions) were removed when the stubs were replaced. They are still in git at commit `7c9b863`:

```
git show 7c9b863:opus/content/lessons/L04-energy.js
git show 7c9b863:opus/content/lessons/L05-circuits.js
git show 7c9b863:opus/content/lessons/L11-food-webs.js
git show 7c9b863:opus/content/lessons/L12-traits.js
```

Keep each lesson's `id`, `num`, `unit`, `unitTitle`, `title`, `testTitle`, `teks`, `icon`, `color`, `bigQuestion`, and `ladder`. Follow that brief. Match L01 and L02 for depth. Run lint and esbuild on the scene before calling it done. Then play the lesson in the browser, including every task, on a desktop width and at iPhone size (393×852).

## Bugs already fixed in the engine (do not revert)

- **Taps died on lesson open.** `player.open` used to call `stage.setContent`, which cleared `tapTargets` after the scene registered them. It now clears first, then lets the scene register taps, then `content.add`s the root.
- **Stuck objects.** Overlapping tweens left `busy` true forever. `claim` / `glide` in L01 is the pattern. It is also a rule in `WORKER_BRIEF.md`.
- **Voice stall froze the lesson.** `voice.js` has a watchdog on both the mp3 clip and the `speechSynthesis` fallback.
- **Animations froze when the browser throttled frames.** `stage.js` has a 250 ms fallback tick.
- **Tweens used frame time.** `kit.js` tweens use `performance.now()`. `wait` uses `setTimeout`.
- **Phase chip.** A predict inside a play or why step was labeled WONDER. It now uses the step's phase.
- **iPhone header.** `.p-title > div { min-width: 0 }` so the subtitle ellipsizes instead of running under the XP chip.
- **🪵 and 🪜** rendered as empty boxes. L01's icon is ⚖️. The idea ladder uses 🧗.

## Science notes for the review pass

These were flagged and not fully settled:

- L06 daylight and noon-shadow numbers are computed for Dickinson at about 29.5°N (about 14 h of day in June, 10 h in December). Confirm the rounded table values.
- L07 draws the Moon's orbit at about 20° instead of about 5°, so a child can see it miss Earth's shadow. The lesson correctly says phases are not Earth's shadow. Decide if the exaggeration needs one spoken line.
- L07's "Use it" timing was corrected: first quarter to full is about 7 days. The original brief's example was wrong.
- L10 and L11 stubs asked for a check that TEKS 4.11B, 4.11C, and 4.12C wording matches the current Texas standards. The Grok L11 note claims 4.12C is fossils and past environments, and put fossils in step 7. Verify that against the standard before keeping or cutting it. Do not invent TEKS codes.
- L11 treats earthworms the way 4th grade does (they help break the log down). A stricter label is detritivore. Keep the 4th-grade framing.
- Classic misconceptions that must stay wrong-and-corrected in the lessons: seasons are not "closer to the Sun"; Moon phases are not Earth's shadow; dissolving does not destroy mass; a circuit is a closed loop and the outlet is never a toy; food-web arrows point from food to eater; plants do not eat soil; acquired traits are not inherited; clouds are drops, not steam.

A full science review of all 12 lessons has **not** been done. Do it after L04, L05, L11, and L12 are rebuilt. Fix anything a reviewer flags. The parent asked for two independent reviewers; Grok was one of them and is now off the table unless the parent says otherwise.

## Voice

Narration is `en-US-AvaMultilingualNeural` via edge-tts, rate −6%, word timings, ffmpeg to mono 22050 Hz at 20 kbps. Clips are keyed by exact text. `build.mjs` embeds them as per-lesson JSON script tags. Missing lines fall back to `speechSynthesis`.

On disk now: `opus/.voice-cache/` has 540 mp3s, about 4.6 MB. That set was built when only some lessons existed, so many lines in L03–L12 have no clip, and some clips are for sentences that later changed. After the four rebuilds, run `npm run texts`, then `npm run voices` (it skips text that already has a clip), then `npm run build`, then `npm run offline`.

The L01-only voiced file was about 3.9 MB (279 clips). A full 12-lesson file will land around 35–40 MB. That is larger than the early 12–18 MB target. The parent has heard that. Do not switch to a worse voice to chase the old number.

## What is left

1. Rebuild L04, L05, L11, L12 from the `7c9b863` briefs. Lint, esbuild, then play each lesson including every task.
2. Click the skipped tasks in L02, L03, L08, L09, and L10. Fix the scene if a child cannot finish the task.
3. Science review of all 12. Fix factual and misconception problems.
4. Browser pass at iPhone 393×852 and at a Chromebook width: home, one full lesson, Word Lab, Comeback, Grown-ups. Confirm taps, drags, and sliders work with a finger, not only with the QA driver.
5. Regenerate voices and write the final `dist/kelenna-science-3d-suite Opus.html`. Run the offline check.
6. Commit and push when a milestone is actually done.

App shell already in place: home map, lesson player, Vespa, Word Lab, Comeback, Grown-ups page. Vespa's "Look inside" slider is on the home screen.
