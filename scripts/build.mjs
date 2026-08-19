import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { renderCv } from './lib/cv.mjs';
import { renderHome } from './lib/home.mjs';
import { validateContent } from './lib/validate.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const contentPath = resolve(root, 'content/site.json');
const checkOnly = process.argv.includes('--check');

const content = JSON.parse(await readFile(contentPath, 'utf8'));
validateContent(content);

const outputs = new Map([
  ['index.html', renderHome(content)],
  ['cv.html', renderCv(content)],
]);

let stale = false;
for (const [filename, generated] of outputs) {
  const outputPath = resolve(root, filename);

  if (checkOnly) {
    const existing = await readFile(outputPath, 'utf8').catch(() => '');
    if (existing !== generated) {
      console.error(`${filename} is out of date. Run: node scripts/build.mjs`);
      stale = true;
    }
    continue;
  }

  await writeFile(outputPath, generated);
  console.log(`Generated ${filename}`);
}

if (stale) process.exitCode = 1;
