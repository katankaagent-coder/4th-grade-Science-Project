import { h, shuffle, speakBtn, confetti } from './ui.js';
import { createKit } from '../engine/kit.js';
import { askQuestion, drawQuestions, findQuestion } from '../engine/quiz.js';
import { progress } from '../engine/progress.js';

const ABORT = Symbol('abort');
const PHASES = {
  wonder: { label: 'Wonder', emoji: '🔍', color: '#c084fc' },
  play: { label: 'Play', emoji: '🕹️', color: '#00f0ff' },
  why: { label: 'Why', emoji: '💡', color: '#f59e0b' },
  words: { label: 'Words', emoji: '📖', color: '#10b981' },
  useit: { label: 'Use It', emoji: '🛠️', color: '#38bdf8' },
  prove: { label: 'Prove It', emoji: '🏆', color: '#f43f5e' },
  teach: { label: 'Teach It', emoji: '🎓', color: '#fde047' },
};
const QUIZ_SIZE = 10;

export class Player {
  constructor(app) {
    this.app = app;
    this.run = 0;
  }

  // ---------- helpers ----------
  guard(p) {
    const id = this.run;
    return Promise.resolve(p).then((v) => {
      if (id !== this.run) throw ABORT;
      return v;
    });
  }

  sys(key) {
    const v = this.app.sys[key];
    return Array.isArray(v) ? v[Math.floor(Math.random() * v.length)] : v;
  }

  async say(text, beat = {}) {
    const { app } = this;
    if (beat.shot && this.scene.shots[beat.shot]) {
      const s = this.scene.shots[beat.shot];
      app.stage.flyTo(s.pos, s.look);
    }
    if (beat.point && this.scene.points?.[beat.point]) app.vespa.flyTo(this.scene.points[beat.point]);
    if (beat.cue) this.fireCue(beat.cue, beat.args);
    this.caption(text);
    this.currentLine = text;
    await this.guard(app.voice.say(text, (i) => this.highlight(i)));
    await this.guard(this.kit.wait(220));
  }

  fireCue(name, args) {
    const fn = this.scene.cues?.[name];
    if (!fn) {
      console.warn('Missing cue', name);
      return Promise.resolve();
    }
    try {
      return Promise.resolve(fn(args || {}));
    } catch (e) {
      console.error(e);
      return Promise.resolve();
    }
  }

  caption(text) {
    const words = text.split(/\s+/);
    this.capText.innerHTML = '';
    this.capWords = words.map((w) => {
      const s = h('span', { class: 'w' }, w + ' ');
      this.capText.append(s);
      return s;
    });
    this.captionEl.classList.add('show');
  }

  highlight(i) {
    (this.capWords || []).forEach((s, n) => {
      s.classList.toggle('on', n === i);
      s.classList.toggle('said', n < i);
    });
  }

  panel(...nodes) {
    this.panelEl.innerHTML = '';
    this.panelEl.append(...nodes);
    this.panelEl.classList.toggle('show', nodes.length > 0);
  }

  waitClick(btn) {
    return this.guard(new Promise((r) => btn.addEventListener('click', () => r(), { once: true })));
  }

  // ---------- screen ----------
  async open(lesson) {
    const { app } = this;
    this.lesson = lesson;
    app.voice.loadLesson(lesson.id);
    this.run++;
    const runId = this.run;
    app.stage.setStudioVisible(true);
    app.vespa.setVisible(true);
    app.vespa.setExplode(0);
    app.vespa.setSize(0.75);

    this.root = h('div', { class: 'player' });
    const back = h('button', { class: 'icon-btn', 'aria-label': 'Back to map', onclick: () => this.exit() }, '⟵');
    this.pathEl = h('div', { class: 'path' });
    this.xpEl = h('div', { class: 'xp-chip' }, `⚡ ${progress.get().xp}`);
    const top = h('header', { class: 'player-top' }, back, h('div', { class: 'p-title' }, h('span', { class: 'p-icon' }, lesson.icon), h('div', {}, h('b', {}, lesson.title), h('small', {}, `TEKS ${lesson.teks.join(', ')} · ${lesson.testTitle}`))), this.xpEl);
    this.phaseEl = h('div', { class: 'phase-chip' });
    this.capText = h('p', { class: 'cap-text' });
    const ctrl = h(
      'div',
      { class: 'cap-ctrl' },
      h('button', { class: 'icon-btn sm', title: 'Say it again', 'aria-label': 'Say it again', onclick: () => this.currentLine && app.voice.say(this.currentLine, (i) => this.highlight(i)) }, '🔁'),
      h('button', { class: 'icon-btn sm', title: 'Skip this line', 'aria-label': 'Skip this line', onclick: () => app.voice.stop() }, '⏭')
    );
    this.captionEl = h('div', { class: 'caption' }, this.phaseEl, this.capText, ctrl);
    this.panelEl = h('div', { class: 'panel' });
    this.trayEl = h('div', { class: 'tray' });
    this.root.append(top, this.pathEl, this.trayEl, this.captionEl, this.panelEl);
    app.screen(this.root);

    this.events = new Map();
    this.kit = createKit({
      stage: app.stage,
      audio: app.audio,
      tray: this.trayEl,
      vespa: app.vespa,
      emit: (name) => {
        const fn = this.events.get(name);
        if (fn) fn();
        else this.pendingEvents.add(name);
      },
    });
    this.pendingEvents = new Set();
    const create = app.scenes[lesson.id];
    app.stage.clearContent();
    this.scene = create(this.kit);
    app.stage.content.add(this.scene.root);
    this.unsubUpdate = app.stage.onUpdate((dt, t) => this.scene.update?.(dt, t));
    const wide = this.scene.shots?.wide || { pos: [0, 4, 10], look: [0, 1, 0] };
    app.stage.flyTo(wide.pos, wide.look, 1600);
    app.vespa.goHome([2.4, 2.4, 2]);

    try {
      await this.flow(lesson);
    } catch (e) {
      if (e !== ABORT) console.error(e);
    }
    if (runId === this.run) this.exit();
  }

  exit() {
    this.run++;
    this.app.voice.stop();
    this.unsubUpdate?.();
    this.unsubUpdate = null;
    this.kit?.dispose();
    this.scene?.dispose?.();
    this.app.stage.clearContent();
    this.app.go('home');
  }

  drawPath(current) {
    const l = this.lesson;
    const done = progress.lesson(l.id).steps;
    this.pathEl.innerHTML = '';
    const items = [...l.steps.map((s) => ({ id: s.id, phase: s.phase, title: s.title })), { id: 'words', phase: 'words', title: 'Words' }, { id: 'prove', phase: 'prove', title: 'Prove It' }, { id: 'teach', phase: 'teach', title: 'Teach It' }];
    for (const it of items) {
      const p = PHASES[it.phase];
      this.pathEl.append(h('span', { class: 'dot' + (done[it.id] ? ' done' : '') + (it.id === current ? ' now' : ''), style: { '--c': p.color }, title: it.title }, done[it.id] ? '✓' : p.emoji));
    }
  }

  setPhase(phase, title) {
    const p = PHASES[phase];
    this.phaseEl.style.setProperty('--c', p.color);
    this.phaseEl.textContent = `${p.emoji} ${p.label}${title ? ' · ' + title : ''}`;
  }

  // ---------- the lesson flow ----------
  async flow(lesson) {
    await this.intro(lesson);
    await this.warmUp(lesson);
    const before = lesson.steps.filter((s) => s.phase !== 'useit');
    const after = lesson.steps.filter((s) => s.phase === 'useit');
    let count = 0;
    for (const step of before) {
      await this.playStep(step);
      if (++count % 3 === 0) await this.wiggle();
    }
    await this.words(lesson);
    for (const step of after) await this.playStep(step);
    await this.prove(lesson);
    await this.teachBack(lesson);
    await this.finish(lesson);
  }

  async intro(lesson) {
    this.drawPath(null);
    this.setPhase('wonder', 'Big Question');
    const go = h('button', { class: 'btn primary big' }, "Let's go! ➜");
    const ladder = h('ol', { class: 'ladder' }, lesson.ladder.map((r, i) => h('li', { style: { '--i': i } }, r)));
    this.panel(
      h('div', { class: 'intro' }, h('div', { class: 'big-q' }, h('span', { class: 'bq-label' }, 'Big Question'), h('p', {}, lesson.bigQuestion), speakBtn(this.app, lesson.bigQuestion)), h('details', { class: 'ladder-wrap' }, h('summary', {}, '🧗 Idea ladder (what we will climb)'), ladder), go)
    );
    this.caption(lesson.bigQuestion);
    this.app.voice.say(lesson.bigQuestion, (i) => this.highlight(i));
    this.app.vespa.react('wow');
    await this.waitClick(go);
    this.app.audio.sfx('whoosh');
    this.panel();
  }

  async warmUp(lesson) {
    const earlier = this.app.lessons.filter((l) => l.num < lesson.num && !l.stub && Object.keys(progress.lesson(l.id).steps).length);
    if (!earlier.length) return;
    const missed = progress.missedKeys().filter((k) => earlier.some((l) => k.startsWith(l.id + ':')));
    let picks = shuffle(missed).slice(0, 3).map((k) => ({ key: k, ...findQuestion(this.app.lessons, k) })).filter((x) => x.q);
    while (picks.length < 3) {
      const l = earlier[Math.floor(Math.random() * earlier.length)];
      const i = Math.floor(Math.random() * l.quiz.length);
      const key = `${l.id}:q${i}`;
      if (!picks.some((p) => p.key === key)) picks.push({ key, lesson: l, q: l.quiz[i] });
    }
    this.setPhase('prove', 'Warm-up');
    await this.say(this.sys('warmup'));
    for (const p of picks) {
      const host = h('div');
      this.panel(host);
      await this.guard(askQuestion(host, p.q, { app: this.app, key: p.key, lessonId: p.lesson.id, tag: `Warm-up · ${p.lesson.title}` }));
    }
    this.panel();
  }

  async playStep(step) {
    const { app, lesson } = this;
    this.drawPath(step.id);
    this.stepPhase = step.phase;
    this.setPhase(step.phase, step.title);
    this.kit.ui.clear();
    if (step.shot && this.scene.shots[step.shot]) {
      const s = this.scene.shots[step.shot];
      app.stage.flyTo(s.pos, s.look);
    }
    let guess = null;
    for (let bi = 0; bi < step.beats.length; bi++) {
      const b = step.beats[bi];
      if (b.say) await this.say(b.say, b);
      else if (b.cue) {
        const p = this.fireCue(b.cue, b.args);
        if (b.wait) await this.guard(p);
      } else if (b.predict) guess = await this.predict(b.predict);
      else if (b.verdict) await this.verdict(b.verdict, guess);
      else if (b.task) await this.task(b.task);
      else if (b.check) {
        const host = h('div');
        this.panel(host);
        await this.guard(askQuestion(host, b.check, { app, key: `${lesson.id}:${step.id}:c${bi}`, lessonId: lesson.id, tag: 'Brain check' }));
        this.panel();
      } else if (b.wiggle) await this.wiggle();
      if (b.predict || b.task || b.wiggle) this.setPhase(step.phase, step.title);
    }
    progress.stepDone(lesson.id, step.id);
    this.xpEl.textContent = `⚡ ${progress.get().xp}`;
    app.audio.sfx('chime');
    this.drawPath(step.id);
    const next = h('button', { class: 'btn primary big pulse' }, 'Next ➜');
    this.panel(h('div', { class: 'step-done' }, h('span', { class: 'xp-pop' }, '+10 ⚡'), next));
    await this.waitClick(next);
    app.voice.stop();
    this.panel();
  }

  async predict(p) {
    const { app } = this;
    this.setPhase(this.stepPhase || 'wonder', 'Make a guess');
    const opts = h('div', { class: 'opt-grid' });
    let choose;
    const chosen = new Promise((r) => (choose = r));
    for (const o of p.options) {
      opts.append(h('button', { class: 'opt', onclick: () => choose(o) }, o.t));
    }
    this.panel(h('div', { class: 'predict' }, h('div', { class: 'predict-head' }, h('span', { class: 'q-tag' }, '🤔 Your guess'), h('p', { class: 'q-text' }, p.q), speakBtn(app, p.q)), opts));
    this.caption(p.q);
    app.vespa.react('think');
    app.voice.say(p.q, (i) => this.highlight(i));
    const o = await this.guard(chosen);
    app.voice.stop();
    app.audio.sfx('pop');
    this.panel(h('div', { class: 'predict-lock' }, '🔒 You guessed: ', h('b', {}, o.t)));
    await this.guard(this.kit.wait(500));
    await this.say(this.sys('findOut'));
    this.panel();
    return o;
  }

  async verdict(v, guess) {
    const { app } = this;
    const right = !!guess?.correct;
    app.audio.sfx(right ? 'level' : 'sparkle');
    app.vespa.react(right ? 'happy' : 'wow');
    this.panel(h('div', { class: 'verdict ' + (right ? 'ok' : 'surprise') }, right ? '🎯 ' : '😮 ', right ? v.right : v.wrong));
    if (right) confetti(this.panelEl, 30);
    await this.say(right ? v.right : v.wrong);
    this.panel();
  }

  async task(t) {
    const { app } = this;
    this.setPhase(this.stepPhase || 'play', 'Your turn');
    const skip = h('button', { class: 'btn ghost sm hidden' }, 'Skip ⏭');
    const hint = t.hint ? h('button', { class: 'btn ghost sm', onclick: () => app.voice.say(t.hint) }, '💡 Hint') : null;
    this.panel(h('div', { class: 'task' }, h('span', { class: 'q-tag' }, '🎮 Your turn'), h('p', { class: 'task-goal' }, t.goal), h('div', { class: 'row' }, hint, skip)));
    this.panelEl.classList.add('mini');
    const done = new Promise((r) => {
      if (this.pendingEvents.has(t.event)) {
        this.pendingEvents.delete(t.event);
        r();
      } else this.events.set(t.event, r);
      skip.addEventListener('click', r, { once: true });
    });
    const timer = setTimeout(() => skip.classList.remove('hidden'), 25000);
    this.caption(t.goal);
    app.voice.say(t.goal, (i) => this.highlight(i));
    await this.guard(done);
    clearTimeout(timer);
    this.events.delete(t.event);
    this.panelEl.classList.remove('mini');
    app.audio.sfx('level');
    app.vespa.react('happy');
    this.panel(h('div', { class: 'verdict ok' }, '✅ ', this.sys('taskDone')));
    await this.say(this.sys('taskDone'));
    this.panel();
  }

  async wiggle() {
    const { app } = this;
    const move = this.sys('wiggleMoves');
    const count = h('div', { class: 'wiggle-count' }, '20');
    const skip = h('button', { class: 'btn ghost sm' }, "I'm ready ➜");
    this.panel(h('div', { class: 'wiggle' }, h('div', { class: 'wiggle-title' }, '🕺 Wiggle Break!'), h('p', {}, move), count, skip));
    this.setPhase('play', 'Wiggle Break');
    this.caption(move);
    app.vespa.react('happy');
    app.voice.say(move, (i) => this.highlight(i));
    await this.guard(
      new Promise((r) => {
        let n = 20;
        const iv = setInterval(() => {
          n--;
          count.textContent = n;
          if (n <= 3 && n > 0) app.audio.sfx('tick');
          if (n <= 0) {
            clearInterval(iv);
            r();
          }
        }, 1000);
        skip.addEventListener('click', () => (clearInterval(iv), r()), { once: true });
      })
    );
    app.audio.sfx('chime');
    this.panel();
  }

  async words(lesson) {
    const { app } = this;
    this.drawPath('words');
    this.setPhase('words', 'Word Cards');
    await this.say(this.sys('wordsIntro'));
    for (const v of lesson.vocab) {
      const testBox = h('div', { class: 'v-test hidden' }, h('span', { class: 'v-lbl' }, '📝 School test words'), h('p', {}, v.test), speakBtn(app, v.test));
      const next = h('button', { class: 'btn primary' }, 'Got it ➜');
      const card = h(
        'div',
        { class: 'vcard' },
        h('div', { class: 'v-word' }, h('span', { class: 'v-emoji' }, v.emoji), v.word, speakBtn(app, v.word)),
        h('div', { class: 'v-means' }, h('span', { class: 'v-lbl' }, '💡 What it really means'), h('p', {}, v.means)),
        h('div', { class: 'v-ex' }, h('span', { class: 'v-lbl' }, '👀 Picture this'), h('p', {}, v.example)),
        testBox,
        h('div', { class: 'row' }, h('button', { class: 'btn ghost sm', onclick: () => { testBox.classList.remove('hidden'); app.voice.say(v.test); } }, '📝 Show test words'), next)
      );
      this.panel(card);
      app.audio.sfx('pop');
      await this.say(v.means);
      await this.say(v.example);
      await this.waitClick(next);
      app.voice.stop();
    }
    progress.stepDone(lesson.id, 'words');
    this.panel();
  }

  async prove(lesson) {
    const { app } = this;
    this.drawPath('prove');
    this.setPhase('prove', 'Quiz');
    app.stage.flyTo(...(() => { const s = this.scene.shots?.wide || { pos: [0, 4, 10], look: [0, 1, 0] }; return [s.pos, s.look]; })());
    await this.say(this.sys('quizIntro'));
    const picks = drawQuestions(lesson, Math.min(QUIZ_SIZE, lesson.quiz.length));
    let right = 0;
    for (let i = 0; i < picks.length; i++) {
      const host = h('div');
      const bar = h('div', { class: 'quiz-bar' }, h('i', { style: { width: (i / picks.length) * 100 + '%' } }));
      this.panel(h('div', { class: 'quiz-wrap' }, bar, host));
      this.panelEl.classList.add('wide');
      const ok = await this.guard(askQuestion(host, picks[i].q, { app, key: picks[i].key, lessonId: lesson.id, tag: `Question ${i + 1} of ${picks.length}` }));
      if (ok) right++;
    }
    this.panelEl.classList.remove('wide');
    const pct = Math.round((right / picks.length) * 100);
    progress.quizResult(lesson.id, pct);
    progress.stepDone(lesson.id, 'prove');
    const stars = pct >= 90 ? 3 : pct >= 70 ? 2 : pct >= 40 ? 1 : 0;
    const next = h('button', { class: 'btn primary big' }, 'Next ➜');
    const again = h('button', { class: 'btn ghost' }, '🔁 New quiz');
    this.panel(h('div', { class: 'result' }, h('div', { class: 'stars' }, '★'.repeat(stars) + '☆'.repeat(3 - stars)), h('p', { class: 'score' }, `${right} of ${picks.length} right on the first try`), h('div', { class: 'row' }, again, next)));
    app.audio.sfx(stars >= 2 ? 'level' : 'chime');
    if (stars >= 2) confetti(this.panelEl, 60);
    this.say(this.sys(stars === 3 ? 'quizGreat' : stars >= 1 ? 'quizGood' : 'quizTry')).catch(() => {});
    const choice = await this.guard(new Promise((r) => { next.onclick = () => r('next'); again.onclick = () => r('again'); }));
    app.voice.stop();
    if (choice === 'again') return this.prove(lesson);
    this.panel();
  }

  async teachBack(lesson) {
    const { app } = this;
    const tb = lesson.teachBack;
    if (!tb) return;
    this.drawPath('teach');
    this.setPhase('teach', 'Teach It Back');
    const built = h('ol', { class: 'tb-built' });
    const pool = h('div', { class: 'tb-pool' });
    const fb = h('div', { class: 'q-feedback' });
    let idx = 0;
    let finish;
    const done = new Promise((r) => (finish = r));
    for (const piece of shuffle([...tb.pieces.map((t, i) => ({ t, i })), ...tb.decoys.map((t) => ({ t, i: -1 }))])) {
      const b = h('button', { class: 'chip' }, piece.t);
      b.onclick = () => {
        if (piece.i === idx) {
          app.audio.sfx('pop');
          built.append(h('li', {}, piece.t));
          b.remove();
          idx++;
          fb.className = 'q-feedback';
          fb.textContent = '';
          if (idx === tb.pieces.length) finish();
        } else {
          app.audio.sfx('wrong');
          b.classList.add('wrong');
          setTimeout(() => b.classList.remove('wrong'), 600);
          fb.className = 'q-feedback bad';
          fb.textContent = piece.i < 0 ? 'That one is not true. Leave it out!' : 'True, but it comes later. What comes first?';
        }
      };
      pool.append(b);
    }
    this.panel(h('div', { class: 'teach' }, h('span', { class: 'q-tag' }, '🎓 Teach it back'), h('p', { class: 'q-text' }, tb.prompt), speakBtn(app, tb.prompt), built, pool, fb));
    this.panelEl.classList.add('wide');
    await this.say(tb.prompt);
    await this.guard(done);
    progress.teachBackDone(lesson.id);
    progress.stepDone(lesson.id, 'teach');
    app.audio.sfx('win');
    app.vespa.react('happy');
    confetti(this.panelEl, 80);
    for (const t of tb.pieces) await this.say(t);
    this.panelEl.classList.remove('wide');
  }

  async finish(lesson) {
    const { app } = this;
    const l = progress.lesson(lesson.id);
    const home = h('button', { class: 'btn primary big' }, '🗺️ Back to the map');
    this.panel(h('div', { class: 'finish' }, h('div', { class: 'badge-big', style: { '--c': lesson.color } }, lesson.icon), h('h2', {}, 'Mission complete!'), h('p', {}, `You earned the ${lesson.title} badge.`), h('div', { class: 'stars' }, '★'.repeat(l.stars) + '☆'.repeat(3 - l.stars)), home));
    app.audio.sfx('level');
    this.say(this.sys('finish')).catch(() => {});
    await this.waitClick(home);
  }
}
