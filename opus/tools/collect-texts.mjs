import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const toolsDir = dirname(fileURLToPath(import.meta.url));
const opusDir = join(toolsDir, '..');

function parseArgs(argv) {
  const args = { content: join(opusDir, 'content', 'index.js') };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--content' && argv[i + 1]) {
      args.content = resolve(argv[++i]);
    }
  }
  return args;
}

function add(set, value) {
  if (value == null) return;
  const s = String(value).trim();
  if (s) set.add(s);
}

function collectFromQuestion(set, q) {
  if (!q) return;
  add(set, q.q);
  add(set, q.explain);
  if (q.options) {
    for (const opt of q.options) {
      add(set, opt.why);
    }
  }
}

export function textsForLesson(lesson) {
  const set = new Set();
  collectFromLesson(set, lesson);
  return set;
}

export function textsForSystem(SYSTEM) {
  const set = new Set();
  for (const v of Object.values(SYSTEM)) for (const s of [].concat(v)) add(set, s);
  return set;
}

function collectFromLesson(set, lesson) {
  if (lesson.stub) return;
  add(set, lesson.bigQuestion);
  add(set, lesson.teachBack?.prompt);
  for (const p of lesson.teachBack?.pieces ?? []) add(set, p);

  for (const step of lesson.steps ?? []) {
    add(set, step.title);
    for (const beat of step.beats ?? []) {
      if (beat.say != null) add(set, beat.say);
      if (beat.verdict) {
        add(set, beat.verdict.right);
        add(set, beat.verdict.wrong);
      }
      if (beat.task?.goal) add(set, beat.task.goal);
      if (beat.predict?.q) add(set, beat.predict.q);
      if (beat.check) collectFromQuestion(set, beat.check);
    }
  }

  for (const v of lesson.vocab ?? []) {
    add(set, v.word);
    add(set, v.means);
    add(set, v.example);
    add(set, v.test);
  }

  for (const q of lesson.quiz ?? []) {
    collectFromQuestion(set, q);
  }
}

async function loadLessons(contentPath) {
  const url = pathToFileURL(contentPath).href;
  const mod = await import(url);
  const lessons = mod.LESSONS ?? mod.default?.LESSONS ?? mod.default;
  if (!Array.isArray(lessons)) {
    throw new Error(`Expected LESSONS array from ${contentPath}`);
  }
  return lessons;
}

async function main() {
  const { content } = parseArgs(process.argv);
  const lessons = await loadLessons(content);

  const set = new Set();
  for (const lesson of lessons) {
    collectFromLesson(set, lesson);
  }
  const { SYSTEM } = await import(pathToFileURL(join(dirname(content), 'system.js')).href);
  for (const v of Object.values(SYSTEM)) for (const s of [].concat(v)) add(set, s);

  const texts = [...set].sort();
  const totalChars = texts.reduce((n, t) => n + t.length, 0);

  const outDir = join(opusDir, '.voice-cache');
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, 'texts.json');
  writeFileSync(outPath, JSON.stringify(texts, null, 0), 'utf8');

  console.log(`${texts.length} unique texts, ${totalChars} characters`);
  console.log(`Wrote ${outPath}`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
