/* Correction « manuscrite » : papier Seyès, encre bleue, titres rouges, résultats encadrés.
   node manuscrit.js contenu.js sortie.pdf */
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
const D = __dirname;
// aides de rédaction utilisées par les fichiers de contenu
global.F = (a, b) => `<span class="fr"><span>${a}</span><span>${b}</span></span>`;   // fraction
global.B = x => `<span class="bx">${x}</span>`;                                   // résultat encadré
global.R = x => `<span class="r">${x}</span>`;                                     // en rouge
global.V = x => `<span class="vec">${x}</span>`;                                    // vecteur
global.EX = (n, t) => `<h2 class="ex"><span>Exercice ${n} : ${t}</span></h2>`;
global.TAB = (rows, head) => `<table class="tb">${head ? `<tr>${head.map(h => `<th>${h}</th>`).join('')}</tr>` : ''}${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</table>`;

const [src, out] = process.argv.slice(2); const C = require(path.resolve(src));
const font = w => `url(data:font/woff2;base64,${fs.readFileSync(path.join(D, `kalam-${w}.woff2`)).toString('base64')})`;
const logo = 'data:image/jpeg;base64,' + fs.readFileSync(path.join(D, '..', '..', 'assets', 'logo.jpg')).toString('base64');
const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>${C.title}</title><style>
@font-face { font-family: K; src: ${font(400)}; font-weight: 400; } @font-face { font-family: K; src: ${font(700)}; font-weight: 700; }
@page { size: 210mm 296mm; margin: 16mm 0 16mm 0; }
html { background:
  linear-gradient(90deg, transparent 27.7mm, #e35050 27.7mm, #e35050 28.1mm, transparent 28.1mm),
  repeating-linear-gradient(180deg, #6f86d6 0, #6f86d6 .28mm, transparent .28mm, transparent 8mm),
  repeating-linear-gradient(180deg, #c9d2f2 0, #c9d2f2 .18mm, transparent .18mm, transparent 2mm),
  repeating-linear-gradient(90deg, #d5dcf5 0, #d5dcf5 .18mm, transparent .18mm, transparent 8mm) #fff;
  background-position: 0 ${C.shift || '5.7mm'}; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin: 0; padding: 0 13mm 0 31mm; font-family: K, cursive; font-size: 16.2px; line-height: 8mm; color: #22409f; }
p, li { margin: 0; padding-left: 6mm; text-indent: -6mm; } p.ind { padding-left: 12mm; text-indent: -6mm; } p * { text-indent: 0; }
.top { display: grid; grid-template-columns: 1fr auto; height: 24mm; margin-left: -25mm; }
.top .who { font-size: 13px; line-height: 4.5mm; color: #22409f; }
.top h1 { margin: 0; font-size: 27px; line-height: 9mm; color: #c8102e; font-weight: 400; text-decoration: underline; text-decoration-thickness: 1.5px; text-underline-offset: 3px; text-align: center; }
.top .sub { text-align: center; font-size: 17px; line-height: 7mm; text-decoration: underline; text-decoration-color: #c8102e; text-underline-offset: 3px; }
.top img { width: 22mm; height: 22mm; object-fit: contain; mix-blend-mode: multiply; }
.ex { margin: 0; font-weight: 400; font-size: 21px; line-height: 16mm; color: #c8102e; }
.ex span { text-decoration: underline; text-decoration-thickness: 1.4px; text-underline-offset: 4px; }
.r { color: #c8102e; }
.bx { border: 1.6px solid #c8102e; border-radius: 9px; padding: 0 5px; white-space: nowrap; }
.fr { display: inline-flex; flex-direction: column; vertical-align: middle; text-align: center; font-size: .82em; line-height: 3.5mm; margin: 0 2px; position: relative; top: -.5mm; }
.fr > span:first-child { border-bottom: 1.3px solid currentColor; padding: 0 2px; }
.vec { position: relative; display: inline-block; } .vec::before { content: ""; position: absolute; left: 1px; right: 1px; top: .5mm; border-top: 1.2px solid currentColor; }
.vec::after { content: ""; position: absolute; right: 0; top: -.15mm; border: 2.6px solid transparent; border-left: 4.5px solid currentColor; border-right: 0; }
sub, sup { font-size: .7em; line-height: 0; }
table.tb { border-collapse: collapse; margin: 0 0 0 2mm; } .tb td, .tb th { border: 1.4px solid #22409f; height: 8mm; padding: 0 7px; text-align: center; font-weight: 400; } .tb th { color: #c8102e; }
.note { font-size: 14px; }
${C.css || ''}
</style></head><body>
<div class="top"><div><div class="who">Pr. Zakaria Lazrak<br>Physique-Chimie</div><h1>Correction détaillée</h1><div class="sub">${C.subtitle}</div></div><img src="${logo}" alt=""></div>
${C.html}
</body></html>`;
fs.writeFileSync(out.replace(/\.pdf$/, '.html'), html);
(async () => { const b = await chromium.launch(); const p = await b.newPage(); await p.setContent(html, { waitUntil: 'load' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
  await p.evaluate(() => { const lh = 8 * 96 / 25.4; document.querySelectorAll('table, .snap').forEach(t => { const h = t.getBoundingClientRect().height; t.style.marginBottom = (Math.ceil(h / lh - 0.02) * lh - h) + 'px'; }); });
  const k = `@font-face{font-family:K;src:${font(400)}}`;
  await p.pdf({ path: out, printBackground: true, preferCSSPageSize: true, displayHeaderFooter: true, headerTemplate: '<span></span>',
    footerTemplate: `<style>${k}</style><div style="width:100%;font-family:K,cursive;font-size:12px;color:#22409f;padding:0 13mm 0 31mm;display:flex;justify-content:space-between"><span>Pr. Zakaria Lazrak</span><span><span class="pageNumber"></span>/<span class="totalPages"></span></span></div>` });
  console.log(out, Math.round(fs.statSync(out).size / 1024) + ' Ko'); await b.close(); })();
