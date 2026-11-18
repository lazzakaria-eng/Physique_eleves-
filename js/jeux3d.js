/* Jeux 3D pour l’écran interactif (2 joueurs face à face) : Morpion 3D, Bulles 3D, Séquence lumineuse, Feu vert !
   Utilise three.js (assets/three/three.min.js, licence MIT), chargé seulement quand un jeu 3D est lancé. */
'use strict';
window.JEUX3D = (() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const A = () => JEUX.api, T = (fr, ar) => A().C().t(fr, ar), esc = s => A().C().esc(s);
  const app = () => $('#app');
  const list = [
    ['morpion3d', '🧊', 'Morpion 3D', 'إكس-أو ثلاثي الأبعاد', 'Un cube de 3×3×3 cases à faire tourner du doigt. Aligne 3 boules dans n’importe quelle direction de l’espace !', 'مكعب 3×3×3 تديره بإصبعك. اصنع صفا من 3 كرات في أي اتجاه في الفضاء !', 'x1'],
    ['bulles', '🫧', 'Bulles 3D', 'الفقاعات', 'Chacun sa moitié d’écran : éclate seulement les bulles de la couleur demandée. Attention aux bombes !', 'لكل لاعب نصف الشاشة : فجّر فقط فقاعات اللون المطلوب. احذر القنابل !', 'x2'],
    ['sequence', '🎶', 'Séquence lumineuse', 'التسلسل المضيء', 'Mémorise la suite de lumières et de sons, puis reproduis-la. Elle s’allonge à chaque tour !', 'احفظ تسلسل الأضواء والأصوات ثم أعده. يطول في كل دور !', 'x3'],
    ['feuvert', '🚦', 'Feu vert !', 'الضوء الأخضر !', 'Duel de réflexes : touche ta zone dès que le feu passe au vert. Trop tôt ? Le point va à l’adversaire.', 'مبارزة سرعة البديهة : المس منطقتك فور ظهور الضوء الأخضر. قبل الأوان ؟ النقطة للخصم.', 'x4'],
  ];
  let threeP = null;
  const loadThree = () => threeP || (threeP = new Promise((res, rej) => {
    if (window.THREE) return res();
    const s = document.createElement('script'); s.src = 'assets/three/three.min.js'; s.onload = res; s.onerror = rej; document.head.appendChild(s);
  }));

  /* ---------- écran de réglage commun ---------- */
  function setup(id, extra, go) {
    const G = list.find(x => x[0] === id), nm = A().duoNames();
    app().innerHTML = `<section class="jx-page"><a class="jx-back" href="#/jeux">‹ ${T('Espace Jeux', 'فضاء الألعاب')}</a><div class="jx-setup ${G[6]}"><span class="jx-ic">${G[1]}</span><h1>${T(G[2], G[3])}</h1><p>${T(G[4], G[5])}</p>
      <div class="jx-form"><label class="jx-f p1"><span>${T('Joueur de gauche (bleu)', 'لاعب اليسار (أزرق)')}</span><input id="n1" maxlength="16" value="${esc(nm[0])}"></label>
        <label class="jx-f p2"><span>${T('Joueur de droite (rouge)', 'لاعب اليمين (أحمر)')}</span><input id="n2" maxlength="16" value="${esc(nm[1])}"></label>${extra || ''}</div>
      <button type="button" class="jx-btn big" id="go">▶ ${T('Lancer en plein écran', 'ابدأ في ملء الشاشة')}</button></div></section>`;
    $('#go').addEventListener('click', async () => {
      const names = [$('#n1').value.trim() || nm[0], $('#n2').value.trim() || nm[1]]; A().put('jx-duo', names);
      const opt = $('#opt') ? $('#opt').value : null;
      $('#go').disabled = true; $('#go').textContent = T('Chargement…', 'جار التحميل…');
      try { await go(names, opt); } catch (e) { console.error(e); $('#go').textContent = T('Erreur de chargement', 'خطأ في التحميل'); }
    });
  }
  const optSel = (lab, opts, v) => `<label class="jx-f"><span>${lab}</span><select id="opt">${opts.map(o => `<option value="${o[0]}"${o[0] === v ? ' selected' : ''}>${o[1]}</option>`).join('')}</select></label>`;
  const head = (names, sc, txt) => `<div class="jx-3dhead"><div class="jx-team on" style="--c:${A().PC[0]}"><b>${esc(names[0])}</b><span>${sc[0]}</span></div><div class="jx-3dmsg">${txt || ''}</div><div class="jx-team on" style="--c:${A().PC[1]}"><b>${esc(names[1])}</b><span>${sc[1]}</span></div></div>`;
  function renderer(canvas) {
    const r = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    r.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    return r;
  }
  function fit(r, cam, el) { const w = el.clientWidth, h = el.clientHeight; if (!w || !h) return; r.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); }
  function loop(fn) { let id = 0, on = true; const f = t => { if (!on) return; fn(t); id = requestAnimationFrame(f); }; id = requestAnimationFrame(f); A().hook(() => { on = false; cancelAnimationFrame(id); }); }

  /* ================= 1. Morpion 3D (3×3×3, centre interdit) ================= */
  function morpionPlay(names, again) {
    const api = A(), PC = api.PC, GOAL = 3, sc = [0, 0]; let starter = 0; api.full(true);
    app().innerHTML = `<section class="jx-stage">${api.bar()}<div class="jx-3dh"></div><div class="jx-3d"><canvas></canvas><p class="jx-3dtip">${T('Fais glisser pour tourner le cube · touche une case pour jouer', 'اسحب لتدوير المكعب · المس خانة للعب')}</p></div><div class="jx-after"></div></section>`;
    api.wireBar();
    const box = $('.jx-3d'), cv = $('canvas', box), R = renderer(cv), scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    cam.position.set(0, 0, 11);
    scene.add(new THREE.AmbientLight(0xffffff, 0.65)); const dl = new THREE.DirectionalLight(0xffffff, 0.9); dl.position.set(4, 6, 8); scene.add(dl);
    const grp = new THREE.Group(); grp.rotation.set(0.45, -0.6, 0); scene.add(grp);
    const S = 1.7, cells = [], cellGeo = new THREE.SphereGeometry(0.28, 20, 16), ballGeo = new THREE.SphereGeometry(0.55, 32, 24);
    const emptyMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, transparent: true, opacity: 0.45 });
    const frame = new THREE.LineBasicMaterial({ color: 0x64748b, transparent: true, opacity: 0.35 });
    for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) for (let z = -1; z <= 1; z++) {
      const center = !x && !y && !z;
      const m = center ? new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 0.7), new THREE.MeshStandardMaterial({ color: 0x334155, transparent: true, opacity: 0.25 })) : new THREE.Mesh(cellGeo, emptyMat);
      m.position.set(x * S, y * S, z * S); m.userData = { x, y, z, own: center ? -2 : -1 }; grp.add(m); cells.push(m);
    }
    // arêtes des 3 plans pour la lecture de la profondeur
    [-1, 0, 1].forEach(y => { const g = new THREE.EdgesGeometry(new THREE.BoxGeometry(3 * S, 0.001, 3 * S)); const l = new THREE.LineSegments(g, frame); l.position.y = y * S; grp.add(l); });
    grp.add(new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(3 * S, 3 * S, 3 * S)), frame));
    const LINES = []; const D = []; for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) for (let c = -1; c <= 1; c++) if (a || b || c) D.push([a, b, c]);
    const at = (x, y, z) => cells.find(m => m.userData.x === x && m.userData.y === y && m.userData.z === z);
    const ok = v => v >= -1 && v <= 1;
    cells.forEach(m => D.forEach(d => { const { x, y, z } = m.userData; const p = [[x, y, z], [x + d[0], y + d[1], z + d[2]], [x + 2 * d[0], y + 2 * d[1], z + 2 * d[2]]];
      if (p.every(q => q.every(ok)) && !ok(x - d[0]) + !ok(y - d[1]) + !ok(z - d[2]) > 0) { const key = p.map(q => q.join()).sort().join('|'); if (!LINES.some(L => L.key === key)) LINES.push({ key, c: p.map(q => at(...q)) }); } }));
    const PLAY = LINES.filter(L => L.c.every(m => m.userData.own !== -2));
    let cur = starter, over = false, auto = true, winLine = null;
    const mats = PC.map(c => new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 0.25, roughness: 0.3, metalness: 0.1 }));
    const hud = () => { $('.jx-3dh').innerHTML = head(names, sc, over ? '' : `${T('Au tour de', 'دور')} <b style="color:${PC[cur]}">${esc(names[cur])}</b> · ${T('premier à', 'الأول إلى')} ${GOAL}`); };
    function newRound() {
      cells.forEach(m => { if (m.userData.own >= 0) { m.geometry = cellGeo; m.material = emptyMat; m.scale.set(1, 1, 1); m.userData.own = -1; } });
      if (winLine) { grp.remove(winLine); winLine = null; } over = false; cur = starter; $('.jx-after').innerHTML = ''; hud();
    }
    function place(m) {
      if (over || m.userData.own !== -1) return;
      m.userData.own = cur; m.geometry = ballGeo; m.material = mats[cur]; m.scale.set(0.2, 0.2, 0.2); api.beep('flip');
      const w = PLAY.find(L => L.c.every(c => c.userData.own === cur));
      if (w) {
        over = true; sc[cur]++; api.beep('ok');
        const pts = w.c.map(c => c.position.clone()); winLine = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 8, 0.12, 8, false), new THREE.MeshBasicMaterial({ color: 0xfacc15 })); grp.add(winLine);
        w.c.forEach(c => { c.userData.pulse = true; });
        hud(); if (sc[cur] >= GOAL) return api.later(() => api.duoWin('morpion3d', names, sc.slice(), again), 1600);
        starter = 1 - starter; return nextBtn(T('Manche gagnée par ', 'فاز بالجولة ') + esc(names[cur]) + ' !');
      }
      if (cells.every(c => c.userData.own !== -1)) { over = true; starter = 1 - starter; hud(); return nextBtn(T('Match nul !', 'تعادل !')); }
      cur = 1 - cur; hud();
    }
    function nextBtn(txt) {
      $('.jx-after').innerHTML = `<p class="jx-steal">${txt}</p><button type="button" class="jx-btn big" id="nx">${T('Manche suivante', 'الجولة التالية')} ›</button>`;
      $('#nx').addEventListener('click', () => { cells.forEach(c => { c.userData.pulse = false; }); newRound(); });
    }
    // rotation au doigt / à la souris + toucher pour jouer
    let drag = null;
    cv.addEventListener('pointerdown', e => { drag = { x: e.clientX, y: e.clientY, rx: grp.rotation.x, ry: grp.rotation.y, moved: 0 }; cv.setPointerCapture(e.pointerId); auto = false; });
    cv.addEventListener('pointermove', e => { if (!drag) return; const dx = e.clientX - drag.x, dy = e.clientY - drag.y; drag.moved = Math.max(drag.moved, Math.abs(dx) + Math.abs(dy)); grp.rotation.y = drag.ry + dx * 0.008; grp.rotation.x = Math.max(-1.3, Math.min(1.3, drag.rx + dy * 0.008)); });
    cv.addEventListener('pointerup', e => {
      if (!drag) return; const moved = drag.moved; drag = null; if (moved > 12) return;
      // case la plus proche du doigt à l’écran (zone tactile large)
      const r = cv.getBoundingClientRect(), v = new THREE.Vector3(); let best = null, bd = Infinity;
      cells.forEach(c => { if (c.userData.own !== -1) return; c.getWorldPosition(v); const dz = v.distanceTo(cam.position); v.project(cam);
        const px = (v.x + 1) / 2 * r.width + r.left, py = (1 - v.y) / 2 * r.height + r.top, d = Math.hypot(px - e.clientX, py - e.clientY) + dz * 0.5;
        if (d < bd && Math.hypot(px - e.clientX, py - e.clientY) < Math.max(36, r.width * 0.035)) { bd = d; best = c; } });
      if (best) place(best);
    });
    const onR = () => fit(R, cam, box); window.addEventListener('resize', onR); A().hook(() => { window.removeEventListener('resize', onR); R.dispose(); });
    onR(); hud();
    loop(t => {
      if (auto) grp.rotation.y += 0.003;
      cells.forEach(m => { if (m.userData.own >= 0 && m.scale.x < 1) m.scale.multiplyScalar(1.18).clampScalar(0, 1); if (m.userData.pulse) { const k = 1 + 0.12 * Math.sin(t / 120); m.scale.set(k, k, k); } });
      R.render(scene, cam);
    });
  }

  /* ================= 2. Bulles 3D (écran partagé, en même temps) ================= */
  function bullesPlay(names, again, dur) {
    const api = A(), PC = api.PC, DUR = +dur || 45, sc = [0, 0];
    const COLS = [['vertes', 'الخضراء', 0x22c55e], ['jaunes', 'الصفراء', 0xfacc15], ['violettes', 'البنفسجية', 0xa855f7], ['bleues', 'الزرقاء', 0x38bdf8]];
    let target = 0, left = DUR, seed = Date.now() % 100000; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    api.full(true);
    app().innerHTML = `<section class="jx-stage">${api.bar()}<div class="jx-3dh"></div><div class="jx-timer"><i></i></div>
      <div class="jx-duo b3">${[0, 1].map(k => `<div class="jx-side" style="--c:${PC[k]}"><div class="jx-3d"><canvas></canvas></div></div>`).join('')}</div></section>`;
    api.wireBar();
    const msg = () => `${T('Éclate les bulles', 'فجّر الفقاعات')} <b class="jx-tgt" style="background:#${COLS[target][2].toString(16).padStart(6, '0')}">${T(COLS[target][0], COLS[target][1])}</b> · ⭐ +3 · 💣 −3`;
    const hud = () => { $('.jx-3dh').innerHTML = head(names, sc, msg()); };
    hud();
    // même suite de bulles pour les deux joueurs (équité)
    const spawnPlan = []; for (let i = 0; i < DUR * 2.6; i++) spawnPlan.push({ t: i / 2.6 + rnd() * 0.3, x: rnd() * 5 - 2.5, z: -rnd() * 4, kind: rnd() < 0.06 ? 'star' : rnd() < 0.09 ? 'bomb' : Math.floor(rnd() * 4), sp: 0.9 + rnd() * 0.9 });
    const worlds = $$('.jx-3d').map((box, k) => {
      const cv = $('canvas', box), R = renderer(cv), scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(50, 1, 0.1, 50); cam.position.set(0, 0, 7);
      scene.add(new THREE.AmbientLight(0xffffff, 0.7)); const dl = new THREE.DirectionalLight(0xffffff, 0.8); dl.position.set(3, 5, 6); scene.add(dl);
      const W = { k, box, cv, R, scene, cam, bubbles: [], next: 0 };
      const ray = new THREE.Raycaster(), ptr = new THREE.Vector2();
      cv.addEventListener('pointerdown', e => {
        e.preventDefault(); if (left <= 0) return; const r = cv.getBoundingClientRect(); ptr.set((e.clientX - r.left) / r.width * 2 - 1, -(e.clientY - r.top) / r.height * 2 + 1); ray.setFromCamera(ptr, cam);
        const hit = ray.intersectObjects(W.bubbles.filter(b => !b.userData.pop).map(b => b), false)[0]; if (!hit) return;
        const b = hit.object, kd = b.userData.kind; b.userData.pop = 1;
        const d = kd === 'star' ? 3 : kd === 'bomb' ? -3 : kd === target ? 1 : -1; sc[k] += d; api.beep(d > 0 ? 'ok' : 'ko'); hud();
      });
      return W;
    });
    const geo = new THREE.SphereGeometry(0.42, 28, 20), starGeo = new THREE.OctahedronGeometry(0.5), bombGeo = new THREE.IcosahedronGeometry(0.42);
    const mat = kd => kd === 'star' ? new THREE.MeshStandardMaterial({ color: 0xfbbf24, emissive: 0xf59e0b, emissiveIntensity: 0.6, metalness: 0.5, roughness: 0.2 })
      : kd === 'bomb' ? new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.4 }) : new THREE.MeshStandardMaterial({ color: COLS[kd][2], transparent: true, opacity: 0.85, roughness: 0.15, metalness: 0.1 });
    const onR = () => worlds.forEach(W => fit(W.R, W.cam, W.box)); window.addEventListener('resize', onR); A().hook(() => { window.removeEventListener('resize', onR); worlds.forEach(W => W.R.dispose()); });
    onR();
    const t0 = performance.now(); let last = t0, lastSwitch = 0;
    loop(now => {
      const el = (now - t0) / 1000, dt = Math.min(0.05, (now - last) / 1000); last = now; left = Math.max(0, DUR - el);
      $('.jx-timer i').style.width = (left / DUR * 100) + '%'; $('.jx-timer i').classList.toggle('low', left < 10);
      if (el - lastSwitch > 9) { lastSwitch = el; let n; do { n = Math.floor(Math.random() * 4); } while (n === target); target = n; api.beep('tick'); hud(); }
      worlds.forEach(W => {
        while (W.next < spawnPlan.length && spawnPlan[W.next].t <= el) { const p = spawnPlan[W.next++]; const m = new THREE.Mesh(p.kind === 'star' ? starGeo : p.kind === 'bomb' ? bombGeo : geo, mat(p.kind)); m.position.set(p.x, -4.2, p.z); m.userData = { kind: p.kind, sp: p.sp, ph: p.x }; W.scene.add(m); W.bubbles.push(m); }
        W.bubbles = W.bubbles.filter(m => {
          if (m.userData.pop) { m.userData.pop += dt * 6; m.scale.setScalar(1 + m.userData.pop); m.material.opacity = Math.max(0, 1.4 - m.userData.pop); m.material.transparent = true; if (m.userData.pop > 1.4) { W.scene.remove(m); return false; } return true; }
          m.position.y += m.userData.sp * dt; m.position.x += Math.sin(el * 2 + m.userData.ph) * 0.004; m.rotation.y += dt;
          if (m.position.y > 4.6) { W.scene.remove(m); return false; } return true;
        });
        W.R.render(W.scene, W.cam);
      });
      if (left <= 0 && !W_done) { W_done = true; api.later(() => api.duoWin('bulles', names, sc.slice(), again), 900); }
    });
    let W_done = false;
  }

  /* ================= 3. Séquence lumineuse (mémoire, tour à tour) ================= */
  function sequencePlay(names, again) {
    const api = A(), PC = api.PC, TONES = [262, 294, 330, 349, 392, 440, 494, 523, 587], COL = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#14b8a6', '#3b82f6', '#6366f1', '#a855f7', '#ec4899'];
    const seq = [Math.floor(Math.random() * 9)], best = [0, 0]; let cur = 0, pos = 0, listen = false; api.full(true);
    app().innerHTML = `<section class="jx-stage">${api.bar()}<div class="jx-3dh"></div><div class="jx-seqwrap"><div class="jx-seq">${COL.map((c, i) => `<button type="button" data-i="${i}" style="--c:${c}"></button>`).join('')}</div></div><div class="jx-after"></div></section>`;
    api.wireBar();
    let AC = null;
    const tone = i => { if (!A().get('jx-son', true)) return; try { AC = AC || new (window.AudioContext || window.webkitAudioContext)(); const o = AC.createOscillator(), g = AC.createGain(); o.type = 'sine'; o.frequency.value = TONES[i]; o.connect(g); g.connect(AC.destination); const t = AC.currentTime; g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.3, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.35); o.start(t); o.stop(t + 0.4); } catch (e) { /* audio indisponible */ } };
    const btns = $$('.jx-seq button');
    const flash = i => { btns[i].classList.add('lit'); tone(i); api.later(() => btns[i].classList.remove('lit'), 380); };
    const hud = txt => { $('.jx-3dh').innerHTML = head(names, best, txt); };
    function play() {
      listen = false; pos = 0; $('.jx-seq').classList.add('watch');
      hud(`👀 ${T('Regardez bien…', 'انتبهوا جيدا…')} · ${T('longueur', 'الطول')} ${seq.length}`);
      seq.forEach((s, k) => api.later(() => flash(s), 700 + k * 620));
      api.later(() => { listen = true; $('.jx-seq').classList.remove('watch'); hud(`${T('À', 'دور')} <b style="color:${PC[cur]}">${esc(names[cur])}</b> ${T('de reproduire la séquence', 'لإعادة التسلسل')}`); $('.jx-seqwrap').style.setProperty('--c', PC[cur]); }, 700 + seq.length * 620);
    }
    btns.forEach(b => b.addEventListener('pointerdown', e => {
      e.preventDefault(); if (!listen) return; const i = +b.dataset.i; flash(i);
      if (i !== seq[pos]) { listen = false; api.beep('ko'); b.classList.add('ko'); api.later(() => b.classList.remove('ko'), 600);
        const w = 1 - cur; hud(`❌ ${esc(names[cur])} ${T('s’est trompé !', 'أخطأ !')}`); return api.later(() => api.duoWin('sequence', names, cur === 0 ? [best[0], best[1] + 1] : [best[0] + 1, best[1]], again), 1500); }
      pos++;
      if (pos === seq.length) { listen = false; best[cur] = seq.length; api.beep('ok'); cur = 1 - cur; seq.push(Math.floor(Math.random() * 9)); hud('✔'); api.later(play, 1100); }
    }));
    hud(''); api.later(play, 600);
  }

  /* ================= 4. Feu vert ! (réflexes) ================= */
  function feuPlay(names, again) {
    const api = A(), PC = api.PC, GOAL = 5, sc = [0, 0]; api.full(true);
    app().innerHTML = `<section class="jx-stage">${api.bar()}<div class="jx-3dh"></div>
      <div class="jx-feu"><button type="button" class="jx-pad" data-k="0" style="--c:${PC[0]}">${esc(names[0])}<small>${T('touche ici', 'المس هنا')}</small></button>
        <div class="jx-light"><i class="r"></i><i class="o"></i><i class="g"></i><p class="jx-rt"></p></div>
        <button type="button" class="jx-pad" data-k="1" style="--c:${PC[1]}">${esc(names[1])}<small>${T('touche ici', 'المس هنا')}</small></button></div></section>`;
    api.wireBar();
    let state = 'idle', tGreen = 0;
    const L = $('.jx-light'), rt = $('.jx-rt');
    const hud = t => { $('.jx-3dh').innerHTML = head(names, sc, t); };
    function round() {
      if (sc[0] >= GOAL || sc[1] >= GOAL) return api.duoWin('feuvert', names, sc.slice(), again);
      state = 'wait'; L.className = 'jx-light red'; rt.textContent = ''; $$('.jx-pad').forEach(p => p.classList.remove('win', 'foul'));
      hud(T('Prêts… attendez le vert !', 'استعدوا… انتظروا الأخضر !') + ` · ${T('premier à', 'الأول إلى')} ${GOAL}`);
      api.later(() => { if (state === 'wait') L.className = 'jx-light orange'; }, 700);
      api.later(() => { if (state !== 'wait') return; state = 'go'; tGreen = performance.now(); L.className = 'jx-light green'; api.beep('tick'); hud(T('MAINTENANT !', 'الآن !')); }, 1600 + Math.random() * 3200);
    }
    const tap = k => {
      if (state === 'wait') { state = 'done'; sc[1 - k]++; api.beep('ko'); $$('.jx-pad')[k].classList.add('foul'); rt.textContent = T('Faux départ !', 'انطلاقة خاطئة !'); hud(`❌ ${esc(names[k])} ${T('est parti trop tôt', 'انطلق قبل الأوان')}`); return api.later(round, 1800); }
      if (state !== 'go') return; state = 'done'; const ms = Math.round(performance.now() - tGreen); sc[k]++; api.beep('ok');
      $$('.jx-pad')[k].classList.add('win'); rt.textContent = ms + ' ms'; hud(`⚡ ${esc(names[k])} · ${ms} ms`); api.later(round, 1800);
    };
    $$('.jx-pad').forEach(p => p.addEventListener('pointerdown', e => { e.preventDefault(); tap(+p.dataset.k); }));
    api.onKey(e => { const k = { a: 0, q: 0, p: 1, m: 1 }[e.key.toLowerCase()]; if (k !== undefined) tap(k); });
    round();
  }

  return {
    list,
    page(id) {
      const go3 = f => async (names, opt) => { await loadThree(); const run = () => f(names, run, opt); run(); };
      if (id === 'morpion3d') setup(id, '', go3(morpionPlay));
      else if (id === 'bulles') setup(id, optSel(T('Durée', 'المدة'), [['30', '30 s'], ['45', '45 s'], ['60', '60 s']], '45'), go3(bullesPlay));
      else if (id === 'sequence') setup(id, '', async names => { const run = () => sequencePlay(names, run); run(); });
      else if (id === 'feuvert') setup(id, '', async names => { const run = () => feuPlay(names, run); run(); });
    },
  };
})();
