import { h } from './ui.js';
import { progress } from '../engine/progress.js';

const UNITS = [
  { n: 1, title: 'Matter', sub: 'What stuff is made of' },
  { n: 2, title: 'Force & Energy', sub: 'Pushes, pulls, and power' },
  { n: 3, title: 'Earth & Space', sub: 'Sun, Moon, water, and land' },
  { n: 4, title: 'Living Things', sub: 'Food webs and traits' },
];

export function renderHome(app) {
  const s = progress.get();
  const narrow = window.innerWidth < 700;
  app.stage.flyTo(narrow ? [0, 2.6, 8] : [1.6, 2.4, 7.5], narrow ? [0, 2.6, 0] : [1.6, 1.6, 0], 1400);
  app.vespa.setSize(1.2);
  app.vespa.goHome(narrow ? [0, 3.4, 0] : [-1.2, 1.9, 0.5]);

  const nowId = s.settings.nowInClass;
  const missedN = progress.missedKeys().length;
  const head = h(
    'header',
    { class: 'home-top' },
    h('div', { class: 'brand sm' }, "KELENNA'S SCIENCE LAB"),
    h('div', { class: 'chips' }, h('span', { class: 'xp-chip' }, `⚡ ${s.xp} XP`), s.streak.count > 1 ? h('span', { class: 'xp-chip fire' }, `🔥 ${s.streak.count} days`) : null)
  );
  const nav = h(
    'nav',
    { class: 'home-nav' },
    h('button', { class: 'nav-btn', onclick: () => app.go('vocab') }, h('span', { class: 'e' }, '📖'), 'Word Lab'),
    h('button', { class: 'nav-btn', onclick: () => app.go('comeback') }, h('span', { class: 'e' }, '🔁'), 'Comeback', missedN ? h('span', { class: 'count' }, missedN) : null),
    h('button', { class: 'nav-btn', onclick: () => app.go('parent') }, h('span', { class: 'e' }, '👪'), 'Grown-ups')
  );

  const units = UNITS.map((u) => {
    const lessons = app.lessons.filter((l) => l.unit === u.n);
    return h(
      'section',
      { class: 'unit' },
      h('h3', {}, h('span', { class: 'u-num' }, `Unit ${u.n}`), u.title, h('small', {}, u.sub)),
      h(
        'div',
        { class: 'tiles' },
        lessons.map((l) => {
          const p = progress.lesson(l.id);
          const total = l.steps.length + 3;
          const done = Object.keys(p.steps).length;
          const pct = l.stub ? 0 : Math.min(100, Math.round((done / total) * 100));
          return h(
            'button',
            {
              class: 'tile' + (l.stub ? ' soon' : '') + (l.id === nowId ? ' now' : '') + (p.badge ? ' badged' : ''),
              style: { '--c': l.color, '--p': pct },
              disabled: l.stub ? true : null,
              onclick: () => {
                app.audio.sfx('whoosh');
                app.go('lesson', l);
              },
            },
            l.id === nowId ? h('span', { class: 'now-tag' }, 'In class now') : null,
            h('span', { class: 'ring' }, h('span', { class: 'icon' }, l.icon)),
            h('span', { class: 't-title' }, l.title),
            h('span', { class: 't-sub' }, l.testTitle),
            h('span', { class: 't-meta' }, l.stub ? 'Coming soon' : `${'★'.repeat(p.stars)}${'☆'.repeat(3 - p.stars)}  ·  ${pct}%`)
          );
        })
      )
    );
  });

  const slider = h('input', { type: 'range', min: 0, max: 1, step: 0.01, value: 0, 'aria-label': 'Look inside Vespa' });
  slider.addEventListener('input', () => app.vespa.setExplode(parseFloat(slider.value)));
  const vespaBox = h(
    'div',
    { class: 'vespa-box' },
    h('label', { class: 'tool-slider' }, h('span', {}, '🔧 Look inside Vespa'), slider)
  );

  app.screen(h('div', { class: 'home' }, head, vespaBox, h('div', { class: 'home-scroll' }, nav, units)));
}
