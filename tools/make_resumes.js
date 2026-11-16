/* Génère les PDF des résumés de cours (resumes/pdf/<chapitre>.pdf) pour tous les chapitres.
   Utilisation, depuis le dossier du site :
     python3 -m http.server 8765   (dans un autre terminal)
     node tools/make_resumes.js [id-du-chapitre ...]
   Nécessite Playwright (npm install playwright). */
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const root = path.join(__dirname, '..');
  const src = ['data.js', 'data-chimie.js'].map(f => fs.readFileSync(path.join(root, 'js', f), 'utf8')).join('\n');
  const all = [...src.matchAll(/\bL\('([\w-]+)'/g)].map(m => m[1]);
  const ids = process.argv.length > 2 ? process.argv.slice(2) : all;
  const out = path.join(root, 'resumes', 'pdf');
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.emulateMedia({ media: 'print' });
  for (const id of ids) {
    await page.goto(`http://127.0.0.1:8765/resumes/resume.html?c=${id}`);
    await page.waitForFunction(() => window.__ready === true);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(200);
    const file = path.join(out, id + '.pdf');
    await page.pdf({ path: file, printBackground: true, preferCSSPageSize: true });
    console.log(path.relative(root, file), Math.round(fs.statSync(file).size / 1024) + ' Ko');
  }
  await browser.close();
})();
