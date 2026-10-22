import { h, shuffle, speakBtn, confetti } from '../app/ui.js';
import { progress } from './progress.js';

// Ask one question. Kelenna keeps trying until he gets it right (that is how he learns),
// but only the first try counts as "right". Resolves to true/false (first try).
export function askQuestion(host, q, { app, key, lessonId, tag }) {
  return new Promise((resolve) => {
    let firstTry = null;
    const card = h('div', { class: 'q-card' });
    const head = h('div', { class: 'q-head' }, tag ? h('span', { class: 'q-tag' }, tag) : null, h('p', { class: 'q-text' }, q.q), speakBtn(app, q.q));
    const body = h('div', { class: 'q-body' });
    const feedback = h('div', { class: 'q-feedback', 'aria-live': 'polite' });
    const footer = h('div', { class: 'q-footer' });
    card.append(head, body, feedback, footer);
    host.innerHTML = '';
    host.append(card);
    app.voice.say(q.q);

    const showFeedback = (ok, text) => {
      feedback.className = 'q-feedback ' + (ok ? 'ok' : 'bad');
      feedback.innerHTML = '';
      feedback.append(h('strong', {}, ok ? pickPraise() : 'Not quite.'), ' ', h('span', {}, text || ''), ok ? null : h('em', {}, ' Try again!'));
      if (text) app.voice.say(text);
    };

    const markFirst = (ok) => {
      if (firstTry !== null) return;
      firstTry = ok;
      if (key) progress.answer(key, lessonId, ok);
    };

    const win = () => {
      markFirst(true);
      app.audio.sfx('win');
      app.vespa?.react('happy');
      confetti(card);
      showFeedback(true, q.explain);
      body.querySelectorAll('button').forEach((b) => (b.disabled = true));
      footer.innerHTML = '';
      footer.append(
        h('button', { class: 'btn primary big', onclick: () => { app.voice.stop(); resolve(firstTry); } }, 'Next ➜')
      );
    };

    const miss = (why) => {
      markFirst(false);
      app.audio.sfx('wrong');
      app.vespa?.react('sad');
      card.classList.remove('shake');
      void card.offsetWidth;
      card.classList.add('shake');
      showFeedback(false, why || 'Look again.');
    };

    RENDER[q.type](q, body, footer, { win, miss, app });
  });
}

const PRAISE = ['Yes!', 'Nailed it!', 'You got it!', 'Awesome!', 'Great thinking!', 'Boom! Correct!'];
const pickPraise = () => PRAISE[Math.floor(Math.random() * PRAISE.length)];

const RENDER = {
  one: choiceRender(false),
  pick: choiceRender(true),

  two(q, body, footer, { win, miss }) {
    const chosen = new Set();
    const grid = h('div', { class: 'opt-grid' });
    const check = h('button', { class: 'btn primary', disabled: true }, 'Check my 2');
    for (const o of shuffle(q.options)) {
      const b = h('button', { class: 'opt' }, h('span', { class: 'box' }), o.t);
      b.onclick = () => {
        if (chosen.has(o)) chosen.delete(o), b.classList.remove('sel');
        else if (chosen.size < 2) chosen.add(o), b.classList.add('sel');
        check.disabled = chosen.size !== 2;
      };
      o._el = b;
      grid.append(b);
    }
    check.onclick = () => {
      const wrong = [...chosen].filter((o) => !o.correct);
      if (!wrong.length) {
        [...chosen].forEach((o) => o._el.classList.add('right'));
        check.remove();
        win();
      } else {
        wrong.forEach((o) => {
          o._el.classList.remove('sel');
          o._el.classList.add('wrong');
          o._el.disabled = true;
          chosen.delete(o);
        });
        check.disabled = true;
        miss(wrong[0].why);
      }
    };
    body.append(h('p', { class: 'q-hint' }, 'Pick TWO answers.'), grid);
    footer.append(check);
  },

  sort(q, body, footer, { win, miss }) {
    let held = null;
    const pool = h('div', { class: 'sort-pool' });
    const bins = q.groups.map((g, gi) => {
      const zone = h('div', { class: 'sort-zone' });
      const bin = h('div', { class: 'sort-bin' }, h('div', { class: 'sort-title' }, g), zone);
      bin.onclick = () => {
        if (!held) return;
        zone.append(held.el);
        held.el.classList.remove('held');
        held.placed = gi;
        held = null;
        update();
      };
      return bin;
    });
    const items = shuffle(q.items).map((it) => {
      const el = h('button', { class: 'chip' }, it.t);
      const rec = { it, el, placed: null };
      el.onclick = (e) => {
        e.stopPropagation();
        if (held) held.el.classList.remove('held');
        held = rec;
        el.classList.add('held');
        el.classList.remove('wrong');
      };
      pool.append(el);
      return rec;
    });
    const check = h('button', { class: 'btn primary', disabled: true }, 'Check');
    const update = () => (check.disabled = items.some((r) => r.placed === null));
    check.onclick = () => {
      const bad = items.filter((r) => r.placed !== r.it.g);
      if (!bad.length) {
        items.forEach((r) => r.el.classList.add('right'));
        check.remove();
        win();
      } else {
        bad.forEach((r) => {
          r.el.classList.add('wrong');
          pool.append(r.el);
          r.placed = null;
        });
        update();
        miss('Some cards are in the wrong group. They went back to the top.');
      }
    };
    body.append(h('p', { class: 'q-hint' }, 'Tap a card, then tap the group it belongs in.'), pool, h('div', { class: 'sort-bins' }, bins));
    footer.append(check);
  },

  order(q, body, footer, { win, miss }) {
    const slots = h('ol', { class: 'order-slots' });
    const pool = h('div', { class: 'order-pool' });
    let picked = [];
    const cards = shuffle(q.items.map((t, i) => ({ t, i })));
    const check = h('button', { class: 'btn primary', disabled: true }, 'Check order');
    const draw = () => {
      slots.innerHTML = '';
      q.items.forEach((_, n) => {
        const c = picked[n];
        slots.append(
          h('li', { class: 'order-slot' + (c ? ' filled' : ''), onclick: () => c && ((picked = picked.filter((x) => x !== c)), draw()) }, c ? c.t : '')
        );
      });
      pool.innerHTML = '';
      cards.filter((c) => !picked.includes(c)).forEach((c) => pool.append(h('button', { class: 'chip', onclick: () => (picked.push(c), draw()) }, c.t)));
      check.disabled = picked.length !== q.items.length;
    };
    check.onclick = () => {
      const firstBad = picked.findIndex((c, n) => c.i !== n);
      if (firstBad < 0) {
        check.remove();
        pool.remove();
        slots.querySelectorAll('li').forEach((li) => li.classList.add('right'));
        win();
      } else {
        picked = picked.slice(0, firstBad);
        draw();
        miss(firstBad === 0 ? 'The first step is not right yet.' : 'Some steps are out of order. The right ones stayed.');
      }
    };
    body.append(h('p', { class: 'q-hint' }, 'Tap the cards in the right order. Tap a slot to take a card back.'), slots, pool);
    footer.append(check);
    draw();
  },
};

function choiceRender(pictures) {
  return (q, body, footer, { win, miss }) => {
    const grid = h('div', { class: pictures ? 'pick-grid' : 'opt-grid' });
    for (const o of shuffle(q.options)) {
      const b = h('button', { class: pictures ? 'pick' : 'opt' }, pictures ? h('span', { class: 'pick-emoji' }, o.emoji || '❔') : null, h('span', {}, o.t));
      b.onclick = () => {
        if (o.correct) {
          b.classList.add('right');
          win();
        } else {
          b.classList.add('wrong');
          b.disabled = true;
          miss(o.why);
        }
      };
      grid.append(b);
    }
    body.append(grid);
  };
}

// Pick N questions: missed ones first (so he gets another shot), then fresh ones, shuffled.
export function drawQuestions(lesson, n) {
  const all = lesson.quiz.map((q, i) => ({ q, key: `${lesson.id}:q${i}` }));
  const missed = new Set(progress.missedKeys(lesson.id));
  const answered = progress.get().answered;
  const again = shuffle(all.filter((x) => missed.has(x.key))).slice(0, Math.ceil(n / 3));
  const rest = all.filter((x) => !again.includes(x));
  rest.sort((a, b) => (answered[a.key]?.right || 0) - (answered[b.key]?.right || 0) + (Math.random() - 0.5) * 1.5);
  return shuffle([...again, ...rest.slice(0, n - again.length)]);
}

export function findQuestion(lessons, key) {
  const [lid, part, c] = key.split(':');
  const lesson = lessons.find((l) => l.id === lid);
  if (!lesson) return null;
  if (part.startsWith('q')) return { lesson, q: lesson.quiz[+part.slice(1)] };
  const step = lesson.steps.find((s) => s.id === part);
  const beat = step?.beats[+c?.slice(1)];
  return beat?.check ? { lesson, q: beat.check } : null;
}
