// Everything Kelenna earns is saved on this device (localStorage).
const KEY = 'kelenna-science-lab-opus-v1';

const blank = () => ({
  lessons: {},      // L01: { steps: { s1: true }, quizBest: 0, quizRuns: 0, stars: 0, badge: false, lastAt }
  missed: {},       // questionKey: { lesson, n, at }
  answered: {},     // questionKey: { right, wrong }
  xp: 0,
  streak: { day: '', count: 0 },
  settings: { nowInClass: 'L01', voiceRate: 1, sound: true },
});

let state = load();

function load() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY));
    if (s && s.lessons) return { ...blank(), ...s, settings: { ...blank().settings, ...s.settings } };
  } catch {}
  return blank();
}

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {}
}

const lesson = (id) => (state.lessons[id] ||= { steps: {}, quizBest: 0, quizRuns: 0, stars: 0, badge: false });

export const progress = {
  get: () => state,
  lesson,
  settings: () => state.settings,
  setSetting(k, v) {
    state.settings[k] = v;
    save();
  },
  stepDone(id, stepId) {
    const l = lesson(id);
    if (!l.steps[stepId]) state.xp += 10;
    l.steps[stepId] = true;
    l.lastAt = Date.now();
    touchStreak();
    save();
  },
  answer(key, lessonId, right) {
    const a = (state.answered[key] ||= { right: 0, wrong: 0 });
    if (right) {
      a.right++;
      state.xp += 5;
      if (state.missed[key]) {
        state.missed[key].n--;
        if (state.missed[key].n <= 0) delete state.missed[key];
      }
    } else {
      a.wrong++;
      const m = (state.missed[key] ||= { lesson: lessonId, n: 0, at: 0 });
      m.n = Math.min(m.n + 1, 2);
      m.at = Date.now();
    }
    save();
  },
  quizResult(id, pct) {
    const l = lesson(id);
    l.quizRuns++;
    l.quizBest = Math.max(l.quizBest, pct);
    l.stars = Math.max(l.stars, pct >= 90 ? 3 : pct >= 70 ? 2 : pct >= 40 ? 1 : 0);
    state.xp += Math.round(pct / 2);
    save();
  },
  teachBackDone(id) {
    const l = lesson(id);
    if (!l.badge) state.xp += 50;
    l.badge = true;
    save();
  },
  missedKeys: (lessonId) => Object.keys(state.missed).filter((k) => !lessonId || state.missed[k].lesson === lessonId),
  reset() {
    const settings = state.settings;
    state = blank();
    state.settings = settings;
    save();
  },
};

function touchStreak() {
  const today = new Date().toDateString();
  const s = state.streak;
  if (s.day === today) return;
  const y = new Date(Date.now() - 86400000).toDateString();
  s.count = s.day === y ? s.count + 1 : 1;
  s.day = today;
}
