/* Défi « Chimie organique » (1re et 2e Bac) — écran interactif, par équipes.
   Questions générées à partir d’une base de 60 molécules (formules semi-développées dessinées) :
   nomenclature (nom ↔ formule), familles, classes d’alcools, formule brute, isomères,
   oxydation ménagée, estérification / hydrolyse / saponification, tests caractéristiques, notions de cours. */
'use strict';
(() => {
  if (!window.DEFIS) return;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const A = () => JEUX.api, T = (fr, ar) => A().C().t(fr, ar), esc = s => A().C().esc(s);
  const H = () => DEFIS._h, app = () => $('#app');
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = a => a[Math.floor(Math.random() * a.length)];

  /* ---------- base de molécules ----------
     s : formule semi-développée — groupes séparés par - (simple) ou = (double) ;
     {X} : ramification (1re au-dessus, 2e au-dessous) ; {=O} : liaison double vers O.
     f : famille ; n : niveau ; cl : classe d’alcool ; ox : produits d’oxydation ménagée ; ac / al : acide et alcool d’un ester */
  const M = [
    ['méthane', 'CH4', 'alcane'], ['éthane', 'CH3-CH3', 'alcane'], ['propane', 'CH3-CH2-CH3', 'alcane'], ['butane', 'CH3-CH2-CH2-CH3', 'alcane'],
    ['2-méthylpropane', 'CH3-CH{CH3}-CH3', 'alcane'], ['pentane', 'CH3-CH2-CH2-CH2-CH3', 'alcane'], ['2-méthylbutane', 'CH3-CH{CH3}-CH2-CH3', 'alcane'],
    ['2,2-diméthylpropane', 'CH3-C{CH3}{CH3}-CH3', 'alcane'], ['hexane', 'CH3-CH2-CH2-CH2-CH2-CH3', 'alcane'], ['3-méthylpentane', 'CH3-CH2-CH{CH3}-CH2-CH3', 'alcane'],
    ['2,3-diméthylbutane', 'CH3-CH{CH3}-CH{CH3}-CH3', 'alcane'], ['3-éthylpentane', 'CH3-CH2-CH{C2H5}-CH2-CH3', 'alcane'], ['2,2,4-triméthylpentane', 'CH3-C{CH3}{CH3}-CH2-CH{CH3}-CH3', 'alcane'],
    ['éthène', 'CH2=CH2', 'alcène'], ['propène', 'CH2=CH-CH3', 'alcène'], ['but-1-ène', 'CH2=CH-CH2-CH3', 'alcène'], ['but-2-ène', 'CH3-CH=CH-CH3', 'alcène'],
    ['2-méthylpropène', 'CH2=C{CH3}-CH3', 'alcène'], ['pent-2-ène', 'CH3-CH=CH-CH2-CH3', 'alcène'], ['2-méthylbut-2-ène', 'CH3-C{CH3}=CH-CH3', 'alcène'],
    ['méthanol', 'CH3-OH', 'alcool', { cl: 'primaire', ox: ['méthanal', 'acide méthanoïque'] }], ['éthanol', 'CH3-CH2-OH', 'alcool', { cl: 'primaire', ox: ['éthanal', 'acide éthanoïque'] }],
    ['propan-1-ol', 'CH3-CH2-CH2-OH', 'alcool', { cl: 'primaire', ox: ['propanal', 'acide propanoïque'] }], ['propan-2-ol', 'CH3-CH{OH}-CH3', 'alcool', { cl: 'secondaire', ox: ['propanone'] }],
    ['butan-1-ol', 'CH3-CH2-CH2-CH2-OH', 'alcool', { cl: 'primaire', ox: ['butanal', 'acide butanoïque'] }], ['butan-2-ol', 'CH3-CH{OH}-CH2-CH3', 'alcool', { cl: 'secondaire', ox: ['butanone'] }],
    ['2-méthylpropan-1-ol', 'CH3-CH{CH3}-CH2-OH', 'alcool', { cl: 'primaire', ox: ['2-méthylpropanal', 'acide 2-méthylpropanoïque'] }],
    ['2-méthylpropan-2-ol', 'CH3-C{CH3}{OH}-CH3', 'alcool', { cl: 'tertiaire', ox: [] }], ['pentan-3-ol', 'CH3-CH2-CH{OH}-CH2-CH3', 'alcool', { cl: 'secondaire', ox: ['pentan-3-one'] }],
    ['2-méthylbutan-2-ol', 'CH3-C{CH3}{OH}-CH2-CH3', 'alcool', { cl: 'tertiaire', ox: [] }], ['3-méthylbutan-1-ol', 'CH3-CH{CH3}-CH2-CH2-OH', 'alcool', { cl: 'primaire', ox: ['3-méthylbutanal', 'acide 3-méthylbutanoïque'] }],
    ['3-méthylbutan-2-ol', 'CH3-CH{CH3}-CH{OH}-CH3', 'alcool', { cl: 'secondaire', ox: ['3-méthylbutan-2-one'] }],
    ['méthanal', 'H-C{=O}-H', 'aldéhyde'], ['éthanal', 'CH3-CHO', 'aldéhyde'], ['propanal', 'CH3-CH2-CHO', 'aldéhyde'], ['butanal', 'CH3-CH2-CH2-CHO', 'aldéhyde'],
    ['2-méthylpropanal', 'CH3-CH{CH3}-CHO', 'aldéhyde'], ['3-méthylbutanal', 'CH3-CH{CH3}-CH2-CHO', 'aldéhyde'],
    ['propanone', 'CH3-C{=O}-CH3', 'cétone'], ['butanone', 'CH3-C{=O}-CH2-CH3', 'cétone'], ['pentan-2-one', 'CH3-C{=O}-CH2-CH2-CH3', 'cétone'],
    ['pentan-3-one', 'CH3-CH2-C{=O}-CH2-CH3', 'cétone'], ['3-méthylbutan-2-one', 'CH3-C{=O}-CH{CH3}-CH3', 'cétone'],
    ['acide méthanoïque', 'H-COOH', 'acide'], ['acide éthanoïque', 'CH3-COOH', 'acide'], ['acide propanoïque', 'CH3-CH2-COOH', 'acide'], ['acide butanoïque', 'CH3-CH2-CH2-COOH', 'acide'],
    ['acide 2-méthylpropanoïque', 'CH3-CH{CH3}-COOH', 'acide'], ['acide 3-méthylbutanoïque', 'CH3-CH{CH3}-CH2-COOH', 'acide'],
    ['méthanoate de méthyle', 'H-C{=O}-O-CH3', 'ester', { n: '2bac', ac: 'acide méthanoïque', al: 'méthanol' }], ['méthanoate d’éthyle', 'H-C{=O}-O-CH2-CH3', 'ester', { n: '2bac', ac: 'acide méthanoïque', al: 'éthanol' }],
    ['éthanoate de méthyle', 'CH3-C{=O}-O-CH3', 'ester', { n: '2bac', ac: 'acide éthanoïque', al: 'méthanol' }], ['éthanoate d’éthyle', 'CH3-C{=O}-O-CH2-CH3', 'ester', { n: '2bac', ac: 'acide éthanoïque', al: 'éthanol' }],
    ['propanoate de méthyle', 'CH3-CH2-C{=O}-O-CH3', 'ester', { n: '2bac', ac: 'acide propanoïque', al: 'méthanol' }], ['éthanoate de propyle', 'CH3-C{=O}-O-CH2-CH2-CH3', 'ester', { n: '2bac', ac: 'acide éthanoïque', al: 'propan-1-ol' }],
    ['propanoate d’éthyle', 'CH3-CH2-C{=O}-O-CH2-CH3', 'ester', { n: '2bac', ac: 'acide propanoïque', al: 'éthanol' }], ['butanoate d’éthyle', 'CH3-CH2-CH2-C{=O}-O-CH2-CH3', 'ester', { n: '2bac', ac: 'acide butanoïque', al: 'éthanol' }],
    ['éthanoate de 3-méthylbutyle', 'CH3-C{=O}-O-CH2-CH2-CH{CH3}-CH3', 'ester', { n: '2bac', ac: 'acide éthanoïque', al: '3-méthylbutan-1-ol' }],
    ['éthanoate de 1-méthyléthyle', 'CH3-C{=O}-O-CH{CH3}-CH3', 'ester', { n: '2bac', ac: 'acide éthanoïque', al: 'propan-2-ol' }],
    ['anhydride éthanoïque', 'CH3-C{=O}-O-C{=O}-CH3', 'anhydride', { n: '2bac', ac: 'acide éthanoïque' }], ['anhydride propanoïque', 'CH3-CH2-C{=O}-O-C{=O}-CH2-CH3', 'anhydride', { n: '2bac', ac: 'acide propanoïque' }],
  ].map(([nom, s, f, o]) => Object.assign({ nom, s, f, n: '1bac' }, o || {}));
  const byName = n => M.find(m => m.nom === n);
  const FAM = { alcane: 'Alcane', alcène: 'Alcène', alcool: 'Alcool', aldéhyde: 'Aldéhyde', cétone: 'Cétone', acide: 'Acide carboxylique', ester: 'Ester', anhydride: 'Anhydride d’acide' };

  /* ---------- dessin d’une formule semi-développée ---------- */
  const tok = s => { const out = []; let cur = '', depth = 0; for (const ch of s) { if (ch === '{') depth++; if (ch === '}') depth--; if (!depth && (ch === '-' || ch === '=')) { out.push(cur, ch); cur = ''; } else cur += ch; } out.push(cur); return out; };
  const sub = t => esc(t).replace(/(\d+)/g, '<sub>$1</sub>');
  function struct(s) {
    const parts = tok(s), cols = [];
    parts.forEach(p => {
      if (p === '-' || p === '=') { cols.push({ bond: p === '-' ? '–' : '=' }); return; }
      const m = p.match(/^([^{]*)((?:\{[^}]*\})*)$/), subs = (m[2].match(/\{[^}]*\}/g) || []).map(x => x.slice(1, -1));
      cols.push({ g: m[1], up: subs[0], dn: subs[1] });
    });
    const up = cols.some(c => c.up), dn = cols.some(c => c.dn);
    const cell = (x, cls) => `<span class="${cls}"><span>${x || ''}</span></span>`;
    const rows = (t, tb, m, bb, bo) => (up ? cell(t, 't') + cell(tb, 'tb') : '') + cell(m, 'm') + (dn ? cell(bb, 'bb') + cell(bo, 'bo') : '');
    const tpl = (up ? '1.15em .9em ' : '') + '1.3em' + (dn ? ' .9em 1.15em' : '');
    return `<span class="sdf" style="--rows:${tpl}">${cols.map(c => c.bond ? `<span class="sc b">${rows('', '', c.bond, '', '')}</span>`
      : `<span class="sc">${rows(c.up ? sub(c.up.replace('=', '')) : '', c.up ? (c.up[0] === '=' ? '‖' : '|') : '', sub(c.g), c.dn ? '|' : '', c.dn ? sub(c.dn) : '')}</span>`).join('')}</span>`;
  }
  function brute(s) { // formule brute CxHyOz
    const c = {}; s.replace(/[{}=-]/g, ' ').split(/\s+/).filter(Boolean).forEach(g => { (g.match(/[A-Z][a-z]?\d*/g) || []).forEach(t => { const e = t.match(/[A-Z][a-z]?/)[0], k = +(t.slice(e.length) || 1); c[e] = (c[e] || 0) + k; }); });
    return c;
  }
  const bruteTxt = c => ['C', 'H', 'O'].filter(e => c[e]).map(e => e + (c[e] > 1 ? c[e] : '')).join('');
  const bruteHtml = c => sub(bruteTxt(c));

  /* ---------- chapitres du programme ---------- */
  const FCH = { alcane: '1bc-squelettes', alcène: '1bc-squelettes', alcool: '1bc-groupes', aldéhyde: '1bc-groupes', cétone: '1bc-groupes', acide: '1bc-groupes', ester: '2bc-ester', anhydride: '2bc-controle' };
  const CAT_CH = { nom: ['1bc-squelettes', '1bc-groupes', '2bc-ester'], formule: ['1bc-squelettes', '1bc-groupes', '2bc-ester'], famille: ['1bc-squelettes', '1bc-groupes', '2bc-ester', '2bc-controle'],
    classe: ['1bc-groupes'], brute: ['1bc-squelettes', '1bc-groupes'], isomere: ['1bc-squelettes', '1bc-groupes'], oxydation: ['1bc-groupes'], ester: ['2bc-ester', '2bc-controle'], tests: ['1bc-squelettes', '1bc-groupes', '2bc-ester'], cours: ['1bc-squelettes', '2bc-ester', '2bc-controle'] };
  const ORG_CH = ['1bc-squelettes', '1bc-groupes', '2bc-ester', '2bc-controle'];
  let CH = ORG_CH; // chapitres choisis pour la partie en cours
  const inCh = c => CH.includes(c);

  /* ---------- générateurs de questions ---------- */
  const CATS = {
    nom: ['Nommer la molécule', 'تسمية الجزيئة'], formule: ['Retrouver la formule', 'إيجاد الصيغة'], famille: ['Famille chimique', 'العائلة الكيميائية'],
    classe: ['Classe d’alcool', 'صنف الكحول'], brute: ['Formule brute', 'الصيغة الإجمالية'], isomere: ['Isomères', 'المتماكبات'],
    oxydation: ['Oxydation ménagée', 'الأكسدة المعتدلة'], ester: ['Estérification, hydrolyse, saponification', 'الأسترة، الحلمأة، التصبن'], tests: ['Tests caractéristiques', 'روائز الكشف'], cours: ['Questions de cours', 'أسئلة الدرس'],
  };
  const near = (m, pool) => { // distracteurs proches : même famille d’abord
    const same = shuffle(pool.filter(x => x !== m && x.f === m.f)), other = shuffle(pool.filter(x => x !== m && x.f !== m.f));
    return same.concat(other).slice(0, 3);
  };
  const Q = {
    nom: P => { const m = pick(P); return { q: `${T('Quel est le nom de cette molécule ?', 'ما اسم هذه الجزيئة ؟')}<div class="sdbox">${struct(m.s)}</div>`, os: shuffle([m].concat(near(m, P))).map(x => ({ o: esc(x.nom), ok: x === m })), e: `${esc(m.nom)} : ${FAM[m.f].toLowerCase()}.` }; },
    formule: P => { const m = pick(P); return { q: `${T('Quelle est la formule semi-développée du', 'ما الصيغة نصف المنشورة لـ')} <b>${esc(m.nom)}</b> ?`, os: shuffle([m].concat(near(m, P))).map(x => ({ o: struct(x.s), ok: x === m })), struct: true, e: '' }; },
    famille: P => { const m = pick(P); const near2 = shuffle(Object.keys(FAM).filter(f => f !== m.f && P.some(x => x.f === f))), far = shuffle(Object.keys(FAM).filter(f => f !== m.f && !near2.includes(f))), fs = near2.concat(far).slice(0, 3); return { q: `${T('À quelle famille appartient cette molécule ?', 'إلى أي عائلة تنتمي هذه الجزيئة ؟')}<div class="sdbox">${struct(m.s)}</div>`, os: shuffle([m.f].concat(fs)).map(f => ({ o: FAM[f], ok: f === m.f })), e: `${esc(m.nom)}.` }; },
    classe: P => { const m = pick(P.filter(x => x.cl)); return { q: `${T('Quelle est la classe de cet alcool ?', 'ما صنف هذا الكحول ؟')}<div class="sdbox">${struct(m.s)}</div>`, os: ['primaire', 'secondaire', 'tertiaire'].map(c => ({ o: T('Alcool ', 'كحول ') + c, ok: c === m.cl })), e: `${esc(m.nom)} : ${T('le carbone fonctionnel est lié à', 'الكربون الوظيفي مرتبط بـ')} ${{ primaire: '1', secondaire: '2', tertiaire: '3' }[m.cl]} ${T('atome(s) de carbone', 'ذرة كربون')} (${T('méthanol : primaire', 'الميثانول : أولي')}).` }; },
    brute: P => { const m = pick(P.filter(x => x.s !== 'CH4')), c = brute(m.s), d = [{ ...c, H: c.H + 2 }, { ...c, H: c.H - 2 }, { ...c, C: c.C + 1 }, { ...c, O: (c.O || 0) + 1 }, { ...c, C: c.C - 1, H: c.H - 2 }].filter(x => x.H > 0 && x.C > 0).map(bruteTxt).filter(x => x !== bruteTxt(c));
      return { q: `${T('Quelle est la formule brute de cette molécule ?', 'ما الصيغة الإجمالية لهذه الجزيئة ؟')}<div class="sdbox">${struct(m.s)}</div>`, os: shuffle([bruteTxt(c)].concat(shuffle([...new Set(d)]).slice(0, 3))).map(x => ({ o: sub(x), ok: x === bruteTxt(c) })), e: `${esc(m.nom)} : ${bruteHtml(c)}.` }; },
    isomere: P => {
      const groups = {}; P.forEach(m => { const k = bruteTxt(brute(m.s)); (groups[k] = groups[k] || []).push(m); });
      const ks = Object.keys(groups).filter(k => groups[k].length > 1); if (!ks.length) return null;
      const g = groups[pick(ks)], [a, b] = shuffle(g), k = bruteTxt(brute(a.s)), bad = shuffle(P.filter(x => bruteTxt(brute(x.s)) !== k)).slice(0, 3);
      return { q: `${T('Laquelle de ces molécules est un isomère du', 'أي من هذه الجزيئات متماكب مع')} <b>${esc(a.nom)}</b> (${sub(k)}) ?`, os: shuffle([b].concat(bad)).map(x => ({ o: esc(x.nom), ok: x === b })), e: `${esc(b.nom)} ${T('a la même formule brute', 'له نفس الصيغة الإجمالية')} ${sub(k)} ${T('mais une formule développée différente.', 'لكن صيغة منشورة مختلفة.')}` };
    },
    oxydation: P => {
      const al = P.filter(x => x.f === 'alcool'); if (!al.length) return null; const m = pick(al), kind = Math.random();
      if (m.cl === 'tertiaire' || kind < 0.3) {
        return { q: `${T('Oxydation ménagée (permanganate acidifié en défaut) du', 'الأكسدة المعتدلة (برمنغنات محمضة بنقص) لـ')} <b>${esc(m.nom)}</b> :`, os: shuffle([[m.cl === 'tertiaire' ? T('Pas de réaction', 'لا تفاعل') : T('Un aldéhyde ou une cétone', 'ألدهيد أو سيتون'), true], [m.cl === 'tertiaire' ? T('Une cétone', 'سيتون') : T('Pas de réaction', 'لا تفاعل'), false], [T('Un alcène', 'ألسين'), false], [T('Un ester', 'إستر'), false]]).map(([o, ok]) => ({ o, ok })), e: T('Alcool primaire → aldéhyde (puis acide) ; secondaire → cétone ; tertiaire : pas d’oxydation ménagée.', 'كحول أولي ← ألدهيد (ثم حمض) ؛ ثانوي ← سيتون ؛ ثالثي : لا أكسدة معتدلة.') };
      }
      const good = m.ox[0], others = shuffle(M.filter(x => (x.f === 'aldéhyde' || x.f === 'cétone' || x.f === 'acide') && x.nom !== good && !m.ox.includes(x.nom))).slice(0, 3).map(x => x.nom);
      return { q: `${T('Produit de l’oxydation ménagée du', 'ناتج الأكسدة المعتدلة لـ')} <b>${esc(m.nom)}</b> (${T('oxydant en défaut', 'مؤكسد بنقص')}) ?`, os: shuffle([good].concat(others)).map(x => ({ o: esc(x), ok: x === good })), e: `${esc(m.nom)} (${T('alcool', 'كحول')} ${m.cl}) → ${esc(good)}${m.ox[1] ? ' ; ' + T('en excès d’oxydant : ', 'بوفرة المؤكسد : ') + esc(m.ox[1]) : ''}.` };
    },
    ester: P => {
      const es = M.filter(x => x.f === 'ester'), m = pick(es), kind = pick([0, 1].filter(() => inCh('2bc-ester')).concat([2, 3].filter(() => inCh('2bc-controle'))).concat([]).length ? [0, 1].filter(() => inCh('2bc-ester')).concat([2, 3].filter(() => inCh('2bc-controle'))) : [0, 1, 2, 3]);
      if (kind === 0) { const others = shuffle(es.filter(x => x !== m)).slice(0, 3); return { q: `${T('Estérification :', 'الأسترة :')} <b>${esc(m.ac)}</b> + <b>${esc(m.al)}</b> ⇌ ? + ${T('eau', 'ماء')}`, os: shuffle([m].concat(others)).map(x => ({ o: esc(x.nom), ok: x === m })), e: `${esc(m.nom)}. ${T('Réaction lente, limitée et athermique.', 'تفاعل بطيء ومحدود ولاحراري.')}` }; }
      if (kind === 1) { const pairs = shuffle(es.filter(x => x !== m)).slice(0, 3); return { q: `${T('L’hydrolyse de', 'حلمأة')} <b>${esc(m.nom)}</b> ${T('donne :', 'تعطي :')}`, os: shuffle([m].concat(pairs)).map(x => ({ o: `${esc(x.ac)} + ${esc(x.al)}`, ok: x === m })), e: T('Hydrolyse = réaction inverse de l’estérification (lente et limitée).', 'الحلمأة = عكس الأسترة (بطيئة ومحدودة).') }; }
      if (kind === 2) { const ac = byName(m.ac), car = m.ac.replace('acide ', 'ion ').replace('oïque', 'oate'); return { q: `${T('Saponification de', 'تصبن')} <b>${esc(m.nom)}</b> ${T('par la soude : produits ?', 'بالصودا : النواتج ؟')}`, os: shuffle([[`${esc(car)} + ${esc(m.al)}`, true], [`${esc(m.ac)} + ${esc(m.al)}`, false], [`${esc(car)} + ${T('eau', 'ماء')}`, false], [`${esc(m.ac)} + ${T('ion hydroxyde', 'أيون الهيدروكسيد')}`, false]]).map(([o, ok]) => ({ o, ok })), e: T('Saponification : ester + HO⁻ → ion carboxylate + alcool ; réaction lente mais totale.', 'التصبن : إستر + HO⁻ ← أيون كربوكسيلات + كحول ؛ تفاعل بطيء لكنه كلي.') }; }
      const an = pick(M.filter(x => x.f === 'anhydride')), est = pick(M.filter(x => x.f === 'ester' && x.ac === an.ac));
      return { q: `${T('Anhydride + alcool :', 'أندريد + كحول :')} <b>${esc(an.nom)}</b> + <b>${esc(est.al)}</b> → ?`, os: shuffle([[`${esc(est.nom)} + ${esc(an.ac)}`, true], [`${esc(est.nom)} + ${T('eau', 'ماء')}`, false], [`${esc(an.ac)} + ${T('eau', 'ماء')}`, false], [`${esc(est.al)} + ${esc(an.ac)}`, false]]).map(([o, ok]) => ({ o, ok })), e: T('Avec un anhydride, l’estérification est rapide et totale ; le sous-produit est l’acide, pas l’eau.', 'مع الأندريد تكون الأسترة سريعة وكلية ؛ والناتج الثانوي هو الحمض وليس الماء.') };
    },
    tests: P => {
      const L = [
        [T('Précipité jaune-orangé avec la DNPH, mais rien avec la liqueur de Fehling :', 'راسب أصفر برتقالي مع DNPH ولا شيء مع محلول فهلنغ :'), 'Une cétone', ['Un aldéhyde', 'Un alcool', 'Un acide carboxylique'], 'La DNPH caractérise le groupe carbonyle ; Fehling et Tollens ne réagissent qu’avec les aldéhydes.', '1bc-groupes'],
        [T('Précipité rouge brique avec la liqueur de Fehling à chaud :', 'راسب أحمر آجوري مع محلول فهلنغ ساخن :'), 'Un aldéhyde', ['Une cétone', 'Un alcool', 'Un ester'], 'Fehling (et Tollens) : test des aldéhydes.', '1bc-groupes'],
        [T('Dépôt d’argent (miroir) avec le réactif de Tollens :', 'راسب الفضة (مرآة) مع كاشف تولنس :'), 'Un aldéhyde', ['Une cétone', 'Un alcane', 'Un acide carboxylique'], 'Les aldéhydes réduisent les ions argent.', '1bc-groupes'],
        [T('Décoloration de l’eau de brome :', 'إزالة لون ماء البروم :'), 'Un alcène', ['Un alcane', 'Une cétone', 'Un ester'], 'Addition du dibrome sur la double liaison C=C.', '1bc-squelettes'],
        [T('Le BBT devient jaune et effervescence avec l’hydrogénocarbonate de sodium :', 'BBT يصفر وفوران مع هيدروجينوكربونات الصوديوم :'), 'Un acide carboxylique', ['Un alcool', 'Un aldéhyde', 'Un ester'], 'Le groupe –COOH donne une solution acide.', '1bc-groupes'],
        [T('Décolore le permanganate acidifié, sans réagir avec la DNPH :', 'يزيل لون البرمنغنات المحمضة ولا يتفاعل مع DNPH :'), 'Un alcool primaire ou secondaire', ['Un alcool tertiaire', 'Une cétone', 'Un alcane'], 'Les alcools I et II s’oxydent ; un alcool tertiaire, non.', '1bc-groupes'],
        [T('Quel réactif permet de distinguer le propanal de la propanone ?', 'أي كاشف يميز البروبانال عن البروبانون ؟'), 'La liqueur de Fehling', ['La DNPH', 'Le BBT', 'L’eau de brome'], 'Les deux donnent un précipité avec la DNPH ; seul l’aldéhyde réagit avec Fehling.', '1bc-groupes'],
        [T('Quel réactif permet de distinguer le butane du but-1-ène ?', 'أي كاشف يميز البوتان عن البوت-1-ين ؟'), 'L’eau de brome', ['La DNPH', 'Le réactif de Tollens', 'Le BBT'], 'Seul l’alcène décolore l’eau de brome.', '1bc-squelettes'],
        [T('Odeur fruitée caractéristique :', 'رائحة فاكهية مميزة :'), 'Un ester', ['Un alcane', 'Un acide carboxylique', 'Un alcool tertiaire'], 'Les esters sont responsables de nombreux arômes (banane, ananas…).', '2bc-ester'],
      ];
      const L2 = L.filter(x => inCh(x[4])), [q, g, w, e] = pick(L2.length ? L2 : L); return { q, os: shuffle([g].concat(w)).map(o => ({ o, ok: o === g })), e };
    },
    cours: P => {
      const L = [
        ['Le rendement de l’estérification d’un mélange équimolaire avec un alcool primaire est d’environ :', '67 %', ['100 %', '33 %', '5 %'], 'K ≈ 4 : x_f = 2/3 mol pour 1 mol de chaque réactif.', '2bc-ester'],
        ['Avec un alcool tertiaire, le rendement de l’estérification (mélange équimolaire) est d’environ :', '5 %', ['67 %', '60 %', '100 %'], 'Primaire 67 %, secondaire 60 %, tertiaire 5 %.', '2bc-ester'],
        ['Le rôle de l’acide sulfurique dans l’estérification :', 'Catalyseur', ['Réactif', 'Solvant', 'Il augmente le rendement'], 'Il accélère la réaction sans modifier l’état d’équilibre.', '2bc-ester'],
        ['Pour augmenter le rendement de l’estérification, on peut :', 'Mettre un réactif en excès', ['Ajouter un catalyseur', 'Ajouter de l’eau', 'Refroidir le mélange'], 'Ou éliminer un produit (eau ou ester) au fur et à mesure.', '2bc-ester'],
        ['Le chauffage à reflux permet :', 'D’accélérer la réaction sans perte de matière', ['D’augmenter K', 'De rendre la réaction totale', 'D’éliminer l’eau'], 'La température accélère ; le réfrigérant condense les vapeurs.', '2bc-ester'],
        ['La saponification est une réaction :', 'Lente et totale', ['Rapide et limitée', 'Lente et limitée', 'Instantanée'], 'Elle n’est pas renversable.', '2bc-controle'],
        ['La partie hydrophile d’un ion carboxylate (savon) est :', 'Le groupe –COO⁻', ['La chaîne carbonée', 'L’ion sodium', 'Le groupe –CH₃'], 'La chaîne carbonée est hydrophobe (lipophile).', '2bc-controle'],
        ['Le groupe caractéristique d’un ester est :', '–COO–', ['–COOH', '–CHO', '–OH'], 'R–COO–R′.', '2bc-ester'],
        ['L’estérification et l’hydrolyse conduisent :', 'Au même état d’équilibre', ['À des états d’équilibre différents', 'À une réaction totale', 'À aucun équilibre'], 'Ce sont deux réactions inverses.', '2bc-ester'],
        ['Remplacer l’acide par l’anhydride d’acide rend l’estérification :', 'Rapide et totale', ['Plus lente', 'Limitée à 67 %', 'Impossible'], 'Pas d’eau formée, donc pas d’hydrolyse.', '2bc-controle'],
        ['Les alcanes sont des hydrocarbures :', 'Saturés (liaisons simples)', ['Insaturés', 'Aromatiques', 'Oxygénés'], 'Formule générale CₙH₂ₙ₊₂.', '1bc-squelettes'],
        ['La formule générale des alcènes à une double liaison est :', 'CₙH₂ₙ', ['CₙH₂ₙ₊₂', 'CₙH₂ₙ₋₂', 'CₙH₂ₙ₊₁OH'], 'Une double liaison C=C.', '1bc-squelettes'],
        ['Le craquage catalytique permet :', 'De raccourcir les chaînes carbonées', ['D’allonger les chaînes', 'De ramifier les chaînes', 'De former des cycles uniquement'], 'Il produit des molécules plus petites (essences, alcènes).', '1bc-squelettes'],
        ['La polymérisation de l’éthène donne :', 'Le polyéthylène', ['Le polystyrène', 'Le PVC', 'Le nylon'], 'n CH₂=CH₂ → –(CH₂–CH₂)ₙ–.', '1bc-squelettes'],
      ];
      const L2 = L.filter(x => inCh(x[4])), [q, g, w, e] = pick(L2.length ? L2 : L); return { q: T(q, q), os: shuffle([g].concat(w)).map(o => ({ o, ok: o === g })), e };
    },
  };

  /* ---------- déroulement (équipes, chacune son tour) ---------- */
  function play(v, again) {
    const api = A(), h = H(), TM = api.teams(), N = TM.length, sc = TM.map(() => 0), per = +v.nb, SEC = +v.sec;
    CH = (v.chs && v.chs.length ? v.chs : ORG_CH);
    let P = M.filter(m => inCh(FCH[m.f])); if (P.length < 4) P = M.filter(m => inCh(FCH[m.f]) || FCH[m.f] === '1bc-groupes');
    const ok = c => CAT_CH[c].some(inCh) && (c !== 'classe' && c !== 'oxydation' || P.some(m => m.cl)) && (c !== 'isomere' || P.length > 3);
    let cats = (v.cat === 'all' ? Object.keys(CATS) : [v.cat]).filter(ok); if (!cats.length) cats = Object.keys(CATS).filter(ok);
    let i = 0, last = ''; api.full(true);
    const gen = () => { for (let k = 0; k < 20; k++) { const c = pick(cats), q = Q[c](P); if (q && (q.q + q.os.map(x => x.o).join()) !== last) { last = q.q + q.os.map(x => x.o).join(); return Object.assign(q, { cat: c }); } } return Object.assign(Q.famille(P), { cat: 'famille' }); };
    function round() {
      api.stopTimers(); if (i >= per * N) return api.podium('organique', TM, sc, again);
      let cur = i % N; const q = gen(); let done = false, steal = false;
      app().innerHTML = `<section class="jx-stage">${api.bar()}${h.board(TM, sc, cur)}
        <div class="jx-turnrow"><div class="jx-turn" style="--c:${api.COLORS[cur]}">${T('À', 'دور')} <b>${esc(TM[cur].n)}</b> · ${Math.floor(i / N) + 1}/${per}</div>${h.ring(api.COLORS[cur], SEC)}</div>
        <div class="jx-q jx-orgq" dir="ltr" lang="fr"><p class="jx-ch">🧪 ${T(CATS[q.cat][0], CATS[q.cat][1])}</p><div class="jx-qt">${q.q}</div>
          <div class="jx-os${q.struct ? ' sd' : ''}">${q.os.map((o, k) => `<button type="button" data-k="${k}"><i>${'ABCD'[k]}</i><span>${o.o}</span></button>`).join('')}</div><div class="jx-after"></div></div></section>`;
      api.wireBar();
      const finish = () => {
        done = true; api.stopTimers(); $$('.jx-os button').forEach((x, k) => { if (q.os[k].ok) x.classList.add('ok'); });
        $('.jx-board').outerHTML = h.board(TM, sc, cur);
        $('.jx-after').innerHTML = `${q.e ? `<p class="jx-e">${q.e}</p>` : ''}<button type="button" class="jx-btn big" id="nx">${T('Question suivante', 'السؤال التالي')} ›</button>`;
        $('#nx').addEventListener('click', () => { i++; round(); }); api.onKey(e => { if (e.key === 'Enter') { i++; round(); } });
      };
      const answer = k => {
        if (done) return; const b = $$('.jx-os button')[k]; if (b.classList.contains('ko')) return;
        if (q.os[k].ok) { b.classList.add('ok'); sc[cur] += steal ? 5 : Math.max(4, 10 + Math.ceil(left() / 3)); api.beep('ok'); return finish(); }
        b.classList.add('ko'); api.beep('ko');
        if (!steal && N > 1) { steal = true; cur = (cur + 1) % N; const tn = $('.jx-turn'); tn.style.setProperty('--c', api.COLORS[cur]); tn.innerHTML = `🔄 ${T('Vol de la question :', 'سرقة السؤال :')} <b>${esc(TM[cur].n)}</b> (5 pts)`; $('.jx-board').outerHTML = h.board(TM, sc, cur); return; }
        finish();
      };
      $$('.jx-os button').forEach(b => b.addEventListener('pointerdown', e => { e.preventDefault(); answer(+b.dataset.k); }));
      api.onKey(e => { const k = '1234'.indexOf(e.key) >= 0 ? '1234'.indexOf(e.key) : 'abcd'.indexOf(e.key.toLowerCase()); if (k >= 0 && k < q.os.length) answer(k); });
      const left = h.timer(SEC, () => { api.beep('ko'); finish(); });
    }
    round();
  }

  DEFIS.register(['organique', '🧪', 'Défi chimie organique', 'تحدي الكيمياء العضوية', 'Nomenclature, formules dessinées, familles, classes d’alcools, isomères, oxydation ménagée, esters, tests caractéristiques : des centaines de questions différentes.', 'التسمية، الصيغ المرسومة، العائلات، أصناف الكحولات، المتماكبات، الأكسدة المعتدلة، الإسترات، روائز الكشف : مئات الأسئلة المختلفة.', 'y4'], () => {
    const h = H();
    h.setup('organique', h.sel('cat', T('Catégorie', 'الفئة'), [['all', T('Toutes les catégories (mélange)', 'كل الفئات (مزيج)')]].concat(Object.entries(CATS).map(([k, x]) => [k, T(x[0], x[1])])), 'all')
      + h.roundsF() + h.sel('sec', T('Temps par question', 'الوقت لكل سؤال'), [['30', '30 s'], ['45', '45 s'], ['60', '60 s'], ['90', '90 s']], '45'),
      v => { const run = () => play(v, run); run(); }, ORG_CH);
  });
  DEFIS._org = { M, Q, struct, brute, bruteTxt, setCh: c => { CH = c; }, FCH };
})();
