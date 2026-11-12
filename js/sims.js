/* Simulations interactives — chaque simulation : paramètres + fonction de dessin */
'use strict';
const { sin, cos, tan, sqrt, exp, abs, min, max, atan2, atan, asin, log10, floor, round, hypot, PI } = Math;
const g0 = 9.81, MU0 = 4e-7 * PI;
const rad = d => d * PI / 180, deg = r => r * 180 / PI;
const clamp = (x, a, b) => max(a, min(b, x));

function fmt(x, n = 3) {
  if (!isFinite(x)) return '∞';
  if (x === 0) return '0';
  const a = abs(x);
  if (a >= 1e4 || a < 1e-2) {
    let e = floor(log10(a)), m = x / 10 ** e, ms = m.toFixed(n - 1);
    if (abs(+ms) >= 10) { ms = (m / 10).toFixed(n - 1); e++; }
    return ms.replace('.', ',') + '×10^{' + e + '}';
  }
  return String(+x.toPrecision(n)).replace('.', ',');
}
const plain = s => String(s).replace(/×10\^\{(-?\d+)\}/g, 'e$1').replace(/[_^]\{([^}]*)\}/g, '$1').replace(/_/g, '');
let SIM_LANG = 'fr';
const T = (fr, ar) => SIM_LANG === 'ar' ? ar : fr;

function wlColor(l) {
  let r = 0, g = 0, b = 0;
  if (l < 380 || l > 780) return '#8a8f98';
  if (l < 440) { r = (440 - l) / 60; b = 1; } else if (l < 490) { g = (l - 440) / 50; b = 1; }
  else if (l < 510) { g = 1; b = (510 - l) / 20; } else if (l < 580) { r = (l - 510) / 70; g = 1; }
  else if (l < 645) { r = 1; g = (645 - l) / 65; } else r = 1;
  return `rgb(${r * 255 | 0},${g * 255 | 0},${b * 255 | 0})`;
}
const tempColor = th => `hsl(${220 - clamp(th, 0, 100) * 2.2},75%,55%)`;

/* ---------- aide au dessin ---------- */
function makeG(ctx, W, H, col) {
  const c = Object.assign({ ctx, W, H }, col);
  c.line = (x1, y1, x2, y2, s = c.ink, w = 2, dash) => {
    ctx.beginPath(); ctx.setLineDash(dash || []); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
    ctx.strokeStyle = s; ctx.lineWidth = w; ctx.stroke(); ctx.setLineDash([]);
  };
  c.text = (t, x, y, s = c.ink, al = 'left', sz = 13, b) => {
    ctx.font = (b ? '600 ' : '') + sz + 'px system-ui,-apple-system,"Segoe UI",sans-serif';
    ctx.textAlign = al; ctx.fillStyle = s; ctx.fillText(plain(t), x, y);
  };
  c.arrow = (x1, y1, x2, y2, s = c.a, label, w = 2.5) => {
    const d = hypot(x2 - x1, y2 - y1); if (d < 2) return;
    c.line(x1, y1, x2, y2, s, w);
    const a = atan2(y2 - y1, x2 - x1), h = min(10, d * 0.5);
    ctx.beginPath(); ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - h * cos(a - 0.4), y2 - h * sin(a - 0.4));
    ctx.lineTo(x2 - h * cos(a + 0.4), y2 - h * sin(a + 0.4));
    ctx.closePath(); ctx.fillStyle = s; ctx.fill();
    if (label) { const lf = cos(a) < -0.3; c.text(label, x2 + 9 * cos(a) + (lf ? -3 : 3), y2 + 9 * sin(a) + 4, s, lf ? 'right' : 'left', 13, true); }
  };
  c.circ = (x, y, r, f, s, w = 1.5) => {
    ctx.beginPath(); ctx.arc(x, y, max(0, r), 0, 2 * PI);
    if (f) { ctx.fillStyle = f; ctx.fill(); } if (s) { ctx.strokeStyle = s; ctx.lineWidth = w; ctx.stroke(); }
  };
  c.rect = (x, y, w, h, f, s, lw = 1.5) => {
    if (f) { ctx.fillStyle = f; ctx.fillRect(x, y, w, h); }
    if (s) { ctx.strokeStyle = s; ctx.lineWidth = lw; ctx.strokeRect(x, y, w, h); }
  };
  c.poly = (pts, f, s, w = 1.5) => {
    ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath();
    if (f) { ctx.fillStyle = f; ctx.fill(); } if (s) { ctx.strokeStyle = s; ctx.lineWidth = w; ctx.stroke(); }
  };
  c.axes = (x0, x1, y0, y1, xl, yl, bx) => {
    const [L, Tp, R, B] = bx || [58, 22, W - 22, H - 38];
    c.box = [L, Tp, R, B]; c.rng = [x0, x1, y0, y1];
    c.X = x => L + (x - x0) / (x1 - x0) * (R - L);
    c.Y = y => B - (y - y0) / (y1 - y0) * (B - Tp);
    for (let i = 0; i <= 5; i++) {
      const xv = x0 + i * (x1 - x0) / 5, yv = y0 + i * (y1 - y0) / 5;
      c.line(c.X(xv), Tp, c.X(xv), B, c.grid, 1); c.line(L, c.Y(yv), R, c.Y(yv), c.grid, 1);
      c.text(fmt(xv, 2), c.X(xv), B + 15, c.mute, 'center', 11);
      c.text(fmt(yv, 2), L - 6, c.Y(yv) + 4, c.mute, 'right', 11);
    }
    const ya = (y0 < 0 && y1 > 0) ? c.Y(0) : B, xa = (x0 < 0 && x1 > 0) ? c.X(0) : L;
    c.line(L, ya, R, ya, c.ink, 1.5); c.line(xa, Tp, xa, B, c.ink, 1.5);
    if (xl) c.text(xl, R, B + 30, c.ink, 'right', 12, true);
    if (yl) c.text(yl, L - 4, Tp - 8, c.ink, 'left', 12, true);
  };
  c.curve = (f, s = c.a, w = 2.5, n = 300, dash) => {
    const [L, Tp, R, B] = c.box, [x0, x1] = c.rng;
    ctx.save(); ctx.beginPath(); ctx.rect(L, Tp - 1, R - L, B - Tp + 2); ctx.clip();
    ctx.beginPath(); ctx.setLineDash(dash || []); let pen = false;
    for (let i = 0; i <= n; i++) {
      const x = x0 + i * (x1 - x0) / n, y = f(x);
      if (!isFinite(y)) { pen = false; continue; }
      const px = c.X(x), py = clamp(c.Y(y), Tp - 50, B + 50);
      pen ? ctx.lineTo(px, py) : ctx.moveTo(px, py); pen = true;
    }
    ctx.strokeStyle = s; ctx.lineWidth = w; ctx.lineJoin = 'round'; ctx.stroke(); ctx.setLineDash([]); ctx.restore();
  };
  c.pt = (x, y, s = c.b, r = 5) => c.circ(c.X(x), c.Y(y), r, s, c.bg, 2);
  c.bars = (arr, mx, bx) => {
    const [L, Tp, R, B] = bx, n = arr.length, bw = (R - L) / n;
    c.line(L, B, R, B, c.ink, 1.5);
    arr.forEach((o, i) => {
      const h = clamp(o.val / (mx || 1), 0, 1) * (B - Tp - 18), x = L + i * bw + bw * 0.18;
      c.rect(x, B - h, bw * 0.64, h, o.color);
      c.text(o.label, x + bw * 0.32, B + 16, c.ink, 'center', 12, true);
      c.text(fmt(o.val, 3), x + bw * 0.32, B - h - 5, c.mute, 'center', 11);
    });
  };
  c.spring = (x1, y1, x2, y2, n = 12, s = c.ink, amp = 8) => {
    const dx = x2 - x1, dy = y2 - y1, d = hypot(dx, dy) || 1, nx = -dy / d, ny = dx / d;
    ctx.beginPath(); ctx.moveTo(x1, y1);
    for (let i = 1; i < 2 * n; i++) {
      const k = i / (2 * n), o = (i % 2 ? 1 : -1) * amp;
      ctx.lineTo(x1 + dx * k + nx * o, y1 + dy * k + ny * o);
    }
    ctx.lineTo(x2, y2); ctx.strokeStyle = s; ctx.lineWidth = 2; ctx.lineJoin = 'round'; ctx.stroke();
  };
  c.resistor = (x, y, w, label, vert) => {
    if (vert) { c.rect(x - 9, y, 18, w, c.bg, c.ink, 2); if (label) c.text(label, x + 16, y + w / 2 + 4, c.ink, 'left', 12, true); }
    else { c.rect(x, y - 9, w, 18, c.bg, c.ink, 2); if (label) c.text(label, x + w / 2, y - 15, c.ink, 'center', 12, true); }
  };
  c.battery = (x, y, label) => { // pile verticale, + en haut
    c.rect(x - 14, y - 10, 28, 20, c.bg);
    c.line(x - 13, y - 5, x + 13, y - 5, c.ink, 2.5); c.line(x - 7, y + 5, x + 7, y + 5, c.ink, 4.5);
    c.text('+', x - 26, y - 4, c.b, 'center', 14, true); if (label) c.text(label, x - 22, y + 22, c.ink, 'right', 12, true);
  };
  return c;
}

/* ---------- registre ---------- */
const SIMS = {};
const S = (name, p, anim, draw) => { SIMS[name] = { p, anim, draw }; };
// paramètre : [id, étiquette, min, max, pas, défaut]  ou  [id, étiquette, [[fr,ar],...], défaut]

/* ================= TRONC COMMUN ================= */
S('gravitation', [['mA', 'm_A (×10²⁴ kg)', 1, 10, 0.01, 5.97], ['mB', 'm_B (×10²² kg)', 1, 10, 0.01, 7.35], ['d', 'd (×10⁸ m)', 1, 10, 0.01, 3.84]], 0, (c, v) => {
  const F = 6.67e-11 * v.mA * 1e24 * v.mB * 1e22 / (v.d * 1e8) ** 2;
  const xa = 90, xb = 90 + v.d * 50, y = 190, L = min(15 + 28 * (log10(F) - 17.8), (xb - xa) * 0.46);
  c.line(xa, y, xb, y, c.grid, 1.5, [5, 5]);
  c.circ(xa, y, 16 + v.mA * 1.6, c.a); c.circ(xb, y, 6 + v.mB * 0.9, c.mute);
  c.text('A', xa, y - 40, c.ink, 'center', 14, true); c.text('B', xb, y - 24, c.ink, 'center', 14, true);
  c.arrow(xa, y, xa + L, y, c.b, ''); c.arrow(xb, y, xb - L, y, c.b, '');
  c.text('F_{B/A}', xa + L / 2, y + 24, c.b, 'center', 12, true); c.text('F_{A/B}', xb - L / 2, y - 12, c.b, 'center', 12, true);
  c.line(xa, y + 70, xb, y + 70, c.mute, 1); c.text('d', (xa + xb) / 2, y + 88, c.mute, 'center');
  return ['F_{A/B} = F_{B/A} = ' + fmt(F) + ' N', 'd ×2 ⇒ F ÷4'];
});

S('pression', [['F', 'F (N)', 1, 100, 1, 40], ['S', 'S (cm²)', 1, 100, 1, 20]], 0, (c, v) => {
  const P = v.F / (v.S * 1e-4), w = 30 + sqrt(v.S) * 22, x = 320 - w / 2;
  c.rect(60, 270, 520, 50, c.grid); c.rect(x, 210, w, 60, c.a);
  c.arrow(320, 200 - v.F * 1.5, 320, 208, c.b, 'F');
  for (let i = 0; i < 7; i++) { const xx = x + (i + 0.5) * w / 7; c.arrow(xx, 272, xx, 272 + clamp(P / 2500, 4, 40), c.d, ''); }
  c.text('S', 320, 248, '#fff', 'center', 14, true);
  return ['P = F / S = ' + fmt(P) + ' Pa', 'P = ' + fmt(P / 1e5) + ' bar'];
});

function drawMove(c, v0, a, t, note) {
  const TT = 8, tt = t % (TT + 1), ts = a < 0 ? min(tt, v0 / -a) : min(tt, TT);
  const xf = u => v0 * u + a * u * u / 2, x = xf(ts), vv = v0 + a * ts, sc = 560 / 40, y = 70;
  c.line(40, y + 14, 600, y + 14, c.ink, 2);
  for (let k = 0; k * 0.5 <= ts + 1e-9; k++) { const xx = xf(k * 0.5); if (xx <= 40) c.circ(40 + xx * sc, y, 4, c.mute); }
  if (x <= 40) { c.circ(40 + x * sc, y, 10, c.a); c.arrow(40 + x * sc, y - 18, 40 + x * sc + vv * 12, y - 18, c.b, 'v'); }
  c.axes(0, TT, 0, 40, 't (s)', 'x (m)', [58, 130, 618, 318]);
  c.curve(u => { const us = a < 0 ? min(u, v0 / -a) : u; return xf(us); }, c.a);
  c.pt(min(tt, TT), min(x, 40));
  return ['t = ' + fmt(min(tt, TT), 2) + ' s', 'x = ' + fmt(x) + ' m', 'v = ' + fmt(vv) + ' m/s', note];
}
S('mouvement', [['v0', 'v_0 (m/s)', 0, 5, 0.1, 2], ['a', 'a (m/s²)', -1, 1, 0.05, 0]], 1, (c, v, t) =>
  drawMove(c, v.v0, v.a, t, v.a === 0 ? T('mouvement rectiligne uniforme', 'حركة مستقيمية منتظمة') : v.a > 0 ? T('mouvement accéléré', 'حركة متسارعة') : T('mouvement retardé', 'حركة متباطئة')));
S('inertie', [['v0', 'v_0 (m/s)', 0.5, 5, 0.1, 3], ['f', ['frottement f/m (m/s²)', 'f/m (m/s²)'], 0, 2, 0.05, 0]], 1, (c, v, t) =>
  drawMove(c, v.v0, -v.f, t, v.f === 0 ? 'ΣF = 0 ⇒ v_G = ' + T('constante (MRU)', 'ثابتة') : 'ΣF ≠ 0 ⇒ v_G ' + T('varie', 'تتغير')));

S('ressort', [['m', 'm (g)', 50, 1000, 10, 300], ['k', 'k (N/m)', 10, 100, 1, 30]], 0, (c, v) => {
  const P = v.m / 1000 * g0, dl = P / v.k, x = 150, y0 = 30, ye = y0 + 90 + dl * 180;
  c.rect(90, y0 - 12, 120, 12, c.mute); c.spring(x, y0, x, ye, 12, c.ink, 12);
  c.line(60, y0 + 90, 240, y0 + 90, c.mute, 1, [4, 4]); c.text('l_0', 56, y0 + 94, c.mute, 'right');
  c.rect(x - 22, ye, 44, 36, c.a);
  c.arrow(x, ye + 18, x, ye + 18 - 25 - P * 6, c.c, 'T'); c.arrow(x, ye + 18, x, ye + 18 + 25 + P * 6, c.b, 'P');
  c.axes(0, 1, 0, 10, 'Δl (m)', 'T (N)', [340, 40, 615, 300]);
  c.curve(u => v.k * u, c.a); if (dl <= 1) c.pt(dl, P);
  return ['P = m·g = ' + fmt(P) + ' N', 'T = k·Δl = ' + fmt(P) + ' N', 'Δl = ' + fmt(dl * 100) + ' cm'];
});

S('incline', [['al', 'α (°)', 0, 60, 1, 25], ['m', 'm (kg)', 0.5, 10, 0.5, 4]], 0, (c, v) => {
  const a = rad(v.al), P = v.m * g0, Lg = min(440, 240 / max(sin(a), 0.01)), A = [70, 310];
  const ux = cos(a), uy = -sin(a), nx = -sin(a), ny = -cos(a);
  const Bp = [A[0] + Lg * ux, A[1] + Lg * uy];
  c.poly([A, Bp, [Bp[0], A[1]]], c.grid, c.ink);
  const cx = A[0] + Lg * 0.55 * ux + nx * 18, cy = A[1] + Lg * 0.55 * uy + ny * 18, ctx = c.ctx;
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(-a); c.rect(-28, -18, 56, 36, c.a); ctx.restore();
  const k = (40 + v.m * 7) / 1;
  c.arrow(cx, cy, cx, cy + k, c.b, 'P');
  c.arrow(cx, cy, cx + nx * k * cos(a), cy + ny * k * cos(a), c.c, 'R_N');
  c.arrow(cx, cy, cx + ux * k * sin(a), cy + uy * k * sin(a), c.d, 'f');
  c.text('α = ' + v.al + '°', A[0] + 50, A[1] - 6, c.ink);
  return ['P = ' + fmt(P) + ' N', 'R_N = P·cos α = ' + fmt(P * cos(a)) + ' N', 'f = P·sin α = ' + fmt(P * sin(a)) + ' N', 'P + R_N + f = 0'];
});

S('moment', [['m1', 'm_1 (kg)', 0.1, 5, 0.1, 2], ['d1', 'd_1 (m)', 0.1, 1, 0.05, 0.5], ['m2', 'm_2 (kg)', 0.1, 5, 0.1, 1], ['d2', 'd_2 (m)', 0.1, 1, 0.05, 1]], 0, (c, v) => {
  const M1 = v.m1 * g0 * v.d1, M2 = v.m2 * g0 * v.d2, eq = abs(M1 - M2) < 0.02 * (M1 + M2);
  const th = eq ? 0 : rad(18) * clamp((M2 - M1) / (M1 + M2) * 3, -1, 1), ox = 320, oy = 170, ctx = c.ctx;
  c.poly([[ox, oy], [ox - 26, oy + 130], [ox + 26, oy + 130]], c.grid, c.ink);
  ctx.save(); ctx.translate(ox, oy); ctx.rotate(th);
  c.rect(-250, -5, 500, 10, c.mute);
  [[-v.d1, v.m1, c.a, 'm_1'], [v.d2, v.m2, c.b, 'm_2']].forEach(([d, m, col, lb]) => {
    const x = d * 240, s = 18 + m * 6;
    c.line(x, 5, x, 30, c.ink, 1.5); c.rect(x - s / 2, 30, s, s, col); c.text(lb, x, 24 + s + 22, c.ink, 'center', 12, true);
  });
  ctx.restore(); c.circ(ox, oy, 5, c.ink);
  c.text(eq ? T('Équilibre : ΣM = 0', 'توازن : ΣM = 0') : T('Déséquilibre', 'عدم التوازن'), 320, 40, eq ? c.c : c.b, 'center', 16, true);
  return ['M_1 = m_1·g·d_1 = ' + fmt(M1) + ' N·m', 'M_2 = m_2·g·d_2 = ' + fmt(M2) + ' N·m', 'ΣM_Δ = ' + fmt(M1 - M2) + ' N·m'];
});

S('courant', [['I', 'I (A)', 0.05, 2, 0.05, 0.5], ['dt', 'Δt (s)', 1, 60, 1, 10]], 1, (c, v, t) => {
  const x0 = 130, y0 = 70, w = 380, h = 220, per = 2 * (w + h), Q = v.I * v.dt;
  c.rect(x0, y0, w, h, null, c.ink, 2); c.battery(x0, y0 + h / 2, 'G');
  c.circ(x0 + w, y0 + h / 2, 16, c.bg, c.ink, 2); c.text('✕', x0 + w, y0 + h / 2 + 5, c.d, 'center', 16, true);
  for (let i = 0; i < 26; i++) {
    let s = ((i / 26 * per - t * v.I * 90) % per + per) % per, x, y; // électrons : sens inverse
    if (s < w) { x = x0 + s; y = y0; } else if (s < w + h) { x = x0 + w; y = y0 + s - w; }
    else if (s < 2 * w + h) { x = x0 + w - (s - w - h); y = y0 + h; } else { x = x0; y = y0 + h - (s - 2 * w - h); }
    c.circ(x, y, 4, c.a);
  }
  c.arrow(x0 + 130, y0 - 16, x0 + 230, y0 - 16, c.b, 'I');
  c.arrow(x0 + 230, y0 + 22, x0 + 130, y0 + 22, c.a, 'e⁻');
  return ['Q = I·Δt = ' + fmt(Q) + ' C', 'n = Q / e = ' + fmt(Q / 1.6e-19) + ' ' + T('électrons', 'إلكترون')];
});

S('assoc', [['E', 'U (V)', 1, 24, 0.5, 12], ['R1', 'R_1 (Ω)', 10, 1000, 10, 100], ['R2', 'R_2 (Ω)', 10, 1000, 10, 220], ['mode', ['Montage', 'التركيب'], [['série', 'على التوالي'], ['parallèle', 'على التوازي']], 0]], 0, (c, v) => {
  const ser = v.mode === 0, Req = ser ? v.R1 + v.R2 : v.R1 * v.R2 / (v.R1 + v.R2), I = v.E / Req;
  const x0 = 120, x1 = 540, yt = 80, yb = 290;
  c.line(x0, yt, x0, yb); c.line(x0, yb, x1, yb); c.battery(x0, (yt + yb) / 2, 'U');
  if (ser) {
    c.line(x0, yt, x1, yt); c.line(x1, yt, x1, yb);
    c.resistor(190, yt, 110, 'R_1'); c.resistor(370, yt, 110, 'R_2');
    c.arrow(190, yt + 34, 300, yt + 34, c.c, ''); c.text('U_1 = ' + fmt(v.R1 * I) + ' V', 245, yt + 54, c.c, 'center', 12, true);
    c.arrow(370, yt + 34, 480, yt + 34, c.c, ''); c.text('U_2 = ' + fmt(v.R2 * I) + ' V', 425, yt + 54, c.c, 'center', 12, true);
  } else {
    c.line(x0, yt, x1, yt); c.line(360, yt, 360, yb); c.line(x1, yt, x1, yb);
    c.resistor(360, 140, 90, 'R_1', 1); c.resistor(x1, 140, 90, 'R_2', 1);
    c.text('I_1 = ' + fmt(v.E / v.R1 * 1000) + ' mA', 350, 260, c.b, 'right', 12, true);
    c.text('I_2 = ' + fmt(v.E / v.R2 * 1000) + ' mA', x1 - 10, 260, c.b, 'right', 12, true);
  }
  c.arrow(150, yt - 14, 185, yt - 14, c.b, 'I');
  return ['R_{éq} = ' + fmt(Req) + ' Ω', 'I = U / R_{éq} = ' + fmt(I * 1000) + ' mA'].concat(
    ser ? ['U = U_1 + U_2'] : ['I = I_1 + I_2']);
});

S('caract', [['type', ['Dipôle', 'ثنائي القطب'], [['conducteur ohmique', 'موصل أومي'], ['diode', 'صمام ثنائي'], ['diode Zener', 'صمام زينر']], 0], ['R', 'R (Ω)', 20, 500, 10, 100]], 0, (c, v) => {
  c.axes(-8, 8, -100, 100, 'U (V)', 'I (mA)');
  const f = [u => u / v.R * 1000, u => u < 0.6 ? 0 : (u - 0.6) * 250, u => u > 0.6 ? (u - 0.6) * 250 : u < -5 ? (u + 5) * 250 : 0][v.type];
  c.curve(f, c.a, 3, 600);
  return [['U = R·I  (' + T('droite passant par l’origine', 'مستقيم يمر من الأصل') + ')', 'R = ' + v.R + ' Ω'],
  ['U < U_s ≈ 0,6 V ⇒ I = 0 (' + T('bloquée', 'غير مار') + ')', 'U ≥ U_s ⇒ ' + T('passante', 'مار')],
  ['U_s ≈ 0,6 V (' + T('sens direct', 'المنحى المباشر') + ')', 'U_Z = 5 V (' + T('sens inverse', 'المنحى المعاكس') + ')']][v.type];
});

S('generateur', [['E', 'E (V)', 1, 24, 0.5, 9], ['r', 'r (Ω)', 0.5, 10, 0.1, 2], ['R', 'R (Ω)', 0.5, 50, 0.5, 8]], 0, (c, v) => {
  const Icc = v.E / v.r, I = v.E / (v.R + v.r), U = v.R * I;
  c.axes(0, Icc * 1.05, 0, v.E * 1.15, 'I (A)', 'U (V)');
  c.curve(i => v.E - v.r * i, c.a, 3); c.curve(i => v.R * i, c.b, 3);
  c.line(c.X(I), c.Y(U), c.X(I), c.Y(0), c.mute, 1, [4, 4]); c.line(c.X(0), c.Y(U), c.X(I), c.Y(U), c.mute, 1, [4, 4]);
  c.pt(I, U, c.c, 6);
  c.text('U = E − r·I', c.X(Icc * 0.62), c.Y(v.E * 0.38) - 14, c.a, 'left', 12, true);
  c.text('U = R·I', c.X(I) + 10, c.Y(U) - 24, c.b, 'left', 12, true);
  return [T('Point de fonctionnement', 'نقطة الاشتغال') + ' : I = ' + fmt(I) + ' A ; U = ' + fmt(U) + ' V', 'I_{cc} = E / r = ' + fmt(Icc) + ' A',
  'P = U·I = ' + fmt(U * I) + ' W', 'η = U / E = ' + fmt(U / v.E * 100) + ' %'];
});

S('transistor', [['Ib', 'I_B (µA)', 0, 200, 1, 40], ['beta', 'β', 50, 300, 10, 100], ['Rc', 'R_C (Ω)', 100, 2000, 50, 500]], 0, (c, v) => {
  const E = 12, sat = E / v.Rc * 1000, f = ib => min(v.beta * ib / 1000, sat), Ic = f(v.Ib);
  c.axes(0, 200, 0, max(sat * 1.3, 5), 'I_B (µA)', 'I_C (mA)');
  c.curve(f, c.a, 3, 600); c.line(c.X(0), c.Y(sat), c.X(200), c.Y(sat), c.mute, 1, [4, 4]);
  c.text('I_{Csat} = E / R_C', c.X(200) - 6, c.Y(sat) - 6, c.mute, 'right', 12); c.pt(v.Ib, Ic);
  const reg = v.Ib === 0 ? T('bloqué', 'متوقف') : Ic >= sat - 1e-9 ? T('saturé', 'مشبع') : T('linéaire (amplificateur)', 'خطي (مضخم)');
  return ['I_C = ' + fmt(Ic) + ' mA', 'U_{CE} = E − R_C·I_C = ' + fmt(E - v.Rc * Ic / 1000) + ' V  (E = 12 V)', T('Régime : ', 'النظام : ') + reg];
});

S('aop', [['mode', ['Montage', 'التركيب'], [['inverseur', 'عاكس'], ['non inverseur', 'غير عاكس']], 0], ['R1', 'R_1 (kΩ)', 1, 10, 0.5, 2], ['R2', 'R_2 (kΩ)', 1, 50, 0.5, 10], ['Ue', 'U_{em} (V)', 0.1, 5, 0.1, 1]], 0, (c, v) => {
  const G = v.mode === 0 ? -v.R2 / v.R1 : 1 + v.R2 / v.R1, sat = 13;
  c.axes(0, 2, -15, 15, 't / T', 'u (V)');
  const ue = t => v.Ue * sin(2 * PI * t), us = t => clamp(G * ue(t), -sat, sat);
  [sat, -sat].forEach(y => c.line(c.X(0), c.Y(y), c.X(2), c.Y(y), c.mute, 1, [4, 4]));
  c.curve(ue, c.a, 2.5); c.curve(us, c.b, 2.5, 600);
  c.text('u_e', c.X(0.25) + 6, c.Y(ue(0.25)) - 6, c.a, 'left', 13, true);
  c.text('u_s', c.X(v.mode === 0 ? 0.75 : 0.25) + 26, c.Y(clamp(abs(G) * v.Ue, 0, sat)) + 16, c.b, 'left', 13, true);
  return [T('Gain', 'الربح') + ' G = U_s / U_e = ' + fmt(G), 'U_{sm} = ' + fmt(min(abs(G) * v.Ue, sat)) + ' V',
  abs(G) * v.Ue > sat ? T('Saturation : u_s = ±U_{sat}', 'إشباع : u_s = ±U_{sat}') : T('Régime linéaire', 'نظام خطي')];
});

/* ================= 1 BAC SM ================= */
function drawDisk(c, cx, cy, R, th, col) {
  c.circ(cx, cy, R, c.grid, c.ink, 2);
  for (let i = 0; i < 4; i++) c.line(cx, cy, cx + R * cos(th + i * PI / 2), cy - R * sin(th + i * PI / 2), c.mute, 1);
  c.circ(cx, cy, 4, c.ink); c.circ(cx + R * cos(th), cy - R * sin(th), 7, col);
}
S('rotation', [['w', 'ω (rad/s)', 0.5, 10, 0.1, 2], ['R', 'R (m)', 0.1, 1, 0.05, 0.5]], 1, (c, v, t) => {
  const th = v.w * t, Rp = 50 + v.R * 90, cx = 320, cy = 180, vv = v.R * v.w;
  drawDisk(c, cx, cy, Rp, th, c.b);
  const mx = cx + Rp * cos(th), my = cy - Rp * sin(th), k = vv * 14;
  c.arrow(mx, my, mx - k * sin(th), my - k * cos(th), c.b, 'v');
  const hx = cx + Rp / 2 * cos(th), hy = cy - Rp / 2 * sin(th);
  c.circ(hx, hy, 5, c.c); c.arrow(hx, hy, hx - k / 2 * sin(th), hy - k / 2 * cos(th), c.c, '');
  return ['v = R·ω = ' + fmt(vv) + ' m/s', 'T = 2π / ω = ' + fmt(2 * PI / v.w) + ' s', 'f = ' + fmt(v.w / 2 / PI) + ' Hz', 'θ = ω·t = ' + fmt(th % (2 * PI)) + ' rad'];
});

S('travail', [['F', 'F (N)', 0, 50, 1, 30], ['al', 'α (°)', 0, 180, 1, 30], ['d', 'AB (m)', 1, 10, 0.5, 6], ['dt', 'Δt (s)', 1, 20, 1, 4]], 0, (c, v) => {
  const a = rad(v.al), Wk = v.F * v.d * cos(a), xa = 110, xb = xa + v.d * 42, y = 230;
  c.line(40, y + 22, 610, y + 22, c.ink, 2);
  c.rect(xa - 26, y - 20, 52, 42, c.grid, c.mute); c.rect(xb - 26, y - 20, 52, 42, c.a);
  c.arrow(xa, y + 46, xb, y + 46, c.mute, 'AB');
  c.arrow(xb, y, xb + v.F * 2.4 * cos(a), y - v.F * 2.4 * sin(a), c.b, 'F');
  c.line(xb, y, xb + 70, y, c.mute, 1, [4, 4]); c.text('α', xb + 34, y - 6, c.ink);
  c.text('A', xa, y - 28, c.mute, 'center', 13, true); c.text('B', xb, y - 28, c.ink, 'center', 13, true);
  const nat = abs(Wk) < 1e-9 ? T('travail nul', 'شغل منعدم') : Wk > 0 ? T('travail moteur', 'شغل محرك') : T('travail résistant', 'شغل مقاوم');
  return ['W_{AB}(F) = F·AB·cos α = ' + fmt(Wk) + ' J', nat, 'P = W / Δt = ' + fmt(Wk / v.dt) + ' W'];
});

S('energie', [['m', 'm (kg)', 0.5, 5, 0.5, 2], ['h', 'h (m)', 1, 10, 0.5, 6], ['f', 'f (N)', 0, 20, 0.5, 0]], 1, (c, v, t) => {
  const sa = 0.5, L = v.h / sa, a = g0 * sa - v.f / v.m, sc = 17, x0 = 40, yb = 310;
  let s = 0;
  if (a > 0) { const tf = sqrt(2 * L / a), tt = t % (tf + 1.5); s = min(L, a * tt * tt / 2); }
  const top = [x0, yb - v.h * sc], bot = [x0 + L * cos(PI / 6) * sc, yb];
  c.poly([top, bot, [x0, yb]], c.grid, c.ink);
  const bx = top[0] + s * cos(PI / 6) * sc, by = top[1] + s * sa * sc;
  c.circ(bx + 5, by - 11, 10, c.a);
  c.line(x0 - 14, top[1], x0 - 14, yb, c.mute, 1); c.text('h', x0 - 20, (top[1] + yb) / 2, c.mute, 'right');
  const Ec = a > 0 ? v.m * a * s : 0, Ep = v.m * g0 * (v.h - s * sa), Q = v.f * s, E0 = v.m * g0 * v.h;
  c.bars([{ label: 'E_c', val: Ec, color: c.b }, { label: 'E_pp', val: Ep, color: c.a }, { label: 'E_m', val: Ec + Ep, color: c.c }, { label: 'Q', val: Q, color: c.d }], E0, [370, 30, 625, 300]);
  return ['v = ' + fmt(sqrt(2 * Ec / v.m)) + ' m/s', 'E_m = E_c + E_{pp} = ' + fmt(Ec + Ep) + ' J',
    v.f === 0 ? T('Sans frottement : E_m se conserve', 'بدون احتكاك : E_m تنحفظ') : a > 0 ? 'ΔE_m = W(f) = −' + fmt(Q) + ' J' : T('f trop grande : le solide reste immobile', 'الاحتكاك كبير : الجسم يبقى ساكنا')];
});

S('calorimetrie', [['m1', 'm_1 (g)', 50, 500, 10, 200], ['t1', 'θ_1 (°C)', 0, 100, 1, 20], ['m2', 'm_2 (g)', 50, 500, 10, 100], ['t2', 'θ_2 (°C)', 0, 100, 1, 80]], 0, (c, v) => {
  const tf = (v.m1 * v.t1 + v.m2 * v.t2) / (v.m1 + v.m2), ce = 4185;
  const bk = (x, m, th, lb) => {
    const h = m * 0.2; c.rect(x, 290 - h, 110, h, tempColor(th));
    c.line(x, 80, x, 290); c.line(x, 290, x + 110, 290); c.line(x + 110, 290, x + 110, 80);
    c.text(lb, x + 55, 318, c.ink, 'center', 13, true); c.text(fmt(th) + ' °C', x + 55, 70, c.ink, 'center', 13, true);
  };
  bk(60, v.m1, v.t1, 'm_1'); bk(230, v.m2, v.t2, 'm_2');
  c.text('+', 200, 200, c.ink, 'center', 22, true); c.arrow(360, 195, 420, 195, c.ink, '');
  bk(450, v.m1 + v.m2, tf, 'm_1 + m_2');
  const Q1 = v.m1 / 1000 * ce * (tf - v.t1);
  return ['θ_f = (m_1·θ_1 + m_2·θ_2) / (m_1 + m_2) = ' + fmt(tf) + ' °C', 'Q_1 = m_1·c_e·(θ_f − θ_1) = ' + fmt(Q1) + ' J', 'Q_2 = ' + fmt(-Q1) + ' J', 'Q_1 + Q_2 = 0'];
});

S('champE', [['U', 'U (V)', 10, 500, 10, 100], ['d', 'd (cm)', 2, 10, 0.5, 5], ['v0', 'v_0 (×10⁶ m/s)', 5, 30, 0.5, 10], ['q', ['Particule', 'الدقيقة'], [['électron (q = −e)', 'إلكترون (q = −e)'], ['positon (q = +e)', 'بوزيترون (q = +e)']], 0]], 1, (c, v, t) => {
  const sc = 28, x0 = 180, l = 0.10, d = v.d / 100, E = v.U / d, e = 1.6e-19, me = 9.11e-31, a = e * E / me, vv = v.v0 * 1e6;
  const yt = 180 - d * 100 * sc / 2, yb = 180 + d * 100 * sc / 2, sg = v.q === 0 ? -1 : 1; // E vers le bas ; électron dévié vers le haut
  c.rect(x0, yt - 8, l * 100 * sc, 8, c.b); c.rect(x0, yb, l * 100 * sc, 8, c.a);
  c.text('+ + + + +', x0 + 140, yt - 14, c.b, 'center', 13, true); c.text('− − − − −', x0 + 140, yb + 24, c.a, 'center', 13, true);
  for (let i = 0; i < 5; i++) c.arrow(x0 + 30 + i * 55, yt + 6, x0 + 30 + i * 55, min(yb - 6, yt + 6 + 12 + E / 250), c.grid, '');
  c.text('E', x0 + 262, yt + 20, c.mute, 'left', 13, true);
  const yOf = x => 0.5 * a * (x / vv) ** 2, tEnd = l / vv;
  let xHit = l; if (yOf(l) > d / 2) xHit = vv * sqrt(d / a);
  const frac = (t % 3) / 2, xc = min(xHit, frac * l);
  c.ctx.beginPath(); c.ctx.moveTo(60, 180); c.ctx.lineTo(x0, 180);
  for (let i = 0; i <= 60; i++) { const x = xc * i / 60; c.ctx.lineTo(x0 + x * 100 * sc, 180 + sg * yOf(x) * 100 * sc); }
  c.ctx.strokeStyle = c.d; c.ctx.lineWidth = 2; c.ctx.stroke();
  c.circ(x0 + xc * 100 * sc, 180 + sg * yOf(xc) * 100 * sc, 6, c.d);
  const ys = min(yOf(l), d / 2);
  return ['E = U / d = ' + fmt(E) + ' V/m', 'F = |q|·E = ' + fmt(e * E) + ' N', 'a = |q|·E / m = ' + fmt(a) + ' m/s²',
  (xHit < l ? T('La particule touche la plaque', 'الدقيقة تصطدم بالصفيحة') : T('Déviation à la sortie', 'الانحراف عند الخروج') + ' : ' + fmt(ys * 100) + ' cm'),
  'W(F) = −ΔE_{pe} = |q|·E·Δy = ' + fmt(E * ys) + ' eV'];
});

S('boussole', [['I', 'I (mA)', 0, 100, 1, 20], ['n', 'n (spires/m)', 100, 1000, 50, 500]], 0, (c, v) => {
  const Bs = MU0 * v.n * v.I / 1000, BH = 2e-5, al = atan(Bs / BH), cx = 320, cy = 200, k = 3.2e6;
  c.rect(110, cy - 46, 420, 92, null, c.mute, 1.5);
  for (let i = 0; i < 15; i++) c.line(125 + i * 28, cy - 46, 125 + i * 28, cy + 46, c.grid, 3);
  c.text(T('solénoïde (axe ⟂ méridien magnétique)', 'ملف لولبي (المحور ⟂ خط الزوال المغنطيسي)'), 320, cy + 70, c.mute, 'center', 12);
  c.arrow(cx, cy, cx, cy - BH * k, c.c, 'B_H'); c.arrow(cx, cy, cx + min(Bs * k, 280), cy, c.a, 'B_S');
  const ctx = c.ctx; ctx.save(); ctx.translate(cx, cy); ctx.rotate(al);
  c.poly([[0, -52], [9, 0], [-9, 0]], c.b); c.poly([[0, 52], [9, 0], [-9, 0]], c.mute); ctx.restore(); c.circ(cx, cy, 3, c.ink);
  c.text('N', cx, cy - BH * k - 22, c.c, 'center', 13, true);
  return ['B_S = μ_0·n·I = ' + fmt(Bs) + ' T', 'B_H ≈ 2×10^{-5} T', 'tan α = B_S / B_H  ⇒  α = ' + fmt(deg(al)) + '°', 'B = √(B_S² + B_H²) = ' + fmt(hypot(Bs, BH)) + ' T'];
});

S('solenoide', [['I', 'I (A)', 0, 5, 0.1, 2], ['N', 'N (spires)', 100, 1000, 50, 400], ['L', 'L (m)', 0.1, 1, 0.05, 0.4]], 0, (c, v) => {
  const B = MU0 * v.N * v.I / v.L, x0 = 320 - v.L * 240, x1 = 320 + v.L * 240, cy = 180, ctx = c.ctx, nl = clamp(round(v.N / v.L / 60), 6, 40);
  for (let i = 0; i <= nl; i++) { const x = x0 + (x1 - x0) * i / nl; ctx.beginPath(); ctx.ellipse(x, cy, 9, 62, 0, 0, 2 * PI); ctx.strokeStyle = c.d; ctx.lineWidth = 2; ctx.stroke(); }
  const k = clamp(B * 1e3 / 6, 0, 1);
  if (v.I > 0) [-36, -12, 12, 36].forEach(dy => c.arrow(x0 - 40, cy + dy, x1 + 44, cy + dy, c.a, '', 1 + 3 * k));
  c.text('S', x0 - 58, cy + 5, c.a, 'center', 18, true); c.text('N', x1 + 62, cy + 5, c.b, 'center', 18, true);
  c.text('B', 320, cy - 76, c.a, 'center', 14, true); c.text('L', 320, cy + 96, c.mute, 'center');
  c.line(x0, cy + 80, x1, cy + 80, c.mute, 1);
  return ['n = N / L = ' + fmt(v.N / v.L) + ' ' + T('spires/m', 'لفة/m'), 'B = μ_0·n·I = ' + fmt(B * 1000) + ' mT', 'B / B_H ≈ ' + fmt(B / 2e-5)];
});

S('laplace', [['I', 'I (A)', 0, 10, 0.5, 4], ['B', 'B (T)', 0, 1, 0.05, 0.3], ['l', 'ℓ (cm)', 5, 30, 1, 15]], 1, (c, v, t) => {
  const l = v.l / 100, F = v.I * l * v.B, m = 0.05, a = F / m, x0 = 110, hl = v.l * 4, cy = 180;
  for (let i = 0; i < 9; i++) for (let j = 0; j < 4; j++) { const x = 140 + i * 50, y = 75 + j * 70; c.circ(x, y, 7, null, c.grid, 1.5); c.line(x - 5, y - 5, x + 5, y + 5, c.grid, 1.5); c.line(x - 5, y + 5, x + 5, y - 5, c.grid, 1.5); }
  c.line(x0, cy - hl, 580, cy - hl, c.ink, 3); c.line(x0, cy + hl, 580, cy + hl, c.ink, 3);
  let x = 0; if (a > 0) { const tf = sqrt(2 * 1 / a), tt = t % (tf + 1); x = min(1, a * tt * tt / 2); }
  const xr = x0 + 30 + x * 400;
  c.line(xr, cy - hl - 12, xr, cy + hl + 12, c.d, 6);
  c.arrow(xr - 14, cy + hl * 0.6, xr - 14, cy - hl * 0.6, c.b, 'I'); c.arrow(xr, cy, xr + 20 + F * 60, cy, c.c, 'F');
  c.text('B ⊗', 560, 50, c.mute, 'center', 14, true);
  return ['F = I·ℓ·B·sin α = ' + fmt(F) + ' N  (α = 90°)', 'a = F / m = ' + fmt(a) + ' m/s²  (m = 50 g)', T('Sens : règle de la main droite', 'المنحى : قاعدة اليد اليمنى')];
});

S('refraction', [['i', 'i (°)', 0, 89, 1, 40], ['n1', 'n_1', 1, 2.5, 0.01, 1], ['n2', 'n_2', 1, 2.5, 0.01, 1.5]], 0, (c, v) => {
  const i = rad(v.i), ox = 320, oy = 180, Lr = 190, sr = v.n1 * sin(i) / v.n2, tot = sr > 1;
  c.rect(0, oy, 640, 180, c.grid); c.line(0, oy, 640, oy, c.ink, 2); c.line(ox, 10, ox, 350, c.mute, 1, [5, 5]);
  c.text('n_1 = ' + fmt(v.n1), 20, 30, c.ink, 'left', 13, true); c.text('n_2 = ' + fmt(v.n2), 20, 340, c.ink, 'left', 13, true);
  c.arrow(ox - Lr * sin(i), oy - Lr * cos(i), ox, oy, c.b, '', 3);
  c.arrow(ox, oy, ox + Lr * sin(i), oy - Lr * cos(i), c.d, '', tot ? 3 : 1.5);
  c.text('i', ox - 22 * sin(i / 2) - 6, oy - 46, c.b, 'center', 13, true);
  if (!tot) { const r = asin(sr); c.arrow(ox, oy, ox + Lr * sin(r), oy + Lr * cos(r), c.a, '', 3); c.text('r', ox + 12, oy + 50, c.a, 'left', 13, true); }
  const out = ['n_1·sin i = n_2·sin r'];
  out.push(tot ? T('Réflexion totale (i > i_{lim})', 'انعكاس كلي (i > i_{lim})') : 'r = ' + fmt(deg(asin(sr))) + '°');
  if (v.n1 > v.n2) out.push('i_{lim} = ' + fmt(deg(asin(v.n2 / v.n1))) + '°');
  out.push(T('Réflexion : i′ = i = ', 'الانعكاس : i′ = i = ') + v.i + '°');
  return out;
});

S('miroir', [['d', 'HA (m)', 0.3, 2.5, 0.05, 1.5], ['h', 'AB (m)', 0.2, 1.2, 0.05, 0.8]], 0, (c, v) => {
  const mx = 320, ya = 290, sc = 110, xo = mx - v.d * sc, xi = mx + v.d * sc, yt = ya - v.h * sc, eye = [150, 60];
  c.line(mx, 20, mx, 340, c.ink, 4); for (let y = 24; y < 340; y += 12) c.line(mx, y, mx + 8, y + 8, c.mute, 1);
  c.line(20, ya, 620, ya, c.grid, 1);
  c.arrow(xo, ya, xo, yt, c.a, 'B', 3); c.text('A', xo, ya + 18, c.a, 'center', 13, true);
  c.line(xi, ya, xi, yt, c.b, 3, [6, 5]); c.text("B'", xi + 8, yt, c.b, 'left', 13, true); c.text("A'", xi, ya + 18, c.b, 'center', 13, true);
  [[xo, yt], [xo, ya - 2]].forEach(([px, py]) => {
    const ym = eye[1] + (py - eye[1]) * (mx - eye[0]) / (xi - eye[0]);
    c.line(px, py, mx, ym, c.d, 1.8); c.arrow(mx, ym, eye[0], eye[1], c.d, '', 1.8); c.line(mx, ym, xi, py, c.d, 1.2, [4, 4]);
  });
  c.circ(eye[0], eye[1], 9, c.bg, c.ink, 2); c.circ(eye[0] + 3, eye[1], 3, c.ink);
  c.text(T('œil', 'العين'), eye[0] - 14, eye[1] + 4, c.ink, 'right', 12);
  return ["HA' = HA = " + fmt(v.d) + ' m', "A'B' = AB = " + fmt(v.h) + ' m  (γ = +1)', T('Image virtuelle, droite, symétrique de l’objet', 'صورة وهمية، معتدلة، مماثلة للجسم بالنسبة للمرآة')];
});

S('lentille', [['p', 'OA (cm, ←)', 4, 60, 0.5, 30], ['f', "f ′ (cm)", 5, 25, 0.5, 12], ['h', 'AB (cm)', 1, 5, 0.5, 3]], 0, (c, v) => {
  const sc = 5, sy = 14, ox = 320, oy = 180, xo = ox - v.p * sc, yo = oy - v.h * sy;
  c.line(0, oy, 640, oy, c.mute, 1); c.arrow(ox, oy, ox, 30, c.ink, '', 2); c.arrow(ox, oy, ox, 330, c.ink, '', 2);
  [[-v.f, 'F'], [v.f, "F'"]].forEach(([d, lb]) => { c.circ(ox + d * sc, oy, 3, c.ink); c.text(lb, ox + d * sc, oy + 18, c.ink, 'center', 12, true); });
  c.text('O', ox + 6, oy + 16, c.ink, 'left', 12, true);
  c.arrow(xo, oy, xo, yo, c.a, 'B', 3); c.text('A', xo, oy + 18, c.a, 'center', 13, true);
  const inf = abs(v.p - v.f) < 1e-6, pp = inf ? Infinity : v.f * v.p / (v.p - v.f), gam = -pp / v.p;
  const ext = (x1, y1, x2, y2, X) => y1 + (y2 - y1) * (X - x1) / (x2 - x1);
  c.line(xo, yo, ox, yo, c.d, 1.8); c.line(ox, yo, 640, ext(ox, yo, ox + v.f * sc, oy, 640), c.d, 1.8);
  c.line(xo, yo, 640, ext(xo, yo, ox, oy, 640), c.c, 1.8);
  const out = ['1/OA′ − 1/OA = 1/f ′', 'C = 1 / f ′ = ' + fmt(100 / v.f) + ' δ'];
  if (inf) { out.push(T('Objet en F : image à l’infini', 'الجسم في F : الصورة في اللانهاية')); return out; }
  const xi = ox + pp * sc;
  const yim = oy - gam * v.h * sy;
  if (pp < 0) { c.line(ox, yo, xi, yim, c.d, 1.2, [4, 4]); c.line(xo, yo, xi, yim, c.c, 1.2, [4, 4]); }
  c.ctx.save(); c.ctx.beginPath(); c.ctx.rect(0, 0, 640, 360); c.ctx.clip();
  c.arrow(xi, oy, xi, yim, c.b, "B'", 3); c.ctx.restore();
  out.push('OA′ = ' + fmt(pp) + ' cm', 'γ = OA′ / OA = ' + fmt(gam),
    pp > 0 ? T('Image réelle, renversée', 'صورة حقيقية، مقلوبة') + (abs(gam) > 1 ? T(', agrandie', '، مكبرة') : T(', réduite', '، مصغرة')) : T('Image virtuelle, droite, agrandie (loupe)', 'صورة وهمية، معتدلة، مكبرة (مكبرة)'));
  return out;
});
SIMS.loupe = { p: [['p', 'OA (cm, ←)', 4, 60, 0.5, 6], ['f', "f ′ (cm)", 5, 25, 0.5, 10], ['h', 'AB (cm)', 1, 5, 0.5, 2]], anim: 0, draw: SIMS.lentille.draw };

S('bilan', [['E', 'E (V)', 2, 24, 0.5, 12], ['r', 'r (Ω)', 0.5, 5, 0.1, 1], ['Ep', "E′ (V)", 0, 20, 0.5, 6], ['rp', "r′ (Ω)", 0.5, 10, 0.1, 2]], 0, (c, v) => {
  const I = max(0, (v.E - v.Ep) / (v.r + v.rp)), Pt = v.E * I, Pg = v.r * I * I, Pu = v.Ep * I, Pr = v.rp * I * I;
  c.text(T('Générateur (E, r)  →  Récepteur (E′, r′)', 'مولد (E, r)  ←  مستقبل (E′, r′)'), 320, 26, c.ink, 'center', 14, true);
  c.bars([{ label: 'E·I', val: Pt, color: c.a }, { label: 'r·I²', val: Pg, color: c.d }, { label: 'U·I', val: Pt - Pg, color: c.e }, { label: "E′·I", val: Pu, color: c.c }, { label: "r′·I²", val: Pr, color: c.b }], Pt || 1, [70, 44, 570, 310]);
  c.text('(W)', 590, 300, c.mute, 'left', 12);
  return ["I = (E − E′) / (r + r′) = " + fmt(I) + ' A', 'U_{PN} = E − r·I = ' + fmt(v.E - v.r * I) + ' V',
    T('Rendement du générateur', 'مردود المولد') + ' : η = U_{PN} / E = ' + fmt((v.E - v.r * I) / v.E * 100) + ' %',
    T('Rendement global', 'المردود الإجمالي') + " : η = E′ / E = " + fmt(I > 0 ? v.Ep / v.E * 100 : 0) + ' %'];
});

/* ================= 2 BAC PC ================= */
S('onde_pulse', [['F', 'F (N)', 1, 10, 0.5, 4], ['mu', 'μ (g/m)', 10, 100, 5, 40], ['d', 'SM (m)', 1, 9, 0.5, 6]], 1, (c, v, t) => {
  const vel = sqrt(v.F / (v.mu / 1000)), slow = 4, ts = (t / slow) % (10 / vel + 0.25), sc = 56, x0 = 40, y0 = 180;
  const pulse = u => 55 * exp(-((u / 0.35) ** 2)), yy = x => pulse(x - vel * ts + 0.9);
  c.ctx.beginPath(); for (let i = 0; i <= 280; i++) { const x = i / 28; c.ctx[i ? 'lineTo' : 'moveTo'](x0 + x * sc, y0 - yy(x)); }
  c.ctx.strokeStyle = c.a; c.ctx.lineWidth = 3; c.ctx.stroke();
  c.circ(x0, y0 - yy(0), 6, c.b); c.text('S', x0, y0 + 30, c.b, 'center', 13, true);
  const xm = x0 + v.d * sc; c.line(xm, y0 - 80, xm, y0 + 14, c.grid, 1, [4, 4]); c.circ(xm, y0 - yy(v.d), 6, c.d); c.text('M', xm, y0 + 30, c.d, 'center', 13, true);
  c.arrow(x0 + 60, 70, x0 + 60 + vel * 4, 70, c.c, 'v');
  c.text(T('ralenti ×4', 'عرض بطيء ×4'), 600, 30, c.mute, 'right', 12);
  return ['v = √(F / μ) = ' + fmt(vel) + ' m/s', 'τ = SM / v = ' + fmt(v.d / vel) + ' s', 'y_M(t) = y_S(t − τ)', 't = ' + fmt(max(0, ts - 0.9 / vel), 2) + ' s'];
});

S('onde_per', [['f', 'f (Hz)', 1, 10, 0.5, 4], ['v', 'v (m/s)', 1, 10, 0.5, 4], ['d', 'SM (m)', 0, 5, 0.05, 2]], 1, (c, v, t) => {
  const lam = v.v / v.f, ts = t / 8, sc = 112, x0 = 40, y0 = 170, A = 50, y = x => A * sin(2 * PI * (v.f * ts - x / lam));
  c.line(x0, y0, x0 + 5 * sc, y0, c.grid, 1);
  c.ctx.beginPath(); for (let i = 0; i <= 500; i++) { const x = i / 100; c.ctx[i ? 'lineTo' : 'moveTo'](x0 + x * sc, y0 - y(x)); }
  c.ctx.strokeStyle = c.a; c.ctx.lineWidth = 3; c.ctx.stroke();
  c.circ(x0, y0 - y(0), 6, c.b); c.text('S', x0, y0 + 80, c.b, 'center', 13, true);
  c.circ(x0 + v.d * sc, y0 - y(v.d), 6, c.d); c.text('M', x0 + v.d * sc, y0 + 80, c.d, 'center', 13, true);
  if (lam <= 5) { c.line(x0, 300, x0 + lam * sc, 300, c.c, 2); c.line(x0, 294, x0, 306, c.c, 2); c.line(x0 + lam * sc, 294, x0 + lam * sc, 306, c.c, 2); c.text('λ', x0 + lam * sc / 2, 320, c.c, 'center', 14, true); }
  c.text(T('ralenti ×8', 'عرض بطيء ×8'), 600, 30, c.mute, 'right', 12);
  const k = v.d / lam, fr = k - floor(k);
  const ph = (fr < 0.04 || fr > 0.96) ? T('S et M en phase', 'S و M على توافق في الطور') : abs(fr - 0.5) < 0.04 ? T('S et M en opposition de phase', 'S و M على تعاكس في الطور') : '';
  return ['T = 1 / f = ' + fmt(1 / v.f) + ' s', 'λ = v·T = v / f = ' + fmt(lam) + ' m', 'SM / λ = ' + fmt(k), ph].filter(Boolean);
});

S('diffraction', [['lam', 'λ (nm)', 400, 750, 5, 633], ['a', 'a (µm)', 20, 300, 5, 100], ['D', 'D (m)', 1, 3, 0.1, 2]], 0, (c, v) => {
  const th = v.lam * 1e-9 / (v.a * 1e-6), Lw = 2 * th * v.D, col = wlColor(v.lam), half = 0.08;
  const I = x => { const b = PI * x / (th * v.D); return abs(b) < 1e-9 ? 1 : (sin(b) / b) ** 2; };
  c.axes(-half * 100, half * 100, 0, 1.05, 'x (cm)', 'I / I_0', [58, 22, 618, 220]);
  c.curve(x => I(x / 100), col, 2.5, 800);
  c.rect(58, 262, 560, 60, '#000');
  for (let i = 0; i < 560; i++) { const x = (i / 560 * 2 - 1) * half; c.ctx.globalAlpha = min(1, I(x) ** 0.45); c.rect(58 + i, 262, 1.2, 60, col); }
  c.ctx.globalAlpha = 1;
  const xl = 58 + 280 - Lw / 2 / half * 280, xr = 58 + 280 + Lw / 2 / half * 280;
  if (xl > 58) { c.line(xl, 336, xr, 336, c.ink, 1.5); c.text('L', 338, 352, c.ink, 'center', 13, true); }
  return ['θ = λ / a = ' + fmt(th) + ' rad', 'L = 2·λ·D / a = ' + fmt(Lw * 100) + ' cm', T('a ↓ ⇒ tache centrale plus large', 'a ↓ ⇐ البقعة المركزية أعرض')];
});

const RND = (() => { let s = 12345; const a = []; for (let i = 0; i < 200; i++) { s = (s * 1103515245 + 12345) % 2147483648; a.push(-Math.log((s + 1) / 2147483649)); } return a; })();
S('decroissance', [['th', 't_{1/2} (s)', 1, 20, 0.5, 5]], 1, (c, v, t) => {
  const lam = Math.LN2 / v.th, tm = 5 * v.th, tt = t % (tm + 1.5), ts = min(tt, tm), N0 = 200; let n = 0;
  for (let i = 0; i < N0; i++) {
    const alive = RND[i] / lam > ts; if (alive) n++;
    c.circ(34 + (i % 10) * 20, 40 + floor(i / 10) * 14.5, 6, alive ? c.b : c.grid);
  }
  c.axes(0, tm, 0, N0, 't (s)', 'N', [290, 30, 620, 310]);
  c.curve(u => N0 * exp(-lam * u), c.a, 2.5);
  [1, 2, 3].forEach(k => { c.line(c.X(k * v.th), c.Y(0), c.X(k * v.th), c.Y(N0 / 2 ** k), c.mute, 1, [4, 4]); c.line(c.X(0), c.Y(N0 / 2 ** k), c.X(k * v.th), c.Y(N0 / 2 ** k), c.mute, 1, [4, 4]); });
  c.pt(ts, n);
  return ['t = ' + fmt(ts, 2) + ' s', 'N = ' + n + ' / 200   (N_0·e^{−λt} = ' + fmt(N0 * exp(-lam * ts)) + ')', 'λ = ln 2 / t_{1/2} = ' + fmt(lam) + ' s^{-1}', 'τ = 1 / λ = ' + fmt(1 / lam) + ' s', 'a = λ·N = ' + fmt(lam * n) + ' Bq'];
});

const NUC = [['²H', 2, 1.11], ['³H', 3, 2.83], ['³He', 3, 2.57], ['⁴He', 4, 7.07], ['⁶Li', 6, 5.33], ['⁷Li', 7, 5.61], ['⁹Be', 9, 6.46], ['¹¹B', 11, 6.93], ['¹²C', 12, 7.68], ['¹⁴N', 14, 7.48], ['¹⁶O', 16, 7.98], ['¹⁹F', 19, 7.78], ['²⁰Ne', 20, 8.03], ['²³Na', 23, 8.11], ['²⁴Mg', 24, 8.26], ['²⁷Al', 27, 8.33], ['²⁸Si', 28, 8.45], ['³¹P', 31, 8.48], ['³²S', 32, 8.49], ['³⁵Cl', 35, 8.52], ['⁴⁰Ca', 40, 8.55], ['⁵⁶Fe', 56, 8.79], ['⁶²Ni', 62, 8.79], ['⁶³Cu', 63, 8.75], ['⁸⁴Kr', 84, 8.72], ['⁹⁰Zr', 90, 8.71], ['¹⁰⁷Ag', 107, 8.55], ['¹²⁰Sn', 120, 8.50], ['¹³⁸Ba', 138, 8.39], ['¹⁵⁸Gd', 158, 8.20], ['¹⁸⁴W', 184, 8.01], ['¹⁹⁷Au', 197, 7.92], ['²⁰⁸Pb', 208, 7.87], ['²³²Th', 232, 7.62], ['²³⁵U', 235, 7.59], ['²³⁸U', 238, 7.57]];
S('liaison', [['i', ['Noyau', 'النويدة'], 0, NUC.length - 1, 1, 21]], 0, (c, v) => {
  const nu = NUC[v.i];
  c.axes(0, 250, -9, 0, 'A', '−E_ℓ / A (MeV/nucléon)');
  c.ctx.beginPath(); NUC.forEach((n, k) => c.ctx[k ? 'lineTo' : 'moveTo'](c.X(n[1]), c.Y(-n[2]))); c.ctx.strokeStyle = c.a; c.ctx.lineWidth = 2.5; c.ctx.stroke();
  NUC.forEach(n => c.circ(c.X(n[1]), c.Y(-n[2]), 2.5, c.a));
  c.pt(nu[1], -nu[2], c.b, 7); c.text(nu[0], c.X(nu[1]) + 10, c.Y(-nu[2]) - 10, c.b, 'left', 15, true);
  c.arrow(c.X(8), c.Y(-3.4), c.X(34), c.Y(-6.4), c.c, ''); c.text(T('fusion', 'اندماج'), c.X(12), c.Y(-2.9), c.c, 'left', 13, true);
  c.arrow(c.X(240), c.Y(-6.3), c.X(160), c.Y(-7.4), c.d, ''); c.text(T('fission', 'انشطار'), c.X(205), c.Y(-5.8), c.d, 'left', 13, true);
  return [T('Noyau', 'النويدة') + ' : ' + nu[0] + '  (A = ' + nu[1] + ')', 'E_ℓ / A ≈ ' + fmt(nu[2]) + ' MeV/nucléon', 'E_ℓ ≈ ' + fmt(nu[1] * nu[2], 4) + ' MeV',
  T('Plus E_ℓ/A est grande, plus le noyau est stable (max ≈ ⁵⁶Fe, ⁶²Ni)', 'كلما كانت E_ℓ/A أكبر كانت النويدة أكثر استقرارا')];
});

function ordre1(c, tau, ym, rising, yl) {
  c.axes(0, 5 * tau, 0, ym * 1.15, 't (s)', yl);
  const f = rising ? t => ym * (1 - exp(-t / tau)) : t => ym * exp(-t / tau);
  c.line(c.X(0), c.Y(ym), c.X(5 * tau), c.Y(ym), c.mute, 1, [4, 4]);
  c.line(c.X(0), c.Y(rising ? 0 : ym), c.X(tau), c.Y(rising ? ym : 0), c.d, 1.5, [6, 4]);
  c.curve(f, c.a, 3);
  c.line(c.X(tau), c.Y(0), c.X(tau), c.Y(f(tau)), c.mute, 1, [4, 4]); c.line(c.X(0), c.Y(f(tau)), c.X(tau), c.Y(f(tau)), c.mute, 1, [4, 4]);
  c.pt(tau, f(tau)); c.text('τ', c.X(tau), c.Y(0) - 6, c.b, 'center', 14, true);
  c.text(rising ? '63 %' : '37 %', c.X(tau) + 10, c.Y(f(tau)) + (rising ? 16 : -8), c.b, 'left', 12, true);
}
S('rc', [['E', 'E (V)', 1, 12, 0.5, 6], ['R', 'R (kΩ)', 0.1, 10, 0.1, 1], ['C', 'C (µF)', 1, 1000, 1, 100], ['mode', ['Régime', 'النظام'], [['charge', 'شحن'], ['décharge', 'تفريغ']], 0]], 0, (c, v) => {
  const tau = v.R * 1e3 * v.C * 1e-6; ordre1(c, tau, v.E, v.mode === 0, 'u_C (V)');
  return ['τ = R·C = ' + fmt(tau) + ' s', v.mode === 0 ? 'u_C = E·(1 − e^{−t/τ})' : 'u_C = E·e^{−t/τ}', 'u_C(τ) = ' + fmt(v.E * (v.mode === 0 ? 0.632 : 0.368)) + ' V',
  '|i(0)| = E / R = ' + fmt(v.E / v.R) + ' mA', 'E_e = ½·C·E² = ' + fmt(0.5 * v.C * 1e-6 * v.E ** 2) + ' J', T('Régime permanent atteint à t ≈ 5τ = ', 'النظام الدائم عند t ≈ 5τ = ') + fmt(5 * tau) + ' s'];
});
S('rl', [['E', 'E (V)', 1, 12, 0.5, 6], ['R', 'R_T (Ω)', 10, 500, 5, 100], ['L', 'L (H)', 0.01, 1, 0.01, 0.5], ['mode', ['Régime', 'النظام'], [['établissement', 'إقامة التيار'], ['rupture', 'انقطاع التيار']], 0]], 0, (c, v) => {
  const tau = v.L / v.R, I0 = v.E / v.R; ordre1(c, tau, I0 * 1000, v.mode === 0, 'i (mA)');
  return ['τ = L / R_T = ' + fmt(tau) + ' s', v.mode === 0 ? 'i = (E / R_T)·(1 − e^{−t/τ})' : 'i = I_0·e^{−t/τ}', 'I_0 = E / R_T = ' + fmt(I0 * 1000) + ' mA', 'E_m = ½·L·I_0² = ' + fmt(0.5 * v.L * I0 * I0) + ' J'];
});

S('rlc', [['R', 'R (Ω)', 0, 500, 1, 20], ['L', 'L (H)', 0.01, 1, 0.01, 0.2], ['C', 'C (µF)', 0.1, 100, 0.1, 10]], 0, (c, v) => {
  const C = v.C * 1e-6, E = 6, w0 = 1 / sqrt(v.L * C), al = v.R / (2 * v.L), T0 = 2 * PI / w0, Rc = 2 * sqrt(v.L / C);
  let u, reg;
  if (al < w0 * 0.999) { const w = sqrt(w0 * w0 - al * al); u = t => E * exp(-al * t) * (cos(w * t) + al / w * sin(w * t)); reg = v.R === 0 ? T('périodique (non amorti)', 'دوري (غير مخمد)') : T('pseudo-périodique', 'شبه دوري'); }
  else if (al <= w0 * 1.001) { u = t => E * exp(-al * t) * (1 + al * t); reg = T('critique', 'حرج'); }
  else { const q = sqrt(al * al - w0 * w0), s1 = -al + q, s2 = -al - q; u = t => E * (s2 * exp(s1 * t) - s1 * exp(s2 * t)) / (s2 - s1); reg = T('apériodique', 'لا دوري'); }
  c.axes(0, 6 * T0, -E * 1.1, E * 1.1, 't (s)', 'u_C (V)');
  if (al < w0 && v.R > 0) { c.curve(t => E * exp(-al * t), c.mute, 1, 200, [4, 4]); c.curve(t => -E * exp(-al * t), c.mute, 1, 200, [4, 4]); }
  c.curve(u, c.a, 2.5, 900);
  return ['T_0 = 2π·√(L·C) = ' + fmt(T0) + ' s', 'f_0 = ' + fmt(1 / T0) + ' Hz', T('Régime : ', 'النظام : ') + reg, 'R_c = 2·√(L / C) = ' + fmt(Rc) + ' Ω', 'E(0) = ½·C·E² = ' + fmt(0.5 * C * E * E) + ' J  (E = 6 V)'];
});

S('rlcf', [['R', 'R (Ω)', 5, 200, 1, 30], ['L', 'L (H)', 0.01, 1, 0.01, 0.1], ['C', 'C (µF)', 0.1, 100, 0.1, 1], ['x', 'N / N_0', 0.1, 3, 0.01, 1]], 0, (c, v) => {
  const C = v.C * 1e-6, U = 6, f0 = 1 / (2 * PI * sqrt(v.L * C)), w0 = 2 * PI * f0;
  const Z = x => { const w = w0 * x; return sqrt(v.R ** 2 + (v.L * w - 1 / (C * w)) ** 2); }, I0 = U / v.R * 1000;
  c.axes(0, 3 * f0, 0, I0 * 1.15, 'N (Hz)', 'I (mA)');
  c.curve(f => f <= 0 ? 0 : U / Z(f / f0) * 1000, c.a, 3, 900);
  c.line(c.X(0), c.Y(I0 / sqrt(2)), c.X(3 * f0), c.Y(I0 / sqrt(2)), c.mute, 1, [4, 4]); c.text('I_0 / √2', c.X(3 * f0) - 6, c.Y(I0 / sqrt(2)) - 5, c.mute, 'right', 12);
  c.line(c.X(f0), c.Y(0), c.X(f0), c.Y(I0), c.mute, 1, [4, 4]); c.text('N_0', c.X(f0), c.Y(0) - 6, c.ink, 'center', 12, true);
  const z = Z(v.x), w = w0 * v.x, phi = atan((v.L * w - 1 / (C * w)) / v.R); c.pt(v.x * f0, U / z * 1000);
  return ['N_0 = 1 / (2π·√(LC)) = ' + fmt(f0) + ' Hz', 'N = ' + fmt(v.x * f0) + ' Hz', 'Z = ' + fmt(z) + ' Ω', 'I = U / Z = ' + fmt(U / z * 1000) + ' mA  (U = 6 V)',
  'φ = ' + fmt(abs(phi) < 1e-9 ? 0 : deg(phi)) + '°  (' + (abs(v.x - 1) < 0.005 ? T('résonance', 'رنين') : phi > 0 ? T('inductif', 'تحريضي') : T('capacitif', 'كثافي')) + ')',
  'ΔN = R / (2π·L) = ' + fmt(v.R / (2 * PI * v.L)) + ' Hz', 'Q = N_0 / ΔN = ' + fmt(v.L * w0 / v.R)];
});

S('modulation', [['Fp', 'F_p (kHz)', 2, 40, 1, 20], ['fs', 'f_s (kHz)', 0.2, 2, 0.1, 1], ['U0', 'U_0 (V)', 0.5, 5, 0.1, 3], ['Sm', 'S_m (V)', 0, 5, 0.1, 1.5]], 0, (c, v) => {
  const m = v.Sm / v.U0, ym = (v.U0 + v.Sm) * 1.15, Ts = 1 / v.fs;
  const env = t => v.U0 + v.Sm * cos(2 * PI * v.fs * t), u = t => env(t) * cos(2 * PI * v.Fp * t);
  c.axes(0, 2 * Ts, -ym, ym, 't (ms)', 'u_s (V)');
  c.curve(u, c.a, 1.3, 4000); c.curve(env, c.b, 2, 300, [6, 4]); c.curve(t => -env(t), c.b, 2, 300, [6, 4]);
  return ['m = S_m / U_0 = ' + fmt(m), 'U_{max} = ' + fmt(v.U0 + v.Sm) + ' V ; U_{min} = ' + fmt(abs(v.U0 - v.Sm)) + ' V',
    m > 1 ? T('Surmodulation (m > 1) : enveloppe déformée', 'فوق التضمين (m > 1) : الغلاف مشوه') : T('Bonne modulation (m < 1)', 'تضمين جيد (m < 1)'),
    'F_p / f_s = ' + fmt(v.Fp / v.fs) + (v.Fp / v.fs < 10 ? '  ⚠ ' + T('il faut F_p ≫ f_s', 'يجب F_p ≫ f_s') : '')];
});

S('newton', [['F', 'F (N)', 0, 50, 1, 20], ['m', 'm (kg)', 1, 10, 0.5, 4], ['f', 'f (N)', 0, 30, 1, 5]], 1, (c, v, t) => {
  const a = max(0, (v.F - v.f) / v.m), y = 220, sc = 26; let x = 0, tt = 0;
  if (a > 0) { const tf = sqrt(2 * 18 / a); tt = min(t % (tf + 1), tf); x = a * tt * tt / 2; }
  c.line(30, y + 22, 610, y + 22, c.ink, 2); for (let i = 0; i <= 20; i += 2) { c.line(60 + i * sc, y + 22, 60 + i * sc, y + 28, c.mute, 1); c.text(i, 60 + i * sc, y + 42, c.mute, 'center', 11); }
  const bx = 60 + x * sc; c.rect(bx - 24, y - 22, 48, 44, c.a);
  c.arrow(bx, y, bx + v.F * 2, y, c.b, 'F'); c.arrow(bx, y + 10, bx - v.f * 2, y + 10, c.d, 'f');
  c.arrow(bx, y, bx, y + 60 + v.m * 2, c.mute, 'P', 1.5); c.arrow(bx, y, bx, y - 60 - v.m * 2, c.c, 'R', 1.5);
  return ['ΣF = m·a_G', 'a = (F − f) / m = ' + fmt(a) + ' m/s²', 'v = a·t = ' + fmt(a * tt) + ' m/s', 'x = ½·a·t² = ' + fmt(x) + ' m',
    a === 0 ? T('F ≤ f : le solide reste au repos', 'F ≤ f : الجسم يبقى ساكنا') : ''].filter(Boolean);
});

S('chute', [['m', 'm (g)', 1, 100, 1, 20], ['k', 'k (g/s)', 5, 500, 5, 60], ['n', ['Pas Euler Δt / τ', 'خطوة أولير Δt / τ'], 0.05, 1, 0.05, 0.25]], 0, (c, v) => {
  const m = v.m / 1000, k = v.k / 1000, vl = m * g0 / k, tau = m / k, dt = v.n * tau;
  c.axes(0, 5 * tau, 0, vl * 1.25, 't (s)', 'v (m/s)');
  c.line(c.X(0), c.Y(vl), c.X(5 * tau), c.Y(vl), c.mute, 1, [4, 4]); c.text('v_ℓ', c.X(5 * tau) - 6, c.Y(vl) - 6, c.mute, 'right', 13, true);
  c.curve(t => g0 * t, c.d, 1.5, 100, [6, 4]); c.text(T('chute libre v = g·t', 'سقوط حر v = g·t'), c.X(tau) + 8, c.Y(vl * 1.12), c.d, 'left', 12);
  c.curve(t => vl * (1 - exp(-t / tau)), c.a, 3);
  let ve = 0; for (let t = 0; t <= 5 * tau + 1e-9; t += dt) { c.circ(c.X(t), c.Y(ve), 3.5, c.b); ve += (g0 - k / m * ve) * dt; }
  c.text('● Euler', c.X(5 * tau) - 6, c.Y(0) - 10, c.b, 'right', 12, true);
  return ['m·dv/dt = m·g − k·v', 'v_ℓ = m·g / k = ' + fmt(vl) + ' m/s', 'τ = m / k = ' + fmt(tau) + ' s', 'a_0 = g = 9,81 m/s²', 'Euler : v_{i+1} = v_i + a_i·Δt ,  Δt = ' + fmt(dt) + ' s'];
});

S('projectile', [['v0', 'v_0 (m/s)', 5, 30, 0.5, 22], ['al', 'α (°)', 5, 85, 1, 45]], 1, (c, v, t) => {
  const a = rad(v.al), vx = v.v0 * cos(a), vy = v.v0 * sin(a), tf = 2 * vy / g0, Rg = vx * tf, Hm = vy * vy / (2 * g0), sc = 6, x0 = 40, y0 = 320;
  c.line(20, y0, 620, y0, c.ink, 2);
  const tt = min(t % (tf + 1), tf);
  c.ctx.beginPath(); for (let i = 0; i <= 100; i++) { const u = tf * i / 100; c.ctx[i ? 'lineTo' : 'moveTo'](x0 + vx * u * sc, y0 - (vy * u - g0 * u * u / 2) * sc); }
  c.ctx.setLineDash([5, 5]); c.ctx.strokeStyle = c.mute; c.ctx.lineWidth = 1.5; c.ctx.stroke(); c.ctx.setLineDash([]);
  const bx = x0 + vx * tt * sc, by = y0 - (vy * tt - g0 * tt * tt / 2) * sc, vyt = vy - g0 * tt;
  c.arrow(bx, by, bx + vx * 2.5, by, c.c, 'v_x', 1.8); c.arrow(bx, by, bx, by - vyt * 2.5, c.d, 'v_y', 1.8); c.arrow(bx, by, bx + vx * 2.5, by - vyt * 2.5, c.b, '');
  c.circ(bx, by, 7, c.a);
  c.line(x0 + Rg / 2 * sc, y0, x0 + Rg / 2 * sc, y0 - Hm * sc, c.grid, 1, [4, 4]);
  return [T('Portée', 'المدى') + ' : x_P = v_0²·sin 2α / g = ' + fmt(Rg) + ' m', T('Flèche', 'القمة') + ' : y_S = v_0²·sin²α / (2g) = ' + fmt(Hm) + ' m', T('Durée du vol', 'مدة الحركة') + ' : ' + fmt(tf) + ' s',
  'v_x = v_0·cos α = ' + fmt(vx) + ' m/s (' + T('constante', 'ثابتة') + ')', 'v_y = ' + fmt(vyt) + ' m/s'];
});

S('satellite', [['h', 'h (km)', 200, 40000, 100, 35800]], 1, (c, v, t) => {
  const GM = 3.986e14, RT = 6.371e6, r = RT + v.h * 1000, vel = sqrt(GM / r), Tp = 2 * PI * r / vel, Th = Tp / 3600;
  const sc = 160 / (RT + 4e7), cx = 320, cy = 180, th = 2 * PI * t / (Th * 0.8 + 1.5);
  c.circ(cx, cy, r * sc, null, c.grid, 1.5); c.circ(cx, cy, RT * sc, c.a);
  const sx = cx + r * sc * cos(th), sy = cy - r * sc * sin(th);
  c.arrow(sx, sy, sx - 34 * sin(th), sy - 34 * cos(th), c.b, 'v'); c.arrow(sx, sy, sx - 30 * cos(th), sy + 30 * sin(th), c.c, 'F');
  c.circ(sx, sy, 5, c.d); c.text(T('Terre', 'الأرض'), cx, cy + RT * sc + 16, c.ink, 'center', 12, true);
  return ['r = R_T + h = ' + fmt(r / 1000, 4) + ' km', 'v = √(G·M_T / r) = ' + fmt(vel / 1000) + ' km/s', 'T = 2π·√(r³ / (G·M_T)) = ' + fmt(Th) + ' h',
    abs(Th - 23.93) < 0.4 ? T('≈ satellite géostationnaire (T ≈ 24 h)', '≈ قمر ساكن بالنسبة للأرض (T ≈ 24 h)') : ''].filter(Boolean);
});

S('rotdyn', [['M', 'ΣM_Δ (N·m)', 0, 5, 0.1, 1], ['J', 'J_Δ (kg·m²)', 0.1, 2, 0.05, 0.5]], 1, (c, v, t) => {
  const acc = v.M / v.J, tt = t % 8, w = acc * tt, th = acc * tt * tt / 2;
  drawDisk(c, 320, 180, 120, th, c.b);
  c.ctx.beginPath(); c.ctx.arc(320, 180, 140, -0.3, -1.3, true); c.ctx.strokeStyle = c.c; c.ctx.lineWidth = 2.5; c.ctx.stroke();
  c.arrow(320 + 140 * cos(1.25), 180 - 140 * sin(1.25), 320 + 140 * cos(1.33) - 4, 180 - 140 * sin(1.33), c.c, 'M');
  return ['ΣM_Δ = J_Δ·θ̈', 'θ̈ = ' + fmt(acc) + ' rad/s²', 'θ̇ = θ̈·t = ' + fmt(w) + ' rad/s', 'θ = ½·θ̈·t² = ' + fmt(th) + ' rad', 'E_c = ½·J_Δ·θ̇² = ' + fmt(0.5 * v.J * w * w) + ' J'];
});

S('pendule', [['l', 'ℓ (m)', 0.2, 2, 0.05, 1], ['th', 'θ_m (°)', 2, 20, 1, 12], ['g', 'g', [['Terre 9,81', 'الأرض 9,81'], ['Lune 1,62', 'القمر 1,62'], ['Jupiter 24,8', 'المشتري 24,8']], 0]], 1, (c, v, t) => {
  const g = [9.81, 1.62, 24.8][v.g], T0 = 2 * PI * sqrt(v.l / g), th = rad(v.th) * cos(2 * PI * t / T0), Lp = v.l * 140, ox = 320, oy = 30;
  c.rect(250, oy - 10, 140, 10, c.mute); c.line(ox, oy, ox, oy + Lp + 20, c.grid, 1, [4, 4]);
  const bx = ox + Lp * sin(th), by = oy + Lp * cos(th);
  c.line(ox, oy, bx, by, c.ink, 2); c.circ(bx, by, 14, c.a);
  c.arrow(bx, by, bx, by + 40, c.b, 'P', 1.8); c.arrow(bx, by, bx - 36 * sin(th), by - 36 * cos(th), c.c, 'T', 1.8);
  return ['T_0 = 2π·√(ℓ / g) = ' + fmt(T0) + ' s', 'f_0 = 1 / T_0 = ' + fmt(1 / T0) + ' Hz', 'θ(t) = θ_m·cos(2π·t / T_0) = ' + fmt(deg(th)) + '°', T('T_0 ne dépend ni de la masse ni de θ_m (petites oscillations)', 'T_0 لا يتعلق بالكتلة ولا بـ θ_m (تذبذبات صغيرة)')];
});

S('oscillateur', [['m', 'm (kg)', 0.1, 2, 0.05, 0.5], ['k', 'k (N/m)', 5, 100, 1, 20], ['x0', 'X_m (cm)', 1, 10, 0.5, 8], ['lam', ['amortissement λ (kg/s)', 'الخمود λ (kg/s)'], 0, 1, 0.02, 0]], 1, (c, v, t) => {
  const w0 = sqrt(v.k / v.m), be = v.lam / (2 * v.m), w = sqrt(max(w0 * w0 - be * be, 1e-9)), X = v.x0 / 100;
  const x = X * exp(-be * t) * cos(w * t), vel = X * exp(-be * t) * (-be * cos(w * t) - w * sin(w * t));
  const ex = 220, y = 110, bx = ex + x * 900;
  c.rect(30, y - 50, 10, 100, c.mute); c.line(30, y + 26, 360, y + 26, c.ink, 2); c.spring(40, y, bx - 24, y, 12, c.ink, 10); c.rect(bx - 24, y - 24, 48, 48, c.a);
  c.line(ex, y + 26, ex, y + 40, c.mute, 1); c.text('O', ex, y + 54, c.mute, 'center', 12);
  c.arrow(bx, y - 36, bx - x * v.k * 12, y - 36, c.b, x * v.k * 12 > 0.5 || x * v.k * 12 < -0.5 ? 'T' : '');
  c.axes(0, 10, -v.x0, v.x0, 't (s)', 'x (cm)', [58, 200, 360, 320]);
  c.curve(u => v.x0 * exp(-be * u) * cos(w * u), c.a, 2, 600); if (t <= 10) c.pt(t, x * 100);
  const Ec = 0.5 * v.m * vel * vel, Ep = 0.5 * v.k * x * x, E0 = 0.5 * v.k * X * X;
  c.bars([{ label: 'E_c', val: Ec * 1000, color: c.b }, { label: 'E_pe', val: Ep * 1000, color: c.a }, { label: 'E_m', val: (Ec + Ep) * 1000, color: c.c }], E0 * 1000, [410, 30, 620, 300]);
  c.text('(mJ)', 620, 340, c.mute, 'right', 12);
  return ['T_0 = 2π·√(m / k) = ' + fmt(2 * PI / w0) + ' s', 'x = ' + fmt(x * 100) + ' cm ;  v = ' + fmt(vel) + ' m/s', 'E_m = ½·m·v² + ½·k·x² = ' + fmt((Ec + Ep) * 1000) + ' mJ',
    v.lam === 0 ? T('Sans frottement : E_m = ½·k·X_m² = constante', 'بدون احتكاك : E_m = ½·k·X_m² = ثابتة') : T('Frottement : E_m diminue (régime pseudo-périodique)', 'احتكاك : E_m تتناقص (نظام شبه دوري)')];
});

S('bohr', [['ni', ['n initial', 'n البدئي'], 1, 7, 1, 3], ['nf', ['n final', 'n النهائي'], 1, 7, 1, 2]], 0, (c, v) => {
  const yn = n => 330 - 300 * (1 - 1 / n ** 1.15), En = n => -13.6 / (n * n);
  for (let n = 1; n <= 7; n++) { c.line(120, yn(n), 430, yn(n), c.ink, n === v.ni || n === v.nf ? 2.5 : 1); c.text('n = ' + n, 112, yn(n) + 4, c.ink, 'right', 12, true); if (n < 6) c.text(fmt(En(n)) + ' eV', 438, yn(n) + 4, c.mute, 'left', 12); }
  c.line(120, 30, 430, 30, c.mute, 1, [4, 4]); c.text('n = ∞   (0 eV)', 438, 28, c.mute, 'left', 12);
  if (v.ni === v.nf) return [T('Choisir deux niveaux différents', 'اختر مستويين مختلفين'), 'E_n = −13,6 / n²  (eV)'];
  const dE = abs(En(v.ni) - En(v.nf)), lam = 1239.84 / dE, em = v.ni > v.nf, col = lam >= 380 && lam <= 780 ? wlColor(lam) : c.mute;
  c.arrow(275, yn(v.ni), 275, yn(v.nf), col, '', 4);
  c.text(em ? T('émission', 'انبعاث') : T('absorption', 'امتصاص'), 290, (yn(v.ni) + yn(v.nf)) / 2 + 4, c.ink, 'left', 13, true);
  c.rect(500, 150, 110, 40, col, c.ink); c.text('λ = ' + fmt(lam, 4) + ' nm', 555, 210, c.ink, 'center', 13, true);
  const low = min(v.ni, v.nf), ser = low === 1 ? 'Lyman (UV)' : low === 2 ? 'Balmer (' + T('visible', 'مرئي') + ')' : low === 3 ? 'Paschen (IR)' : 'IR';
  return ['E_n = −13,6 / n²  (eV)', 'ΔE = |E_{' + v.nf + '} − E_{' + v.ni + '}| = ' + fmt(dE, 4) + ' eV', 'ν = ΔE / h = ' + fmt(dE * 1.602e-19 / 6.626e-34) + ' Hz', 'λ = h·c / ΔE = ' + fmt(lam, 4) + ' nm', T('Série de ', 'متسلسلة ') + ser];
});
