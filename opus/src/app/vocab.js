import { h, speakBtn, shuffle, confetti } from './ui.js';

// Word Lab: browse every science word, hear it, and play a quick quiz.
export function renderVocab(app, lessonId) {
  app.vespa.goHome([-2.2, 2.6, 0]);
  if (window.matchMedia('(max-width: 899px)').matches) app.vespa.setVisible(false);

  const lessons = app.lessons.filter((l) => !l.stub);
  const all = lessons.flatMap((l) => (l.vocab || []).map((v) => ({ ...v, lesson: l })));
  let filter = lessons.some((l) => l.id === lessonId) ? lessonId : 'all';
  let token = 0; // cancels stale narration

  const body = h('div', { class: 'sheet wl-sheet' });
  const stopVoice = () => {
    token++;
    app.voice.stop();
  };
  const back = () => {
    stopVoice();
    app.go('home');
  };
  const root = h(
    'div',
    { class: 'sheet-wrap wl-wrap' },
    h('div', { class: 'sheet-head' }, h('button', { class: 'icon-btn', 'aria-label': 'Back', onclick: back }, '⬅'), h('h2', {}, '📖 Word Lab')),
    body
  );
  app.screen(root);

  const visible = () => all.filter((w) => filter === 'all' || w.lesson.id === filter);

  function showGrid() {
    stopVoice();
    body.innerHTML = '';
    const words = visible();
    const chips = h(
      'div',
      { class: 'wl-filters' },
      h('button', { class: 'wl-chip' + (filter === 'all' ? ' on' : ''), onclick: () => ((filter = 'all'), showGrid()) }, 'All'),
      lessons
        .filter((l) => (l.vocab || []).length)
        .map((l) =>
          h(
            'button',
            { class: 'wl-chip' + (filter === l.id ? ' on' : ''), 'aria-label': l.title, title: l.title, onclick: () => ((filter = l.id), showGrid()) },
            l.icon
          )
        )
    );
    if (!all.length) {
      body.append(
        h('div', { class: 'wl-empty' }, h('div', { class: 'big-emoji' }, '📚'), h('h3', {}, 'No words yet!'), h('p', {}, 'Words show up here as missions get ready. Check back soon.'))
      );
      return;
    }
    const quizBtn = h('button', { class: 'btn primary', disabled: words.length < 2 ? true : null, onclick: () => startQuiz(words) }, '🎯 Quiz me');
    body.append(
      h('div', { class: 'wl-bar' }, chips, quizBtn),
      h(
        'div',
        { class: 'wl-grid' },
        words.map((w, i) =>
          h(
            'button',
            { class: 'wl-tile', style: { '--c': w.lesson.color }, onclick: () => openCard(words, i) },
            h('span', { class: 'wl-e' }, w.emoji || '🔬'),
            h('span', { class: 'wl-w' }, w.word)
          )
        )
      )
    );
  }

  function openCard(words, i) {
    stopVoice();
    const my = token;
    const w = words[i];
    body.innerHTML = '';
    const test = h('div', { class: 'v-test hidden' }, h('span', { class: 'v-lbl' }, 'Test words'), h('p', {}, w.test), speakBtn(app, w.test));
    const testBtn = h(
      'button',
      {
        class: 'btn ghost',
        onclick: () => {
          test.classList.toggle('hidden');
          testBtn.textContent = test.classList.contains('hidden') ? '📝 Show test words' : '📝 Hide test words';
        },
      },
      '📝 Show test words'
    );
    const go = (d) => openCard(words, (i + d + words.length) % words.length);
    body.append(
      h(
        'div',
        { class: 'wl-cardnav' },
        h('button', { class: 'icon-btn', 'aria-label': 'Previous word', onclick: () => go(-1) }, '◀'),
        h('div', { class: 'wl-count' }, `${i + 1} / ${words.length}`),
        h('button', { class: 'icon-btn', 'aria-label': 'Next word', onclick: () => go(1) }, '▶')
      ),
      h(
        'div',
        { class: 'vcard wl-card', style: { '--c': w.lesson.color } },
        h('div', { class: 'v-word' }, h('span', { class: 'v-emoji' }, w.emoji || '🔬'), w.word, speakBtn(app, w.word)),
        h('div', { class: 'v-means' }, h('span', { class: 'v-lbl' }, 'What it really means'), h('p', {}, w.means)),
        h('div', { class: 'v-ex' }, h('span', { class: 'v-lbl' }, 'Picture this'), h('p', {}, w.example)),
        testBtn,
        test,
        h('small', { class: 'wl-from' }, `${w.lesson.icon} ${w.lesson.title}`)
      ),
      h('div', { class: 'row wl-row' }, h('button', { class: 'btn ghost', onclick: showGrid }, '▦ All words'))
    );
    (async () => {
      await app.voice.say(w.means);
      if (my !== token) return;
      await app.voice.say(w.example);
    })();
  }

  function startQuiz(words) {
    stopVoice();
    const pool = words.length >= 4 ? words : all;
    const deck = shuffle(words).slice(0, 5);
    let n = 0;
    let score = 0;
    const next = () => {
      body.innerHTML = '';
      if (n >= deck.length) return result();
      const w = deck[n];
      const others = shuffle(pool.filter((x) => x.word !== w.word)).slice(0, 3);
      const opts = shuffle([w, ...others]);
      let done = false;
      const fb = h('div', { class: 'q-feedback', 'aria-live': 'polite' });
      const foot = h('div', { class: 'q-footer' });
      const grid = h(
        'div',
        { class: 'wl-opts' },
        opts.map((o) => {
          const b = h('button', { class: 'wl-tile', style: { '--c': o.lesson.color } }, h('span', { class: 'wl-e' }, o.emoji || '🔬'), h('span', { class: 'wl-w' }, o.word));
          b.onclick = () => {
            if (done) return;
            if (o.word === w.word) {
              done = true;
              score++;
              b.classList.add('right');
              app.audio.sfx('win');
              app.vespa.react('happy');
              confetti(body.parentElement);
              fb.className = 'q-feedback ok';
              fb.textContent = 'Yes! ' + w.word + '!';
              grid.querySelectorAll('button').forEach((x) => (x.disabled = true));
              foot.append(h('button', { class: 'btn primary big', onclick: () => (n++, next()) }, n === deck.length - 1 ? 'Finish ➜' : 'Next ➜'));
            } else {
              b.classList.add('wrong');
              b.disabled = true;
              app.audio.sfx('wrong');
              app.vespa.react('sad');
              fb.className = 'q-feedback bad';
              fb.textContent = 'Not that one. Try again!';
            }
          };
          return b;
        })
      );
      body.append(
        h('div', { class: 'quiz-bar' }, h('i', { style: { width: (n / deck.length) * 100 + '%' } })),
        h('span', { class: 'q-tag' }, `Word ${n + 1} of ${deck.length}`),
        h('div', { class: 'q-head' }, h('p', { class: 'q-text' }, 'Which word means: ' + w.means), speakBtn(app, w.means)),
        grid,
        fb,
        foot
      );
      app.voice.say(w.means);
    };
    const result = () => {
      app.audio.sfx(score >= 4 ? 'level' : 'click');
      body.append(
        h(
          'div',
          { class: 'result wl-result' },
          h('div', { class: 'stars' }, score >= 4 ? '🌟' : '👍'),
          h('p', { class: 'score' }, `${score} of ${deck.length} right`),
          h('div', { class: 'row' }, h('button', { class: 'btn primary', onclick: () => startQuiz(words) }, '🎯 Again'), h('button', { class: 'btn ghost', onclick: showGrid }, '📖 Words'))
        )
      );
    };
    next();
  }

  showGrid();
}
