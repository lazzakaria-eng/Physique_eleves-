/* Espace Jeux & Défis — conçu pour l’écran interactif de la classe (TNI) :
   jeux par équipes, très grands caractères, plein écran, sons, podium et tournoi de la séance.
   Jeux : Match des équipes, Course contre la montre, Memory des formules, Unités express. */
'use strict';
window.JEUX = (() => {
  let C; // contexte fourni par app.js : t, esc, IC, typeset, loadContenu, chapter, ALL, store
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const app = () => $('#app');
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = (a, n) => shuffle(a).slice(0, n);
  let timers = [], keyH = null;
  const stop = () => { timers.forEach(x => { clearInterval(x); clearTimeout(x); }); timers = []; if (keyH) { document.removeEventListener('keydown', keyH); keyH = null; } };
  const later = (f, ms) => timers.push(setTimeout(f, ms));
  const every = (f, ms) => timers.push(setInterval(f, ms));
  const onKey = f => { if (keyH) document.removeEventListener('keydown', keyH); keyH = e => { if (!e.target.closest('input, select, textarea')) f(e); }; document.addEventListener('keydown', keyH); };
  const get = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); return v === null ? d : v; } catch (e) { return d; } };
  const put = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* stockage indisponible */ } };

  /* ---------- équipes, tournoi, palmarès ---------- */
  const COLORS = ['#2563eb', '#dc2626', '#16a34a', '#d97706'];
  const DEF = () => [{ n: C.t('Équipe bleue', 'الفريق الأزرق') }, { n: C.t('Équipe rouge', 'الفريق الأحمر') }];
  const teams = () => get('jx-equipes', null) || DEF();
  const setTeams = T => put('jx-equipes', T.slice(0, 4));
  const tournoi = () => get('jx-tournoi', {});
  function addTournoi(sc, T) { const tr = tournoi(); T.forEach((x, i) => { tr[x.n] = (tr[x.n] || 0) + sc[i]; }); put('jx-tournoi', tr); }
  function addPalmares(game, T, sc) {
    const best = sc.indexOf(Math.max(...sc)), p = get('jx-palmares', []);
    p.unshift({ g: game, w: sc.filter(x => x === sc[best]).length > 1 ? C.t('Égalité', 'تعادل') : T[best].n, s: T.map((x, i) => x.n + ' ' + sc[i]).join(' · '), d: new Date().toLocaleDateString('fr-FR') });
    put('jx-palmares', p.slice(0, 12));
  }

  /* ---------- son et plein écran ---------- */
  let AC = null;
  const sonOn = () => get('jx-son', true);
  function beep(kind) {
    if (!sonOn()) return;
    try {
      AC = AC || new (window.AudioContext || window.webkitAudioContext)();
      const seq = { ok: [[660, 0], [880, .09], [1320, .18]], ko: [[220, 0], [160, .14]], tick: [[1000, 0]], win: [[523, 0], [659, .12], [784, .24], [1047, .36]], flip: [[500, 0]] }[kind];
      seq.forEach(([f, d]) => { const o = AC.createOscillator(), g = AC.createGain(); o.type = kind === 'ko' ? 'sawtooth' : 'triangle'; o.frequency.value = f; o.connect(g); g.connect(AC.destination);
        const t0 = AC.currentTime + d, len = kind === 'tick' || kind === 'flip' ? .05 : .16; g.gain.setValueAtTime(.0001, t0); g.gain.exponentialRampToValueAtTime(.25, t0 + .01); g.gain.exponentialRampToValueAtTime(.0001, t0 + len); o.start(t0); o.stop(t0 + len + .02); });
    } catch (e) { /* audio indisponible */ }
  }
  function full(on) {
    document.body.classList.toggle('jx-full', on);
    try { if (on && !document.fullscreenElement && document.documentElement.requestFullscreen && get('jx-pe', true)) document.documentElement.requestFullscreen().catch(() => {}); if (!on && document.fullscreenElement) document.exitFullscreen().catch(() => {}); } catch (e) { /* plein écran indisponible */ }
  }

  /* ---------- questions ---------- */
  const NIVS = () => PROGRAMME.map(n => [n.id, C.t(n.titre, n.ar)]);
  async function pool(niv, mat, ch) {
    const ls = C.ALL.filter(l => ch ? l.id === ch : (niv === 'all' || l.niv.id === niv) && (mat === 'all' || l.mat === mat));
    await Promise.all(ls.map(l => C.loadContenu(l)));
    const out = [];
    ls.forEach(l => (C.chapter(l).quiz || []).forEach(q => { if (q && q.o && q.o.length > 1) out.push({ q: q.q, o: q.o, r: q.r, e: q.e, ch: C.t(l.fr, l.ar) }); }));
    return out;
  }
  const opts = q => shuffle(q.o.map((o, i) => ({ o, ok: i === q.r })));

  /* ---------- habillage commun ---------- */
  const LET = ['A', 'B', 'C', 'D', 'E', 'F'];
  const sel = (id, lab, list, v) => `<label class="jx-f"><span>${lab}</span><select id="${id}">${list.map(x => `<option value="${x[0]}"${x[0] === v ? ' selected' : ''}>${C.esc(x[1])}</option>`).join('')}</select></label>`;
  const nivList = () => [['all', C.t('Tous les niveaux', 'كل المستويات')]].concat(NIVS());
  const matList = () => [['all', C.t('Physique et chimie', 'الفيزياء والكيمياء')], ['physique', C.t('Physique', 'الفيزياء')], ['chimie', C.t('Chimie', 'الكيمياء')]];
  const chList = niv => [['', C.t('Tous les chapitres', 'كل الدروس')]].concat(C.ALL.filter(l => niv === 'all' || l.niv.id === niv).map(l => [l.id, C.t(l.fr, l.ar)]));
  const bar = () => `<div class="jx-topbar"><button type="button" class="jx-quit">✕ ${C.t('Quitter', 'خروج')}</button><span class="jx-tt"></span>
    <button type="button" class="jx-snd" aria-pressed="${sonOn()}">${sonOn() ? '🔊' : '🔇'}</button><button type="button" class="jx-fs">⛶</button></div>`;
  function wireBar() {
    $('.jx-quit').addEventListener('click', () => { stop(); full(false); location.hash = '#/jeux'; });
    $('.jx-snd').addEventListener('click', e => { put('jx-son', !sonOn()); e.currentTarget.textContent = sonOn() ? '🔊' : '🔇'; });
    $('.jx-fs').addEventListener('click', () => { try { document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen(); } catch (e) { /* indisponible */ } });
  }
  const board = (T, sc, cur) => `<div class="jx-board">${T.map((x, i) => `<div class="jx-team${i === cur ? ' on' : ''}" style="--c:${COLORS[i]}"><b>${C.esc(x.n)}</b><span>${sc[i]}</span></div>`).join('')}</div>`;
  function confetti() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const box = document.createElement('div'); box.className = 'jx-confetti'; box.setAttribute('aria-hidden', 'true');
    for (let i = 0; i < 120; i++) { const s = document.createElement('i'); s.style.left = Math.random() * 100 + '%'; s.style.background = ['#f97316', '#2563eb', '#16a34a', '#dc2626', '#facc15', '#8b5cf6'][i % 6]; s.style.animationDelay = Math.random() * 0.8 + 's'; s.style.setProperty('--dx', (Math.random() * 300 - 150) + 'px'); box.appendChild(s); }
    document.body.appendChild(box); setTimeout(() => box.remove(), 3800);
  }
  function podium(game, T, sc, again) {
    stop(); addTournoi(sc, T); addPalmares(game, T, sc); beep('win'); confetti();
    const order = T.map((x, i) => ({ n: x.n, s: sc[i], c: COLORS[i] })).sort((a, b) => b.s - a.s);
    const place = [1, 0, 2, 3].filter(i => order[i]);
    app().innerHTML = `<section class="jx-stage">${bar()}<h1 class="jx-h">${order.length > 1 && order[0].s === order[1].s ? C.t('Égalité !', 'تعادل !') : '🏆 ' + C.esc(order[0].n)}</h1>
      <div class="jx-podium">${place.map(i => `<div class="jx-pod p${i + 1}" style="--c:${order[i].c}"><b>${C.esc(order[i].n)}</b><span>${order[i].s} pts</span><div class="jx-step">${i + 1}</div></div>`).join('')}</div>
      <div class="jx-acts"><button type="button" class="jx-btn big" id="again">↻ ${C.t('Rejouer', 'أعد اللعب')}</button><button type="button" class="jx-btn big ghost" id="menu">${C.t('Autres jeux', 'ألعاب أخرى')}</button></div></section>`;
    wireBar(); $('#again').addEventListener('click', again); $('#menu').addEventListener('click', () => { full(false); location.hash = '#/jeux'; });
  }

  /* ---------- accueil des jeux ---------- */
  const GAMES = [
    ['match', '⚔️', 'Match des équipes', 'مباراة الفرق', 'Chaque équipe répond à son tour. Mauvaise réponse : une autre équipe peut voler la question !', 'كل فريق يجيب في دوره. جواب خاطئ : يمكن لفريق آخر سرقة السؤال !', 'g2'],
    ['chrono', '⏱️', 'Course contre la montre', 'سباق ضد الساعة', '60 secondes par équipe, les unes après les autres. Les séries rapportent des bonus.', '60 ثانية لكل فريق بالتناوب. السلاسل تمنح نقاطا إضافية.', 'g1'],
    ['memory', '🧩', 'Memory des formules', 'ذاكرة العلاقات', 'Une paire trouvée = 10 points et on rejoue. Une erreur : la main passe à l’équipe suivante.', 'زوج صحيح = 10 نقاط ويعيد اللعب. خطأ : ينتقل الدور للفريق الموالي.', 'g3'],
    ['unites', '📏', 'Unités express', 'الوحدات السريعة', 'Unités des grandeurs et conversions, chaque équipe à son tour.', 'وحدات المقادير والتحويلات، كل فريق في دوره.', 'g4'],
    ['enigmes', '🕵️', 'Qui suis-je ?', 'من أنا ؟', 'Des indices de plus en plus faciles. Moins l’équipe utilise d’indices, plus elle gagne de points.', 'مؤشرات تصبح أسهل فأسهل. كلما استعمل الفريق مؤشرات أقل ربح نقاطا أكثر.', 'g5'],
    ['defis', '🧠', 'Défis de réflexion', 'تحديات التفكير', 'Des problèmes courts où il faut raisonner. Un indice est disponible… mais il coûte 5 points.', 'مسائل قصيرة تتطلب التفكير. يوجد مؤشر… لكنه يكلف 5 نقاط.', 'g7'],
    ['intrus', '🔍', 'L’intrus', 'الدخيل', 'Quatre éléments : un seul n’est pas comme les autres. Trouvez-le, puis justifiez !', 'أربعة عناصر : واحد فقط مختلف. جدوه ثم عللوا !', 'g6'],
    ['mots', '🔤', 'Lettres mélangées', 'الحروف المبعثرة', 'Remettez les lettres dans l’ordre pour retrouver le mot scientifique défini.', 'رتبوا الحروف لإيجاد الكلمة العلمية المعرّفة.', 'g8'],
  ];
  function hub() {
    full(false);
    const T = teams(), tr = tournoi(), pal = get('jx-palmares', []);
    const totals = Object.entries(tr).sort((a, b) => b[1] - a[1]);
    app().innerHTML = `<section class="jx-page">
      <div class="jx-hero"><div><p class="jx-kick">${C.t('Pour l’écran interactif de la classe', 'للسبورة التفاعلية في القسم')}</p><h1>${C.t('Espace Jeux & Défis', 'فضاء الألعاب والتحديات')}</h1>
        <p>${C.t('Formez les équipes, choisissez un jeu : il s’ouvre en plein écran avec de très grands caractères. Les points s’ajoutent au tournoi de la séance.', 'كوّن الفرق واختر لعبة : تفتح في ملء الشاشة بحروف كبيرة جدا. النقاط تضاف إلى دوري الحصة.')}</p>
        <p class="jx-keys">${C.t('Au clavier ou à la télécommande : touches 1 à 4 (ou A à D) pour répondre, Entrée pour continuer.', 'بلوحة المفاتيح : الأزرار 1 إلى 4 (أو A إلى D) للإجابة، و Entrée للمتابعة.')}</p></div>
        <div class="jx-teams-ed"><h2>${C.t('Équipes', 'الفرق')}</h2>
          ${T.map((x, i) => `<div class="jx-ted" style="--c:${COLORS[i]}"><i></i><input data-i="${i}" maxlength="18" value="${C.esc(x.n)}">${T.length > 2 ? `<button type="button" data-del="${i}" aria-label="${C.t('Supprimer', 'حذف')}">✕</button>` : ''}</div>`).join('')}
          ${T.length < 4 ? `<button type="button" class="jx-add">＋ ${C.t('Ajouter une équipe', 'أضف فريقا')}</button>` : ''}
          <div class="jx-opts"><label><input type="checkbox" id="pe"${get('jx-pe', true) ? ' checked' : ''}> ${C.t('Plein écran', 'ملء الشاشة')}</label><label><input type="checkbox" id="son"${sonOn() ? ' checked' : ''}> ${C.t('Sons', 'الأصوات')}</label></div></div></div>
      <div class="jx-games">${GAMES.map(g => `<a class="jx-game tilt ${g[6]}" href="#/jeux/${g[0]}"><span class="jx-ic">${g[1]}</span><b>${C.t(g[2], g[3])}</b><span>${C.t(g[4], g[5])}</span><span class="jx-meta"><em>${C.t('Lancer', 'ابدأ')} ›</em></span></a>`).join('')}</div>
      <div class="jx-two">
        <section class="jx-card"><h2>🏆 ${C.t('Tournoi de la séance', 'دوري الحصة')}</h2>
          ${totals.length ? `<ol class="jx-tour">${totals.map(([n, s]) => `<li><span>${C.esc(n)}</span><em>${s} pts</em></li>`).join('')}</ol><button type="button" class="jx-btn ghost" id="raz">↺ ${C.t('Nouveau tournoi', 'دوري جديد')}</button>` : `<p class="jx-note">${C.t('Les points de chaque partie s’ajoutent ici.', 'نقاط كل لعبة تضاف هنا.')}</p>`}</section>
        <section class="jx-card"><h2>📋 ${C.t('Palmarès', 'سجل الفائزين')}</h2>
          ${pal.length ? `<ul class="jx-pal">${pal.map(p => `<li><b>${C.esc(p.w)}</b><small>${C.esc(C.t(GAMES.find(g => g[0] === p.g)[2], GAMES.find(g => g[0] === p.g)[3]))} · ${p.d}</small><span>${C.esc(p.s)}</span></li>`).join('')}</ul>` : `<p class="jx-note">${C.t('Aucune partie jouée pour l’instant.', 'لم تلعب أي مباراة بعد.')}</p>`}</section></div></section>`;
    $$('.jx-ted input').forEach(inp => inp.addEventListener('change', () => { const T2 = teams(); T2[+inp.dataset.i].n = inp.value.trim() || T2[+inp.dataset.i].n; setTeams(T2); }));
    $$('[data-del]').forEach(b => b.addEventListener('click', () => { const T2 = teams(); T2.splice(+b.dataset.del, 1); setTeams(T2); hub(); }));
    const add = $('.jx-add'); if (add) add.addEventListener('click', () => { const T2 = teams(); T2.push({ n: [C.t('Équipe verte', 'الفريق الأخضر'), C.t('Équipe orange', 'الفريق البرتقالي')][T2.length - 2] }); setTeams(T2); hub(); });
    $('#pe').addEventListener('change', e => put('jx-pe', e.target.checked));
    $('#son').addEventListener('change', e => put('jx-son', e.target.checked));
    const raz = $('#raz'); if (raz) raz.addEventListener('click', () => { put('jx-tournoi', {}); hub(); });
  }

  /* ---------- écran de réglage ---------- */
  function setup(g, fields, go) {
    const G = GAMES.find(x => x[0] === g);
    app().innerHTML = `<section class="jx-page"><a class="jx-back" href="#/jeux">‹ ${C.t('Espace Jeux', 'فضاء الألعاب')}</a><div class="jx-setup ${G[6]}"><span class="jx-ic">${G[1]}</span><h1>${C.t(G[2], G[3])}</h1><p>${C.t(G[4], G[5])}</p>
      <p class="jx-teamsline">${teams().map((x, i) => `<span style="--c:${COLORS[i]}">${C.esc(x.n)}</span>`).join('')} <a href="#/jeux">${C.t('modifier', 'تعديل')}</a></p>
      <div class="jx-form">${fields}</div><button type="button" class="jx-btn big" id="go">▶ ${C.t('Lancer en plein écran', 'ابدأ في ملء الشاشة')}</button></div></section>`;
    const n = $('#niv'), ch = $('#ch');
    if (n && ch) { const fill = () => { ch.innerHTML = chList(n.value).map(x => `<option value="${x[0]}">${C.esc(x[1])}</option>`).join(''); }; fill(); n.addEventListener('change', fill); }
    $('#go').addEventListener('click', async () => { $('#go').disabled = true; $('#go').textContent = C.t('Chargement…', 'جار التحميل…'); try { await go(); } catch (e) { console.error(e); $('#go').disabled = false; $('#go').textContent = '▶'; } });
  }
  const qFields = () => sel('niv', C.t('Niveau', 'المستوى'), nivList(), C.store.get('jx-niv', 'all')) + `<label class="jx-f"><span>${C.t('Chapitre', 'الدرس')}</span><select id="ch"></select></label>` + sel('mat', C.t('Matière', 'المادة'), matList(), 'all');

  /* ---------- moteur « chacun son tour » (Match, Unités) ---------- */
  function turns(game, Q, perTeam, secs, again) {
    const T = teams(), N = T.length, sc = T.map(() => 0); let i = 0;
    full(true);
    function question() {
      stop(); if (i >= perTeam * N) return podium(game, T, sc, again);
      const cur = i % N, q = Q[i % Q.length], os = q.os || opts(q); let left = secs, lock = false, steal = false;
      app().innerHTML = `<section class="jx-stage">${bar()}${board(T, sc, cur)}
        <div class="jx-turnrow"><div class="jx-turn" style="--c:${COLORS[cur]}">${C.t('À', 'دور')} <b>${C.esc(T[cur].n)}</b> ${C.t('de répondre', '')} · ${Math.floor(i / N) + 1}/${perTeam}</div>
        <div class="jx-ring"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45"/><circle class="v" cx="50" cy="50" r="45" style="--c:${COLORS[cur]}"/></svg><span>${secs}</span></div></div>
        <div class="jx-q" dir="ltr" lang="fr">${q.ch ? `<p class="jx-ch">${C.esc(q.ch)}</p>` : ''}<div class="jx-qt">${q.q}</div>
        ${q.h ? `<div class="jx-hintbox"><button type="button" class="jx-hint">💡 ${C.t('Indice (−5 points)', 'مؤشر (−5 نقاط)')}</button><p hidden>${q.h}</p></div>` : ''}
        <div class="jx-os">${os.map((o, k) => `<button type="button" data-k="${k}"><i>${LET[k]}</i><span>${o.o}</span></button>`).join('')}</div><div class="jx-after"></div></div></section>`;
      wireBar(); C.typeset($('.jx-q'));
      let hinted = false; const hb = $('.jx-hint'); if (hb) hb.addEventListener('click', () => { hinted = true; hb.hidden = true; hb.nextElementSibling.hidden = false; });
      const ring = $('.jx-ring .v'), rs = $('.jx-ring span');
      const tick = () => { left = Math.max(0, left - 0.1); ring.style.strokeDashoffset = 283 * (1 - left / secs); rs.textContent = Math.ceil(left); if (left > 0 && left <= 5 && Math.abs(left - Math.round(left)) < 0.05) beep('tick'); if (left <= 0) answer(null); };
      const reveal = () => $$('.jx-os button').forEach((x, j) => { if (os[j].ok) x.classList.add('ok'); });
      const next = () => { i++; question(); };
      const nextBtn = () => { const a = $('.jx-after'); a.innerHTML = `${q.e ? `<p class="jx-e">${q.e}</p>` : ''}<button type="button" class="jx-btn big" id="nx">${C.t('Question suivante', 'السؤال التالي')} ›</button>`; C.typeset(a); $('#nx').addEventListener('click', next); onKey(e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); next(); } }); };
      function answer(k) {
        if (lock) return; lock = true; stop();
        const ok = k !== null && os[k].ok;
        if (k !== null) $$('.jx-os button')[k].classList.add(ok ? 'ok' : 'ko');
        if (ok) { sc[steal === false ? cur : steal] += steal === false ? Math.max(2, 10 + Math.ceil(left / 3) - (hinted ? 5 : 0)) : 5; beep('ok'); reveal(); $('.jx-board').outerHTML = board(T, sc, cur); return nextBtn(); }
        beep('ko');
        if (steal === false && N > 1) { // une autre équipe peut voler la question
          const a = $('.jx-after');
          a.innerHTML = `<p class="jx-steal">${C.t('Une autre équipe veut tenter ? (5 points)', 'هل يريد فريق آخر المحاولة ؟ (5 نقاط)')}</p><div class="jx-stealb">${T.map((x, j) => j === cur ? '' : `<button type="button" data-t="${j}" style="--c:${COLORS[j]}">${C.esc(x.n)}</button>`).join('')}<button type="button" class="no">${C.t('Personne', 'لا أحد')}</button></div>`;
          $$('.jx-stealb button').forEach(b => b.addEventListener('click', () => {
            if (b.classList.contains('no')) { reveal(); return nextBtn(); }
            steal = +b.dataset.t; lock = false; a.innerHTML = `<p class="jx-steal" style="color:${COLORS[steal]}">${C.esc(T[steal].n)} ${C.t('répond !', 'يجيب !')}</p>`;
          }));
        } else { reveal(); nextBtn(); }
      }
      $$('.jx-os button').forEach(b => b.addEventListener('click', () => { if (!b.classList.contains('ko')) answer(+b.dataset.k); }));
      onKey(e => { const k = '1234'.indexOf(e.key) >= 0 ? '1234'.indexOf(e.key) : 'abcd'.indexOf(e.key.toLowerCase()); if (k >= 0 && k < os.length && !lock) answer(k); });
      every(tick, 100);
    }
    question();
  }

  /* ---------- 1. Match des équipes ---------- */
  function matchSetup() {
    setup('match', qFields() + sel('nb', C.t('Questions par équipe', 'أسئلة لكل فريق'), [['3', '3'], ['5', '5'], ['8', '8'], ['10', '10']], '5') + sel('sec', C.t('Temps par question', 'الوقت لكل سؤال'), [['20', '20 s'], ['30', '30 s'], ['45', '45 s'], ['60', '60 s']], '30'), async () => {
      C.store.set('jx-niv', $('#niv').value);
      const nb = +$('#nb').value, sec = +$('#sec').value, P = await pool($('#niv').value, $('#mat').value, $('#ch').value);
      if (!P.length) throw new Error('aucune question');
      const run = () => turns('match', shuffle(P), nb, sec, run); run();
    });
  }

  /* ---------- 2. Course contre la montre (une équipe après l’autre) ---------- */
  function chronoSetup() {
    setup('chrono', qFields() + sel('sec', C.t('Durée par équipe', 'المدة لكل فريق'), [['45', '45 s'], ['60', '60 s'], ['90', '90 s']], '60'), async () => {
      C.store.set('jx-niv', $('#niv').value);
      const sec = +$('#sec').value, P = await pool($('#niv').value, $('#mat').value, $('#ch').value);
      if (!P.length) throw new Error('aucune question');
      const run = () => chronoPlay(shuffle(P), sec, run); run();
    });
  }
  function chronoPlay(P, SEC, again) {
    const T = teams(), sc = T.map(() => 0); let team = 0, qi = 0;
    full(true);
    function ready() {
      stop(); if (team >= T.length) return podium('chrono', T, sc, again);
      app().innerHTML = `<section class="jx-stage">${bar()}${board(T, sc, team)}<div class="jx-ready" style="--c:${COLORS[team]}"><p>${C.t('Au tour de', 'دور')}</p><h1>${C.esc(T[team].n)}</h1><p>${SEC} ${C.t('secondes', 'ثانية')}</p>
        <button type="button" class="jx-btn huge" id="start">▶ ${C.t('Partez !', 'انطلقوا !')}</button></div></section>`;
      wireBar(); $('#start').addEventListener('click', play); onKey(e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); play(); } });
    }
    function play() {
      stop(); let left = SEC, serie = 0, lock = false;
      app().innerHTML = `<section class="jx-stage">${bar()}${board(T, sc, team)}<div class="jx-hud"><span class="jx-score" style="color:${COLORS[team]}">${sc[team]} <small>pts</small></span><span class="jx-serie" hidden></span><span class="jx-time">${SEC}</span></div>
        <div class="jx-timer"><i></i></div><div class="jx-q" dir="ltr" lang="fr"></div></section>`;
      wireBar();
      const show = () => {
        if (left <= 0) return; const q = P[qi++ % P.length], os = opts(q); lock = false;
        $('.jx-q').innerHTML = `<p class="jx-ch">${C.esc(q.ch)}</p><div class="jx-qt">${q.q}</div><div class="jx-os">${os.map((o, k) => `<button type="button" data-k="${k}"><i>${LET[k]}</i><span>${o.o}</span></button>`).join('')}</div>`;
        C.typeset($('.jx-q'));
        const ans = k => {
          if (lock || left <= 0) return; lock = true; const ok = os[k].ok;
          $$('.jx-os button').forEach((x, j) => { if (os[j].ok) x.classList.add('ok'); }); if (!ok) $$('.jx-os button')[k].classList.add('ko');
          if (ok) { serie++; sc[team] += 10 + Math.min(20, (serie - 1) * 2); beep('ok'); } else { serie = 0; left = Math.max(0, left - 5); beep('ko'); }
          $('.jx-score').innerHTML = sc[team] + ' <small>pts</small>'; const s = $('.jx-serie'); s.hidden = serie < 2; s.textContent = '🔥 ×' + serie;
          later(show, ok ? 500 : 1400);
        };
        $$('.jx-os button').forEach(b => b.addEventListener('click', () => ans(+b.dataset.k)));
        onKey(e => { const k = '1234'.indexOf(e.key) >= 0 ? '1234'.indexOf(e.key) : 'abcd'.indexOf(e.key.toLowerCase()); if (k >= 0 && k < os.length) ans(k); });
      };
      every(() => {
        left = Math.max(0, left - 0.1); $('.jx-time').textContent = Math.ceil(left); const b = $('.jx-timer i'); b.style.width = (left / SEC * 100) + '%'; b.classList.toggle('low', left < 10);
        if (left <= 0) { stop(); beep('win'); team++; later(ready, 1200); }
      }, 100);
      show();
    }
    ready();
  }

  /* ---------- 3. Memory des formules par équipes ---------- */
  function memorySetup() {
    setup('memory', sel('niv', C.t('Niveau', 'المستوى'), NIVS(), C.store.get('jx-mniv', '2bac')) + `<label class="jx-f"><span>${C.t('Chapitre', 'الدرس')}</span><select id="ch"></select></label>`
      + sel('nb', C.t('Nombre de paires', 'عدد الأزواج'), [['6', '6 (12 cartes)'], ['8', '8 (16 cartes)'], ['10', '10 (20 cartes)']], '8'), async () => {
      const n = $('#niv').value, id = $('#ch').value, nb = +$('#nb').value; C.store.set('jx-mniv', n);
      const ls = C.ALL.filter(l => l.niv.id === n); await Promise.all(ls.map(l => C.loadContenu(l)));
      const fm = l => C.chapter(l).formules.filter(f => f.tex && f.sens).map(f => ({ tex: f.tex, sens: f.sens }));
      const F = id ? fm(C.ALL.find(l => l.id === id)) : [], seen = new Set(F.map(f => f.sens));
      shuffle(ls).forEach(l => fm(l).forEach(f => { if (!seen.has(f.sens)) { seen.add(f.sens); F.push(f); } }));
      const sel6 = id ? F.slice(0, nb) : pick(F, nb);
      const run = () => memoryPlay(shuffle(sel6), run); run();
    });
  }
  function memoryPlay(F, again) {
    const T = teams(), sc = T.map(() => 0), cards = shuffle(F.flatMap((f, k) => [{ k, tex: f.tex }, { k, txt: f.sens }]));
    let cur = 0, open = [], found = 0, lock = false; full(true);
    const cols = cards.length <= 12 ? 4 : cards.length <= 16 ? 4 : 5;
    app().innerHTML = `<section class="jx-stage">${bar()}${board(T, sc, cur)}<div class="jx-turn" style="--c:${COLORS[cur]}">${C.t('À', 'دور')} <b>${C.esc(T[cur].n)}</b> ${C.t('de jouer', '')}</div>
      <div class="jx-mem" style="--cols:${cols}">${cards.map((c, i) => `<button type="button" class="jx-card3" data-i="${i}" aria-label="${C.t('Carte', 'بطاقة')} ${i + 1}"><span class="f back">${i + 1}</span><span class="f front ${c.tex ? 'tex' : 'txt'}" dir="ltr">${c.tex ? `<span data-tex="${C.esc(c.tex)}"></span>` : C.esc(c.txt)}</span></button>`).join('')}</div></section>`;
    wireBar(); C.typeset($('.jx-mem'));
    const refresh = () => { $('.jx-board').outerHTML = board(T, sc, cur); const tn = $('.jx-turn'); tn.style.setProperty('--c', COLORS[cur]); tn.innerHTML = `${C.t('À', 'دور')} <b>${C.esc(T[cur].n)}</b> ${C.t('de jouer', '')}`; };
    $$('.jx-card3').forEach(b => b.addEventListener('click', () => {
      if (lock || b.classList.contains('up') || b.classList.contains('done')) return;
      b.classList.add('up'); beep('flip'); open.push(b); if (open.length < 2) return;
      const [a, c] = open; open = [];
      if (cards[+a.dataset.i].k === cards[+c.dataset.i].k) {
        a.classList.add('done'); c.classList.add('done'); a.style.setProperty('--c', COLORS[cur]); c.style.setProperty('--c', COLORS[cur]);
        sc[cur] += 10; found++; beep('ok'); refresh(); if (found === F.length) later(() => podium('memory', T, sc, again), 900);
      } else { lock = true; beep('ko'); later(() => { a.classList.remove('up'); c.classList.remove('up'); cur = (cur + 1) % T.length; refresh(); lock = false; }, 1500); }
    }));
  }

  /* ---------- 4. Unités express par équipes ---------- */
  const UN = [['une force', 'N'], ['une énergie', 'J'], ['une puissance', 'W'], ['une pression', 'Pa'], ['une fréquence', 'Hz'], ['une résistance', 'Ω'], ['une capacité', 'F'],
    ['une inductance', 'H'], ['un champ magnétique', 'T'], ['une charge électrique', 'C'], ['une tension', 'V'], ['une intensité du courant', 'A'], ['un champ électrique', 'V/m'],
    ['une concentration molaire', 'mol/L'], ['une quantité de matière', 'mol'], ['une masse molaire', 'g/mol'], ['une conductivité', 'S/m'], ['une conductance', 'S'],
    ['l’activité d’une source radioactive', 'Bq'], ['une vitesse angulaire', 'rad/s'], ['le moment d’une force', 'N·m'], ['la raideur d’un ressort', 'N/m'],
    ['une accélération', 'm/s²'], ['une masse volumique', 'kg/m³'], ['un moment d’inertie', 'kg·m²'], ['une constante de temps τ', 's'], ['une vitesse', 'm/s']];
  const sup = n => String(n).replace(/[-0-9]/g, d => '⁻⁰¹²³⁴⁵⁶⁷⁸⁹'['-0123456789'.indexOf(d)]);
  const num = x => { if (x === 0) return '0'; const e = Math.floor(Math.log10(Math.abs(x))); if (e >= -2 && e <= 4) return String(+x.toPrecision(4)).replace('.', ','); const m = +(x / 10 ** e).toPrecision(3); return (m === 1 ? '' : String(m).replace('.', ',') + '×') + '10' + sup(e); };
  const CONV = [['km/h', v => v / 3.6, 'm/s', [36, 72, 90, 108, 54]], ['mA', v => v / 1000, 'A', [20, 150, 250, 5, 400]], ['µF', v => v * 1e-6, 'F', [10, 47, 100, 2.2, 220]],
    ['nm', v => v * 1e-9, 'm', [400, 589, 633, 750]], ['kJ', v => v * 1000, 'J', [2, 4.5, 12, 0.3]], ['mL', v => v / 1000, 'L', [20, 250, 100, 10]],
    ['cm²', v => v * 1e-4, 'm²', [5, 20, 150, 2]], ['g', v => v / 1000, 'kg', [250, 50, 1500, 5]], ['ms', v => v / 1000, 's', [20, 5, 400, 40]],
    ['MeV', v => v * 1.6e-13, 'J', [1, 5, 200]], ['mmol/L', v => v / 1000, 'mol/L', [10, 2, 50]], ['°C', v => v + 273, 'K', [25, 100, 0, 37]],
    ['mH', v => v / 1000, 'H', [10, 200, 50]], ['kΩ', v => v * 1000, 'Ω', [1, 4.7, 10, 2.2]], ['mm', v => v / 1000, 'm', [5, 0.5, 12]]];
  function unitQ() {
    if (Math.random() < 0.45) {
      const [g, u] = UN[Math.floor(Math.random() * UN.length)], o = shuffle([u].concat(pick(UN.filter(x => x[1] !== u), 3).map(x => x[1])));
      return { q: C.t('Quelle est l’unité de ', 'ما وحدة ') + g + ' ?', os: o.map(x => ({ o: x, ok: x === u })) };
    }
    const c = CONV[Math.floor(Math.random() * CONV.length)], v = c[3][Math.floor(Math.random() * c[3].length)], res = c[1](v), good = num(res) + ' ' + c[2];
    let wrong = [res * 10, res / 10, res * 1000, res / 1000, res * 100].map(x => num(x) + ' ' + c[2]);
    if (c[2] === 'K') wrong = [num(v - 273) + ' K', num(v + 173) + ' K', num(v * 273) + ' K'];
    const o = shuffle([good].concat(pick([...new Set(wrong)].filter(x => x !== good), 3)));
    return { q: C.t('Convertis : ', 'حوّل : ') + String(v).replace('.', ',') + ' ' + c[0] + ' = ?', os: o.map(x => ({ o: x, ok: x === good })) };
  }
  function unitesSetup() {
    setup('unites', sel('nb', C.t('Questions par équipe', 'أسئلة لكل فريق'), [['3', '3'], ['5', '5'], ['8', '8']], '5') + sel('sec', C.t('Temps par question', 'الوقت لكل سؤال'), [['15', '15 s'], ['20', '20 s'], ['30', '30 s']], '20'), async () => {
      const nb = +$('#nb').value, sec = +$('#sec').value;
      const run = () => turns('unites', Array.from({ length: nb * teams().length }, unitQ), nb, sec, run); run();
    });
  }

  /* ---------- jeux de réflexion ---------- */
  const D = () => window.JEUX_DATA || { quisuisje: [], intrus: [], defis: [], mots: [] };
  const byNiv = (arr, niv) => { const a = arr.filter(x => niv === 'all' || x.n === niv); return a.length >= 4 ? a : arr; };
  const nivF = () => sel('niv', C.t('Niveau', 'المستوى'), nivList(), C.store.get('jx-niv', 'all'));
  const nbF = (d) => sel('nb', C.t('Manches par équipe', 'جولات لكل فريق'), [['2', '2'], ['3', '3'], ['5', '5'], ['8', '8']], d || '3');

  function intrusSetup() {
    setup('intrus', nivF() + nbF() + sel('sec', C.t('Temps par question', 'الوقت لكل سؤال'), [['30', '30 s'], ['45', '45 s'], ['60', '60 s']], '45'), async () => {
      const niv = $('#niv').value, nb = +$('#nb').value, sec = +$('#sec').value; C.store.set('jx-niv', niv);
      const mk = () => shuffle(byNiv(D().intrus, niv)).map(x => ({ q: C.t('Trouvez l’intrus, puis justifiez à voix haute :', 'أوجدوا الدخيل ثم عللوا بصوت مرتفع :'), os: shuffle(x.o.map((o, i) => ({ o, ok: i === x.r }))), e: x.e }));
      const run = () => turns('intrus', mk(), nb, sec, run); run();
    });
  }
  function defisSetup() {
    setup('defis', nivF() + nbF() + sel('sec', C.t('Temps par question', 'الوقت لكل سؤال'), [['45', '45 s'], ['60', '60 s'], ['90', '90 s']], '60'), async () => {
      const niv = $('#niv').value, nb = +$('#nb').value, sec = +$('#sec').value; C.store.set('jx-niv', niv);
      const run = () => turns('defis', shuffle(byNiv(D().defis, niv)), nb, sec, run); run();
    });
  }

  /* Qui suis-je ? : indices successifs, la main passe en cas d’erreur */
  function enigmesSetup() {
    setup('enigmes', nivF() + nbF('2'), async () => {
      const niv = $('#niv').value, nb = +$('#nb').value; C.store.set('jx-niv', niv);
      const run = () => enigmesPlay(shuffle(byNiv(D().quisuisje, niv)), nb, run); run();
    });
  }
  function enigmesPlay(Q, perTeam, again) {
    const T = teams(), N = T.length, sc = T.map(() => 0), PTS = [40, 30, 20, 10]; let i = 0; full(true);
    function round() {
      stop(); if (i >= perTeam * N || i >= Q.length) return podium('enigmes', T, sc, again);
      const e = Q[i], os = shuffle([e.r].concat(e.o).slice(0, 6)); let cur = i % N, c = 0, done = false;
      app().innerHTML = `<section class="jx-stage">${bar()}${board(T, sc, cur)}<div class="jx-turn"></div>
        <div class="jx-q jx-enig" dir="ltr" lang="fr"><p class="jx-ch">🕵️ ${C.t('Qui suis-je ?', 'من أنا ؟')} · ${Math.floor(i / N) + 1}/${perTeam}</p><ol class="jx-clues"></ol>
        <div class="jx-cluebar"><button type="button" class="jx-hint" id="more">💡 ${C.t('Indice suivant', 'المؤشر التالي')}</button><span class="jx-pts"></span></div>
        <div class="jx-os six">${os.map((o, k) => `<button type="button" data-k="${k}"><i>${LET[k] || k + 1}</i><span>${o}</span></button>`).join('')}</div><div class="jx-after"></div></div></section>`;
      wireBar();
      const paint = () => {
        $('.jx-clues').innerHTML = e.i.slice(0, c + 1).map((x, j) => `<li class="${j === c ? 'new' : ''}">${x}</li>`).join('');
        $('.jx-pts').textContent = C.t('Bonne réponse maintenant : ', 'جواب صحيح الآن : ') + PTS[c] + ' pts';
        $('#more').hidden = c >= e.i.length - 1 || done;
        const tn = $('.jx-turn'); tn.style.setProperty('--c', COLORS[cur]); tn.innerHTML = `${C.t('À', 'دور')} <b>${C.esc(T[cur].n)}</b> ${C.t('de répondre', '')}`;
        $('.jx-board').outerHTML = board(T, sc, cur);
      };
      $('#more').addEventListener('click', () => { if (c < e.i.length - 1) { c++; beep('flip'); paint(); } });
      const end = () => { done = true; $$('.jx-os button').forEach((x, k) => { if (os[k] === e.r) x.classList.add('ok'); }); $('#more').hidden = true;
        $('.jx-after').innerHTML = `<button type="button" class="jx-btn big" id="nx">${C.t('Énigme suivante', 'اللغز التالي')} ›</button>`; $('#nx').addEventListener('click', () => { i++; round(); });
        onKey(ev => { if (ev.key === 'Enter') { i++; round(); } }); };
      const answer = k => {
        if (done) return; const b = $$('.jx-os button')[k]; if (b.classList.contains('ko')) return;
        if (os[k] === e.r) { b.classList.add('ok'); sc[cur] += PTS[c]; beep('ok'); paint(); end(); return; }
        b.classList.add('ko'); beep('ko');
        if ($$('.jx-os button:not(.ko)').length <= 1) return end();
        cur = (cur + 1) % N; if (c < e.i.length - 1) c++; paint();
      };
      $$('.jx-os button').forEach(b => b.addEventListener('click', () => answer(+b.dataset.k)));
      onKey(ev => { const k = '123456'.indexOf(ev.key); if (k >= 0 && k < os.length) answer(k); else if (ev.key === ' ' && !done) { ev.preventDefault(); $('#more').click(); } });
      paint();
    }
    round();
  }

  /* Lettres mélangées : on touche les lettres dans l’ordre */
  function motsSetup() {
    setup('mots', nivF() + nbF() + sel('sec', C.t('Temps par mot', 'الوقت لكل كلمة'), [['30', '30 s'], ['45', '45 s'], ['60', '60 s']], '45'), async () => {
      const niv = $('#niv').value, nb = +$('#nb').value, sec = +$('#sec').value; C.store.set('jx-niv', niv);
      const run = () => motsPlay(shuffle(byNiv(D().mots, niv)), nb, sec, run); run();
    });
  }
  function motsPlay(W, perTeam, SEC, again) {
    const T = teams(), N = T.length, sc = T.map(() => 0); let i = 0; full(true);
    function round() {
      stop(); if (i >= perTeam * N) return podium('mots', T, sc, again);
      const cur = i % N, w = W[i % W.length], word = w.m; let letters = word.split(''), mix;
      do { mix = shuffle(letters.map((ch, k) => ({ ch, k }))); } while (word.length > 1 && mix.map(x => x.ch).join('') === word);
      let placed = [], left = SEC, hints = 0, done = false;
      app().innerHTML = `<section class="jx-stage">${bar()}${board(T, sc, cur)}
        <div class="jx-turnrow"><div class="jx-turn" style="--c:${COLORS[cur]}">${C.t('À', 'دور')} <b>${C.esc(T[cur].n)}</b> · ${Math.floor(i / N) + 1}/${perTeam}</div>
        <div class="jx-ring"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45"/><circle class="v" cx="50" cy="50" r="45" style="--c:${COLORS[cur]}"/></svg><span>${SEC}</span></div></div>
        <div class="jx-q jx-words" dir="ltr" lang="fr"><p class="jx-def">« ${C.esc(w.d)} »</p><div class="jx-slots"></div><div class="jx-tiles"></div>
        <div class="jx-cluebar"><button type="button" class="jx-hint" id="hint">💡 ${C.t('Une lettre (−3)', 'حرف (−3)')}</button><button type="button" class="jx-hint" id="clr">⌫ ${C.t('Effacer', 'مسح')}</button></div><div class="jx-after"></div></div></section>`;
      wireBar();
      const paint = () => {
        $('.jx-slots').innerHTML = letters.map((_, k) => `<span class="${placed[k] ? 'on' : ''}">${placed[k] ? placed[k].ch : ''}</span>`).join('');
        $('.jx-tiles').innerHTML = mix.map((x, k) => `<button type="button" data-k="${k}"${placed.includes(x) ? ' disabled' : ''}>${x.ch}</button>`).join('');
        $$('.jx-tiles button').forEach(b => b.addEventListener('click', () => put(mix[+b.dataset.k])));
      };
      const finish = ok => {
        done = true; stop();
        $('.jx-slots').innerHTML = letters.map(ch => `<span class="on ${ok ? 'ok' : 'rev'}">${ch}</span>`).join(''); $('.jx-tiles').innerHTML = ''; $('.jx-cluebar').innerHTML = '';
        if (ok) { sc[cur] += Math.max(3, 10 + Math.ceil(left / 5) - hints * 3); beep('ok'); } else beep('ko');
        $('.jx-board').outerHTML = board(T, sc, cur);
        $('.jx-after').innerHTML = `<button type="button" class="jx-btn big" id="nx">${C.t('Mot suivant', 'الكلمة التالية')} ›</button>`; $('#nx').addEventListener('click', () => { i++; round(); });
        onKey(ev => { if (ev.key === 'Enter') { i++; round(); } });
      };
      function put(x) {
        if (done || placed.includes(x)) return; const k = placed.findIndex(p => !p); placed[k === -1 ? placed.length : k] = x; beep('flip'); paint();
        if (placed.filter(Boolean).length === letters.length) {
          if (placed.map(p => p.ch).join('') === word) finish(true);
          else { beep('ko'); $('.jx-slots').classList.add('shake'); later(() => { $('.jx-slots').classList.remove('shake'); placed = placed.map((p, j) => p && p.fixed ? p : null); paint(); }, 700); }
        }
      }
      $('#clr').addEventListener('click', () => { placed = placed.map(p => p && p.fixed ? p : null); paint(); });
      $('#hint').addEventListener('click', () => {
        const k = letters.findIndex((ch, j) => !(placed[j] && placed[j].fixed)); if (k < 0) return;
        placed = placed.map(p => p && p.fixed ? p : null);
        const t = mix.find(x => x.ch === letters[k] && !placed.includes(x)); if (!t) return; t.fixed = true; placed[k] = t; hints++; paint();
        if (placed.filter(Boolean).length === letters.length) finish(placed.map(p => p.ch).join('') === word);
      });
      onKey(ev => { if (done) return; if (ev.key === 'Backspace') { $('#clr').click(); return; } const L = ev.key.toUpperCase(); const t = mix.find(x => x.ch === L && !placed.includes(x)); if (t) put(t); });
      const ring = $('.jx-ring .v'), rs = $('.jx-ring span');
      every(() => { left = Math.max(0, left - 0.1); ring.style.strokeDashoffset = 283 * (1 - left / SEC); rs.textContent = Math.ceil(left); if (left <= 0 && !done) finish(false); }, 100);
      paint();
    }
    round();
  }

  return {
    init(ctx) { C = ctx; },
    stop() { stop(); document.body.classList.remove('jx-full'); },
    page(sub) { stop(); ({ match: matchSetup, duel: matchSetup, chrono: chronoSetup, memory: memorySetup, unites: unitesSetup, enigmes: enigmesSetup, defis: defisSetup, intrus: intrusSetup, mots: motsSetup }[sub] || hub)(); },
  };
})();
