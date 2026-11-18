/* Espace Jeux & Défis : Défi chrono, Duel à deux, Memory des formules, Unités express.
   Profil du joueur (pseudo, points d’expérience, rang, trophées) et tableau d’honneur enregistrés dans le navigateur. */
'use strict';
window.JEUX = (() => {
  let C; // contexte fourni par app.js : t, esc, IC, typeset, loadContenu, chapter, ALL, store
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const app = () => $('#app');
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = (a, n) => shuffle(a).slice(0, n);
  let timers = [];
  const stop = () => { timers.forEach(x => { clearInterval(x); clearTimeout(x); }); timers = []; };
  const later = (f, ms) => timers.push(setTimeout(f, ms));
  const every = (f, ms) => timers.push(setInterval(f, ms));

  /* ---------- profil ---------- */
  const KEY = 'jeux-profil';
  function load() { try { return Object.assign({ pseudo: '', xp: 0, best: {}, hall: {}, badges: [], played: {} }, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { return { pseudo: '', xp: 0, best: {}, hall: {}, badges: [], played: {} }; } }
  function save(p) { try { localStorage.setItem(KEY, JSON.stringify(p)); } catch (e) { /* stockage indisponible */ } }
  const RANKS = [[0, 'Apprenti', 'متعلم', '🧪'], [200, 'Explorateur', 'مستكشف', '🔭'], [600, 'Chercheur', 'باحث', '🔬'], [1500, 'Savant', 'عالم', '🧠'], [3000, 'Prix Nobel', 'جائزة نوبل', '🏅']];
  const rank = xp => { let r = RANKS[0], nx = null; RANKS.forEach((x, i) => { if (xp >= x[0]) { r = x; nx = RANKS[i + 1] || null; } }); return { r, nx }; };
  const BADGES = {
    premier: ['🎉', 'Première partie', 'أول لعبة'], chrono100: ['⏱️', '100 points au Défi chrono', '100 نقطة في تحدي الوقت'],
    chrono300: ['🚀', '300 points au Défi chrono', '300 نقطة في تحدي الوقت'], serie10: ['🔥', 'Série de 10 bonnes réponses', '10 أجوبة صحيحة متتالية'],
    memory: ['🧩', 'Memory terminé', 'إتمام لعبة الذاكرة'], memoryparfait: ['💎', 'Memory sans erreur', 'الذاكرة بدون خطأ'],
    duel: ['⚔️', 'Premier duel', 'أول مبارزة'], unites: ['📏', '12/15 aux Unités express', '12/15 في الوحدات'],
    unites15: ['🎯', '15/15 aux Unités express', '15/15 في الوحدات'], tous: ['🌟', 'Les 4 jeux essayés', 'جربت الألعاب الأربع'],
    xp1000: ['🏆', '1000 points d’expérience', '1000 نقطة خبرة'],
  };
  // enregistre une partie ; renvoie les nouveaux trophées
  function record(game, score, xp, earned, label) {
    const p = load(), nb = [];
    const give = b => { if (!p.badges.includes(b)) { p.badges.push(b); nb.push(b); } };
    p.xp += Math.max(0, Math.round(xp)); p.played[game] = (p.played[game] || 0) + 1;
    const k = game + (label ? ':' + label : '');
    const record = !(k in p.best) || score > p.best[k]; if (record) p.best[k] = score;
    const h = p.hall[game] = (p.hall[game] || []).concat([{ n: p.pseudo || C.t('Anonyme', 'مجهول'), s: score, d: new Date().toISOString().slice(0, 10), l: label || '' }]).sort((a, b) => b.s - a.s).slice(0, 8);
    give('premier'); (earned || []).forEach(give);
    if (['chrono', 'duel', 'memory', 'unites'].every(g => p.played[g])) give('tous');
    if (p.xp >= 1000) give('xp1000');
    save(p); return { nb, record, best: p.best[k], hall: h };
  }

  /* ---------- questions des quiz (contenus des chapitres) ---------- */
  const NIVS = () => PROGRAMME.map(n => [n.id, C.t(n.titre, n.ar)]);
  function lessons(niv, mat) { return C.ALL.filter(l => (niv === 'all' || l.niv.id === niv) && (mat === 'all' || l.mat === mat)); }
  async function pool(niv, mat) {
    const ls = lessons(niv, mat);
    await Promise.all(ls.map(l => C.loadContenu(l)));
    const out = [];
    ls.forEach(l => (C.chapter(l).quiz || []).forEach(q => { if (q && q.o && q.o.length > 1) out.push(Object.assign({ ch: C.t(l.fr, l.ar) }, q)); }));
    return out;
  }
  const opts = q => shuffle(q.o.map((o, i) => ({ o, ok: i === q.r })));

  /* ---------- habillage ---------- */
  const back = () => `<a class="jx-back" href="#/jeux">‹ ${C.t('Espace Jeux', 'فضاء الألعاب')}</a>`;
  const sel = (id, lab, list, v) => `<label class="jx-f"><span>${lab}</span><select id="${id}">${list.map(x => `<option value="${x[0]}"${x[0] === v ? ' selected' : ''}>${C.esc(x[1])}</option>`).join('')}</select></label>`;
  const nivList = () => [['all', C.t('Tous les niveaux', 'كل المستويات')]].concat(NIVS());
  const matList = () => [['all', C.t('Physique et chimie', 'الفيزياء والكيمياء')], ['physique', C.t('Physique', 'الفيزياء')], ['chimie', C.t('Chimie', 'الكيمياء')]];
  function confetti() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const box = document.createElement('div'); box.className = 'jx-confetti'; box.setAttribute('aria-hidden', 'true');
    const cols = ['#ff7a1a', '#1f6fe0', '#12946a', '#d93a4a', '#f2c230', '#8b5cf6'];
    for (let i = 0; i < 70; i++) { const s = document.createElement('i'); s.style.left = Math.random() * 100 + '%'; s.style.background = cols[i % cols.length]; s.style.animationDelay = Math.random() * 0.6 + 's'; s.style.setProperty('--dx', (Math.random() * 200 - 100) + 'px'); box.appendChild(s); }
    document.body.appendChild(box); setTimeout(() => box.remove(), 3200);
  }
  function endCard(title, big, lines, res, again) {
    const p = load();
    app().innerHTML = `<section class="jx-page">${back()}<div class="jx-end">
      <div class="jx-trophy">${res.record ? '🏆' : '⭐'}</div><h1>${title}</h1><p class="jx-big">${big}</p>
      ${res.record ? `<p class="jx-rec">${C.t('Nouveau record personnel !', 'رقم قياسي شخصي جديد !')}</p>` : `<p class="jx-sub">${C.t('Ton record', 'رقمك القياسي')} : ${res.best}</p>`}
      ${lines.map(x => `<p class="jx-sub">${x}</p>`).join('')}
      ${res.nb.length ? `<div class="jx-newb"><b>${C.t('Nouveaux trophées', 'كؤوس جديدة')}</b>${res.nb.map(b => `<span>${BADGES[b][0]} ${C.t(BADGES[b][1], BADGES[b][2])}</span>`).join('')}</div>` : ''}
      <p class="jx-sub">${C.t('Rang', 'الرتبة')} : ${rank(p.xp).r[3]} ${C.t(rank(p.xp).r[1], rank(p.xp).r[2])} · ${p.xp} XP</p>
      <div class="jx-acts"><button type="button" class="jx-btn" id="again">↻ ${C.t('Rejouer', 'أعد اللعب')}</button><a class="jx-btn ghost" href="#/jeux">${C.t('Autres jeux', 'ألعاب أخرى')}</a></div></div>
      <div id="review"></div></section>`;
    $('#again').addEventListener('click', again);
    if (res.record || res.nb.length) confetti();
  }

  /* ---------- page d’accueil des jeux ---------- */
  const GAMES = [
    ['chrono', '⏱️', 'Défi chrono', 'تحدي الوقت', 'Un maximum de bonnes réponses en 60 secondes. Les séries rapportent des bonus !', 'أكبر عدد من الأجوبة الصحيحة في 60 ثانية. السلاسل تمنح نقاطا إضافية !', 'g1'],
    ['duel', '⚔️', 'Duel à deux', 'مبارزة ثنائية', 'Deux joueurs sur le même appareil, chacun son tour. Le plus rapide gagne plus de points.', 'لاعبان على نفس الجهاز، بالتناوب. الأسرع يربح نقاطا أكثر.', 'g2'],
    ['memory', '🧩', 'Memory des formules', 'ذاكرة العلاقات', 'Retourne les cartes et associe chaque formule à sa signification.', 'اقلب البطاقات واربط كل علاقة بمعناها.', 'g3'],
    ['unites', '📏', 'Unités express', 'الوحدات السريعة', 'Unités des grandeurs et conversions : 15 questions contre la montre.', 'وحدات المقادير والتحويلات : 15 سؤالا ضد الساعة.', 'g4'],
  ];
  function hub() {
    const p = load(), rk = rank(p.xp), pct = rk.nx ? (p.xp - rk.r[0]) / (rk.nx[0] - rk.r[0]) * 100 : 100;
    const bestOf = g => { const v = Object.entries(p.best).filter(([k]) => k.split(':')[0] === g).map(x => x[1]); return v.length ? Math.max(...v) : null; };
    app().innerHTML = `<section class="jx-page">
      <div class="jx-hero"><div><p class="jx-kick">${C.t('Réviser en s’amusant', 'راجع وأنت تستمتع')}</p><h1>${C.t('Espace Jeux & Défis', 'فضاء الألعاب والتحديات')}</h1>
        <p>${C.t('Toutes les questions viennent des chapitres de la bibliothèque. Gagne des points d’expérience, monte en rang et débloque des trophées.', 'كل الأسئلة مأخوذة من دروس المكتبة. اجمع نقاط الخبرة، ارتق في الرتب واحصل على الكؤوس.')}</p></div>
        <div class="jx-player"><div class="jx-av">${rk.r[3]}</div><div class="jx-pi">
          <label><span>${C.t('Ton pseudo', 'اسمك المستعار')}</span><input id="pseudo" maxlength="18" value="${C.esc(p.pseudo)}" placeholder="${C.t('ex. Yasmine', 'مثلا ياسمين')}" autocomplete="nickname"></label>
          <b>${C.t(rk.r[1], rk.r[2])} · ${p.xp} XP</b><div class="jx-xp"><i style="width:${pct}%"></i></div>
          <small>${rk.nx ? C.t('Prochain rang', 'الرتبة التالية') + ' : ' + C.t(rk.nx[1], rk.nx[2]) + ' (' + rk.nx[0] + ' XP)' : C.t('Rang maximal atteint !', 'بلغت أعلى رتبة !')}</small></div></div></div>
      <div class="jx-games">${GAMES.map(g => `<a class="jx-game tilt ${g[6]}" href="#/jeux/${g[0]}"><span class="jx-ic">${g[1]}</span><b>${C.t(g[2], g[3])}</b><span>${C.t(g[4], g[5])}</span>
        <span class="jx-meta">${bestOf(g[0]) !== null ? C.t('Record', 'الرقم القياسي') + ' : ' + bestOf(g[0]) : C.t('Pas encore joué', 'لم تلعب بعد')}<em>${C.t('Jouer', 'العب')} ›</em></span></a>`).join('')}</div>
      <div class="jx-two">
        <section class="jx-card"><h2>🏆 ${C.t('Trophées', 'الكؤوس')} <small>${p.badges.length}/${Object.keys(BADGES).length}</small></h2>
          <div class="jx-badges">${Object.entries(BADGES).map(([k, b]) => `<span class="jx-b${p.badges.includes(k) ? ' on' : ''}" title="${C.esc(C.t(b[1], b[2]))}"><i>${b[0]}</i><small>${C.t(b[1], b[2])}</small></span>`).join('')}</div></section>
        <section class="jx-card"><h2>📋 ${C.t('Tableau d’honneur', 'لوحة الشرف')} <small>${C.t('sur cet appareil', 'على هذا الجهاز')}</small></h2>
          ${GAMES.map(g => { const h = p.hall[g[0]] || []; return `<div class="jx-hall"><b>${g[1]} ${C.t(g[2], g[3])}</b>${h.length ? `<ol>${h.slice(0, 3).map(x => `<li><span>${C.esc(x.n)}</span><em>${x.s}</em></li>`).join('')}</ol>` : `<p>${C.t('Aucun score', 'لا توجد نتائج')}</p>`}</div>`; }).join('')}</section>
      </div>
      <p class="jx-note">${C.t('Les scores et trophées sont enregistrés dans ce navigateur uniquement.', 'النتائج والكؤوس محفوظة في هذا المتصفح فقط.')}</p></section>`;
    $('#pseudo').addEventListener('change', e => { const q = load(); q.pseudo = e.target.value.trim().slice(0, 18); save(q); });
  }

  /* ---------- 1. Défi chrono ---------- */
  function chronoSetup() {
    const st = C.store;
    app().innerHTML = `<section class="jx-page">${back()}<div class="jx-setup g1"><span class="jx-ic">⏱️</span><h1>${C.t('Défi chrono', 'تحدي الوقت')}</h1>
      <p>${C.t('60 secondes. +10 points par bonne réponse, et un bonus qui grandit avec la série. Une erreur coûte 5 secondes.', '60 ثانية. +10 نقاط لكل جواب صحيح، ومكافأة تكبر مع السلسلة. الخطأ يكلف 5 ثوان.')}</p>
      <div class="jx-form">${sel('niv', C.t('Niveau', 'المستوى'), nivList(), st.get('jx-niv', 'all'))}${sel('mat', C.t('Matière', 'المادة'), matList(), st.get('jx-mat', 'all'))}</div>
      <button type="button" class="jx-btn big" id="go">▶ ${C.t('C’est parti !', 'هيا بنا !')}</button></div></section>`;
    $('#go').addEventListener('click', async () => {
      const niv = $('#niv').value, mat = $('#mat').value; st.set('jx-niv', niv); st.set('jx-mat', mat);
      $('#go').disabled = true; $('#go').textContent = C.t('Chargement…', 'جار التحميل…');
      const P = shuffle(await pool(niv, mat)); if (!P.length) { $('#go').textContent = C.t('Aucune question', 'لا أسئلة'); return; }
      chronoPlay(P, niv + '-' + mat);
    });
  }
  function chronoPlay(P, label) {
    const T = 60; let left = T, score = 0, serie = 0, maxSerie = 0, i = 0, good = 0, n = 0, lock = false; const missed = [];
    app().innerHTML = `<section class="jx-page jx-play g1">${back()}<div class="jx-hud"><span class="jx-score">0 <small>pts</small></span><span class="jx-serie" hidden></span><span class="jx-time">60</span></div>
      <div class="jx-timer"><i></i></div><div class="jx-q" dir="ltr" lang="fr"></div></section>`;
    const hud = $('.jx-score'), tm = $('.jx-time'), bar = $('.jx-timer i'), sr = $('.jx-serie');
    function show() {
      if (left <= 0) return; const q = P[i % P.length]; i++; lock = false;
      const os = opts(q);
      $('.jx-q').innerHTML = `<p class="jx-ch">${C.esc(q.ch)}</p><div class="jx-qt">${q.q}</div><div class="jx-os">${os.map((o, k) => `<button type="button" data-k="${k}">${o.o}</button>`).join('')}</div>`;
      C.typeset($('.jx-q'));
      $$('.jx-os button').forEach(b => b.addEventListener('click', () => {
        if (lock || left <= 0) return; lock = true; n++;
        const ok = os[+b.dataset.k].ok;
        $$('.jx-os button').forEach((x, k) => { if (os[k].ok) x.classList.add('ok'); });
        if (ok) { good++; serie++; maxSerie = Math.max(maxSerie, serie); score += 10 + Math.min(20, (serie - 1) * 2); b.classList.add('ok'); }
        else { b.classList.add('ko'); serie = 0; left = Math.max(0, left - 5); missed.push(q); }
        hud.innerHTML = score + ' <small>pts</small>'; sr.hidden = serie < 2; sr.textContent = '🔥 ×' + serie;
        later(show, ok ? 450 : 1300);
      }));
    }
    every(() => {
      left = Math.max(0, left - 0.1); tm.textContent = Math.ceil(left); bar.style.width = (left / T * 100) + '%'; bar.classList.toggle('low', left < 10);
      if (left <= 0) { stop(); finish(); }
    }, 100);
    show();
    function finish() {
      const earned = []; if (score >= 100) earned.push('chrono100'); if (score >= 300) earned.push('chrono300'); if (maxSerie >= 10) earned.push('serie10');
      const res = record('chrono', score, score / 2, earned, label);
      endCard(C.t('Temps écoulé !', 'انتهى الوقت !'), score + ' pts', [C.t('Bonnes réponses', 'أجوبة صحيحة') + ' : ' + good + ' / ' + n, C.t('Meilleure série', 'أفضل سلسلة') + ' : ' + maxSerie], res, () => chronoPlay(shuffle(P), label));
      if (missed.length) {
        $('#review').innerHTML = `<section class="jx-card" dir="ltr" lang="fr"><h2>📖 ${C.t('À revoir', 'للمراجعة')}</h2>${missed.slice(0, 10).map(q => `<div class="jx-rev"><small>${C.esc(q.ch)}</small><div>${q.q}</div><p>✔ ${q.o[q.r]}</p>${q.e ? `<p class="jx-e">${q.e}</p>` : ''}</div>`).join('')}</section>`;
        C.typeset($('#review'));
      }
    }
  }

  /* ---------- 2. Duel à deux ---------- */
  function duelSetup() {
    const st = C.store;
    app().innerHTML = `<section class="jx-page">${back()}<div class="jx-setup g2"><span class="jx-ic">⚔️</span><h1>${C.t('Duel à deux', 'مبارزة ثنائية')}</h1>
      <p>${C.t('Chacun son tour, 20 secondes par question. Bonne réponse : 10 points + bonus de rapidité.', 'كل واحد في دوره، 20 ثانية لكل سؤال. الجواب الصحيح : 10 نقاط + مكافأة السرعة.')}</p>
      <div class="jx-form"><label class="jx-f p1"><span>${C.t('Joueur 1', 'اللاعب 1')}</span><input id="j1" maxlength="14" value="${C.esc(st.get('jx-j1', ''))}" placeholder="${C.t('Prénom', 'الاسم')}"></label>
        <label class="jx-f p2"><span>${C.t('Joueur 2', 'اللاعب 2')}</span><input id="j2" maxlength="14" value="${C.esc(st.get('jx-j2', ''))}" placeholder="${C.t('Prénom', 'الاسم')}"></label>
        ${sel('niv', C.t('Niveau', 'المستوى'), nivList(), st.get('jx-niv', 'all'))}${sel('nb', C.t('Questions par joueur', 'أسئلة لكل لاعب'), [['5', '5'], ['8', '8'], ['10', '10']], '5')}</div>
      <button type="button" class="jx-btn big" id="go">▶ ${C.t('Commencer le duel', 'ابدأ المبارزة')}</button></div></section>`;
    $('#go').addEventListener('click', async () => {
      const names = [$('#j1').value.trim() || C.t('Joueur 1', 'اللاعب 1'), $('#j2').value.trim() || C.t('Joueur 2', 'اللاعب 2')];
      st.set('jx-j1', $('#j1').value.trim()); st.set('jx-j2', $('#j2').value.trim()); st.set('jx-niv', $('#niv').value);
      $('#go').disabled = true; $('#go').textContent = C.t('Chargement…', 'جار التحميل…');
      const P = pick(await pool($('#niv').value, 'all'), 2 * +$('#nb').value); if (P.length < 2) return;
      duelPlay(P, names);
    });
  }
  function duelPlay(P, names) {
    const sc = [0, 0], ok = [0, 0]; let i = 0;
    app().innerHTML = `<section class="jx-page jx-play g2">${back()}<div class="jx-duel"><div class="jx-pl p1"><b>${C.esc(names[0])}</b><span>0</span></div><div class="jx-vs">VS</div><div class="jx-pl p2"><b>${C.esc(names[1])}</b><span>0</span></div></div>
      <div class="jx-turn"></div><div class="jx-timer"><i></i></div><div class="jx-q" dir="ltr" lang="fr"></div></section>`;
    function show() {
      stop(); if (i >= P.length) return finish();
      const pl = i % 2, q = P[i], os = opts(q); let left = 20, lock = false;
      $$('.jx-pl').forEach((x, k) => x.classList.toggle('on', k === pl));
      $('.jx-turn').innerHTML = `${C.t('Au tour de', 'دور')} <b class="c${pl + 1}">${C.esc(names[pl])}</b> · ${C.t('question', 'سؤال')} ${Math.floor(i / 2) + 1}/${P.length / 2}`;
      $('.jx-q').innerHTML = `<p class="jx-ch">${C.esc(q.ch)}</p><div class="jx-qt">${q.q}</div><div class="jx-os">${os.map((o, k) => `<button type="button" data-k="${k}">${o.o}</button>`).join('')}</div>`;
      C.typeset($('.jx-q'));
      const bar = $('.jx-timer i');
      const answer = k => {
        if (lock) return; lock = true; stop();
        $$('.jx-os button').forEach((x, j) => { if (os[j].ok) x.classList.add('ok'); else if (j === k) x.classList.add('ko'); });
        if (k !== null && os[k].ok) { ok[pl]++; sc[pl] += 10 + Math.ceil(left / 4); }
        $$('.jx-pl span').forEach((x, j) => { x.textContent = sc[j]; });
        i++; later(show, 1400);
      };
      $$('.jx-os button').forEach(b => b.addEventListener('click', () => answer(+b.dataset.k)));
      every(() => { left = Math.max(0, left - 0.1); bar.style.width = (left / 20 * 100) + '%'; bar.classList.toggle('low', left < 5); if (left <= 0) answer(null); }, 100);
    }
    function finish() {
      const w = sc[0] === sc[1] ? -1 : sc[0] > sc[1] ? 0 : 1;
      const res = record('duel', Math.max(...sc), (sc[0] + sc[1]) / 4, ['duel']);
      endCard(w < 0 ? C.t('Égalité !', 'تعادل !') : C.t('Victoire de ', 'فوز ') + names[w] + ' !', sc[0] + ' – ' + sc[1],
        [names[0] + ' : ' + ok[0] + ' ' + C.t('bonnes réponses', 'أجوبة صحيحة'), names[1] + ' : ' + ok[1] + ' ' + C.t('bonnes réponses', 'أجوبة صحيحة')], res, () => duelPlay(shuffle(P), names));
      confetti();
    }
    show();
  }

  /* ---------- 3. Memory des formules ---------- */
  function memorySetup() {
    const st = C.store, niv = st.get('jx-mniv', '2bac');
    const chs = n => [['', C.t('Au hasard dans le niveau', 'عشوائيا من المستوى')]].concat(C.ALL.filter(l => l.niv.id === n).map(l => [l.id, C.t(l.fr, l.ar)]));
    app().innerHTML = `<section class="jx-page">${back()}<div class="jx-setup g3"><span class="jx-ic">🧩</span><h1>${C.t('Memory des formules', 'ذاكرة العلاقات')}</h1>
      <p>${C.t('12 cartes face cachée : 6 formules et leurs 6 significations. Retrouve toutes les paires avec le moins de coups possible.', '12 بطاقة مقلوبة : 6 علاقات و6 معانيها. جد كل الأزواج بأقل عدد من المحاولات.')}</p>
      <div class="jx-form">${sel('niv', C.t('Niveau', 'المستوى'), NIVS(), niv)}<label class="jx-f"><span>${C.t('Chapitre', 'الدرس')}</span><select id="ch"></select></label></div>
      <button type="button" class="jx-btn big" id="go">▶ ${C.t('Jouer', 'العب')}</button></div></section>`;
    const fill = () => { $('#ch').innerHTML = chs($('#niv').value).map(x => `<option value="${x[0]}">${C.esc(x[1])}</option>`).join(''); };
    fill(); $('#niv').addEventListener('change', fill);
    $('#go').addEventListener('click', async () => {
      const n = $('#niv').value, id = $('#ch').value; st.set('jx-mniv', n);
      const ls = C.ALL.filter(l => l.niv.id === n); await Promise.all(ls.map(l => C.loadContenu(l)));
      const fm = l => C.chapter(l).formules.filter(f => f.tex && f.sens).map(f => ({ tex: f.tex, sens: f.sens, ch: C.t(l.fr, l.ar) }));
      let F = id ? fm(C.ALL.find(l => l.id === id)) : [];
      const seen = new Set(F.map(f => f.sens));
      if (F.length < 6) shuffle(ls).forEach(l => fm(l).forEach(f => { if (F.length < 30 && !seen.has(f.sens)) { seen.add(f.sens); F.push(f); } }));
      memoryPlay(pick(F, 6), id || n);
    });
  }
  function memoryPlay(F, label) {
    const cards = shuffle(F.flatMap((f, k) => [{ k, tex: f.tex }, { k, txt: f.sens }]));
    let open = [], found = 0, moves = 0, errs = 0, t0 = Date.now(), lock = false;
    app().innerHTML = `<section class="jx-page jx-play g3">${back()}<div class="jx-hud"><span class="jx-score">0 <small>${C.t('coups', 'محاولة')}</small></span><span class="jx-time">0 s</span></div>
      <div class="jx-mem">${cards.map((c, i) => `<button type="button" class="jx-card3" data-i="${i}" aria-label="${C.t('Carte', 'بطاقة')} ${i + 1}"><span class="f back">?</span><span class="f front ${c.tex ? 'tex' : 'txt'}" dir="ltr">${c.tex ? `<span data-tex="${C.esc(c.tex)}"></span>` : C.esc(c.txt)}</span></button>`).join('')}</div></section>`;
    C.typeset($('.jx-mem'));
    every(() => { $('.jx-time').textContent = Math.round((Date.now() - t0) / 1000) + ' s'; }, 500);
    $$('.jx-card3').forEach(b => b.addEventListener('click', () => {
      if (lock || b.classList.contains('up') || b.classList.contains('done')) return;
      b.classList.add('up'); open.push(b);
      if (open.length < 2) return;
      moves++; $('.jx-score').innerHTML = moves + ` <small>${C.t('coups', 'محاولة')}</small>`;
      const [a, c] = open; open = [];
      if (cards[+a.dataset.i].k === cards[+c.dataset.i].k) { a.classList.add('done'); c.classList.add('done'); found++; if (found === F.length) later(finish, 600); }
      else { errs++; lock = true; later(() => { a.classList.remove('up'); c.classList.remove('up'); lock = false; }, 1100); }
    }));
    function finish() {
      stop(); const s = Math.round((Date.now() - t0) / 1000), score = Math.max(50, 1000 - errs * 60 - s * 4);
      const earned = ['memory']; if (!errs) earned.push('memoryparfait');
      const res = record('memory', score, score / 5, earned, label);
      endCard(C.t('Bravo, toutes les paires !', 'أحسنت، كل الأزواج !'), score + ' pts', [moves + ' ' + C.t('coups', 'محاولة') + ' · ' + s + ' s · ' + errs + ' ' + C.t('erreur(s)', 'خطأ')], res, () => memoryPlay(shuffle(F), label));
    }
  }

  /* ---------- 4. Unités express ---------- */
  const UN = [['une force', 'N'], ['une énergie', 'J'], ['une puissance', 'W'], ['une pression', 'Pa'], ['une fréquence', 'Hz'], ['une résistance', 'Ω'], ['une capacité', 'F'],
    ['une inductance', 'H'], ['un champ magnétique', 'T'], ['une charge électrique', 'C'], ['une tension', 'V'], ['une intensité du courant', 'A'], ['un champ électrique', 'V/m'],
    ['une concentration molaire', 'mol/L'], ['une quantité de matière', 'mol'], ['une masse molaire', 'g/mol'], ['une conductivité', 'S/m'], ['une conductance', 'S'],
    ['l’activité d’une source radioactive', 'Bq'], ['une vitesse angulaire', 'rad/s'], ['le moment d’une force', 'N·m'], ['la raideur d’un ressort', 'N/m'],
    ['une accélération', 'm/s²'], ['une masse volumique', 'kg/m³'], ['un moment d’inertie', 'kg·m²'], ['une constante de temps τ', 's'], ['une vitesse', 'm/s']];
  const sup = n => String(n).replace(/[-0-9]/g, d => '⁻⁰¹²³⁴⁵⁶⁷⁸⁹'['-0123456789'.indexOf(d)]);
  const num = x => { if (x === 0) return '0'; const e = Math.floor(Math.log10(Math.abs(x))); if (e >= -2 && e <= 4) return String(+x.toPrecision(4)).replace('.', ','); const m = +(x / 10 ** e).toPrecision(3); return (m === 1 ? '' : String(m).replace('.', ',') + '×') + '10' + sup(e); };
  const CONV = [[v => [v, 'km/h'], v => v / 3.6, 'm/s', [36, 72, 90, 108, 54]], [v => [v, 'mA'], v => v / 1000, 'A', [20, 150, 250, 5, 400]], [v => [v, 'µF'], v => v * 1e-6, 'F', [10, 47, 100, 2.2, 220]],
    [v => [v, 'nm'], v => v * 1e-9, 'm', [400, 589, 633, 750]], [v => [v, 'kJ'], v => v * 1000, 'J', [2, 4.5, 12, 0.3]], [v => [v, 'mL'], v => v / 1000, 'L', [20, 250, 100, 10]],
    [v => [v, 'cm²'], v => v * 1e-4, 'm²', [5, 20, 150, 2]], [v => [v, 'g'], v => v / 1000, 'kg', [250, 50, 1500, 5]], [v => [v, 'ms'], v => v / 1000, 's', [20, 5, 400, 40]],
    [v => [v, 'MeV'], v => v * 1.6e-13, 'J', [1, 5, 200]], [v => [v, 'mmol/L'], v => v / 1000, 'mol/L', [10, 2, 50]], [v => [v, '°C'], v => v + 273, 'K', [25, 100, 0, 37]],
    [v => [v, 'mH'], v => v / 1000, 'H', [10, 200, 50]], [v => [v, 'kΩ'], v => v * 1000, 'Ω', [1, 4.7, 10, 2.2]], [v => [v, 'mm'], v => v / 1000, 'm', [5, 0.5, 12]]];
  function unitQ() {
    if (Math.random() < 0.45) {
      const [g, u] = UN[Math.floor(Math.random() * UN.length)], wr = pick(UN.filter(x => x[1] !== u), 3).map(x => x[1]);
      return { q: C.t('Quelle est l’unité de ', 'ما وحدة ') + g + ' ?', o: shuffle([u].concat(wr)), r: u };
    }
    const c = CONV[Math.floor(Math.random() * CONV.length)], v = c[3][Math.floor(Math.random() * c[3].length)], [a, ua] = c[0](v), res = c[1](v);
    const good = num(res) + ' ' + c[2];
    const wrong = [res * 10, res / 10, res * 1000, res / 1000, res * 100].filter(x => num(x) !== num(res)).map(x => num(x) + ' ' + c[2]);
    if (c[2] === 'K') wrong.splice(0, 3, num(v - 273) + ' K', num(v + 173) + ' K', num(v * 273) + ' K');
    const o = shuffle([good].concat(pick([...new Set(wrong)], 3)));
    return { q: C.t('Convertis : ', 'حول : ') + String(a).replace('.', ',') + ' ' + ua + ' = ?', o, r: good };
  }
  function unitesPlay() {
    const N = 15; let i = 0, good = 0, score = 0, q, left, lock;
    app().innerHTML = `<section class="jx-page jx-play g4">${back()}<div class="jx-hud"><span class="jx-score">0 <small>pts</small></span><span class="jx-time">1/${N}</span></div>
      <div class="jx-timer"><i></i></div><div class="jx-q" dir="ltr" lang="fr"></div></section>`;
    const bar = $('.jx-timer i');
    function show() {
      stop(); if (i >= N) return finish();
      q = unitQ(); left = 12; lock = false; i++; $('.jx-time').textContent = i + '/' + N;
      $('.jx-q').innerHTML = `<div class="jx-qt big">${q.q}</div><div class="jx-os">${q.o.map(o => `<button type="button">${o}</button>`).join('')}</div>`;
      const answer = b => {
        if (lock) return; lock = true; stop();
        $$('.jx-os button').forEach(x => { if (x.textContent === q.r) x.classList.add('ok'); });
        if (b && b.textContent === q.r) { good++; score += 10 + Math.ceil(left); } else if (b) b.classList.add('ko');
        $('.jx-score').innerHTML = score + ' <small>pts</small>'; later(show, b && b.textContent === q.r ? 500 : 1300);
      };
      $$('.jx-os button').forEach(b => b.addEventListener('click', () => answer(b)));
      every(() => { left = Math.max(0, left - 0.1); bar.style.width = (left / 12 * 100) + '%'; bar.classList.toggle('low', left < 4); if (left <= 0) answer(null); }, 100);
    }
    function finish() {
      const earned = []; if (good >= 12) earned.push('unites'); if (good === N) earned.push('unites15');
      const res = record('unites', score, score / 2, earned);
      endCard(C.t('Série terminée !', 'انتهت السلسلة !'), good + ' / ' + N, [score + ' pts'], res, unitesPlay);
    }
    show();
  }
  function unitesSetup() {
    app().innerHTML = `<section class="jx-page">${back()}<div class="jx-setup g4"><span class="jx-ic">📏</span><h1>${C.t('Unités express', 'الوحدات السريعة')}</h1>
      <p>${C.t('15 questions : unité d’une grandeur ou conversion (km/h → m/s, µF → F, MeV → J…). 12 secondes par question ; plus tu es rapide, plus tu gagnes de points.', '15 سؤالا : وحدة مقدار أو تحويل (km/h → m/s، µF → F، MeV → J…). 12 ثانية لكل سؤال ؛ كلما كنت أسرع ربحت نقاطا أكثر.')}</p>
      <button type="button" class="jx-btn big" id="go">▶ ${C.t('C’est parti !', 'هيا بنا !')}</button></div></section>`;
    $('#go').addEventListener('click', unitesPlay);
  }

  return {
    init(ctx) { C = ctx; },
    stop,
    page(sub) {
      stop();
      ({ chrono: chronoSetup, duel: duelSetup, memory: memorySetup, unites: unitesSetup }[sub] || hub)();
    },
  };
})();
