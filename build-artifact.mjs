// Single-File Gemini Artifact & Chromebook/iPhone Offline Bundler
// Combines the modular ES6 codebase into a standalone single-file HTML5 distribution:
// dist/kelenna-science-3d-suite.html

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function read(relPath) {
  return fs.readFileSync(path.join(root, relPath), 'utf8');
}

function stripImportsExports(code) {
  return code
    .replace(/^\s*import\s+[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm, '')
    .replace(/^\s*export\s+default\s+/gm, '')
    .replace(/^\s*export\s+(const|let|var|class|function)\s+/gm, '$1 ');
}

const css = read('src/styles/lab-theme.css');
const jsFiles = [
  'src/engine/ProceduralTextures.js',
  'src/engine/AudioEngine.js',
  'src/engine/MasterTimeline.js',
  'src/engine/StageManager.js',
  'src/data/curriculum_u1_u2.js',
  'src/data/curriculum_u3_u4.js',
  'src/modules/unit1_2_modules.js',
  'src/modules/unit3_modules.js',
  'src/modules/unit4_modules.js',
  'src/main.js'
];

const combinedJs = jsFiles
  .map((f) => `\n/* ===== FILE: ${f} ===== */\n` + stripImportsExports(read(f)))
  .join('\n');

let html = read('index.html');
html = html.replace(
  '<link rel="stylesheet" href="./src/styles/lab-theme.css" />',
  `<style>\n${css}\n</style>`
);
html = html.replace(
  '<script type="module" src="./src/main.js"></script>',
  `<script>\n(() => {\n${combinedJs}\n})();\n</script>`
);

fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
const outPath = path.join(root, 'dist', 'kelenna-science-3d-suite.html');
fs.writeFileSync(outPath, html, 'utf8');
console.log(`Built standalone Gemini Artifact HTML: ${outPath} (${(html.length / 1024).toFixed(1)} KB)`);
