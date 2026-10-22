# Kelenna Science Lab (Opus) - Technical Spec

Everything lives in `opus/`. Output: `../dist/kelenna-science-3d-suite Opus.html` (one self-contained file).

```
opus/
  content/lessons/L01-matter.js ... L12-traits.js   lesson data (default export)
  content/index.js                                    imports + exports LESSONS array in order
  src/engine/   stage.js kit.js audio.js voice.js quiz.js progress.js vespa.js
  src/app/      main.js home.js player.js vocab.js comeback.js parent.js ui.js
  src/scenes/   L01.js ... L12.js                     3D scene per lesson (default export)
  src/styles/app.css
  tools/        voices.py build.mjs lint-language.mjs collect-texts.mjs offline-check.mjs
  .voice-cache/ generated mp3 + timing json (cached by text hash)
```

## 1. Lesson data format (`content/lessons/LNN-name.js`)

```js
export default {
  id: 'L01',                 // must match scene file src/scenes/L01.js
  num: 1,
  unit: 1, unitTitle: 'Matter',
  title: 'What Is Stuff Made Of?',      // kid title
  testTitle: 'Physical Properties of Matter', // school title
  teks: ['4.6A'],
  icon: '🧱', color: '#f59e0b',
  bigQuestion: 'Why does a giant log float but a tiny pebble sinks?',
  ladder: [ 'Everything is made of stuff.', '...' ],   // 4-6 idea-ladder rungs, shown as a path

  steps: [ Step, ... ],      // 6-10 steps, phases in order: wonder, play, why..., useit
  vocab: [ Vocab, ... ],     // 4-6 words
  quiz:  [ Question, ... ],  // 25-30 questions, all types mixed
  teachBack: { prompt, pieces: ['...','...','...'], decoys: ['...','...'] },
};
```

### Step
```js
{
  id: 's1',
  phase: 'wonder' | 'play' | 'why' | 'words' | 'useit',
  title: 'The Bayou Mystery',
  shot: 'wide',              // optional camera shot name from scene.shots at step start
  beats: [ Beat, ... ],      // played in order
}
```

### Beat (exactly one main key per beat)
```js
{ say: 'One short sentence.', shot?: 'tank', cue?: 'dropLog', args?: {...}, point?: 'log' }
   // narrator speaks text (neural voice), captions highlight words.
   // shot -> camera flies; cue -> scene.cues[cue](args) fires when line starts; point -> Vespa flies to scene.points[point]
{ cue: 'name', args?: {...}, wait?: true }   // silent scene action. wait:true awaits the returned promise
{ predict: { q: 'Will the log sink or float?', options: [ { t: 'Sink' }, { t: 'Float', correct: true } ] } }
   // a guess. Never punished. Player remembers the choice.
{ verdict: { right: 'You called it!', wrong: 'Surprise! Scientists get surprised all the time.' } }
   // shows result of the most recent predict (both strings spoken)
{ task: { goal: 'Drop all four things in the water.', event: 'allDropped', hint: 'Tap a thing on the shelf.' } }
   // shows goal banner, waits until scene calls kit.emit('allDropped'). A Skip button appears after 25 s.
{ check: Question }          // one quick question inline (same format as quiz)
{ wiggle: true }             // optional explicit brain break (player also adds one every 3 steps)
```

### Vocab
```js
{ word: 'Mass', emoji: '⚖️',
  means: 'How much stuff is packed into a thing.',          // first principles, kid words
  example: 'A bowling ball has more mass than a beach ball.', // something he can picture
  test: 'Mass is the amount of matter in an object. We measure it in grams.' } // school test wording
```

### Question (quiz and check)
Every wrong option MUST have `why` (explains the specific mistake in kid words). Every question has `explain` (said after a right answer).
```js
{ type: 'one', q: 'Which one will sink?', options: [ { t: 'A rock', correct: true }, { t: 'A cork', why: 'Cork is full of tiny air pockets, so it is lighter than the same amount of water.' } ], explain: '...' }
{ type: 'two', q: 'Pick TWO things a magnet pulls.', options: [ {t,correct:true}, {t,correct:true}, {t,why}, {t,why} ], explain }
{ type: 'sort', q: 'Sort them: sink or float?', groups: ['Sinks', 'Floats'], items: [ { t: 'Rock', g: 0 }, { t: 'Cork', g: 1 } ], explain }
{ type: 'order', q: 'Put the steps in order.', items: ['first', 'second', 'third'], explain }   // items listed in CORRECT order; player shuffles
{ type: 'pick', q: 'Tap the thing that is a gas.', options: [ { t: 'Steam', emoji: '♨️', correct: true }, { t: 'Ice', emoji: '🧊', why } ], explain }  // big picture cards
```
Quiz items may add `staar: true` for test-style wording (still kid-readable).

## 2. Scene interface (`src/scenes/LNN.js`)

```js
export default function createScene(kit) {
  const { THREE } = kit;
  const root = new THREE.Group();
  // build meshes, add to root
  return {
    root,
    shots:  { wide: { pos: [0, 4, 9], look: [0, 1, 0] }, tank: {...} },  // camera shots (shot 'wide' used first)
    points: { log: [x, y, z] },                       // places Vespa can fly to
    cues:   { dropLog(args) { ...; return promise? } },  // named actions used by beats
    update(dt, t) {},                                  // every frame (dt seconds)
    dispose() {},                                      // optional extra cleanup (kit disposes geometry/materials of root)
  };
}
```

### kit (passed to scenes)
- `kit.THREE`
- `kit.emit(eventName)` - tell the player a task is done.
- `kit.sfx(name)` - 'pop' 'splash' 'clank' 'whoosh' 'click' 'chime' 'magnet' 'zap' 'thud' 'bubble' 'wind' 'rain' 'tick'
- `kit.label(text, { color, size })` - crisp text sprite (returns THREE.Sprite; `.setText(t)`)
- `kit.arrow(color)` - force arrow group with `.set(lengthNumber, dirVector3)`
- `kit.tween(obj, { 'position.y': 2, 'scale.x': 1 }, ms, ease?)` -> promise; `kit.wait(ms)` -> promise
- `kit.mat.glass() / water(color) / metal(color) / plastic(color) / glow(color) / wood() / rock() / ground(color)`
- `kit.particles(count, { size, color, spread })` -> THREE.Points-based helper
- `kit.onTap(object3D, fn)` - tap/click on mesh (works with touch)
- `kit.onDrag(object3D, { plane: 'xz'|'xy', onMove(p), onEnd(p) })` - drag on a plane; camera orbit is locked while dragging
- `kit.ui.slider({ label, min, max, step, value, onChange })` - HTML slider in the tool tray; returns element
- `kit.ui.buttons([{ label, emoji, onClick }])` - big kid buttons in the tool tray
- `kit.ui.readout(label)` -> `{ set(text) }` - a big number display (e.g., "Mass: 120 g")
- `kit.ui.clear()` - empties tool tray
- `kit.vespa` - the guide: `.flyTo([x,y,z])`, `.react('happy'|'sad'|'think'|'wow')`

Rules: dark stage is provided (lights, floor rings, dust). Scene objects sit on y >= 0 around the origin within ~6 units. Keep total triangles < 150k. Use `MeshStandardMaterial`/`MeshPhysicalMaterial`. No external assets: build shapes from geometry, textures from canvas.

## 3. Voice

`tools/collect-texts.mjs` gathers every `say` line, verdict strings, task goals, vocab means/example/test, every question `q` and `explain`, every `why`, and the predict `q`. `tools/voices.py` turns each unique text into `.voice-cache/<sha1>.mp3` (+ `.json` word timings). The build embeds them. At runtime `voice.say(text, onWord)` plays the clip if one exists for that exact text, otherwise uses the browser voice.
