import { Stage } from '../engine/stage.js';
import { Audio } from '../engine/audio.js';
import { Voice } from '../engine/voice.js';
import { Vespa } from '../engine/vespa.js';
import { progress } from '../engine/progress.js';
import { LESSONS } from '../../content/index.js';
import { SYSTEM } from '../../content/system.js';
import { SCENES } from '../scenes/index.js';
import { h } from './ui.js';
import { Player } from './player.js';
import { renderHome } from './home.js';
import { renderVocab } from './vocab.js';
import { renderComeback } from './comeback.js';
import { renderParent } from './parent.js';

const root = document.getElementById('app');
const stageWrap = h('div', { class: 'stage-wrap' });
const screenEl = h('div', { class: 'screen' });
const scan = h('div', { class: 'scanlines' });
root.append(stageWrap, scan, screenEl);

const app = {
  lessons: LESSONS,
  scenes: SCENES,
  sys: SYSTEM,
  progress,
  stage: new Stage(stageWrap),
  audio: new Audio(),
  voice: new Voice(),
  screen(el) {
    screenEl.innerHTML = '';
    screenEl.append(el);
  },
  say(key) {
    const v = SYSTEM[key];
    return app.voice.say(Array.isArray(v) ? v[Math.floor(Math.random() * v.length)] : v);
  },
  go(route, arg) {
    app.voice.stop();
    app.route = route;
    if (route !== 'lesson') {
      app.stage.clearContent();
      app.vespa.setVisible(true);
      app.stage.setStudioVisible(true);
    }
    if (route === 'home') renderHome(app);
    else if (route === 'lesson') app.player.open(arg);
    else if (route === 'vocab') renderVocab(app, arg);
    else if (route === 'comeback') renderComeback(app);
    else if (route === 'parent') renderParent(app);
  },
};
app.vespa = new Vespa(app.stage);
app.player = new Player(app);
app.voice.rate = progress.settings().voiceRate || 1;
app.audio.muted = progress.settings().sound === false;
window.__app = app;

// First screen: one tap is needed so iPhone allows sound.
function splash() {
  app.stage.flyTo([0, 2.6, 6], [0, 1.8, 0], 10);
  app.vespa.goHome([0, 1.9, 2.2]);
  const start = h(
    'button',
    {
      class: 'btn primary big pulse',
      onclick: () => {
        app.audio.unlock();
        app.voice.unlock();
        app.audio.sfx('level');
        app.vespa.react('happy');
        const first = !progress.get().xp;
        app.go('home');
        if (first) app.say('welcome');
        else app.say('welcomeBack');
      },
    },
    '▶  Start'
  );
  app.screen(
    h(
      'div',
      { class: 'splash' },
      h('div', { class: 'splash-card' }, h('div', { class: 'brand' }, "KELENNA'S", h('br'), 'SCIENCE LAB'), h('p', {}, '4th Grade Science · 12 Missions · 3D'), start)
    )
  );
}
splash();
