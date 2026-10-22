import { readFileSync, existsSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const toolsDir = dirname(fileURLToPath(import.meta.url));
const defaultOpusDir = join(toolsDir, '..');

const PHASE_ORDER = { wonder: 0, play: 1, why: 2, words: 3, useit: 4 };
const VALID_PHASES = new Set(Object.keys(PHASE_ORDER));
const BEAT_KEYS = ['say', 'cue', 'predict', 'verdict', 'task', 'check', 'wiggle'];

const JARGON = [
  'ferrous', 'illuminated', 'illuminate', 'illumination', 'cyclical', 'neodymium',
  'subsequently', 'therefore', 'consequently', 'approximately', 'utilize',
  'phenomenon', 'phenomena', 'characteristic', 'characteristics', 'commence',
  'sufficient', 'numerous', 'facilitate', 'significant', 'significantly',
  'predominantly', 'molecular', 'molecule', 'molecules', 'buoyancy', 'kinetic',
  'synthesize', 'equilibrium', 'velocity', 'acceleration', 'aforementioned',
  'respectively', 'thus', 'hence',
];

const jargonRe = new RegExp(
  `\\b(?:${JARGON.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})s?\\b`,
  'gi',
);

function parseArgs(argv) {
  const args = {
    content: join(defaultOpusDir, 'content', 'index.js'),
    root: defaultOpusDir,
    lesson: null,
  };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--content' && argv[i + 1]) args.content = resolve(argv[++i]);
    else if (argv[i] === '--root' && argv[i + 1]) args.root = resolve(argv[++i]);
    else if (argv[i] === '--lesson' && argv[i + 1]) args.lesson = argv[++i];
  }
  return args;
}

function splitSentences(text) {
  const sentences = [];
  let current = '';
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    current += ch;
    if (ch === '!' || ch === '?') {
      sentences.push(current.trim());
      current = '';
    } else if (ch === '.') {
      const prev = text[i - 1];
      const next = text[i + 1];
      if (!(prev && next && /\d/.test(prev) && /\d/.test(next))) {
        sentences.push(current.trim());
        current = '';
      }
    }
  }
  if (current.trim()) sentences.push(current.trim());
  return sentences.filter(Boolean);
}

function wordCount(s) {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

function checkSentenceLengths(text, maxWords, loc, errors, exempt) {
  if (exempt || !text) return;
  for (const sent of splitSentences(String(text))) {
    const n = wordCount(sent);
    if (n > maxWords) {
      errors.push(`${loc}: sentence has ${n} words (max ${maxWords}): "${sent.slice(0, 60)}…"`);
    }
  }
}

function checkJargon(text, loc, errors, exempt) {
  if (exempt || !text) return;
  jargonRe.lastIndex = 0;
  let m;
  while ((m = jargonRe.exec(text)) !== null) {
    errors.push(`${loc}: jargon "${m[0]}"`);
  }
}

function checkQuestion(q, loc, errors, warnings) {
  const types = ['one', 'two', 'sort', 'order', 'pick'];
  if (!types.includes(q.type)) {
    errors.push(`${loc}: invalid type "${q.type}"`);
    return;
  }
  if (!q.explain || !String(q.explain).trim()) {
    errors.push(`${loc}: missing explain`);
  }

  checkSentenceLengths(q.q, 20, `${loc}.q`, errors, false);
  checkJargon(q.q, `${loc}.q`, errors, false);
  if (q.explain) {
    checkSentenceLengths(q.explain, 20, `${loc}.explain`, errors, false);
    checkJargon(q.explain, `${loc}.explain`, errors, false);
  }

  const opts = q.options ?? [];
  if (q.type === 'one' || q.type === 'pick') {
    const correct = opts.filter((o) => o.correct);
    if (correct.length !== 1) errors.push(`${loc}: need exactly 1 correct (${correct.length})`);
    if (opts.length < 3 || opts.length > 4) errors.push(`${loc}: need 3-4 options (${opts.length})`);
  }
  if (q.type === 'two') {
    const correct = opts.filter((o) => o.correct);
    if (correct.length !== 2) errors.push(`${loc}: need exactly 2 correct (${correct.length})`);
    if (opts.length < 4 || opts.length > 5) errors.push(`${loc}: need 4-5 options (${opts.length})`);
  }
  if (q.type === 'pick') {
    for (let i = 0; i < opts.length; i++) {
      if (!opts[i].emoji) errors.push(`${loc}.options[${i}]: pick option missing emoji`);
    }
  }
  if (q.type === 'one' || q.type === 'two' || q.type === 'pick') {
    for (let i = 0; i < opts.length; i++) {
      const o = opts[i];
      if (o.t) {
        checkSentenceLengths(o.t, 20, `${loc}.options[${i}].t`, errors, false);
        checkJargon(o.t, `${loc}.options[${i}].t`, errors, false);
      }
      if (!o.correct && (!o.why || !String(o.why).trim())) {
        errors.push(`${loc}.options[${i}]: non-correct option missing why`);
      }
      if (o.why) {
        checkSentenceLengths(o.why, 20, `${loc}.options[${i}].why`, errors, false);
        checkJargon(o.why, `${loc}.options[${i}].why`, errors, false);
      }
    }
  }
  if (q.type === 'sort') {
    const groups = q.groups ?? [];
    const items = q.items ?? [];
    if (groups.length < 2) errors.push(`${loc}: sort needs >=2 groups`);
    if (items.length < 4) errors.push(`${loc}: sort needs >=4 items`);
    for (let i = 0; i < items.length; i++) {
      const g = items[i].g;
      if (!Number.isInteger(g) || g < 0 || g >= groups.length) {
        errors.push(`${loc}.items[${i}]: invalid group index ${g}`);
      }
    }
  }
  if (q.type === 'order') {
    const items = q.items ?? [];
    if (items.length < 3 || items.length > 6) {
      errors.push(`${loc}: order needs 3-6 items (${items.length})`);
    }
  }
}

function sceneContainsName(source, name) {
  const re = new RegExp(`\\b${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*[:(]`);
  return re.test(source);
}

function lintLesson(lesson, opusRoot, report) {
  const id = lesson.id ?? '?';
  const errors = [];
  const warnings = [];

  const required = ['id', 'num', 'title', 'teks', 'steps', 'vocab', 'quiz', 'teachBack'];
  for (const key of required) {
    if (lesson[key] == null) errors.push(`${id}: missing field "${key}"`);
  }
  if (lesson.teachBack && !lesson.teachBack.prompt) {
    errors.push(`${id}: teachBack missing prompt`);
  }
  if (lesson.teachBack?.prompt) {
    checkSentenceLengths(lesson.teachBack.prompt, 20, `${id}.teachBack.prompt`, errors, false);
    checkJargon(lesson.teachBack.prompt, `${id}.teachBack.prompt`, errors, false);
  }

  const ladder = lesson.ladder ?? [];
  if (ladder.length < 4 || ladder.length > 6) {
    errors.push(`${id}: ladder must have 4-6 items (${ladder.length})`);
  }

  const steps = lesson.steps ?? [];
  if (steps.length < 6 || steps.length > 10) {
    warnings.push(`${id}: steps count ${steps.length} (expected 6-10)`);
  }

  let lastPhase = -1;
  for (const step of steps) {
    const phase = step.phase;
    if (!VALID_PHASES.has(phase)) {
      warnings.push(`${id}/${step.id}: invalid phase "${phase}"`);
    } else {
      // play and why may alternate; wonder must come first and useit last.
      const ord = PHASE_ORDER[phase];
      if ((phase === 'wonder' && lastPhase > 0) || (phase !== 'useit' && lastPhase === 4)) {
        warnings.push(`${id}/${step.id}: phase "${phase}" out of order (wonder first, useit last)`);
      }
      lastPhase = Math.max(lastPhase, ord);
    }

    let seenPredict = false;
    for (let bi = 0; bi < (step.beats ?? []).length; bi++) {
      const beat = step.beats[bi];
      let present = BEAT_KEYS.filter((k) => beat[k] != null && beat[k] !== false);
      if (beat.say != null) present = present.filter((k) => k !== 'cue');
      if (present.length !== 1) {
        errors.push(`${id}/${step.id}/beat[${bi}]: need exactly one beat key (${present.join(', ') || 'none'})`);
      }
      if (beat.predict) seenPredict = true;
      if (beat.verdict && !seenPredict) {
        errors.push(`${id}/${step.id}/beat[${bi}]: verdict without prior predict in step`);
      }
      if (beat.say != null) {
        checkSentenceLengths(beat.say, 14, `${id}/${step.id}/beat[${bi}].say`, errors, false);
        checkJargon(beat.say, `${id}/${step.id}/beat[${bi}].say`, errors, false);
      }
      if (beat.verdict) {
        for (const side of ['right', 'wrong']) {
          checkSentenceLengths(beat.verdict[side], 14, `${id}/${step.id}/beat[${bi}].verdict.${side}`, errors, false);
          checkJargon(beat.verdict[side], `${id}/${step.id}/beat[${bi}].verdict.${side}`, errors, false);
        }
      }
      if (beat.task?.goal) {
        checkSentenceLengths(beat.task.goal, 14, `${id}/${step.id}/beat[${bi}].task.goal`, errors, false);
        checkJargon(beat.task.goal, `${id}/${step.id}/beat[${bi}].task.goal`, errors, false);
      }
      if (beat.predict?.q) {
        checkSentenceLengths(beat.predict.q, 20, `${id}/${step.id}/beat[${bi}].predict.q`, errors, false);
        checkJargon(beat.predict.q, `${id}/${step.id}/beat[${bi}].predict.q`, errors, false);
      }
      if (beat.check) {
        checkQuestion(beat.check, `${id}/${step.id}/check`, errors, warnings);
      }
    }
  }

  const vocab = lesson.vocab ?? [];
  if (vocab.length < 4 || vocab.length > 6) {
    warnings.push(`${id}: vocab count ${vocab.length} (expected 4-6)`);
  }
  for (let vi = 0; vi < vocab.length; vi++) {
    const v = vocab[vi];
    for (const field of ['means', 'example']) {
      checkSentenceLengths(v[field], 20, `${id}.vocab[${vi}].${field}`, errors, false);
      checkJargon(v[field], `${id}.vocab[${vi}].${field}`, errors, false);
    }
  }

  const quiz = lesson.quiz ?? [];
  if (quiz.length < 15) errors.push(`${id}: quiz has ${quiz.length} questions (min 15)`);
  else if (quiz.length < 25 || quiz.length > 30) {
    warnings.push(`${id}: quiz count ${quiz.length} (expected 25-30)`);
  }
  quiz.forEach((q, qi) => checkQuestion(q, `${id}.quiz[${qi}]`, errors, warnings));

  if (lesson.bigQuestion) {
    checkSentenceLengths(lesson.bigQuestion, 20, `${id}.bigQuestion`, errors, false);
    checkJargon(lesson.bigQuestion, `${id}.bigQuestion`, errors, false);
  }

  const scenePath = join(opusRoot, 'src', 'scenes', `${id}.js`);
  if (!existsSync(scenePath)) {
    errors.push(`${id}: missing scene file ${scenePath}`);
  } else {
    const sceneSrc = readFileSync(scenePath, 'utf8');
    const names = new Set();
    for (const step of steps) {
      if (step.shot) names.add(step.shot);
      for (const beat of step.beats ?? []) {
        if (beat.shot) names.add(beat.shot);
        if (beat.cue) names.add(beat.cue);
        if (beat.point) names.add(beat.point);
      }
    }
    for (const name of names) {
      if (!sceneContainsName(sceneSrc, name)) {
        errors.push(`${id}: scene missing identifier "${name}"`);
      }
    }
  }

  report.lessons.push({ id, errors, warnings });
  report.totals.errors += errors.length;
  report.totals.warnings += warnings.length;
}

async function loadLessons(contentPath) {
  const mod = await import(pathToFileURL(contentPath).href);
  const lessons = mod.LESSONS ?? mod.default?.LESSONS ?? mod.default;
  if (!Array.isArray(lessons)) throw new Error(`Expected LESSONS array from ${contentPath}`);
  return lessons;
}

async function main() {
  const args = parseArgs(process.argv);
  let lessons = await loadLessons(args.content);
  if (args.lesson) {
    lessons = lessons.filter((l) => l.id === args.lesson);
    if (!lessons.length) {
      console.error(`No lesson with id ${args.lesson}`);
      process.exit(1);
    }
  }

  const report = { lessons: [], totals: { errors: 0, warnings: 0 } };
  for (const lesson of lessons) {
    if (lesson.stub) {
      console.log(`${lesson.id}: stub (skipped)`);
      continue;
    }
    lintLesson(lesson, args.root, report);
  }

  for (const { id, errors, warnings } of report.lessons) {
    if (!errors.length && !warnings.length) continue;
    console.log(`\n${id}`);
    for (const e of errors) console.log(`  ERROR ${e}`);
    for (const w of warnings) console.log(`  warn  ${w}`);
  }

  console.log(`\nTotals: ${report.totals.errors} error(s), ${report.totals.warnings} warning(s)`);
  if (report.totals.errors > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
