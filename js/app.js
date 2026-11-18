/* Application : accueil, niveaux et filières, page chapitre (4 onglets), recherche globale, simulations */
'use strict';
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const store = {
    get(k, d) { try { return localStorage.getItem(k) || d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* stockage indisponible */ } },
  };
  const V = window.__V || '';
  let lang = store.get('lang', 'fr');
  let theme = store.get('theme', '');
  let stopSim = null;
  const t = (fr, ar) => lang === 'ar' ? ar : fr;

  /* ---------- formules (KaTeX) ---------- */
  const KX = { throwOnError: false, strict: false };
  function typeset(root) {
    root = root || $('#app');
    if (!root || !window.katex) return;
    $$('[data-tex]', root).forEach(el => { try { katex.render(el.dataset.tex, el, KX); } catch (e) { console.error(e); } el.removeAttribute('data-tex'); el.classList.add('mj'); });
    if (window.renderMathInElement) renderMathInElement(root, Object.assign({ delimiters: [{ left: '\\[', right: '\\]', display: true }, { left: '\\(', right: '\\)', display: false }], ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code', 'option', 'input'] }, KX));
  }

  /* ---------- programme : niveaux, filières, matières, unités ---------- */
  const BY = {};
  LEVELS.forEach(lv => lv.domains.forEach(d => d.lessons.forEach(l => { BY[l.id] = Object.assign(l, { lv, dom: d }); })));
  const NIV = {};
  const ALL = [];
  PROGRAMME.forEach(n => {
    NIV[n.id] = n; n.list = [];
    [['physique', 'Physique', 'الفيزياء'], ['chimie', 'Chimie', 'الكيمياء']].forEach(([m, fr, ar]) => {
      let k = 0;
      n[m].forEach((u, ui) => u.ch.forEach(id => {
        const l = BY[id]; if (!l) { console.warn('Chapitre inconnu dans programme.js :', id); return; }
        Object.assign(l, { niv: n, mat: m, matFr: fr, matAr: ar, unite: u, ui: ui + 1, num: ++k, fil: SEULEMENT[id] || null });
        n.list.push(l); ALL.push(l);
      }));
    });
  });
  const inFil = (l, f) => !f || !l.fil || l.fil.includes(f);
  const filOf = n => {
    if (!n.filieres.length) return '';
    const f = store.get('fil-' + n.id, ''); return n.filieres.some(x => x.id === f) ? f : n.filieres[0].id;
  };
  const filName = (n, f) => { const x = n.filieres.find(y => y.id === f); return x ? x.court : ''; };
  const tagOf = l => l.niv.court + (l.fil ? ' · ' + l.fil.map(f => filName(l.niv, f)).join('/') : '');
  const verified = id => VERIFIES.includes(id);

  /* ---------- icônes ---------- */
  const svg = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  const IC = {
    meca: svg('<path d="M3 19c3-9 8-13 14-13"/><path d="M13 5h5v5"/><circle cx="5" cy="19" r="2"/>'),
    elec: svg('<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>'),
    opt: svg('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),
    onde: svg('<path d="M2 12c2-7 4-7 6 0s4 7 6 0 4-7 6 0"/>'),
    nuc: svg('<circle cx="12" cy="12" r="1.6" fill="currentColor"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>'),
    chim: svg('<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/><path d="M7.5 15h9"/>'),
    book: svg('<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 21V5M9 8h6M9 12h6"/>'),
    sigma: svg('<path d="M17 5H7l6 7-6 7h10"/>'),
    sliders: svg('<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>'),
    check: svg('<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>'),
    search: svg('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),
    bulb: svg('<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z"/>'),
    sheet: svg('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 9v11M12 13h6M12 16h4"/>'),
    cap: svg('<path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5M22 9v6"/>'),
    play: svg('<circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4z" fill="currentColor"/>'),
    arrow: svg('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    file: svg('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>'),
    flask: svg('<path d="M9 3h6M10 3v6L4.5 18.5A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-2.5L14 9V3"/><circle cx="10" cy="15" r="1" fill="currentColor"/><circle cx="14" cy="17" r="1" fill="currentColor"/>'),
    warn: svg('<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17v.5"/>'),
    star: svg('<path d="m12 3 2.8 5.8 6.2.9-4.5 4.4 1 6.2L12 17.4 6.5 20.3l1-6.2L3 9.7l6.2-.9z"/>'),
    atom: svg('<circle cx="12" cy="12" r="1.6" fill="currentColor"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="4" ry="10"/>'),
  };
  const domKey = l => l.mat === 'chimie' ? 'chim' : /lectri|magn/.test(l.unite.titre) ? 'elec' : /Optique/.test(l.unite.titre) ? 'opt' : /Ondes/.test(l.unite.titre) ? 'onde' : /nucl/.test(l.unite.titre) ? 'nuc' : 'meca';
  const simName = n => SIM_NAMES[n] ? t(SIM_NAMES[n][0], SIM_NAMES[n][1]) : n;

  /* ---------- contenu d'un chapitre (fichier contenu/<niveau>/<id>.js s'il existe, sinon données du site) ---------- */
  const loading = {};
  function loadContenu(l) {
    if (CONTENU[l.id] || !FICHIERS_CONTENU.includes(l.id)) return Promise.resolve();
    return loading[l.id] || (loading[l.id] = new Promise(res => {
      const s = document.createElement('script');
      s.src = 'contenu/' + l.niv.id + '/' + l.id + '.js' + (V ? '?v=' + encodeURIComponent(V) : '');
      s.onload = s.onerror = () => res(); document.body.appendChild(s);
    }));
  }
  function chapter(l) {
    const C = CONTENU[l.id] || {}, X = EXTRA[l.id] || {}, R = C.resume || {}, E = C.experiences || {};
    const sims = E.sims || [l.sim].concat(MORE_SIMS[l.id] || []);
    const etapes = R.etapes || (!R.sections && X.cours && lang !== 'ar' ? X.cours : null);
    return {
      C, intro: R.intro || esc(t(l.exFr, l.exAr)),
      sections: R.sections || [],
      etapes,
      details: R.details || DETAILS[l.id] || [],
      formules: R.formules || l.f.map((f, n) => ({ tex: X.tex && X.tex[n] ? X.tex[n] : toTex(f[0]), raw: f[0], sens: t(f[1], f[2]) })),
      retenir: R.retenir || (RESUME[l.id] || []).map(mk),
      retenirTl: !R.retenir && !etapes,
      erreurs: R.erreurs || [],
      sims: sims.slice(),
      xps: (window.EXPS && EXPS[l.id]) || [],
      protocole: E.protocole || (X.exp ? { titre: X.exp.titre, materiel: X.exp.materiel, etapes: X.exp.etapes } : null),
      observations: E.observations || null, conclusion: E.conclusion || null,
      exos: C.series || EXOS[l.id] || [],
      quiz: C.quiz || X.quiz || [],
    };
  }

  /* ---------- documents du professeur (pdf/documents.json) ---------- */
  let DOCS = null;
  const docsReady = fetch('pdf/documents.json' + (V ? '?v=' + encodeURIComponent(V) : ''), { cache: 'no-cache' })
    .then(r => r.ok ? r.json() : { documents: [] }).catch(() => ({ documents: [] }))
    .then(j => {
      DOCS = (Array.isArray(j) ? j : j.documents || []).filter(d => d && d.titre && d.fichier && NIV[d.niveau]).map(d => {
        const f = String(d.fichier).trim();
        const href = /^https:\/\/[^\s"'<>]+$/.test(f) ? f : /^[^\s"'<>:\\]+$/.test(f) && !/(^|\/)\.\.(\/|$)/.test(f) ? (f.includes('/') ? 'pdf/' + f : 'pdf/' + d.niveau + '/' + f) : '';
        return Object.assign({}, d, { href: encodeURI(href).replace(/%25/g, '%') });
      }).filter(d => d.href);
      return DOCS;
    });
  const docList = docs => docs.length ? `<div class="docs">${docs.map(d => `<a class="doc" href="${esc(d.href)}" target="_blank" rel="noopener">${IC.file}<span><b>${esc(d.titre)}</b><small>${esc([d.type, BY[d.chapitre] ? BY[d.chapitre].fr : ''].filter(Boolean).join(' · '))}</small></span>${IC.arrow}</a>`).join('')}</div>` : '';
  function fillDocs(sel, pick, empty) {
    docsReady.then(() => { const box = $(sel); if (!box) return; const d = DOCS.filter(pick); box.innerHTML = docList(d) || empty || ''; if (!d.length && !empty) box.hidden = true; });
  }
  const teacherSeries = l => (SERIES[l.id] || []).filter(x => Array.isArray(x) && x[0] && /^(https:\/\/|series\/|pdf\/)[^\s"'<>]+$/.test(x[1] || ''));

  /* ---------- éléments communs ---------- */
  function bookCard(l, extra) {
    const k = domKey(l), ch = chapter(l);
    return `<a class="book k-${k}" href="#/chapitre/${l.id}">
      <span class="bic">${IC[k]}</span>
      <span class="btx">
        <span class="num">${extra ? esc(tagOf(l)) + ' · ' : ''}${esc(t(l.matFr, l.matAr))} · ${String(l.num).padStart(2, '0')}</span>
        <span class="ttl">${esc(t(l.fr, l.ar))}</span>
        ${extra ? `<span class="hit">${extra}</span>` : `<span class="meta">${ch.sims.length} sim. · ${ch.formules.length} ${t('formules', 'علاقات')} · ${ch.exos.length} ${t('exercices', 'تمارين')}</span>`}
      </span>
      ${verified(l.id) ? `<span class="full">${t('Vérifié', 'مراجع')}</span>` : CONTENU[l.id] || FICHIERS_CONTENU.includes(l.id) ? `<span class="full">${t('Complet', 'كامل')}</span>` : ''}
    </a>`;
  }
  const searchBox = (q, id) => `<label class="search">${IC.search}<input id="${id}" type="search" value="${esc(q || '')}" placeholder="${t('Chercher un chapitre, une formule, un mot-clé…', 'ابحث عن درس أو علاقة أو كلمة…')}" aria-label="${t('Recherche', 'بحث')}" autocomplete="off"></label>`;
  const goSearch = q => { location.hash = '#/recherche/' + encodeURIComponent(q); };
  const crumb = parts => `<p class="crumb"><a href="#/">${t('Accueil', 'الرئيسية')}</a>${parts.map(p => ' › ' + p).join('')}</p>`;

  /* ---------- accueil ---------- */
  function home() {
    const nf = ALL.reduce((s, l) => s + l.f.length, 0), ne = ALL.reduce((s, l) => s + chapter(l).exos.length, 0);
    const lvIc = { tc: 'meca', '1bac': 'elec', '2bac': 'nuc' };
    $('#app').innerHTML = `
      <section class="hero">
        <div class="hero-in">
          <div class="hero-txt">
            <p class="who" dir="ltr">Prof. Zakaria Lazrak — Physique-Chimie</p>
            <h1>${t('La Physique-Chimie,<br><em>enfin simple.</em>', 'الفيزياء والكيمياء،<br><em>بطريقة سهلة.</em>')}</h1>
            <p class="lead">${t('Toute la bibliothèque du programme marocain (BIOF) : résumés de cours, expériences interactives, séries d’exercices corrigées et quiz, du Tronc Commun au 2ᵉ Bac.',
      'مكتبة المقرر المغربي كاملة : ملخصات الدروس، تجارب تفاعلية، سلاسل تمارين مصححة واختبارات، من الجذع المشترك إلى الثانية باك.')}</p>
            ${searchBox('', 'q')}
          </div>
          <div class="hero-3d" aria-hidden="true">
            <div class="atom3d"><div class="orb o1"><i></i></div><div class="orb o2"><i></i></div><div class="orb o3"><i></i></div><div class="nuc"></div></div>
            <span class="chip3d c1" dir="ltr">E = mc²</span><span class="chip3d c2" dir="ltr">λ = v·T</span><span class="chip3d c3" dir="ltr">ΣF = m·a</span><span class="chip3d c4" dir="ltr">pH = −log[H₃O⁺]</span>
          </div>
        </div>
        <svg class="wave" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true"><path d="M0 40c180 40 360 50 540 30S900-10 1080 10s270 50 360 40v40H0z"/></svg>
      </section>

      <section class="stats">
        ${stat('book', ALL.length, t('chapitres', 'درسا'))}${stat('sliders', Object.keys(SIMS).length, t('simulations', 'محاكاة'))}${stat('file', ne, t('exercices corrigés', 'تمرينا مصححا'))}${stat('sigma', nf, t('formules', 'علاقة'))}
      </section>

      <h2 class="sec">${t('Choisis ton niveau', 'اختر مستواك')}</h2>
      <nav class="levels big3">${PROGRAMME.map(n => `<a class="lvl tilt lv-${n.id}" href="#/niveau/${n.id}">
        <span class="bub big">${IC[lvIc[n.id]]}</span><b>${esc(t(n.titre, n.ar))}</b>
        <span class="lvd">${esc(n.desc)}</span>
        ${n.filieres.length ? `<span class="fils">${n.filieres.map(f => `<i>${esc(f.court)}</i>`).join('')}</span>` : '<span class="fils"><i>' + t('Toutes filières', 'جميع الشعب') + '</i></span>'}
        <span class="pill">${n.list.filter(l => l.mat === 'physique').length} ${t('chap. de physique', 'دروس فيزياء')} · ${n.list.filter(l => l.mat === 'chimie').length} ${t('de chimie', 'كيمياء')} ${IC.arrow}</span></a>`).join('')}</nav>


      <h2 class="sec">${t('Comment réviser un chapitre ?', 'كيف أراجع درسا ؟')}</h2>
      <ol class="journey">${[['sheet', t('Résumé du cours', 'ملخص الدرس'), t('Définitions, lois, formules', 'تعاريف، قوانين، علاقات')],
        ['flask', t('Expériences', 'التجارب'), t('Simulations à curseurs', 'محاكاة تفاعلية')],
        ['file', t('Séries d’exercices', 'سلاسل التمارين'), t('Du facile au type Bac', 'من السهل إلى نموذج الباك')],
        ['check', t('Quiz', 'اختبار'), t('Corrigé automatiquement', 'تصحيح تلقائي')]].map((j, n) => `<li class="tilt"><span class="jn">${n + 1}</span><span class="bub">${IC[j[0]]}</span><b>${j[1]}</b><span>${j[2]}</span></li>`).join('')}</ol>

      <section class="fiches" id="fiches">
        <h2 class="sec">${t('Fiches résumés du professeur — 2ᵉ Bac', 'ملخصات الأستاذ — الثانية باك')}</h2>
        <div class="fgrid">${FICHES.map((f, n) => `<button class="fcard tilt" type="button" data-f="${n}"><img src="${f.mini}" alt="" loading="lazy" width="640" height="452"><span><small>Page ${f.n}</small>${esc(f.titre)}</span></button>`).join('')}</div>
      </section>`;
    const q = $('#q'); q.addEventListener('input', () => { if (q.value.trim()) goSearch(q.value); });
    $$('.fcard').forEach(b => b.addEventListener('click', () => {
      const f = FICHES[+b.dataset.f]; if (f.ch.length) location.hash = '#/chapitre/' + f.ch[0] + '/resume'; else lightbox(f);
    }));
  }
  function stat(ic, n, lb) { return `<div class="stat tilt"><span class="bub">${IC[ic]}</span><b>${n}</b><span>${lb}</span></div>`; }

  /* ---------- page d'un niveau ---------- */
  function niveau(n, f) {
    if (n.filieres.length && !n.filieres.some(x => x.id === f)) f = filOf(n);
    if (f) store.set('fil-' + n.id, f);
    const fx = n.filieres.find(x => x.id === f);
    const mat = (m, fr, ar, ic) => `<section class="matiere k-${m === 'chimie' ? 'chim' : 'meca'}"><h2 class="mtitle"><span class="bub">${IC[ic]}</span>${t(fr, ar)}</h2>
      ${n[m].map((u, i) => { const ls = u.ch.map(id => BY[id]).filter(l => l && inFil(l, f)); return ls.length ? `<div class="unite"><h3><span>${t('Unité', 'الوحدة')} ${i + 1}</span>${esc(t(u.titre, u.ar))}</h3><div class="books">${ls.map(l => bookCard(l)).join('')}</div></div>` : ''; }).join('')}</section>`;
    $('#app').innerHTML = `<section class="lvhead lv-${n.id}">
        ${crumb([esc(t(n.titre, n.ar))])}
        <h1>${esc(t(n.titre, n.ar))}${fx ? ` <small>${esc(fx.titre)}</small>` : ''}</h1>
        ${n.filieres.length ? `<nav class="filieres" aria-label="${t('Filière', 'الشعبة')}">${n.filieres.map(x => `<a href="#/niveau/${n.id}/${x.id}" aria-current="${x.id === f}"><b>${esc(x.court)}</b><span>${esc(x.titre)}</span></a>`).join('')}</nav>` : ''}
        ${searchBox('', 'q')}
      </section>
      <div class="mats">${mat('physique', 'Physique', 'الفيزياء', 'atom')}${mat('chimie', 'Chimie', 'الكيمياء', 'chim')}</div>
      <section class="card lvdocs"><h2 class="ptitle">${IC.file} ${t('Documents du professeur', 'وثائق الأستاذ')} — ${esc(t(n.titre, n.ar))}</h2><div id="lvdocs"></div></section>`;
    $('#q').addEventListener('input', e => { if (e.target.value.trim()) goSearch(e.target.value); });
    fillDocs('#lvdocs', d => d.niveau === n.id, `<p class="hint">${t('Les séries et devoirs du professeur apparaîtront ici.', 'ستظهر هنا سلاسل وفروض الأستاذ.')}</p>`);
  }

  /* ---------- recherche globale ---------- */
  const norm = s => String(s).replace(/<[^>]+>/g, ' ').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const tight = s => norm(s).replace(/[\s·*×]/g, '').replace(/[−–]/g, '-');
  function search(q) {
    $('#app').innerHTML = `<section class="lvhead">${crumb([t('Recherche', 'بحث')])}<h1>${t('Recherche', 'بحث')}</h1>${searchBox(q, 'q2')}</section><div id="res"></div>`;
    const inp = $('#q2'); inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length);
    const run = () => {
      const qs = inp.value.trim(); history.replaceState(null, '', '#/recherche/' + encodeURIComponent(qs));
      const nq = norm(qs), tq = tight(qs);
      // mot court (pH, RC…) : mot entier seulement
      const has = nq.length <= 3 ? (re => x => re.test(x))(new RegExp('(^|[^a-z0-9])' + nq.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '($|[^a-z0-9])')) : x => x.includes(nq);
      if (nq.length < 2) { $('#res').innerHTML = `<p class="empty">${t('Tape au moins 2 lettres : nom d’un chapitre, formule (ex. v = d/t), mot-clé (ex. demi-vie, pH, lentille)…', 'اكتب حرفين على الأقل : اسم درس، علاقة، أو كلمة مفتاح…')}</p>`; return; }
      const byTitle = [], byF = [], byK = [];
      ALL.forEach(l => {
        const ch = chapter(l);
        if (has(norm(l.fr + ' ' + l.ar + ' ' + l.unite.titre))) { byTitle.push(bookCard(l, esc(t(l.unite.titre, l.unite.ar)))); return; }
        const fm = ch.formules.find(f => tight(f.raw || f.tex).includes(tq) || has(norm(f.sens)));
        if (fm) { byF.push(bookCard(l, `<span class="eq" dir="ltr" data-tex="${esc(fm.tex)}"></span> <small>${esc(fm.sens)}</small>`)); return; }
        const txt = [l.exFr, l.exAr].concat(RESUME[l.id] || [], ch.etapes || [], ch.retenir, ch.erreurs, ch.sections.map(s => s.titre + ' ' + s.html)).map(norm);
        const hit = txt.find(has);
        if (hit) { const i = Math.max(0, hit.search(new RegExp(nq.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))), a = Math.max(0, i - 50); byK.push(bookCard(l, '…' + esc(hit.slice(a, i + nq.length + 70)).replace(esc(nq), m => '<mark>' + m + '</mark>') + '…')); }
      });
      const block = (title, arr) => arr.length ? `<section class="shelf"><h2>${title} <small>${arr.length}</small></h2><div class="books">${arr.join('')}</div></section>` : '';
      $('#res').innerHTML = byTitle.length + byF.length + byK.length
        ? block(t('Chapitres', 'الدروس'), byTitle) + block(t('Formules', 'العلاقات'), byF) + block(t('Mots-clés dans le cours', 'كلمات في الدرس'), byK)
        : `<p class="empty">${t('Aucun résultat.', 'لا توجد نتائج.')}</p>`;
      typeset($('#res'));
    };
    inp.addEventListener('input', run); run();
    // charge les contenus complets pour chercher aussi dedans
    Promise.all(ALL.map(loadContenu)).then(() => { if ($('#q2') === inp) run(); });
  }

  /* ---------- fiche en grand ---------- */
  function lightbox(f) {
    const d = document.createElement('div');
    d.className = 'lb'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-modal', 'true'); d.setAttribute('aria-label', f.titre);
    d.innerHTML = `<div class="lb-bar"><b>${esc(f.titre)}</b><a class="lb-btn" href="${f.src}" download>${t('Télécharger', 'تحميل')}</a><button class="lb-btn lb-x" type="button" aria-label="${t('Fermer', 'إغلاق')}">✕</button></div>
      <div class="lb-scroll"><img src="${f.src}" alt="${esc(f.titre)}"></div><p class="lb-tip">${t('Touche l’image pour zoomer.', 'المس الصورة للتكبير.')}</p>`;
    const close = () => { d.remove(); document.removeEventListener('keydown', key); document.body.classList.remove('noscroll'); };
    const key = e => { if (e.key === 'Escape') close(); };
    d.addEventListener('click', e => { if (e.target === d || e.target.closest('.lb-x')) close(); else if (e.target.tagName === 'IMG') e.target.classList.toggle('big'); });
    document.addEventListener('keydown', key);
    document.body.appendChild(d); document.body.classList.add('noscroll'); $('.lb-x', d).focus();
  }

  /* ---------- page chapitre ---------- */
  const TABS = [['resume', 'Résumé du cours', 'ملخص الدرس', 'sheet'], ['experiences', 'Expériences', 'التجارب', 'flask'], ['series', 'Séries d’exercices', 'سلاسل التمارين', 'file'], ['quiz', 'Quiz', 'اختبار', 'check']];
  const seeExp = name => `<button class="seeexp" type="button" data-sim="${name}">${IC.play}<span>${t('Voir l’expérience', 'شاهد التجربة')} : ${esc(simName(name))}</span></button><div class="stepsim sim" hidden></div>`;
  const levelLab = (l, d) => [, t('Facile', 'سهل'), t('Moyen', 'متوسط'), l.niv.id === '2bac' ? t('Type Bac', 'نموذج الباك') : t('Approfondissement', 'تعمق')][d];

  document.addEventListener('keydown', e => {
    const r = document.querySelector('.panel[data-p="resume"]:not([hidden]) .reader[data-mode="pages"]');
    if (!r || !r.__go || e.altKey || e.ctrlKey || e.metaKey || e.target.closest('input, textarea, select, [contenteditable]')) return;
    if (e.key === 'ArrowRight' || e.key === 'PageDown') { r.__go(document.dir === 'rtl' ? -1 : 1); e.preventDefault(); }
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { r.__go(document.dir === 'rtl' ? 1 : -1); e.preventDefault(); }
  });
  function lesson(l, tab) {
    const n = l.niv; let f = filOf(n);
    if (!inFil(l, f)) { f = l.fil[0]; store.set('fil-' + n.id, f); }
    const list = n.list.filter(x => inFil(x, f)), i = list.indexOf(l), prev = list[i - 1], next = list[i + 1];
    const ch = chapter(l), k = domKey(l), fic = FICHES.filter(x => x.ch.includes(l.id));
    const stepSims = (ch.etapes || (ch.retenirTl ? ch.retenir : [])).map((s, j) => simForStep(l.id, j + 1, s, ch.sims));
    if (!TABS.some(x => x[0] === tab)) tab = 'resume';
    const nav = (x, dir) => x ? `<a class="pn ${dir}" href="#/chapitre/${x.id}"><small>${dir === 'prev' ? t('← Chapitre précédent', 'الدرس السابق') : t('Chapitre suivant →', 'الدرس التالي')} · ${esc(t(x.matFr, x.matAr))}</small>${esc(t(x.fr, x.ar))}</a>` : '<span></span>';
    const timeline = (items) => `<ol class="tl" dir="ltr" lang="fr">${items.map((s, j) => `<li><span class="tln"></span><div><div class="stx">${s}</div>${stepSims[j] ? seeExp(stepSims[j]) : ''}</div></li>`).join('')}</ol>`;
    const todo = what => `<p class="todo">${IC.warn}<span>${what} — ${t('à compléter par le professeur.', 'سيضيفه الأستاذ.')}</span></p>`;
    const byD = [1, 2, 3].map(d => ch.exos.filter(e => e.d === d));
    let ex = 0;

    /* ---------- Résumé : lecteur de cours, une partie à la fois ---------- */
    const strip = x => String(x).replace(/^\s*\d+\s*[.)]\s*/, '');
    const RP = [];
    RP.push({ ic: IC.bulb, t: t('L’essentiel', 'الأساسي'), cls: 'intro', h: `<p class="rk-lead">${ch.intro}</p>`
      + (ch.sections.length ? `<p class="rk-plan">${t('Au programme de ce chapitre :', 'في هذا الدرس :')}</p><ol class="rk-parts">${ch.sections.map((x, j) => `<li><button type="button" data-go="${j + 1}"><span>${j + 1}</span>${strip(x.titre)}</button></li>`).join('')}</ol>` : '') });
    ch.sections.forEach((x, j) => RP.push({ n: j + 1, t: strip(x.titre), h: x.html + (x.sim && SIMS[x.sim] ? seeExp(x.sim) : '') }));
    if (ch.etapes) RP.push({ ic: IC.book, t: t('Le cours pas à pas', 'الدرس خطوة بخطوة'), h: timeline(ch.etapes) });
    if (ch.details.length) RP.push({ ic: IC.atom, t: t('Pour bien comprendre', 'لفهم أعمق'), h: ch.details.map(d => `<details class="detail"><summary>${esc(d.t)}</summary><div class="dbody">${d.h}${d.sim && SIMS[d.sim] ? seeExp(d.sim) : ''}</div></details>`).join('') });
    RP.push({ ic: IC.sigma, t: t('Formules à connaître', 'العلاقات الأساسية'), cls: 'formules', h: `<div class="formulas">${ch.formules.map(x => `<div class="fm"><div class="eq" dir="ltr" data-tex="${esc(x.tex)}"></div><div class="mean">${esc(x.sens)}</div></div>`).join('')}</div>` });
    RP.push({ ic: IC.star, t: t('À retenir', 'يجب حفظه'), cls: 'retenir', h: ch.retenirTl ? timeline(ch.retenir) : `<ul class="rk-list">${ch.retenir.map(x => `<li>${x}</li>`).join('')}</ul>` });
    RP.push({ ic: IC.warn, t: t('Erreurs fréquentes', 'أخطاء شائعة'), cls: 'erreurs', h: ch.erreurs.length ? `<ul class="rk-list">${ch.erreurs.map(x => `<li>${x}</li>`).join('')}</ul>` : todo(t('Liste des erreurs fréquentes', 'الأخطاء الشائعة')) });
    RP.push({ ic: IC.sheet, t: t('Résumé à imprimer', 'ملخص للطبع'), cls: 'print', h: `<div class="pdfs"><a class="pdfb" href="resumes/pdf/${l.id}.pdf" download>${IC.sheet}<span><b>${t('Résumé PDF', 'الملخص PDF')}</b><small>${t('une page, à imprimer', 'صفحة واحدة للطبع')}</small></span></a>
          <a class="pdfb cor" href="resumes/resume.html?c=${l.id}">${IC.book}<span><b>${t('Voir le résumé', 'شاهد الملخص')}</b><small>${t('en ligne', 'على الموقع')}</small></span></a></div>
        ${fic.map(x => `<figure class="fiche"><button type="button" class="fopen" data-f="${FICHES.indexOf(x)}"><img src="${x.src}" alt="${esc(x.titre)}" loading="lazy" width="2400" height="1697"></button>
          <figcaption><span>${t('Fiche du professeur', 'ملخص الأستاذ')} : ${esc(x.titre)}</span><a class="lb-btn" href="${x.src}" download>${t('Télécharger', 'تحميل')}</a></figcaption></figure>`).join('')}` });
    const rkMode = store.get('rk-mode') === 'all' ? 'all' : 'pages';
    const pResume = `
      <div class="reader" data-mode="${rkMode}">
        <aside class="rk-toc" aria-label="${t('Sommaire', 'الفهرس')}">
          <div class="rk-head"><b>${IC.book}${t('Sommaire', 'الفهرس')}</b>
            <button type="button" class="rk-mode" aria-pressed="${rkMode === 'all'}">${rkMode === 'all' ? t('Une partie à la fois', 'جزء بجزء') : t('Tout afficher', 'عرض الكل')}</button></div>
          <ol>${RP.map((x, j) => `<li><button type="button" data-go="${j}"><span class="rk-n">${x.n ? x.n : x.ic}</span><span class="rk-tt" dir="auto">${x.t}</span></button></li>`).join('')}</ol>
          <div class="rk-bar" aria-hidden="true"><i></i></div>
        </aside>
        <div class="rk-main">
          <div class="rk-stage">
            ${RP.map((x, j) => `<article class="rk-page ${x.cls || ''}" data-i="${j}" aria-label="${esc(strip(x.t))}">
              <header class="rk-ph"><span class="rk-badge">${x.n ? x.n : x.ic}</span><div><small>${x.n ? t('Partie', 'الجزء') + ' ' + x.n + ' / ' + ch.sections.length : x.cls === 'intro' ? t('Introduction', 'مقدمة') : t('Synthèse', 'خلاصة')}</small><h2 dir="auto">${x.t}</h2></div>
                <span class="rk-pg">${j + 1}<i>/${RP.length}</i></span></header>
              <div class="rk-body" dir="ltr" lang="fr">${x.h}</div></article>`).join('')}
          </div>
          <nav class="rk-nav" aria-label="${t('Navigation dans le résumé', 'التنقل في الملخص')}">
            <button type="button" class="rk-prev"><span class="rk-ar">‹</span><span class="rk-lb"><small>${t('Précédent', 'السابق')}</small><b></b></span></button>
            <span class="rk-dots">${RP.map((x, j) => `<i data-go="${j}"></i>`).join('')}</span>
            <button type="button" class="rk-next"><span class="rk-lb"><small>${t('Suivant', 'التالي')}</small><b></b></span><span class="rk-ar">›</span></button>
          </nav>
        </div>
      </div>`;

    const P = ch.protocole;
    const lst = v => Array.isArray(v) ? `<ul>${v.map(e => `<li>${e}</li>`).join('')}</ul>` : (/^\s*</.test(v) ? v : `<p>${v}</p>`);
    const XPS = (P ? [{ t: P.titre, mat: P.materiel, e: P.etapes, obs: ch.observations, cc: ch.conclusion, sim: ch.sims[0] }] : []).concat(ch.xps);
    XPS.forEach(x => { if (x.sim && SIMS[x.sim] && !ch.sims.includes(x.sim)) ch.sims.push(x.sim); });
    const pExp = `
      <div class="card"><h2 class="ptitle">${IC.sliders} ${ch.sims.length > 1 ? t('Expériences interactives', 'تجارب تفاعلية') : t('Expérience interactive', 'تجربة تفاعلية')}</h2>
        <p class="hint">${t('Déplace les curseurs : la figure et le graphe changent en temps réel. Ou clique sur « Regarder l’expérience ».', 'غيّر المقادير : الشكل والمنحنى يتغيران مباشرة. أو اضغط على « شاهد التجربة ».')}</p>
        ${ch.sims.length > 1 ? `<div class="simtabs" role="tablist">${ch.sims.map((s, j) => `<button type="button" role="tab" data-sim="${s}" aria-selected="${j === 0}">${esc(simName(s))}</button>`).join('')}</div>` : ''}
        <div id="sim" class="sim" dir="ltr"></div></div>
      ${XPS.length > 1 ? `<nav class="card xpnav"><h2 class="ptitle">${IC.flask} ${t('Les expériences du chapitre', 'تجارب الدرس')} <small>${XPS.length}</small></h2>
        <ol dir="ltr" lang="fr">${XPS.map((x, j) => `<li><a href="#xp-${j + 1}" data-xp="${j + 1}">${x.t || 'Expérience ' + (j + 1)}</a></li>`).join('')}</ol></nav>` : ''}
      ${XPS.length ? XPS.map((x, j) => `<section class="xp" id="xp-${j + 1}" dir="ltr" lang="fr">
        <h2 class="xph"><span class="xpn">${j + 1}</span>${x.t ? x.t : 'Expérience ' + (j + 1)}</h2>
        ${x.but ? `<p class="xpbut"><b>But :</b> ${x.but}</p>` : ''}
        ${x.fig || ''}
        <div class="grid3">
          <div class="box proto"><h2>${IC.flask} ${t('Protocole', 'البروتوكول')}</h2>${x.mat ? `<p><b>Matériel :</b> ${x.mat}</p>` : ''}<ol class="steps">${(x.e || []).map(e => `<li>${e}</li>`).join('')}</ol></div>
          <div class="box obs"><h2>${IC.opt} ${t('Observations', 'الملاحظات')}</h2>${x.obs ? lst(x.obs) : todo('Observations')}</div>
          <div class="box concl"><h2>${IC.check} ${t('Conclusion', 'الاستنتاج')}</h2>${x.cc ? lst(x.cc) : todo('Conclusion')}</div>
        </div>
        ${x.sim && SIMS[x.sim] ? `<button class="xpsim" type="button" data-go="${x.sim}">${IC.play}<span>${t('Simuler cette expérience', 'حاكي هذه التجربة')} : ${esc(simName(x.sim))}</span></button>` : ''}
      </section>`).join('') : `<div class="box proto">${todo('Protocole expérimental')}</div>`}`;

    const ser = teacherSeries(l);
    const pSeries = `
      <div class="card"><h2 class="ptitle">${IC.file} ${t('Séries d’exercices', 'سلاسل التمارين')}</h2>
        ${ch.exos.length ? `<div class="pdfs"><a class="pdfb" href="series/pdf/${l.id}.pdf" download>${IC.file}<span><b>PDF ${t('énoncés', 'التمارين')}</b><small>${ch.exos.length} ${t('exercices, à imprimer', 'تمارين للطبع')}</small></span></a>
          <a class="pdfb cor" href="series/pdf/${l.id}-corrige.pdf" download>${IC.check}<span><b>PDF ${t('avec corrections', 'مع التصحيح')}</b><small>${t('énoncés + corrigés', 'التمارين + التصحيح')}</small></span></a>
          <a class="pdfb alt2" href="series/serie.html?c=${l.id}">${IC.book}<span><b>${t('Version à imprimer', 'نسخة للطبع')}</b><small>${t('page dédiée', 'صفحة خاصة')}</small></span></a></div>
          <div class="legend"><span class="tag d1">★ ${levelLab(l, 1)}</span><span class="tag d2">★★ ${levelLab(l, 2)}</span><span class="tag d3">★★★ ${levelLab(l, 3)}</span></div>` : todo(t('Série d’exercices', 'سلسلة تمارين'))}</div>
      ${byD.map((arr, d) => arr.length ? `<section class="exlevel e${d + 1}"><h2>${'★'.repeat(d + 1)} ${levelLab(l, d + 1)} <small>${arr.length}</small></h2>
        ${arr.map(e => `<article class="exo2" dir="ltr" lang="fr"><h3>Exercice ${++ex} — ${esc(e.t || '')}</h3><div class="q">${e.q}</div>${e.fig ? `<figure class="fig">${e.fig}</figure>` : ''}
          <button class="showcor" type="button" aria-expanded="false">${IC.check}<span>${t('Afficher la correction', 'أظهر التصحيح')}</span></button><div class="cor" hidden>${e.s}</div></article>`).join('')}</section>` : '').join('')}
      <div class="card"><h2 class="ptitle">${t('Séries et devoirs du professeur', 'سلاسل وفروض الأستاذ')}</h2>
        <div id="chdocs"></div>${ser.length ? `<div class="series">${ser.map(x => `<a class="serie" href="${esc(x[1])}" target="_blank" rel="noopener">${IC.file}<span>${esc(x[0])}</span>${IC.arrow}</a>`).join('')}</div>` : ''}
        <p class="hint" id="nodocs" hidden>${t('Le professeur ajoutera ici ses séries et devoirs (PDF).', 'سيضيف الأستاذ هنا سلاسله وفروضه (PDF).')}</p></div>`;

    const pQuiz = ch.quiz.length ? `<div class="card" dir="ltr" lang="fr"><h2 class="ptitle">${IC.check} Quiz — ${ch.quiz.length} questions</h2>
        <p class="hint">${t('Choisis une réponse : la correction s’affiche tout de suite.', 'اختر جوابا : يظهر التصحيح مباشرة.')}</p>
        ${ch.quiz.map((q, j) => `<div class="qz" data-r="${q.r}"><p><b>${j + 1}.</b> ${q.q}</p>
          <div class="opts">${q.o.map((o, m) => `<button type="button" data-j="${m}">${o}</button>`).join('')}</div>
          <p class="expl" hidden>${q.e}</p></div>`).join('')}
        <p class="score" id="score" aria-live="polite"></p><button class="nextp" id="redo" type="button" hidden>↻ ${t('Recommencer le quiz', 'أعد الاختبار')}</button></div>`
      : `<div class="card">${todo(t('Quiz de 5 à 10 questions', 'اختبار من 5 إلى 10 أسئلة'))}<p class="hint">${t('En attendant, révise le résumé et fais la série d’exercices.', 'في انتظار ذلك، راجع الملخص وأنجز سلسلة التمارين.')}</p></div>`;

    const bodies = { resume: pResume, experiences: pExp, series: pSeries, quiz: pQuiz };
    $('#app').innerHTML = `
      <article class="lesson k-${k}">
        <header class="lhead">
          ${crumb([`<a href="#/niveau/${n.id}${f ? '/' + f : ''}">${esc(t(n.titre, n.ar))}${f ? ' ' + esc(filName(n, f)) : ''}</a>`, esc(t(l.matFr, l.matAr)), esc(t(l.unite.titre, l.unite.ar))])}
          <div class="lh-row"><span class="cube3d" aria-hidden="true"><span class="cb">${[1, 2, 3, 4, 5, 6].map(m => `<i class="f${m}">${IC[k]}</i>`).join('')}</span></span><div>
            <p class="chnum">${esc(t(l.matFr, l.matAr))} · ${t('Chapitre', 'الدرس')} ${l.num}${l.fil ? ' · ' + l.fil.map(x => filName(n, x)).join(' / ') : ''}</p>
            <h1>${esc(t(l.fr, l.ar))}</h1>
            <p class="alt" dir="${lang === 'ar' ? 'ltr' : 'rtl'}">${esc(t(l.ar, l.fr))}</p></div></div>
          ${verified(l.id) ? '' : `<p class="verif">${IC.warn}<span>${t('Contenu à vérifier par le professeur', 'محتوى في انتظار مراجعة الأستاذ')}</span></p>`}
        </header>
        <nav class="tabs3d" role="tablist">${TABS.map(x => `<button type="button" role="tab" data-t="${x[0]}">${IC[x[3]]}<span>${t(x[1], x[2])}</span></button>`).join('')}</nav>
        ${TABS.map(x => `<section class="panel" data-p="${x[0]}" hidden>${bodies[x[0]]}</section>`).join('')}
        <nav class="pnav">${nav(prev, 'prev')}${nav(next, 'next')}</nav>
      </article>`;

    fillDocs('#chdocs', d => d.chapitre === l.id, '');
    docsReady.then(() => { const nd = $('#nodocs'); if (nd) nd.hidden = !!(DOCS.some(d => d.chapitre === l.id) || ser.length); });

    function closeSteps() {
      $$('.stepsim').forEach(c => { c.hidden = true; c.innerHTML = ''; });
      $$('.seeexp').forEach(b => { b.classList.remove('open'); b.lastChild.textContent = t('Voir l’expérience', 'شاهد التجربة') + ' : ' + simName(b.dataset.sim); });
    }
    $$('.seeexp').forEach(b => b.addEventListener('click', () => {
      const box = b.nextElementSibling, open = !box.hidden;
      if (stopSim) { stopSim(); stopSim = null; }
      closeSteps();
      if (open) return;
      box.hidden = false; b.classList.add('open'); b.lastChild.textContent = t('Fermer l’expérience', 'أغلق التجربة');
      mountSim(box, b.dataset.sim);
    }));
    function show(id) {
      if (stopSim) { stopSim(); stopSim = null; }
      closeSteps();
      $$('.tabs3d button').forEach(b => b.setAttribute('aria-selected', b.dataset.t === id));
      $$('.panel').forEach(p => { p.hidden = p.dataset.p !== id; });
      if (id === 'experiences') { const cur = $('.simtabs [aria-selected="true"]'); mountSim($('#sim'), cur ? cur.dataset.sim : ch.sims[0]); }
      typeset($(`.panel[data-p="${id}"]`));
      history.replaceState(null, '', '#/chapitre/' + l.id + (id === 'resume' ? '' : '/' + id));
      const b = $(`.tabs3d [data-t="${id}"]`); if (b && b.scrollIntoView) b.scrollIntoView({ block: 'nearest', inline: 'center' });
    }
    $$('.tabs3d button').forEach(b => b.addEventListener('click', () => show(b.dataset.t)));
    const rd = $('.reader');
    if (rd) {
      const pages = $$('.rk-page', rd), N = pages.length, tocB = $$('.rk-toc [data-go]', rd), dots = $$('.rk-dots i', rd);
      const skey = 'rk-' + l.id; let cur = 0;
      try { cur = clamp(+(sessionStorage.getItem(skey) || 0), 0, N - 1); } catch (e) { /* stockage indisponible */ }
      const title = j => pages[j] ? $('h2', pages[j]).textContent : '';
      const top = () => { const y = rd.getBoundingClientRect().top; if (y < 70 || y > innerHeight * 0.6) scrollTo({ top: y + scrollY - 140, behavior: 'smooth' }); };
      function paint(anim) {
        const all = rd.dataset.mode === 'all';
        pages.forEach((p, j) => { const on = all || j === cur; p.classList.toggle('on', on); p.classList.remove('in-next', 'in-prev'); if (on && anim && !all) { void p.offsetWidth; p.classList.add(anim); } });
        tocB.forEach(b => b.setAttribute('aria-current', !all && +b.dataset.go === cur ? 'step' : 'false'));
        tocB.forEach(b => b.classList.toggle('done', !all && +b.dataset.go < cur));
        dots.forEach((d, j) => d.classList.toggle('on', j === cur));
        const ol = $('.rk-toc ol', rd), cb = tocB[cur]; if (!all && cb && ol.scrollWidth > ol.clientWidth + 2) ol.scrollTo({ left: cb.parentNode.offsetLeft - (ol.clientWidth - cb.offsetWidth) / 2, behavior: anim ? 'smooth' : 'auto' });
        $('.rk-bar i', rd).style.width = all ? '100%' : ((cur + 1) / N * 100) + '%';
        const pv = $('.rk-prev', rd), nx = $('.rk-next', rd);
        pv.disabled = cur === 0; $('b', pv).textContent = cur > 0 ? title(cur - 1) : '';
        $('b', nx).textContent = cur < N - 1 ? title(cur + 1) : t('Passer aux expériences', 'انتقل إلى التجارب');
        nx.classList.toggle('last', cur === N - 1);
        try { sessionStorage.setItem(skey, cur); } catch (e) { /* stockage indisponible */ }
      }
      function go(j, scroll = true) {
        if (rd.dataset.mode === 'all') { const p = pages[j]; if (p) scrollTo({ top: p.getBoundingClientRect().top + scrollY - 130, behavior: 'smooth' }); return; }
        if (j < 0) return; if (j >= N) { show('experiences'); scrollTo({ top: 0, behavior: 'smooth' }); return; }
        if (j === cur) return;
        if (stopSim) { stopSim(); stopSim = null; } closeSteps();
        const dir = j > cur ? 'in-next' : 'in-prev'; cur = j; paint(dir); if (scroll) top();
      }
      rd.__go = d => go(cur + d);
      $('.rk-prev', rd).addEventListener('click', () => go(cur - 1));
      $('.rk-next', rd).addEventListener('click', () => go(cur + 1));
      $$('[data-go]', rd).forEach(b => b.addEventListener('click', () => go(+b.dataset.go)));
      $('.rk-mode', rd).addEventListener('click', e => {
        const all = rd.dataset.mode !== 'all'; rd.dataset.mode = all ? 'all' : 'pages'; store.set('rk-mode', all ? 'all' : 'pages');
        e.currentTarget.setAttribute('aria-pressed', all); e.currentTarget.textContent = all ? t('Une partie à la fois', 'جزء بجزء') : t('Tout afficher', 'عرض الكل');
        paint(); top();
      });
      // glisser du doigt (téléphone)
      let sx = null, sy = 0;
      const stage = $('.rk-stage', rd);
      stage.addEventListener('touchstart', e => { if (rd.dataset.mode === 'all' || e.target.closest('.sim, input, select, .katex-display, .formulas, .tl')) { sx = null; return; } sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
      stage.addEventListener('touchend', e => { if (sx === null) return; const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy; sx = null; if (Math.abs(dx) > 70 && Math.abs(dy) < 50) go(cur + (dx < 0 ? 1 : -1) * (document.dir === 'rtl' ? -1 : 1)); }, { passive: true });
      // léger relief 3D au survol de la souris
      if (!matchMedia('(prefers-reduced-motion: reduce)').matches && matchMedia('(hover: hover)').matches) {
        stage.addEventListener('pointermove', e => { if (e.pointerType !== 'mouse' || rd.dataset.mode === 'all') return; const p = pages[cur], r = p.getBoundingClientRect(); p.style.setProperty('--rx', (((e.clientY - r.top) / r.height - 0.5) * -2.2).toFixed(2) + 'deg'); p.style.setProperty('--ry', (((e.clientX - r.left) / r.width - 0.5) * 2.6).toFixed(2) + 'deg'); });
        stage.addEventListener('pointerleave', () => pages.forEach(p => { p.style.removeProperty('--rx'); p.style.removeProperty('--ry'); }));
      }
      paint();
    }
    $$('.simtabs button').forEach(b => b.addEventListener('click', () => {
      $$('.simtabs button').forEach(x => x.setAttribute('aria-selected', x === b));
      if (stopSim) stopSim();
      mountSim($('#sim'), b.dataset.sim);
    }));
    $$('.xpsim').forEach(b => b.addEventListener('click', () => {
      const tb = $(`.simtabs [data-sim="${b.dataset.go}"]`);
      if (tb) tb.click(); else { if (stopSim) stopSim(); mountSim($('#sim'), b.dataset.go); }
      const c = $('#sim').closest('.card'); window.scrollTo({ top: c.getBoundingClientRect().top + scrollY - 130, behavior: 'smooth' });
    }));
    $$('.xpnav a').forEach(a => a.addEventListener('click', ev => { ev.preventDefault(); const s = document.getElementById('xp-' + a.dataset.xp); if (s) s.scrollIntoView({ behavior: 'smooth', block: 'start' }); }));
    $$('.fopen').forEach(b => b.addEventListener('click', () => lightbox(FICHES[+b.dataset.f])));
    $$('.showcor').forEach(b => b.addEventListener('click', () => {
      const c = b.nextElementSibling, open = c.hidden; c.hidden = !open;
      b.setAttribute('aria-expanded', open); b.lastChild.textContent = open ? t('Masquer la correction', 'أخف التصحيح') : t('Afficher la correction', 'أظهر التصحيح');
      if (open) typeset(c);
    }));
    let good = 0, done = 0; const nq = ch.quiz.length;
    $$('.qz').forEach(qz => $$('button', qz).forEach(b => b.addEventListener('click', () => {
      if (qz.dataset.done) return; qz.dataset.done = 1; done++;
      const ok = b.dataset.j === qz.dataset.r; if (ok) good++;
      b.classList.add(ok ? 'ok' : 'ko'); $(`button[data-j="${qz.dataset.r}"]`, qz).classList.add('ok');
      $$('button', qz).forEach(x => { x.disabled = true; });
      $('.expl', qz).hidden = false;
      $('#score').textContent = 'Score : ' + good + ' / ' + done + (done === nq ? (good === nq ? ' — Excellent !' : good >= nq / 2 ? ' — Bien, revois les questions manquées.' : ' — Relis le résumé du cours puis réessaie.') : '');
      if (done === nq) $('#redo').hidden = false;
    })));
    const redo = $('#redo'); if (redo) redo.addEventListener('click', () => { lesson(l, 'quiz'); });
    show(tab);
  }

  /* ---------- simulation ---------- */
  function mountSim(host, name) {
    const sim = SIMS[name];
    if (!sim) { host.textContent = '—'; return; }
    SIM_LANG = lang;
    const W = 640, H = 360, v = {};
    const lab = x => Array.isArray(x) ? x[lang === 'ar' ? 1 : 0] : x;
    const rng = sim.p.filter(p => !Array.isArray(p[2]));
    host.innerHTML = `<div class="stage"><canvas width="${W}" height="${H}"></canvas><span class="autolab" hidden></span>${sim.anim ? `<button class="replay" type="button">↻ ${t('Rejouer', 'إعادة')}</button>` : ''}</div>
      ${rng.length ? `<button class="autoplay" type="button" aria-pressed="false">${IC.play}<span>${t('Regarder l’expérience', 'شاهد التجربة')}</span></button>` : ''}
      <div class="ctl">${sim.p.map(p => {
      const sel = Array.isArray(p[2]);
      v[p[0]] = sel ? p[3] : p[5];
      return sel
        ? `<label><span><b>${mk(lab(p[1]))}</b></span><select data-id="${p[0]}">${p[2].map((o, k) => `<option value="${k}"${k === p[3] ? ' selected' : ''}>${esc(lab(o))}</option>`).join('')}</select></label>`
        : `<label><span><b>${mk(lab(p[1]))}</b> <output data-o="${p[0]}">${fmtVal(p[5])}</output></span><input type="range" data-id="${p[0]}" min="${p[2]}" max="${p[3]}" step="${p[4]}" value="${p[5]}"></label>`;
    }).join('')}</div>
      <ul class="out" aria-live="off"></ul>`;
    const cv = $('canvas', host), ctx = cv.getContext('2d'), out = $('.out', host);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = W * dpr; cv.height = H * dpr;
    let t0 = performance.now(), raf = 0, alive = true, lastOut = '', auto = false, autoT0 = 0, lastIdx = -1;
    const autolab = $('.autolab', host), autobtn = $('.autoplay', host);
    function setVal(p, x) {
      x = +(Math.round((x - p[2]) / p[4]) * p[4] + p[2]).toFixed(6); x = Math.min(p[3], Math.max(p[2], x));
      v[p[0]] = x;
      const inp = host.querySelector(`input[data-id="${p[0]}"]`); if (inp) inp.value = x;
      const o = host.querySelector(`[data-o="${p[0]}"]`); if (o) o.textContent = fmtVal(x);
    }
    function setAuto(on) {
      auto = on; autobtn.setAttribute('aria-pressed', on);
      autobtn.lastChild.textContent = on ? t('Arrêter', 'إيقاف') : t('Regarder l’expérience', 'شاهد التجربة');
      autolab.hidden = !on;
      if (on) { autoT0 = performance.now(); lastIdx = -1; if (!sim.anim) frame(); }
      else if (lastIdx >= 0) { setVal(rng[lastIdx], rng[lastIdx][5]); lastIdx = -1; if (!sim.anim) frame(); }
    }
    function colors() {
      const cs = getComputedStyle(document.documentElement), g = k => cs.getPropertyValue(k).trim();
      return { ink: g('--ink'), mute: g('--mute'), grid: g('--grid'), bg: g('--card'), a: g('--s-a'), b: g('--s-b'), c: g('--s-c'), d: g('--s-d'), e: g('--s-e') };
    }
    function frame() {
      if (!alive) return;
      const c = makeG(ctx, W, H, colors());
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.direction = 'ltr';
      ctx.clearRect(0, 0, W, H); ctx.setLineDash([]); ctx.globalAlpha = 1;
      if (auto) {
        const el = (performance.now() - autoT0) / 1000, per = 7, idx = Math.floor(el / per) % rng.length, p = rng[idx];
        if (idx !== lastIdx) { if (lastIdx >= 0) setVal(rng[lastIdx], rng[lastIdx][5]); lastIdx = idx; autolab.innerHTML = '▶ ' + t('On fait varier', 'نغير') + ' ' + mk(lab(p[1])); }
        setVal(p, p[2] + (p[3] - p[2]) * (0.5 - 0.5 * Math.cos(2 * Math.PI * (el % per) / per)));
      }
      let res;
      try { res = sim.draw(c, v, (performance.now() - t0) / 1000) || []; }
      catch (e) { res = ['⚠ ' + e.message]; console.error(e); }
      const html = res.map(r => `<li>${mk(r)}</li>`).join('');
      if (html !== lastOut) { out.innerHTML = html; lastOut = html; }
      if (sim.anim || auto) raf = requestAnimationFrame(frame);
    }
    function fmtVal(x) { return String(+(+x).toFixed(4)).replace('.', ','); }
    if (autobtn) autobtn.addEventListener('click', () => setAuto(!auto));
    host.addEventListener('input', e => {
      const id = e.target.dataset.id; if (!id) return;
      if (auto) setAuto(false);
      v[id] = +e.target.value;
      const o = host.querySelector(`[data-o="${id}"]`); if (o) o.textContent = fmtVal(v[id]);
      t0 = performance.now(); if (!sim.anim) frame();
    });
    const rp = $('.replay', host); if (rp) rp.addEventListener('click', () => { t0 = performance.now(); });
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onTheme = () => { if (!sim.anim) frame(); };
    mq.addEventListener('change', onTheme);
    stopSim = () => { alive = false; cancelAnimationFrame(raf); mq.removeEventListener('change', onTheme); };
    frame();
  }

  /* ---------- routage ---------- */
  const OLD_TABS = { cours: 'resume', fiche: 'resume', form: 'resume', sim: 'experiences', quiz: 'quiz', series: 'series' };
  let seq = 0;
  function route() {
    if (stopSim) { stopSim(); stopSim = null; }
    document.documentElement.lang = lang; document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    $('#lang').textContent = lang === 'ar' ? 'Français' : 'العربية';
    if (theme) document.documentElement.dataset.theme = theme; else delete document.documentElement.dataset.theme;
    const dark = theme ? theme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    $('#theme').textContent = dark ? '☀' : '☾';
    $('#theme').setAttribute('aria-label', dark ? t('Mode clair', 'الوضع الفاتح') : t('Mode sombre', 'الوضع الداكن'));
    $('#insta').href = INSTAGRAM_URL; $('#insta-top').href = INSTAGRAM_URL;
    $('#searchbtn').setAttribute('aria-label', t('Recherche', 'بحث'));
    $('#foot').textContent = t('Prof. Zakaria Lazrak — Professeur de Physique-Chimie · Programme marocain (BIOF)', 'الأستاذ زكرياء لزرق — أستاذ الفيزياء والكيمياء · المقرر المغربي');
    const h = decodeURIComponent(location.hash);
    const old = h.match(/^#\/l\/([\w-]+)(?:\/(\w+))?/);
    if (old) { location.replace('#/chapitre/' + old[1] + (old[2] && OLD_TABS[old[2]] && OLD_TABS[old[2]] !== 'resume' ? '/' + OLD_TABS[old[2]] : '')); return; }
    const site = t('Bibliothèque de Physique-Chimie', 'مكتبة الفيزياء والكيمياء');
    let m;
    const my = ++seq;
    window.scrollTo(0, 0);
    if ((m = h.match(/^#\/chapitre\/([\w-]+)(?:\/(\w+))?/)) && BY[m[1]] && BY[m[1]].niv) {
      const l = BY[m[1]];
      $('#app').innerHTML = '<p class="empty">…</p>';
      loadContenu(l).then(() => { if (my === seq) { lesson(l, m[2]); document.title = t(l.fr, l.ar) + ' — ' + site; } });
    } else if ((m = h.match(/^#\/niveau\/([\w]+)(?:\/(\w+))?/)) && NIV[m[1]]) {
      niveau(NIV[m[1]], m[2]); document.title = t(NIV[m[1]].titre, NIV[m[1]].ar) + ' — ' + site;
    } else if ((m = h.match(/^#\/recherche\/?(.*)$/))) {
      search(m[1] || ''); document.title = t('Recherche', 'بحث') + ' — ' + site;
    } else { home(); document.title = site + ' | Prof. Zakaria Lazrak'; }
  }
  window.__typeset = () => typeset();
  $('#lang').addEventListener('click', () => { lang = lang === 'ar' ? 'fr' : 'ar'; store.set('lang', lang); route(); });
  $('#theme').addEventListener('click', () => {
    const dark = theme ? theme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    theme = dark ? 'light' : 'dark'; store.set('theme', theme); route();
  });
  window.addEventListener('hashchange', route);
  // effet 3D : les cartes s'inclinent sous la souris
  if (window.matchMedia && matchMedia('(pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let cur = null;
    document.addEventListener('pointermove', e => {
      const el = e.target.closest ? e.target.closest('.tilt') : null;
      if (cur && cur !== el) { cur.classList.remove('on'); cur.style.removeProperty('--rx'); cur.style.removeProperty('--ry'); }
      cur = el; if (!el) return;
      const r = el.getBoundingClientRect();
      el.classList.add('on');
      el.style.setProperty('--ry', (((e.clientX - r.left) / r.width - 0.5) * 14).toFixed(2) + 'deg');
      el.style.setProperty('--rx', ((0.5 - (e.clientY - r.top) / r.height) * 12).toFixed(2) + 'deg');
    });
  }
  route();
})();
