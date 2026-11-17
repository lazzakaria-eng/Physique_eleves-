/* Expériences d’électricité animées (2ᵉ Bac) : schéma du montage + courbe tracée en direct.
   rc_energie : le condensateur emmagasine de l’énergie ; rl_retard : la bobine retarde l’établissement et la rupture du courant ;
   rlc_entretien : oscillations libres, amorties et entretenues. */
'use strict';
(() => {
  const L_ = (fr, ar) => SIM_LANG === 'ar' ? ar : fr;
  const wire = (c, ...p) => { for (let i = 0; i + 3 < p.length; i += 2) c.line(p[i], p[i + 1], p[i + 2], p[i + 3], c.ink, 2); };
  const dot = (c, x, y) => c.circ(x, y, 3.5, c.ink);
  function lamp(c, x, y, b, lab) {
    b = clamp(b, 0, 1);
    if (b > 0.02) { c.circ(x, y, 14 + 18 * b, `rgba(255,196,40,${0.15 + 0.45 * b})`); c.circ(x, y, 12, `rgba(255,220,90,${0.4 + 0.6 * b})`, c.ink, 2); }
    else c.circ(x, y, 12, c.bg, c.ink, 2);
    const d = 8.5; c.line(x - d, y - d, x + d, y + d, c.ink, 1.8); c.line(x - d, y + d, x + d, y - d, c.ink, 1.8);
    if (lab) c.text(lab, x + 18, y - 12, c.ink, 'left', 12, true);
  }
  function cap(c, x, y, lab, q) { // condensateur sur un fil vertical
    c.rect(x - 18, y - 6, 36, 12, c.bg); c.line(x - 16, y - 6, x + 16, y - 6, c.ink, 3); c.line(x - 16, y + 6, x + 16, y + 6, c.ink, 3);
    if (lab) c.text(lab, x - 24, y + 4, c.ink, 'right', 12, true);
    const n = Math.round(clamp(Math.abs(q || 0), 0, 1) * 4), s = (q || 0) >= 0;
    for (let k = 0; k < n; k++) { const xx = x - 12 + k * 8; c.text(s ? '+' : '−', xx, y - 10, c.b, 'center', 11, true); c.text(s ? '−' : '+', xx, y + 20, c.a, 'center', 11, true); }
  }
  function coil(c, x, y, len, lab, vert) { // bobine : 4 spires
    const ctx = c.ctx, n = 4, r = len / n / 2;
    if (vert) c.rect(x - 12, y, 24, len, c.bg); else c.rect(x, y - 12, len, 24, c.bg);
    ctx.save(); ctx.strokeStyle = c.ink; ctx.lineWidth = 2.2; ctx.beginPath();
    for (let k = 0; k < n; k++) {
      if (vert) ctx.arc(x, y + r + 2 * r * k, r, -Math.PI / 2, Math.PI / 2, false);
      else ctx.arc(x + r + 2 * r * k, y, r, Math.PI, 0, false);
    }
    ctx.stroke(); ctx.restore();
    if (lab) vert ? c.text(lab, x + 16, y + len / 2 + 4, c.ink, 'left', 12, true) : c.text(lab, x + len / 2, y - 18, c.ink, 'center', 12, true);
  }
  function inter(c, px, py, tx, ty, lab) { dot(c, px, py); c.line(px, py, tx, ty, c.d, 3); if (lab) c.text(lab, px, py - 12, c.d, 'center', 13, true); }
  function trace(c, f, t1, col, w) { // courbe tracée jusqu’à t1
    const [x0, x1] = c.rng, ctx = c.ctx, n = 400, tEnd = Math.min(t1, x1);
    if (tEnd <= x0) return;
    ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = w || 2.6; ctx.beginPath();
    for (let k = 0; k <= n; k++) { const t = x0 + (tEnd - x0) * k / n, y = f(t); k ? ctx.lineTo(c.X(t), c.Y(y)) : ctx.moveTo(c.X(t), c.Y(y)); }
    ctx.stroke(); ctx.restore();
  }
  function bar(c, x, y, w, frac, col, lab) {
    c.rect(x, y, w, 14, c.bg, c.grid, 1); c.rect(x, y, w * clamp(frac, 0, 1), 14, col);
    c.text(lab, x, y - 5, c.ink, 'left', 12, true);
  }
  function step(c, txt, col) { c.rect(14, 8, 300, 24, c.bg); c.text(txt, 18, 25, col || c.d, 'left', 12.5, true); }

  /* ---------- 1. Le condensateur emmagasine de l’énergie ---------- */
  S('rc_energie', [['C', 'C (F)', 0.1, 1, 0.05, 0.47], ['E', 'E (V)', 1, 5.5, 0.5, 5]], 1, (c, v, t) => {
    const r = 0.5, RL = 10, tc = r * v.C, td = RL * v.C, T1 = 2, T2 = 4, TT = 12;
    const tt = t % (TT + 1.5), ph = tt < T1 ? 1 : tt < T2 ? 0 : 2;
    const U1 = v.E * (1 - Math.exp(-T1 / tc));
    const u = s => s < T1 ? v.E * (1 - Math.exp(-s / tc)) : s < T2 ? U1 : U1 * Math.exp(-(s - T2) / td);
    const uc = u(Math.min(tt, TT)), Emax = 0.5 * v.C * v.E * v.E, Ee = 0.5 * v.C * uc * uc;
    // schéma
    const P = [165, 125], T1p = [118, 78], T2p = [212, 78];
    wire(c, T1p[0], T1p[1], 50, 78, 50, 105); c.resistor(50, 105, 34, 'r', true); wire(c, 50, 139, 50, 205); c.battery(50, 215, 'E'); wire(c, 50, 225, 50, 300, 290, 300);
    wire(c, T2p[0], T2p[1], 290, 78, 290, 178); lamp(c, 290, 190, ph === 2 ? Math.pow(uc / 5.5, 2) * 1.8 : 0); c.text(L_('lampe', 'مصباح'), 272, 166, c.ink, 'right', 12, true); wire(c, 290, 202, 290, 300);
    wire(c, P[0], P[1], 165, 300); cap(c, 165, 215, 'C', uc / 5.5);
    dot(c, T1p[0], T1p[1]); dot(c, T2p[0], T2p[1]); c.text('1', T1p[0], T1p[1] - 10, c.ink, 'center', 12, true); c.text('2', T2p[0], T2p[1] - 10, c.ink, 'center', 12, true);
    inter(c, P[0], P[1], ph === 1 ? T1p[0] + 4 : ph === 2 ? T2p[0] - 4 : 165, ph === 1 || ph === 2 ? T1p[1] + 3 : 84, '');
    c.text('K', 182, 130, c.d, 'left', 13, true);
    c.text('u_C = ' + fmt(uc, 2) + ' V', 190, 252, c.a, 'left', 12, true);
    step(c, ph === 1 ? L_('① K en 1 : le générateur charge le condensateur', '① K في 1 : المولد يشحن المكثف')
      : ph === 0 ? L_('② K ouvert : le condensateur garde sa charge', '② K مفتوح : المكثف يحتفظ بشحنته')
      : L_('③ K en 2 : le condensateur se décharge dans la lampe', '③ K في 2 : المكثف يفرغ في المصباح'));
    // courbe
    c.axes(0, TT, 0, 6, 't (s)', 'u_C (V)', [372, 40, 626, 200]);
    c.line(c.X(T1), c.Y(0), c.X(T1), c.Y(6), c.grid, 1, [4, 4]); c.line(c.X(T2), c.Y(0), c.X(T2), c.Y(6), c.grid, 1, [4, 4]);
    trace(c, u, tt, c.a);
    // énergies
    bar(c, 372, 262, 250, Ee / 15, c.a, L_('énergie stockée E_e = ½·C·u_C² = ', 'الطاقة المخزونة E_e = ½·C·u_C² = ') + fmt(Ee, 2) + ' J');
    const conv = ph === 2 ? Math.max(0, 0.5 * v.C * U1 * U1 - Ee) : 0;
    bar(c, 372, 316, 250, conv / 15, '#e6a817', L_('énergie reçue par la lampe = ', 'الطاقة التي يستقبلها المصباح = ') + fmt(conv, 2) + ' J');
    return ['τ_{décharge} = R·C = ' + fmt(td) + ' s  (R_{lampe} = 10 Ω)', 'E_{e,max} = ½·C·E² = ' + fmt(Emax, 2) + ' J',
      ph === 0 ? L_('Générateur débranché : u_C reste constante, l’énergie reste stockée.', 'المولد مفصول : u_C تبقى ثابتة، والطاقة تبقى مخزونة.')
        : ph === 2 ? L_('La lampe brille sans générateur : l’énergie vient du condensateur.', 'المصباح يضيء بدون مولد : الطاقة تأتي من المكثف.')
          : L_('Pendant la charge, le condensateur accumule de l’énergie.', 'أثناء الشحن، يخزن المكثف الطاقة.'),
      L_('Doubler E multiplie l’énergie stockée par 4.', 'مضاعفة E تضرب الطاقة المخزونة في 4.')];
  });

  /* ---------- 2. La bobine retarde l’établissement et la rupture du courant ---------- */
  S('rl_retard', [['L', 'L (H)', 0.1, 2, 0.1, 1], ['r', ['r de la bobine (Ω)', 'r الوشيعة (Ω)'], 2, 40, 1, 10],
    ['mode', ['Expérience', 'التجربة'], [['fermeture de K (établissement)', 'غلق K (إقامة التيار)'], ['ouverture de K (rupture)', 'فتح K (انقطاع التيار)']], 0]], 1, (c, v, t) => {
    const E = 6, RL = 20, R = v.r, Rt = RL + v.r, tau = v.L / Rt, I = E / Rt, est = +v.mode === 0;
    const tau2 = v.L / (2 * Rt), Tm = (est ? 6 * tau : 6 * tau2) * 1000, t0s = 0.6, dur = 3.4, TT = t0s + dur;
    const tt = t % (TT + 1.5), ms = Math.max(0, Math.min(tt, TT) - t0s) / dur * Tm, on = tt >= t0s;
    let i1, i2;
    if (est) { i1 = on ? I * (1 - Math.exp(-ms / 1000 / tau)) : 0; i2 = on ? I : 0; }
    else { const k = on ? Math.exp(-ms / 1000 / tau2) : 1; i1 = I * k; i2 = on ? -I * k : I; }
    // schéma
    wire(c, 40, 140, 40, 70, 78, 70); c.battery(40, 180, 'E'); wire(c, 40, 190, 40, 300, 300, 300, 300, 240);
    dot(c, 78, 70); dot(c, 118, 70); const closed = est ? on : !on;
    inter(c, 78, 70, closed ? 118 : 110, closed ? 70 : 50, 'K');
    wire(c, 118, 70, 130, 70, 130, 240); dot(c, 130, 120); dot(c, 130, 240);
    wire(c, 130, 120, 168, 120); lamp(c, 180, 120, (i1 / I) ** 2, 'L₁'); wire(c, 192, 120, 210, 120); coil(c, 210, 120, 60, '(L, r)'); wire(c, 270, 120, 300, 120, 300, 240);
    wire(c, 130, 240, 168, 240); lamp(c, 180, 240, (i2 / I) ** 2, 'L₂'); wire(c, 192, 240, 214, 240); c.resistor(214, 240, 52, 'R = r'); wire(c, 266, 240, 300, 240);
    dot(c, 300, 120); dot(c, 300, 240);
    const arr = (y, i, col) => { if (Math.abs(i) < I * 0.04) return; const s = Math.sign(i), L0 = 10 + 14 * Math.abs(i) / I; c.arrow(150 - s * L0 / 2, y - 16, 150 + s * L0 / 2, y - 16, col, ''); };
    arr(120, i1, c.a); arr(240, i2, c.b);
    step(c, est ? (on ? L_('K fermé : L₂ s’allume tout de suite, L₁ avec retard', 'K مغلق : L₂ يضيء فورا، و L₁ بتأخر') : L_('K ouvert : pas de courant', 'K مفتوح : لا تيار'))
      : (on ? L_('K ouvert : la bobine entretient le courant un moment', 'K مفتوح : الوشيعة تحافظ على التيار لحظة') : L_('K fermé : régime permanent, I dans les deux lampes', 'K مغلق : نظام دائم، I في المصباحين')), est ? c.d : c.b);
    // courbe
    const f1 = s => est ? I * (1 - Math.exp(-s / 1000 / tau)) * 1000 : I * Math.exp(-s / 1000 / tau2) * 1000;
    const f2 = s => est ? I * 1000 : -I * Math.exp(-s / 1000 / tau2) * 1000;
    c.axes(0, Tm, est ? 0 : -I * 1150, I * 1150, 't (ms)', 'i (mA)', [372, 40, 626, 290]);
    if (on) { trace(c, f1, ms, c.a); trace(c, f2, ms, c.b); }
    c.text('i₁ (L₁)', 620, 56, c.a, 'right', 12, true); c.text('i₂ (L₂)', 620, est ? 74 : 280, c.b, 'right', 12, true);
    if (est) { c.line(c.X(tau * 1000), c.Y(0), c.X(tau * 1000), c.Y(I * 632), c.mute, 1, [4, 4]); c.text('τ', c.X(tau * 1000), c.Y(0) - 6, c.ink, 'center', 13, true); }
    return [est ? 'τ = L / (R_{lampe} + r) = ' + fmt(tau * 1000) + ' ms' : 'τ′ = L / (2·(R_{lampe} + r)) = ' + fmt(tau2 * 1000) + ' ms', 'I = E / (R_{lampe} + r) = ' + fmt(I * 1000) + ' mA',
      est ? L_('La bobine s’oppose à l’augmentation du courant : i₁ n’atteint I qu’après ≈ 5τ.', 'الوشيعة تعاكس تزايد التيار : i₁ لا يبلغ I إلا بعد ≈ 5τ.')
        : L_('Après l’ouverture, la bobine fait circuler le courant dans L₂ en sens inverse : les deux lampes s’éteignent progressivement.', 'بعد الفتح، الوشيعة تمرر التيار في L₂ في المنحى المعاكس : ينطفئ المصباحان تدريجيا.'),
      L_('Plus L est grande, plus le retard est grand ; u_L = L·di/dt + r·i.', 'كلما كانت L كبيرة، كان التأخر أكبر ؛ u_L = L·di/dt + r·i.'), L_('Animation au ralenti.', 'عرض بالتصوير البطيء.')];
  });

  /* ---------- 3. Oscillations libres et entretenues ---------- */
  S('rlc_entretien', [['r', ['r : résistance du circuit (Ω)', 'r : مقاومة الدارة (Ω)'], 0, 80, 1, 10], ['R0', ['R_0 : dispositif d’entretien (Ω)', 'R_0 : جهاز الصيانة (Ω)'], 0, 80, 1, 0],
    ['L', 'L (H)', 0.1, 1, 0.05, 0.5], ['C', 'C (µF)', 1, 20, 0.5, 10]], 1, (c, v, t) => {
    const E = 6, L = v.L, C = v.C * 1e-6, w0 = 1 / Math.sqrt(L * C), T0 = 2 * Math.PI / w0, Tm = 8 * T0 * 1000, t0s = 0.8, dur = 7, TT = t0s + dur;
    const tt = t % (TT + 1.5), on = tt >= t0s, ms = Math.max(0, Math.min(tt, TT) - t0s) / dur * Tm;
    const sat = 1.35 * E, N = 1600, dt = Tm / 1000 / N, us = new Float32Array(N + 1), is = new Float32Array(N + 1);
    let q = C * E, i = 0; us[0] = E;
    for (let k = 1; k <= N; k++) { // q″ = −((r − R0)·i + q/C) / L, l’AOP sature : amplitude limitée
      const big = 0.5 * C * (q / C) ** 2 + 0.5 * L * i * i >= 0.5 * C * sat * sat, Rn = v.R0 > v.r && big ? v.r : v.R0;
      const a = -((v.r - Rn) * i + q / C) / L; i += a * dt; q += i * dt; us[k] = q / C; is[k] = i;
    }
    const at = s => { const k = clamp(Math.round(s / Tm * N), 0, N); return k; };
    const kk = at(ms), uc = on ? us[kk] : E, ic = on ? is[kk] : 0;
    // schéma
    const P = [150, 125];
    wire(c, 104, 78, 40, 78, 40, 170); c.battery(40, 180, 'E'); wire(c, 40, 190, 40, 300, 290, 300);
    dot(c, 104, 78); dot(c, 196, 78); c.text('1', 104, 68, c.ink, 'center', 12, true); c.text('2', 196, 68, c.ink, 'center', 12, true);
    inter(c, P[0], P[1], on ? 192 : 108, 81, ''); c.text('K', 166, 132, c.d, 'left', 13, true);
    wire(c, 150, 125, 150, 300); cap(c, 150, 215, 'C', uc / E / 1.4);
    wire(c, 196, 78, 290, 78, 290, 100); coil(c, 290, 100, 64, '(L, r)', true);
    if (v.R0 > 0) { wire(c, 290, 164, 290, 196); c.rect(262, 196, 56, 40, c.bg, c.c, 2); c.text('−R₀', 290, 214, c.c, 'center', 13, true); c.text(L_('(AOP)', '(AOP)'), 290, 230, c.c, 'center', 10); wire(c, 290, 236, 290, 300); }
    else wire(c, 290, 164, 290, 300);
    c.text('u_C = ' + fmt(uc, 2) + ' V', 162, 260, c.a, 'left', 12, true);
    const d = v.r - v.R0, ent = Math.abs(d) < 0.5, amp = d < -0.5;
    step(c, !on ? L_('K en 1 : le condensateur se charge (u_C = E)', 'K في 1 : المكثف يشحن (u_C = E)')
      : v.R0 === 0 ? (v.r === 0 ? L_('K en 2 : oscillations libres non amorties (r = 0)', 'K في 2 : تذبذبات حرة غير مخمدة (r = 0)') : L_('K en 2 : oscillations libres amorties', 'K في 2 : تذبذبات حرة مخمدة'))
        : ent ? L_('Oscillations entretenues : R₀ = r', 'تذبذبات مصانة : R₀ = r') : amp ? L_('R₀ > r : l’amplitude augmente (puis saturation)', 'R₀ > r : الوسع يتزايد (ثم إشباع)') : L_('R₀ < r : amortissement plus faible', 'R₀ < r : تخميد أضعف'), ent ? c.c : c.d);
    // courbe et énergies
    c.axes(0, Tm, -1.5 * E, 1.5 * E, 't (ms)', 'u_C (V)', [372, 40, 626, 230]);
    if (on) trace(c, s => us[at(s)], ms, c.a, 2.2);
    const Ee = 0.5 * C * uc * uc, Em = 0.5 * L * ic * ic, E0 = 0.5 * C * E * E;
    bar(c, 372, 280, 120, Ee / (2 * E0), c.a, 'E_e = ½·C·u²');
    bar(c, 506, 280, 120, Em / (2 * E0), c.b, 'E_m = ½·L·i²');
    bar(c, 372, 326, 254, (Ee + Em) / (2 * E0), c.c, L_('énergie totale E = E_e + E_m = ', 'الطاقة الكلية E = E_e + E_m = ') + fmt((Ee + Em) * 1e6, 3) + ' µJ');
    return ['T_0 = 2π·√(L·C) = ' + fmt(T0 * 1000) + ' ms',
      v.R0 === 0 ? L_('Sans entretien, r dissipe l’énergie par effet Joule : l’amplitude diminue.', 'بدون صيانة، r تبدد الطاقة بمفعول جول : الوسع يتناقص.')
        : ent ? L_('Le dispositif d’entretien fournit à chaque instant l’énergie perdue par effet Joule : u_C est sinusoïdale, T = T_0.', 'جهاز الصيانة يعوض في كل لحظة الطاقة المبددة بمفعول جول : u_C جيبية، T = T_0.')
          : amp ? L_('Le dispositif fournit plus d’énergie que r n’en dissipe.', 'الجهاز يعطي طاقة أكثر مما تبدده r.') : L_('Le dispositif compense seulement une partie des pertes : régler R₀ = r.', 'الجهاز يعوض جزءا فقط من الضياع : اضبط R₀ = r.'),
      L_('Le dispositif d’entretien se comporte comme une résistance négative : u_G = −R_0·i.', 'جهاز الصيانة يتصرف كمقاومة سالبة : u_G = −R_0·i.'), L_('Animation au ralenti.', 'عرض بالتصوير البطيء.')];
  });
})();
