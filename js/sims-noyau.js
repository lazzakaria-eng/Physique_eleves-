/* Noyaux, masse et énergie (2ᵉ Bac) : fission de l’uranium 235 (une fission, réaction en chaîne) et fusion deutérium + tritium. */
'use strict';
(() => {
  const L_ = (fr, ar) => SIM_LANG === 'ar' ? ar : fr;
  const MeV = 931.5, mn = 1.008665;
  function nuc(c, x, y, r, col, lab, sx) { // noyau (sx : étirement horizontal)
    const ctx = c.ctx; ctx.save(); ctx.translate(x, y); ctx.scale(sx || 1, 1 / (sx || 1));
    const g = ctx.createRadialGradient(-r * 0.35, -r * 0.35, r * 0.1, 0, 0, r); g.addColorStop(0, '#fff'); g.addColorStop(0.25, col); g.addColorStop(1, col);
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, r, 0, 2 * Math.PI); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 1.2; ctx.stroke(); ctx.restore();
    if (lab) c.text(lab, x, y + 4, '#fff', 'center', r > 14 ? 13 : 10, true);
  }
  const neut = (c, x, y) => { c.circ(x, y, 5, '#8a94a6', '#14213d', 1); };
  function flash(c, x, y, k, lab, sz) { // k de 0 à 1
    if (k <= 0 || k >= 1) return;
    c.circ(x, y, 10 + 70 * (sz || 1) * k, `rgba(255,190,40,${0.55 * (1 - k)})`);
    if (lab) c.text(lab, x, y - 20 - 50 * k, '#e08a00', 'center', 13, true);
  }
  function bilan(c, x, y, rows, prod, E, extra) {
    const ctx = c.ctx; c.rect(x, y, 262, 168 + (extra ? 18 : 0), c.bg, c.grid, 1);
    c.text(L_('Bilan de masse', 'حصيلة الكتلة'), x + 10, y + 20, c.ink, 'left', 13, true);
    const tot = a => a.reduce((s, r) => s + r[1], 0), m1 = tot(rows), m2 = tot(prod);
    c.text(L_('avant : ', 'قبل : ') + rows.map(r => r[0]).join(' + '), x + 10, y + 42, c.ink, 'left', 12);
    c.text('m = ' + m1.toFixed(6).replace('.', ',') + ' u', x + 24, y + 60, c.a, 'left', 12, true);
    c.text(L_('après : ', 'بعد : ') + prod.map(r => r[0]).join(' + '), x + 10, y + 82, c.ink, 'left', 12);
    c.text('m = ' + m2.toFixed(6).replace('.', ',') + ' u', x + 24, y + 100, c.a, 'left', 12, true);
    c.text('Δm = ' + (m2 - m1).toFixed(6).replace('.', ',') + ' u  < 0', x + 10, y + 124, c.d, 'left', 13, true);
    c.text('E = |Δm|·c² ≈ ' + fmt(Math.abs(m2 - m1) * MeV) + ' MeV', x + 10, y + 146, '#e08a00', 'left', 13, true);
    if (extra) c.text(extra, x + 10, y + 166, c.mute, 'left', 12);
    return Math.abs(m2 - m1) * MeV;
  }

  /* ---------- Fission de l’uranium 235 ---------- */
  S('fission', [['mode', ['Expérience', 'التجربة'], [['une fission', 'انشطار واحد'], ['réaction en chaîne non contrôlée', 'تفاعل متسلسل غير متحكم فيه'], ['réaction en chaîne contrôlée (barres de contrôle)', 'تفاعل متسلسل متحكم فيه (قضبان المراقبة)']], 0]], 1, (c, v, t) => {
    const mode = +v.mode, U = '#2f7d4f', F1 = '#d93a4a', F2 = '#1f6fe0';
    const R = [['¹n', mn], ['²³⁵U', 235.043930]], P = [['⁹⁴Sr', 93.915361], ['¹⁴⁰Xe', 139.921645], ['2 ¹n', 2 * mn]];
    c.rect(14, 14, 330, 330, c.bg, c.grid, 1);
    let fis = 0;
    if (mode === 0) {
      const TT = 6, tt = t % (TT + 1), X = 200, Y = 170;
      if (tt < 1.5) { neut(c, 30 + (X - 34 - 30) * tt / 1.5, Y); nuc(c, X, Y, 34, U, '²³⁵U'); c.text(L_('neutron lent', 'نوترون بطيء'), 40, Y - 14, c.mute, 'left', 12); }
      else if (tt < 2.4) { const k = (tt - 1.5) / 0.9; nuc(c, X, Y, 35, '#3c8f5c', '²³⁶U*', 1 + 0.35 * k + 0.08 * Math.sin(tt * 30)); c.text(L_('noyau excité, il se déforme', 'نواة مثارة تتشوه'), X, Y - 52, c.mute, 'center', 12); }
      else {
        const k = Math.min(1, (tt - 2.4) / 2.2), d = 20 + 120 * k;
        flash(c, X, Y, (tt - 2.4) / 1.6, '≈ 185 MeV');
        nuc(c, X - d * 0.9, Y - d * 0.25, 22, F1, 'Sr'); nuc(c, X + d * 0.9, Y + d * 0.25, 26, F2, 'Xe');
        neut(c, X + d * 0.3, Y - d); neut(c, X - d * 0.2, Y + d * 0.95);
        fis = 1;
      }
      c.text('¹n + ²³⁵U → ⁹⁴Sr + ¹⁴⁰Xe + 2 ¹n', 180, 320, c.ink, 'center', 13, true);
    } else {
      const ctrl = mode === 2, gmax = ctrl ? 4 : 4, dt = 1.3, TT = (gmax + 1) * dt, tt = t % (TT + 2), cur = tt / dt;
      const n = g => ctrl ? 1 : 2 ** g, pos = (g, k) => [48 + g * 70, 40 + (k + 0.5) * 276 / n(g)];
      if (ctrl) for (let g = 0; g < gmax; g++) { const x = 48 + g * 70 + 35; c.rect(x - 4, 200, 8, 120, '#7a8496'); }
      for (let g = 0; g <= gmax; g++) for (let k = 0; k < n(g); k++) {
        const [x, y] = pos(g, k), r = ctrl ? 15 : Math.max(5, 15 - g * 2.2), hit = cur >= g + 0.6;
        if (!hit) nuc(c, x, y, r, U, r > 11 ? 'U' : '');
        else { const s = Math.min(1, (cur - g - 0.6) * 2) * r * 0.8; nuc(c, x - s, y - s * 0.4, r * 0.62, F1); nuc(c, x + s, y + s * 0.4, r * 0.7, F2); flash(c, x, y, (cur - g - 0.6) * 1.2, '', 0.35); fis++; }
        if (g < gmax && hit) { // neutrons émis vers la génération suivante
          const k2 = Math.min(1, cur - g - 0.6);
          const tg = ctrl ? [pos(g + 1, 0), [x + 35, 230]] : [pos(g + 1, 2 * k), pos(g + 1, 2 * k + 1)];
          tg.forEach(([x2, y2], j) => { if (k2 < 1 || !(ctrl && j === 1)) neut(c, x + (x2 - x) * k2, y + (y2 - y) * k2); });
        }
      }
      if (ctrl) c.text(L_('barres de contrôle (absorbent 1 neutron)', 'قضبان المراقبة (تمتص نوترونا)'), 30, 336, c.mute, 'left', 11);
    }
    const E1 = bilan(c, 360, 20, R, P, 0, L_('par fission (soit ≈ 0,8 MeV/nucléon)', 'لكل انشطار (≈ 0,8 MeV لكل نوية)'));
    c.text(L_('Nombre de fissions : ', 'عدد الانشطارات : ') + fis, 370, 222, c.ink, 'left', 13, true);
    c.text(L_('Énergie libérée : ', 'الطاقة المحررة : ') + fmt(fis * E1) + ' MeV', 370, 244, '#e08a00', 'left', 13, true);
    c.text(mode === 1 ? L_('Chaque fission en provoque 2 : 1, 2, 4, 8, 16…', 'كل انشطار يحدث 2 : 1، 2، 4، 8، 16…') : mode === 2 ? L_('Un seul neutron par fission continue : k = 1', 'نوترون واحد يتابع لكل انشطار : k = 1') : L_('Les produits sont plus stables (plus près du fer).', 'النواتج أكثر استقرارا (أقرب من الحديد).'), 370, 270, c.ink, 'left', 12);
    c.text(L_('1 g d’uranium 235 ≈ 8×10¹⁰ J ≈ 2 t de pétrole', '1 g من الأورانيوم 235 ≈ 8×10¹⁰ J ≈ 2 t من البترول'), 370, 296, c.mute, 'left', 12);
    return [L_('La fission est provoquée par un neutron lent : un noyau lourd se casse en deux noyaux plus légers et libère 2 ou 3 neutrons.', 'الانشطار يحدثه نوترون بطيء : نواة ثقيلة تنقسم إلى نواتين أخف وتحرر 2 أو 3 نوترونات.'),
      L_('La masse des produits est inférieure à celle des réactifs : la masse perdue devient énergie, E = |Δm|·c².', 'كتلة النواتج أصغر من كتلة المتفاعلات : الكتلة المفقودة تتحول إلى طاقة، E = |Δm|·c².'),
      mode === 1 ? L_('Sans contrôle, le nombre de fissions double à chaque génération : explosion (bombe).', 'بدون مراقبة، عدد الانشطارات يتضاعف في كل جيل : انفجار (قنبلة).')
        : mode === 2 ? L_('Dans une centrale, les barres de contrôle (bore, cadmium) absorbent les neutrons en trop : la puissance reste constante.', 'في المحطة، قضبان المراقبة (البور، الكادميوم) تمتص النوترونات الزائدة : القدرة تبقى ثابتة.')
          : L_('Les neutrons émis peuvent provoquer d’autres fissions (réaction en chaîne).', 'النوترونات المحررة يمكن أن تحدث انشطارات أخرى (تفاعل متسلسل).')];
  });

  /* ---------- Fusion deutérium + tritium ---------- */
  S('fusion', [['T', ['température (millions de K)', 'درجة الحرارة (مليون K)'], 1, 300, 1, 20]], 1, (c, v, t) => {
    const P1 = '#d93a4a', He = '#e6a817', thr = 100;
    const R = [['²H', 2.014102], ['³H', 3.016049]], P = [['⁴He', 4.002603], ['¹n', mn]];
    c.rect(14, 14, 330, 330, c.bg, c.grid, 1);
    const ok = v.T >= thr, TT = 4, tt = t % (TT + 0.8), Y = 150, X = 180, r1 = 13, r2 = 16;
    const dmin = ok ? 0 : (r1 + r2) + 90 * (1 - v.T / thr);
    const tm = 1.6; let d;
    if (tt < tm) d = 260 - (260 - Math.max(dmin, r1 + r2 - 4)) * Math.sin(tt / tm * Math.PI / 2);
    else d = ok ? 0 : Math.max(dmin, r1 + r2 - 4) + (260 - dmin) * Math.sin((tt - tm) / (TT - tm) * Math.PI / 2);
    if (!ok || tt < tm) {
      nuc(c, X - d / 2, Y, r1, P1); nuc(c, X + d / 2, Y, r2, P1); c.text('²H', X - d / 2, Y + 32, c.ink, 'center', 13, true); c.text('³H', X + d / 2, Y + 35, c.ink, 'center', 13, true);
      if (!ok && tt > tm * 0.8 && tt < tm * 1.3) { c.text(L_('répulsion électrique !', 'تنافر كهربائي !'), X, Y - 34, c.d, 'center', 13, true); c.arrow(X - d / 2 - 14, Y, X - d / 2 - 40, Y, c.d, ''); c.arrow(X + d / 2 + 16, Y, X + d / 2 + 42, Y, c.d, ''); }
    } else {
      const k = Math.min(1, (tt - tm) / 2);
      flash(c, X, Y, (tt - tm) / 1.4, '17,6 MeV');
      nuc(c, X - 40 * k, Y + 10 * k, 17, He); c.text('⁴He', X - 40 * k, Y + 10 * k + 34, c.ink, 'center', 13, true); neut(c, X + 150 * k, Y - 40 * k); c.text('n', X + 150 * k + 9, Y - 40 * k - 6, c.ink, 'left', 11, true);
    }
    c.text('²H + ³H → ⁴He + ¹n', X, 216, c.ink, 'center', 13, true);
    // barrière de potentiel
    const bx = [30, 236, 330, 330];
    c.line(36, 330, 330, 330, c.ink, 1.5); c.line(36, 330, 36, 240, c.ink, 1.5);
    c.text(L_('énergie', 'الطاقة'), 30, 234, c.mute, 'left', 11); c.text(L_('distance', 'المسافة'), 328, 342, c.mute, 'right', 11);
    const ctx = c.ctx; ctx.save(); ctx.strokeStyle = c.d; ctx.lineWidth = 2; ctx.beginPath();
    for (let x = 60; x <= 326; x += 3) { const y = 330 - Math.min(80, 2600 / (x - 40)); x === 60 ? ctx.moveTo(x, 330 - 6) : ctx.lineTo(x, y); }
    ctx.stroke(); ctx.restore();
    c.line(42, 330 - 6, 60, 330 - 6, c.d, 2);
    const ek = 330 - Math.min(88, v.T / thr * 80);
    c.line(42, ek, 326, ek, c.c, 2, [6, 4]); c.text(L_('énergie d’agitation', 'طاقة التحريك'), 326, ek - 5, c.c, 'right', 11, true);
    const E1 = bilan(c, 360, 20, R, P, 0, L_('soit ≈ 3,5 MeV/nucléon (fission : 0,8)', 'أي ≈ 3,5 MeV لكل نوية (الانشطار : 0,8)'));
    c.text(ok ? L_('Fusion : les noyaux franchissent la barrière', 'اندماج : النوى تجتاز الحاجز') : L_('Pas de fusion : température insuffisante', 'لا اندماج : درجة حرارة غير كافية'), 370, 222, ok ? c.c : c.d, 'left', 13, true);
    c.text(L_('Il faut environ 10⁸ K (100 millions de degrés).', 'يلزم حوالي 10⁸ K (100 مليون درجة).'), 370, 246, c.mute, 'left', 12);
    c.text(L_('Dans le Soleil : 4 ¹H → ⁴He + 2 e⁺ (≈ 26,7 MeV)', 'في الشمس : 4 ¹H → ⁴He + 2 e⁺ (≈ 26,7 MeV)'), 370, 270, c.mute, 'left', 12);
    return [L_('Deux noyaux légers s’unissent pour former un noyau plus lourd et plus stable.', 'نواتان خفيفتان تتحدان لتكوين نواة أثقل وأكثر استقرارا.'),
      L_('Les noyaux sont chargés positivement et se repoussent : il faut une très haute température pour qu’ils se rapprochent assez.', 'النوى موجبة الشحنة وتتنافر : يلزم درجة حرارة مرتفعة جدا لتقترب بما يكفي.'),
      L_('La masse perdue Δm devient énergie : E = |Δm|·c² ≈ ', 'الكتلة المفقودة Δm تتحول إلى طاقة : E = |Δm|·c² ≈ ') + fmt(E1) + ' MeV.',
      L_('Avantages : combustible abondant (eau de mer), peu de déchets radioactifs. Recherche : projet ITER.', 'المزايا : وقود وفير (ماء البحر)، نفايات مشعة قليلة. البحث : مشروع ITER.')];
  });
})();
