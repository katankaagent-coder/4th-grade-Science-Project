import { h, shuffle, confetti } from './ui.js';
import { askQuestion, findQuestion } from '../engine/quiz.js';

// Comeback: another shot at the questions that tricked Kelenna before.
export async function renderComeback(app) {
  app.vespa.goHome([-2.2, 2.6, 0]);
  if (window.matchMedia('(max-width: 899px)').matches) app.vespa.setVisible(false);

  const body = h('div', { class: 'sheet cb-sheet' });
  const back = () => app.go('home');
  app.screen(
    h(
      'div',
      { class: 'sheet-wrap cb-wrap' },
      h('div', { class: 'sheet-head' }, h('button', { class: 'icon-btn', 'aria-label': 'Back', onclick: back }, '⬅'), h('h2', {}, '🔁 Comeback')),
      body
    )
  );
  const route = app.route;
  const alive = () => app.route === route && document.body.contains(body);

  const items = app.progress
    .missedKeys()
    .map((key) => ({ key, r: findQuestion(app.lessons, key) }))
    .filter((x) => x.r && x.r.q);

  if (!items.length) {
    body.append(
      h(
        'div',
        { class: 'cb-empty' },
        h('div', { class: 'big-emoji' }, '🏆'),
        h('h3', {}, 'Nothing to beat!'),
        h('p', {}, 'You have no tricky questions waiting. Great job!'),
        h('button', { class: 'btn primary big', onclick: back }, '🏠 Home')
      )
    );
    confetti(body.parentElement);
    app.vespa.react('happy');
    app.say('comebackEmpty');
    return;
  }

  app.say('comebackIntro');
  const run = shuffle(items).slice(0, 8);
  let beaten = 0;
  const host = h('div', { class: 'cb-host' });
  body.append(host);
  for (let i = 0; i < run.length; i++) {
    if (!alive()) return;
    const { key, r } = run[i];
    const bar = h('div', { class: 'quiz-bar' }, h('i', { style: { width: (i / run.length) * 100 + '%' } }));
    const qHost = h('div');
    host.innerHTML = '';
    host.append(bar, qHost);
    const ok = await askQuestion(qHost, r.q, { app, key, lessonId: r.lesson.id, tag: r.lesson.icon + ' ' + r.lesson.title });
    if (ok) beaten++;
  }
  if (!alive()) return;
  app.audio.sfx(beaten >= run.length / 2 ? 'level' : 'click');
  host.innerHTML = '';
  const left = app.progress.missedKeys().length;
  host.append(
    h(
      'div',
      { class: 'result cb-result' },
      h('div', { class: 'stars' }, beaten === run.length ? '🌟🌟🌟' : beaten ? '🌟' : '💪'),
      h('p', { class: 'score' }, `You beat ${beaten} of ${run.length} on the first try!`),
      h('p', { class: 'cb-note' }, left ? 'The tricky ones will come back so you can beat them too.' : 'All your tricky questions are beaten!'),
      h('div', { class: 'row' }, h('button', { class: 'btn primary big', onclick: back }, '🏠 Home'))
    )
  );
  if (beaten) {
    confetti(body.parentElement);
    app.vespa.react('happy');
  }
}
