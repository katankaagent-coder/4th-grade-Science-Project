import { h } from './ui.js';

// Grown-ups page: progress summary, weak spots, settings.
export function renderParent(app) {
  app.vespa.goHome([-2.2, 2.6, 0]);
  if (window.matchMedia('(max-width: 899px)').matches) app.vespa.setVisible(false);

  const progress = app.progress;
  const s = progress.get();
  const lessons = app.lessons.filter((l) => !l.stub);

  // (a) summary
  let right = 0, wrong = 0;
  for (const a of Object.values(s.answered)) (right += a.right), (wrong += a.wrong);
  const acc = right + wrong ? Math.round((right / (right + wrong)) * 100) + '%' : '-';
  const badges = lessons.filter((l) => progress.lesson(l.id).badge).length;
  const stat = (v, l) => h('div', { class: 'gu-stat' }, h('b', {}, v), h('span', {}, l));
  const summary = h(
    'section',
    { class: 'gu-sec' },
    h('h3', {}, 'Summary'),
    h('div', { class: 'gu-stats' }, stat(s.xp, 'Total XP'), stat(s.streak.count || 0, 'Day streak'), stat(`${badges}/${lessons.length}`, 'Lessons with badge'), stat(acc, 'First-try accuracy'))
  );

  // (b) lessons
  const fmt = (t) => (t ? new Date(t).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : '-');
  const rows = lessons.map((l) => {
    const p = progress.lesson(l.id);
    const total = l.steps.length + 3;
    const done = Math.min(total, Object.keys(p.steps).length);
    return h(
      'div',
      { class: 'gu-row', style: { '--c': l.color } },
      h('div', { class: 'gu-name' }, h('span', {}, l.icon), h('div', {}, h('b', {}, l.title), h('small', {}, (l.teks || []).join(', ')))),
      h('div', { class: 'gu-cell' }, h('i', {}, 'Steps'), `${done}/${total}`),
      h('div', { class: 'gu-cell' }, h('i', {}, 'Best quiz'), p.quizRuns ? p.quizBest + '%' : '-'),
      h('div', { class: 'gu-cell' }, h('i', {}, 'Stars'), '★'.repeat(p.stars) + '☆'.repeat(3 - p.stars)),
      h('div', { class: 'gu-cell' }, h('i', {}, 'Badge'), p.badge ? '🏅' : '-'),
      h('div', { class: 'gu-cell' }, h('i', {}, 'Last'), fmt(p.lastAt))
    );
  });
  const lessonsSec = h('section', { class: 'gu-sec' }, h('h3', {}, 'Lessons'), rows.length ? rows : h('p', { class: 'gu-muted' }, 'No lessons are ready yet.'));

  // (c) weak spots
  const missed = progress.missedKeys();
  const byLesson = lessons
    .map((l) => ({ l, n: progress.missedKeys(l.id).length }))
    .filter((x) => x.n)
    .sort((a, b) => b.n - a.n)
    .slice(0, 4);
  const topQ = Object.entries(s.answered)
    .filter(([, a]) => a.wrong > 0)
    .sort((a, b) => b[1].wrong - a[1].wrong)
    .map(([key, a]) => ({ key, a, r: findQ(app, key) }))
    .filter((x) => x.r)
    .slice(0, 5);
  const weak = h(
    'section',
    { class: 'gu-sec' },
    h('h3', {}, 'Weak spots'),
    missed.length || topQ.length
      ? [
          byLesson.length
            ? h('p', { class: 'gu-muted' }, 'Lessons with the most questions waiting in Comeback: ', byLesson.map((x) => `${x.l.icon} ${x.l.title} (${x.n})`).join(' · '))
            : null,
          topQ.length
            ? h(
                'ol',
                { class: 'gu-weak' },
                topQ.map((x) => h('li', {}, h('span', {}, x.r.q.q), h('small', {}, `${x.r.lesson.icon} ${x.r.lesson.title} · missed ${x.a.wrong}×`)))
              )
            : null,
        ]
      : h('p', { class: 'gu-muted' }, 'No missed questions yet.')
  );

  // (d) settings
  const sel = (opts, value, onChange, label) => {
    const el = h('select', { class: 'gu-select', 'aria-label': label }, opts.map(([v, t]) => h('option', { value: v }, t)));
    el.value = String(value);
    el.addEventListener('change', () => onChange(el.value));
    return el;
  };
  const rate = progress.settings().voiceRate || 1;
  const settings = h(
    'section',
    { class: 'gu-sec' },
    h('h3', {}, 'Settings'),
    h(
      'label',
      { class: 'gu-set' },
      h('span', {}, 'In class now'),
      sel(lessons.map((l) => [l.id, `${l.icon} ${l.title}`]), progress.settings().nowInClass, (v) => progress.setSetting('nowInClass', v), 'In class now')
    ),
    h(
      'label',
      { class: 'gu-set' },
      h('span', {}, 'Narration speed'),
      sel(
        [['0.85', 'Slower (0.85)'], ['1', 'Normal (1)'], ['1.15', 'Faster (1.15)']],
        [0.85, 1, 1.15].includes(rate) ? rate : 1,
        (v) => {
          app.voice.rate = parseFloat(v);
          progress.setSetting('voiceRate', parseFloat(v));
        },
        'Narration speed'
      )
    ),
    h(
      'label',
      { class: 'gu-set' },
      h('span', {}, 'Sound effects'),
      sel(
        [['on', 'On'], ['off', 'Off']],
        app.audio.muted ? 'off' : 'on',
        (v) => {
          app.audio.muted = v === 'off';
          progress.setSetting('sound', v === 'on');
        },
        'Sound effects'
      )
    )
  );

  // (e) reset
  const reset = h(
    'section',
    { class: 'gu-sec' },
    h(
      'button',
      {
        class: 'btn gu-danger',
        onclick: () => {
          if (confirm('Reset ALL progress (XP, stars, badges, missed questions)? This cannot be undone.')) {
            progress.reset();
            app.go('parent');
          }
        },
      },
      '🗑 Reset all progress'
    )
  );

  // (f) how it works
  const how = h(
    'section',
    { class: 'gu-sec' },
    h('h3', {}, 'How this works'),
    h(
      'p',
      { class: 'gu-muted' },
      "Each mission follows the school's 5E model: Engage (Wonder), Explore (Play), Explain (Why), Elaborate (Use It) and Evaluate (Prove It), plus a Teach It Back step. Questions he misses return in Comeback until he beats them, and quizzes rotate from a larger pool so repeat runs stay fresh."
    )
  );

  app.screen(
    h(
      'div',
      { class: 'sheet-wrap gu-wrap' },
      h('div', { class: 'sheet-head' }, h('button', { class: 'icon-btn', 'aria-label': 'Back', onclick: () => app.go('home') }, '⬅'), h('h2', {}, '👪 Grown-ups')),
      h('div', { class: 'sheet gu-sheet' }, summary, lessonsSec, weak, settings, how, reset)
    )
  );
}

import { findQuestion } from '../engine/quiz.js';
function findQ(app, key) {
  const r = findQuestion(app.lessons, key);
  return r && r.q ? r : null;
}
