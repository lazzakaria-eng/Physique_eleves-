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
  let hooks = [];
  const stop = () => { hooks.forEach(f => { try { f(); } catch (e) { /* déjà arrêté */ } }); hooks = []; timers.forEach(x => { clearInterval(x); clearTimeout(x); }); timers = []; if (keyH) { document.removeEventListener('keydown', keyH); keyH = null; } };
  const later = (f, ms) => timers.push(setTimeout(f, ms));
  const hook = f => hooks.push(f);
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
      if (kind === 'goal' || kind === 'crowd') { // clameur de la foule (bruit filtré) + sifflet
        const len = kind === 'goal' ? 2.4 : 1.2, buf = AC.createBuffer(1, AC.sampleRate * len, AC.sampleRate), d = buf.getChannelData(0);
        for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (0.6 + 0.4 * Math.sin(i / AC.sampleRate * 9));
        const src = AC.createBufferSource(), bp = AC.createBiquadFilter(), g = AC.createGain(), t0 = AC.currentTime; src.buffer = buf; bp.type = 'bandpass'; bp.frequency.value = 900; bp.Q.value = .7;
        g.gain.setValueAtTime(.0001, t0); g.gain.exponentialRampToValueAtTime(.5, t0 + .25); g.gain.exponentialRampToValueAtTime(.0001, t0 + len);
        src.connect(bp); bp.connect(g); g.connect(AC.destination); src.start(t0); src.stop(t0 + len);
        if (kind === 'goal') beep('whistle');
        return;
      }
      if (kind === 'whistle' || kind === 'kick') {
        const o = AC.createOscillator(), g = AC.createGain(), t0 = AC.currentTime, w = kind === 'whistle';
        o.type = w ? 'square' : 'sine'; o.frequency.setValueAtTime(w ? 2600 : 180, t0); if (w) { for (let k = 0; k < 6; k++) o.frequency.setValueAtTime(k % 2 ? 2400 : 2750, t0 + k * .05); } else o.frequency.exponentialRampToValueAtTime(50, t0 + .12);
        g.gain.setValueAtTime(.0001, t0); g.gain.exponentialRampToValueAtTime(w ? .08 : .6, t0 + .01); g.gain.exponentialRampToValueAtTime(.0001, t0 + (w ? .45 : .16));
        o.connect(g); g.connect(AC.destination); o.start(t0); o.stop(t0 + .5); return;
      }
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
  /* Banque de questions des chapitres choisis : quiz du chapitre + questions générées à partir du cours
     (formules ↔ signification, « À retenir » / « Erreurs fréquentes » en vrai-faux, affirmation correcte, buts et conclusions des expériences). */
  const strip = h => String(h).replace(/<[^>]+>/g, '');
  const FALSE_RE = /^(Croire|Penser|Considérer|Affirmer|Dire)\s+(que|qu’|qu')\s*/i;
  async function pool(chs) {
    const ls = C.ALL.filter(l => chs.includes(l.id)), lv = [...new Set(ls.map(l => l.niv.id))], same = C.ALL.filter(l => lv.includes(l.niv.id));
    await Promise.all(same.map(l => C.loadContenu(l)));
    const info = l => { const c = C.chapter(l), X = (window.EXTRA || {})[l.id] || {}, xs = ((window.EXPS || {})[l.id] || []).concat(c.protocole ? [{ t: c.protocole.titre, cc: c.conclusion }] : []);
      return { l, c, X, F: (c.formules || []).filter(f => f.tex && f.sens), R: (c.retenir || []).map(String).filter(x => strip(x).length > 8 && strip(x).length < 230),
        E: (c.erreurs || []).map(String).filter(x => FALSE_RE.test(strip(x))), XP: xs.filter(x => x && x.t) }; };
    const LV = same.map(info), byId = Object.fromEntries(LV.map(x => [x.l.id, x]));
    // voisinage d’un chapitre : même unité du programme, puis même niveau et même matière (jamais l’autre matière ni un autre niveau)
    const near = l => LV.filter(x => x.l !== l && x.l.niv === l.niv && x.l.mat === l.mat && x.l.ui === l.ui), far = l => LV.filter(x => x.l.niv === l.niv && x.l.mat === l.mat && x.l.ui !== l.ui);
    const uniq = a => { const s = new Set(); return a.filter(x => { const k = typeof x === 'object' ? x.tex + '|' + x.sens : strip(x); if (s.has(k)) return false; s.add(k); return true; }); };
    const key = x => typeof x === 'object' ? x.tex + '|' + x.sens : strip(x);
    const others = (own, nr, fr, good, n = 3) => uniq(shuffle(own).concat(shuffle(nr), shuffle(fr || []))).filter(x => key(x) !== key(good)).slice(0, n);
    // « Croire que X : correction. » → « X. » (on retire la correction qui suit)
    const fals = x => { let t = String(x).replace(FALSE_RE, '').replace(/\s*(?:\s:\s|\s;\s|\s\(c’est|\s\(c'est|\s—\s).*$/, '').replace(/[.\s]*$/, '.'); return t.charAt(0).toUpperCase() + t.slice(1); };
    const cc = e => strip(Array.isArray(e.cc) ? e.cc[0] : e.cc || ''), okCc = t => t.length > 10 && t.length < 230;
    const F_ = L => L.flatMap(x => x.F), FA_ = L => L.flatMap(x => x.E.map(fals)), B_ = L => L.flatMap(x => x.XP.filter(e => e.but).map(e => e.but)), CC_ = L => L.flatMap(x => x.XP.map(cc)).filter(okCc);
    const DEP = /^(Son |Sa |Ses |Cette |Ce |Cet |Ces |Dans ce |Dans cette |Pour ce |Pour cette |Avec ce |Avec cette |De ce |En déduire|On en déduit)|\b(ce circuit|cette pile|ci-dessus|précédente?)\b/i;
    const out = [], seen = new Set();
    const add = (l, q, o, e) => { if (o.length < 2) return; const k = strip(q) + '|' + o.map(strip).join('|'); if (seen.has(k)) return; seen.add(k); out.push({ q, o, r: 0, e: e || '', ch: C.t(l.fr, l.ar), id: l.id }); };
    ls.forEach(l => {
      const I = byId[l.id], NR = near(l), FR = far(l);
      // questions du quiz ; une question qui dépend de la précédente (« Cette pile… ») reçoit ses données
      [I.c.quiz || [], I.X.quiz || []].forEach(Z => { let prev = null; Z.forEach(q => { if (q && q.o && q.o.length > 1 && q.r < q.o.length) {
        const o = [q.o[q.r]].concat(q.o.filter((_, k) => k !== q.r)), qq = prev && DEP.test(strip(q.q)) ? `<span class="jx-ctx">${prev.q} <b>→ ${prev.o[prev.r]}</b></span>${q.q}` : q.q;
        if (!prev && DEP.test(strip(q.q))) return; add(l, qq, o, q.e); prev = DEP.test(strip(q.q)) && prev ? prev : q; } }); });
      I.F.forEach(f => {
        const ot = others(I.F.filter(g => g.sens !== f.sens), F_(NR).filter(g => g.sens !== f.sens), F_(FR).filter(g => g.sens !== f.sens), f).filter(g => g.sens !== f.sens);
        const os = uniq(ot.map(g => C.esc(g.sens))).filter(x => x !== C.esc(f.sens)).slice(0, 3);
        if (os.length >= 2) add(l, C.t('Que représente la relation', 'ماذا تمثل العلاقة') + ` \\(${f.tex}\\) ?`, [C.esc(f.sens)].concat(os), '');
        const ot2 = uniq(shuffle(I.F.filter(g => g.tex !== f.tex)).concat(shuffle(F_(NR).filter(g => g.tex !== f.tex && g.sens !== f.sens)), shuffle(F_(FR).filter(g => g.tex !== f.tex && g.sens !== f.sens)))).slice(0, 3);
        const t2 = [...new Set(ot2.map(g => g.tex))].filter(x => x !== f.tex); if (t2.length >= 2) add(l, C.t('Quelle relation correspond à', 'أي علاقة توافق') + ` : « ${C.esc(f.sens)} » ?`, [`\\(${f.tex}\\)`].concat(t2.map(x => `\\(${x}\\)`)), '');
      });
      I.R.forEach(r => add(l, C.t('Vrai ou faux ?', 'صحيح أم خطأ ؟') + ' ' + r, [C.t('Vrai', 'صحيح'), C.t('Faux', 'خطأ')], C.t('À retenir du cours.', 'يجب حفظه من الدرس.')));
      I.E.forEach(x => add(l, C.t('Vrai ou faux ?', 'صحيح أم خطأ ؟') + ' ' + fals(x), [C.t('Faux', 'خطأ'), C.t('Vrai', 'صحيح')], C.t('Erreur fréquente : ', 'خطأ شائع : ') + x));
      // une seule affirmation fausse parmi des affirmations vraies du même chapitre
      I.E.forEach(x => { const tr = pick(I.R, 3); if (tr.length >= 2) add(l, C.t('Quelle affirmation est FAUSSE ?', 'أي عبارة خاطئة ؟'), [fals(x)].concat(tr), C.t('Erreur fréquente : ', 'خطأ شائع : ') + x); });
      // une seule affirmation vraie parmi des erreurs du même chapitre ou de la même unité
      I.R.slice(0, 4).forEach(r => { const fs = others(I.E.map(fals), FA_(NR), null, r); if (fs.length >= 2) add(l, C.t('Quelle affirmation est correcte ?', 'أي عبارة صحيحة ؟'), [r].concat(fs), ''); });
      I.XP.forEach(e => {
        if (e.but) { const ob = others(I.XP.filter(x => x.but && x !== e).map(x => x.but), B_(NR), B_(FR), e.but); if (ob.length >= 2) add(l, C.t('Quel est le but de l’expérience', 'ما هدف التجربة') + ` « ${strip(e.t)} » ?`, [e.but].concat(ob), ''); }
        const c0 = cc(e); if (c0.length > 10 && c0.length < 230) { const oc = others(I.XP.filter(x => x !== e).map(cc).filter(okCc), CC_(NR), CC_(FR), c0); if (oc.length >= 2) add(l, C.t('Quelle conclusion tire-t-on de l’expérience', 'ما الاستنتاج من التجربة') + ` « ${strip(e.t)} » ?`, [c0].concat(oc), ''); }
      });
      // questions de calcul générées (nouvelles valeurs à chaque partie)
      if (window.QGEN) QGEN.gen(l.id, 40).forEach(x => add(l, x.q, x.o, x.e));
    });
    return out;
  }
  const opts = q => shuffle(q.o.map((o, i) => ({ o, ok: i === q.r })));

  /* ---------- choix d’un ou plusieurs chapitres (niveau par niveau) ---------- */
  const LVN = { tc: 'Tronc commun', '1bac': '1re Bac', '2bac': '2e Bac' };
  let CHS = [];
  /* source des questions : cours (chapitres) ou culture générale (thèmes) */
  let MODE = 'cours', CATS_SEL = [];
  const CULT_OK = ['match', 'chrono', 'penalty', 'duo', 'corde', 'fusees', 'vraifaux', 'foot'];
  async function getQ() { return MODE === 'culture' && window.CULTURE ? CULTURE.gen(CATS_SEL, 500) : pool(CHS); }
  function catPicker() {
    const ALLC = window.CULTURE ? CULTURE.CATS : []; let chosen = (get('jx-cult-cats', null) || ALLC.map(c => c[0])).filter(x => ALLC.some(c => c[0] === x));
    const html = `<div class="jx-chp jx-catp"><div class="jx-chp-h"><b>🌍 ${C.t('Thèmes de culture générale', 'مواضيع الثقافة العامة')}</b><span class="jx-cat-n"></span></div><div class="jx-cat-list"></div>
      <div class="jx-cat-acts"><button type="button" data-a="all">✔ ${C.t('Tous les thèmes', 'كل المواضيع')}</button><button type="button" data-a="none">✕ ${C.t('Aucun', 'لا شيء')}</button></div></div>`;
    const paint = () => {
      $('.jx-cat-list').innerHTML = ALLC.map(c => `<label class="${chosen.includes(c[0]) ? 'on' : ''}"><input type="checkbox" value="${c[0]}"${chosen.includes(c[0]) ? ' checked' : ''}> <small>${c[1]}</small> ${C.esc(C.t(c[2], c[3]))}</label>`).join('');
      $$('.jx-cat-list input').forEach(x => x.addEventListener('change', () => { chosen = x.checked ? chosen.concat(x.value) : chosen.filter(y => y !== x.value); put('jx-cult-cats', chosen); paint(); }));
      $('.jx-cat-n').textContent = chosen.length + ' ' + C.t('thème(s)', 'موضوع'); document.dispatchEvent(new Event('jx-src'));
    };
    const wire = () => { $$('.jx-cat-acts button').forEach(b => b.addEventListener('click', () => { chosen = b.dataset.a === 'all' ? ALLC.map(c => c[0]) : []; put('jx-cult-cats', chosen); paint(); })); paint(); };
    return { html, wire, get: () => chosen.slice() };
  }
  // bloc « Cours / Culture générale » : cp = sélecteur de chapitres, ct = sélecteur de thèmes
  function srcBlock(cp, ct) {
    let src = get('jx-src', 'cours'); if (!window.CULTURE) src = 'cours';
    const html = `<div class="jx-src"><button type="button" data-src="cours">📚 ${C.t('Questions du cours', 'أسئلة الدروس')}</button><button type="button" data-src="culture">🌍 ${C.t('Culture générale', 'الثقافة العامة')}</button></div>
      <div class="jx-pane" data-pane="cours">${cp.html}</div><div class="jx-pane" data-pane="culture">${ct.html}</div>`;
    const sync = () => {
      $$('.jx-src button').forEach(b => b.classList.toggle('on', b.dataset.src === src)); $$('.jx-pane').forEach(p => { p.hidden = p.dataset.pane !== src; });
      const g = $('#go'); if (g) g.disabled = src === 'culture' ? !ct.get().length : !cp.get().length;
    };
    const wire = () => { cp.wire(); ct.wire(); $$('.jx-src button').forEach(b => b.addEventListener('click', () => { src = b.dataset.src; put('jx-src', src); sync(); })); document.addEventListener('jx-src', sync); hook(() => document.removeEventListener('jx-src', sync)); sync(); };
    return { html, wire, mode: () => src };
  }
  function chapPicker(key, avail, cnt) {
    const ALL = C.ALL.filter(l => !avail || avail.includes(l.id)), lvls = Object.keys(LVN).filter(n => ALL.some(l => l.niv.id === n));
    let chosen = (get('jx-chs-' + key, null) || []).filter(x => ALL.some(l => l.id === x)); if (!chosen.length) chosen = ALL.filter(l => l.niv.id === lvls[lvls.length - 1]).map(l => l.id);
    let tab = (ALL.find(l => chosen.includes(l.id)) || ALL[0]).niv.id, mat = 'all';
    // un seul niveau à la fois : jamais de questions d’un autre niveau
    const lvOf = id => (ALL.find(l => l.id === id) || {}).niv, onLevel = () => { chosen = chosen.filter(x => (lvOf(x) || {}).id === tab); if (!chosen.length) chosen = ALL.filter(l => l.niv.id === tab).map(l => l.id); put('jx-chs-' + key, chosen); };
    onLevel();
    const html = `<div class="jx-chp"><div class="jx-chp-h"><b>📚 ${C.t('Niveau et chapitres du programme', 'المستوى ودروس المقرر')}</b><span class="jx-chp-n"></span></div>
      <div class="jx-chp-tabs">${lvls.map(n => `<button type="button" data-lv="${n}">${LVN[n]}</button>`).join('')}<span class="jx-chp-sep"></span>
        ${[['all', C.t('Tout', 'الكل')], ['physique', C.t('Physique', 'الفيزياء')], ['chimie', C.t('Chimie', 'الكيمياء')]].map(m => `<button type="button" class="m" data-m="${m[0]}">${m[1]}</button>`).join('')}</div><div class="jx-chp-list"></div>
      <div class="jx-chp-acts"><button type="button" data-a="all">✔ ${C.t('Tout cocher', 'تحديد الكل')}</button><button type="button" data-a="none">✕ ${C.t('Tout décocher', 'إلغاء الكل')}</button></div></div>`;
    const vis = () => ALL.filter(l => l.niv.id === tab && (mat === 'all' || l.mat === mat));
    const paint = () => {
      $$('.jx-chp-tabs [data-lv]').forEach(b => b.classList.toggle('on', b.dataset.lv === tab)); $$('.jx-chp-tabs [data-m]').forEach(b => b.classList.toggle('on', b.dataset.m === mat));
      $('.jx-chp-list').innerHTML = vis().map(l => `<label class="${chosen.includes(l.id) ? 'on' : ''}"><input type="checkbox" value="${l.id}"${chosen.includes(l.id) ? ' checked' : ''}> <small>${l.mat === 'chimie' ? '🧪' : '⚛️'}</small> ${C.esc(C.t(l.fr, l.ar))}${cnt && cnt[l.id] ? ` <em class="jx-chp-c">${cnt[l.id]}</em>` : ''}</label>`).join('');
      $$('.jx-chp-list input').forEach(c => c.addEventListener('change', () => { chosen = c.checked ? chosen.concat(c.value) : chosen.filter(x => x !== c.value); put('jx-chs-' + key, chosen); paint(); }));
      $('.jx-chp-n').textContent = chosen.length + ' ' + C.t('chapitre(s) choisi(s)', 'درس مختار') + ' · ' + LVN[tab]; const g = $('#go'); if (g) g.disabled = !chosen.length;
    };
    const wire = () => {
      $$('.jx-chp-tabs [data-lv]').forEach(b => b.addEventListener('click', () => { if (tab !== b.dataset.lv) { tab = b.dataset.lv; onLevel(); } paint(); }));
      $$('.jx-chp-tabs [data-m]').forEach(b => b.addEventListener('click', () => { mat = b.dataset.m; paint(); }));
      $$('.jx-chp-acts button').forEach(b => b.addEventListener('click', () => { const ids = vis().map(l => l.id); chosen = b.dataset.a === 'all' ? [...new Set(chosen.concat(ids))] : chosen.filter(x => !ids.includes(x)); put('jx-chs-' + key, chosen); paint(); }));
      paint();
    };
    return { html, wire, get: () => chosen.filter(x => (lvOf(x) || {}).id === tab) };
  }
  // éléments d’un jeu (énigmes, intrus…) des chapitres choisis ; complétés par des éléments du même niveau si trop peu
  const chName = ids => { const l = C.ALL.find(x => (ids || []).includes(x.id) && CHS.includes(x.id)); return l ? C.t(l.fr, l.ar) : ''; };
  function byChs(arr) { return arr.filter(x => (x.c || []).some(c => CHS.includes(c))).map(x => Object.assign({}, x, { ch: chName(x.c) })); }
  const tagged = arr => arr.flatMap(x => x.c || []);

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
    ['penalty', '🥅', 'Tirs au but', 'ركلات الترجيح', 'Bonne réponse = droit de tirer : choisis ton coin, le gardien plonge ! 5 tirs par équipe, puis mort subite.', 'جواب صحيح = حق التسديد : اختر الزاوية والحارس يرتمي ! 5 تسديدات لكل فريق ثم الموت المفاجئ.', 'g9'],
    ['mots', '🔤', 'Lettres mélangées', 'الحروف المبعثرة', 'Remettez les lettres dans l’ordre pour retrouver le mot scientifique défini.', 'رتبوا الحروف لإيجاد الكلمة العلمية المعرّفة.', 'g8'],
  ];
  const DUO = [
    ['duo', '⚡', 'Duel éclair', 'مبارزة خاطفة', 'Même question pour les deux joueurs : le premier qui touche la bonne réponse marque le point.', 'نفس السؤال للاعبين : أول من يلمس الجواب الصحيح يربح النقطة.', 'd1'],
    ['corde', '🪢', 'Tir à la corde', 'شد الحبل', 'Chaque bonne réponse tire la corde de ton côté. Amène le nœud dans ton camp !', 'كل جواب صحيح يشد الحبل نحوك. اجلب العقدة إلى جهتك !', 'd2'],
    ['fusees', '🚀', 'Course de fusées', 'سباق الصواريخ', 'Chacun ses questions : chaque bonne réponse fait monter ta fusée. La première en haut gagne.', 'لكل لاعب أسئلته : كل جواب صحيح يرفع صاروخك. الأول في القمة يفوز.', 'd3'],
    ['foot', '⚽', 'Match de foot', 'مباراة كرة القدم', 'Même question pour les deux joueurs : chaque bonne réponse pousse le ballon vers le but adverse. Le premier à 3 buts gagne !', 'نفس السؤال للاعبين : كل جواب صحيح يدفع الكرة نحو مرمى الخصم. أول من يسجل 3 أهداف يفوز !', 'd5'],
    ['vraifaux', '✅', 'Vrai ou faux réflexe', 'صحيح أم خطأ', 'Une affirmation au centre : le plus rapide à répondre juste marque. Une erreur donne le point à l’adversaire !', 'عبارة في الوسط : الأسرع بالجواب الصحيح يربح. الخطأ يمنح النقطة للخصم !', 'd4'],
  ];
  const CULT = [
    ['pyramide', '🏆', 'La pyramide des champions', 'هرم الأبطال', '12 marches de plus en plus difficiles, 3 jokers (50:50, changer, aide de la classe). Une erreur : on redescend au palier !', '12 درجة تزداد صعوبة و3 مساعدات. خطأ واحد : تنزل إلى آخر محطة آمنة !', 'g1'],
    ['rouecult', '🎡', 'La roue des thèmes', 'عجلة المواضيع', 'La roue choisit le thème et la valeur (100, 200, 300… ou ×2). Bonne réponse = les points !', 'العجلة تختار الموضوع والقيمة. جواب صحيح = النقاط !', 'g3'],
    ['buzzer', '🔔', 'Le buzzer des devinettes', 'جرس الألغاز', 'Des devinettes en français et en arabe : la première équipe qui buzze répond à voix haute, le professeur valide.', 'ألغاز بالفرنسية والعربية : أول فريق يضغط على الجرس يجيب، والأستاذ يحكم.', 'g6'],
  ];
  const G3 = () => (window.JEUX3D ? JEUX3D.list : []);
  const gName = id => { const g = GAMES.concat(DUO, CULT, G3(), window.DEFIS ? DEFIS.list : []).find(x => x[0] === id); return g ? C.t(g[2], g[3]) : id; };
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
      ${window.DEFIS ? `<h2 class="jx-sec">🏁 ${C.t('Défis de classe — équations, formules, schémas', 'تحديات القسم — معادلات، صيغ، تبيانات')}</h2>
      <div class="jx-games">${DEFIS.list.map(g => `<a class="jx-game tilt ${g[6]}" href="#/jeux/${g[0]}"><span class="jx-ic">${g[1]}</span><b>${C.t(g[2], g[3])}</b><span>${C.t(g[4], g[5])}</span><span class="jx-meta"><em>${C.t('Lancer', 'ابدأ')} ›</em></span></a>`).join('')}</div>` : ''}
      <h2 class="jx-sec">👥 ${C.t('Jeux par équipes', 'ألعاب الفرق')}</h2>
      <div class="jx-games">${GAMES.map(g => `<a class="jx-game tilt ${g[6]}" href="#/jeux/${g[0]}"><span class="jx-ic">${g[1]}</span><b>${C.t(g[2], g[3])}</b><span>${C.t(g[4], g[5])}</span><span class="jx-meta"><em>${C.t('Lancer', 'ابدأ')} ›</em></span></a>`).join('')}</div>
      ${window.CULTURE ? `<h2 class="jx-sec">🌍 ${C.t('Culture générale & devinettes', 'الثقافة العامة والألغاز')} <small>${C.t('Tous les jeux par équipes et à 2 joueurs proposent aussi « Culture générale »', 'كل ألعاب الفرق واللاعبين تقترح أيضا « الثقافة العامة »')}</small></h2>
      <div class="jx-games">${CULT.map(g => `<a class="jx-game tilt ${g[6]}" href="#/jeux/${g[0]}"><span class="jx-ic">${g[1]}</span><b>${C.t(g[2], g[3])}</b><span>${C.t(g[4], g[5])}</span><span class="jx-meta"><em>${C.t('Lancer', 'ابدأ')} ›</em></span></a>`).join('')}</div>` : ''}
      <h2 class="jx-sec">🆚 ${C.t('Jeux à 2 joueurs — face à face sur l’écran', 'ألعاب لاعبين اثنين — وجها لوجه على الشاشة')}</h2>
      <div class="jx-games">${DUO.map(g => `<a class="jx-game tilt duo ${g[6]}" href="#/jeux/${g[0]}"><span class="jx-ic">${g[1]}</span><b>${C.t(g[2], g[3])}</b><span>${C.t(g[4], g[5])}</span><span class="jx-meta"><em>${C.t('Lancer', 'ابدأ')} ›</em></span></a>`).join('')}</div>
      ${G3().length ? `<h2 class="jx-sec">🧊 ${C.t('Jeux 3D — stratégie, mémoire et réflexes', 'ألعاب ثلاثية الأبعاد — ذكاء، ذاكرة وسرعة بديهة')}</h2>
      <div class="jx-games">${G3().map(g => `<a class="jx-game tilt g3d ${g[6]}" href="#/jeux/${g[0]}"><span class="jx-ic">${g[1]}</span><b>${C.t(g[2], g[3])}</b><span>${C.t(g[4], g[5])}</span><span class="jx-meta"><em>${C.t('Lancer', 'ابدأ')} ›</em></span></a>`).join('')}</div>` : ''}
      <div class="jx-two">
        <section class="jx-card"><h2>🏆 ${C.t('Tournoi de la séance', 'دوري الحصة')}</h2>
          ${totals.length ? `<ol class="jx-tour">${totals.map(([n, s]) => `<li><span>${C.esc(n)}</span><em>${s} pts</em></li>`).join('')}</ol><button type="button" class="jx-btn ghost" id="raz">↺ ${C.t('Nouveau tournoi', 'دوري جديد')}</button>` : `<p class="jx-note">${C.t('Les points de chaque partie s’ajoutent ici.', 'نقاط كل لعبة تضاف هنا.')}</p>`}</section>
        <section class="jx-card"><h2>📋 ${C.t('Palmarès', 'سجل الفائزين')}</h2>
          ${pal.length ? `<ul class="jx-pal">${pal.map(p => `<li><b>${C.esc(p.w)}</b><small>${C.esc(gName(p.g))} · ${p.d}</small><span>${C.esc(p.s)}</span></li>`).join('')}</ul>` : `<p class="jx-note">${C.t('Aucune partie jouée pour l’instant.', 'لم تلعب أي مباراة بعد.')}</p>`}</section></div></section>`;
    $$('.jx-ted input').forEach(inp => inp.addEventListener('change', () => { const T2 = teams(); T2[+inp.dataset.i].n = inp.value.trim() || T2[+inp.dataset.i].n; setTeams(T2); }));
    $$('[data-del]').forEach(b => b.addEventListener('click', () => { const T2 = teams(); T2.splice(+b.dataset.del, 1); setTeams(T2); hub(); }));
    const add = $('.jx-add'); if (add) add.addEventListener('click', () => { const T2 = teams(); T2.push({ n: [C.t('Équipe verte', 'الفريق الأخضر'), C.t('Équipe orange', 'الفريق البرتقالي')][T2.length - 2] }); setTeams(T2); hub(); });
    $('#pe').addEventListener('change', e => put('jx-pe', e.target.checked));
    $('#son').addEventListener('change', e => put('jx-son', e.target.checked));
    const raz = $('#raz'); if (raz) raz.addEventListener('click', () => { put('jx-tournoi', {}); hub(); });
  }

  /* ---------- écran de réglage ---------- */
  function setup(g, fields, go, pickChs) {
    const G = GAMES.concat(DUO, CULT).find(x => x[0] === g), onlyCult = pickChs === 'culture', withCult = pickChs === true && CULT_OK.includes(g) && !!window.CULTURE;
    const cp = pickChs && !onlyCult ? (Array.isArray(pickChs) ? chapPicker(g, [...new Set(pickChs)], pickChs.reduce((o, c) => (o[c] = (o[c] || 0) + 1, o), {})) : chapPicker('cours', null)) : null;
    const ct = onlyCult || withCult ? catPicker() : null, sb = withCult ? srcBlock(cp, ct) : null;
    app().innerHTML = `<section class="jx-page"><a class="jx-back" href="#/jeux">‹ ${C.t('Espace Jeux', 'فضاء الألعاب')}</a><div class="jx-setup ${G[6]}"><span class="jx-ic">${G[1]}</span><h1>${C.t(G[2], G[3])}</h1><p>${C.t(G[4], G[5])}</p>
      <p class="jx-teamsline">${teams().map((x, i) => `<span style="--c:${COLORS[i]}">${C.esc(x.n)}</span>`).join('')} <a href="#/jeux">${C.t('modifier', 'تعديل')}</a></p>
      ${sb ? sb.html : cp ? cp.html : ct ? ct.html : ''}<div class="jx-form">${fields}</div><button type="button" class="jx-btn big" id="go">▶ ${C.t('Lancer en plein écran', 'ابدأ في ملء الشاشة')}</button></div></section>`;
    if (sb) sb.wire(); else { if (cp) cp.wire(); if (ct) { ct.wire(); const sy = () => { $('#go').disabled = !ct.get().length; }; document.addEventListener('jx-src', sy); hook(() => document.removeEventListener('jx-src', sy)); sy(); } }
    $('#go').addEventListener('click', async () => { if (cp) CHS = cp.get(); if (ct) CATS_SEL = ct.get(); MODE = onlyCult ? 'culture' : sb ? sb.mode() : 'cours'; $('#go').disabled = true; $('#go').textContent = C.t('Chargement…', 'جار التحميل…'); try { await go(); } catch (e) { console.error(e); $('#go').disabled = false; $('#go').textContent = '▶'; } });
  }
  const qFields = () => '';

  /* ---------- moteur « chacun son tour » (Match, Unités) ---------- */
  function turns(game, Q, perTeam, secs, again) {
    const T = teams(), N = T.length, sc = T.map(() => 0); let i = 0; Q = Q.filter(Boolean); perTeam = Math.max(1, Math.min(perTeam, Math.floor(Q.length / N)));
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
      const nb = +$('#nb').value, sec = +$('#sec').value, P = await getQ();
      if (!P.length) throw new Error('aucune question');
      const run = () => turns('match', shuffle(P), nb, sec, run); run();
    }, true);
  }

  /* ---------- 2. Course contre la montre (une équipe après l’autre) ---------- */
  function chronoSetup() {
    setup('chrono', qFields() + sel('sec', C.t('Durée par équipe', 'المدة لكل فريق'), [['45', '45 s'], ['60', '60 s'], ['90', '90 s']], '60'), async () => {
      const sec = +$('#sec').value, P = await getQ();
      if (!P.length) throw new Error('aucune question');
      const run = () => chronoPlay(shuffle(P), sec, run); run();
    }, true);
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
    setup('memory', sel('nb', C.t('Nombre de paires', 'عدد الأزواج'), [['6', '6 (12 cartes)'], ['8', '8 (16 cartes)'], ['10', '10 (20 cartes)']], '8'), async () => {
      const nb = +$('#nb').value, ls = C.ALL.filter(l => CHS.includes(l.id)), sameU = C.ALL.filter(l => !CHS.includes(l.id) && ls.some(x => x.niv === l.niv && x.mat === l.mat && x.ui === l.ui));
      const sameM = C.ALL.filter(l => !CHS.includes(l.id) && !sameU.includes(l) && ls.some(x => x.niv === l.niv && x.mat === l.mat)), more = sameU.concat(sameM);
      await Promise.all(ls.concat(more).map(l => C.loadContenu(l)));
      const fm = l => C.chapter(l).formules.filter(f => f.tex && f.sens).map(f => ({ tex: f.tex, sens: f.sens }));
      const F = [], seen = new Set(), addF = L => shuffle(L).forEach(l => fm(l).forEach(f => { if (!seen.has(f.sens)) { seen.add(f.sens); F.push(f); } }));
      addF(ls); const own = F.length; if (own < nb) { addF(sameU); if (F.length < 6) addF(sameM); } // complété par d’autres chapitres du même niveau si besoin
      const run = () => memoryPlay(shuffle(pick(F.slice(0, Math.max(own, Math.min(nb, F.length))), nb)), run); run();
    }, true);
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
  const U_CH = { N: ['tc-actions', 'tc-gravitation'], J: ['1b-travail', '1b-ec'], W: ['1b-travail', '1b-global'], Pa: ['tc-actions'], Hz: ['tc-tension', '2b-ondes-per'], 'Ω': ['tc-passifs'], F: ['2b-rc'], H: ['2b-rl'],
    T: ['1b-champb'], C: ['tc-courant'], V: ['tc-tension'], A: ['tc-courant'], 'V/m': ['1b-champe'], 'mol/L': ['tcc-concentration'], mol: ['tcc-mole'], 'g/mol': ['tcc-mole'], 'S/m': ['1bc-conductimetrie'], S: ['1bc-conductimetrie'],
    Bq: ['2b-radioactivite'], 'rad/s': ['1b-rotation', 'tc-mouvement'], 'N·m': ['tc-moment'], 'N/m': ['tc-2forces'], 'm/s²': ['2b-newton'], 'kg/m³': ['tcc-especes'], 'kg·m²': ['2b-rotation'], s: ['2b-rc', '2b-rl'], 'm/s': ['tc-mouvement'] };
  const C_CH = { 'km/h': ['tc-mouvement'], mA: ['tc-courant'], 'µF': ['2b-rc'], nm: ['2b-lumiere'], kJ: ['1b-travail'], mL: ['tcc-concentration'], 'cm²': ['tc-actions'], g: ['tcc-mole'], ms: ['tc-tension'], MeV: ['2b-noyaux'],
    'mmol/L': ['tcc-concentration'], '°C': ['1b-thermique'], mH: ['2b-rl'], 'kΩ': ['tc-passifs'], mm: ['tc-mouvement'] };
  const inU = tags => (tags || []).some(c => CHS.includes(c));
  const UNIT_CHS = Object.values(U_CH).concat(Object.values(C_CH)).flat();
  function unitQ() {
    const UNf = UN.filter(x => inU(U_CH[x[1]])), CVf = CONV.filter(x => inU(C_CH[x[0]]));
    if (!UNf.length && !CVf.length) return null;
    const useU = UNf.length && (!CVf.length || Math.random() < UNf.length / (UNf.length + CVf.length)); return useU ? unitQ1(UNf) : unitQ2(CVf);
  }
  function unitQ1(L) {
    const [g, u] = L[Math.floor(Math.random() * L.length)], o = shuffle([u].concat(pick(UN.filter(x => x[1] !== u), 3).map(x => x[1])));
    return { q: C.t('Quelle est l’unité ' + (/^(un|une|a|e|é|i|o|u|h)/i.test(g) ? 'd’' : 'de ') + g, 'ما وحدة ' + g) + ' ?', os: o.map(x => ({ o: x, ok: x === u })) };
  }
  function unitQ2(L) {
    const c = L[Math.floor(Math.random() * L.length)], v = c[3][Math.floor(Math.random() * c[3].length)], res = c[1](v), good = num(res) + ' ' + c[2];
    let wrong = [res * 10, res / 10, res * 1000, res / 1000, res * 100].map(x => num(x) + ' ' + c[2]);
    if (c[2] === 'K') wrong = [num(v - 273) + ' K', num(v + 173) + ' K', num(v * 273) + ' K'];
    const o = shuffle([good].concat(pick([...new Set(wrong)].filter(x => x !== good), 3)));
    return { q: C.t('Convertis : ', 'حوّل : ') + String(v).replace('.', ',') + ' ' + c[0] + ' = ?', os: o.map(x => ({ o: x, ok: x === good })) };
  }
  function unitesSetup() {
    setup('unites', sel('nb', C.t('Questions par équipe', 'أسئلة لكل فريق'), [['3', '3'], ['5', '5'], ['8', '8']], '5') + sel('sec', C.t('Temps par question', 'الوقت لكل سؤال'), [['15', '15 s'], ['20', '20 s'], ['30', '30 s']], '20'), async () => {
      const nb = +$('#nb').value, sec = +$('#sec').value;
      const run = () => turns('unites', Array.from({ length: nb * teams().length }, unitQ), nb, sec, run); run();
    }, UNIT_CHS);
  }

  /* ---------- jeux de réflexion ---------- */
  const D = () => window.JEUX_DATA || { quisuisje: [], intrus: [], defis: [], mots: [] };
  const nbF = (d) => sel('nb', C.t('Manches par équipe', 'جولات لكل فريق'), [['2', '2'], ['3', '3'], ['5', '5'], ['8', '8']], d || '3');

  function intrusSetup() {
    setup('intrus', nbF() + sel('sec', C.t('Temps par question', 'الوقت لكل سؤال'), [['30', '30 s'], ['45', '45 s'], ['60', '60 s']], '45'), async () => {
      const nb = +$('#nb').value, sec = +$('#sec').value;
      const mk = () => shuffle(byChs(D().intrus)).map(x => ({ ch: x.ch, q: C.t('Trouvez l’intrus, puis justifiez à voix haute :', 'أوجدوا الدخيل ثم عللوا بصوت مرتفع :'), os: shuffle(x.o.map((o, i) => ({ o, ok: i === x.r }))), e: x.e }));
      const run = () => turns('intrus', mk(), nb, sec, run); run();
    }, tagged(D().intrus));
  }
  function defisSetup() {
    setup('defis', nbF() + sel('sec', C.t('Temps par question', 'الوقت لكل سؤال'), [['45', '45 s'], ['60', '60 s'], ['90', '90 s']], '60'), async () => {
      const nb = +$('#nb').value, sec = +$('#sec').value;
      // défis du chapitre + exercices de calcul et de raisonnement du quiz des mêmes chapitres
      const own = byChs(D().defis), P = await pool(CHS), gen = /^(Que représente|Quelle relation|Vrai ou faux|Quelle affirmation|Quel est le but|Quelle conclusion)/;
      const calc = P.filter(q => /\d/.test(strip(q.q)) && !gen.test(strip(q.q))), reas = P.filter(q => !calc.includes(q) && !gen.test(strip(q.q))), rest = P.filter(q => !calc.includes(q) && !reas.includes(q));
      const run = () => { const Q = shuffle(own).concat(shuffle(calc), shuffle(reas), shuffle(rest)).slice(0, Math.max(nb * teams().length, own.length)); turns('defis', shuffle(Q), nb, sec, run); }; run();
    }, true);
  }

  /* Qui suis-je ? : indices successifs, la main passe en cas d’erreur */
  function enigmesSetup() {
    setup('enigmes', nbF('2'), async () => {
      const nb = +$('#nb').value;
      const run = () => enigmesPlay(shuffle(byChs(D().quisuisje)), nb, run); run();
    }, tagged(D().quisuisje));
  }
  function enigmesPlay(Q, perTeam, again) {
    const T = teams(), N = T.length, sc = T.map(() => 0), PTS = [40, 30, 20, 10]; let i = 0; full(true);
    function round() {
      stop(); if (i >= perTeam * N || i >= Q.length) return podium('enigmes', T, sc, again);
      const e = Q[i], os = shuffle([e.r].concat(e.o).slice(0, 6)); let cur = i % N, c = 0, done = false;
      app().innerHTML = `<section class="jx-stage">${bar()}${board(T, sc, cur)}<div class="jx-turn"></div>
        <div class="jx-q jx-enig" dir="ltr" lang="fr"><p class="jx-ch">🕵️ ${C.t('Qui suis-je ?', 'من أنا ؟')}${e.ch ? ' · ' + C.esc(e.ch) : ''} · ${Math.floor(i / N) + 1}/${perTeam}</p><ol class="jx-clues"></ol>
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
    setup('mots', nbF() + sel('sec', C.t('Temps par mot', 'الوقت لكل كلمة'), [['30', '30 s'], ['45', '45 s'], ['60', '60 s']], '45'), async () => {
      const nb = +$('#nb').value, sec = +$('#sec').value;
      const run = () => motsPlay(shuffle(byChs(D().mots)), nb, sec, run); run();
    }, tagged(D().mots));
  }
  function motsPlay(W, perTeam, SEC, again) {
    const T = teams(), N = T.length, sc = T.map(() => 0); let i = 0; full(true); perTeam = Math.max(1, Math.min(perTeam, Math.floor(W.length / N)));
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

  /* ---------- jeux à 2 joueurs face à face ---------- */
  const PC = ['#2563eb', '#dc2626'];
  const duoNames = () => get('jx-duo', [C.t('Joueur bleu', 'اللاعب الأزرق'), C.t('Joueur rouge', 'اللاعب الأحمر')]);
  const KEYS = [['1', '2', '3', '4', 'a', 'z', 'e', 'r'], ['7', '8', '9', '0', 'u', 'i', 'o', 'p']];
  function duoSetup(g) {
    const nm = duoNames(), G = DUO.find(x => x[0] === g), cp = chapPicker('cours', null), ct = window.CULTURE ? catPicker() : null, sb = ct ? srcBlock(cp, ct) : null;
    app().innerHTML = `<section class="jx-page"><a class="jx-back" href="#/jeux">‹ ${C.t('Espace Jeux', 'فضاء الألعاب')}</a><div class="jx-setup ${G[6]}"><span class="jx-ic">${G[1]}</span><h1>${C.t(G[2], G[3])}</h1><p>${C.t(G[4], G[5])}</p>
      <p class="jx-note">${C.t('Les deux élèves se placent devant l’écran : le joueur bleu à gauche, le joueur rouge à droite. Chacun touche uniquement sa moitié.', 'يقف التلميذان أمام الشاشة : الأزرق على اليسار والأحمر على اليمين. كل واحد يلمس نصفه فقط.')}</p>
      <div class="jx-form"><label class="jx-f p1"><span>${C.t('Joueur de gauche', 'لاعب اليسار')}</span><input id="n1" maxlength="16" value="${C.esc(nm[0])}"></label>
        <label class="jx-f p2"><span>${C.t('Joueur de droite', 'لاعب اليمين')}</span><input id="n2" maxlength="16" value="${C.esc(nm[1])}"></label></div>${sb ? sb.html : cp.html}
      <button type="button" class="jx-btn big" id="go">▶ ${C.t('Lancer en plein écran', 'ابدأ في ملء الشاشة')}</button></div></section>`;
    if (sb) sb.wire(); else cp.wire();
    $('#go').addEventListener('click', async () => {
      const names = [$('#n1').value.trim() || nm[0], $('#n2').value.trim() || nm[1]]; put('jx-duo', names);
      CHS = cp.get(); if (ct) CATS_SEL = ct.get(); MODE = sb ? sb.mode() : 'cours'; $('#go').disabled = true; $('#go').textContent = C.t('Chargement…', 'جار التحميل…');
      const P = (await getQ()).filter(q => q.o.length >= 2 && q.o.length <= 4 && String(q.q).length < 260);
      const run = () => ({ duo: duoPlay, corde: cordePlay, fusees: fuseesPlay, vraifaux: vfPlay, foot: footPlay })[g](shuffle(P), names, run); run();
    });
  }
  function duoWin(game, names, sc, again) {
    stop(); const w = sc[0] === sc[1] ? -1 : sc[0] > sc[1] ? 0 : 1;
    const p = get('jx-palmares', []); p.unshift({ g: game, w: w < 0 ? C.t('Égalité', 'تعادل') : names[w], s: names[0] + ' ' + sc[0] + ' · ' + names[1] + ' ' + sc[1], d: new Date().toLocaleDateString('fr-FR') }); put('jx-palmares', p.slice(0, 12));
    beep('win'); confetti();
    app().innerHTML = `<section class="jx-stage">${bar()}<div class="jx-ready" style="--c:${w < 0 ? '#7c3aed' : PC[w]}"><p>🏆 ${w < 0 ? '' : C.t('Victoire de', 'فوز')}</p><h1>${w < 0 ? C.t('Égalité !', 'تعادل !') : C.esc(names[w])}</h1><p>${sc[0]} – ${sc[1]}</p>
      <div class="jx-acts"><button type="button" class="jx-btn huge" id="again">↻ ${C.t('Revanche', 'إعادة المباراة')}</button><button type="button" class="jx-btn big ghost" id="menu">${C.t('Autres jeux', 'ألعاب أخرى')}</button></div></div></section>`;
    wireBar(); $('#again').addEventListener('click', again); $('#menu').addEventListener('click', () => { full(false); location.hash = '#/jeux'; });
  }
  const sideHead = (names, k, sc, extra) => `<div class="jx-sh"><b>${C.esc(names[k])}</b><span class="jx-ssc">${sc}</span>${extra || ''}</div>`;
  // une question indépendante dans la moitié k ; cb(ok)
  function sideQuestion(box, q, k, cb) {
    const os = q.os || opts(q); let lock = false;
    box.innerHTML = `<div class="jx-sq" dir="ltr" lang="fr">${q.q}</div><div class="jx-sos">${os.map((o, j) => `<button type="button" data-j="${j}"><i>${LET[j]}</i><span>${o.o}</span></button>`).join('')}</div>`;
    C.typeset(box);
    const hit = j => {
      if (lock) return; lock = true; const b = $$('button', box)[j], ok = os[j].ok;
      b.classList.add(ok ? 'ok' : 'ko'); if (!ok) $$('button', box).forEach((x, i) => { if (os[i].ok) x.classList.add('ok'); });
      beep(ok ? 'ok' : 'ko'); later(() => cb(ok), ok ? 350 : 1300);
    };
    $$('button', box).forEach(b => b.addEventListener('pointerdown', e => { e.preventDefault(); hit(+b.dataset.j); }));
    box.__key = key => { const j = KEYS[k].indexOf(key) % 4; if (KEYS[k].includes(key) && j < os.length) hit(j); };
  }

  /* ---------- ⚽ Match de foot (2 joueurs face au tableau) ---------- */
  function footPlay(P, names, again) {
    const GOALS = 3, sc = [0, 0]; let pos = 0, qi = 0; full(true);
    const pitch = () => `<div class="jx-pitch"><i class="jx-pl mid"></i><i class="jx-pl circ"></i><i class="jx-pl box l"></i><i class="jx-pl box r"></i>
      <b class="jx-goal l" style="--c:${PC[0]}"></b><b class="jx-goal r" style="--c:${PC[1]}"></b><span class="jx-ball">⚽</span>
      <span class="jx-fsc"><em style="--c:${PC[0]}">${C.esc(names[0])}</em><strong>${sc[0]} – ${sc[1]}</strong><em style="--c:${PC[1]}">${C.esc(names[1])}</em></span><div class="jx-but" hidden></div></div>`;
    const place = () => { const b = $('.jx-ball'); if (b) b.style.left = (50 + pos * 14) + '%'; };
    function round() {
      stop(); if (sc[0] >= GOALS || sc[1] >= GOALS) return duoWin('foot', names, sc, again);
      const q = P[qi++ % P.length], os = opts(q), out = [false, false]; let done = false;
      app().innerHTML = `<section class="jx-stage jx-footst">${bar()}${pitch()}<div class="jx-mid" dir="ltr" lang="fr"><p class="jx-ch">${C.esc(q.ch || '')} · ${C.t('premier à', 'الأول إلى')} ${GOALS} ${C.t('buts', 'أهداف')}</p><div class="jx-qt">${q.q}</div></div>
        <div class="jx-duo">${[0, 1].map(k => `<div class="jx-side" style="--c:${PC[k]}">${sideHead(names, k, sc[k], k === 0 ? ' →' : ' ←')}<div class="jx-sos">${os.map((o, j) => `<button type="button" data-k="${k}" data-j="${j}"><i>${LET[j]}</i><span>${o.o}</span></button>`).join('')}</div></div>`).join('')}</div></section>`;
      wireBar(); C.typeset(app()); place();
      const hit = (k, j) => {
        if (done || out[k]) return; const ok = os[j].ok, b = $(`.jx-side:nth-child(${k + 1}) [data-j="${j}"]`);
        if (ok) {
          done = true; b.classList.add('ok'); $$('.jx-side')[k].classList.add('win'); beep('kick');
          pos += k === 0 ? 1 : -1; const ball = $('.jx-ball'); ball.classList.remove('kick'); void ball.offsetWidth; ball.classList.add('kick'); place();
          if (Math.abs(pos) >= 3) {
            sc[k]++; later(() => { beep('goal'); confetti(); const bt = $('.jx-but'); bt.hidden = false; bt.style.setProperty('--c', PC[k]); bt.innerHTML = `<b>${C.t('BUT !', 'هدف !')}</b><span>${C.esc(names[k])} · ${sc[0]} – ${sc[1]}</span>`; $$('.jx-ssc')[k].textContent = sc[k]; }, 450);
            later(() => { pos = 0; round(); }, 3200); return;
          }
          later(round, 1300); return;
        }
        out[k] = true; b.classList.add('ko'); $$('.jx-side')[k].classList.add('out'); beep('ko');
        if (out[0] && out[1]) { done = true; $$('.jx-sos button').forEach(x => { if (os[+x.dataset.j].ok) x.classList.add('ok'); }); later(round, 1800); }
      };
      $$('.jx-duo button').forEach(b => b.addEventListener('pointerdown', e => { e.preventDefault(); hit(+b.dataset.k, +b.dataset.j); }));
      onKey(e => { const key = e.key.toLowerCase(); [0, 1].forEach(k => { const j = KEYS[k].indexOf(key); if (j >= 0 && j % 4 < os.length) hit(k, j % 4); }); });
    }
    beep('whistle'); round();
  }

  /* ---------- 🥅 Tirs au but (équipes) ---------- */
  function penaltySetup() {
    setup('penalty', sel('nb', C.t('Tirs par équipe', 'تسديدات لكل فريق'), [['3', '3'], ['5', '5'], ['7', '7']], '5') + sel('sec', C.t('Temps pour répondre', 'الوقت للإجابة'), [['20', '20 s'], ['30', '30 s'], ['45', '45 s']], '30')
      + sel('gk', C.t('Gardien', 'الحارس'), [['1', C.t('débutant', 'مبتدئ')], ['2', C.t('normal', 'عادي')], ['3', C.t('champion', 'بطل')]], '2'), async () => {
      const nb = +$('#nb').value, sec = +$('#sec').value, gk = +$('#gk').value, P = await getQ();
      if (!P.length) throw new Error('aucune question');
      const run = () => penaltyPlay(shuffle(P), nb, sec, gk, run); run();
    }, true);
  }
  function penaltyPlay(P, NB, SEC, GK, again) {
    const T = teams(), N = T.length, sc = T.map(() => 0), shots = T.map(() => []); let i = 0, qi = 0; full(true);
    const dots = k => shots[k].map(x => `<i class="${x ? 'g' : 'm'}">${x ? '⚽' : '✕'}</i>`).join('') + '<i class="e"></i>'.repeat(Math.max(0, NB - shots[k].length));
    const head = cur => `<div class="jx-pens">${T.map((t, k) => `<div class="jx-pen${k === cur ? ' on' : ''}" style="--c:${COLORS[k]}"><b>${C.esc(t.n)}</b><span>${dots(k)}</span><strong>${sc[k]}</strong></div>`).join('')}</div>`;
    // fin : après NB tirs chacun, s’il n’y a qu’un seul premier ; sinon mort subite (5 tours au plus)
    const finished = () => { const best = Math.max(...sc); return sc.filter(x => x === best).length === 1 || i >= (NB + 5) * N; };
    function turn() {
      stop(); if (i >= NB * N && i % N === 0 && finished()) return podium('penalty', T, sc, again);
      const cur = i % N, q = P[qi++ % P.length], os = opts(q); let left = SEC, lock = false;
      app().innerHTML = `<section class="jx-stage jx-penst">${bar()}${head(cur)}
        <div class="jx-turnrow"><div class="jx-turn" style="--c:${COLORS[cur]}">⚽ ${C.esc(T[cur].n)} · ${C.t('tir', 'تسديدة')} ${Math.floor(i / N) + 1}${i >= NB * N ? ' · ' + C.t('mort subite', 'الموت المفاجئ') : '/' + NB}</div>
        <div class="jx-ring"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45"/><circle class="v" cx="50" cy="50" r="45" style="--c:${COLORS[cur]}"/></svg><span>${SEC}</span></div></div>
        <div class="jx-q" dir="ltr" lang="fr"><p class="jx-ch">${C.esc(q.ch || '')} · ${C.t('bonne réponse = droit de tirer', 'جواب صحيح = حق التسديد')}</p><div class="jx-qt">${q.q}</div>
        <div class="jx-os">${os.map((o, k) => `<button type="button" data-k="${k}"><i>${LET[k]}</i><span>${o.o}</span></button>`).join('')}</div><div class="jx-after"></div></div></section>`;
      wireBar(); C.typeset($('.jx-q'));
      const ring = $('.jx-ring .v'), rs = $('.jx-ring span');
      every(() => { left = Math.max(0, left - 0.1); ring.style.strokeDashoffset = 283 * (1 - left / SEC); rs.textContent = Math.ceil(left); if (left <= 0) answer(-1); }, 100);
      function answer(k) {
        if (lock) return; lock = true; stop();
        const ok = k >= 0 && os[k].ok; $$('.jx-os button').forEach((x, j) => { if (os[j].ok) x.classList.add('ok'); if (j === k && !ok) x.classList.add('ko'); });
        if (!ok) { beep('ko'); later(() => shoot(cur, false), 1500); return; }
        beep('ok'); later(() => shoot(cur, true), 700);
      }
      $$('.jx-os button').forEach(b => b.addEventListener('click', () => answer(+b.dataset.k)));
      onKey(e => { const k = '1234'.indexOf(e.key) >= 0 ? '1234'.indexOf(e.key) : 'abcd'.indexOf(e.key.toLowerCase()); if (k >= 0 && k < os.length) answer(k); });
    }
    // écran du tir : 6 zones (2 lignes × 3 colonnes) ; mauvaise réponse = tir raté
    function shoot(cur, allowed) {
      stop();
      app().innerHTML = `<section class="jx-stage jx-penst">${bar()}${head(cur)}<div class="jx-turn" style="--c:${COLORS[cur]}">${allowed ? '🎯 ' + C.esc(T[cur].n) + ' : ' + C.t('choisis où tirer !', 'اختر مكان التسديد !') : '😬 ' + C.t('Mauvaise réponse : tir raté !', 'جواب خاطئ : تسديدة ضائعة !')}</div>
        <div class="jx-pfield"><div class="jx-gbox"><div class="jx-net"></div>${[0, 1, 2, 3, 4, 5].map(z => `<button type="button" class="jx-zone" data-z="${z}"${allowed ? '' : ' disabled'}><span>${z + 1}</span></button>`).join('')}
          <svg class="jx-keeper" viewBox="0 0 80 110"><circle cx="40" cy="16" r="12" fill="#f2c9a0"/><rect x="24" y="30" width="32" height="40" rx="8" fill="#facc15"/><path d="M24 36 L6 22 M56 36 L74 22" stroke="#facc15" stroke-width="9" stroke-linecap="round"/><circle cx="6" cy="20" r="7" fill="#16a34a"/><circle cx="74" cy="20" r="7" fill="#16a34a"/><path d="M30 70 L26 104 M50 70 L54 104" stroke="#1f2937" stroke-width="10" stroke-linecap="round"/></svg></div>
          <span class="jx-pball">⚽</span><div class="jx-presult" hidden></div></div></section>`;
      wireBar();
      const ball = $('.jx-pball'), kp = $('.jx-keeper'), gb = $('.jx-gbox'), res = $('.jx-presult');
      const center = z => { const r = gb.getBoundingClientRect(), f = ball.parentNode.getBoundingClientRect(), c = z % 3, w = Math.floor(z / 3); return [r.left - f.left + r.width * (c + .5) / 3, r.top - f.top + r.height * (w + .5) / 2]; };
      const fly = (x, y, sc2) => { const b0 = ball.getBoundingClientRect(), f = ball.parentNode.getBoundingClientRect(); ball.style.transform = `translate(${x - (b0.left - f.left + b0.width / 2)}px, ${y - (b0.top - f.top + b0.height / 2)}px) scale(${sc2}) rotate(540deg)`; };
      const finish = goal => {
        shots[cur].push(goal); if (goal) sc[cur]++;
        res.hidden = false; res.className = 'jx-presult ' + (goal ? 'g' : 'm'); res.innerHTML = goal ? C.t('BUT !', 'هدف !') : allowed ? C.t('ARRÊT DU GARDIEN !', 'تصدى الحارس !') : C.t('À CÔTÉ !', 'خارج المرمى !');
        if (goal) { beep('goal'); confetti(); } else beep('ko');
        $$('.jx-pen strong')[cur].textContent = sc[cur]; $$('.jx-pen span')[cur].innerHTML = dots(cur);
        i++; later(turn, 2600);
      };
      if (!allowed) { beep('kick'); const r = gb.getBoundingClientRect(), f = ball.parentNode.getBoundingClientRect(); fly(r.left - f.left + r.width * (Math.random() < .5 ? -.1 : 1.1), r.top - f.top - 40, .5); later(() => finish(false), 900); return; }
      let done = false;
      const kick = z => {
        if (done) return; done = true; beep('kick');
        const zk = Math.random() < [0, .2, .33, .45][GK] ? z : Math.floor(Math.random() * 6); // le gardien devine plus ou moins bien
        const [kx, ky] = center(zk), g0 = gb.getBoundingClientRect(), f = ball.parentNode.getBoundingClientRect();
        kp.style.left = (kx - (g0.left - f.left)) + 'px'; kp.style.top = (ky - (g0.top - f.top)) + 'px'; kp.classList.add('dive' + (zk % 3));
        const [x, y] = center(z); fly(x, y, .55); $$('.jx-zone').forEach(b => { b.disabled = true; b.classList.toggle('pick', +b.dataset.z === z); });
        const saved = zk === z || (zk % 3 === z % 3 && Math.random() < .5);
        later(() => finish(!saved), 750);
      };
      $$('.jx-zone').forEach(b => b.addEventListener('click', () => kick(+b.dataset.z)));
      onKey(e => { const z = '123456'.indexOf(e.key); if (z >= 0) kick(z); });
    }
    beep('whistle'); turn();
  }

  /* ================= 🌍 CULTURE GÉNÉRALE ================= */
  const pickD = (P, used, d) => { const f = k => P.find(q => !used.has(q) && k(q)); const q = f(x => x.d === d) || f(x => x.d <= d) || f(() => true) || P[Math.floor(Math.random() * P.length)]; used.add(q); return q; };

  /* 🏆 La pyramide des champions : chaque équipe gravit 12 marches */
  function pyramideSetup() {
    setup('pyramide', sel('sec', C.t('Temps par question', 'الوقت لكل سؤال'), [['20', '20 s'], ['30', '30 s'], ['45', '45 s']], '30'), async () => {
      const sec = +$('#sec').value, P = CULTURE.gen(CATS_SEL, 600); const run = () => pyramidePlay(shuffle(P), sec, run); run();
    }, 'culture');
  }
  function pyramidePlay(P, SEC, again) {
    const T = teams(), N = T.length, sc = T.map(() => 0), PTS = [100, 200, 300, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000], SAFE = [3, 7], used = new Set(); let k = 0; full(true);
    const ladder = (lvl, c) => `<ol class="cu-pyr" style="--c:${c}">${PTS.map((p, i) => `<li class="${i === lvl ? 'cur' : i < lvl ? 'done' : ''}${SAFE.includes(i) ? ' safe' : ''}"><i>${i + 1}</i><b>${p.toLocaleString('fr-FR')}</b></li>`).reverse().join('')}</ol>`;
    function intro() {
      stop(); if (k >= N) return podium('pyramide', T, sc, again);
      app().innerHTML = `<section class="jx-stage">${bar()}${board(T, sc, k)}<div class="jx-ready" style="--c:${COLORS[k]}"><p>🏆 ${C.t('Au sommet de la pyramide :', 'إلى قمة الهرم :')} ${PTS[11].toLocaleString('fr-FR')} pts</p><h1>${C.esc(T[k].n)}</h1>
        <p>${C.t('Paliers assurés : marches 4 et 8. Vous pouvez vous arrêter à tout moment.', 'محطات آمنة : الدرجة 4 و8. يمكنكم التوقف في أي لحظة.')}</p><button type="button" class="jx-btn huge" id="start">▶ ${C.t('Grimper !', 'اصعدوا !')}</button></div></section>`;
      wireBar(); $('#start').addEventListener('click', () => climb({ f: 1, c: 1, a: 1 })); onKey(e => { if (e.key === 'Enter') climb({ f: 1, c: 1, a: 1 }); });
    }
    function climb(J) {
      let lvl = 0;
      const ask = q0 => {
        stop(); const q = q0 || pickD(P, used, lvl < 4 ? 1 : lvl < 8 ? 2 : 3), os = opts(q); let left = SEC, lock = false;
        app().innerHTML = `<section class="jx-stage cu-pyst">${bar()}<div class="cu-pywrap"><div class="cu-pyq" dir="ltr" lang="fr"><div class="jx-turnrow"><div class="jx-turn" style="--c:${COLORS[k]}"><b>${C.esc(T[k].n)}</b> · ${C.t('marche', 'الدرجة')} ${lvl + 1}/12 · ${PTS[lvl].toLocaleString('fr-FR')} pts</div><div class="jx-ring"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45"/><circle class="v" cx="50" cy="50" r="45" style="--c:${COLORS[k]}"/></svg><span>${SEC}</span></div></div>
          <div class="jx-q"><p class="jx-ch">${C.esc(q.ch || '')}</p><div class="jx-qt">${q.q}</div><div class="jx-os">${os.map((o, j) => `<button type="button" data-k="${j}"><i>${LET[j]}</i><span>${o.o}</span></button>`).join('')}</div><div class="jx-after"></div></div>
          <div class="cu-jok"><button type="button" data-j="f"${J.f ? '' : ' disabled'}>✂️ 50 : 50</button><button type="button" data-j="c"${J.c ? '' : ' disabled'}>🔄 ${C.t('Changer', 'تغيير')}</button><button type="button" data-j="a"${J.a ? '' : ' disabled'}>🙋 ${C.t('Aide de la classe (+20 s)', 'مساعدة القسم (+20 ث)')}</button>
          <button type="button" class="stop" id="stopb"${lvl ? '' : ' disabled'}>🛑 ${C.t('S’arrêter', 'التوقف')} (${lvl ? PTS[lvl - 1].toLocaleString('fr-FR') : 0} pts)</button></div></div>${ladder(lvl, COLORS[k])}</div></section>`;
        wireBar(); C.typeset($('.cu-pyq'));
        const ring = $('.jx-ring .v'), rs = $('.jx-ring span'); let tot = SEC;
        every(() => { left = Math.max(0, left - 0.1); ring.style.strokeDashoffset = 283 * (1 - left / tot); rs.textContent = Math.ceil(left); if (left <= 0) answer(-1); }, 100);
        const end = (gain, msg) => { sc[k] = gain; later(() => { const a = $('.jx-after'); if (a) a.innerHTML = `<p class="jx-e">${msg}</p>`; }, 10); later(() => { k++; intro(); }, 2600); };
        function answer(j) {
          if (lock) return; lock = true; stop(); const ok = j >= 0 && os[j].ok;
          $$('.jx-os button').forEach((b, i) => { if (os[i].ok) b.classList.add('ok'); if (i === j && !ok) b.classList.add('ko'); });
          if (ok) { beep('ok'); lvl++; if (lvl >= 12) { beep('goal'); confetti(); return end(PTS[11], '🏆 ' + C.t('SOMMET ATTEINT !', 'وصلتم إلى القمة !')); } return later(() => ask(), 1100); }
          beep('ko'); const g = lvl > 7 ? PTS[7] : lvl > 3 ? PTS[3] : 0; end(g, C.t('Raté ! Retour au palier : ', 'خطأ ! العودة إلى المحطة : ') + g.toLocaleString('fr-FR') + ' pts');
        }
        $$('.jx-os button').forEach(b => b.addEventListener('click', () => answer(+b.dataset.k)));
        onKey(e => { const j = '1234'.indexOf(e.key) >= 0 ? '1234'.indexOf(e.key) : 'abcd'.indexOf(e.key.toLowerCase()); if (j >= 0 && j < os.length) answer(j); });
        $$('.cu-jok [data-j]').forEach(b => b.addEventListener('click', () => {
          if (lock || b.disabled) return; const t = b.dataset.j; J[t] = 0; b.disabled = true; beep('flip');
          if (t === 'f') shuffle(os.map((o, i) => i).filter(i => !os[i].ok)).slice(0, Math.max(0, os.length - 2)).forEach(i => { const x = $$('.jx-os button')[i]; x.disabled = true; x.classList.add('gone'); });
          if (t === 'c') { lock = true; ask(); }
          if (t === 'a') { left += 20; tot += 20; }
        }));
        $('#stopb').addEventListener('click', () => { if (lock || !lvl) return; lock = true; stop(); end(PTS[lvl - 1], C.t('Sage décision : ', 'قرار حكيم : ') + PTS[lvl - 1].toLocaleString('fr-FR') + ' pts'); });
      };
      ask();
    }
    intro();
  }

  /* 🎡 La roue des thèmes */
  function roueSetup() {
    setup('rouecult', sel('nb', C.t('Tours par équipe', 'أدوار لكل فريق'), [['3', '3'], ['5', '5'], ['8', '8']], '5') + sel('sec', C.t('Temps par question', 'الوقت لكل سؤال'), [['20', '20 s'], ['30', '30 s'], ['45', '45 s']], '30'), async () => {
      const nb = +$('#nb').value, sec = +$('#sec').value, cats = CATS_SEL.slice(); const run = () => rouePlay(cats, nb, sec, run); run();
    }, 'culture');
  }
  function rouePlay(cats, NB, SEC, again) {
    const T = teams(), N = T.length, sc = T.map(() => 0), CC = CULTURE.CATS.filter(c => cats.includes(c[0])), S = [], used = new Set(); let i = 0, rot = 0; full(true);
    while (S.length < 8) S.push(CC[S.length % CC.length]);
    const pal = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'], n = S.length, a = 360 / n;
    const bank = {}; const Q = c => { bank[c] = bank[c] && bank[c].length ? bank[c] : shuffle(CULTURE.gen([c], 200)); return bank[c]; };
    function spin() {
      stop(); if (i >= NB * N) return podium('rouecult', T, sc, again);
      const cur = i % N, vals = S.map(() => [100, 200, 300][Math.floor(Math.random() * 3)]), dbl = Math.floor(Math.random() * n * 5);
      app().innerHTML = `<section class="jx-stage">${bar()}${board(T, sc, cur)}<div class="jx-turn" style="--c:${COLORS[cur]}">🎡 ${C.esc(T[cur].n)} · ${C.t('tour', 'دور')} ${Math.floor(i / N) + 1}/${NB}</div>
        <div class="cu-roue"><div class="cu-ptr">▼</div><div class="cu-wheel" style="background:conic-gradient(${S.map((c, j) => `${pal[j]} ${j * a}deg ${(j + 1) * a}deg`).join(',')})">${S.map((c, j) => `<span style="transform:rotate(${j * a + a / 2}deg)"><em>${c[1]}<small>${dbl === j ? '×2 (400)' : vals[j]}</small></em></span>`).join('')}</div>
        <button type="button" class="jx-btn huge" id="spin">🎡 ${C.t('Tourner la roue !', 'أدر العجلة !')}</button></div></section>`;
      wireBar();
      const go = () => {
        const b = $('#spin'); if (!b || b.disabled) return; b.disabled = true; beep('flip');
        const j = Math.floor(Math.random() * n); rot += 360 * (4 + Math.floor(Math.random() * 3)) + (360 - (j * a + a / 2) - (rot % 360));
        const w = $('.cu-wheel'); w.style.transform = `rotate(${rot}deg)`;
        later(() => ask(cur, S[j], dbl === j ? 'x2' : '', dbl === j ? 400 : vals[j]), 3700);
      };
      $('#spin').addEventListener('click', go); onKey(e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    }
    function ask(cur, cat, tag, val) {
      stop(); const d = val <= 100 ? 1 : val <= 200 ? 2 : 3, q = pickD(Q(cat[0]), used, d), os = opts(q); let left = SEC, lock = false;
      app().innerHTML = `<section class="jx-stage">${bar()}${board(T, sc, cur)}
        <div class="jx-turnrow"><div class="jx-turn" style="--c:${COLORS[cur]}">${cat[1]} ${C.esc(C.t(cat[2], cat[3]))} · <b>${tag === 'x2' ? '×2 ⇒ ' : ''}${val} pts</b></div><div class="jx-ring"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45"/><circle class="v" cx="50" cy="50" r="45" style="--c:${COLORS[cur]}"/></svg><span>${SEC}</span></div></div>
        <div class="jx-q" dir="ltr" lang="fr"><div class="jx-qt">${q.q}</div><div class="jx-os">${os.map((o, j) => `<button type="button" data-k="${j}"><i>${LET[j]}</i><span>${o.o}</span></button>`).join('')}</div><div class="jx-after"></div></div></section>`;
      wireBar(); C.typeset($('.jx-q'));
      const ring = $('.jx-ring .v'), rs = $('.jx-ring span');
      every(() => { left = Math.max(0, left - 0.1); ring.style.strokeDashoffset = 283 * (1 - left / SEC); rs.textContent = Math.ceil(left); if (left <= 0) answer(-1); }, 100);
      function answer(j) {
        if (lock) return; lock = true; stop(); const ok = j >= 0 && os[j].ok;
        $$('.jx-os button').forEach((b, x) => { if (os[x].ok) b.classList.add('ok'); if (x === j && !ok) b.classList.add('ko'); });
        if (ok) { sc[cur] += val; beep('ok'); $('.jx-board').outerHTML = board(T, sc, cur); } else beep('ko');
        $('.jx-after').innerHTML = `<button type="button" class="jx-btn big" id="nx">${C.t('Équipe suivante', 'الفريق التالي')} ›</button>`;
        const nx = () => { i++; spin(); }; $('#nx').addEventListener('click', nx); onKey(e => { if (e.key === 'Enter') nx(); });
      }
      $$('.jx-os button').forEach(b => b.addEventListener('click', () => answer(+b.dataset.k)));
      onKey(e => { const j = '1234'.indexOf(e.key) >= 0 ? '1234'.indexOf(e.key) : 'abcd'.indexOf(e.key.toLowerCase()); if (j >= 0 && j < os.length) answer(j); });
    }
    spin();
  }

  /* 🔔 Le buzzer des devinettes (réponse orale, le professeur valide) */
  function buzzerSetup() {
    setup('buzzer', sel('lg', C.t('Langue des devinettes', 'لغة الألغاز'), [['both', C.t('français et arabe', 'الفرنسية والعربية')], ['fr', 'français'], ['ar', 'العربية']], 'both')
      + sel('nb', C.t('Nombre de devinettes', 'عدد الألغاز'), [['8', '8'], ['12', '12'], ['20', '20']], '12'), async () => {
      const lg = $('#lg').value, nb = +$('#nb').value, R = CULTURE.riddles(lg === 'both' ? ['fr', 'ar'] : [lg]); const run = () => buzzerPlay(R.slice(0, nb), run); run();
    }, false);
  }
  function buzzerPlay(R, again) {
    const T = teams(), N = T.length, sc = T.map(() => 0); let i = 0; full(true);
    function round() {
      stop(); if (i >= R.length) return podium('buzzer', T, sc, again);
      const r = R[i], out = new Set(); let who = -1, shown = false;
      app().innerHTML = `<section class="jx-stage">${bar()}${board(T, sc, -1)}<div class="jx-q cu-rid"><p class="jx-ch">🔔 ${C.t('Devinette', 'لغز')} ${i + 1}/${R.length}</p><div class="jx-qt" dir="${r.l === 'ar' ? 'rtl' : 'ltr'}" lang="${r.l}">${C.esc(r.q)}</div>
        <div class="cu-ans" dir="${r.l === 'ar' ? 'rtl' : 'ltr'}" hidden></div><div class="cu-ctl"></div></div>
        <div class="cu-buzz">${T.map((t, k) => `<button type="button" data-k="${k}" style="--c:${COLORS[k]}">🔔 ${C.esc(t.n)}<small>${C.t('touche', 'زر')} ${k + 1}</small></button>`).join('')}</div></section>`;
      wireBar();
      const ctl = $('.cu-ctl'), ans = $('.cu-ans');
      const reveal = () => { shown = true; ans.hidden = false; ans.innerHTML = '💡 ' + C.esc(r.a); ctl.innerHTML = `<button type="button" class="jx-btn big" id="nx">${C.t('Devinette suivante', 'اللغز التالي')} ›</button>`; $('#nx').addEventListener('click', () => { i++; round(); }); };
      const idle = () => { ctl.innerHTML = `<button type="button" class="jx-btn ghost" id="rv">👁 ${C.t('Montrer la réponse', 'أظهر الجواب')}</button>`; $('#rv').addEventListener('click', reveal); };
      const buzz = k => {
        if (who >= 0 || shown || out.has(k)) return; who = k; beep('whistle');
        $$('.cu-buzz button').forEach((b, x) => b.classList.toggle('on', x === k));
        ctl.innerHTML = `<p class="cu-who" style="--c:${COLORS[k]}">🔔 ${C.esc(T[k].n)} ${C.t('répond !', 'تجيب !')}</p><button type="button" class="jx-btn big ok" id="yes">✔ ${C.t('Juste (+10)', 'صحيح (+10)')}</button><button type="button" class="jx-btn big ko" id="no">✘ ${C.t('Faux (−5)', 'خطأ (−5)')}</button>`;
        $('#yes').addEventListener('click', () => { sc[k] += 10; beep('ok'); confetti(); $('.jx-board').outerHTML = board(T, sc, k); reveal(); });
        $('#no').addEventListener('click', () => { sc[k] -= 5; beep('ko'); out.add(k); $$('.cu-buzz button')[k].classList.add('out'); $$('.cu-buzz button')[k].classList.remove('on'); $('.jx-board').outerHTML = board(T, sc, -1); who = -1; if (out.size >= N) reveal(); else idle(); });
      };
      $$('.cu-buzz button').forEach(b => b.addEventListener('pointerdown', e => { e.preventDefault(); buzz(+b.dataset.k); }));
      onKey(e => { const k = '1234'.indexOf(e.key); if (k >= 0 && k < N) buzz(k); else if (e.key === 'Enter' && shown) { i++; round(); } });
      idle();
    }
    round();
  }
  const mixQ = P => (MODE === 'cours' && Math.random() < 0.3 && unitQ()) || P[Math.floor(Math.random() * P.length)];
  const twoKeys = boxes => onKey(e => boxes.forEach(b => b && b.__key && b.__key(e.key.toLowerCase())));

  // ⚡ Duel éclair : même question, deux claviers
  function duoPlay(P, names, again) {
    const sc = [0, 0], GOAL = 5; let qi = 0; full(true);
    function round() {
      stop(); if (sc[0] >= GOAL || sc[1] >= GOAL) return duoWin('duo', names, sc, again);
      const q = P[qi++ % P.length], os = opts(q), out = [false, false]; let done = false;
      app().innerHTML = `<section class="jx-stage">${bar()}<div class="jx-mid" dir="ltr" lang="fr"><p class="jx-ch">${C.esc(q.ch || '')} · ${C.t('premier à', 'الأول إلى')} ${GOAL}</p><div class="jx-qt">${q.q}</div></div>
        <div class="jx-duo">${[0, 1].map(k => `<div class="jx-side" style="--c:${PC[k]}">${sideHead(names, k, sc[k])}<div class="jx-sos">${os.map((o, j) => `<button type="button" data-k="${k}" data-j="${j}"><i>${LET[j]}</i><span>${o.o}</span></button>`).join('')}</div></div>`).join('')}</div></section>`;
      wireBar(); C.typeset(app());
      const hit = (k, j) => {
        if (done || out[k]) return; const ok = os[j].ok, b = $(`.jx-side:nth-child(${k + 1}) [data-j="${j}"]`);
        if (ok) { done = true; sc[k]++; b.classList.add('ok'); beep('ok'); $$('.jx-side')[k].classList.add('win'); $$('.jx-ssc')[k].textContent = sc[k]; later(round, 1300); return; }
        out[k] = true; b.classList.add('ko'); $$('.jx-side')[k].classList.add('out'); beep('ko');
        if (out[0] && out[1]) { done = true; $$('.jx-sos button').forEach(x => { if (os[+x.dataset.j].ok) x.classList.add('ok'); }); later(round, 1800); }
      };
      $$('.jx-duo button').forEach(b => b.addEventListener('pointerdown', e => { e.preventDefault(); hit(+b.dataset.k, +b.dataset.j); }));
      onKey(e => { const key = e.key.toLowerCase(); [0, 1].forEach(k => { const j = KEYS[k].indexOf(key); if (j >= 0 && j % 4 < os.length) hit(k, j % 4); }); });
    }
    round();
  }

  // 🪢 Tir à la corde : questions indépendantes, la corde bouge
  function cordePlay(P, names, again) {
    const N = 5; let pos = 0; const sc = [0, 0]; full(true);
    app().innerHTML = `<section class="jx-stage">${bar()}<div class="jx-rope"><span class="jx-camp l" style="--c:${PC[0]}">${C.esc(names[0])}</span><div class="jx-track"><i class="jx-line"></i><b class="jx-knot">🪢</b><em class="jx-mark l"></em><em class="jx-mark r"></em></div><span class="jx-camp r" style="--c:${PC[1]}">${C.esc(names[1])}</span></div>
      <div class="jx-duo">${[0, 1].map(k => `<div class="jx-side" style="--c:${PC[k]}">${sideHead(names, k, 0)}<div class="jx-sbox"></div></div>`).join('')}</div></section>`;
    wireBar();
    const knot = $('.jx-knot'), boxes = $$('.jx-sbox');
    const move = () => { knot.style.left = (50 + pos / N * 46) + '%'; };
    const ask = k => sideQuestion(boxes[k], mixQ(P), k, ok => {
      if (ok) { sc[k]++; $$('.jx-ssc')[k].textContent = sc[k]; pos += k === 0 ? -1 : 1; move(); knot.classList.remove('pull'); void knot.offsetWidth; knot.classList.add('pull'); }
      if (Math.abs(pos) >= N) return duoWin('corde', names, pos < 0 ? [1, 0] : [0, 1], again);
      ask(k);
    });
    move(); ask(0); ask(1); twoKeys(boxes);
  }

  // 🚀 Course de fusées
  function fuseesPlay(P, names, again) {
    const GOAL = 8, h = [0, 0]; full(true);
    app().innerHTML = `<section class="jx-stage">${bar()}<div class="jx-duo">${[0, 1].map(k => `<div class="jx-side rk" style="--c:${PC[k]}">${sideHead(names, k, 0 + ' / ' + GOAL)}<div class="jx-race"><div class="jx-sky"><b class="jx-rocket">🚀</b><i class="jx-moon">🌕</i></div><div class="jx-sbox"></div></div></div>`).join('')}</div></section>`;
    wireBar();
    const boxes = $$('.jx-sbox'), rk = $$('.jx-rocket');
    const ask = k => sideQuestion(boxes[k], mixQ(P), k, ok => {
      if (ok) h[k]++; else h[k] = Math.max(0, h[k] - 1);
      rk[k].style.bottom = (h[k] / GOAL * 82) + '%'; $$('.jx-ssc')[k].textContent = h[k] + ' / ' + GOAL;
      if (h[k] >= GOAL) return duoWin('fusees', names, h.slice(), again);
      ask(k);
    });
    ask(0); ask(1); twoKeys(boxes);
  }

  // ✅ Vrai ou faux réflexe
  function vfPlay(P, names, again) {
    const sc = [0, 0], GOAL = 7; let qi = 0; full(true);
    function round() {
      stop(); if (sc[0] >= GOAL || sc[1] >= GOAL) return duoWin('vraifaux', names, sc, again);
      const q = P[qi++ % P.length], VF = /^(Vrai ou faux \?|صحيح أم خطأ ؟)\s*/;
      let truth, others, prop, qq;
      if (VF.test(strip(q.q))) { qq = q.q.replace(VF, ''); prop = ''; truth = /^(Vrai|صحيح)$/.test(strip(q.o[q.r])); }
      else { truth = Math.random() < 0.5; others = q.o.filter((_, i) => i !== q.r); prop = truth ? q.o[q.r] : others[Math.floor(Math.random() * others.length)]; qq = q.q; }
      let done = false;
      app().innerHTML = `<section class="jx-stage">${bar()}<div class="jx-mid" dir="ltr" lang="fr"><p class="jx-ch">${C.t('Vrai ou faux ?', 'صحيح أم خطأ ؟')} · ${C.t('premier à', 'الأول إلى')} ${GOAL}</p>${q.ch ? `<p class="jx-ch">${C.esc(q.ch)}</p>` : ''}<div class="jx-qt">${qq}${prop ? ` <span class="jx-prop">${prop}</span>` : ''}</div><div class="jx-after"></div></div>
        <div class="jx-duo">${[0, 1].map(k => `<div class="jx-side" style="--c:${PC[k]}">${sideHead(names, k, sc[k])}<div class="jx-vf"><button type="button" class="v" data-k="${k}" data-v="1">✔ ${C.t('VRAI', 'صحيح')}</button><button type="button" class="f" data-k="${k}" data-v="0">✘ ${C.t('FAUX', 'خطأ')}</button></div></div>`).join('')}</div></section>`;
      wireBar(); C.typeset(app());
      const hit = (k, v) => {
        if (done) return; done = true; const ok = (v === 1) === truth, win = ok ? k : 1 - k; sc[win]++;
        $$('.jx-side')[win].classList.add('win'); $$('.jx-ssc')[win].textContent = sc[win]; beep(ok ? 'ok' : 'ko');
        $(`.jx-side:nth-child(${k + 1}) [data-v="${v}"]`).classList.add(ok ? 'ok' : 'ko');
        $('.jx-after').innerHTML = `<p class="jx-e">${truth ? '✔ ' + C.t('C’était VRAI', 'كان صحيحا') : '✘ ' + C.t('C’était FAUX', 'كان خطأ') + (prop ? C.t(' — bonne réponse : ', ' — الجواب الصحيح : ') + q.o[q.r] : (q.e ? ' — ' + q.e : ''))}</p>`; C.typeset($('.jx-after'));
        later(round, 2200);
      };
      $$('.jx-vf button').forEach(b => b.addEventListener('pointerdown', e => { e.preventDefault(); hit(+b.dataset.k, +b.dataset.v); }));
      onKey(e => { const m = { a: [0, 1], z: [0, 0], o: [1, 1], p: [1, 0] }[e.key.toLowerCase()]; if (m) hit(m[0], m[1]); });
    }
    round();
  }

  return {
    init(ctx) { C = ctx; },
    stop() { stop(); document.body.classList.remove('jx-full'); },
    api: { pool: chs => pool(chs), ctx: () => C, bar: () => bar(), wireBar: () => wireBar(), full, beep, confetti, onKey, later, every, hook: f => hooks.push(f), duoWin: (g, n, sc, a) => duoWin(g, n, sc, a), duoNames: () => duoNames(), put, get, PC: ['#2563eb', '#dc2626'], C: () => C, teams: () => teams(), COLORS, podium: (g, T, sc, a) => podium(g, T, sc, a), stopTimers: () => stop() },
    page(sub) { stop(); if (window.DEFIS && DEFIS.list.some(g => g[0] === sub)) return DEFIS.page(sub); if (window.JEUX3D && JEUX3D.list.some(g => g[0] === sub)) return JEUX3D.page(sub); ({ match: matchSetup, duel: matchSetup, chrono: chronoSetup, memory: memorySetup, unites: unitesSetup, enigmes: enigmesSetup, defis: defisSetup, intrus: intrusSetup, mots: motsSetup, penalty: penaltySetup, pyramide: pyramideSetup, rouecult: roueSetup, buzzer: buzzerSetup }[sub] || (DUO.some(g => g[0] === sub) ? () => duoSetup(sub) : hub))(); },
  };
})();
