// Browser QA driver. Load into the running app (served over http), then:
//   await __drive(lessonIndex, maxIterations)
// It plays a whole lesson: answers predictions, does tasks through scene cues/tray controls,
// answers quiz questions (retrying until right), builds the teach-back, and returns a log plus errors.
(() => {
  window.__errs = [];
  window.addEventListener('error', (e) => __errs.push(e.message));
  window.addEventListener('unhandledrejection', (e) => __errs.push(String(e.reason)));
  const w = console.warn, er = console.error;
  console.warn = (...a) => (__errs.push('WARN ' + a.join(' ')), w(...a));
  console.error = (...a) => (__errs.push('ERR ' + a.join(' ')), er(...a));

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const setRange = async (v) => {
    const r = document.querySelector('.tray input[type=range]');
    if (!r) return false;
    r.value = v;
    r.dispatchEvent(new Event('input'));
    return true;
  };

  // Generic task solver: tries scene buttons, sliders across their range, taps and drags on registered objects.
  async function solveTask() {
    const app = window.__app;
    const scene = app.player.scene;
    const stage = app.stage;
    const r = document.querySelector('.tray input[type=range]');
    if (r) {
      const min = +r.min, max = +r.max;
      for (const f of [0, 0.5, 1, 0.25, 0.75, 1]) {
        await setRange(min + (max - min) * f);
        await sleep(250);
      }
    }
    for (const b of document.querySelectorAll('.tray .tool-btn')) {
      b.click();
      await sleep(600);
    }
    for (const [obj, fn] of [...stage.tapTargets]) {
      fn(obj.getWorldPosition(new obj.position.constructor()));
      await sleep(900);
    }
    for (const [obj, { opts }] of [...stage.dragTargets]) {
      const P = obj.position.constructor;
      const pts = Object.values(scene.points || {});
      opts.onStart?.();
      for (const p of pts) {
        opts.onMove?.(new P(p[0], obj.position.y, p[2]));
        await sleep(150);
      }
      opts.onEnd?.();
    }
  }

  window.__drive = async function (lessonIdx, maxIters = 800) {
    const app = window.__app;
    const L = app.lessons[lessonIdx];
    const log = [];
    const allQ = [...L.quiz, ...L.steps.flatMap((s) => s.beats.filter((b) => b.check).map((b) => b.check))];
    const findQ = (t) => allQ.find((q) => q.q === t);
    let lastKey = '', same = 0, taskTries = 0;
    for (let i = 0; i < maxIters; i++) {
      await sleep(400);
      const panel = document.querySelector('.panel');
      const txt = (panel?.innerText || '').slice(0, 70).replace(/\n/g, ' | ');
      const phase = document.querySelector('.phase-chip')?.innerText;
      const key = phase + '#' + txt;
      if (key === lastKey) same++;
      else (same = 0), log.push(phase + ' :: ' + txt);
      lastKey = key;
      if (same > 120) {
        log.push('STUCK');
        break;
      }
      if (app.route !== 'lesson' && i > 3) {
        log.push('EXITED to ' + app.route);
        break;
      }
      const btn = (re) => [...document.querySelectorAll('.panel button')].find((b) => !b.disabled && b.offsetParent && re.test(b.textContent));
      let b;
      if ((b = btn(/Let's go|^Next|Got it|I'm ready|Back to the map/))) {
        if (/Back to the map/.test(b.textContent)) {
          log.push('FINISHED');
          b.click();
          break;
        }
        b.click();
        taskTries = 0;
        continue;
      }
      const goal = document.querySelector('.task-goal')?.innerText;
      if (goal) {
        if (taskTries++ < 2) await solveTask();
        else {
          const skip = btn(/Skip/);
          if (skip) {
            log.push('TASK NOT SOLVED, skipped: ' + goal);
            skip.click();
          }
        }
        await sleep(800);
        continue;
      }
      const pred = document.querySelector('.predict .opt');
      if (pred) {
        pred.click();
        continue;
      }
      if (document.querySelector('.teach')) {
        for (const p of L.teachBack.pieces) {
          const c = [...document.querySelectorAll('.tb-pool .chip')].find((x) => x.textContent === p);
          c && c.click();
          await sleep(120);
        }
        await sleep(1500);
        continue;
      }
      const qt = document.querySelector('.q-card .q-text')?.innerText;
      const q = qt && findQ(qt);
      if (q) {
        if (q.type === 'one' || q.type === 'pick') {
          const o = [...document.querySelectorAll('.q-body button')].find((x) => !x.disabled);
          o && o.click();
        } else if (q.type === 'two') {
          const right = q.options.filter((o) => o.correct).map((o) => o.t);
          for (const o of document.querySelectorAll('.q-body .opt')) if (right.some((r) => o.textContent.endsWith(r))) o.click();
          btn(/Check/)?.click();
        } else if (q.type === 'sort') {
          for (const it of q.items) {
            const chip = [...document.querySelectorAll('.sort-pool .chip')].find((c) => c.textContent === it.t);
            if (!chip) continue;
            chip.click();
            document.querySelectorAll('.sort-bin')[it.g].click();
            await sleep(50);
          }
          btn(/Check/)?.click();
        } else if (q.type === 'order') {
          for (const t of q.items) {
            const chip = [...document.querySelectorAll('.order-pool .chip')].find((c) => c.textContent === t);
            chip && chip.click();
            await sleep(50);
          }
          btn(/Check/)?.click();
        }
      } else if (qt) log.push('UNKNOWN QUESTION ' + qt);
    }
    return { log, errs: window.__errs, xp: app.progress.get().xp, fps: Math.round(app.stage.fps || 0) };
  };
})();
