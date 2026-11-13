/* Simulations de chimie (utilise les outils définis dans sims.js) */
'use strict';
const FARADAY = 96500, NA = 6.02e23, RGP = 8.314;
const subs = s => String(s).replace(/\d/g, d => '₀₁₂₃₄₅₆₇₈₉'[d]);

/* ================= TRONC COMMUN ================= */
S('densite', [['m', 'm (g)', 10, 500, 5, 120], ['V', 'V (cm³)', 10, 300, 5, 150]], 0, (c, v) => {
  const rho = v.m / v.V, a = 30 + Math.cbrt(v.V) * 14, x0 = 170, w = 300, yw = 130, yb = 320;
  c.rect(x0, yw, w, yb - yw, c.a + '33'); c.line(x0, 70, x0, yb); c.line(x0, yb, x0 + w, yb); c.line(x0 + w, yb, x0 + w, 70);
  c.line(x0, yw, x0 + w, yw, c.a, 2);
  const top = rho >= 1 ? yb - a : yw - a * (1 - rho);
  c.rect(320 - a / 2, top, a, a, c.d, c.ink);
  c.text('ρ = ' + fmt(rho) + ' g/cm³', 320, top + a / 2 + 5, '#fff', 'center', 13, true);
  c.text(T('eau : ρ = 1 g/cm³', 'الماء : ρ = 1 g/cm³'), x0 + w + 12, yw + 4, c.a, 'left', 12, true);
  return ['ρ = m / V = ' + fmt(rho) + ' g/cm³ = ' + fmt(rho * 1000) + ' kg/m³', 'd = ρ / ρ_{eau} = ' + fmt(rho),
    rho < 1 ? T('d < 1 : le corps flotte', 'd < 1 : الجسم يطفو') : rho > 1 ? T('d > 1 : le corps coule', 'd > 1 : الجسم يغوص') : T('d = 1 : entre deux eaux', 'd = 1')];
});

S('ccm', [['ra', 'R_f (A)', 0.1, 0.9, 0.01, 0.35], ['rb', 'R_f (B)', 0.1, 0.9, 0.01, 0.7]], 1, (c, v, t) => {
  const yb = 300, k = min(1, (t % 9) / 5), H = 240 * k, x0 = 200;
  c.rect(x0, 30, 240, 300, c.grid, c.ink); c.rect(x0, yb - H, 240, H + 30, c.a + '22');
  c.line(x0, yb, x0 + 240, yb, c.mute, 1.5); c.line(x0, yb - H, x0 + 240, yb - H, c.a, 1.5, [5, 4]);
  c.text(T('ligne de dépôt', 'خط الإيداع'), x0 - 8, yb + 4, c.mute, 'right', 12); c.text(T('front du solvant', 'جبهة المذيب'), x0 - 8, yb - H + 4, c.a, 'right', 12);
  [['A', [v.ra], [c.b]], ['B', [v.rb], [c.c]], ['M', [v.ra, v.rb], [c.b, c.c]]].forEach(([lb, rs, cols], i) => {
    const x = x0 + 50 + i * 70; c.text(lb, x, yb + 22, c.ink, 'center', 13, true);
    rs.forEach((r, j) => c.circ(x, yb - r * H, 8, cols[j]));
  });
  c.line(x0 + 252, yb, x0 + 252, yb - H, c.ink, 1); c.text('H', x0 + 260, yb - H / 2, c.ink, 'left', 13, true);
  return ['R_f = h / H', 'R_f(A) = ' + fmt(v.ra) + ' ;  R_f(B) = ' + fmt(v.rb), T('Le mélange M donne deux taches : il contient A et B', 'الخليط M يعطي بقعتين : يحتوي على A و B'),
    T('Même R_f (même éluant) ⇒ même espèce chimique', 'نفس R_f (نفس المذيب) ⇐ نفس النوع الكيميائي')];
});

const ELEM = [['H', 1], ['He', 4], ['Li', 7], ['Be', 9], ['B', 11], ['C', 12], ['N', 14], ['O', 16], ['F', 19], ['Ne', 20], ['Na', 23], ['Mg', 24], ['Al', 27], ['Si', 28], ['P', 31], ['S', 32], ['Cl', 35], ['Ar', 40]];
S('atome', [['Z', 'Z', 1, 18, 1, 11]], 1, (c, v, t) => {
  const [sym, A] = ELEM[v.Z - 1], sh = [min(v.Z, 2), clamp(v.Z - 2, 0, 8), max(v.Z - 10, 0)], cx = 210, cy = 180, per = sh[2] ? 3 : sh[1] ? 2 : 1, val = sh[per - 1];
  c.circ(cx, cy, 24, c.b); c.text(v.Z + ' p', cx, cy - 1, '#fff', 'center', 12, true); c.text((A - v.Z) + ' n', cx, cy + 13, '#fff', 'center', 11);
  sh.forEach((n, k) => {
    if (!n) return; const R = 58 + k * 42; c.circ(cx, cy, R, null, c.grid, 1.5); c.text('KLM'[k], cx + R + 6, cy - 4, c.mute, 'left', 12, true);
    for (let i = 0; i < n; i++) { const a = 2 * PI * i / n + t * (0.5 - k * 0.12); c.circ(cx + R * cos(a), cy + R * sin(a), 6, c.a); }
  });
  c.text(sym, 500, 150, c.ink, 'center', 64, true); c.text(String(A), 452, 112, c.mute, 'right', 16, true); c.text(String(v.Z), 452, 152, c.mute, 'right', 16, true);
  const grp = v.Z === 2 ? 8 : val, ion = v.Z <= 2 || v.Z === 10 || v.Z === 18 || val === 4 ? '' : val <= 3 ? sym + '^{' + (val > 1 ? val : '') + '+}' : sym + '^{' + (8 - val > 1 ? 8 - val : '') + '−}';
  return [T('Structure électronique : ', 'البنية الإلكترونية : ') + '(K)^' + sh[0] + (sh[1] ? '(L)^' + sh[1] : '') + (sh[2] ? '(M)^' + sh[2] : ''),
  T('Période (ligne) : ', 'الدورة (السطر) : ') + per + ' ;  ' + T('groupe (colonne) : ', 'المجموعة (العمود) : ') + ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'][grp - 1],
  T('Charge du noyau : ', 'شحنة النواة : ') + '+' + v.Z + 'e = ' + fmt(v.Z * 1.6e-19) + ' C', 'm ≈ A·m_p = ' + fmt(A * 1.67e-27) + ' kg',
  ion ? T('Ion monoatomique stable : ', 'الأيون الأحادي الذرة المستقر : ') + ion : T('Couche externe : pas d’ion monoatomique usuel', 'لا يعطي أيونا أحادي الذرة اعتياديا')];
});
SIMS.classification = { p: [['Z', 'Z', 1, 18, 1, 17]], anim: 1, draw: SIMS.atome.draw };

const MOLS = [
  { n: 'CH₄', ce: 'C', b: [['H', 45, 1], ['H', 135, 1], ['H', 225, 1], ['H', 315, 1]], lp: [], g: ['tétraédrique', 'رباعي الأوجه'], ang: '109,5°' },
  { n: 'NH₃', ce: 'N', b: [['H', 215, 1], ['H', 270, 1], ['H', 325, 1]], lp: [90], g: ['pyramidale', 'هرمية'], ang: '107°' },
  { n: 'H₂O', ce: 'O', b: [['H', 218, 1], ['H', 322, 1]], lp: [55, 125], g: ['coudée (en V)', 'منحنية (على شكل V)'], ang: '104,5°' },
  { n: 'CO₂', ce: 'C', b: [['O', 0, 2], ['O', 180, 2]], lp: [], g: ['linéaire', 'خطية'], ang: '180°', olp: 2 },
  { n: 'HCl', ce: 'Cl', b: [['H', 180, 1]], lp: [0, 90, 270], g: ['linéaire', 'خطية'], ang: '—' },
];
S('molecule', [['k', ['Molécule', 'الجزيئة'], MOLS.map(m => [m.n, m.n]), 2]], 0, (c, v) => {
  const m = MOLS[v.k], cx = 320, cy = 175, Lb = 105;
  const pair = (x, y, a) => { const px = -sin(a) * 6, py = -cos(a) * 6; c.circ(x + px, y + py, 3, c.c); c.circ(x - px, y - py, 3, c.c); };
  m.b.forEach(([el, ad, ord]) => {
    const a = rad(ad), ex = cx + Lb * cos(a), ey = cy - Lb * sin(a), nx = sin(a) * 4, ny = cos(a) * 4;
    if (ord === 2) { c.line(cx + nx, cy + ny, ex + nx, ey + ny, c.ink, 3); c.line(cx - nx, cy - ny, ex - nx, ey - ny, c.ink, 3); } else c.line(cx, cy, ex, ey, c.ink, 3);
    c.circ(ex, ey, 20, el === 'H' ? c.bg : c.b, c.ink, 2); c.text(el, ex, ey + 5, el === 'H' ? c.ink : '#fff', 'center', 15, true);
    if (m.olp) [90, 270].forEach(d => pair(ex + 30 * cos(rad(d)), ey - 30 * sin(rad(d)), rad(d)));
  });
  m.lp.forEach(d => pair(cx + 36 * cos(rad(d)), cy - 36 * sin(rad(d)), rad(d)));
  c.circ(cx, cy, 24, c.a, c.ink, 2); c.text(m.ce, cx, cy + 5, '#fff', 'center', 16, true);
  const nl = m.b.reduce((s, b) => s + b[2], 0), nn = m.lp.length + (m.olp ? m.olp * m.b.length : 0);
  c.circ(40, 330, 3, c.c); c.circ(50, 330, 3, c.c); c.text(T('doublet non liant', 'زوج غير رابط'), 60, 334, c.mute, 'left', 12);
  return [T('Molécule : ', 'الجزيئة : ') + m.n, T('Doublets liants : ', 'الأزواج الرابطة : ') + nl + ' ;  ' + T('doublets non liants : ', 'الأزواج غير الرابطة : ') + nn,
  T('Géométrie : ', 'الهندسة : ') + T(m.g[0], m.g[1]), T('Angle de liaison : ', 'زاوية الرابطة : ') + m.ang, T('Les doublets se repoussent et s’écartent au maximum', 'الأزواج الإلكترونية تتنافر وتتباعد إلى أقصى حد')];
});

const SUBST = [['H₂O', 18], ['NaCl', 58.5], ['Fe', 55.8], ['Cu', 63.5], ['C₆H₁₂O₆', 180], ['CO₂', 44]];
S('mole', [['k', ['Espèce chimique', 'النوع الكيميائي'], SUBST.map(s => [s[0] + '  (M = ' + s[1] + ' g/mol)', s[0] + '  (M = ' + s[1] + ' g/mol)']), 0], ['m', 'm (g)', 1, 200, 1, 36]], 0, (c, v) => {
  const [nm, M] = SUBST[v.k], n = v.m / M, nd = min(220, round(n * 20));
  for (let i = 0; i < nd; i++) c.circ(50 + (i % 20) * 27, 60 + floor(i / 20) * 24, 9, c.a);
  if (!nd) c.text('n < 0,05 mol', 320, 180, c.mute, 'center', 14);
  c.circ(50, 335, 9, c.a); c.text('= 0,05 mol = 3,01×10²² ' + T('entités', 'دقيقة'), 66, 340, c.mute, 'left', 12);
  return ['M(' + nm + ') = ' + M + ' g/mol', 'n = m / M = ' + fmt(n) + ' mol', 'N = n·N_A = ' + fmt(n * NA) + ' ' + T('entités', 'دقيقة')];
});

S('dilution', [['C0', 'C_0 (mol/L)', 0.1, 2, 0.05, 1], ['V0', 'V_0 (mL)', 1, 50, 1, 10], ['Vf', 'V_f (mL)', 50, 500, 10, 100]], 0, (c, v) => {
  const Cf = v.C0 * v.V0 / v.Vf, ctx = c.ctx;
  const flask = (x, C, lb, fill) => {
    ctx.globalAlpha = clamp(C / 2, 0.04, 1); c.poly([[x - 60, 300], [x + 60, 300], [x + 60 - 40 * fill, 300 - 150 * fill], [x - 60 + 40 * fill, 300 - 150 * fill]], c.e); ctx.globalAlpha = 1;
    c.poly([[x - 60, 300], [x + 60, 300], [x + 14, 130], [x + 14, 70], [x - 14, 70], [x - 14, 130]], null, c.ink, 2);
    c.text(lb, x, 325, c.ink, 'center', 13, true); c.text(fmt(C) + ' mol/L', x, 50, c.ink, 'center', 13, true);
  };
  flask(170, v.C0, T('solution mère', 'المحلول الأم'), 0.7); c.arrow(260, 200, 370, 200, c.ink, ''); c.text('V_0 = ' + v.V0 + ' mL', 315, 188, c.mute, 'center', 12);
  c.text('+ ' + T('eau distillée', 'ماء مقطر'), 315, 222, c.a, 'center', 12); flask(470, Cf, T('solution fille', 'المحلول البنت'), 0.95);
  return ['C_0·V_0 = C_f·V_f', 'C_f = C_0·V_0 / V_f = ' + fmt(Cf) + ' mol/L', T('Facteur de dilution', 'معامل التخفيف') + ' : F = V_f / V_0 = ' + fmt(v.Vf / v.V0), 'n = C_0·V_0 = ' + fmt(v.C0 * v.V0 / 1000) + ' mol'];
});

function mkAv(list, defs) {
  return {
    p: [['r', ['Réaction', 'التفاعل'], list.map(r => [r.eq, r.eq]), 0], ['a', 'n_0(' + 'A' + ') (mol)', 0.1, 5, 0.1, defs[0]], ['b', 'n_0(B) (mol)', 0.1, 5, 0.1, defs[1]], ['p', 'x / x_{max} (%)', 0, 100, 1, 0]], anim: 0,
    draw(c, v) {
      const R = list[v.r], xm = min(v.a / R.co[0], v.b / R.co[1]), x = xm * v.p / 100, n0 = [v.a, v.b];
      const cols = [c.a, c.b, c.c, c.d], arr = R.sp.map((s, i) => ({ label: s, val: max(0, i < 2 ? n0[i] - R.co[i] * x : R.co[i] * x), color: cols[i] }));
      c.text(R.eq, 320, 28, c.ink, 'center', 15, true); c.text('A = ' + R.sp[0] + '   B = ' + R.sp[1], 320, 48, c.mute, 'center', 12);
      c.bars(arr, max(v.a, v.b, ...R.sp.map((s, i) => i >= 2 ? R.co[i] * xm : 0)), [60, 62, 580, 315]); c.text('n (mol)', 588, 300, c.mute, 'left', 12);
      const ra = v.a / R.co[0], rb = v.b / R.co[1], lim = abs(ra - rb) < 1e-9 ? T('mélange stœchiométrique', 'خليط ستوكيومتري') : T('réactif limitant : ', 'المتفاعل المحد : ') + R.sp[ra < rb ? 0 : 1];
      const out = ['x_{max} = ' + fmt(xm) + ' mol  (' + lim + ')', 'x = ' + fmt(x) + ' mol', 'n(A) = n_0(A) − ' + R.co[0] + '·x = ' + fmt(max(0, v.a - R.co[0] * x)) + ' mol'];
      if (R.ne) out.push(T('Électrons échangés', 'الإلكترونات المتبادلة') + ' : n(e⁻) = ' + R.ne + '·x = ' + fmt(R.ne * x) + ' mol');
      if (R.note) out.push(T(R.note[0], R.note[1]));
      return out;
    }
  };
}
SIMS.avancement = mkAv([
  { eq: '2 H₂ + O₂ → 2 H₂O', sp: ['H₂', 'O₂', 'H₂O'], co: [2, 1, 2] },
  { eq: 'N₂ + 3 H₂ → 2 NH₃', sp: ['N₂', 'H₂', 'NH₃'], co: [1, 3, 2] },
  { eq: 'CH₄ + 2 O₂ → CO₂ + 2 H₂O', sp: ['CH₄', 'O₂', 'CO₂', 'H₂O'], co: [1, 2, 1, 2] },
], [2, 2]);
SIMS.av_ab = mkAv([
  { eq: 'CH₃COOH + HO⁻ → CH₃COO⁻ + H₂O', sp: ['CH₃COOH', 'HO⁻', 'CH₃COO⁻'], co: [1, 1, 1], note: ['L’acide CH₃COOH cède un proton H⁺ à la base HO⁻', 'الحمض CH₃COOH يمنح بروتونا H⁺ للقاعدة HO⁻'] },
  { eq: 'NH₃ + H₃O⁺ → NH₄⁺ + H₂O', sp: ['NH₃', 'H₃O⁺', 'NH₄⁺'], co: [1, 1, 1], note: ['La base NH₃ capte un proton H⁺ de l’acide H₃O⁺', 'القاعدة NH₃ تكتسب بروتونا H⁺ من الحمض H₃O⁺'] },
  { eq: 'HCl + NH₃ → NH₄⁺ + Cl⁻', sp: ['HCl', 'NH₃', 'NH₄⁺', 'Cl⁻'], co: [1, 1, 1, 1], note: ['Couples : HCl/Cl⁻ et NH₄⁺/NH₃', 'المزدوجتان : HCl/Cl⁻ و NH₄⁺/NH₃'] },
], [1, 2]);
SIMS.av_redox = mkAv([
  { eq: 'Zn + Cu²⁺ → Zn²⁺ + Cu', sp: ['Zn', 'Cu²⁺', 'Zn²⁺', 'Cu'], co: [1, 1, 1, 1], ne: 2, note: ['Zn est oxydé (réducteur) ; Cu²⁺ est réduit (oxydant)', 'Zn يتأكسد (مختزل) ؛ Cu²⁺ يُختزل (مؤكسد)'] },
  { eq: 'Cu + 2 Ag⁺ → Cu²⁺ + 2 Ag', sp: ['Cu', 'Ag⁺', 'Cu²⁺', 'Ag'], co: [1, 2, 1, 2], ne: 2, note: ['Cu est oxydé ; Ag⁺ est réduit', 'Cu يتأكسد ؛ Ag⁺ يُختزل'] },
  { eq: 'MnO₄⁻ + 5 Fe²⁺ + 8 H⁺ → Mn²⁺ + 5 Fe³⁺ + 4 H₂O', sp: ['MnO₄⁻', 'Fe²⁺', 'Mn²⁺', 'Fe³⁺'], co: [1, 5, 1, 5], ne: 5, note: ['H⁺ en excès ; MnO₄⁻ (violet) est réduit en Mn²⁺ (incolore)', 'H⁺ بوفرة ؛ MnO₄⁻ (بنفسجي) يُختزل إلى Mn²⁺ (عديم اللون)'] },
], [1, 2]);

/* ================= 1 BAC ================= */
S('gaz', [['n', 'n (mol)', 0.1, 2, 0.1, 1], ['th', 'θ (°C)', -50, 200, 5, 25], ['V', 'V (L)', 2, 50, 1, 24]], 1, (c, v, t) => {
  const Tk = v.th + 273.15, P = v.n * RGP * Tk / (v.V * 1e-3), x0 = 200, w = 240, yb = 320, h = 40 + v.V * 4.6, yt = yb - h, sp = sqrt(Tk / 300) * 60;
  c.rect(x0, yt, w, h, c.a + '18'); c.line(x0, 40, x0, yb, c.ink, 3); c.line(x0, yb, x0 + w, yb, c.ink, 3); c.line(x0 + w, yb, x0 + w, 40, c.ink, 3);
  c.rect(x0 + 2, yt - 14, w - 4, 14, c.mute); c.line(320, yt - 14, 320, yt - 44, c.mute, 6);
  const tri = (u, L) => { const m = ((u % (2 * L)) + 2 * L) % (2 * L); return m < L ? m : 2 * L - m; };
  for (let i = 0, N = round(v.n * 24); i < N; i++) {
    const px = tri(i * 97.3 + t * sp * (0.6 + (i * 7 % 5) / 5), w - 14), py = tri(i * 53.7 + t * sp * (0.5 + (i * 3 % 7) / 7), h - 14);
    c.circ(x0 + 7 + px, yt + 7 + py, 4, c.b);
  }
  return ['P·V = n·R·T', 'T = θ + 273,15 = ' + fmt(Tk, 4) + ' K', 'P = n·R·T / V = ' + fmt(P) + ' Pa = ' + fmt(P / 1e5) + ' bar', 'V_m = V / n = ' + fmt(v.V / v.n) + ' L/mol'];
});

const ELECTRO = [['NaCl', 'Na⁺', 1, 'Cl⁻', 1], ['CaCl₂', 'Ca²⁺', 1, 'Cl⁻', 2], ['Na₂SO₄', 'Na⁺', 2, 'SO₄²⁻', 1], ['FeCl₃', 'Fe³⁺', 1, 'Cl⁻', 3], ['Al₂(SO₄)₃', 'Al³⁺', 2, 'SO₄²⁻', 3]];
S('electrolyte', [['k', ['Soluté', 'المذاب'], ELECTRO.map(e => [e[0], e[0]]), 1], ['C', 'C (mol/L)', 0.01, 1, 0.01, 0.2]], 0, (c, v) => {
  const [s, cat, a, an, b] = ELECTRO[v.k], co = n => n > 1 ? n + ' ' : '';
  c.text(s + '(s)  →  ' + co(a) + cat + '(aq) + ' + co(b) + an + '(aq)', 320, 30, c.ink, 'center', 16, true);
  c.bars([{ label: 'C', val: v.C, color: c.mute }, { label: '[' + cat + ']', val: a * v.C, color: c.b }, { label: '[' + an + ']', val: b * v.C, color: c.a }], 3, [120, 50, 520, 315]);
  c.text('(mol/L)', 530, 300, c.mute, 'left', 12);
  return ['[' + cat + '] = ' + (a > 1 ? a + '·' : '') + 'C = ' + fmt(a * v.C) + ' mol/L', '[' + an + '] = ' + (b > 1 ? b + '·' : '') + 'C = ' + fmt(b * v.C) + ' mol/L',
  T('Électroneutralité : charges + = charges −', 'الحياد الكهربائي : الشحن + = الشحن −')];
});

const LAM = { 'Na⁺': 5.01, 'K⁺': 7.35, 'H₃O⁺': 35.0, 'Cl⁻': 7.63, 'HO⁻': 19.9 };
const CONDS = [['NaCl', 'Na⁺', 'Cl⁻'], ['KCl', 'K⁺', 'Cl⁻'], ['HCl', 'H₃O⁺', 'Cl⁻'], ['NaOH', 'Na⁺', 'HO⁻']];
S('conductimetrie', [['k', ['Solution', 'المحلول'], CONDS.map(e => [e[1] + ' + ' + e[2], e[1] + ' + ' + e[2]]), 0], ['C', 'C (mmol/L)', 0.5, 10, 0.5, 5], ['S', 'S (cm²)', 0.5, 4, 0.1, 1], ['L', 'L (cm)', 0.5, 3, 0.1, 1]], 0, (c, v) => {
  const e = CONDS[v.k], ls = LAM[e[1]] + LAM[e[2]], sig = c0 => ls * 1e-3 * c0, kc = v.S * 1e-4 / (v.L * 1e-2), G = sig(v.C) * kc * 1000;
  c.axes(0, 10, 0, sig(10) * kc * 1000 * 1.1, 'C (mmol/L)', 'G (mS)');
  c.curve(x => sig(x) * kc * 1000, c.a, 3); c.pt(v.C, G);
  c.line(c.X(v.C), c.Y(0), c.X(v.C), c.Y(G), c.mute, 1, [4, 4]); c.line(c.X(0), c.Y(G), c.X(v.C), c.Y(G), c.mute, 1, [4, 4]);
  return ['σ = λ(' + e[1] + ')·[' + e[1] + '] + λ(' + e[2] + ')·[' + e[2] + '] = ' + fmt(sig(v.C)) + ' S/m', 'G = σ·S / L = ' + fmt(G) + ' mS',
  'λ(' + e[1] + ') = ' + fmt(LAM[e[1]]) + ' ;  λ(' + e[2] + ') = ' + fmt(LAM[e[2]]) + '  (mS·m²/mol)', T('G est proportionnelle à C (solutions diluées) : courbe d’étalonnage', 'G تتناسب مع C (محاليل مخففة) : منحنى التدريج')];
});

S('dosage_cond', [['Ca', 'C_A (mol/L)', 0.005, 0.05, 0.001, 0.02], ['Va', 'V_A (mL)', 10, 50, 1, 20], ['Cb', 'C_B (mol/L)', 0.01, 0.1, 0.005, 0.05], ['V', 'V_B (mL)', 0, 30, 0.1, 4]], 0, (c, v) => {
  const VE = v.Ca * v.Va / v.Cb;
  const sg = V => { const Vt = v.Va + V, d = v.Ca * v.Va - v.Cb * V; return (35.0 * max(d, 0) + 19.9 * max(-d, 0) + 5.01 * v.Cb * V + 7.63 * v.Ca * v.Va) / Vt; };
  c.axes(0, 30, 0, max(sg(0), sg(30)) * 1.1, 'V_B (mL)', 'σ (S/m)');
  c.curve(sg, c.a, 3, 600);
  if (VE <= 30) { c.line(c.X(VE), c.Y(0), c.X(VE), c.Y(sg(VE)), c.mute, 1, [4, 4]); c.text('V_E', c.X(VE), c.Y(0) - 6, c.ink, 'center', 13, true); }
  c.pt(v.V, sg(v.V));
  return ['H₃O⁺ + HO⁻ → 2 H₂O', T('Équivalence', 'التكافؤ') + ' : C_A·V_A = C_B·V_E  ⇒  V_E = ' + fmt(VE) + ' mL', 'σ = ' + fmt(sg(v.V)) + ' S/m',
    v.V < VE - 0.05 ? T('Avant l’équivalence : H₃O⁺ est remplacé par Na⁺ (moins conducteur) ⇒ σ diminue', 'قبل التكافؤ : يعوض Na⁺ الأيونات H₃O⁺ ⇐ σ تتناقص')
      : v.V > VE + 0.05 ? T('Après l’équivalence : HO⁻ et Na⁺ en excès ⇒ σ augmente', 'بعد التكافؤ : HO⁻ و Na⁺ بوفرة ⇐ σ تتزايد') : T('Équivalence : σ minimale', 'التكافؤ : σ دنوية')];
});

const PREF = ['méth', 'éth', 'prop', 'but', 'pent', 'hex', 'hept', 'oct', 'non', 'déc'];
const FAM = [['alcane', 'ألكان'], ['alcène', 'ألسين'], ['alcool', 'كحول'], ['aldéhyde', 'ألدهيد'], ['cétone', 'سيتون'], ['acide carboxylique', 'حمض كربوكسيلي'], ['amine', 'أمين'], ['dérivé chloré', 'مشتق كلوري']];
function drawOrga(c, v) {
  const f = v.f, n = max(v.n, f === 1 ? 2 : f === 4 ? 3 : 1), p = PREF[n - 1], loc = n > 2 ? '-1-' : '', mid = k => Array(max(k, 0)).fill('CH₂');
  const R = n === 1 ? ['CH₃'] : ['CH₃', ...mid(n - 2), 'CH₂'];
  const D = [
    [p + 'ane', 'C_{' + n + '}H_{' + (2 * n + 2) + '}', 14 * n + 2, n === 1 ? ['CH₄'] : ['CH₃', ...mid(n - 2), 'CH₃'], 'C_nH_{2n+2}', ''],
    [n < 4 ? p + 'ène' : p + '-1-ène', 'C_{' + n + '}H_{' + 2 * n + '}', 14 * n, n === 2 ? ['CH₂=CH₂'] : ['CH₂=CH', ...mid(n - 3), 'CH₃'], 'C_nH_{2n}', 'C=C'],
    [p + 'an' + loc + 'ol', 'C_{' + n + '}H_{' + (2 * n + 2) + '}O', 14 * n + 18, [...R, 'OH'], 'C_nH_{2n+1}–OH', '–OH (hydroxyle)'],
    [p + 'anal', 'C_{' + n + '}H_{' + 2 * n + '}O', 14 * n + 16, n === 1 ? ['HCHO'] : ['CH₃', ...mid(n - 2), 'CHO'], 'R–CHO', '–CHO (carbonyle)'],
    [n === 3 ? 'propanone' : p + 'an-2-one', 'C_{' + n + '}H_{' + 2 * n + '}O', 14 * n + 16, ['CH₃', 'CO', ...mid(n - 3), 'CH₃'], 'R–CO–R′', '–CO– (carbonyle)'],
    ['acide ' + p + 'anoïque', 'C_{' + n + '}H_{' + 2 * n + '}O_2', 14 * n + 32, n === 1 ? ['HCOOH'] : ['CH₃', ...mid(n - 2), 'COOH'], 'R–COOH', '–COOH (carboxyle)'],
    [p + 'an' + loc + 'amine', 'C_{' + n + '}H_{' + (2 * n + 3) + '}N', 14 * n + 17, [...R, 'NH₂'], 'R–NH₂', '–NH₂ (amino)'],
    [(n > 2 ? '1-' : '') + 'chloro' + p + 'ane', 'C_{' + n + '}H_{' + (2 * n + 1) + '}Cl', 14 * n + 36.5, [...R, 'Cl'], 'R–Cl', '–Cl (halogéno)'],
  ][f];
  c.text(D[0], 320, 60, c.a, 'center', 24, true);
  c.text(D[3].join('–'), 320, 125, c.ink, 'center', n > 8 ? 13 : 16, true);
  // formule topologique
  const st = min(46, 440 / n), x0 = 320 - st * (n - 1) / 2, pt = i => [x0 + i * st, 235 + (i % 2 ? -14 : 14)];
  for (let i = 0; i < n - 1; i++) {
    const [x1, y1] = pt(i), [x2, y2] = pt(i + 1); c.line(x1, y1, x2, y2, c.ink, 2.5);
    if (f === 1 && i === 0) c.line(x1 + 2, y1 - 7, x2 + 2, y2 - 7, c.ink, 2.5);
  }
  if (n === 1) c.circ(x0, 235, 3, c.ink);
  const dbl = i => { const [x, y] = pt(i); c.line(x - 3, y, x - 3, y - 34, c.b, 2.5); c.line(x + 3, y, x + 3, y - 34, c.b, 2.5); c.text('O', x, y - 40, c.b, 'center', 15, true); };
  const [xe, ye] = pt(n - 1), tail = s => { c.line(xe, ye, xe + 26, ye + (n % 2 ? -10 : 10), c.b, 2.5); c.text(s, xe + 30, ye + (n % 2 ? -8 : 16), c.b, 'left', 15, true); };
  if (f === 2) tail('OH'); if (f === 6) tail('NH₂'); if (f === 7) tail('Cl'); if (f === 3) dbl(n - 1); if (f === 4) dbl(1); if (f === 5) { dbl(n - 1); tail('OH'); }
  c.text(T('formule topologique', 'الصيغة الطوبولوجية'), 320, 310, c.mute, 'center', 12);
  const out = [T('Famille : ', 'المجموعة : ') + T(FAM[f][0], FAM[f][1]) + '  (' + D[4] + ')', T('Formule brute : ', 'الصيغة الإجمالية : ') + D[1], 'M = ' + fmt(D[2], 4) + ' g/mol'];
  if (D[5]) out.push(T('Groupe caractéristique : ', 'المجموعة المميزة : ') + D[5]);
  return out;
}
SIMS.organique = { p: [['f', ['Famille', 'المجموعة'], FAM, 0], ['n', ['Nombre de carbones n', 'عدد ذرات الكربون n'], 1, 10, 1, 4]], anim: 0, draw: drawOrga };
SIMS.groupes = { p: [['f', ['Famille', 'المجموعة'], FAM, 2], ['n', ['Nombre de carbones n', 'عدد ذرات الكربون n'], 1, 10, 1, 2]], anim: 0, draw: drawOrga };

/* ================= 2 BAC ================= */
S('cinetique', [['th', 'θ (°C)', 10, 80, 1, 25], ['C', 'C_0 (mol/L)', 0.1, 2, 0.1, 0.5], ['t', 't (s)', 0, 300, 1, 60]], 0, (c, v) => {
  const k = 0.008 * v.C * 2 ** ((v.th - 20) / 10), xm = 10, V = 0.1, x = u => xm * (1 - exp(-k * u)), dx = xm * k * exp(-k * v.t), th = Math.LN2 / k;
  c.axes(0, 300, 0, 11, 't (s)', 'x (mmol)');
  c.line(c.X(0), c.Y(xm), c.X(300), c.Y(xm), c.mute, 1, [4, 4]); c.text('x_{max}', c.X(300) - 6, c.Y(xm) - 6, c.mute, 'right', 12, true);
  c.curve(x, c.a, 3); c.curve(u => x(v.t) + dx * (u - v.t), c.d, 1.8, 50, [6, 4]);
  if (th <= 300) { c.line(c.X(th), c.Y(0), c.X(th), c.Y(xm / 2), c.mute, 1, [4, 4]); c.line(c.X(0), c.Y(xm / 2), c.X(th), c.Y(xm / 2), c.mute, 1, [4, 4]); c.text('t_{1/2}', c.X(th), c.Y(0) - 6, c.ink, 'center', 12, true); }
  c.pt(v.t, x(v.t));
  return ['x(t) = ' + fmt(x(v.t)) + ' mmol', 'v = (1/V)·dx/dt = ' + fmt(dx * 1e-3 / V) + ' mol·L^{-1}·s^{-1}  (V = 100 mL)', 't_{1/2} = ' + fmt(th) + ' s   (x = x_{max} / 2)',
    T('θ ↑ ou C ↑ ⇒ réaction plus rapide ; la vitesse diminue au cours du temps (modèle)', 'θ ↑ أو C ↑ ⇐ تفاعل أسرع ؛ السرعة تتناقص مع الزمن (نموذج)')];
});

S('acide_faible', [['lc', 'log C', -4, -1, 0.05, -2], ['pk', 'pK_A', 2, 10, 0.1, 4.8]], 0, (c, v) => {
  const Ka = 10 ** -v.pk, xf = C => (-Ka + sqrt(Ka * Ka + 4 * Ka * C)) / 2, C = 10 ** v.lc, x = xf(C), tau = x / C;
  c.axes(-4, -1, 0, 1, 'log C', 'τ', [58, 22, 618, 240]);
  c.curve(l => xf(10 ** l) / 10 ** l, c.a, 3); c.pt(v.lc, tau);
  c.rect(58, 285, 560, 30, c.grid); c.rect(58, 285, 560 * tau, 30, c.b);
  c.text('A⁻ + H₃O⁺  (' + fmt(tau * 100) + ' %)', 58, 278, c.b, 'left', 12, true); c.text('AH  (' + fmt((1 - tau) * 100) + ' %)', 618, 278, c.mute, 'right', 12, true);
  return ['AH + H₂O ⇌ A⁻ + H₃O⁺', 'C = ' + fmt(C) + ' mol/L ;  x_{max} = C·V', 'pH = − log [H₃O⁺] = ' + fmt(-log10(x)), 'τ = x_f / x_{max} = [H₃O⁺] / C = ' + fmt(tau) + (tau < 1 ? '  < 1 : ' + T('transformation limitée', 'تحول محدود') : ''),
    'Q_{r,éq} = [A⁻]·[H₃O⁺] / [AH] = K_A = ' + fmt(Ka), T('La dilution augmente τ, mais K ne change pas', 'التخفيف يزيد τ، لكن K لا تتغير')];
});

S('predominance', [['ph', 'pH', 0, 14, 0.1, 6], ['pk', 'pK_A', 2, 12, 0.1, 4.8]], 0, (c, v) => {
  const fb = p => 1 / (1 + 10 ** (v.pk - p)), b = fb(v.ph);
  c.axes(0, 14, 0, 100, 'pH', '%', [58, 22, 618, 250]);
  c.curve(p => 100 * (1 - fb(p)), c.b, 3); c.curve(p => 100 * fb(p), c.a, 3);
  c.line(c.X(v.pk), c.Y(0), c.X(v.pk), c.Y(100), c.mute, 1, [4, 4]); c.text('pK_A', c.X(v.pk), c.Y(100) - 6, c.ink, 'center', 12, true);
  c.pt(v.ph, 100 * fb(v.ph), c.a); c.pt(v.ph, 100 * (1 - fb(v.ph)), c.b);
  const xk = 58 + v.pk / 14 * 560; c.rect(58, 295, xk - 58, 26, c.b + '55'); c.rect(xk, 295, 618 - xk, 26, c.a + '55');
  c.text(T('AH prédomine', 'AH مهيمن'), (58 + xk) / 2, 313, c.ink, 'center', 12, true); c.text(T('A⁻ prédomine', 'A⁻ مهيمن'), (xk + 618) / 2, 313, c.ink, 'center', 12, true);
  c.line(58 + v.ph / 14 * 560, 290, 58 + v.ph / 14 * 560, 326, c.ink, 3);
  return ['pH = pK_A + log([A⁻] / [AH])', '[A⁻] / [AH] = 10^{pH − pK_A} = ' + fmt(10 ** (v.ph - v.pk)), '% AH = ' + fmt(100 * (1 - b)) + ' ;  % A⁻ = ' + fmt(100 * b),
    abs(v.ph - v.pk) < 0.05 ? 'pH = pK_A  ⇒  [AH] = [A⁻]' : v.ph < v.pk ? 'pH < pK_A  ⇒  ' + T('l’acide AH prédomine', 'الحمض AH مهيمن') : 'pH > pK_A  ⇒  ' + T('la base A⁻ prédomine', 'القاعدة A⁻ مهيمنة')];
});

S('titrage', [['ac', ['Acide dosé', 'الحمض المعاير'], [['acide fort (HCl)', 'حمض قوي (HCl)'], ['acide faible (CH₃COOH, pK_A = 4,8)', 'حمض ضعيف (CH₃COOH, pK_A = 4,8)']], 1], ['Ca', 'C_A (mol/L)', 0.005, 0.1, 0.005, 0.01], ['Va', 'V_A (mL)', 10, 30, 1, 20], ['Cb', 'C_B (mol/L)', 0.005, 0.1, 0.005, 0.01], ['V', 'V_B (mL)', 0, 40, 0.1, 10]], 0, (c, v) => {
  const Ka = v.ac ? 10 ** -4.8 : 1e7, Kw = 1e-14, VE = v.Ca * v.Va / v.Cb;
  const pH = V => {
    const Vt = v.Va + V, ca = v.Ca * v.Va / Vt, na = v.Cb * V / Vt; let lo = 0, hi = 14;
    for (let i = 0; i < 45; i++) { const m = (lo + hi) / 2, h = 10 ** -m; (h + na - Kw / h - ca * Ka / (Ka + h) > 0) ? lo = m : hi = m; }
    return (lo + hi) / 2;
  };
  c.axes(0, 40, 0, 14, 'V_B (mL)', 'pH');
  c.curve(pH, c.a, 3, 800);
  const pe = pH(VE);
  if (VE <= 40) { c.line(c.X(VE), c.Y(0), c.X(VE), c.Y(pe), c.mute, 1, [4, 4]); c.line(c.X(0), c.Y(pe), c.X(VE), c.Y(pe), c.mute, 1, [4, 4]); c.circ(c.X(VE), c.Y(pe), 5, c.d); c.text('E', c.X(VE) + 8, c.Y(pe) + 14, c.d, 'left', 13, true); }
  if (v.ac && VE / 2 <= 40) { c.circ(c.X(VE / 2), c.Y(pH(VE / 2)), 4, c.c); c.text('pH = pK_A', c.X(VE / 2) + 8, c.Y(pH(VE / 2)) + 16, c.c, 'left', 12, true); }
  c.pt(v.V, pH(v.V));
  return [(v.ac ? 'CH₃COOH + HO⁻ → CH₃COO⁻ + H₂O' : 'H₃O⁺ + HO⁻ → 2 H₂O'), T('Équivalence', 'التكافؤ') + ' : C_A·V_A = C_B·V_{BE}  ⇒  V_{BE} = ' + fmt(VE) + ' mL', 'pH_E = ' + fmt(pe) + ' ;  pH(V_B) = ' + fmt(pH(v.V)),
  T('Indicateur adapté : ', 'الكاشف الملون المناسب : ') + (pe > 7.7 ? T('phénolphtaléine (8,2 – 10)', 'الفينول فتالين (8,2 – 10)') : T('bleu de bromothymol (6,0 – 7,6)', 'أزرق البروموتيمول (6,0 – 7,6)'))];
});

S('quotient', [['a', '[CH₃COOH] (mol/L)', 0.01, 1, 0.01, 0.1], ['b', '[HCOO⁻] (mol/L)', 0.01, 1, 0.01, 0.1], ['p', '[CH₃COO⁻] (mol/L)', 0.01, 1, 0.01, 0.1], ['q', '[HCOOH] (mol/L)', 0.01, 1, 0.01, 0.1]], 0, (c, v) => {
  const K = 0.1, Q = v.p * v.q / (v.a * v.b), X = l => 320 + clamp(l, -4.2, 4.2) * 66, y = 200, lq = log10(Q), lk = log10(K);
  c.text('CH₃COOH + HCOO⁻  ⇌  CH₃COO⁻ + HCOOH', 320, 40, c.ink, 'center', 16, true);
  c.arrow(40, y, 610, y, c.ink, 'Q_r', 2);
  for (let l = -4; l <= 4; l++) { c.line(X(l), y - 5, X(l), y + 5, c.ink, 1.5); c.text('10^' + l, X(l), y + 24, c.mute, 'center', 11); }
  c.line(X(lk), y - 46, X(lk), y + 8, c.c, 3); c.text('K = 0,1', X(lk), y - 54, c.c, 'center', 14, true);
  c.circ(X(lq), y, 8, c.b); c.text('Q_{r,i}', X(lq), y + 50, c.b, 'center', 14, true);
  const eq = abs(lq - lk) < 0.02; if (!eq) c.arrow(X(lq), y - 22, X(lq) + (lq < lk ? 1 : -1) * min(60, abs(X(lk) - X(lq))), y - 22, c.b, '', 3);
  return ['Q_{r,i} = [CH₃COO⁻]·[HCOOH] / ([CH₃COOH]·[HCOO⁻]) = ' + fmt(Q), 'K = K_{A1} / K_{A2} = 10^{pK_{A2} − pK_{A1}} = 10^{3,8 − 4,8} = 0,1',
    eq ? 'Q_{r,i} = K : ' + T('système à l’équilibre', 'المجموعة في حالة توازن') : Q < K ? 'Q_{r,i} < K : ' + T('évolution dans le sens direct (→)', 'تطور في المنحى المباشر (→)') : 'Q_{r,i} > K : ' + T('évolution dans le sens inverse (←)', 'تطور في المنحى المعاكس (←)')];
});

function beaker(c, x, col, lb) {
  c.rect(x - 60, 190, 120, 120, col + '33'); c.line(x - 60, 150, x - 60, 310, c.ink, 2); c.line(x - 60, 310, x + 60, 310, c.ink, 2); c.line(x + 60, 310, x + 60, 150, c.ink, 2);
  c.text(lb, x, 332, c.ink, 'center', 12, true);
}
S('pile', [['I', 'I (mA)', 10, 500, 10, 100], ['dt', 'Δt (min)', 1, 180, 1, 60]], 1, (c, v, t) => {
  const Q = v.I / 1000 * v.dt * 60, x = Q / (2 * FARADAY);
  beaker(c, 190, c.mute, 'Zn²⁺ + SO₄²⁻'); beaker(c, 450, c.a, 'Cu²⁺ + SO₄²⁻');
  c.rect(178, 110, 24, 170, c.mute, c.ink); c.rect(438, 110, 24, 170, c.d, c.ink);
  c.text('Zn  (−)', 190, 100, c.ink, 'center', 13, true); c.text('Cu  (+)', 450, 100, c.ink, 'center', 13, true);
  c.ctx.beginPath(); c.ctx.moveTo(230, 250); c.ctx.lineTo(230, 170); c.ctx.lineTo(410, 170); c.ctx.lineTo(410, 250); c.ctx.strokeStyle = c.e; c.ctx.lineWidth = 12; c.ctx.lineJoin = 'round'; c.ctx.stroke();
  c.text(T('pont salin', 'قنطرة أيونية'), 320, 160, c.e, 'center', 12, true);
  c.line(190, 110, 190, 50); c.line(190, 50, 450, 50); c.line(450, 50, 450, 110); c.circ(320, 50, 16, c.bg, c.ink, 2); c.text('A', 320, 55, c.ink, 'center', 13, true);
  for (let i = 0; i < 6; i++) { const u = ((i / 6 + t * v.I / 900) % 1); if (abs(u - 0.5) > 0.07) c.circ(190 + u * 260, 50, 4, c.a); }
  c.arrow(215, 36, 265, 36, c.a, 'e⁻', 1.8); c.arrow(425, 66, 375, 66, c.b, 'I', 1.8);
  return ['Zn + Cu²⁺ → Zn²⁺ + Cu', T('Anode (−) : oxydation', 'الأنود (−) : أكسدة') + '  Zn → Zn²⁺ + 2 e⁻ ;  ' + T('cathode (+) : réduction', 'الكاثود (+) : اختزال') + '  Cu²⁺ + 2 e⁻ → Cu',
    'Q = I·Δt = ' + fmt(Q) + ' C', 'x = Q / (2·F) = ' + fmt(x) + ' mol', 'Δm(Zn) = −x·M(Zn) = −' + fmt(x * 65.4) + ' g ;  Δm(Cu) = +' + fmt(x * 63.5) + ' g'];
});

const METALS = [['Cu²⁺ → Cu', 2, 63.5, 'Cu'], ['Ag⁺ → Ag', 1, 107.9, 'Ag'], ['Zn²⁺ → Zn', 2, 65.4, 'Zn'], ['Ni²⁺ → Ni', 2, 58.7, 'Ni']];
S('electrolyse', [['k', ['Dépôt à la cathode', 'التوضع على الكاثود'], METALS.map(m => [m[0], m[0]]), 0], ['I', 'I (A)', 0.1, 5, 0.1, 1], ['dt', 'Δt (min)', 1, 180, 1, 30]], 1, (c, v, t) => {
  const [eq, n, M, sy] = METALS[v.k], Q = v.I * v.dt * 60, x = Q / (n * FARADAY), m = x * M, th = clamp(m * 2.2, 0, 26);
  c.rect(200, 180, 240, 130, c.a + '33'); c.line(200, 130, 200, 310, c.ink, 2); c.line(200, 310, 440, 310, c.ink, 2); c.line(440, 310, 440, 130, c.ink, 2);
  c.rect(248 - th / 2, 150, 20 + th, 130, c.d); c.rect(248, 110, 20, 170, c.mute, c.ink); c.rect(372, 110, 20, 170, c.mute, c.ink);
  c.text(T('cathode (−)', 'الكاثود (−)'), 190, 120, c.ink, 'right', 12, true); c.text(T('anode (+)', 'الأنود (+)'), 450, 120, c.ink, 'left', 12, true);
  c.line(258, 110, 258, 50); c.line(258, 50, 382, 50); c.line(382, 50, 382, 110);
  c.rect(300, 36, 40, 28, c.bg, c.ink, 2); c.text('G', 320, 55, c.ink, 'center', 13, true); c.text('−', 290, 42, c.ink, 'center', 14, true); c.text('+', 350, 42, c.b, 'center', 14, true);
  for (let i = 0; i < 4; i++) { const u = (i / 4 + t * v.I / 6) % 1; c.circ(300 - u * 42, 50, 4, c.a); }
  c.arrow(382, 78, 382, 100, c.b, 'I', 1.8);
  return [T('Cathode : réduction', 'الكاثود : اختزال') + '  ' + eq.replace('→', '+ ' + n + ' e⁻ →'), 'Q = I·Δt = ' + fmt(Q) + ' C', 'n(e⁻) = Q / F = ' + fmt(Q / FARADAY) + ' mol',
  'm(' + sy + ') = I·Δt·M / (' + n + '·F) = ' + fmt(m) + ' g', T('Le générateur impose le sens du courant : transformation forcée', 'المولد يفرض منحى التيار : تحول قسري')];
});

function drawEster(c, v) {
  const anh = v.r === 1, K = 4, a = v.a, b = v.b, xm = min(a, b);
  const xf = anh ? xm : (K * (a + b) - sqrt((K * (a + b)) ** 2 - 4 * (K - 1) * K * a * b)) / (2 * (K - 1));
  const k = 0.012 * 2 ** ((v.th - 20) / 10) * (v.cat ? 6 : 1) * (anh ? 12 : 1), x = t => xf * (1 - exp(-k * t));
  c.axes(0, 120, 0, max(xm * 1.15, 0.2), 't (min)', 'n(ester) (mol)');
  c.line(c.X(0), c.Y(xm), c.X(120), c.Y(xm), c.mute, 1, [4, 4]); c.text('x_{max}', c.X(120) - 6, c.Y(xm) - 6, c.mute, 'right', 12, true);
  if (!anh) { c.line(c.X(0), c.Y(xf), c.X(120), c.Y(xf), c.c, 1, [4, 4]); c.text('x_{éq}', c.X(120) - 6, c.Y(xf) + 15, c.c, 'right', 12, true); }
  c.curve(x, c.a, 3);
  return [anh ? T('Anhydride + alcool → ester + acide  (totale, rapide)', 'أندريد + كحول → إستر + حمض  (كلي، سريع)') : T('Acide + alcool ⇌ ester + eau  (lente, limitée)', 'حمض + كحول ⇌ إستر + ماء  (بطيء، محدود)'),
  'x_{max} = ' + fmt(xm) + ' mol ;  x_f = ' + fmt(xf) + ' mol', T('Rendement', 'المردود') + ' : r = x_f / x_{max} = ' + fmt(xf / xm * 100) + ' %',
  anh ? '' : 'K = x_{éq}² / ((n_A − x_{éq})·(n_B − x_{éq})) = 4',
  T('Température et catalyseur : plus rapide, même état final. Excès d’un réactif : meilleur rendement.', 'درجة الحرارة والحفاز : أسرع مع نفس الحالة النهائية. وفرة أحد المتفاعلين : مردود أفضل.')].filter(Boolean);
}
const esterP = r => [['a', 'n_A (mol)', 0.1, 2, 0.1, 1], ['b', 'n_B ' + '(mol)', 0.1, 2, 0.1, 1], ['th', 'θ (°C)', 20, 100, 5, 60], ['cat', ['Catalyseur', 'الحفاز'], [['sans', 'بدون'], ['H₂SO₄', 'H₂SO₄']], 0],
['r', ['Réactif A', 'المتفاعل A'], [['acide carboxylique', 'حمض كربوكسيلي'], ['anhydride d’acide', 'أندريد الحمض']], r]];
SIMS.ester = { p: esterP(0), anim: 0, draw: drawEster };
SIMS.ester_ctrl = { p: esterP(1), anim: 0, draw: drawEster };
