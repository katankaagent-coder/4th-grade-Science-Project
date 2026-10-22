import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';
import * as esbuild from 'esbuild';

const toolsDir = dirname(fileURLToPath(import.meta.url));
const opusDir = join(toolsDir, '..');
const outHtml = resolve(opusDir, '..', 'dist', 'kelenna-science-3d-suite Opus.html');

function parseArgs(argv) {
  const args = {
    dev: false,
    noVoice: false,
    entry: join(opusDir, 'src', 'app', 'main.js'),
    css: join(opusDir, 'src', 'styles', 'app.css'),
  };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--dev') args.dev = true;
    else if (argv[i] === '--no-voice') args.noVoice = true;
    else if (argv[i] === '--entry' && argv[i + 1]) args.entry = resolve(argv[++i]);
    else if (argv[i] === '--css' && argv[i + 1]) args.css = resolve(argv[++i]);
  }
  return args;
}

function sha1(text) {
  return createHash('sha1').update(text, 'utf8').digest('hex');
}

function fontFace(family, weight, woff2Path) {
  const data = readFileSync(woff2Path).toString('base64');
  return `@font-face{font-family:'${family}';font-style:normal;font-weight:${weight};font-display:swap;src:url(data:font/woff2;base64,${data}) format('woff2');}`;
}

function buildFontCss() {
  const ah = join(opusDir, 'node_modules', '@fontsource', 'atkinson-hyperlegible', 'files');
  const orb = join(opusDir, 'node_modules', '@fontsource', 'orbitron', 'files');
  return [
    fontFace('Atkinson Hyperlegible', 400, join(ah, 'atkinson-hyperlegible-latin-400-normal.woff2')),
    fontFace('Atkinson Hyperlegible', 700, join(ah, 'atkinson-hyperlegible-latin-700-normal.woff2')),
    fontFace('Orbitron', 700, join(orb, 'orbitron-latin-700-normal.woff2')),
    fontFace('Orbitron', 900, join(orb, 'orbitron-latin-900-normal.woff2')),
  ].join('');
}

function loadVoiceEmbed() {
  const cacheDir = join(opusDir, '.voice-cache');
  const textsPath = join(cacheDir, 'texts.json');
  if (!existsSync(textsPath)) {
    console.log('Voice: no texts.json — skipping voice embed');
    return { script: '', bytes: 0, missing: 0, total: 0 };
  }

  const texts = JSON.parse(readFileSync(textsPath, 'utf8'));
  const voice = {};
  let missing = 0;

  for (const text of texts) {
    const key = sha1(text);
    const mp3Path = join(cacheDir, `${key}.mp3`);
    const jsonPath = join(cacheDir, `${key}.json`);
    if (!existsSync(mp3Path) || !existsSync(jsonPath)) {
      missing++;
      continue;
    }
    const a = readFileSync(mp3Path).toString('base64');
    const { w } = JSON.parse(readFileSync(jsonPath, 'utf8'));
    voice[text] = { a, w };
  }

  const json = JSON.stringify(voice).replace(/</g, '\\u003c');
  const script = `<script id="kvoice" type="application/json">${json}</script>`;
  return { script, bytes: Buffer.byteLength(script, 'utf8'), missing, total: texts.length };
}

async function bundleJs(entry, dev) {
  const result = await esbuild.build({
    entryPoints: [entry],
    bundle: true,
    format: 'iife',
    minify: !dev,
    target: 'es2020',
    write: false,
    legalComments: 'none',
    logLevel: 'warning',
  });
  let code = result.outputFiles[0].text;
  code = code.replace(/<\/script/gi, '<\\/script');
  return code;
}

async function main() {
  const args = parseArgs(process.argv);

  const jsCode = await bundleJs(args.entry, args.dev);
  const jsBytes = Buffer.byteLength(jsCode, 'utf8');

  const appCss = readFileSync(args.css, 'utf8');
  const cssBlock = buildFontCss() + appCss;
  const cssBytes = Buffer.byteLength(cssBlock, 'utf8');

  let voiceScript = '';
  let voiceBytes = 0;
  let voiceMissing = 0;
  if (!args.noVoice) {
    const v = loadVoiceEmbed();
    voiceScript = v.script;
    voiceBytes = v.bytes;
    voiceMissing = v.missing;
    console.log(`Voice: ${v.total - v.missing}/${v.total} embedded, ${v.missing} missing audio`);
  }

  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no"><meta name="theme-color" content="#060709"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"><title>Kelenna's Science Lab</title><style>${cssBlock}</style></head><body><div id="app"></div>${voiceScript}<script>${jsCode}</script></body></html>`;

  mkdirSync(dirname(outHtml), { recursive: true });
  writeFileSync(outHtml, html, 'utf8');

  const totalBytes = Buffer.byteLength(html, 'utf8');
  const mb = (totalBytes / (1024 * 1024)).toFixed(2);
  console.log(`Wrote ${outHtml}`);
  console.log(`Size: ${mb} MB (js ${(jsBytes / 1024).toFixed(0)} KB, css+fonts ${(cssBytes / 1024).toFixed(0)} KB, voice ${(voiceBytes / 1024).toFixed(0)} KB)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
