/* Génère les PDF des séries (series/pdf/<chapitre>.pdf et <chapitre>-corrige.pdf).
   Utilisation, depuis le dossier du site :
     python3 -m http.server 8765   (dans un autre terminal)
     node tools/make_pdfs.js
   Nécessite Playwright (npm install playwright). */
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const src = fs.readFileSync(path.join(__dirname, '..', 'js', 'exos.js'), 'utf8');
  const ids = [...src.matchAll(/^  '([\w-]+)': \[/gm)].map(m => m[1]);
  const out = path.join(__dirname, '..', 'series', 'pdf');
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.emulateMedia({ media: 'print' });
  const foot = '<div style="width:100%;font-size:8px;color:#5b6577;padding:0 12mm;display:flex;justify-content:space-between;font-family:sans-serif">'
    + '<span>© Zakaria Lazrak — Professeur de Physique-Chimie</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>';
  for (const id of ids) {
    for (const cor of [false, true]) {
      await page.goto(`http://127.0.0.1:8765/series/serie.html?c=${id}&pdf=1${cor ? '&cor=1' : ''}`);
      await page.waitForFunction(() => window.MathJax && MathJax.startup && MathJax.startup.promise).catch(() => {});
      await page.evaluate(() => MathJax.startup.promise);
      await page.waitForTimeout(300);
      const file = path.join(out, id + (cor ? '-corrige' : '') + '.pdf');
      await page.pdf({ path: file, format: 'A4', printBackground: true, displayHeaderFooter: true, headerTemplate: '<span></span>', footerTemplate: foot,
        margin: { top: '12mm', bottom: '16mm', left: '12mm', right: '12mm' } });
      console.log(path.relative(process.cwd(), file), Math.round(fs.statSync(file).size / 1024) + ' Ko');
    }
  }
  await browser.close();
})();
