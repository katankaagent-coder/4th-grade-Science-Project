# Worker Brief: build one full lesson

You are building one lesson of **Kelenna's Science Lab**, a 3D science app (Three.js) for Kelenna, a 9-year-old 4th grader in Dickinson, Texas. His attention drifts when talk gets long, dry, or full of jargon. Every idea must start from first principles (things he can touch and see) in simple words, and he must also be ready for school tests (Texas TEKS, STAAR 2.0 question styles).

## Read first, in this order
1. `opus/docs/STYLE.md` - teaching rules (non-negotiable).
2. `opus/docs/SPEC.md` - the lesson data format, scene interface, and `kit` API.
3. `opus/content/lessons/L01-matter.js` - the GOLD STANDARD lesson. Match its tone, step size, beat rhythm, question depth.
4. `opus/src/scenes/L01.js` - the GOLD STANDARD scene. Match its craft: several stations, shots, points, cues, tasks via `kit.emit`, labels, effects, `kit.ui` controls.
5. `opus/src/engine/kit.js` - exactly what `kit` provides (do not invent helpers that do not exist).
6. Your lesson stub (path given in your task). It has the id, titles, TEKS, big question, the idea ladder, and a `brief` with phenomenon, predictions, scene idea, tasks, vocab, misconceptions, and Use-It idea, written by the lead designer. Keep `id`, `num`, `unit`, `unitTitle`, `title`, `testTitle`, `teks`, `icon`, `color`, `bigQuestion`, and `ladder` (you may polish ladder wording). Follow the `brief` closely.

## What to produce
- The lesson file: replace the stub with a full lesson. Remove `stub: true` and the `brief` field. 7-10 steps (wonder first, useit last; play and why may alternate), at least 3 predict + verdict pairs, at least 2 tasks done in the 3D scene, 2-4 `check` questions inside steps, 5-6 vocab cards, 25-30 quiz questions using ALL types (one, two, sort, order, pick) with about half STAAR-style, and a `teachBack` with 4-6 pieces in order and 2 decoys.
- The scene file: a complete `createScene(kit)` default export. No imports (use `kit.THREE`). Every `cue`, `shot`, and `point` name used in the lesson must exist in the scene. Stations must not overlap from the `wide` shot. Keep everything within about x -6..6, z -4..3, y 0..4. Objects you tap or drag must be registered with `kit.onTap` / `kit.onDrag`. Tasks must be completable on a phone (big targets, simple drags or taps, or `kit.ui` buttons/sliders). Emit task events only when the child actually did the thing (if a demo cue would trigger the same condition, arm the event only after the demo, like `statesTask` in L01).
- Science accuracy: follow the misconception list in STYLE.md and in your brief. When unsure of a fact, choose the simpler statement that is definitely true.

## Rules
- Spoken sentences (beat `say`, verdict, task goal) max 14 words. Question text, options, why, explain, vocab means/example: max 20 words per sentence. The lint tool enforces this and a jargon blocklist.
- Every wrong option needs a `why` that names the specific mistake and fixes it in kid words.
- Never use an idea before its rung on the ladder. The science word comes after the idea.
- Use Dickinson / Galveston Bay / Texas examples where natural.
- Write only the files you were assigned. Do not edit engine, app, tools, docs, or other lessons.

## Self-check (must pass before you finish)
From the `opus` folder:
- `node tools/lint-language.mjs <args given in your task>` -> 0 errors (fix warnings too if you can).
- `npx esbuild <your scene file> --bundle --format=esm --outfile=NUL --log-level=warning` -> no errors.

## Report back (max 12 lines)
Files written, step count, predict count, task events, quiz count by type, lint result, and any science facts you were unsure about.
