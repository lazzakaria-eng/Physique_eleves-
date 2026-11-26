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
    if (body === 'e') return { atoms: {}, q: -1 };
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
  // [réactifs, produits, solution, niveau, type] — niveau : tc, 1bac, 2bac (un niveau inclut les précédents)
  const TY = { comb: ['Combustion', 'احتراق'], prec: ['Précipitation', 'ترسيب'], diss: ['Dissolution', 'ذوبان'], ab: ['Acide-base', 'حمض-قاعدة'],
    redox: ['Oxydoréduction', 'أكسدة-اختزال'], demi: ['Demi-équation électronique', 'نصف معادلة إلكترونية'], elec: ['Électrolyse', 'تحليل كهربائي'], org: ['Chimie organique', 'كيمياء عضوية'], autre: ['Synthèse / décomposition', 'تركيب / تفكك'] };
  const EQ = [
    // --- Tronc commun ---
    [['C3H8', 'O2'], ['CO2', 'H2O'], [1, 5, 3, 4], 'tc', 'comb'], [['C2H6O', 'O2'], ['CO2', 'H2O'], [1, 3, 2, 3], 'tc', 'comb'], [['CH4', 'O2'], ['CO2', 'H2O'], [1, 2, 1, 2], 'tc', 'comb'],
    [['C4H10', 'O2'], ['CO2', 'H2O'], [2, 13, 8, 10], 'tc', 'comb'], [['C2H2', 'O2'], ['CO2', 'H2O'], [2, 5, 4, 2], 'tc', 'comb'], [['C8H18', 'O2'], ['CO2', 'H2O'], [2, 25, 16, 18], 'tc', 'comb'],
    [['C2H4', 'O2'], ['CO2', 'H2O'], [1, 3, 2, 2], 'tc', 'comb'], [['C6H6', 'O2'], ['CO2', 'H2O'], [2, 15, 12, 6], 'tc', 'comb'], [['CH4O', 'O2'], ['CO2', 'H2O'], [2, 3, 2, 4], 'tc', 'comb'],
    [['C6H12O6', 'O2'], ['CO2', 'H2O'], [1, 6, 6, 6], 'tc', 'comb'], [['H2', 'O2'], ['H2O'], [2, 1, 2], 'tc', 'comb'], [['Fe', 'O2'], ['Fe3O4'], [3, 2, 1], 'tc', 'comb'],
    [['Fe', 'O2'], ['Fe2O3'], [4, 3, 2], 'tc', 'comb'], [['Al', 'O2'], ['Al2O3'], [4, 3, 2], 'tc', 'comb'], [['Mg', 'O2'], ['MgO'], [2, 1, 2], 'tc', 'comb'], [['NH3', 'O2'], ['NO', 'H2O'], [4, 5, 4, 6], 'tc', 'comb'],
    [['Fe^3+', 'HO^-'], ['Fe(OH)3'], [1, 3, 1], 'tc', 'prec'], [['Cu^2+', 'HO^-'], ['Cu(OH)2'], [1, 2, 1], 'tc', 'prec'], [['Fe^2+', 'HO^-'], ['Fe(OH)2'], [1, 2, 1], 'tc', 'prec'],
    [['Al^3+', 'HO^-'], ['Al(OH)3'], [1, 3, 1], 'tc', 'prec'], [['Pb^2+', 'I^-'], ['PbI2'], [1, 2, 1], 'tc', 'prec'], [['Ca^2+', 'PO4^3-'], ['Ca3(PO4)2'], [3, 2, 1], 'tc', 'prec'],
    [['Ag^+', 'CrO4^2-'], ['Ag2CrO4'], [2, 1, 1], 'tc', 'prec'],
    [['CaCl2'], ['Ca^2+', 'Cl^-'], [1, 1, 2], '1bac', 'diss'], [['Al2(SO4)3'], ['Al^3+', 'SO4^2-'], [1, 2, 3], '1bac', 'diss'], [['FeCl3'], ['Fe^3+', 'Cl^-'], [1, 1, 3], '1bac', 'diss'],
    [['Na2SO4'], ['Na^+', 'SO4^2-'], [1, 2, 1], '1bac', 'diss'], [['K3PO4'], ['K^+', 'PO4^3-'], [1, 3, 1], '1bac', 'diss'], [['Na2CO3'], ['Na^+', 'CO3^2-'], [1, 2, 1], '1bac', 'diss'],
    [['Al', 'H^+'], ['Al^3+', 'H2'], [2, 6, 2, 3], 'tc', 'redox'], [['Cu', 'Ag^+'], ['Cu^2+', 'Ag'], [1, 2, 1, 2], 'tc', 'redox'], [['Fe2O3', 'CO'], ['Fe', 'CO2'], [1, 3, 2, 3], 'tc', 'redox'],
    [['Zn', 'H^+'], ['Zn^2+', 'H2'], [1, 2, 1, 1], 'tc', 'redox'], [['Fe', 'Cu^2+'], ['Fe^2+', 'Cu'], [1, 1, 1, 1], 'tc', 'redox'], [['Na', 'H2O'], ['Na^+', 'HO^-', 'H2'], [2, 2, 2, 2, 1], 'tc', 'redox'],
    [['Mg', 'HCl'], ['MgCl2', 'H2'], [1, 2, 1, 1], 'tc', 'redox'], [['Ag^+', 'Zn'], ['Ag', 'Zn^2+'], [2, 1, 2, 1], 'tc', 'redox'], [['Al', 'Cu^2+'], ['Al^3+', 'Cu'], [2, 3, 2, 3], 'tc', 'redox'],
    [['CaCO3', 'H^+'], ['Ca^2+', 'CO2', 'H2O'], [1, 2, 1, 1, 1], 'tc', 'ab'],
    [['N2', 'H2'], ['NH3'], [1, 3, 2], 'tc', 'autre'], [['KClO3'], ['KCl', 'O2'], [2, 2, 3], 'tc', 'autre'], [['H2O2'], ['H2O', 'O2'], [2, 2, 1], 'tc', 'autre'], [['SO2', 'O2'], ['SO3'], [2, 1, 2], 'tc', 'autre'],
    [['CaCO3'], ['CaO', 'CO2'], [1, 1, 1], 'tc', 'autre'], [['NaHCO3'], ['Na2CO3', 'CO2', 'H2O'], [2, 1, 1, 1], 'tc', 'autre'],
    // --- 1re Bac ---
    [['H2SO4', 'HO^-'], ['SO4^2-', 'H2O'], [1, 2, 1, 2], '1bac', 'ab'], [['H3PO4', 'HO^-'], ['PO4^3-', 'H2O'], [1, 3, 1, 3], '1bac', 'ab'], [['CO3^2-', 'H3O^+'], ['CO2', 'H2O'], [1, 2, 1, 3], '1bac', 'ab'],
    [['Ca(OH)2', 'HCl'], ['CaCl2', 'H2O'], [1, 2, 1, 2], '1bac', 'ab'], [['Mg(OH)2', 'H3O^+'], ['Mg^2+', 'H2O'], [1, 2, 1, 4], '1bac', 'ab'], [['Al(OH)3', 'H3O^+'], ['Al^3+', 'H2O'], [1, 3, 1, 6], '1bac', 'ab'],
    [['HCO3^-', 'H3O^+'], ['CO2', 'H2O'], [1, 1, 1, 2], '1bac', 'ab'], [['NaOH', 'H2SO4'], ['Na2SO4', 'H2O'], [2, 1, 1, 2], '1bac', 'ab'], [['NH3', 'H2SO4'], ['NH4^+', 'SO4^2-'], [2, 1, 2, 1], '1bac', 'ab'],
    [['Fe^3+', 'e^-'], ['Fe^2+'], [1, 1, 1], '1bac', 'demi'], [['Cu^2+', 'e^-'], ['Cu'], [1, 2, 1], '1bac', 'demi'], [['I2', 'e^-'], ['I^-'], [1, 2, 2], '1bac', 'demi'],
    [['Cl2', 'e^-'], ['Cl^-'], [1, 2, 2], '1bac', 'demi'], [['S4O6^2-', 'e^-'], ['S2O3^2-'], [1, 2, 2], '1bac', 'demi'], [['MnO4^-', 'H^+', 'e^-'], ['Mn^2+', 'H2O'], [1, 8, 5, 1, 4], '1bac', 'demi'],
    [['Cr2O7^2-', 'H^+', 'e^-'], ['Cr^3+', 'H2O'], [1, 14, 6, 2, 7], '1bac', 'demi'], [['O2', 'H^+', 'e^-'], ['H2O'], [1, 4, 4, 2], '1bac', 'demi'], [['H2O2', 'H^+', 'e^-'], ['H2O'], [1, 2, 2, 2], '1bac', 'demi'],
    [['NO3^-', 'H^+', 'e^-'], ['NO', 'H2O'], [1, 4, 3, 1, 2], '1bac', 'demi'], [['SO4^2-', 'H^+', 'e^-'], ['SO2', 'H2O'], [1, 4, 2, 1, 2], '1bac', 'demi'], [['H^+', 'e^-'], ['H2'], [2, 2, 1], '1bac', 'demi'],
    [['MnO2', 'HCl'], ['MnCl2', 'Cl2', 'H2O'], [1, 4, 1, 1, 2], '1bac', 'redox'], [['MnO4^-', 'H^+', 'Fe^2+'], ['Mn^2+', 'Fe^3+', 'H2O'], [1, 8, 5, 1, 5, 4], '1bac', 'redox'],
    [['I2', 'S2O3^2-'], ['I^-', 'S4O6^2-'], [1, 2, 2, 1], '1bac', 'redox'], [['Cr2O7^2-', 'H^+', 'Fe^2+'], ['Cr^3+', 'Fe^3+', 'H2O'], [1, 14, 6, 2, 6, 7], '1bac', 'redox'],
    [['Fe^2+', 'H2O2', 'H^+'], ['Fe^3+', 'H2O'], [2, 1, 2, 2, 2], '1bac', 'redox'], [['Cu', 'NO3^-', 'H^+'], ['Cu^2+', 'NO', 'H2O'], [3, 2, 8, 3, 2, 4], '1bac', 'redox'],
    [['C2H6O', 'MnO4^-', 'H^+'], ['C2H4O2', 'Mn^2+', 'H2O'], [5, 4, 12, 5, 4, 11], '1bac', 'redox'], [['MnO4^-', 'H^+', 'H2C2O4'], ['Mn^2+', 'CO2', 'H2O'], [2, 6, 5, 2, 10, 8], '1bac', 'redox'],
    [['H2O2', 'I^-', 'H^+'], ['I2', 'H2O'], [1, 2, 2, 1, 2], '1bac', 'redox'], [['MnO4^-', 'H^+', 'H2O2'], ['Mn^2+', 'O2', 'H2O'], [2, 6, 5, 2, 5, 8], '1bac', 'redox'],
    [['Sn^2+', 'Fe^3+'], ['Sn^4+', 'Fe^2+'], [1, 2, 1, 2], '1bac', 'redox'], [['Cr2O7^2-', 'H^+', 'I^-'], ['Cr^3+', 'I2', 'H2O'], [1, 14, 6, 2, 3, 7], '1bac', 'redox'],
    [['ClO^-', 'Cl^-', 'H^+'], ['Cl2', 'H2O'], [1, 1, 2, 1, 1], '1bac', 'redox'], [['Fe', 'H^+'], ['Fe^2+', 'H2'], [1, 2, 1, 1], '1bac', 'redox'],
    [['C3H8O', 'O2'], ['C3H6O', 'H2O'], [2, 1, 2, 2], '1bac', 'org'], [['C2H4', 'H2O'], ['C2H6O'], [1, 1, 1], '1bac', 'org'], [['C2H4', 'Br2'], ['C2H4Br2'], [1, 1, 1], '1bac', 'org'],
    // --- 2e Bac ---
    [['CH3COOH', 'H2O'], ['CH3COO^-', 'H3O^+'], [1, 1, 1, 1], '2bac', 'ab'], [['NH3', 'H2O'], ['NH4^+', 'HO^-'], [1, 1, 1, 1], '2bac', 'ab'], [['H2O', 'H2O'], ['H3O^+', 'HO^-'], [1, 1, 1, 1], '2bac', 'ab'],
    [['C6H5COOH', 'HO^-'], ['C6H5COO^-', 'H2O'], [1, 1, 1, 1], '2bac', 'ab'], [['H2C2O4', 'HO^-'], ['C2O4^2-', 'H2O'], [1, 2, 1, 2], '2bac', 'ab'],
    [['Cl^-', 'H2O'], ['Cl2', 'H2', 'HO^-'], [2, 2, 1, 1, 2], '2bac', 'elec'], [['H2O'], ['H2', 'O2'], [2, 2, 1], '2bac', 'elec'], [['NaCl', 'H2O'], ['Na^+', 'HO^-', 'H2', 'Cl2'], [2, 2, 2, 2, 1, 1], '2bac', 'elec'],
    [['Cu^2+', 'H2O'], ['Cu', 'O2', 'H^+'], [2, 2, 2, 1, 4], '2bac', 'elec'], [['PbSO4', 'H2O'], ['Pb', 'PbO2', 'SO4^2-', 'H^+'], [2, 2, 1, 1, 2, 4], '2bac', 'elec'],
    [['Zn', 'Cu^2+'], ['Zn^2+', 'Cu'], [1, 1, 1, 1], '2bac', 'redox'], [['Zn', 'Ag^+'], ['Zn^2+', 'Ag'], [1, 2, 1, 2], '2bac', 'redox'], [['S2O8^2-', 'I^-'], ['SO4^2-', 'I2'], [1, 2, 2, 1], '2bac', 'redox'],
    [['C2H4O2', 'C2H6O'], ['C4H8O2', 'H2O'], [1, 1, 1, 1], '2bac', 'org'], [['C5H12O', 'C2H4O2'], ['C7H14O2', 'H2O'], [1, 1, 1, 1], '2bac', 'org'],
    [['(C2H3O)2O', 'C2H6O'], ['C4H8O2', 'C2H4O2'], [1, 1, 1, 1], '2bac', 'org'], [['C4H8O2', 'HO^-'], ['C2H3O2^-', 'C2H6O'], [1, 1, 1, 1], '2bac', 'org'],
    [['(C17H35COO)3C3H5', 'HO^-'], ['C17H35COO^-', 'C3H8O3'], [1, 3, 3, 1], '2bac', 'org'], [['C7H6O3', 'C4H6O3'], ['C9H8O4', 'C2H4O2'], [1, 1, 1, 1], '2bac', 'org'],
    [['C2H4O2', 'CH4O'], ['C3H6O2', 'H2O'], [1, 1, 1, 1], '2bac', 'org'], [['CH2O2', 'C2H6O'], ['C3H6O2', 'H2O'], [1, 1, 1, 1], '2bac', 'org'], [['C4H8O2', 'H2O'], ['C2H4O2', 'C2H6O'], [1, 1, 1, 1], '2bac', 'org'],
    [['H2O2', 'I^-', 'H^+'], ['I2', 'H2O'], [1, 2, 2, 1, 2], '2bac', 'redox'], [['MnO4^-', 'H2C2O4', 'H^+'], ['Mn^2+', 'CO2', 'H2O'], [2, 5, 6, 2, 10, 8], '2bac', 'redox'],
    [['Fe', 'Ag^+'], ['Fe^2+', 'Ag'], [1, 2, 1, 2], '2bac', 'redox'], [['Al', 'Zn^2+'], ['Al^3+', 'Zn'], [2, 3, 2, 3], '2bac', 'redox'],
    [['NH3', 'H3O^+'], ['NH4^+', 'H2O'], [1, 1, 1, 1], '2bac', 'ab'], [['CH3COOH', 'HO^-'], ['CH3COO^-', 'H2O'], [1, 1, 1, 1], '2bac', 'ab'], [['HCOOH', 'H2O'], ['HCOO^-', 'H3O^+'], [1, 1, 1, 1], '2bac', 'ab'],
  ];

  // chapitre(s) du programme de chaque équation
  function eqChaps(e) {
    const [r, p, , n, t] = e, txt = r.concat(p).join(' ');
    if (t === 'diss') return ['1bc-electrolytes', '1bc-conductimetrie', '1bc-grandeurs'];
    if (n === 'tc') return t === 'redox' && /\^/.test(txt) && !/H\^\+|H2O/.test(txt) ? ['tcc-transformation', '1bc-redox', '2bc-piles', '2bc-spontanee'] : ['tcc-transformation'];
    if (n === '1bac') return t === 'ab' ? ['1bc-acidobase', '1bc-dosages'] : t === 'org' ? ['1bc-groupes'] : ['1bc-redox', '1bc-dosages'];
    if (t === 'ab') return ['2bc-deuxsens', '2bc-acidebase', '2bc-dosage'];
    if (t === 'elec') return ['2bc-electrolyse'];
    if (t === 'redox') return /S2O8|H2O2|H2C2O4/.test(txt) ? ['2bc-lentes', '2bc-vitesse'] : ['2bc-piles', '2bc-spontanee'];
    if (t === 'org') return /\(C2H3O\)2O|C17H35|C7H6O3|HO\^-/.test(txt) ? ['2bc-controle'] : ['2bc-ester'];
    return [];
  }
  EQ.forEach(e => { e.chs = eqChaps(e); });
  const chLabel = (chs, sel) => { const C = A().C(), l = C.ALL.find(x => chs.includes(x.id) && (!sel || sel.includes(x.id))) || C.ALL.find(x => chs.includes(x.id)); return l ? C.t(l.fr, l.ar) : ''; };
  const EQ_CH = [...new Set(EQ.flatMap(e => e.chs))];

  /* ---------- habillage commun (équipes, tours, podium) ---------- */
  /* sélection d’un ou plusieurs chapitres du programme (seuls ceux qui ont du contenu pour ce défi) */
  const LVN = { tc: 'Tronc commun', '1bac': '1re Bac', '2bac': '2e Bac' };
  function chapPicker(id, avail) {
    const ALL = A().C().ALL.filter(l => avail.includes(l.id)), lvls = Object.keys(LVN).filter(n => ALL.some(l => l.niv.id === n));
    let chosen = (A().get('jx-chs-' + id, null) || []).filter(x => avail.includes(x)); if (!chosen.length) chosen = ALL.filter(l => l.niv.id === lvls[lvls.length - 1]).map(l => l.id);
    let tab = (ALL.find(l => chosen.includes(l.id)) || ALL[0]).niv.id;
    // un seul niveau à la fois
    const lvOf = x => (ALL.find(l => l.id === x) || {}).niv, onLevel = () => { chosen = chosen.filter(x => (lvOf(x) || {}).id === tab); if (!chosen.length) chosen = ALL.filter(l => l.niv.id === tab).map(l => l.id); A().put('jx-chs-' + id, chosen); };
    onLevel();
    const html = `<div class="jx-chp"><div class="jx-chp-h"><b>📚 ${T('Chapitres du programme', 'دروس المقرر')}</b><span class="jx-chp-n"></span></div>
      <div class="jx-chp-tabs">${lvls.map(n => `<button type="button" data-lv="${n}">${LVN[n]}</button>`).join('')}</div><div class="jx-chp-list"></div>
      <div class="jx-chp-acts"><button type="button" data-a="all">✔ ${T('Tout ce niveau', 'كل المستوى')}</button><button type="button" data-a="none">✕ ${T('Aucun', 'لا شيء')}</button></div></div>`;
    const paint = () => {
      $$('.jx-chp-tabs button').forEach(b => b.classList.toggle('on', b.dataset.lv === tab));
      $('.jx-chp-list').innerHTML = ALL.filter(l => l.niv.id === tab).map(l => `<label class="${chosen.includes(l.id) ? 'on' : ''}"><input type="checkbox" value="${l.id}"${chosen.includes(l.id) ? ' checked' : ''}> ${esc(A().C().t(l.fr, l.ar))}</label>`).join('');
      $$('.jx-chp-list input').forEach(c => c.addEventListener('change', () => { chosen = c.checked ? chosen.concat(c.value) : chosen.filter(x => x !== c.value); A().put('jx-chs-' + id, chosen); paint(); }));
      $('.jx-chp-n').textContent = chosen.length + ' ' + T('chapitre(s) choisi(s)', 'درس مختار') + ' · ' + LVN[tab];
      $('#go').disabled = !chosen.length;
    };
    const wire = () => {
      $$('.jx-chp-tabs button').forEach(b => b.addEventListener('click', () => { if (tab !== b.dataset.lv) { tab = b.dataset.lv; onLevel(); } paint(); }));
      $$('.jx-chp-acts button').forEach(b => b.addEventListener('click', () => { const ids = ALL.filter(l => l.niv.id === tab).map(l => l.id); chosen = b.dataset.a === 'all' ? [...new Set(chosen.concat(ids))] : chosen.filter(x => !ids.includes(x)); A().put('jx-chs-' + id, chosen); paint(); }));
      paint();
    };
    return { html, wire, get: () => chosen.filter(x => (lvOf(x) || {}).id === tab) };
  }
  function setup(id, fields, go, avail) {
    const G = list.find(x => x[0] === id), TM = A().teams(), cp = avail ? chapPicker(id, avail) : null;
    app().innerHTML = `<section class="jx-page"><a class="jx-back" href="#/jeux">‹ ${T('Espace Jeux', 'فضاء الألعاب')}</a><div class="jx-setup ${G[6]}"><span class="jx-ic">${G[1]}</span><h1>${T(G[2], G[3])}</h1><p>${T(G[4], G[5])}</p>
      <p class="jx-teamsline">${TM.map((x, i) => `<span style="--c:${A().COLORS[i]}">${esc(x.n)}</span>`).join('')} <a href="#/jeux">${T('modifier les équipes', 'تعديل الفرق')}</a></p>
      ${cp ? cp.html : ''}<div class="jx-form">${fields}</div><button type="button" class="jx-btn big" id="go">▶ ${T('Lancer en plein écran', 'ابدأ في ملء الشاشة')}</button></div></section>`;
    if (cp) cp.wire();
    $('#go').addEventListener('click', () => { const v = {}; $$('.jx-form select').forEach(s => { v[s.id] = s.value; }); if (cp) v.chs = cp.get(); go(v); });
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
    const api = A(), TM = api.teams(), N = TM.length, sc = TM.map(() => 0), per = +v.nb, SEC = +v.sec, LV = { tc: ['tc'], '1bac': ['tc', '1bac'], '2bac': ['tc', '1bac', '2bac'], seul1: ['1bac'], seul2: ['2bac'] }[v.niv] || ['tc', '1bac', '2bac'];
    const inCh = e => !v.chs || e.chs.some(c => v.chs.includes(c));
    let Q = shuffle(EQ.filter(e => inCh(e) && (v.type === 'all' || e[4] === v.type))); if (!Q.length) Q = shuffle(EQ.filter(inCh)); let i = 0; api.full(true);
    function round() {
      api.stopTimers(); if (i >= per * N) return api.podium('equilibre', TM, sc, again);
      const cur = i % N, eq = Q[i % Q.length], sp = eq[0].concat(eq[1]), c = sp.map(() => 1); let done = false, aide = false, wrong = 0;
      app().innerHTML = `<section class="jx-stage">${api.bar()}${board(TM, sc, cur)}
        <div class="jx-turnrow"><div class="jx-turn" style="--c:${api.COLORS[cur]}">${T('À', 'دور')} <b>${esc(TM[cur].n)}</b> ${T('d’équilibrer', 'للموازنة')} · ${Math.floor(i / N) + 1}/${per}</div>${ring(api.COLORS[cur], SEC)}</div>
        <div class="jx-q jx-eqq" dir="ltr" lang="fr"><p class="jx-ch">${T(TY[eq[4]][0], TY[eq[4]][1])} · ${esc(chLabel(eq.chs, v.chs))}</p><div class="jx-eq">${sp.map((s, k) => `${k === eq[0].length ? '<span class="jx-arrow">⟶</span>' : k ? '<span class="jx-plus">+</span>' : ''}
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
  const UNIT_CH = { N: ['tc-actions', 'tc-gravitation'], J: ['1b-travail', '1b-ec'], W: ['1b-travail', '1b-global'], Pa: ['tc-actions'], Hz: ['tc-tension', '2b-ondes-per'], 'Ω': ['tc-passifs'],
    F: ['2b-rc'], H: ['2b-rl'], T: ['1b-champb'], C: ['tc-courant'], Bq: ['2b-radioactivite'], mol: ['tcc-mole'], S: ['1bc-conductimetrie'], V: ['tc-tension'], A: ['tc-courant'] };
  SY.forEach(q => { const t = q[0], a = q[1][0];
    q.chs = /unité/.test(t) ? UNIT_CH[a] || [] : /élément/.test(t) ? ['tcc-atome', 'tcc-classification'] : /ion /.test(t) ? ['tcc-atome', '1bc-electrolytes'] : /éthanol|éthanoïque/.test(t) ? ['tcc-molecules', '1bc-groupes'] : ['tcc-molecules', 'tcc-mole']; });
  const SY_CH = [...new Set(SY.flatMap(q => q.chs))];
  const norm = s => s.replace(/\s+/g, '').replace(/−/g, '-').replace(/\^/g, '').replace(/[⁺]/g, '+').replace(/[⁻]/g, '-');
  function preview(raw) { // H2O → H₂O ; SO42- avec ^ : SO4^2- → SO₄²⁻
    const r = raw.replace(/−/g, '-'); const m = r.match(/^(.*?)\^?(\d*[+-])$/); let body = m ? m[1] : r, ch = m ? m[2] : '';
    if (!r.includes('^') && m && /\d$/.test(m[1]) === false && ch.length > 1) { /* « 2+ » collé à une lettre : charge */ }
    return esc(body).replace(/([A-Za-z\)])(\d+)/g, '$1<sub>$2</sub>') + (ch ? `<sup>${ch.replace('-', '−')}</sup>` : '');
  }
  function symbolesPlay(v, again) {
    const api = A(), TM = api.teams(), N = TM.length, sc = TM.map(() => 0), per = +v.nb, SEC = +v.sec, Q = shuffle(SY.filter(q => !v.chs || q.chs.some(c => v.chs.includes(c)))); let i = 0, caps = true; api.full(true);
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
  const ELEC = ['tc-courant', 'tc-tension', 'tc-association'];
  const SCH_CH = { 'Conducteur ohmique (résistance)': ELEC.concat('tc-passifs'), Lampe: ELEC, Diode: ['tc-passifs'], 'Diode électroluminescente (DEL)': ['tc-passifs'], Condensateur: ['2b-rc', '2b-rlc'],
    Bobine: ['2b-rl', '2b-rlc'], 'Générateur (pile)': ELEC.concat('tc-actif'), 'Interrupteur ouvert': ELEC, 'Ampèremètre': ['tc-courant'], 'Voltmètre': ['tc-tension'], Moteur: ['tc-actif', '1b-transfert'],
    'Lentille convergente': ['1b-lentille', '1b-instruments'], 'Lentille divergente': ['1b-lentille'], 'Miroir plan': ['1b-miroir'], Ressort: ['tc-2forces', '2b-oscillants'], 'Amplificateur opérationnel': ['tc-aop'],
    'Prise de terre (masse)': ['tc-tension'], 'Bécher': ['tcc-concentration', '1bc-dosages', '2bc-dosage'], Erlenmeyer: ['tcc-concentration', '1bc-dosages', '2bc-dosage'], 'Éprouvette graduée': ['tcc-concentration', 'tcc-mole'],
    Burette: ['1bc-dosages', '2bc-dosage'], 'Fiole jaugée': ['tcc-concentration'], 'Ampoule à décanter': ['tcc-extraction'], 'Vecteur force (flèche)': ['tc-actions', 'tc-2forces'] };
  SCH.forEach(x => { x.chs = SCH_CH[x[0]] || []; });
  const WORD_CH = ['tc-gravitation', '2b-ondes', '2b-rc', '1bc-dosages', 'tcc-molecules', '1b-champb', '2b-oscillants', '2b-lumiere', 'tcc-atome', '2b-chute', 'tcc-synthese', '2bc-piles', 'tc-3forces', '2b-satellites', 'tc-courant', '1b-lentille', 'tc-2forces', '1b-miroir', '1b-visibilite', '2bc-electrolyse'];
  const WORDS = DRAW_WORDS.map((w, k) => ({ w, chs: [WORD_CH[k]] })).concat(SCH.map(x => ({ w: x[0], chs: x.chs })));
  const DESSIN_CH = [...new Set(WORDS.flatMap(x => x.chs))];
  const inChs = (x, v) => !v.chs || x.chs.some(c => v.chs.includes(c));
  function dessinSetup() {
    setup('dessin', sel('mode', T('Mode', 'النمط'), [['voir', T('Identifier le schéma qui se dessine', 'تعرّف على التبيان الذي يُرسم')], ['faire', T('Un élève dessine, son équipe devine', 'يرسم تلميذ ويخمن فريقه')]], 'voir') + sel('nb', T('Manches par équipe', 'جولات لكل فريق'), [['2', '2'], ['3', '3'], ['5', '5']], '3'),
      v => { const run = () => (v.mode === 'faire' ? dessinFaire : dessinVoir)(v, run); run(); }, DESSIN_CH);
  }
  function dessinVoir(v, again) {
    const api = A(), TM = api.teams(), N = TM.length, sc = TM.map(() => 0), per = +v.nb, Q0 = SCH.filter(x => inChs(x, v)), Q = shuffle(Q0), DUR = 14000;
    if (!Q.length) { alert(T('Aucun schéma à identifier pour ces chapitres : choisissez le mode « Un élève dessine ».', 'لا يوجد تبيان لهذه الدروس : اختر نمط « يرسم تلميذ ».')); return dessinSetup(); } let i = 0; api.full(true);
    function round() {
      api.stopTimers(); if (i >= per * N) return api.podium('dessin', TM, sc, again);
      let cur = i % N; const s = Q[i % Q.length], chim = x => x.chs.every(c => /^(tcc|1bc|2bc)-/.test(c)), alt = SCH.filter(x => x[0] !== s[0] && chim(x) === chim(s));
      const os = shuffle([s[0]].concat(shuffle(alt.filter(x => Q.includes(x))).concat(shuffle(alt.filter(x => !Q.includes(x)))).slice(0, 3).map(x => x[0]))); let done = false; const out = new Set();
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
    const api = A(), TM = api.teams(), N = TM.length, sc = TM.map(() => 0), per = +v.nb, W0 = WORDS.filter(x => inChs(x, v)).map(x => x.w), W = shuffle(W0.length ? W0 : WORDS.map(x => x.w)), SEC = 75; let i = 0; api.full(true);
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

  const EXTRA = {};
  return {
    list,
    register(def, fn) { list.push(def); EXTRA[def[0]] = fn; },
    page(id) {
      const T2 = (s, opts, d) => sel('sec', T('Temps par question', 'الوقت لكل سؤال'), opts.map(x => [x, x + ' s']), d);
      if (id === 'equilibre') setup(id, sel('type', T('Type de réaction', 'نوع التفاعل'), [['all', T('Tous les types', 'كل الأنواع')]].concat(Object.entries(TY).map(([k, x]) => [k, T(x[0], x[1])])), 'all') + roundsF() + T2('sec', ['45', '60', '90', '120'], '60'), v => { const run = () => equilibrePlay(v, run); run(); }, EQ_CH);
      else if (id === 'symboles') setup(id, roundsF() + T2('sec', ['20', '30', '45'], '30'), v => { const run = () => symbolesPlay(v, run); run(); }, SY_CH);
      else if (id === 'dessin') dessinSetup();
      else if (EXTRA[id]) EXTRA[id]();
    },
    _test: { parse, bilan, EQ, TY },
    _h: { setup, sel, roundsF, board, ring, timer, fmt, shuffle },
    _ch: { EQ_CH, SY_CH, DESSIN_CH },
  };
})();
