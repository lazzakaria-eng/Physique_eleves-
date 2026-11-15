/* Simulations supplémentaires : décantation, hydrodistillation, relativité du mouvement */
'use strict';

/* ---------- Extraction liquide – liquide (ampoule à décanter) ---------- */
const SOLVANTS = [
  { n: ['cyclohexane', 'سيكلوهكسان'], d: 0.78, mis: false, col: '#a64ca6' },
  { n: ['dichlorométhane', 'ثنائي كلورو الميثان'], d: 1.33, mis: false, col: '#8e3fa0' },
  { n: ['éthanol', 'الإيثانول'], d: 0.79, mis: true, col: '#c99a3a' },
];
function funnelPath(ctx, cx, top) {
  ctx.beginPath();
  ctx.moveTo(cx - 14, top); ctx.lineTo(cx - 14, top + 30);
  ctx.bezierCurveTo(cx - 95, top + 80, cx - 85, top + 175, cx - 10, top + 230);
  ctx.lineTo(cx - 6, top + 250); ctx.lineTo(cx + 6, top + 250); ctx.lineTo(cx + 10, top + 230);
  ctx.bezierCurveTo(cx + 85, top + 175, cx + 95, top + 80, cx + 14, top + 30);
  ctx.lineTo(cx + 14, top); ctx.closePath();
}
S('decantation', [['s', ['Solvant extracteur', 'المذيب المستخلص'], SOLVANTS.map(x => x.n), 0], ['ve', 'V(eau) (mL)', 20, 60, 5, 40], ['vs', 'V(solvant) (mL)', 10, 50, 5, 25]], 1, (c, v, t) => {
  const sol = SOLVANTS[v.s], ctx = c.ctx, T = 12, tt = t % T, top = 40;
  const phase = tt < 1.5 ? 0 : tt < 4 ? 1 : tt < 7 ? 2 : 3; // 0 ajout, 1 agitation, 2 décantation, 3 soutirage
  const shake = phase === 1 ? Math.sin(tt * 30) * 7 : 0, cx = 230 + shake;
  const bottomY = top + 228, pxml = 1.9, wat = '#7fb8e6', iode = '#c98a2b';
  const drain = phase === 3 ? Math.min(1, (tt - 7) / 4) : 0;
  const lowerIsWater = sol.d > 1 ? false : true;
  const vLow = lowerIsWater ? v.ve : v.vs, vUp = lowerIsWater ? v.vs : v.ve;
  const vLowLeft = sol.mis ? 0 : vLow * (1 - drain);
  ctx.save(); funnelPath(ctx, cx, top); ctx.clip();
  if (sol.mis) {
    const h = (v.ve + v.vs) * pxml * (1 - drain);
    c.rect(cx - 100, bottomY - h, 200, h, phase >= 2 ? '#c9a06a' : phase === 1 ? '#c9a06a' : wat);
  } else {
    const hLow = vLowLeft * pxml, hUp = vUp * pxml * (phase === 3 && drain >= 1 ? 1 : 1);
    const yLowTop = bottomY - hLow, yUpTop = yLowTop - hUp;
    const iodeInWater = phase === 0 ? 1 : phase === 1 ? 1 - (tt - 1.5) / 2.5 * 0.85 : 0.15;
    const waterCol = iodeInWater > 0.5 ? iode : '#b9cfe6', orgCol = phase === 0 ? '#e9e2f0' : sol.col;
    const colLow = lowerIsWater ? waterCol : orgCol, colUp = lowerIsWater ? orgCol : waterCol;
    if (phase === 1) { // émulsion
      c.rect(cx - 100, yUpTop, 200, hLow + hUp, '#c6b3cf');
      for (let i = 0; i < 40; i++) c.circ(cx - 60 + (i * 37) % 120, yUpTop + 6 + (i * 53) % Math.max(8, hLow + hUp - 12), 4, i % 2 ? sol.col : wat);
    } else {
      if (phase === 0) { // le solvant vient d'être ajouté : pas encore de séparation nette
        c.rect(cx - 100, yLowTop, 200, hLow, colLow); c.rect(cx - 100, yUpTop, 200, hUp, colUp);
      } else {
        const settle = phase === 2 ? Math.min(1, (tt - 4) / 1.5) : 1;
        c.rect(cx - 100, yLowTop, 200, hLow, colLow); c.rect(cx - 100, yUpTop, 200, hUp, colUp);
        if (settle < 1) for (let i = 0; i < 20; i++) c.circ(cx - 55 + (i * 37) % 110, yUpTop + 8 + ((i * 41) % Math.max(8, hLow + hUp - 16)) * (1 - settle), 3, i % 2 ? sol.col : wat);
      }
      c.line(cx - 100, yLowTop, cx + 100, yLowTop, c.ink, 1.5, [5, 3]);
    }
  }
  ctx.restore();
  funnelPath(ctx, cx, top); ctx.strokeStyle = c.ink; ctx.lineWidth = 2.5; ctx.stroke();
  c.rect(cx - 18, top - 10, 36, 12, c.mute); // bouchon
  c.rect(cx - 22, bottomY + 18, 44, 8, c.ink); c.line(cx, bottomY + 22, cx, bottomY + 70, c.ink, 3); // robinet + tige
  c.text(phase === 3 ? T_('robinet ouvert', 'الصنبور مفتوح') : T_('robinet fermé', 'الصنبور مغلق'), cx - 30, bottomY + 26, c.mute, 'right', 11);
  // bécher
  const bx = cx - 45, by = 300, low = sol.mis ? 0 : vLow * drain * 0.5;
  c.line(bx, by - 50, bx, by + 40); c.line(bx, by + 40, bx + 90, by + 40); c.line(bx + 90, by + 40, bx + 90, by - 50);
  if (low > 0) c.rect(bx + 1, by + 40 - low, 88, low, lowerIsWater ? '#b9cfe6' : sol.col);
  if (phase === 3 && drain < 1 && !sol.mis) for (let k = 0; k < 3; k++) c.circ(cx, bottomY + 74 + ((tt * 80 + k * 15) % 30), 3, lowerIsWater ? '#7fb8e6' : sol.col);
  // légende
  const lx = 400;
  c.text(['1. Ajout du solvant', '2. Agitation (dégazer)', '3. Décantation', '4. Soutirage de la phase inférieure'][phase], lx, 50, c.a, 'left', 14, true);
  if (!sol.mis) {
    c.rect(lx, 80, 18, 14, sol.col); c.text(T_('phase organique (d = ', 'الطور العضوي (d = ') + fmt(sol.d) + ')', lx + 26, 92, c.ink, 'left', 12);
    c.rect(lx, 104, 18, 14, '#b9cfe6'); c.text(T_('phase aqueuse (d = 1)', 'الطور المائي (d = 1)'), lx + 26, 116, c.ink, 'left', 12);
    c.text(T_('en haut : ', 'في الأعلى : ') + (lowerIsWater ? T_('phase organique', 'الطور العضوي') : T_('phase aqueuse', 'الطور المائي')), lx, 150, c.ink, 'left', 13, true);
  } else c.text(T_('Une seule phase : pas de séparation !', 'طور واحد : لا يحدث الفصل !'), lx, 90, c.b, 'left', 13, true);
  return [T_('Solvant : ', 'المذيب : ') + T_(sol.n[0], sol.n[1]) + ' (d = ' + fmt(sol.d) + ')',
    sol.mis ? T_('Solvant miscible à l’eau : il ne convient pas pour une extraction.', 'مذيب يمتزج بالماء : لا يصلح للاستخلاص.')
      : T_('Non miscible à l’eau ; le diiode y est plus soluble que dans l’eau : il passe dans la phase organique.', 'لا يمتزج بالماء ؛ ثنائي اليود أكثر ذوبانا فيه : ينتقل إلى الطور العضوي.'),
    sol.mis ? '' : T_('La phase la moins dense surnage : ', 'الطور الأقل كثافة يطفو : ') + (lowerIsWater ? T_('la phase organique est en haut.', 'الطور العضوي في الأعلى.') : T_('la phase organique est en bas.', 'الطور العضوي في الأسفل.'))].filter(Boolean);
});

/* ---------- Hydrodistillation ---------- */
const PLANTES = [
  { n: ['lavande', 'الخزامى'], r: 0.012, col: '#8a6bc9' },
  { n: ['menthe', 'النعناع'], r: 0.006, col: '#3d9a5b' },
  { n: ['eucalyptus', 'الكاليتوس'], r: 0.02, col: '#5f9a7d' },
  { n: ['clou de girofle', 'القرنفل'], r: 0.15, col: '#7a4b2a' },
];
S('hydrodistillation', [['p', ['Plante', 'النبتة'], PLANTES.map(x => x.n), 0], ['m', 'm(plante) (g)', 20, 200, 10, 100], ['P', ['Chauffage (%)', 'التسخين (%)'], 0, 100, 5, 70]], 1, (c, v, t) => {
  const pl = PLANTES[v.p], ctx = c.ctx, T = 14, tt = t % T, heat = v.P / 100;
  const temp = heat <= 0 ? 20 : Math.min(100, 20 + tt * 40 * heat), boiling = temp >= 100;
  const tb = boiling ? tt - 80 / (40 * heat) : 0, Vd = boiling ? Math.min(60, tb * 9 * heat) : 0; // mL de distillat
  const Vh = Math.min(v.m * pl.r / 0.9, Vd * 0.08); // mL d'huile essentielle (d ≈ 0,9)
  // chauffe-ballon et ballon
  c.rect(60, 280, 150, 40, c.mute); c.text(T_('chauffe-ballon', 'مسخن الدورق'), 135, 305, '#fff', 'center', 11, true);
  if (heat > 0) for (let k = 0; k < 5; k++) c.line(80 + k * 27, 278, 80 + k * 27, 270, '#e5533d', 3);
  c.circ(135, 225, 58, '#d6e8f7', c.ink, 2.5);
  ctx.save(); ctx.beginPath(); ctx.arc(135, 225, 57, 0, 2 * Math.PI); ctx.clip();
  c.rect(70, 225, 130, 70, '#7fb8e6');
  for (let i = 0; i < 9; i++) c.poly([[95 + (i * 23) % 80, 240 + (i * 13) % 35], [103 + (i * 23) % 80, 236 + (i * 13) % 35], [100 + (i * 23) % 80, 248 + (i * 13) % 35]], pl.col);
  if (boiling) for (let i = 0; i < 10; i++) c.circ(90 + (i * 31) % 90, 285 - ((tt * 60 + i * 23) % 60), 3, '#fff');
  ctx.restore();
  c.rect(125, 120, 20, 55, '#eef4fb', c.ink, 2);
  c.text(fmt(temp, 3) + ' °C', 110, 140, c.b, 'right', 13, true); c.line(112, 135, 124, 135, c.b, 1.5);
  // tête de colonne et réfrigérant incliné
  c.line(125, 120, 125, 95, c.ink, 2); c.line(145, 120, 145, 105, c.ink, 2); c.line(125, 95, 210, 95, c.ink, 2); c.line(145, 105, 210, 105, c.ink, 2);
  const x1 = 210, y1 = 100, x2 = 470, y2 = 215;
  ctx.save(); ctx.translate(x1, y1); ctx.rotate(Math.atan2(y2 - y1, x2 - x1));
  const L = Math.hypot(x2 - x1, y2 - y1);
  c.rect(20, -18, L - 40, 36, '#cfe6fb', c.ink, 2); c.rect(0, -5, L, 10, '#f4f8fd', c.ink, 1.5);
  if (boiling) for (let k = 0; k < 6; k++) c.circ(((tt * 90 + k * 40) % L), 0, 3, '#c7d6e6');
  for (let k = 0; k < 5; k++) c.arrow(L - 40 - ((tt * 50 + k * 45) % (L - 60)), -12, L - 52 - ((tt * 50 + k * 45) % (L - 60)), -12, '#2e75b6', '', 1.5);
  ctx.restore();
  c.text(T_('réfrigérant à eau', 'المبرد المائي'), 330, 130, c.a, 'left', 12, true);
  c.text(T_('eau froide', 'ماء بارد'), 455, 255, '#2e75b6', 'left', 11); c.arrow(455, 245, 440, 228, '#2e75b6', '', 1.5);
  // erlenmeyer / éprouvette : distillat
  const ex = 500, ey = 330;
  c.line(ex - 20, ey - 90, ex - 20, ey, c.ink, 2); c.line(ex - 20, ey, ex + 40, ey, c.ink, 2); c.line(ex + 40, ey, ex + 40, ey - 90, c.ink, 2);
  const hw = (Vd - Vh) * 1.3, hh = Vh * 1.3;
  if (hw > 0) c.rect(ex - 19, ey - hw, 58, hw, '#b9d7f0');
  if (hh > 0.5) c.rect(ex - 19, ey - hw - hh, 58, hh, '#f2c94c');
  if (boiling && Vd < 60) c.circ(ex + 10, ey - 95 + ((tt * 70) % 20), 3, '#7fb8e6');
  c.text(T_('distillat', 'المقطر'), ex + 46, ey + 4, c.mute, 'left', 11);
  if (hh > 0.5) c.text(T_('huile essentielle', 'الزيت العطري'), ex + 46, ey - hw - hh / 2 + 4, '#b08500', 'left', 11, true);
  return [T_('Température dans le ballon : ', 'درجة الحرارة في الدورق : ') + fmt(temp, 3) + ' °C' + (boiling ? T_(' (ébullition)', ' (غليان)') : ''),
    T_('Volume de distillat : ', 'حجم المقطر : ') + fmt(Vd, 2) + ' mL ;  ' + T_('huile essentielle : ', 'الزيت العطري : ') + fmt(Vh, 2) + ' mL',
    T_('La vapeur d’eau entraîne l’huile essentielle ; le réfrigérant la condense.', 'بخار الماء يحمل الزيت العطري ؛ والمبرد يكثفه.'),
    T_('L’huile, peu soluble dans l’eau et moins dense (d ≈ 0,9), forme la phase supérieure du distillat.', 'الزيت قليل الذوبان في الماء وأقل كثافة (d ≈ 0,9) : يكون الطور العلوي للمقطر.'),
    heat === 0 ? T_('Allumer le chauffage pour faire bouillir l’eau.', 'شغّل التسخين ليغلي الماء.') : ''].filter(Boolean);
});

/* ---------- Relativité du mouvement ---------- */
S('relativite', [['x', ['Expérience', 'التجربة'], [['passager qui marche', 'مسافر يمشي'], ['balle lâchée dans le train', 'كرة تسقط داخل القطار']], 0],
  ['ref', ['Référentiel', 'المرجع'], [['le quai (sol)', 'الرصيف (الأرض)'], ['le train', 'القطار']], 0],
  ['vt', 'v(train) (m/s)', 0, 20, 1, 10], ['vp', 'v(passager / train) (m/s)', -3, 3, 0.5, 1.5]], 1, (c, v, t) => {
  const T = 4.5, tt = t % T, sc = 6, ground = v.ref === 0, ctx = c.ctx;
  const xTrain0 = 60, xT = ground ? xTrain0 + v.vt * tt * sc : 200;                 // position du train à l'écran
  const xQuai = ground ? 0 : -v.vt * tt * sc;                                      // décalage du décor
  // décor (quai, poteaux, observateur)
  c.rect(0, 300, 640, 60, '#d9d4c7'); c.line(0, 300, 640, 300, c.ink, 2);
  for (let k = -2; k < 14; k++) { const px = ((k * 90 + xQuai) % 1170 + 1170) % 1170 - 60; c.line(px, 300, px, 220, c.mute, 3); c.circ(px, 216, 5, '#f2c94c'); }
  const ox = 120 + xQuai; if (ox > -20 && ox < 660) { c.circ(ox, 252, 8, null, c.ink, 2); c.line(ox, 260, ox, 282, c.ink, 2); c.line(ox, 282, ox - 7, 298, c.ink, 2); c.line(ox, 282, ox + 7, 298, c.ink, 2); c.line(ox - 9, 268, ox + 9, 268, c.ink, 2); c.text(T_('observateur', 'ملاحظ'), ox, 240, c.mute, 'center', 11); }
  // train
  const tw = 260, ty = 170;
  c.rect(xT, ty, tw, 110, '#2e75b6', c.ink, 2); for (let k = 0; k < 5; k++) c.rect(xT + 14 + k * 50, ty + 14, 36, 30, '#dcebf8');
  c.circ(xT + 40, 286, 12, c.ink); c.circ(xT + tw - 40, 286, 12, c.ink);
  const trace = [];
  if (v.x === 0) { // passager qui marche dans le couloir
    const xp = 30 + v.vp * tt * sc, X = xT + clamp(xp, 10, tw - 10);
    for (let k = 0; k <= 9; k++) { const tk = tt * k / 9, xTk = ground ? xTrain0 + v.vt * tk * sc : 200; trace.push([xTk + clamp(30 + v.vp * tk * sc, 10, tw - 10), ty + 92]); }
    trace.forEach(p => c.circ(p[0], p[1], 3, c.d));
    c.circ(X, ty + 58, 7, '#ffd27a', c.ink, 1.5); c.line(X, ty + 65, X, ty + 88, c.ink, 2.5); c.line(X, ty + 88, X - 6, ty + 104, c.ink, 2); c.line(X, ty + 88, X + 6, ty + 104, c.ink, 2);
    const vRel = ground ? v.vt + v.vp : v.vp;
    if (Math.abs(vRel) > 0.01) c.arrow(X, ty + 48, X + vRel * 5, ty + 48, c.b, 'v', 2.5);
    c.text(T_('Référentiel : ', 'المرجع : ') + (ground ? T_('le quai', 'الرصيف') : T_('le train', 'القطار')), 20, 30, c.a, 'left', 15, true);
    return [T_('Vitesse du passager par rapport au train : ', 'سرعة المسافر بالنسبة للقطار : ') + fmt(v.vp) + ' m/s',
      T_('Vitesse du passager par rapport au quai : ', 'سرعة المسافر بالنسبة للرصيف : ') + fmt(v.vt) + ' + (' + fmt(v.vp) + ') = ' + fmt(v.vt + v.vp) + ' m/s',
      T_('Le même passager a deux vitesses différentes : le mouvement dépend du référentiel.', 'نفس المسافر له سرعتان مختلفتان : الحركة تتعلق بالمرجع.'),
      v.vp === 0 ? T_('Passager assis : immobile par rapport au train, en mouvement par rapport au quai.', 'مسافر جالس : ساكن بالنسبة للقطار، متحرك بالنسبة للرصيف.') : ''].filter(Boolean);
  }
  // balle lâchée du plafond du wagon
  const h = 1.8, g = 9.8, tf = Math.sqrt(2 * h / g), tl = Math.min(tt, tf), H = 100;
  const yb = (u) => ty + 8 + (0.5 * g * u * u) / h * (H - 10), xb = (u) => (ground ? xTrain0 + v.vt * u * sc : 200) + 150;
  for (let k = 0; k <= 12; k++) { const u = tl * k / 12; c.circ(xb(u), yb(u), 3, c.d); }
  c.circ(xb(tl), yb(tl), 7, c.b);
  c.text(T_('Référentiel : ', 'المرجع : ') + (ground ? T_('le quai', 'الرصيف') : T_('le train', 'القطار')), 20, 30, c.a, 'left', 15, true);
  c.text(T_('trajectoire de la balle', 'مسار الكرة'), 20, 52, c.d, 'left', 13, true);
  return [ground ? (v.vt > 0 ? T_('Par rapport au quai : la trajectoire est une courbe (parabole).', 'بالنسبة للرصيف : المسار منحن (شلجم).') : T_('Train à l’arrêt : chute verticale dans les deux référentiels.', 'القطار متوقف : سقوط رأسي في المرجعين.'))
    : T_('Par rapport au train : la balle tombe verticalement (trajectoire rectiligne).', 'بالنسبة للقطار : الكرة تسقط رأسيا (مسار مستقيم).'),
    T_('La trajectoire d’un même objet dépend du référentiel choisi.', 'مسار نفس الجسم يتعلق بالمرجع المختار.'),
    T_('Durée de la chute : ', 'مدة السقوط : ') + fmt(tf) + ' s ;  ' + T_('le train avance de ', 'يتقدم القطار بـ ') + fmt(v.vt * tf) + ' m'];
});
function T_(fr, ar) { return SIM_LANG === 'ar' ? ar : fr; }
