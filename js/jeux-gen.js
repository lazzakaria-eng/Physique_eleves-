/* Générateur de questions à valeurs aléatoires pour l’Espace Jeux : chaque partie produit de nouveaux énoncés.
   N(chapitre, énoncé, variables, réponse(v), unité, [réponses fausses typiques])  → question de calcul
   Q(chapitre, énoncé, variables, v => [bonne, fausse1, fausse2, fausse3])        → question à propositions calculées
   L(chapitre, énoncé avec {a}, [[a, réponse], …])                                → question « tableau » (les autres réponses servent de pièges)
   Variables : { nom: [valeurs possibles] } ou { nom: v => valeur calculée à partir des autres }. */
'use strict';
window.QGEN = (() => {
  const T = {}; const add = (ch, t) => (T[ch] = T[ch] || []).push(t);
  const N = (ch, q, vars, f, u, w) => add(ch, { k: 'n', q, vars, f, u: u || '', w: w || [] });
  const Q = (ch, q, vars, f) => add(ch, { k: 'q', q, vars, f });
  const L = (ch, q, pairs) => add(ch, { k: 'l', q, pairs });
  const PI = Math.PI, sq = Math.sqrt, sin = d => Math.sin(d * PI / 180), cos = d => Math.cos(d * PI / 180), lg = Math.log10, LN2 = Math.LN2;
  const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  const nf = x => { // 3 chiffres significatifs, virgule, puissance de 10 si besoin
    if (!isFinite(x)) return '∞'; if (x === 0) return '0';
    const a = Math.abs(x), e = Math.floor(lg(a));
    if (e >= -2 && e <= 4) return String(+x.toPrecision(3)).replace('.', ',').replace('-', '−');
    const m = +(x / 10 ** e).toPrecision(3); return (m === 1 ? '' : m === -1 ? '−' : String(m).replace('.', ',').replace('-', '−') + '×') + '10' + String(e).split('').map(c => SUP[c]).join('');
  };
  const pickv = vars => { const v = {}; Object.entries(vars).forEach(([k, a]) => { if (Array.isArray(a)) v[k] = a[Math.floor(Math.random() * a.length)]; }); Object.entries(vars).forEach(([k, a]) => { if (typeof a === 'function') v[k] = a(v); }); return v; };
  const fill = (q, v) => q.replace(/\{(\w+)\}/g, (_, k) => typeof v[k] === 'number' ? nf(v[k]) : v[k]);
  const shuf = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  function one(t) {
    if (t.k === 'l') { const p = t.pairs[Math.floor(Math.random() * t.pairs.length)], bad = shuf([...new Set(t.pairs.map(x => x[1]).filter(x => x !== p[1]))]).slice(0, 3); return { q: fill(t.q, { a: p[0] }), o: [p[1]].concat(bad), e: p[0] + ' → ' + p[1] }; }
    const v = pickv(t.vars);
    if (t.k === 'q') { const o = t.f(v); return { q: fill(t.q, v), o: [...new Set(o)], e: '' }; }
    const r = t.f(v), unit = t.u ? ' ' + t.u : '', good = nf(r) + unit, seen = new Set([good]), o = [good];
    const cand = t.w.map(g => g(v)).concat([r * 10, r / 10, r * 2, r / 2, r * 100, r / 100, -r, r * 3]);
    for (const c of cand) { if (o.length >= 4) break; if (!isFinite(c)) continue; const s = nf(c) + unit; if (!seen.has(s)) { seen.add(s); o.push(s); } }
    return { q: fill(t.q, v), o, e: 'Réponse : ' + good };
  }
  // n questions différentes pour un chapitre (bonne réponse en première position)
  function gen(ch, n) {
    const L0 = T[ch] || [], out = [], keys = new Set(); if (!L0.length) return out;
    for (let i = 0; out.length < n && i < n * 6; i++) { const t = L0[i % L0.length]; try { const x = one(t); if (x.o.length < 2 || keys.has(x.q)) continue; keys.add(x.q); out.push(x); } catch (e) { /* modèle invalide ignoré */ } }
    return out;
  }

  /* ===================== TRONC COMMUN — PHYSIQUE ===================== */
  N('tc-gravitation', 'Deux corps de masses {m1} kg et {m2} kg sont à {d} m l’un de l’autre. Intensité de la force de gravitation ? (G = 6,67×10⁻¹¹ SI)', { m1: [50, 60, 80, 100, 200], m2: [40, 50, 70, 90], d: [0.5, 1, 2, 3] }, v => 6.67e-11 * v.m1 * v.m2 / v.d ** 2, 'N', [v => 6.67e-11 * v.m1 * v.m2 / v.d, v => 6.67e-11 * (v.m1 + v.m2) / v.d ** 2]);
  N('tc-gravitation', 'Un objet de masse {m} kg est sur la Lune (g = 1,6 N/kg). Son poids ?', { m: [2, 5, 10, 20, 60, 70, 80] }, v => 1.6 * v.m, 'N', [v => v.m, v => 9.8 * v.m]);
  N('tc-gravitation', 'Le poids d’un corps vaut {P} N sur Terre (g = 9,8 N/kg). Sa masse ?', { P: [49, 98, 196, 490, 686] }, v => v.P / 9.8, 'kg', [v => v.P * 9.8, v => v.P / 1.6]);
  N('tc-gravitation', 'Si la distance entre deux astres est multipliée par {k}, la force de gravitation est divisée par :', { k: [2, 3, 4, 5, 10] }, v => v.k ** 2, '', [v => v.k, v => 2 * v.k, v => sq(v.k)]);
  N('tc-actions', 'Une force pressante de {F} N s’exerce sur une surface de {S} cm². Pression ?', { F: [20, 50, 100, 300, 500], S: [10, 25, 50, 100, 200] }, v => v.F / (v.S * 1e-4), 'Pa', [v => v.F / v.S, v => v.F * v.S * 1e-4]);
  N('tc-actions', 'Un gaz à la pression {p} Pa agit sur un piston de surface {S} cm². Force pressante ?', { p: [1e5, 2e5, 1.5e5, 3e5], S: [10, 20, 50, 80] }, v => v.p * v.S * 1e-4, 'N', [v => v.p * v.S, v => v.p / (v.S * 1e-4)]);
  L('tc-actions', 'Classer la force exercée par {a}', [['la Terre sur un livre (poids)', 'à distance, répartie'], ['un fil tendu sur un objet', 'de contact, localisée'], ['l’eau sur un bateau', 'de contact, répartie'], ['un aimant sur un clou', 'à distance, répartie'], ['une pointe sur un ballon', 'de contact, localisée']]);
  N('tc-mouvement', 'Une voiture parcourt {d} km en {t} min. Vitesse moyenne ?', { d: [6, 9, 12, 15, 18, 24, 30], t: [6, 10, 12, 15, 20, 30] }, v => v.d / v.t * 60, 'km/h', [v => v.d / v.t, v => v.d * v.t / 60]);
  N('tc-mouvement', 'Convertir {v} km/h en m/s.', { v: [18, 36, 54, 72, 90, 108, 126, 144] }, v => v.v / 3.6, 'm/s', [v => v.v * 3.6, v => v.v / 36]);
  N('tc-mouvement', 'Un point situé à {R} cm de l’axe tourne à {w} rad/s. Vitesse linéaire ?', { R: [5, 10, 20, 25, 40], w: [2, 4, 5, 10, 20] }, v => v.R / 100 * v.w, 'm/s', [v => v.R * v.w, v => v.R / 100 / v.w]);
  N('tc-mouvement', 'Mouvement rectiligne uniforme : x(t) = {a} t + {b} (SI). Position à t = {t} s ?', { a: [2, 3, 4, 5, -2], b: [1, 2, 5, 10], t: [2, 3, 4, 5] }, v => v.a * v.t + v.b, 'm', [v => v.a * v.t, v => v.a + v.b * v.t]);
  N('tc-mouvement', 'Enregistrement : τ = {tau} ms et M₁M₃ = {d} cm. Vitesse instantanée en M₂ ?', { tau: [20, 40, 50, 60], d: [1.2, 2, 2.4, 4, 6] }, v => v.d / 100 / (2 * v.tau / 1000), 'm/s', [v => v.d / 100 / (v.tau / 1000), v => v.d / (2 * v.tau)]);
  N('tc-mouvement', 'Un disque fait {n} tours par minute. Période de rotation ?', { n: [30, 45, 60, 120, 300, 600] }, v => 60 / v.n, 's', [v => v.n / 60, v => 2 * PI * v.n / 60]);
  N('tc-inertie', 'Deux masses m₁ = {m1} g et m₂ = {m2} g sont distantes de G₁G₂ = {d} cm. Distance G₁G du centre d’inertie ?', { m1: [100, 200, 300, 400], m2: [100, 200, 300, 500], d: [20, 30, 40, 60] }, v => v.m2 / (v.m1 + v.m2) * v.d, 'cm', [v => v.m1 / (v.m1 + v.m2) * v.d, v => v.d / 2]);
  N('tc-inertie', 'Un palet pseudo-isolé parcourt {d} cm en {t} s. Distance parcourue en {t2} s ?', { d: [12, 15, 20, 30], t: [0.5, 1, 2], t2: [3, 4, 5] }, v => v.d / v.t * v.t2, 'cm', [v => v.d * v.t2, v => v.d + v.t2]);
  L('tc-inertie', 'Le solide suivant est-il pseudo-isolé ? {a}', [['palet sur une table à coussin d’air horizontale', 'oui'], ['voiture dans un virage à vitesse constante', 'non'], ['parachutiste qui descend à vitesse constante', 'oui'], ['bille en chute libre', 'non'], ['livre posé sur une table', 'oui'], ['satellite en orbite circulaire', 'non']]);
  N('tc-2forces', 'Un ressort de raideur {k} N/m est allongé de {x} cm. Tension du ressort ?', { k: [20, 40, 50, 100, 200], x: [2, 3, 5, 8, 10] }, v => v.k * v.x / 100, 'N', [v => v.k * v.x, v => v.k / v.x]);
  N('tc-2forces', 'Un corps de masse {m} g est suspendu à un ressort de raideur {k} N/m (g = 10 N/kg). Allongement à l’équilibre ?', { m: [50, 100, 200, 250, 500], k: [10, 20, 25, 50, 100] }, v => v.m / 1000 * 10 / v.k * 100, 'cm', [v => v.m * 10 / v.k, v => v.k / (v.m / 1000 * 10)]);
  N('tc-2forces', 'Un corps de volume {V} cm³ est totalement immergé dans l’eau (ρ = 1000 kg/m³, g = 10 N/kg). Poussée d’Archimède ?', { V: [50, 100, 200, 500, 1000] }, v => 1000 * v.V * 1e-6 * 10, 'N', [v => v.V * 10, v => 1000 * v.V * 1e-6]);
  N('tc-3forces', 'Un solide de poids {P} N est en équilibre sur un plan incliné de {a}° sans frottement, retenu par un fil parallèle au plan. Tension du fil ?', { P: [10, 20, 40, 50, 100], a: [30, 45, 60] }, v => v.P * sin(v.a), 'N', [v => v.P * cos(v.a), v => v.P / sin(v.a)]);
  N('tc-3forces', 'Un solide de poids {P} N est en équilibre sur un plan incliné de {a}° sans frottement, retenu par un fil parallèle au plan. Réaction du plan ?', { P: [10, 20, 40, 50, 100], a: [30, 45, 60] }, v => v.P * cos(v.a), 'N', [v => v.P * sin(v.a), v => v.P]);
  N('tc-3forces', 'Coefficient de frottement k = {k}. Angle de frottement φ ?', { k: [0.2, 0.3, 0.5, 0.58, 1] }, v => Math.atan(v.k) * 180 / PI, '°', [v => Math.asin(v.k) * 180 / PI, v => v.k * 90]);
  N('tc-moment', 'Une force de {F} N agit à {d} cm de l’axe, perpendiculairement au bras. Moment ?', { F: [5, 10, 20, 40, 50], d: [10, 20, 25, 30, 50] }, v => v.F * v.d / 100, 'N·m', [v => v.F * v.d, v => v.F / v.d * 100]);
  N('tc-moment', 'Couple de deux forces de {F} N dont les droites d’action sont distantes de {d} cm. Moment du couple ?', { F: [5, 10, 20, 40], d: [10, 20, 30, 50] }, v => v.F * v.d / 100, 'N·m', [v => v.F * v.d / 200, v => 2 * v.F * v.d / 100]);
  N('tc-moment', 'Une barre est en équilibre : F₁ = {F1} N à {d1} cm de l’axe. Force F₂ nécessaire à {d2} cm de l’autre côté ?', { F1: [10, 20, 30, 40], d1: [10, 20, 30], d2: [5, 10, 40, 60] }, v => v.F1 * v.d1 / v.d2, 'N', [v => v.F1 * v.d2 / v.d1, v => v.F1]);
  N('tc-courant', 'Une quantité d’électricité Q = {Q} C traverse un conducteur en {t} s. Intensité ?', { Q: [2, 6, 12, 30, 60], t: [2, 3, 10, 20, 60] }, v => v.Q / v.t, 'A', [v => v.Q * v.t, v => v.t / v.Q]);
  N('tc-courant', 'Un courant de {I} mA circule pendant {t} min. Quantité d’électricité ?', { I: [50, 100, 200, 500], t: [1, 2, 5, 10] }, v => v.I / 1000 * v.t * 60, 'C', [v => v.I * v.t * 60, v => v.I / 1000 * v.t]);
  N('tc-courant', 'Nombre d’électrons qui transportent Q = {Q} C (e = 1,6×10⁻¹⁹ C) ?', { Q: [1, 2, 3.2, 8, 16] }, v => v.Q / 1.6e-19, '', [v => v.Q * 1.6e-19, v => v.Q / 1.6e-18]);
  N('tc-courant', 'Nœud : I₁ = {a} A et I₂ = {b} A arrivent ; I₃ = {c} A repart. Intensité I₄ qui repart ?', { a: [2, 3, 5], b: [1, 4, 2.5], c: [1, 1.5, 0.5] }, v => v.a + v.b - v.c, 'A', [v => v.a + v.b + v.c, v => v.a - v.b + v.c]);
  N('tc-tension', 'Oscilloscope : déviation de {n} divisions avec une sensibilité de {s} V/div. Tension ?', { n: [2, 2.5, 3, 4, 5], s: [0.5, 1, 2, 5] }, v => v.n * v.s, 'V', [v => v.n / v.s, v => v.s / v.n]);
  N('tc-tension', 'Une période occupe {n} divisions avec un balayage de {b} ms/div. Fréquence ?', { n: [2, 4, 5, 8, 10], b: [0.5, 1, 2, 5] }, v => 1 / (v.n * v.b / 1000), 'Hz', [v => v.n * v.b, v => 1 / (v.n * v.b)]);
  N('tc-tension', 'Additivité : U_AB = {a} V et U_BC = {b} V. Tension U_AC ?', { a: [2, 3.5, 6, 9], b: [1.5, 4, -2, 3] }, v => v.a + v.b, 'V', [v => v.a - v.b, v => v.b - v.a]);
  N('tc-tension', 'Une tension sinusoïdale a une valeur maximale U_max = {u} V. Valeur efficace ?', { u: [10, 14.1, 220, 311, 20] }, v => v.u / sq(2), 'V', [v => v.u * sq(2), v => v.u / 2]);
  N('tc-association', 'R₁ = {a} Ω et R₂ = {b} Ω sont en série. Résistance équivalente ?', { a: [10, 22, 47, 100, 150], b: [10, 33, 68, 100, 220] }, v => v.a + v.b, 'Ω', [v => v.a * v.b / (v.a + v.b), v => v.a * v.b]);
  N('tc-association', 'R₁ = {a} Ω et R₂ = {b} Ω sont en dérivation. Résistance équivalente ?', { a: [10, 20, 30, 60, 100], b: [10, 30, 60, 100, 150] }, v => v.a * v.b / (v.a + v.b), 'Ω', [v => v.a + v.b, v => (v.a + v.b) / 2]);
  N('tc-association', 'Diviseur de tension : U = {U} V, R₁ = {a} Ω et R₂ = {b} Ω en série. Tension aux bornes de R₂ ?', { U: [6, 9, 12, 24], a: [100, 200, 300], b: [100, 200, 600] }, v => v.U * v.b / (v.a + v.b), 'V', [v => v.U * v.a / (v.a + v.b), v => v.U / 2]);
  N('tc-passifs', 'Un conducteur ohmique R = {R} Ω est traversé par I = {I} mA. Tension à ses bornes ?', { R: [10, 47, 100, 220, 470, 1000], I: [10, 20, 50, 100] }, v => v.R * v.I / 1000, 'V', [v => v.R * v.I, v => v.R / v.I * 1000]);
  N('tc-passifs', 'Tension U = {U} V aux bornes d’un conducteur ohmique parcouru par {I} A. Résistance ?', { U: [3, 6, 9, 12], I: [0.1, 0.2, 0.3, 0.5] }, v => v.U / v.I, 'Ω', [v => v.U * v.I, v => v.I / v.U]);
  N('tc-passifs', 'Une DEL (tension de seuil 2 V) est alimentée sous {E} V avec un courant de {I} mA. Résistance de protection ?', { E: [5, 6, 9, 12], I: [10, 15, 20, 25] }, v => (v.E - 2) / (v.I / 1000), 'Ω', [v => v.E / (v.I / 1000), v => (v.E - 2) / v.I]);
  N('tc-actif', 'Pile : E = {E} V, r = {r} Ω, elle débite I = {I} A. Tension à ses bornes ?', { E: [4.5, 6, 9, 12], r: [0.5, 1, 1.5, 2], I: [0.2, 0.5, 1] }, v => v.E - v.r * v.I, 'V', [v => v.E + v.r * v.I, v => v.r * v.I]);
  N('tc-actif', 'Pile : E = {E} V, r = {r} Ω. Intensité de court-circuit ?', { E: [4.5, 6, 9, 12], r: [0.5, 1, 1.5, 2] }, v => v.E / v.r, 'A', [v => v.E * v.r, v => v.r / v.E]);
  N('tc-actif', 'Une pile (E = {E} V, r = {r} Ω) alimente un conducteur ohmique R = {R} Ω. Intensité ?', { E: [4.5, 6, 9, 12], r: [0.5, 1, 2], R: [4, 5, 10, 20] }, v => v.E / (v.R + v.r), 'A', [v => v.E / v.R, v => v.E * (v.R + v.r)]);
  N('tc-transistor', 'Transistor de gain β = {b} avec I_B = {ib} µA. Intensité I_C ?', { b: [50, 100, 150, 200, 300], ib: [10, 20, 50, 100] }, v => v.b * v.ib / 1000, 'mA', [v => v.ib / v.b, v => v.b * v.ib]);
  N('tc-transistor', 'I_C = {ic} mA et I_B = {ib} µA. Intensité I_E ?', { ic: [2, 5, 10, 20], ib: [20, 50, 100] }, v => v.ic + v.ib / 1000, 'mA', [v => v.ic - v.ib / 1000, v => v.ic + v.ib]);
  N('tc-transistor', 'I_C = {ic} mA et I_B = {ib} µA. Gain β du transistor ?', { ic: [2, 5, 10, 20], ib: [20, 50, 100] }, v => v.ic * 1000 / v.ib, '', [v => v.ib / v.ic, v => v.ic / v.ib]);
  N('tc-aop', 'Amplificateur inverseur : R₁ = {a} kΩ, R₂ = {b} kΩ, U_e = {u} V. Tension de sortie U_s ?', { a: [1, 2, 5, 10], b: [10, 20, 47, 100], u: [0.1, 0.2, 0.5] }, v => -v.b / v.a * v.u, 'V', [v => v.b / v.a * v.u, v => (1 + v.b / v.a) * v.u]);
  N('tc-aop', 'Amplificateur non inverseur : R₁ = {a} kΩ, R₂ = {b} kΩ, U_e = {u} V. Tension de sortie U_s ?', { a: [1, 2, 5, 10], b: [10, 20, 47, 100], u: [0.1, 0.2, 0.5] }, v => (1 + v.b / v.a) * v.u, 'V', [v => v.b / v.a * v.u, v => -v.b / v.a * v.u]);
  N('tc-aop', 'Montage suiveur : U_e = {u} V. Tension de sortie U_s ?', { u: [0.5, 1, 2.5, 3, 4] }, v => v.u, 'V', [v => 2 * v.u, v => -v.u, v => v.u / 2]);

  /* ===================== TRONC COMMUN — CHIMIE ===================== */
  N('tcc-especes', 'Un liquide de masse {m} g occupe un volume de {V} mL. Masse volumique ?', { m: [16, 40, 79, 92, 136], V: [20, 50, 100] }, v => v.m / v.V, 'g/mL', [v => v.V / v.m, v => v.m * v.V]);
  N('tcc-especes', 'Masse de {V} mL d’un liquide de masse volumique {r} g/mL ?', { V: [10, 20, 50, 100], r: [0.79, 0.9, 1.26, 0.7] }, v => v.V * v.r, 'g', [v => v.V / v.r, v => v.r / v.V]);
  L('tcc-especes', 'Test d’identification de {a}', [['l’eau', 'sulfate de cuivre anhydre (il bleuit)'], ['le dioxyde de carbone', 'eau de chaux (elle se trouble)'], ['le dioxygène', 'bûchette incandescente (elle se rallume)'], ['le dihydrogène', 'flamme (légère détonation)']]);
  N('tcc-extraction', 'Chromatographie : la tache monte de {h} cm et l’éluant de {H} cm. Rapport frontal ?', { h: [2, 3, 4.5, 6], H: [8, 10, 12] }, v => v.h / v.H, '', [v => v.H / v.h, v => v.H - v.h]);
  L('tcc-extraction', 'Technique adaptée pour {a}', [['séparer deux liquides non miscibles', 'décantation (ampoule à décanter)'], ['séparer un solide d’un liquide', 'filtration'], ['extraire une huile essentielle avec de la vapeur d’eau', 'hydrodistillation'], ['identifier des espèces sur une plaque', 'chromatographie sur couche mince'], ['extraire une espèce avec un solvant', 'extraction par solvant']]);
  N('tcc-synthese', 'On attend {mt} g de produit ; on en obtient {m} g. Rendement ?', { mt: [10, 12, 20, 25, 40], f: [0.5, 0.6, 0.75, 0.8, 0.9], m: v => +(v.mt * v.f).toFixed(1) }, v => v.m / v.mt * 100, '%', [v => v.mt / v.m * 100, v => (v.mt - v.m) / v.mt * 100]);
  L('tcc-synthese', 'Rôle de {a} dans un montage à reflux', [['le réfrigérant', 'condenser les vapeurs'], ['la pierre ponce', 'régulariser l’ébullition'], ['le chauffe-ballon', 'accélérer la réaction'], ['le ballon', 'contenir le mélange réactionnel']]);
  N('tcc-atome', 'Un atome a Z = {Z} et A = {A}. Nombre de neutrons ?', { Z: [6, 8, 11, 13, 17, 26], d: [6, 8, 12, 14, 18, 30], A: v => v.Z + v.d }, v => v.d, '', [v => v.A, v => v.A + v.Z]);
  N('tcc-atome', 'Charge du noyau d’un atome de numéro atomique Z = {Z} ? (e = 1,6×10⁻¹⁹ C)', { Z: [6, 8, 11, 13, 17, 26] }, v => v.Z * 1.6e-19, 'C', [v => -v.Z * 1.6e-19, v => v.Z * 1.6e-18]);
  N('tcc-atome', 'Masse approchée d’un atome de nombre de masse A = {A} ? (m_p ≈ m_n = 1,67×10⁻²⁷ kg)', { A: [12, 16, 23, 27, 35, 56] }, v => v.A * 1.67e-27, 'kg', [v => v.A * 1.67e-24, v => v.A * 9.1e-31]);
  L('tcc-atome', 'Structure électronique de l’atome de numéro atomique Z = {a}', [['3', '(K)²(L)¹'], ['6', '(K)²(L)⁴'], ['8', '(K)²(L)⁶'], ['10', '(K)²(L)⁸'], ['11', '(K)²(L)⁸(M)¹'], ['12', '(K)²(L)⁸(M)²'], ['13', '(K)²(L)⁸(M)³'], ['15', '(K)²(L)⁸(M)⁵'], ['17', '(K)²(L)⁸(M)⁷'], ['18', '(K)²(L)⁸(M)⁸']]);
  L('tcc-molecules', 'Nombre de liaisons covalentes formées par l’atome {a}', [['H', '1'], ['O', '2'], ['N', '3'], ['C', '4'], ['Cl', '1']]);
  L('tcc-molecules', 'Géométrie de la molécule {a}', [['CH₄', 'tétraédrique'], ['NH₃', 'pyramidale'], ['H₂O', 'coudée'], ['CO₂', 'linéaire']]);
  L('tcc-molecules', 'Nombre de doublets non liants de l’atome {a} dans une molécule', [['H', '0'], ['C', '0'], ['N', '1'], ['O', '2'], ['Cl', '3']]);
  L('tcc-classification', 'Famille de l’élément {a}', [['Li', 'alcalins'], ['Na', 'alcalins'], ['K', 'alcalins'], ['F', 'halogènes'], ['Cl', 'halogènes'], ['Br', 'halogènes'], ['He', 'gaz nobles'], ['Ne', 'gaz nobles'], ['Ar', 'gaz nobles'], ['Mg', 'alcalino-terreux'], ['Ca', 'alcalino-terreux']]);
  L('tcc-classification', 'Ion monoatomique formé par l’élément {a}', [['Na', 'Na⁺'], ['Mg', 'Mg²⁺'], ['Al', 'Al³⁺'], ['Cl', 'Cl⁻'], ['O', 'O²⁻'], ['F', 'F⁻'], ['S', 'S²⁻'], ['K', 'K⁺']]);
  L('tcc-classification', 'Place de l’élément de numéro atomique Z = {a} dans le tableau', [['3', '2ᵉ période, colonne I'], ['8', '2ᵉ période, colonne VI'], ['11', '3ᵉ période, colonne I'], ['12', '3ᵉ période, colonne II'], ['13', '3ᵉ période, colonne III'], ['17', '3ᵉ période, colonne VII']]);
  N('tcc-mole', 'Quantité de matière contenue dans {m} g d’eau (M = 18 g/mol) ?', { m: [9, 18, 36, 54, 90, 180] }, v => v.m / 18, 'mol', [v => v.m * 18, v => 18 / v.m]);
  N('tcc-mole', 'Nombre de molécules dans {n} mol (N_A = 6,02×10²³ mol⁻¹) ?', { n: [0.1, 0.5, 2, 3, 0.25] }, v => v.n * 6.02e23, '', [v => v.n / 6.02e23, v => 6.02e23 / v.n]);
  N('tcc-mole', 'Volume occupé par {n} mol de gaz (V_m = 24 L/mol) ?', { n: [0.1, 0.25, 0.5, 2, 3] }, v => v.n * 24, 'L', [v => 24 / v.n, v => v.n / 24]);
  L('tcc-mole', 'Masse molaire de {a}', [['H₂O', '18 g/mol'], ['CO₂', '44 g/mol'], ['NaCl', '58,5 g/mol'], ['CH₄', '16 g/mol'], ['O₂', '32 g/mol'], ['C₂H₆O', '46 g/mol'], ['H₂SO₄', '98 g/mol'], ['NH₃', '17 g/mol']]);
  N('tcc-concentration', 'On dissout {n} mol de soluté dans {V} mL de solution. Concentration molaire ?', { n: [0.01, 0.02, 0.05, 0.1], V: [50, 100, 200, 250, 500] }, v => v.n / (v.V / 1000), 'mol/L', [v => v.n / v.V, v => v.n * v.V / 1000]);
  N('tcc-concentration', 'On dissout {m} g de glucose (M = 180 g/mol) dans {V} mL de solution. Concentration molaire ?', { m: [9, 18, 36, 45], V: [100, 250, 500] }, v => v.m / 180 / (v.V / 1000), 'mol/L', [v => v.m / (v.V / 1000), v => v.m / 180 / v.V]);
  N('tcc-concentration', 'Dilution : C₀ = {C0} mol/L, on prélève {V0} mL et on complète à {V1} mL. Concentration fille ?', { C0: [0.1, 0.2, 0.5, 1], V0: [5, 10, 20, 25], V1: [50, 100, 200, 250] }, v => v.C0 * v.V0 / v.V1, 'mol/L', [v => v.C0 * v.V1 / v.V0, v => v.C0 / v.V0]);
  N('tcc-concentration', 'Facteur de dilution {F} : volume de solution mère pour préparer 100 mL de solution fille ?', { F: [2, 4, 5, 10, 20, 25] }, v => 100 / v.F, 'mL', [v => 100 * v.F, v => v.F]);
  N('tcc-transformation', 'CH₄ + 2O₂ → CO₂ + 2H₂O avec n(CH₄) = {a} mol et n(O₂) = {b} mol. Avancement maximal ?', { a: [0.1, 0.2, 0.3, 0.5], b: [0.1, 0.3, 0.4, 0.6, 1] }, v => Math.min(v.a, v.b / 2), 'mol', [v => Math.max(v.a, v.b / 2), v => Math.min(v.a, v.b)]);
  Q('tcc-transformation', 'N₂ + 3H₂ → 2NH₃ avec n(N₂) = {a} mol et n(H₂) = {b} mol. Réactif limitant ?', { a: [0.1, 0.2, 0.5, 1], b: [0.3, 0.6, 0.9, 1.5, 3] }, v => Math.abs(v.a * 3 - v.b) < 1e-9 ? ['aucun : mélange stœchiométrique', 'N₂', 'H₂'] : v.a * 3 < v.b ? ['N₂', 'H₂', 'aucun : mélange stœchiométrique'] : ['H₂', 'N₂', 'aucun : mélange stœchiométrique']);
  N('tcc-transformation', '2Al + 6H⁺ → 2Al³⁺ + 3H₂ : l’aluminium ({a} mol) est le réactif limitant. Quantité de H₂ formée ?', { a: [0.02, 0.04, 0.1, 0.2] }, v => 1.5 * v.a, 'mol', [v => v.a, v => 3 * v.a]);

  /* ===================== 1re BAC — PHYSIQUE ===================== */
  N('1b-rotation', 'Convertir {n} tr/min en rad/s.', { n: [30, 60, 120, 300, 600, 1500, 3000] }, v => 2 * PI * v.n / 60, 'rad/s', [v => 2 * PI * v.n, v => v.n / 60]);
  N('1b-rotation', 'Rotation uniforme à ω = {w} rad/s (θ₀ = 0). Abscisse angulaire au bout de {t} s ?', { w: [2, 5, 10, 20], t: [2, 3, 5, 10] }, v => v.w * v.t, 'rad', [v => v.w / v.t, v => v.w * v.t / (2 * PI)]);
  N('1b-rotation', 'Une roue de rayon {R} cm fait {n} tours. Distance parcourue par un point de la jante ?', { R: [10, 20, 30, 35], n: [5, 10, 20, 50] }, v => 2 * PI * v.R / 100 * v.n, 'm', [v => PI * v.R / 100 * v.n, v => 2 * PI * v.R * v.n]);
  N('1b-travail', 'Une force de {F} N déplace son point d’application de {d} m ; l’angle entre la force et le déplacement vaut {a}°. Travail ?', { F: [10, 20, 50, 100], d: [2, 5, 10], a: [0, 30, 60, 120, 180] }, v => v.F * v.d * cos(v.a), 'J', [v => v.F * v.d, v => v.F * v.d * sin(v.a)]);
  N('1b-travail', 'Travail du poids d’un corps de {m} kg qui descend de {h} m (g = 10 N/kg) ?', { m: [0.5, 1, 2, 5, 10], h: [1, 2, 5, 10] }, v => v.m * 10 * v.h, 'J', [v => -v.m * 10 * v.h, v => v.m * v.h]);
  N('1b-travail', 'Un moteur fournit un travail de {W} kJ en {t} s. Puissance moyenne ?', { W: [6, 12, 30, 60, 120], t: [10, 20, 30, 60] }, v => v.W * 1000 / v.t, 'W', [v => v.W / v.t, v => v.W * 1000 * v.t]);
  N('1b-travail', 'Une force motrice de {F} N déplace un objet à la vitesse constante de {v} m/s. Puissance ?', { F: [10, 50, 100, 500], v: [0.5, 2, 4, 10] }, v => v.F * v.v, 'W', [v => v.F / v.v, v => v.F * v.v / 2]);
  N('1b-ec', 'Énergie cinétique d’un corps de {m} kg à {v} m/s ?', { m: [0.5, 1, 2, 10], v: [2, 3, 5, 10, 20] }, v => 0.5 * v.m * v.v ** 2, 'J', [v => v.m * v.v ** 2, v => 0.5 * v.m * v.v]);
  N('1b-ec', 'Une voiture de {m} kg roule à {v} km/h. Énergie cinétique ?', { m: [800, 1000, 1200, 1500], v: [36, 54, 72, 90] }, v => 0.5 * v.m * (v.v / 3.6) ** 2, 'J', [v => 0.5 * v.m * v.v ** 2, v => v.m * (v.v / 3.6) ** 2]);
  N('1b-ec', 'Si la vitesse est multipliée par {k}, l’énergie cinétique est multipliée par :', { k: [2, 3, 4, 5, 10] }, v => v.k ** 2, '', [v => v.k, v => 2 * v.k, v => sq(v.k)]);
  N('1b-ec', 'Un disque de moment d’inertie J = {J} kg·m² tourne à {w} rad/s. Énergie cinétique ?', { J: [0.01, 0.02, 0.05, 0.1, 2], w: [10, 20, 50, 100] }, v => 0.5 * v.J * v.w ** 2, 'J', [v => v.J * v.w ** 2, v => 0.5 * v.J * v.w]);
  N('1b-ec', 'Chute libre de {h} m sans vitesse initiale (g = 10 N/kg). Vitesse à l’arrivée (T.E.C) ?', { h: [0.8, 1.25, 5, 20, 45] }, v => sq(20 * v.h), 'm/s', [v => 20 * v.h, v => sq(10 * v.h)]);
  N('1b-epp', 'Énergie potentielle de pesanteur d’un corps de {m} kg à la cote z = {z} m (référence z = 0, g = 10 N/kg) ?', { m: [0.2, 0.5, 1, 2, 5], z: [1, 2, 3, 5, 10, -2] }, v => v.m * 10 * v.z, 'J', [v => v.m * v.z, v => -v.m * 10 * v.z]);
  N('1b-epp', 'Énergie mécanique : m = {m} kg, v = {v} m/s à z = {z} m (référence au sol, g = 10 N/kg) ?', { m: [0.5, 1, 2], v: [2, 4, 6], z: [1, 2, 5] }, v => 0.5 * v.m * v.v ** 2 + 10 * v.m * v.z, 'J', [v => 0.5 * v.m * v.v ** 2, v => 10 * v.m * v.z]);
  N('1b-epp', 'Sans frottement, un pendule descend de {h} cm jusqu’à sa position la plus basse. Vitesse en bas ? (g = 10 N/kg)', { h: [5, 20, 45, 80] }, v => sq(2 * 10 * v.h / 100), 'm/s', [v => sq(20 * v.h), v => 2 * 10 * v.h / 100]);
  N('1b-interne', 'Un gaz reçoit un travail W = {W} J et une chaleur Q = {Q} J. Variation de son énergie interne ?', { W: [100, 200, 500, -100], Q: [50, -200, 300, 400] }, v => v.W + v.Q, 'J', [v => v.W - v.Q, v => v.Q - v.W]);
  N('1b-interne', 'Compression d’un gaz à pression constante p = {p}×10⁵ Pa ; son volume diminue de {dV} L. Travail reçu ?', { p: [1, 2, 3], dV: [1, 2, 5] }, v => v.p * 1e5 * v.dV * 1e-3, 'J', [v => -v.p * 1e5 * v.dV * 1e-3, v => v.p * v.dV]);
  N('1b-thermique', 'Énergie pour chauffer {m} g d’eau de {d} °C (c = 4180 J·kg⁻¹·°C⁻¹) ?', { m: [100, 200, 500, 1000], d: [10, 20, 50, 80] }, v => v.m / 1000 * 4180 * v.d, 'J', [v => v.m * 4180 * v.d, v => v.m / 1000 * 4180]);
  N('1b-thermique', 'Énergie pour faire fondre {m} g de glace à 0 °C (L_f = 334 kJ/kg) ?', { m: [10, 50, 100, 200, 500] }, v => v.m / 1000 * 334e3, 'J', [v => v.m * 334e3, v => v.m * 334]);
  N('1b-thermique', 'On mélange {m1} g d’eau à {t1} °C et {m2} g d’eau à {t2} °C (sans pertes). Température finale ?', { m1: [100, 200, 300], t1: [10, 15, 20], m2: [100, 200, 300], t2: [50, 60, 80] }, v => (v.m1 * v.t1 + v.m2 * v.t2) / (v.m1 + v.m2), '°C', [v => (v.t1 + v.t2) / 2, v => (v.m1 * v.t2 + v.m2 * v.t1) / (v.m1 + v.m2)]);
  N('1b-champe', 'Une charge q = {q} µC est placée dans un champ E = {E} V/m. Force électrique ?', { q: [1, 2, 5, 10], E: [100, 500, 1000, 2000, 5000] }, v => v.q * 1e-6 * v.E, 'N', [v => v.q * v.E, v => v.q * 1e-6 / v.E]);
  N('1b-champe', 'Deux plaques distantes de {d} cm sont soumises à U = {U} V. Champ électrique entre elles ?', { d: [1, 2, 4, 5, 10], U: [50, 100, 200, 500, 1000] }, v => v.U / (v.d / 100), 'V/m', [v => v.U * v.d / 100, v => v.U / v.d]);
  N('1b-champe', 'Loi de Coulomb : deux charges q = {q} µC sont à {d} cm l’une de l’autre (k = 9×10⁹ SI). Force ?', { q: [1, 2, 5], d: [3, 5, 10, 30] }, v => 9e9 * (v.q * 1e-6) ** 2 / (v.d / 100) ** 2, 'N', [v => 9e9 * (v.q * 1e-6) ** 2 / (v.d / 100), v => 9e9 * v.q ** 2 / v.d ** 2]);
  N('1b-epe', 'Travail de la force électrique sur q = {q} µC entre A et B, avec U_AB = {U} V ?', { q: [1, 2, -1, 5], U: [100, 200, 500, 1000] }, v => v.q * 1e-6 * v.U, 'J', [v => -v.q * 1e-6 * v.U, v => v.q * v.U]);
  N('1b-epe', 'Un électron est accéléré sous une tension de {U} V. Énergie cinétique gagnée (en eV) ?', { U: [100, 500, 1000, 2000, 10000] }, v => v.U, 'eV', [v => v.U * 1.6e-19, v => 2 * v.U, v => v.U / 2]);
  N('1b-epe', 'Convertir {E} eV en joules.', { E: [1, 5, 10, 100, 1000] }, v => v.E * 1.6e-19, 'J', [v => v.E / 1.6e-19, v => v.E * 1.6e-18]);
  N('1b-transfert', 'Un récepteur sous U = {U} V est parcouru par I = {I} A. Puissance électrique reçue ?', { U: [6, 12, 24, 230], I: [0.5, 1, 2, 5] }, v => v.U * v.I, 'W', [v => v.U / v.I, v => v.I / v.U]);
  N('1b-transfert', 'Effet Joule : R = {R} Ω parcouru par I = {I} A. Puissance dissipée ?', { R: [5, 10, 20, 50], I: [0.5, 1, 2, 3] }, v => v.R * v.I ** 2, 'W', [v => v.R * v.I, v => v.R ** 2 * v.I]);
  N('1b-transfert', 'Énergie consommée par un appareil de {P} W fonctionnant {t} h ?', { P: [60, 100, 500, 1000, 2000], t: [0.5, 1, 2, 3, 5] }, v => v.P * v.t / 1000, 'kWh', [v => v.P * v.t, v => v.P * v.t * 3600]);
  N('1b-transfert', 'Moteur alimenté sous U = {U} V, de force contre-électromotrice E’ = {E} V. Rendement E’/U ?', { U: [12, 24, 48], f: [0.6, 0.75, 0.8, 0.9], E: v => v.U * v.f }, v => v.f * 100, '%', [v => (1 - v.f) * 100, v => 100 / v.f]);
  N('1b-global', 'Loi de Pouillet : générateur (E = {E} V, r = {r} Ω), moteur (E’ = {E2} V, r’ = {r2} Ω) en série. Intensité ?', { E: [12, 24], r: [1, 2], E2: [4, 6, 8], r2: [1, 2] }, v => (v.E - v.E2) / (v.r + v.r2), 'A', [v => (v.E + v.E2) / (v.r + v.r2), v => v.E / (v.r + v.r2)]);
  N('1b-global', 'Pile : E = {E} V, r = {r} Ω. Puissance maximale transférable à un conducteur ohmique ?', { E: [4.5, 6, 9, 12], r: [1, 1.5, 2, 3] }, v => v.E ** 2 / (4 * v.r), 'W', [v => v.E ** 2 / v.r, v => v.E ** 2 / (2 * v.r)]);
  N('1b-global', 'Générateur E = {E} V, r = {r} Ω débitant I = {I} A. Rendement du générateur ?', { E: [6, 9, 12], r: [0.5, 1, 2], I: [0.5, 1, 2] }, v => (v.E - v.r * v.I) / v.E * 100, '%', [v => v.r * v.I / v.E * 100, v => v.E / (v.E - v.r * v.I) * 100]);
  N('1b-champb', 'Deux champs perpendiculaires B₁ = {a} mT et B₂ = {b} mT se superposent. Intensité du champ résultant ?', { a: [3, 6, 5, 8], b: [4, 8, 12, 6] }, v => sq(v.a ** 2 + v.b ** 2), 'mT', [v => v.a + v.b, v => Math.abs(v.a - v.b)]);
  L('1b-champb', 'Instrument pour mesurer ou repérer {a}', [['l’intensité d’un champ magnétique', 'teslamètre'], ['la direction d’un champ magnétique', 'aiguille aimantée (boussole)'], ['une intensité électrique', 'ampèremètre'], ['une tension électrique', 'voltmètre']]);
  N('1b-champb-courant', 'Solénoïde : N = {N} spires, longueur {L} cm, I = {I} A. Champ magnétique à l’intérieur ? (μ₀ = 4π×10⁻⁷ SI)', { N: [100, 200, 500, 1000], L: [20, 25, 40, 50], I: [0.5, 1, 2] }, v => 4 * PI * 1e-7 * v.N / (v.L / 100) * v.I, 'T', [v => 4 * PI * 1e-7 * v.N * v.I, v => 4 * PI * 1e-7 * v.N / v.L * v.I]);
  N('1b-champb-courant', 'Si on multiplie par {k} l’intensité du courant dans un solénoïde, le champ intérieur est multiplié par :', { k: [2, 3, 4, 5] }, v => v.k, '', [v => v.k ** 2, v => 1 / v.k, v => sq(v.k)]);
  N('1b-laplace', 'Force de Laplace : I = {I} A, longueur {L} cm dans B = {B} mT, conducteur perpendiculaire au champ ?', { I: [1, 2, 5, 10], L: [5, 10, 20], B: [20, 50, 100, 200] }, v => v.I * v.L / 100 * v.B / 1000, 'N', [v => v.I * v.L * v.B, v => v.I * v.L / 100 * v.B]);
  N('1b-laplace', 'Force de Laplace : I = {I} A, ℓ = {L} cm, B = {B} mT, angle {a}° entre le conducteur et le champ ?', { I: [2, 5, 10], L: [10, 20], B: [50, 100], a: [30, 60, 90] }, v => v.I * v.L / 100 * v.B / 1000 * sin(v.a), 'N', [v => v.I * v.L / 100 * v.B / 1000 * cos(v.a), v => v.I * v.L / 100 * v.B / 1000]);
  N('1b-visibilite', 'Durée mise par la lumière pour parcourir {d} km (c = 3×10⁸ m/s) ?', { d: [300, 3000, 384000, 1.5e8] }, v => v.d * 1000 / 3e8, 's', [v => v.d / 3e8, v => 3e8 / (v.d * 1000)]);
  N('1b-visibilite', 'Ombre : un objet de {h} cm est à {d1} cm d’une source ponctuelle ; l’écran est à {d2} cm de la source. Taille de l’ombre ?', { h: [2, 4, 5], d1: [10, 20, 25], d2: [40, 50, 100] }, v => v.h * v.d2 / v.d1, 'cm', [v => v.h * v.d1 / v.d2, v => v.h * (v.d2 - v.d1) / v.d1]);
  N('1b-miroir', 'Un objet est à {d} cm d’un miroir plan. Distance entre l’objet et son image ?', { d: [10, 25, 40, 75, 100] }, v => 2 * v.d, 'cm', [v => v.d, v => v.d / 2]);
  N('1b-miroir', 'Angle d’incidence {i}°. Angle entre le rayon incident et le rayon réfléchi ?', { i: [10, 20, 30, 35, 40] }, v => 2 * v.i, '°', [v => v.i, v => 90 - v.i, v => 180 - 2 * v.i]);
  N('1b-miroir', 'Hauteur minimale d’un miroir plan vertical pour qu’une personne de {h} cm se voie en entier ?', { h: [150, 160, 170, 180] }, v => v.h / 2, 'cm', [v => v.h, v => v.h / 4]);
  N('1b-lentille', 'Lentille convergente de distance focale f’ = {f} cm. Vergence ?', { f: [5, 10, 20, 25, 50] }, v => 100 / v.f, 'δ', [v => v.f / 100, v => v.f]);
  N('1b-lentille', 'Objet à {a} cm devant une lentille de distance focale {f} cm. Position de l’image OA’ ?', { a: [30, 40, 60], f: [10, 20] }, v => v.a * v.f / (v.a - v.f), 'cm', [v => v.a * v.f / (v.a + v.f), v => v.a - v.f]);
  N('1b-lentille', 'OA = −{a} cm et OA’ = {b} cm. Grandissement γ ?', { a: [20, 30, 40, 60], b: [15, 20, 30, 60] }, v => -v.b / v.a, '', [v => v.b / v.a, v => v.a / v.b]);
  N('1b-instruments', 'Loupe de vergence {C} δ. Distance focale ?', { C: [5, 8, 10, 20, 25] }, v => 100 / v.C, 'cm', [v => v.C / 100, v => v.C]);
  N('1b-instruments', 'Grossissement commercial d’une loupe de distance focale {f} cm (G = 25 cm / f’) ?', { f: [2.5, 5, 10] }, v => 25 / v.f, '', [v => v.f / 25, v => 25 * v.f]);
  N('1b-instruments', 'Microscope : objectif ×{a} et oculaire ×{b}. Grossissement commercial ?', { a: [10, 20, 40, 100], b: [5, 10, 15] }, v => v.a * v.b, '', [v => v.a + v.b, v => v.a / v.b]);

  /* ===================== 1re BAC — CHIMIE ===================== */
  N('1bc-grandeurs', 'Gaz parfait : n = {n} mol à T = {T} K sous p = 10⁵ Pa. Volume ? (R = 8,31 SI)', { n: [0.5, 1, 2], T: [273, 293, 300] }, v => v.n * 8.31 * v.T / 1e5, 'm³', [v => v.n * 8.31 * v.T, v => v.n * 8.31 / (v.T * 1e5)]);
  N('1bc-grandeurs', 'Quantité de matière dans {V} mL d’éthanol (ρ = 0,79 g/mL ; M = 46 g/mol) ?', { V: [10, 23, 46, 92] }, v => 0.79 * v.V / 46, 'mol', [v => v.V / 46, v => 0.79 * v.V]);
  N('1bc-grandeurs', 'Convertir {t} °C en kelvins.', { t: [0, 20, 25, 37, 100, -20] }, v => v.t + 273, 'K', [v => v.t - 273, v => 273 - v.t]);
  N('1bc-electrolytes', 'Solution de chlorure de calcium CaCl₂ à C = {C} mol/L. Concentration effective [Cl⁻] ?', { C: [0.01, 0.02, 0.05, 0.1] }, v => 2 * v.C, 'mol/L', [v => v.C, v => v.C / 2]);
  N('1bc-electrolytes', 'Solution de sulfate d’aluminium Al₂(SO₄)₃ à C = {C} mol/L. Concentration [SO₄²⁻] ?', { C: [0.01, 0.02, 0.05, 0.1] }, v => 3 * v.C, 'mol/L', [v => 2 * v.C, v => v.C]);
  N('1bc-electrolytes', 'Masse de NaCl (M = 58,5 g/mol) pour préparer {V} mL de solution à {C} mol/L ?', { V: [100, 250, 500, 1000], C: [0.1, 0.2, 0.5] }, v => 58.5 * v.C * v.V / 1000, 'g', [v => 58.5 * v.C * v.V, v => v.C * v.V / 1000]);
  N('1bc-suivi', 'A + 2B → C : n(A) = {a} mol et n(B) = {b} mol. Quantité de C à l’état final ?', { a: [0.1, 0.2, 0.3], b: [0.1, 0.3, 0.4, 0.8] }, v => Math.min(v.a, v.b / 2), 'mol', [v => Math.min(v.a, v.b), v => Math.max(v.a, v.b / 2)]);
  N('1bc-suivi', 'N₂ + 3H₂ → 2NH₃ : n(N₂) = {a} mol, n(H₂) = {b} mol. Quantité de NH₃ à l’état final ?', { a: [0.1, 0.2, 0.5], b: [0.3, 0.6, 0.9, 1.2] }, v => 2 * Math.min(v.a, v.b / 3), 'mol', [v => Math.min(v.a, v.b / 3), v => 2 * Math.min(v.a, v.b)]);
  N('1bc-conductimetrie', 'Cellule conductimétrique : U = {U} V, I = {I} mA. Conductance ?', { U: [1, 2, 5], I: [1, 2, 5, 10] }, v => v.I / 1000 / v.U, 'S', [v => v.U / (v.I / 1000), v => v.I * v.U]);
  N('1bc-conductimetrie', 'Conductance G = {G} mS, constante de cellule k = {k} m. Conductivité σ = G/k ?', { G: [1, 2, 5, 10], k: [0.01, 0.02] }, v => v.G / 1000 / v.k, 'S/m', [v => v.G / 1000 * v.k, v => v.G * v.k]);
  N('1bc-conductimetrie', 'Courbe d’étalonnage G = a·C avec a = {a} mS·L/mol. On mesure G = {G} mS. Concentration ?', { a: [100, 200, 250], G: [1, 2, 5, 10] }, v => v.G / v.a, 'mol/L', [v => v.G * v.a, v => v.a / v.G]);
  L('1bc-acidobase', 'Base conjuguée de {a}', [['HCl', 'Cl⁻'], ['CH₃COOH', 'CH₃COO⁻'], ['NH₄⁺', 'NH₃'], ['H₃O⁺', 'H₂O'], ['H₂O', 'HO⁻'], ['HCOOH', 'HCOO⁻'], ['H₂CO₃', 'HCO₃⁻']]);
  L('1bc-acidobase', 'Acide conjugué de {a}', [['NH₃', 'NH₄⁺'], ['HO⁻', 'H₂O'], ['H₂O', 'H₃O⁺'], ['CH₃COO⁻', 'CH₃COOH'], ['CO₃²⁻', 'HCO₃⁻']]);
  N('1bc-acidobase', 'Une solution a un pH = {p}. Concentration [H₃O⁺] ?', { p: [1, 2, 3, 4, 5, 9, 11] }, v => 10 ** -v.p, 'mol/L', [v => 10 ** v.p, v => v.p / 10]);
  L('1bc-redox', 'Réducteur du couple {a}', [['Cu²⁺/Cu', 'Cu'], ['Fe³⁺/Fe²⁺', 'Fe²⁺'], ['I₂/I⁻', 'I⁻'], ['Zn²⁺/Zn', 'Zn'], ['MnO₄⁻/Mn²⁺', 'Mn²⁺'], ['Ag⁺/Ag', 'Ag'], ['H⁺/H₂', 'H₂']]);
  L('1bc-redox', 'Oxydant du couple {a}', [['Cu²⁺/Cu', 'Cu²⁺'], ['Fe³⁺/Fe²⁺', 'Fe³⁺'], ['I₂/I⁻', 'I₂'], ['Zn²⁺/Zn', 'Zn²⁺'], ['MnO₄⁻/Mn²⁺', 'MnO₄⁻'], ['Ag⁺/Ag', 'Ag⁺']]);
  L('1bc-redox', 'Nombre d’électrons échangés dans la demi-équation du couple {a}', [['Cu²⁺/Cu', '2'], ['Fe³⁺/Fe²⁺', '1'], ['MnO₄⁻/Mn²⁺', '5'], ['Cr₂O₇²⁻/Cr³⁺', '6'], ['Al³⁺/Al', '3']]);
  N('1bc-dosages', 'Dosage de {VA} mL d’acide chlorhydrique par la soude à C_B = {CB} mol/L ; V_E = {VE} mL. Concentration C_A ?', { VA: [10, 20, 25], CB: [0.01, 0.05, 0.1], VE: [8, 10, 12.5, 15, 20] }, v => v.CB * v.VE / v.VA, 'mol/L', [v => v.CB * v.VA / v.VE, v => v.CB * v.VE]);
  N('1bc-dosages', 'Dosage des ions Fe²⁺ par MnO₄⁻ (MnO₄⁻ + 5Fe²⁺ + 8H⁺ → …) : n(MnO₄⁻) versé à l’équivalence = {n} mmol. n(Fe²⁺) initiale ?', { n: [0.1, 0.2, 0.5, 1] }, v => 5 * v.n, 'mmol', [v => v.n, v => v.n / 5]);
  L('1bc-squelettes', 'Formule brute de {a}', [['méthane', 'CH₄'], ['éthane', 'C₂H₆'], ['propane', 'C₃H₈'], ['butane', 'C₄H₁₀'], ['pentane', 'C₅H₁₂'], ['hexane', 'C₆H₁₄'], ['éthène', 'C₂H₄'], ['propène', 'C₃H₆']]);
  N('1bc-squelettes', 'Un alcane possède {n} atomes de carbone. Nombre d’atomes d’hydrogène ?', { n: [1, 2, 3, 4, 5, 6, 7, 8, 10] }, v => 2 * v.n + 2, '', [v => 2 * v.n, v => 2 * v.n - 2]);
  N('1bc-squelettes', 'Masse molaire d’un alcane CₙH₂ₙ₊₂ avec n = {n} (C = 12 ; H = 1) ?', { n: [2, 3, 4, 5, 6, 8] }, v => 14 * v.n + 2, 'g/mol', [v => 14 * v.n, v => 12 * v.n]);
  L('1bc-groupes', 'Famille du composé {a}', [['CH₃–CH₂–OH', 'alcool'], ['CH₃–CHO', 'aldéhyde'], ['CH₃–CO–CH₃', 'cétone'], ['CH₃–COOH', 'acide carboxylique'], ['CH₃–COO–CH₃', 'ester'], ['CH₃–NH₂', 'amine']]);
  L('1bc-groupes', 'Nom du composé {a}', [['CH₃OH', 'méthanol'], ['C₂H₅OH', 'éthanol'], ['HCHO', 'méthanal'], ['CH₃CHO', 'éthanal'], ['CH₃COCH₃', 'propanone'], ['HCOOH', 'acide méthanoïque'], ['CH₃COOH', 'acide éthanoïque']]);
  L('1bc-groupes', 'Classe de l’alcool {a}', [['propan-1-ol', 'primaire'], ['propan-2-ol', 'secondaire'], ['2-méthylpropan-2-ol', 'tertiaire'], ['éthanol', 'primaire'], ['butan-2-ol', 'secondaire']]);
  L('1bc-groupes', 'Oxydation ménagée (oxydant en défaut) d’un alcool {a}', [['primaire', 'aldéhyde'], ['secondaire', 'cétone'], ['tertiaire', 'pas de réaction']]);

  /* ===================== 2e BAC — PHYSIQUE ===================== */
  N('2b-ondes', 'Une onde se propage à {v} m/s. Retard entre deux points distants de {d} m ?', { v: [2, 5, 10, 340, 1500], d: [1, 2, 3.4, 10] }, v => v.d / v.v, 's', [v => v.d * v.v, v => v.v / v.d]);
  N('2b-ondes', 'Deux micros distants de {d} cm reçoivent un son avec un retard de {t} ms. Célérité ?', { d: [34, 68, 102, 170], t: [1, 2, 3, 5] }, v => v.d / 100 / (v.t / 1000), 'm/s', [v => v.d / v.t, v => v.d * v.t]);
  N('2b-ondes-per', 'Onde de fréquence {f} Hz se propageant à {v} m/s. Longueur d’onde ?', { f: [50, 100, 200, 440, 1000], v: [2, 10, 340, 1500] }, v => v.v / v.f, 'm', [v => v.v * v.f, v => v.f / v.v]);
  N('2b-ondes-per', 'λ = {l} cm et T = {T} ms. Célérité de l’onde ?', { l: [2, 5, 10, 68], T: [1, 2, 5, 20] }, v => v.l / 100 / (v.T / 1000), 'm/s', [v => v.l * v.T, v => v.l / v.T]);
  L('2b-ondes-per', 'Deux points d’une onde sinusoïdale distants de {a} vibrent :', [['λ', 'en phase'], ['λ/2', 'en opposition de phase'], ['2λ', 'en phase'], ['3λ/2', 'en opposition de phase']]);
  N('2b-lumiere', 'Fente de largeur a = {a} µm éclairée par λ = {l} nm. Écart angulaire θ = λ/a ?', { a: [50, 100, 200], l: [400, 500, 600, 633] }, v => v.l * 1e-9 / (v.a * 1e-6), 'rad', [v => v.a / v.l, v => v.l / v.a]);
  N('2b-lumiere', 'Indice de réfraction n = {n}. Vitesse de la lumière dans ce milieu ?', { n: [1.33, 1.5, 1.6, 2.42] }, v => 3e8 / v.n, 'm/s', [v => 3e8 * v.n, v => 3e8]);
  N('2b-lumiere', 'Radiation de fréquence {f}×10¹⁴ Hz. Longueur d’onde dans le vide ?', { f: [4, 5, 6, 7.5] }, v => 3e8 / (v.f * 1e14), 'm', [v => v.f * 1e14 / 3e8, v => 3e8 * v.f]);
  N('2b-lumiere', 'Largeur de la tache centrale L = 2λD/a : λ = {l} nm, D = {D} m, a = {a} µm ?', { l: [500, 600, 633], D: [1, 2, 3], a: [50, 100, 200] }, v => 2 * v.l * 1e-9 * v.D / (v.a * 1e-6), 'm', [v => v.l * 1e-9 * v.D / (v.a * 1e-6), v => 2 * v.l * v.D / v.a]);
  N('2b-radioactivite', 'Fraction de noyaux restants au bout de {n} demi-vies ?', { n: [1, 2, 3, 4, 5] }, v => 1 / 2 ** v.n, '', [v => 1 / (2 * v.n), v => 1 - 1 / 2 ** v.n]);
  N('2b-radioactivite', 'N₀ = {N} noyaux. Nombre restant au bout de {n} demi-vies ?', { N: [1000, 8000, 1e6, 6.4e4], n: [1, 2, 3, 4] }, v => v.N / 2 ** v.n, '', [v => v.N / (2 * v.n), v => v.N - v.N / 2 ** v.n]);
  N('2b-radioactivite', 'Demi-vie t₁/₂ = {t} s. Constante radioactive λ ?', { t: [10, 30, 100, 1000] }, v => LN2 / v.t, 's⁻¹', [v => v.t / LN2, v => 1 / v.t]);
  N('2b-radioactivite', 'Activité initiale {A} Bq. Activité au bout de {n} demi-vies ?', { A: [800, 1600, 6400, 1e4], n: [1, 2, 3] }, v => v.A / 2 ** v.n, 'Bq', [v => v.A / (2 * v.n), v => v.A * 2 ** v.n]);
  L('2b-radioactivite', 'Effet de la désintégration {a} sur le noyau', [['α', 'Z diminue de 2, A diminue de 4'], ['β⁻', 'Z augmente de 1, A inchangé'], ['β⁺', 'Z diminue de 1, A inchangé'], ['γ (désexcitation)', 'Z et A inchangés']]);
  N('2b-noyaux', 'Défaut de masse Δm = {d} u. Énergie de liaison ? (1 u ≈ 931,5 MeV/c²)', { d: [0.0304, 0.1, 0.5, 1.5] }, v => v.d * 931.5, 'MeV', [v => v.d / 931.5, v => v.d * 931.5e6]);
  N('2b-noyaux', 'Énergie de liaison {E} MeV pour un noyau de {A} nucléons. Énergie de liaison par nucléon ?', { k: [0, 1, 2, 3], E: v => [28.3, 92.2, 492, 1784][v.k], A: v => [4, 12, 56, 238][v.k] }, v => v.E / v.A, 'MeV/nucléon', [v => v.E * v.A, v => v.A / v.E]);
  N('2b-noyaux', 'Une réaction nucléaire fait perdre Δm = {d}×10⁻²⁸ kg. Énergie libérée ? (c = 3×10⁸ m/s)', { d: [1, 2, 3.5, 5] }, v => v.d * 1e-28 * 9e16, 'J', [v => v.d * 1e-28 * 3e8, v => v.d * 9e16]);
  N('2b-rc', 'Constante de temps τ = RC avec R = {R} kΩ et C = {C} µF ?', { R: [1, 2, 4.7, 10, 100], C: [1, 10, 47, 100] }, v => v.R * 1e3 * v.C * 1e-6, 's', [v => v.R * v.C, v => v.R / v.C]);
  N('2b-rc', 'Énergie stockée dans un condensateur C = {C} µF chargé sous {U} V ?', { C: [1, 10, 100, 470, 1000], U: [5, 6, 12, 20] }, v => 0.5 * v.C * 1e-6 * v.U ** 2, 'J', [v => v.C * 1e-6 * v.U ** 2, v => 0.5 * v.C * 1e-6 * v.U]);
  N('2b-rc', 'Charge d’un condensateur C = {C} µF sous U = {U} V ?', { C: [1, 10, 47, 100, 470], U: [5, 6, 12] }, v => v.C * 1e-6 * v.U, 'C', [v => v.C * v.U, v => v.C * 1e-6 / v.U]);
  N('2b-rc', 'Charge d’un condensateur sous E = {E} V : tension u_C à t = τ ?', { E: [5, 6, 10, 12] }, v => 0.63 * v.E, 'V', [v => 0.37 * v.E, v => v.E, v => v.E / 2]);
  N('2b-rl', 'Constante de temps τ = L/R avec L = {L} mH et R = {R} Ω ?', { L: [10, 50, 100, 200, 500], R: [10, 20, 50, 100] }, v => v.L / 1000 / v.R, 's', [v => v.R / (v.L / 1000), v => v.L * v.R]);
  N('2b-rl', 'Énergie magnétique d’une bobine L = {L} mH parcourue par i = {i} A ?', { L: [10, 50, 100, 500], i: [0.1, 0.2, 0.5, 1] }, v => 0.5 * v.L * 1e-3 * v.i ** 2, 'J', [v => v.L * 1e-3 * v.i ** 2, v => 0.5 * v.L * v.i ** 2]);
  N('2b-rl', 'Tension aux bornes d’une bobine idéale u = L·di/dt avec L = {L} mH et di/dt = {k} A/s ?', { L: [10, 50, 100, 200], k: [10, 50, 100, 500] }, v => v.L * 1e-3 * v.k, 'V', [v => v.L * v.k, v => v.L * 1e-3 / v.k]);
  N('2b-rlc', 'Période propre T₀ = 2π√(LC) avec L = {L} mH et C = {C} µF ?', { L: [10, 40, 100, 400], C: [1, 10, 25, 100] }, v => 2 * PI * sq(v.L * 1e-3 * v.C * 1e-6), 's', [v => 2 * PI * v.L * 1e-3 * v.C * 1e-6, v => sq(v.L * 1e-3 * v.C * 1e-6)]);
  N('2b-rlc', 'Énergie totale d’un circuit LC : C = {C} µF et U_max = {U} V ?', { C: [1, 10, 100], U: [5, 10, 12, 20] }, v => 0.5 * v.C * 1e-6 * v.U ** 2, 'J', [v => v.C * 1e-6 * v.U ** 2, v => 0.5 * v.C * v.U ** 2]);
  N('2b-rlc', 'Si la capacité est multipliée par {k}, la période propre est multipliée par :', { k: [4, 9, 16, 2] }, v => sq(v.k), '', [v => v.k, v => v.k ** 2, v => 1 / v.k]);
  N('2b-rlc-force', 'Fréquence de résonance f₀ = 1/(2π√(LC)) avec L = {L} mH et C = {C} µF ?', { L: [10, 40, 100], C: [1, 10, 100] }, v => 1 / (2 * PI * sq(v.L * 1e-3 * v.C * 1e-6)), 'Hz', [v => 2 * PI * sq(v.L * 1e-3 * v.C * 1e-6), v => 1 / sq(v.L * 1e-3 * v.C * 1e-6)]);
  N('2b-rlc-force', 'Bande passante Δf = {d} Hz pour f₀ = {f} Hz. Facteur de qualité ?', { d: [10, 20, 50, 100], f: [500, 1000, 2000] }, v => v.f / v.d, '', [v => v.d / v.f, v => v.f * v.d]);
  N('2b-rlc-force', 'U_eff = {U} V aux bornes d’un dipôle d’impédance Z = {Z} Ω. Intensité efficace ?', { U: [5, 10, 12, 230], Z: [10, 50, 100, 200] }, v => v.U / v.Z, 'A', [v => v.U * v.Z, v => v.Z / v.U]);
  N('2b-ondes-em', 'Onde radio de fréquence {f} MHz. Longueur d’onde dans l’air ?', { f: [1, 10, 88, 100, 900] }, v => 3e8 / (v.f * 1e6), 'm', [v => v.f * 1e6 / 3e8, v => 3e8 * v.f]);
  N('2b-ondes-em', 'Circuit d’accord : L = {L} µH et C = {C} pF. Fréquence captée ?', { L: [100, 250, 500], C: [100, 250, 500] }, v => 1 / (2 * PI * sq(v.L * 1e-6 * v.C * 1e-12)), 'Hz', [v => 2 * PI * sq(v.L * 1e-6 * v.C * 1e-12), v => 1 / (v.L * 1e-6 * v.C * 1e-12)]);
  N('2b-modulation', 'Signal modulé : U_max = {a} V et U_min = {b} V. Taux de modulation m = (U_max − U_min)/(U_max + U_min) ?', { a: [5, 6, 8, 10], b: [1, 2, 3, 4] }, v => (v.a - v.b) / (v.a + v.b), '', [v => (v.a + v.b) / (v.a - v.b), v => v.b / v.a]);
  Q('2b-modulation', 'Porteuse F_p = {F} kHz modulée par un signal f_s = {f} kHz. Fréquences présentes dans le signal modulé ?', { F: [100, 200, 500], f: [1, 2, 5] }, v => [`${v.F - v.f} ; ${v.F} ; ${v.F + v.f} kHz`, `${v.F} ; ${v.f} kHz`, `${v.F} ; ${2 * v.F} ; ${3 * v.F} kHz`, `${v.F * v.f} kHz`]);
  N('2b-modulation', 'Détecteur d’enveloppe : R = {R} kΩ et C = {C} nF. Constante de temps RC ?', { R: [1, 10, 47, 100], C: [10, 47, 100] }, v => v.R * 1e3 * v.C * 1e-9, 's', [v => v.R * v.C, v => v.R * 1e3 / (v.C * 1e-9)]);
  N('2b-newton', 'Une force résultante de {F} N s’exerce sur une masse de {m} kg. Accélération ?', { F: [2, 5, 10, 20, 100], m: [0.5, 1, 2, 5, 10] }, v => v.F / v.m, 'm/s²', [v => v.F * v.m, v => v.m / v.F]);
  N('2b-newton', 'La vitesse passe de {v1} à {v2} m/s en {t} s (accélération constante). Accélération ?', { v1: [0, 2, 5], v2: [10, 20, 30], t: [2, 4, 5, 10] }, v => (v.v2 - v.v1) / v.t, 'm/s²', [v => v.v2 / v.t, v => (v.v2 + v.v1) / v.t]);
  N('2b-newton', 'Mouvement uniformément accéléré : a = {a} m/s², départ arrêté. Distance parcourue en {t} s ?', { a: [1, 2, 4, 5], t: [2, 3, 4, 10] }, v => 0.5 * v.a * v.t ** 2, 'm', [v => v.a * v.t ** 2, v => v.a * v.t]);
  N('2b-chute', 'Chute libre (g = 10 m/s²) : durée pour tomber de {h} m sans vitesse initiale ?', { h: [5, 20, 45, 80, 125] }, v => sq(2 * v.h / 10), 's', [v => 2 * v.h / 10, v => sq(v.h / 10)]);
  N('2b-chute', 'Chute avec frottement f = k·v : m = {m} kg, k = {k} kg/s (g = 10). Vitesse limite ?', { m: [0.01, 0.05, 0.1, 1], k: [0.1, 0.2, 0.5, 1, 2] }, v => v.m * 10 / v.k, 'm/s', [v => v.k / (v.m * 10), v => v.m * v.k]);
  N('2b-chute', 'Chute libre sans vitesse initiale (g = 10 m/s²). Vitesse au bout de {t} s ?', { t: [0.5, 1, 2, 3, 4] }, v => 10 * v.t, 'm/s', [v => 5 * v.t ** 2, v => v.t / 10]);
  N('2b-plans', 'Projectile lancé à v₀ = {v} m/s sous {a}° (g = 10). Portée sur un sol horizontal ?', { v: [5, 10, 15, 20], a: [15, 30, 45, 60, 75] }, v => v.v ** 2 * sin(2 * v.a) / 10, 'm', [v => v.v ** 2 * sin(v.a) / 10, v => v.v ** 2 / 10]);
  N('2b-plans', 'Projectile lancé à v₀ = {v} m/s sous {a}° (g = 10). Flèche (hauteur maximale) ?', { v: [5, 10, 15, 20], a: [30, 45, 60] }, v => (v.v * sin(v.a)) ** 2 / 20, 'm', [v => v.v ** 2 * sin(v.a) / 20, v => (v.v * sin(v.a)) ** 2 / 10]);
  N('2b-plans', 'Tir horizontal à v₀ = {v} m/s depuis une hauteur de {h} m (g = 10). Distance horizontale parcourue avant l’impact ?', { v: [2, 5, 10], h: [1.25, 5, 20] }, v => v.v * sq(2 * v.h / 10), 'm', [v => v.v * 2 * v.h / 10, v => sq(2 * v.h / 10)]);
  N('2b-satellites', 'Satellite sur une orbite de rayon r = {r}×10⁶ m (G·M_T = 4×10¹⁴ SI). Vitesse ?', { r: [6.8, 7, 10, 20, 42] }, v => sq(4e14 / (v.r * 1e6)), 'm/s', [v => 4e14 / (v.r * 1e6), v => sq(4e14 * v.r * 1e6)]);
  N('2b-satellites', 'Si le rayon de l’orbite est multiplié par {k}, la période est multipliée par (3ᵉ loi de Kepler) :', { k: [4, 9, 16, 100] }, v => v.k ** 1.5, '', [v => v.k, v => v.k ** 2, v => sq(v.k)]);
  N('2b-satellites', 'Intensité de pesanteur à l’altitude h = {k} R_T (g₀ = 9,8 N/kg) ?', { k: [1, 2, 3, 0.5] }, v => 9.8 / (1 + v.k) ** 2, 'N/kg', [v => 9.8 / (1 + v.k), v => 9.8 / v.k ** 2]);
  N('2b-rotation', 'Moment d’inertie J = {J} kg·m², somme des moments {M} N·m. Accélération angulaire ?', { J: [0.01, 0.05, 0.1, 0.5, 2], M: [0.5, 1, 2, 5] }, v => v.M / v.J, 'rad/s²', [v => v.M * v.J, v => v.J / v.M]);
  N('2b-rotation', 'Disque homogène de masse {m} kg et de rayon {R} cm. Moment d’inertie J = ½MR² ?', { m: [0.5, 1, 2, 5], R: [10, 20, 30, 50] }, v => 0.5 * v.m * (v.R / 100) ** 2, 'kg·m²', [v => v.m * (v.R / 100) ** 2, v => 0.5 * v.m * v.R ** 2]);
  N('2b-rotation', 'Rotation uniformément accélérée : θ̈ = {a} rad/s², départ arrêté. Vitesse angulaire au bout de {t} s ?', { a: [2, 5, 10], t: [2, 3, 5, 10] }, v => v.a * v.t, 'rad/s', [v => 0.5 * v.a * v.t ** 2, v => v.a / v.t]);
  N('2b-oscillants', 'Pendule élastique : m = {m} g, K = {K} N/m. Période propre ?', { m: [100, 200, 250, 500], K: [10, 20, 40, 100] }, v => 2 * PI * sq(v.m / 1000 / v.K), 's', [v => 2 * PI * sq(v.K / (v.m / 1000)), v => sq(v.m / 1000 / v.K)]);
  N('2b-oscillants', 'Pendule simple de longueur {l} cm (g = 9,8 N/kg). Période propre ?', { l: [25, 50, 100, 200] }, v => 2 * PI * sq(v.l / 100 / 9.8), 's', [v => 2 * PI * sq(v.l / 9.8), v => PI * sq(v.l / 100 / 9.8)]);
  N('2b-oscillants', 'Pendule de torsion : J = {J} kg·m², C = {C} N·m/rad. Période propre ?', { J: [0.001, 0.01, 0.05], C: [0.01, 0.04, 0.1] }, v => 2 * PI * sq(v.J / v.C), 's', [v => 2 * PI * sq(v.C / v.J), v => sq(v.J / v.C)]);
  N('2b-energie', 'Énergie potentielle élastique : K = {K} N/m, allongement x = {x} cm ?', { K: [10, 20, 50, 100], x: [2, 5, 10] }, v => 0.5 * v.K * (v.x / 100) ** 2, 'J', [v => v.K * (v.x / 100) ** 2, v => 0.5 * v.K * v.x ** 2]);
  N('2b-energie', 'Oscillateur sans frottement : K = {K} N/m, amplitude X_m = {X} cm. Énergie mécanique ?', { K: [10, 20, 50, 100], X: [2, 4, 5, 10] }, v => 0.5 * v.K * (v.X / 100) ** 2, 'J', [v => v.K * (v.X / 100) ** 2, v => 0.5 * v.K * v.X / 100]);
  N('2b-energie', 'Oscillateur : K = {K} N/m, m = {m} g, amplitude {X} cm. Vitesse maximale ?', { K: [10, 20, 40], m: [100, 250, 400], X: [2, 5, 10] }, v => v.X / 100 * sq(v.K / (v.m / 1000)), 'm/s', [v => v.X / 100 * v.K / (v.m / 1000), v => sq(v.K * v.m / 1000)]);
  N('2b-atome', 'Photon de longueur d’onde {l} nm. Énergie en eV ? (h·c = 1240 eV·nm)', { l: [400, 500, 620, 656, 1240] }, v => 1240 / v.l, 'eV', [v => v.l / 1240, v => 1240 * v.l]);
  N('2b-atome', 'Atome d’hydrogène (E_n = −13,6/n² eV) : transition du niveau {n} vers le niveau {p}. Longueur d’onde émise ? (h·c = 1240 eV·nm)', { k: [0, 1, 2, 3], n: v => [3, 4, 2, 3][v.k], p: v => [2, 2, 1, 1][v.k] }, v => 1240 / (13.6 / v.p ** 2 - 13.6 / v.n ** 2), 'nm', [v => 1240 / (13.6 / v.n ** 2), v => 13.6 / v.p ** 2 - 13.6 / v.n ** 2]);
  N('2b-atome', 'Énergie d’un photon de fréquence {f}×10¹⁴ Hz ? (h = 6,63×10⁻³⁴ J·s)', { f: [4, 5, 6, 7.5] }, v => 6.63e-34 * v.f * 1e14, 'J', [v => 6.63e-34 / (v.f * 1e14), v => v.f * 1e14 / 6.63e-34]);

  /* ===================== 2e BAC — CHIMIE ===================== */
  L('2bc-lentes', 'Transformation lente ou rapide : {a}', [['précipitation du chlorure d’argent', 'rapide'], ['oxydation des ions iodure par l’eau oxygénée', 'lente'], ['réaction entre un acide fort et une base forte', 'rapide'], ['formation de la rouille', 'lente'], ['estérification', 'lente']]);
  L('2bc-lentes', 'Effet sur la transformation : {a}', [['augmenter la température', 'elle est plus rapide'], ['diluer le mélange réactionnel', 'elle est plus lente'], ['refroidir brutalement (trempe)', 'elle est presque bloquée'], ['ajouter un catalyseur', 'plus rapide, même état final']]);
  N('2bc-vitesse', 'Avancement final x_f = {x} mmol. Avancement au temps de demi-réaction ?', { x: [2, 4, 5, 10, 20] }, v => v.x / 2, 'mmol', [v => v.x, v => 2 * v.x]);
  N('2bc-vitesse', 'dx/dt = {d} mmol/min dans un volume de {V} mL. Vitesse volumique ?', { d: [0.1, 0.5, 1, 2], V: [50, 100, 200, 500] }, v => v.d / (v.V / 1000), 'mmol·L⁻¹·min⁻¹', [v => v.d * v.V / 1000, v => v.d / v.V]);
  N('2bc-deuxsens', 'pH = {p} pour un acide à C = {C} mol/L. Taux d’avancement final τ = 10^(−pH)/C ?', { p: [2, 2.5, 3, 3.4], C: [0.01, 0.05, 0.1] }, v => 10 ** -v.p / v.C, '', [v => v.C / 10 ** -v.p, v => v.p * v.C]);
  N('2bc-deuxsens', '[H₃O⁺] = {h} mol/L. pH de la solution ?', { h: [1e-2, 5e-3, 1e-3, 2e-4, 1e-5, 3.2e-9] }, v => -lg(v.h), '', [v => lg(v.h), v => 14 + lg(v.h)]);
  N('2bc-equilibre', 'À l’équilibre : [CH₃COO⁻] = [H₃O⁺] = {x}×10⁻⁴ mol/L et [CH₃COOH] = {c}×10⁻² mol/L. Constante d’équilibre K ?', { x: [4, 4.2, 5, 6], c: [1, 1.5, 2] }, v => (v.x * 1e-4) ** 2 / (v.c * 1e-2), '', [v => v.x * 1e-4 / (v.c * 1e-2), v => (v.c * 1e-2) / (v.x * 1e-4) ** 2]);
  Q('2bc-equilibre', 'K = {K} et quotient initial Q_r,i = {Q}. Le système évolue :', { K: [1e-5, 0.1, 10, 1e3], Q: [1e-6, 1, 100, 1e4] }, v => v.Q < v.K ? ['dans le sens direct', 'dans le sens inverse', 'il n’évolue pas'] : v.Q > v.K ? ['dans le sens inverse', 'dans le sens direct', 'il n’évolue pas'] : ['il n’évolue pas', 'dans le sens direct', 'dans le sens inverse']);
  N('2bc-acidebase', 'pK_A = {p}. Constante d’acidité K_A ?', { p: [3.8, 4.2, 4.8, 9.2] }, v => 10 ** -v.p, '', [v => 10 ** v.p, v => -v.p]);
  N('2bc-acidebase', 'pK_A = {p} et [B]/[A] = {r}. pH de la solution ?', { p: [3.8, 4.8, 9.2], r: [0.1, 1, 10, 100] }, v => v.p + lg(v.r), '', [v => v.p - lg(v.r), v => v.p * v.r]);
  N('2bc-acidebase', 'À 25 °C (K_e = 10⁻¹⁴), [H₃O⁺] = {h} mol/L. Concentration [HO⁻] ?', { h: [1e-2, 1e-3, 1e-9, 1e-11] }, v => 1e-14 / v.h, 'mol/L', [v => v.h, v => 1e-14 * v.h]);
  Q('2bc-acidebase', 'pH = {pH} et pK_A = {p}. Espèce prédominante du couple AH/A⁻ ?', { pH: [2, 3, 4, 6, 8, 11], p: [4.8, 9.2, 3.8] }, v => v.pH < v.p ? ['la forme acide AH', 'la forme basique A⁻', 'aucune : [AH] = [A⁻]'] : v.pH > v.p ? ['la forme basique A⁻', 'la forme acide AH', 'aucune : [AH] = [A⁻]'] : ['aucune : [AH] = [A⁻]', 'la forme acide AH', 'la forme basique A⁻']);
  N('2bc-dosage', 'Dosage de V_A = {VA} mL d’acide par une base à C_B = {CB} mol/L ; V_E = {VE} mL. Concentration C_A ?', { VA: [10, 20, 25], CB: [0.01, 0.05, 0.1], VE: [8, 10, 12.5, 16, 20] }, v => v.CB * v.VE / v.VA, 'mol/L', [v => v.CB * v.VA / v.VE, v => v.CB * v.VE]);
  N('2bc-dosage', 'Dosage d’un acide faible : à la demi-équivalence, pH = {p}. pK_A du couple ?', { p: [3.8, 4.2, 4.8, 9.2] }, v => v.p, '', [v => 2 * v.p, v => 14 - v.p, v => v.p / 2]);
  N('2bc-spontanee', 'Cu²⁺ + Zn ⇌ Cu + Zn²⁺ : [Zn²⁺] = {a} mol/L et [Cu²⁺] = {b} mol/L. Quotient de réaction initial ?', { a: [0.01, 0.1, 0.5, 1], b: [0.01, 0.1, 0.5, 1] }, v => v.a / v.b, '', [v => v.b / v.a, v => v.a * v.b]);
  Q('2bc-spontanee', 'Q_r,i = {Q} et K = {K}. Le système évolue :', { Q: [1e-3, 0.5, 10, 50, 1e4], K: [1e-2, 2, 100, 1e37] }, v => v.Q < v.K ? ['dans le sens direct', 'dans le sens inverse', 'il est à l’équilibre'] : v.Q > v.K ? ['dans le sens inverse', 'dans le sens direct', 'il est à l’équilibre'] : ['il est à l’équilibre', 'dans le sens direct', 'dans le sens inverse']);
  N('2bc-piles', 'Une pile débite I = {I} mA pendant {t} h. Quantité d’électricité ?', { I: [50, 100, 200, 500], t: [1, 2, 5, 10] }, v => v.I * 1e-3 * v.t * 3600, 'C', [v => v.I * v.t, v => v.I * 1e-3 * v.t]);
  N('2bc-piles', 'Q = {Q} C. Quantité d’électrons échangés ? (F = 96 500 C/mol)', { Q: [965, 1930, 4825, 9650, 19300] }, v => v.Q / 96500, 'mol', [v => v.Q * 96500, v => 96500 / v.Q]);
  N('2bc-piles', 'Pile Daniell : {n} mmol d’électrons ont circulé. Masse de cuivre déposée ? (Cu²⁺ + 2e⁻ → Cu ; M = 63,5 g/mol)', { n: [2, 4, 10, 20] }, v => v.n / 2 * 1e-3 * 63.5, 'g', [v => v.n * 1e-3 * 63.5, v => v.n / 2 * 63.5]);
  N('2bc-electrolyse', 'Électrolyse : I = {I} A pendant {t} min. Quantité d’électricité ?', { I: [0.5, 1, 2, 5], t: [10, 16, 30, 60] }, v => v.I * v.t * 60, 'C', [v => v.I * v.t, v => v.I * v.t / 60]);
  N('2bc-electrolyse', 'Masse d’argent déposée (Ag⁺ + e⁻ → Ag ; M = 108 g/mol) pour Q = {Q} C ? (F = 96 500 C/mol)', { Q: [965, 1930, 9650] }, v => v.Q / 96500 * 108, 'g', [v => v.Q * 108, v => v.Q / 96500]);
  N('2bc-electrolyse', 'Électrolyse de l’eau : {n} mol d’électrons ont circulé (2H⁺ + 2e⁻ → H₂). Volume de H₂ (V_m = 24 L/mol) ?', { n: [0.01, 0.02, 0.1, 0.2] }, v => v.n / 2 * 24, 'L', [v => v.n * 24, v => v.n / 24]);
  L('2bc-ester', 'Ester obtenu à partir de : {a}', [['acide éthanoïque + méthanol', 'éthanoate de méthyle'], ['acide éthanoïque + éthanol', 'éthanoate d’éthyle'], ['acide méthanoïque + éthanol', 'méthanoate d’éthyle'], ['acide propanoïque + méthanol', 'propanoate de méthyle'], ['acide méthanoïque + méthanol', 'méthanoate de méthyle']]);
  N('2bc-ester', 'Mélange équimolaire de {n0} mol d’acide et {n0} mol d’alcool ; on obtient {n} mol d’ester. Rendement ?', { n0: [0.1, 0.2, 0.5, 1], f: [0.33, 0.5, 0.6, 0.67], n: v => +(v.n0 * v.f).toFixed(3) }, v => v.n / v.n0 * 100, '%', [v => v.n0 / v.n * 100, v => (1 - v.n / v.n0) * 100]);
  L('2bc-ester', 'Rendement de l’estérification (mélange équimolaire) avec un alcool {a}', [['primaire', 'environ 67 %'], ['secondaire', 'environ 60 %'], ['tertiaire', 'environ 5 %']]);
  L('2bc-controle', 'Produits de la saponification de {a}', [['l’éthanoate d’éthyle', 'ion éthanoate + éthanol'], ['le méthanoate de méthyle', 'ion méthanoate + méthanol'], ['l’éthanoate de méthyle', 'ion éthanoate + méthanol'], ['le propanoate d’éthyle', 'ion propanoate + éthanol']]);
  L('2bc-controle', 'Effet sur le rendement de l’estérification : {a}', [['utiliser un excès d’alcool', 'il augmente'], ['ajouter un catalyseur', 'il ne change pas'], ['remplacer l’acide par un anhydride', 'la réaction devient totale'], ['ajouter de l’eau', 'il diminue']]);

  return { gen, chapters: () => Object.keys(T), count: ch => (T[ch] || []).length };
})();
