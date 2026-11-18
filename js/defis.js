/* Défis de classe (écran interactif, par équipes) :
   1. Équilibrage express — ajuster les coefficients stœchiométriques (éléments ET charges) ;
   2. Symboles & formules — écrire la réponse exacte (clavier à l’écran) ;
   3. Dessin rapide — un schéma se dessine peu à peu (identifier) ou un élève dessine (deviner). */
'use strict';
window.DEFIS = (() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const A = () => JEUX.api, T = (fr, ar) => A().C().t(fr, ar), esc = s => A().C().esc(s);
  const app = () => $('#app');
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const list = [
    ['equilibre', '⚖️', 'Équilibrage express', 'موازنة المعادلات', 'Ajuste les coefficients avec ▲▼ : conservation des éléments ET de la charge électrique. Le plus rapide marque le plus !', 'اضبط المعاملات بـ ▲▼ : انحفاظ العناصر والشحنة الكهربائية. الأسرع يربح أكثر !', 'y1'],
    ['symboles', '⌨️', 'Symboles & formules', 'الرموز والصيغ', 'Écris la réponse exacte : symbole d’un élément, formule d’une molécule ou d’un ion, symbole d’une unité.', 'اكتب الجواب بالضبط : رمز عنصر، صيغة جزيئة أو أيون، رمز وحدة.', 'y2'],
    ['dessin', '✏️', 'Dessin rapide', 'الرسم السريع', 'Un schéma se dessine trait par trait : identifie-le au plus vite. Ou un élève dessine et son équipe devine !', 'يُرسم تبيان خطا بخط : تعرّف عليه بسرعة. أو يرسم تلميذ ويخمن فريقه !', 'y3'],
  ];

  /* ---------- chimie : lecture et affichage des formules ---------- */
  // écriture : 'Fe(OH)3', 'Al^3+', 'HO^-', 'S2O3^2-'
  function fmt(sp) {
    const [body, ch] = sp.split('^');
    const b = esc(body).replace(/(\d+)/g, '<sub>$1</sub>');
    return b + (ch ? `<sup>${ch.replace('-', '−')}</sup>` : '');
  }
  function parse(sp) {
    const [body, ch] = sp.split('^'); let i = 0;
    const group = () => { const m = {}; while (i < body.length && body[i] !== ')') {
      let sub; if (body[i] === '(') { i++; sub = group(); i++; } else { const e = body.slice(i).match(/^[A-Z][a-z]?/)[0]; i += e.length; sub = { [e]: 1 }; }
      const n = body.slice(i).match(/^\d+/); const k = n ? +n[0] : 1; if (n) i += n[0].length;
      for (const e in sub) m[e] = (m[e] || 0) + sub[e] * k; } return m; };
    const atoms = group(); let q = 0;
    if (ch) { const m = ch.match(/^(\d*)([+-])$/); q = (m[2] === '+' ? 1 : -1) * (m[1] ? +m[1] : 1); }
    return { atoms, q };
  }
  const gcd = (a, b) => b ? gcd(b, a % b) : a;
  function bilan(eq, c) {
    const R = eq[0].map(parse), P = eq[1].map(parse), el = {}, add = (L, cs, s) => L.forEach((p, k) => { for (const e in p.atoms) { el[e] = el[e] || [0, 0]; el[e][s] += cs[k] * p.atoms[e]; } });
    const cR = c.slice(0, R.length), cP = c.slice(R.length); add(R, cR, 0); add(P, cP, 1);
    const q = [R.reduce((s, p, k) => s + cR[k] * p.q, 0), P.reduce((s, p, k) => s + cP[k] * p.q, 0)];
    const ok = Object.values(el).every(v => v[0] === v[1]) && q[0] === q[1] && c.reduce(gcd) === 1;
    return { el, q, ok };
  }
  // n : niveau ; s : solution (contrôle)
  const EQ = [
    [['C3H8', 'O2'], ['CO2', 'H2O'], [1, 5, 3, 4]], [['Al', 'H^+'], ['Al^3+', 'H2'], [2, 6, 2, 3]], [['Cu', 'Ag^+'], ['Cu^2+', 'Ag'], [1, 2, 1, 2]],
    [['Fe^3+', 'HO^-'], ['Fe(OH)3'], [1, 3, 1]], [['C2H6O', 'O2'], ['CO2', 'H2O'], [1, 3, 2, 3]], [['Fe2O3', 'CO'], ['Fe', 'CO2'], [1, 3, 2, 3]],
    [['MnO2', 'HCl'], ['MnCl2', 'Cl2', 'H2O'], [1, 4, 1, 1, 2]], [['Cl^-', 'H2O'], ['Cl2', 'H2', 'HO^-'], [2, 2, 1, 1, 2]],
    [['CH4', 'O2'], ['CO2', 'H2O'], [1, 2, 1, 2]], [['H2', 'O2'], ['H2O'], [2, 1, 2]], [['Na', 'H2O'], ['Na^+', 'HO^-', 'H2'], [2, 2, 2, 2, 1]],
    [['Zn', 'H^+'], ['Zn^2+', 'H2'], [1, 2, 1, 1]], [['N2', 'H2'], ['NH3'], [1, 3, 2]], [['Fe', 'O2'], ['Fe3O4'], [3, 2, 1]],
    [['CaCO3', 'H^+'], ['Ca^2+', 'CO2', 'H2O'], [1, 2, 1, 1, 1]], [['Al', 'O2'], ['Al2O3'], [4, 3, 2]], [['C4H10', 'O2'], ['CO2', 'H2O'], [2, 13, 8, 10]],
    [['Cu^2+', 'HO^-'], ['Cu(OH)2'], [1, 2, 1]], [['Fe', 'Cu^2+'], ['Fe^2+', 'Cu'], [1, 1, 1, 1]], [['MnO4^-', 'H^+', 'Fe^2+'], ['Mn^2+', 'Fe^3+', 'H2O'], [1, 8, 5, 1, 5, 4]],
    [['I2', 'S2O3^2-'], ['I^-', 'S4O6^2-'], [1, 2, 2, 1]], [['Cr2O7^2-', 'H^+', 'Fe^2+'], ['Cr^3+', 'Fe^3+', 'H2O'], [1, 14, 6, 2, 6, 7]],
    [['NH3', 'O2'], ['NO', 'H2O'], [4, 5, 4, 6]], [['Mg', 'HCl'], ['MgCl2', 'H2'], [1, 2, 1, 1]], [['Pb^2+', 'I^-'], ['PbI2'], [1, 2, 1]],
    [['KClO3'], ['KCl', 'O2'], [2, 2, 3]], [['H2O2'], ['H2O', 'O2'], [2, 2, 1]], [['C6H12O6', 'O2'], ['CO2', 'H2O'], [1, 6, 6, 6]],
    [['SO2', 'O2'], ['SO3'], [2, 1, 2]], [['Fe^2+', 'H2O2', 'H^+'], ['Fe^3+', 'H2O'], [2, 1, 2, 2, 2]], [['Cu', 'NO3^-', 'H^+'], ['Cu^2+', 'NO', 'H2O'], [3, 2, 8, 3, 2, 4]],
    [['Ag^+', 'Zn'], ['Ag', 'Zn^2+'], [2, 1, 2, 1]], [['C2H6O', 'MnO4^-', 'H^+'], ['C2H4O2', 'Mn^2+', 'H2O'], [5, 4, 12, 5, 4, 11]],
  ];

  /* ---------- habillage commun (équipes, tours, podium) ---------- */
  function setup(id, fields, go) {
    const G = list.find(x => x[0] === id), TM = A().teams();
    app().innerHTML = `<section class="jx-page"><a class="jx-back" href="#/jeux">‹ ${T('Espace Jeux', 'فضاء الألعاب')}</a><div class="jx-setup ${G[6]}"><span class="jx-ic">${G[1]}</span><h1>${T(G[2], G[3])}</h1><p>${T(G[4], G[5])}</p>
      <p class="jx-teamsline">${TM.map((x, i) => `<span style="--c:${A().COLORS[i]}">${esc(x.n)}</span>`).join('')} <a href="#/jeux">${T('modifier les équipes', 'تعديل الفرق')}</a></p>
      <div class="jx-form">${fields}</div><button type="button" class="jx-btn big" id="go">▶ ${T('Lancer en plein écran', 'ابدأ في ملء الشاشة')}</button></div></section>`;
    $('#go').addEventListener('click', () => { const v = {}; $$('.jx-form select').forEach(s => { v[s.id] = s.value; }); go(v); });
  }
  const sel = (id, lab, opts, v) => `<label class="jx-f"><span>${lab}</span><select id="${id}">${opts.map(o => `<option value="${o[0]}"${o[0] === v ? ' selected' : ''}>${o[1]}</option>`).join('')}</select></label>`;
  const roundsF = () => sel('nb', T('Manches par équipe', 'جولات لكل فريق'), [['2', '2'], ['3', '3'], ['5', '5']], '3');
  const board = (TM, sc, cur) => `<div class="jx-board">${TM.map((x, i) => `<div class="jx-team${i === cur ? ' on' : ''}" style="--c:${A().COLORS[i]}"><b>${esc(x.n)}</b><span>${sc[i]}</span></div>`).join('')}</div>`;
  const ring = (c, secs) => `<div class="jx-ring"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45"/><circle class="v" cx="50" cy="50" r="45" style="--c:${c}"/></svg><span>${secs}</span></div>`;
  function timer(secs, onEnd) { // anneau de temps ; renvoie une fonction qui donne le temps restant
    let left = secs; const v = $('.jx-ring .v'), s = $('.jx-ring span');
    A().every(() => { left = Math.max(0, left - 0.1); v.style.strokeDashoffset = 283 * (1 - left / secs); s.textContent = Math.ceil(left); if (left <= 0) { left = -1; onEnd(); } }, 100);
    return () => Math.max(0, left);
  }

  /* ================= 1. Équilibrage express ================= */
  function equilibrePlay(v, again) {
    const api = A(), TM = api.teams(), N = TM.length, sc = TM.map(() => 0), per = +v.nb, SEC = +v.sec, Q = shuffle(EQ); let i = 0; api.full(true);
    function round() {
      api.stopTimers(); if (i >= per * N) return api.podium('equilibre', TM, sc, again);
      const cur = i % N, eq = Q[i % Q.length], sp = eq[0].concat(eq[1]), c = sp.map(() => 1); let done = false, aide = false, wrong = 0;
      app().innerHTML = `<section class="jx-stage">${api.bar()}${board(TM, sc, cur)}
        <div class="jx-turnrow"><div class="jx-turn" style="--c:${api.COLORS[cur]}">${T('À', 'دور')} <b>${esc(TM[cur].n)}</b> ${T('d’équilibrer', 'للموازنة')} · ${Math.floor(i / N) + 1}/${per}</div>${ring(api.COLORS[cur], SEC)}</div>
        <div class="jx-q jx-eqq" dir="ltr" lang="fr"><div class="jx-eq">${sp.map((s, k) => `${k === eq[0].length ? '<span class="jx-arrow">⟶</span>' : k ? '<span class="jx-plus">+</span>' : ''}
          <span class="jx-sp"><span class="jx-co"><button type="button" class="up" data-k="${k}">▲</button><b data-c="${k}">1</b><button type="button" class="dn" data-k="${k}">▼</button></span><span class="jx-f2">${fmt(s)}</span></span>`).join('')}</div>
          <div class="jx-bil" hidden></div>
          <div class="jx-cluebar"><button type="button" class="jx-hint" id="aide">📊 ${T('Bilan des atomes (−3)', 'حصيلة الذرات (−3)')}</button><button type="button" class="jx-btn big" id="ok">✔ ${T('Valider', 'تحقق')}</button></div><div class="jx-after"></div></div></section>`;
      api.wireBar();
      const paintBil = () => {
        const b = bilan(eq, c); if (!aide) return b;
        $('.jx-bil').hidden = false;
        $('.jx-bil').innerHTML = `<table><tr><th></th>${Object.keys(b.el).map(e => `<th>${e}</th>`).join('')}<th>${T('charge', 'الشحنة')}</th></tr>
          <tr><td>${T('réactifs', 'المتفاعلات')}</td>${Object.values(b.el).map(x => `<td class="${x[0] === x[1] ? 'g' : 'r'}">${x[0]}</td>`).join('')}<td class="${b.q[0] === b.q[1] ? 'g' : 'r'}">${b.q[0]}</td></tr>
          <tr><td>${T('produits', 'النواتج')}</td>${Object.values(b.el).map(x => `<td class="${x[0] === x[1] ? 'g' : 'r'}">${x[1]}</td>`).join('')}<td class="${b.q[0] === b.q[1] ? 'g' : 'r'}">${b.q[1]}</td></tr></table>`;
        return b;
      };
      const set = (k, d) => { if (done) return; c[k] = Math.max(1, Math.min(20, c[k] + d)); $(`[data-c="${k}"]`).textContent = c[k]; api.beep('flip'); paintBil(); };
      $$('.jx-co button').forEach(b => b.addEventListener('pointerdown', e => { e.preventDefault(); set(+b.dataset.k, b.classList.contains('up') ? 1 : -1); }));
      $('#aide').addEventListener('click', () => { aide = true; $('#aide').hidden = true; paintBil(); });
      const finish = ok => {
        done = true; api.stopTimers();
        if (ok) { sc[cur] += Math.max(3, 10 + Math.ceil(left() / 4) - (aide ? 3 : 0) - wrong); api.beep('ok'); } else api.beep('ko');
        $$('.jx-co b').forEach((x, k) => { x.textContent = eq[2][k]; x.classList.add(ok ? 'g' : 'sol'); });
        $('.jx-cluebar').innerHTML = ''; $('.jx-board').outerHTML = board(TM, sc, cur);
        $('.jx-after').innerHTML = `<p class="jx-steal">${ok ? '✔ ' + T('Équation équilibrée !', 'معادلة متوازنة !') : '⏱ ' + T('Temps écoulé — voici la solution', 'انتهى الوقت — هذا هو الحل')}</p><button type="button" class="jx-btn big" id="nx">${T('Équation suivante', 'المعادلة التالية')} ›</button>`;
        $('#nx').addEventListener('click', () => { i++; round(); }); api.onKey(e => { if (e.key === 'Enter') { i++; round(); } });
      };
      $('#ok').addEventListener('click', () => {
        if (done) return; const b = bilan(eq, c);
        if (b.ok) return finish(true);
        wrong++; api.beep('ko'); $('.jx-eq').classList.remove('shake'); void $('.jx-eq').offsetWidth; $('.jx-eq').classList.add('shake');
        const notMin = Object.values(b.el).every(x => x[0] === x[1]) && b.q[0] === b.q[1];
        $('.jx-after').innerHTML = `<p class="jx-e">${notMin ? T('Équilibrée, mais pas avec les plus petits nombres entiers : simplifie !', 'متوازنة، لكن ليس بأصغر الأعداد الصحيحة : بسّط !') : T('Pas encore équilibrée… (−1)', 'غير متوازنة بعد… (−1)')}</p>`;
      });
      const left = timer(SEC, () => finish(false));
    }
    round();
  }

  /* ================= 2. Symboles & formules (réponse écrite) ================= */
  // a : réponses acceptées (écriture : chiffres = indices, ^ = charge)
  const SY = [
    ['Symbole de l’élément sodium', ['Na']], ['Symbole de l’élément potassium', ['K']], ['Symbole de l’élément fer', ['Fe']], ['Symbole de l’élément cuivre', ['Cu']],
    ['Symbole de l’élément argent', ['Ag']], ['Symbole de l’élément or', ['Au']], ['Symbole de l’élément plomb', ['Pb']], ['Symbole de l’élément zinc', ['Zn']],
    ['Symbole de l’élément chlore', ['Cl']], ['Symbole de l’élément magnésium', ['Mg']], ['Symbole de l’élément aluminium', ['Al']], ['Symbole de l’élément soufre', ['S']],
    ['Symbole de l’élément phosphore', ['P']], ['Symbole de l’élément calcium', ['Ca']], ['Symbole de l’élément manganèse', ['Mn']], ['Symbole de l’élément azote', ['N']],
    ['Symbole de l’élément hélium', ['He']], ['Symbole de l’élément silicium', ['Si']], ['Symbole de l’élément iode', ['I']], ['Symbole de l’élément mercure', ['Hg']],
    ['Formule de la molécule d’eau', ['H2O']], ['Formule du dioxyde de carbone', ['CO2']], ['Formule du dioxygène', ['O2']], ['Formule du diazote', ['N2']],
    ['Formule de l’ammoniac', ['NH3']], ['Formule du méthane', ['CH4']], ['Formule du chlorure d’hydrogène', ['HCl']], ['Formule de l’eau oxygénée', ['H2O2']],
    ['Formule du dihydrogène', ['H2']], ['Formule du diiode', ['I2']], ['Formule brute de l’éthanol', ['C2H6O', 'C2H5OH', 'CH3CH2OH']], ['Formule de l’acide éthanoïque', ['CH3COOH', 'C2H4O2']],
    ['Formule de l’ozone', ['O3']], ['Formule du chlorure de sodium', ['NaCl']],
    ['Formule de l’ion sodium', ['Na^+']], ['Formule de l’ion chlorure', ['Cl^-']], ['Formule de l’ion cuivre II', ['Cu^2+']], ['Formule de l’ion fer III', ['Fe^3+']],
    ['Formule de l’ion fer II', ['Fe^2+']], ['Formule de l’ion oxonium', ['H3O^+']], ['Formule de l’ion hydroxyde', ['HO^-', 'OH^-']], ['Formule de l’ion sulfate', ['SO4^2-']],
    ['Formule de l’ion nitrate', ['NO3^-']], ['Formule de l’ion ammonium', ['NH4^+']], ['Formule de l’ion permanganate', ['MnO4^-']], ['Formule de l’ion carbonate', ['CO3^2-']],
    ['Formule de l’ion zinc', ['Zn^2+']], ['Formule de l’ion aluminium', ['Al^3+']], ['Formule de l’ion argent', ['Ag^+']], ['Formule de l’ion éthanoate', ['CH3COO^-']],
    ['Symbole de l’unité de force', ['N']], ['Symbole de l’unité d’énergie', ['J']], ['Symbole de l’unité de puissance', ['W']], ['Symbole de l’unité de pression', ['Pa']],
    ['Symbole de l’unité de fréquence', ['Hz']], ['Symbole de l’unité de résistance', ['Ω']], ['Symbole de l’unité de capacité (condensateur)', ['F']], ['Symbole de l’unité d’inductance', ['H']],
    ['Symbole de l’unité de champ magnétique', ['T']], ['Symbole de l’unité de charge électrique', ['C']], ['Symbole de l’unité d’activité radioactive', ['Bq']],
    ['Symbole de l’unité de quantité de matière', ['mol']], ['Symbole de l’unité de conductance', ['S']], ['Symbole de l’unité de tension', ['V']], ['Symbole de l’unité d’intensité', ['A']],
  ];
  const norm = s => s.replace(/\s+/g, '').replace(/−/g, '-').replace(/\^/g, '').replace(/[⁺]/g, '+').replace(/[⁻]/g, '-');
  function preview(raw) { // H2O → H₂O ; SO42- avec ^ : SO4^2- → SO₄²⁻
    const r = raw.replace(/−/g, '-'); const m = r.match(/^(.*?)\^?(\d*[+-])$/); let body = m ? m[1] : r, ch = m ? m[2] : '';
    if (!r.includes('^') && m && /\d$/.test(m[1]) === false && ch.length > 1) { /* « 2+ » collé à une lettre : charge */ }
    return esc(body).replace(/([A-Za-z\)])(\d+)/g, '$1<sub>$2</sub>') + (ch ? `<sup>${ch.replace('-', '−')}</sup>` : '');
  }
  function symbolesPlay(v, again) {
    const api = A(), TM = api.teams(), N = TM.length, sc = TM.map(() => 0), per = +v.nb, SEC = +v.sec, Q = shuffle(SY); let i = 0, caps = true; api.full(true);
    const ROWS = [['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'], ['N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'], ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '(', ')', '^'], ['+', '−', 'Ω', '⇧', '⌫']];
    function round() {
      api.stopTimers(); if (i >= per * N) return api.podium('symboles', TM, sc, again);
      const cur = i % N, q = Q[i % Q.length]; let val = '', done = false, tries = 0;
      app().innerHTML = `<section class="jx-stage">${api.bar()}${board(TM, sc, cur)}
        <div class="jx-turnrow"><div class="jx-turn" style="--c:${api.COLORS[cur]}">${T('À', 'دور')} <b>${esc(TM[cur].n)}</b> ${T('d’écrire', 'للكتابة')} · ${Math.floor(i / N) + 1}/${per}</div>${ring(api.COLORS[cur], SEC)}</div>
        <div class="jx-q jx-symq" dir="ltr" lang="fr"><div class="jx-qt big">${esc(q[0])} ?</div>
          <div class="jx-ans"><span class="jx-prev"></span><span class="jx-caret"></span></div>
          <p class="jx-tipk">${T('⇧ = une minuscule (Na, Cl, Fe…) · chiffres = indices · charge : ^ puis 2+ (ex. SO4^2-)', '⇧ = حرف صغير (Na، Cl، Fe…) · الأرقام = مؤشرات · الشحنة : ^ ثم 2+ (مثلا SO4^2-)')}</p>
          <div class="jx-kb">${ROWS.map(r => `<div>${r.map(k => `<button type="button" data-k="${k}" class="${k.length > 1 || '⇧⌫'.includes(k) ? 'w' : ''}">${k}</button>`).join('')}</div>`).join('')}<div><button type="button" class="ok" data-k="OK">✔ ${T('Valider', 'تحقق')}</button><button type="button" class="pass" data-k="PASS">${T('Passer', 'تخطي')}</button></div></div>
          <div class="jx-after"></div></div></section>`;
      api.wireBar();
      const paint = () => { $('.jx-prev').innerHTML = preview(val); $$('.jx-kb button').forEach(b => { const k = b.dataset.k; if (/^[A-Za-z]$/.test(k)) { const L = caps ? k.toUpperCase() : k.toLowerCase(); b.dataset.k = L; b.textContent = L; } if (k === '⇧') b.classList.toggle('on', !caps); }); };
      const finish = ok => {
        done = true; api.stopTimers();
        if (ok) { sc[cur] += Math.max(3, 10 + Math.ceil(left() / 3) - tries * 2); api.beep('ok'); } else api.beep('ko');
        $('.jx-board').outerHTML = board(TM, sc, cur); $('.jx-kb').hidden = true;
        $('.jx-after').innerHTML = `<p class="jx-steal">${ok ? '✔ ' + T('Exact !', 'صحيح !') : T('Réponse attendue :', 'الجواب المطلوب :') + ' <b class="jx-sol">' + fmt(q[1][0]) + '</b>'}</p><button type="button" class="jx-btn big" id="nx">${T('Question suivante', 'السؤال التالي')} ›</button>`;
        $('#nx').addEventListener('click', () => { i++; round(); });
      };
      const key = k => {
        if (done) return;
        if (k === '⇧') { caps = !caps; return paint(); }
        if (k === '⌫') val = val.slice(0, -1);
        else if (k === 'PASS') return finish(false);
        else if (k === 'OK') {
          if (!val) return; const good = q[1].some(a => norm(a) === norm(val));
          if (good) return finish(true);
          tries++; api.beep('ko'); $('.jx-ans').classList.remove('shake'); void $('.jx-ans').offsetWidth; $('.jx-ans').classList.add('shake');
          if (tries >= 3) return finish(false);
          return;
        } else if (val.length < 14) { val += k; if (!caps && /^[a-z]$/.test(k)) { caps = true; paint(); } }
        api.beep('flip'); paint();
      };
      $$('.jx-kb button').forEach(b => b.addEventListener('pointerdown', e => { e.preventDefault(); key(b.dataset.k); }));
      api.onKey(e => { if (done) { if (e.key === 'Enter') { i++; round(); } return; }
        if (e.key === 'Enter') key('OK'); else if (e.key === 'Backspace') key('⌫'); else if (e.key.length === 1 && /[A-Za-z0-9()+\-^]/.test(e.key)) { val += e.key === '-' ? '−' : e.key; paint(); } });
      caps = true; paint();
      const left = timer(SEC, () => finish(false));
    }
    round();
  }

  /* ================= 3. Dessin rapide ================= */
  // schémas normalisés : traits SVG (viewBox 0 0 240 140) dessinés progressivement
  const C = (cx, cy, r) => `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
  const SCH = [
    ['Conducteur ohmique (résistance)', ['M10 70H80', 'M80 55h80v30h-80z', 'M160 70H230']],
    ['Lampe', ['M10 70H95', C(120, 70, 25), 'M102 52l36 36', 'M138 52l-36 36', 'M145 70H230']],
    ['Diode', ['M10 70H95', 'M95 45v50l50-25z', 'M145 45v50', 'M145 70H230']],
    ['Diode électroluminescente (DEL)', ['M10 70H95', 'M95 45v50l50-25z', 'M145 45v50', 'M145 70H230', 'M130 35l20-20', 'M142 15h8v8', 'M145 42l20-20', 'M157 22h8v8']],
    ['Condensateur', ['M10 70H112', 'M112 35v70', 'M128 35v70', 'M128 70H230']],
    ['Bobine', ['M10 70H60', 'M60 70a15 15 0 0 1 30 0a15 15 0 0 1 30 0a15 15 0 0 1 30 0a15 15 0 0 1 30 0', 'M180 70H230']],
    ['Générateur (pile)', ['M10 70H110', 'M110 40v60', 'M130 55v30', 'M130 70H230', 'M92 35h12', 'M98 29v12']],
    ['Interrupteur ouvert', ['M10 70H90', C(92, 70, 3), 'M95 68l55-30', C(150, 70, 3), 'M153 70H230']],
    ['Ampèremètre', ['M10 70H95', C(120, 70, 25), 'M110 82l10-26l10 26', 'M113 74h14', 'M145 70H230']],
    ['Voltmètre', ['M10 70H95', C(120, 70, 25), 'M108 56l12 28l12-28', 'M145 70H230']],
    ['Moteur', ['M10 70H95', C(120, 70, 25), 'M106 84V56l14 18l14-18v28', 'M145 70H230']],
    ['Lentille convergente', ['M120 15V125', 'M108 27l12-12l12 12', 'M108 113l12 12l12-12', 'M20 70H220']],
    ['Lentille divergente', ['M120 15V125', 'M108 15l12 12l12-12', 'M108 125l12-12l12 12', 'M20 70H220']],
    ['Miroir plan', ['M120 15V125', 'M120 25l12-10', 'M120 45l12-10', 'M120 65l12-10', 'M120 85l12-10', 'M120 105l12-10', 'M120 125l12-10']],
    ['Ressort', ['M120 5V25', 'M120 25l-20 8l40 10l-40 10l40 10l-40 10l40 10l-20 8', 'M120 91V105', 'M100 105h40v28h-40z']],
    ['Amplificateur opérationnel', ['M70 20v100l100-50z', 'M30 45H70', 'M30 95H70', 'M78 45h12', 'M78 95h12', 'M84 89v12', 'M170 70H220']],
    ['Prise de terre (masse)', ['M120 20V80', 'M90 80h60', 'M100 92h40', 'M110 104h20']],
    ['Bécher', ['M80 20v100h80V20', 'M74 20h12', 'M80 60h30', 'M80 80h20']],
    ['Erlenmeyer', ['M110 15v35l-40 70h100l-40-70V15', 'M104 15h32']],
    ['Éprouvette graduée', ['M105 15v110h30V15', 'M95 125h50', 'M105 40h10', 'M105 60h10', 'M105 80h10', 'M105 100h10']],
    ['Burette', ['M112 5v95h16V5', 'M112 100l8 15l8-15', 'M120 115v15', 'M112 25h8', 'M112 45h8', 'M112 65h8', 'M100 108h18']],
    ['Fiole jaugée', ['M113 10v50a35 35 0 1 0 14 0V10', 'M106 30h28']],
    ['Ampoule à décanter', ['M120 10v12', 'M120 22c-40 20-40 60 0 80c40-20 40-60 0-80', 'M120 102v30', 'M112 112h16']],
    ['Vecteur force (flèche)', ['M40 100L190 40', 'M190 40l-24 2', 'M190 40l-14 20']],
  ];
  const DRAW_WORDS = ['Le vecteur poids d’un solide', 'Une onde transversale sur une corde', 'Un circuit RC', 'Un dosage (burette + bécher)', 'La molécule d’eau', 'Les lignes de champ d’un aimant droit',
    'Un pendule simple', 'La diffraction de la lumière par une fente', 'Un atome (noyau + électrons)', 'Une chute libre', 'Le montage à reflux', 'Une pile Daniell', 'Un solide sur un plan incliné',
    'Un satellite en orbite', 'Un circuit en série avec une lampe', 'Une lentille et son image', 'Un ressort étiré', 'La réflexion sur un miroir', 'Le spectre de la lumière blanche', 'Une électrolyse'];
  function dessinSetup() {
    setup('dessin', sel('mode', T('Mode', 'النمط'), [['voir', T('Identifier le schéma qui se dessine', 'تعرّف على التبيان الذي يُرسم')], ['faire', T('Un élève dessine, son équipe devine', 'يرسم تلميذ ويخمن فريقه')]], 'voir') + sel('nb', T('Manches par équipe', 'جولات لكل فريق'), [['2', '2'], ['3', '3'], ['5', '5']], '3'),
      v => { const run = () => (v.mode === 'faire' ? dessinFaire : dessinVoir)(v, run); run(); });
  }
  function dessinVoir(v, again) {
    const api = A(), TM = api.teams(), N = TM.length, sc = TM.map(() => 0), per = +v.nb, Q = shuffle(SCH), DUR = 14000; let i = 0; api.full(true);
    function round() {
      api.stopTimers(); if (i >= per * N) return api.podium('dessin', TM, sc, again);
      let cur = i % N; const s = Q[i % Q.length], os = shuffle([s[0]].concat(shuffle(SCH.filter(x => x[0] !== s[0])).slice(0, 3).map(x => x[0]))); let done = false; const out = new Set();
      app().innerHTML = `<section class="jx-stage">${api.bar()}${board(TM, sc, cur)}<div class="jx-turn"></div>
        <div class="jx-q jx-drawq"><div class="jx-canvas3"><svg viewBox="0 0 240 140">${s[1].map(d => `<path d="${d}" pathLength="1"/>`).join('')}</svg><span class="jx-pts"></span></div>
          <div class="jx-os">${os.map((o, k) => `<button type="button" data-k="${k}"><i>${'ABCD'[k]}</i><span>${esc(o)}</span></button>`).join('')}</div><div class="jx-after"></div></div></section>`;
      api.wireBar();
      const paths = $$('.jx-canvas3 path'), t0 = performance.now();
      const turn = () => { const tn = $('.jx-turn'); tn.style.setProperty('--c', api.COLORS[cur]); tn.innerHTML = `${T('À', 'دور')} <b>${esc(TM[cur].n)}</b> ${T('de répondre', 'للإجابة')} · ${Math.floor(i / N) + 1}/${per}`; $('.jx-board').outerHTML = board(TM, sc, cur); };
      const prog = () => Math.min(1, (performance.now() - t0) / DUR);
      const pts = () => Math.max(5, Math.round(25 - 20 * prog()));
      api.every(() => { const p = prog(); paths.forEach((pa, k) => { const a = k / paths.length, b = (k + 1) / paths.length; pa.style.strokeDashoffset = 1 - Math.max(0, Math.min(1, (p - a) / (b - a))); }); if (!done) $('.jx-pts').textContent = pts() + ' pts'; }, 50);
      const answer = k => {
        if (done || out.has(k)) return; const b = $$('.jx-os button')[k];
        if (os[k] === s[0]) { done = true; sc[cur] += pts(); b.classList.add('ok'); api.beep('ok'); paths.forEach(pa => { pa.style.strokeDashoffset = 0; }); turn(); return next(); }
        out.add(k); b.classList.add('ko'); api.beep('ko');
        if (out.size >= os.length - 1) { done = true; $$('.jx-os button').forEach((x, j) => { if (os[j] === s[0]) x.classList.add('ok'); }); return next(); }
        cur = (cur + 1) % N; turn();
      };
      const next = () => { $('.jx-after').innerHTML = `<button type="button" class="jx-btn big" id="nx">${T('Schéma suivant', 'التبيان التالي')} ›</button>`; $('#nx').addEventListener('click', () => { i++; round(); }); api.onKey(e => { if (e.key === 'Enter') { i++; round(); } }); };
      $$('.jx-os button').forEach(b => b.addEventListener('pointerdown', e => { e.preventDefault(); answer(+b.dataset.k); }));
      api.onKey(e => { const k = '1234'.indexOf(e.key); if (k >= 0) answer(k); });
      turn();
    }
    round();
  }
  function dessinFaire(v, again) {
    const api = A(), TM = api.teams(), N = TM.length, sc = TM.map(() => 0), per = +v.nb, W = shuffle(DRAW_WORDS.concat(SCH.map(x => x[0]))), SEC = 75; let i = 0; api.full(true);
    function round() {
      api.stopTimers(); if (i >= per * N) return api.podium('dessin', TM, sc, again);
      const cur = i % N, word = W[i % W.length]; let color = '#111827', size = 6, done = false, started = false;
      app().innerHTML = `<section class="jx-stage">${api.bar()}${board(TM, sc, cur)}
        <div class="jx-turnrow"><div class="jx-turn" style="--c:${api.COLORS[cur]}">✏️ ${T('Un élève de', 'تلميذ من')} <b>${esc(TM[cur].n)}</b> ${T('dessine', 'يرسم')} · ${Math.floor(i / N) + 1}/${per}</div>${ring(api.COLORS[cur], SEC)}</div>
        <div class="jx-drawwrap"><canvas class="jx-pad2"></canvas>
          <div class="jx-tools">${['#111827', '#dc2626', '#2563eb', '#16a34a', '#f59e0b'].map(c => `<button type="button" class="col" data-c="${c}" style="background:${c}"></button>`).join('')}
            <button type="button" class="tool" data-t="fin">✎</button><button type="button" class="tool" data-t="gros">🖌</button><button type="button" class="tool" data-t="gomme">🧽</button><button type="button" class="tool" data-t="efface">🗑</button></div>
          <div class="jx-secret"><p>🙈 ${T('Seul le dessinateur regarde l’écran ! Les autres ferment les yeux…', 'المرسام فقط ينظر إلى الشاشة ! الآخرون يغمضون أعينهم…')}</p><button type="button" class="jx-btn huge" id="voir">👁 ${T('Voir le mot (4 s)', 'اعرض الكلمة (4 ث)')}</button></div></div>
        <div class="jx-guess"><span>${T('Qui a trouvé ?', 'من وجدها ؟')}</span>${TM.map((x, k) => `<button type="button" data-t="${k}" style="--c:${api.COLORS[k]}">${esc(x.n)}</button>`).join('')}<button type="button" class="no" data-t="-1">${T('Personne', 'لا أحد')}</button></div></section>`;
      api.wireBar();
      const cv = $('.jx-pad2'), ctx = cv.getContext('2d'), wrap = $('.jx-drawwrap');
      const size2 = () => { const r = cv.getBoundingClientRect(), d = Math.min(2, window.devicePixelRatio || 1); const img = cv.width ? ctx.getImageData(0, 0, cv.width, cv.height) : null; cv.width = r.width * d; cv.height = r.height * d; ctx.setTransform(d, 0, 0, d, 0, 0); ctx.lineCap = ctx.lineJoin = 'round'; if (img) ctx.putImageData(img, 0, 0); };
      size2();
      const pts = {};
      cv.addEventListener('pointerdown', e => { if (!started) return; cv.setPointerCapture(e.pointerId); const r = cv.getBoundingClientRect(); pts[e.pointerId] = [e.clientX - r.left, e.clientY - r.top]; });
      cv.addEventListener('pointermove', e => { const p = pts[e.pointerId]; if (!p) return; const r = cv.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
        ctx.globalCompositeOperation = color === 'gomme' ? 'destination-out' : 'source-over'; ctx.strokeStyle = color === 'gomme' ? '#000' : color; ctx.lineWidth = color === 'gomme' ? 34 : size;
        ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(x, y); ctx.stroke(); pts[e.pointerId] = [x, y]; });
      const up = e => { delete pts[e.pointerId]; }; cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
      $$('.jx-tools .col').forEach(b => b.addEventListener('click', () => { color = b.dataset.c; }));
      $$('.jx-tools .tool').forEach(b => b.addEventListener('click', () => { const t = b.dataset.t; if (t === 'fin') size = 4; else if (t === 'gros') size = 12; else if (t === 'gomme') color = 'gomme'; else ctx.clearRect(0, 0, cv.width, cv.height); }));
      let left = () => SEC;
      $('#voir').addEventListener('click', () => {
        const s = $('.jx-secret'); s.innerHTML = `<p class="jx-word">${esc(word)}</p><p class="jx-cd">4</p>`; let n = 4;
        const it = setInterval(() => { n--; const cd = $('.jx-cd'); if (cd) cd.textContent = n; if (n <= 0) { clearInterval(it); s.remove(); started = true; left = timer(SEC, () => finish(-1)); } }, 1000); A().hook(() => clearInterval(it));
      });
      const finish = k => {
        if (done) return; done = true; api.stopTimers(); started = false;
        if (k >= 0) { const gain = 10 + Math.ceil(left() / 6); sc[k] += gain; if (k !== cur) sc[cur] += 0; else sc[cur] += 0; api.beep('ok'); api.confetti(); } else api.beep('ko');
        $('.jx-board').outerHTML = board(TM, sc, cur);
        $('.jx-guess').innerHTML = `<span class="jx-word2">${T('C’était :', 'كانت :')} <b>${esc(word)}</b></span><button type="button" class="jx-btn big" id="nx">${T('Dessin suivant', 'الرسم التالي')} ›</button>`;
        $('#nx').addEventListener('click', () => { i++; round(); });
      };
      $$('.jx-guess button').forEach(b => b.addEventListener('click', () => { if (!started && !done) return; finish(+b.dataset.t); }));
    }
    round();
  }

  return {
    list,
    page(id) {
      const T2 = (s, opts, d) => sel('sec', T('Temps par question', 'الوقت لكل سؤال'), opts.map(x => [x, x + ' s']), d);
      if (id === 'equilibre') setup(id, roundsF() + T2('sec', ['45', '60', '90', '120'], '60'), v => { const run = () => equilibrePlay(v, run); run(); });
      else if (id === 'symboles') setup(id, roundsF() + T2('sec', ['20', '30', '45'], '30'), v => { const run = () => symbolesPlay(v, run); run(); });
      else if (id === 'dessin') dessinSetup();
    },
    _test: { parse, bilan, EQ },
  };
})();
