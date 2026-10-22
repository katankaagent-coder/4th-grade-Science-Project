import { readFileSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

const toolsDir = dirname(fileURLToPath(import.meta.url));
const opusDir = join(toolsDir, '..');
const defaultHtml = resolve(opusDir, '..', 'dist', 'kelenna-science-3d-suite Opus.html');

const PATTERNS = [
  { name: 'src=http(s)', re: /src=["']https?:/gi },
  { name: 'href=http(s)', re: /href=["']https?:/gi },
  { name: 'url(http(s))', re: /url\(['"]?https?:/gi },
  { name: '@import', re: /@import/gi },
  { name: 'fetch(http(s))', re: /fetch\(["'`]https?:/gi },
  { name: 'import(http(s))', re: /import\(["'`]https?:/gi },
];

function main() {
  const htmlPath = process.argv[2] ? resolve(process.argv[2]) : defaultHtml;
  let html;
  try {
    html = readFileSync(htmlPath, 'utf8');
  } catch {
    console.error(`Cannot read: ${htmlPath}`);
    process.exit(1);
  }

  const hits = [];
  for (const { name, re } of PATTERNS) {
    re.lastIndex = 0;
    if (re.test(html)) hits.push(name);
  }

  if (hits.length) {
    console.log('FAIL — external loads detected:');
    for (const h of hits) console.log(`  - ${h}`);
    process.exit(1);
  }

  console.log('PASS — no external resource loads detected');
  console.log(`Checked: ${htmlPath}`);
}

main();
