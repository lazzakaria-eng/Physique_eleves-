/* Application : routage, bibliothèque, page de leçon, montage des simulations */
'use strict';
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const store = {
    get(k, d) { try { return localStorage.getItem(k) || d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* stockage indisponible */ } },
  };
  let lang = store.get('lang', 'fr');
  let theme = store.get('theme', '');
  let level = store.get('level', 'tc');
  let query = '';
  let stopSim = null;

  const t = (fr, ar) => lang === 'ar' ? ar : fr;
  function typeset(root) {
    root = root || $('.panel:not([hidden])') || $('#app');
    if (!root || !(window.MathJax && MathJax.typesetPromise)) return;
    root.querySelectorAll('[data-tex]').forEach(el => { el.textContent = '\\(' + el.dataset.tex + '\\)'; el.removeAttribute('data-tex'); el.classList.add('mj'); });
    MathJax.typesetPromise([root]).catch(e => console.error(e));
  }
  window.__typeset = () => typeset();

  const ALL = [];
  LEVELS.forEach(lv => lv.domains.forEach(d => d.lessons.forEach((l, i) => ALL.push(Object.assign(l, { lv, dom: d })))));
  LEVELS.forEach(lv => { let n = 0; lv.domains.forEach(d => d.lessons.forEach(l => { l.num = ++n; })); lv.count = n; });

  /* ---------- icônes et domaines ---------- */
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
  };
  const domKey = d => /Chimie/.test(d.fr) ? 'chim' : /lectricit/.test(d.fr) ? 'elec' : /Optique/.test(d.fr) ? 'opt' : /Ondes/.test(d.fr) ? 'onde' : /nucl/.test(d.fr) ? 'nuc' : 'meca';
  const simsOf = l => [l.sim].concat(MORE_SIMS[l.id] || []);
  const seriesOf = l => (SERIES[l.id] || []).filter(x => Array.isArray(x) && x[0] && /^(https:\/\/|series\/)[^\s"'<>]+$/.test(x[1] || ''));
  const simName = n => SIM_NAMES[n] ? t(SIM_NAMES[n][0], SIM_NAMES[n][1]) : n;

  /* ---------- bibliothèque ---------- */
  function bookCard(l, showLevel) {
    const ns = simsOf(l).length;
    return `<a class="book k-${domKey(l.dom)}" href="#/l/${l.id}">
      <span class="bic">${IC[domKey(l.dom)]}</span>
      <span class="btx">
        <span class="num">${showLevel ? esc(l.lv.tag) + ' · ' : ''}${String(l.num).padStart(2, '0')}</span>
        <span class="ttl">${esc(t(l.fr, l.ar))}</span>
        <span class="meta">${ns} ${ns > 1 ? t('simulations', 'محاكاة') : t('simulation', 'محاكاة')} · ${l.f.length} ${t('formules', 'علاقات')}</span>
      </span>
      ${EXTRA[l.id] ? `<span class="full">${t('Complet', 'كامل')}</span>` : seriesOf(l).length ? `<span class="full ser">${seriesOf(l).length} ${t('séries', 'سلاسل')}</span>` : ''}
    </a>`;
  }

  function shelves() {
    const q = query.trim().toLowerCase();
    if (q) {
      const hits = ALL.filter(l => (l.fr + ' ' + l.ar + ' ' + l.exFr + ' ' + l.exAr + ' ' + l.f.map(x => x[1] + ' ' + x[2]).join(' ') + ' ' + (RESUME[l.id] || []).join(' ')).toLowerCase().includes(q));
      return `<section class="shelf"><h2>${t('Résultats', 'نتائج البحث')} <small>${hits.length}</small></h2>
        ${hits.length ? `<div class="books">${hits.map(l => bookCard(l, true)).join('')}</div>` : `<p class="empty">${t('Aucun chapitre trouvé.', 'لم يتم العثور على أي درس.')}</p>`}</section>`;
    }
    const lv = LEVELS.find(x => x.id === level) || LEVELS[0];
    return lv.domains.map(d => `<section class="shelf k-${domKey(d)}"><h2><span class="bic">${IC[domKey(d)]}</span>${esc(t(d.fr, d.ar))} <small>${d.lessons.length}</small></h2>
      <div class="books">${d.lessons.map(l => bookCard(l)).join('')}</div></section>`).join('');
  }

  function stat(ic, n, lb) { return `<div class="stat tilt"><span class="bub">${IC[ic]}</span><b>${n}</b><span>${lb}</span></div>`; }

  function home() {
    const nf = ALL.reduce((s, l) => s + l.f.length, 0);
    const lvInfo = {
      tc: [t('Les bases : mouvement, forces, électricité et chimie.', 'الأساسيات : الحركة، القوى، الكهرباء والكيمياء.'), 'meca'],
      '1bac': [t('Énergie, champs, optique et chimie des solutions.', 'الطاقة، المجالات، البصريات وكيمياء المحاليل.'), 'elec'],
      '2bac': [t('Ondes, nucléaire, électricité, mécanique et chimie du Bac.', 'الموجات، النووي، الكهرباء، الميكانيك وكيمياء الباك.'), 'nuc'],
    };
    const journey = [
      ['book', t('Lis le cours', 'اقرأ الدرس'), t('Expliqué étape par étape', 'مشروح خطوة بخطوة')],
      ['sheet', t('Révise la fiche', 'راجع الملخص'), t('Tout l’essentiel sur une page', 'كل الأساسيات في صفحة')],
      ['sliders', t('Expérimente', 'جرّب'), t('Simulations interactives', 'محاكاة تفاعلية')],
      ['check', t('Teste-toi', 'اختبر نفسك'), t('Quiz et séries corrigés', 'اختبارات وسلاسل مصححة')],
    ];
    $('#app').innerHTML = `
      <section class="hero">
        <div class="hero-in">
          <div class="hero-txt">
            <p class="who" dir="ltr">Zakaria Lazrak — Professeur de Physique-Chimie</p>
            <h1>${t('La Physique-Chimie,<br><em>enfin simple.</em>', 'الفيزياء والكيمياء،<br><em>بطريقة سهلة.</em>')}</h1>
            <p class="lead">${t('Cours expliqués pas à pas, fiches résumés, formules, simulations 3D-interactives et quiz : tout le programme du Tronc Commun au Bac.',
      'دروس مشروحة خطوة بخطوة، ملخصات، علاقات، محاكاة تفاعلية واختبارات : المقرر كاملا من الجذع المشترك إلى الباك.')}</p>
            <label class="search">${IC.search}<input id="q" type="search" value="${esc(query)}" placeholder="${t('Chercher un chapitre, une notion, une formule…', 'ابحث عن درس أو مفهوم أو علاقة…')}" aria-label="${t('Recherche', 'بحث')}"></label>
            <div class="hero-cta">
              <button class="cta" id="go" type="button">${t('Découvrir les cours', 'اكتشف الدروس')} ${IC.arrow}</button>
              <button class="cta2" id="gof" type="button">${IC.sheet} ${t('Fiches résumés 2BAC', 'ملخصات الثانية باك')}</button>
            </div>
          </div>
          <div class="hero-3d" aria-hidden="true">
            <div class="atom3d"><div class="orb o1"><i></i></div><div class="orb o2"><i></i></div><div class="orb o3"><i></i></div><div class="nuc"></div></div>
            <span class="chip3d c1" dir="ltr">E = mc²</span><span class="chip3d c2" dir="ltr">λ = v·T</span><span class="chip3d c3" dir="ltr">ΣF = m·a</span><span class="chip3d c4" dir="ltr">pH = −log[H₃O⁺]</span>
          </div>
        </div>
        <svg class="wave" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true"><path d="M0 40c180 40 360 50 540 30S900-10 1080 10s270 50 360 40v40H0z"/></svg>
      </section>

      <section class="stats">
        ${stat('book', ALL.length, t('chapitres', 'درسا'))}${stat('sliders', Object.keys(SIMS).length, t('simulations', 'محاكاة'))}${stat('sheet', FICHES.length, t('fiches résumés', 'ملخصا'))}${stat('sigma', nf, t('formules', 'علاقة'))}${stat('cap', 3, t('niveaux', 'مستويات'))}
      </section>

      <h2 class="sec" id="niveaux">${t('Choisis ton niveau', 'اختر مستواك')}</h2>
      <nav class="levels" role="tablist">${LEVELS.map(lv => `<button class="lvl tilt lv-${lv.id}" role="tab" data-lv="${lv.id}" aria-selected="${lv.id === level}">
        <span class="bub">${IC[lvInfo[lv.id][1]]}</span><b dir="ltr">${esc(lv.tag)}</b><span class="lvn">${esc(t(lv.fr, lv.ar))}</span>
        <span class="lvd">${lvInfo[lv.id][0]}</span><span class="pill">${lv.count} ${t('chapitres', 'درسا')} ${IC.arrow}</span></button>`).join('')}
        <button class="lvl tilt lv-fiche" type="button" id="gof2"><span class="bub">${IC.sheet}</span><b>${t('Fiches', 'ملخصات')}</b><span class="lvn">${t('Résumés de cours 2BAC', 'ملخصات الدروس 2 باك')}</span>
        <span class="lvd">${t('Toutes les fiches du professeur, à réviser et télécharger.', 'جميع ملخصات الأستاذ للمراجعة والتحميل.')}</span><span class="pill">${FICHES.length} ${t('fiches', 'ملخصا')} ${IC.arrow}</span></button></nav>

      <h2 class="sec">${t('Comment réviser un chapitre ?', 'كيف أراجع درسا ؟')}</h2>
      <ol class="journey">${journey.map((j, n) => `<li class="tilt"><span class="jn">${n + 1}</span><span class="bub">${IC[j[0]]}</span><b>${j[1]}</b><span>${j[2]}</span></li>`).join('')}</ol>

      <div id="shelves">${shelves()}</div>

      <section class="fiches" id="fiches">
        <h2 class="sec">${t('Fiches résumés — 2ᵉ Bac', 'ملخصات الدروس — الثانية باك')}</h2>
        <p class="hint">${t('Clique sur une fiche pour l’ouvrir avec son chapitre, ou l’agrandir et la télécharger.', 'اضغط على ملخص لفتحه مع درسه، أو لتكبيره وتحميله.')}</p>
        <div class="fgrid">${FICHES.map((f, n) => `<button class="fcard tilt" type="button" data-f="${n}"><img src="${f.mini}" alt="" loading="lazy" width="640" height="452"><span><small>Page ${f.n}</small>${esc(f.titre)}</span></button>`).join('')}</div>
      </section>`;
    $('#q').addEventListener('input', e => { query = e.target.value; $('#shelves').innerHTML = shelves(); });
    $('#go').addEventListener('click', () => $('#niveaux').scrollIntoView({ behavior: 'smooth', block: 'start' }));
    ['#gof', '#gof2'].forEach(s => $(s).addEventListener('click', () => $('#fiches').scrollIntoView({ behavior: 'smooth', block: 'start' })));
    document.querySelectorAll('.lvl[data-lv]').forEach(b => b.addEventListener('click', () => {
      level = b.dataset.lv; store.set('level', level); query = ''; $('#q').value = '';
      document.querySelectorAll('.lvl[data-lv]').forEach(x => x.setAttribute('aria-selected', x === b));
      $('#shelves').innerHTML = shelves();
      $('#shelves').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }));
    document.querySelectorAll('.fcard').forEach(b => b.addEventListener('click', () => {
      const f = FICHES[+b.dataset.f];
      if (f.ch.length) location.hash = '#/l/' + f.ch[0] + '/fiche'; else lightbox(f);
    }));
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

  /* ---------- chapitre ---------- */
  function lesson(l, tab) {
    const i = ALL.indexOf(l), prev = ALL[i - 1], next = ALL[i + 1], X = EXTRA[l.id], k = domKey(l.dom), sims = simsOf(l), keys = RESUME[l.id] || [], ser = seriesOf(l);
    const fic = FICHES.filter(f => f.ch.includes(l.id));
    const steps = X && X.cours && lang !== 'ar' ? X.cours : keys.map(mk);
    const stepSims = steps.map((s, n) => simForStep(l.id, n + 1, s, sims)), nExp = stepSims.filter(Boolean).length;
    const tabs = [['cours', t('Cours', 'الدرس'), 'book']]
      .concat([['fiche', t('Résumé', 'الملخص'), 'sheet']], [['form', t('Formules', 'العلاقات'), 'sigma'], ['sim', t('Simulation', 'المحاكاة'), 'sliders']],
        X ? [['quiz', t('Quiz & exercices', 'اختبار وتمارين'), 'check']] : [], [['series', t('Séries', 'السلاسل'), 'file']]);
    if (!tabs.some(x => x[0] === tab)) tab = 'cours';
    const nav = (x, dir) => x ? `<a class="pn ${dir}" href="#/l/${x.id}"><small>${dir === 'prev' ? t('Chapitre précédent', 'الدرس السابق') : t('Chapitre suivant', 'الدرس التالي')} · ${esc(x.lv.tag)}</small>${esc(t(x.fr, x.ar))}</a>` : '<span></span>';
    const nextBtn = id => { const n = tabs.findIndex(x => x[0] === id) + 1; return tabs[n] ? `<button class="nextp" type="button" data-to="${tabs[n][0]}">${t('Étape suivante', 'الخطوة التالية')} : ${tabs[n][1]} ${IC.arrow}</button>` : `<nav class="pnav">${nav(prev, 'prev')}${nav(next, 'next')}</nav>`; };
    const P = (id, body, attrs = '') => `<section class="panel" data-p="${id}" hidden ${attrs}>${body}${nextBtn(id)}</section>`;
    $('#app').innerHTML = `
      <article class="lesson k-${k}">
        <header class="lhead">
          <p class="crumb"><a href="#/">${t('Accueil', 'الرئيسية')}</a> › <span dir="ltr">${esc(l.lv.tag)}</span> › ${esc(t(l.dom.fr, l.dom.ar))}</p>
          <div class="lh-row"><span class="cube3d" aria-hidden="true"><span class="cb">${[1, 2, 3, 4, 5, 6].map(n => `<i class="f${n}">${IC[k]}</i>`).join('')}</span></span><div>
            <h1>${esc(t(l.fr, l.ar))}</h1>
            <p class="alt" dir="${lang === 'ar' ? 'ltr' : 'rtl'}">${esc(t(l.ar, l.fr))}</p></div></div>
          <div class="lchips"><span>${steps.length} ${t('étapes', 'خطوات')}</span>${nExp ? `<span>${nExp} ${t('expérience', 'تجربة')}${nExp > 1 && lang !== 'ar' ? 's' : ''} ${t('dans le cours', 'في الدرس')}</span>` : ''}<span>${t('Résumé PDF', 'ملخص PDF')}</span><span>${l.f.length} ${t('formules', 'علاقات')}</span><span>${sims.length} ${t('simulation', 'محاكاة')}${sims.length > 1 && lang !== 'ar' ? 's' : ''}</span>${X ? '<span>Quiz</span>' : ''}${EXOS[l.id] ? `<span>${t('Série corrigée', 'سلسلة مصححة')}</span>` : ''}</div>
        </header>

        <nav class="tabs3d" role="tablist">${tabs.map(x => `<button type="button" role="tab" data-t="${x[0]}">${IC[x[2]]}<span>${x[1]}</span></button>`).join('')}</nav>

        ${P('cours', `<div class="card">
          <div class="brief"><span class="bub">${IC.bulb}</span><div><b>${t('En bref', 'باختصار')}</b><p>${esc(t(l.exFr, l.exAr))}</p></div></div>
          ${steps.length ? `<h2 class="ptitle">${t('Le cours en', 'الدرس في')} ${steps.length} ${t('étapes', 'خطوات')}</h2>
          <ol class="tl" dir="ltr" lang="fr">${steps.map((s, n) => `<li><span class="tln"></span><div><div class="stx">${s}</div>${stepSims[n] ? `<button class="seeexp" type="button" data-sim="${stepSims[n]}">${IC.play}<span>${t('Voir l’expérience', 'شاهد التجربة')} : ${esc(simName(stepSims[n]))}</span></button><div class="stepsim sim" hidden></div>` : ''}</div></li>`).join('')}</ol>` : ''}
          ${(DETAILS[l.id] || []).length ? `<h2 class="ptitle">${t('Pour bien comprendre', 'لفهم أعمق')}</h2>
          ${DETAILS[l.id].map(d => `<details class="detail" open><summary>${esc(d.t)}</summary><div class="dbody" dir="ltr" lang="fr">${d.h}
            ${d.sim && SIMS[d.sim] ? `<button class="seeexp" type="button" data-sim="${d.sim}">${IC.play}<span>${t('Voir l’expérience', 'شاهد التجربة')} : ${esc(simName(d.sim))}</span></button><div class="stepsim sim" hidden></div>` : ''}</div></details>`).join('')}` : ''}</div>`)}

        ${P('fiche', `<div class="card"><h2 class="ptitle">${t('Résumé du cours', 'ملخص الدرس')}</h2>
          <div class="pdfs"><a class="pdfb" href="resumes/pdf/${l.id}.pdf" download>${IC.sheet}<span><b>${t('Résumé PDF', 'الملخص PDF')}</b><small>${t('une page, à imprimer', 'صفحة واحدة للطبع')}</small></span></a>
            <a class="pdfb cor" href="resumes/resume.html?c=${l.id}">${IC.book}<span><b>${t('Voir le résumé', 'شاهد الملخص')}</b><small>${t('en ligne', 'على الموقع')}</small></span></a></div></div>
        ${fic.length ? `<div class="card"><h2 class="ptitle">${t('Fiche résumé du professeur', 'ملخص الأستاذ')}</h2>
          <p class="hint">${t('Toute la leçon sur une page. Touche la fiche pour l’agrandir ou la télécharger.', 'الدرس كاملا في صفحة. المس الملخص لتكبيره أو تحميله.')}</p>
          ${fic.map((f, n) => `<figure class="fiche"><button type="button" class="fopen" data-f="${FICHES.indexOf(f)}"><img src="${f.src}" alt="${esc(f.titre)}" loading="lazy" width="2400" height="1697"></button>
            <figcaption><span>${esc(f.titre)}</span><a class="lb-btn" href="${f.src}" download>${t('Télécharger', 'تحميل')}</a></figcaption></figure>`).join('')}</div>` : ''}`)}

        ${P('form', `<div class="card"><h2 class="ptitle">${t('Formules essentielles', 'العلاقات الأساسية')}</h2>
          <div class="formulas">${l.f.map((x, n) => `<div class="fm"><div class="eq" dir="ltr" data-tex="${esc(X && X.tex[n] ? X.tex[n] : toTex(x[0]))}">${mk(x[0])}</div><div class="mean">${esc(t(x[1], x[2]))}</div></div>`).join('')}</div></div>`)}

        ${P('sim', `<div class="card"><h2 class="ptitle">${sims.length > 1 ? t('Simulations interactives', 'محاكاة تفاعلية') : t('Simulation interactive', 'محاكاة تفاعلية')}</h2>
          <p class="hint">${t('Déplace les curseurs et observe ce qui change.', 'غيّر المقادير ولاحظ ما يتغير.')}</p>
          ${sims.length > 1 ? `<div class="simtabs" role="tablist">${sims.map((n, j) => `<button type="button" role="tab" data-sim="${n}" aria-selected="${j === 0}">${esc(simName(n))}</button>`).join('')}</div>` : ''}
          <div id="sim" class="sim" dir="ltr"></div></div>`)}

        ${X ? P('quiz', `<div class="card" dir="ltr" lang="fr"><h2 class="ptitle">Expérience virtuelle — protocole</h2>
          <p class="exp-t">${esc(X.exp.titre)}</p>
          <p class="hint"><b>Matériel :</b> ${esc(X.exp.materiel)}</p>
          <ol class="steps">${X.exp.etapes.map(e => `<li>${e}</li>`).join('')}</ol></div>
        <div class="card" dir="ltr" lang="fr"><h2 class="ptitle">Mini-quiz</h2>
          <p class="hint">5 questions : choisis une réponse, la correction s’affiche tout de suite.</p>
          ${X.quiz.map((q, n) => `<div class="qz" data-r="${q.r}"><p><b>${n + 1}.</b> ${q.q}</p>
            <div class="opts">${q.o.map((o, j) => `<button type="button" data-j="${j}">${o}</button>`).join('')}</div>
            <p class="expl" hidden>${q.e}</p></div>`).join('')}
          <p class="score" id="score" aria-live="polite"></p></div>
        <div class="card" dir="ltr" lang="fr"><h2 class="ptitle">Exercices corrigés</h2>
          ${X.exos.map((e, n) => `<div class="exo"><p><b>Exercice ${n + 1}.</b> ${e.q}</p>
            <details><summary>Voir la correction</summary><div class="sol">${e.a}</div></details></div>`).join('')}</div>`) : ''}

        ${P('series', `<div class="card"><h2 class="ptitle">${t('Séries d’exercices', 'سلاسل التمارين')}</h2>
          ${EXOS[l.id] ? `<a class="bigserie" href="series/serie.html?c=${l.id}"><span class="bub">${IC.file}</span><span><b>${t('Série d’exercices corrigés', 'سلسلة تمارين مصححة')}</b>
            <small>${EXOS[l.id].length} ${t('exercices, du plus facile au plus difficile', 'تمارين، من الأسهل إلى الأصعب')}</small>
            <span class="stars"><i class="d1">★</i><i class="d2">★★</i><i class="d3">★★★</i></span></span>${IC.arrow}</a>
          <div class="pdfs"><a class="pdfb" href="series/pdf/${l.id}.pdf" download>${IC.file}<span><b>PDF ${t('énoncé', 'التمارين')}</b><small>${t('à imprimer', 'للطبع')}</small></span></a>
            <a class="pdfb cor" href="series/pdf/${l.id}-corrige.pdf" download>${IC.check}<span><b>PDF ${t('corrigé', 'مع التصحيح')}</b><small>${t('énoncé + corrections', 'التمارين + التصحيح')}</small></span></a></div>` : ''}
          ${ser.length ? `<div class="series">${ser.map(x => `<a class="serie" href="${esc(x[1])}" target="_blank" rel="noopener">${IC.file}<span>${esc(x[0])}</span>${IC.arrow}</a>`).join('')}</div>`
        : EXOS[l.id] ? '' : `<p class="noser">${IC.file}<span>${t('Les séries d’exercices de ce chapitre seront ajoutées ici par le professeur.', 'سلاسل تمارين هذا الدرس سيضيفها الأستاذ هنا.')}</span></p>`}
          ${X ? '' : `<p class="soon">${t('Expérience virtuelle et mini-quiz : bientôt disponibles pour ce chapitre.', 'التجربة الافتراضية والاختبار القصير : قريبا لهذا الدرس.')}</p>`}</div>`)}
      </article>`;
    level = l.lv.id; store.set('level', level);

    let simOn = '';
    function closeSteps() {
      document.querySelectorAll('.stepsim').forEach(c => { c.hidden = true; c.innerHTML = ''; });
      document.querySelectorAll('.seeexp').forEach(b => { b.classList.remove('open'); b.lastChild.textContent = t('Voir l’expérience', 'شاهد التجربة') + ' : ' + simName(b.dataset.sim); });
    }
    document.querySelectorAll('.seeexp').forEach(b => b.addEventListener('click', () => {
      const box = b.nextElementSibling, open = !box.hidden;
      if (stopSim) { stopSim(); stopSim = null; }
      closeSteps();
      if (open) return;
      box.hidden = false; b.classList.add('open'); b.lastChild.textContent = t('Fermer l’expérience', 'أغلق التجربة');
      mountSim(box, b.dataset.sim);
    }));
    function show(id, scroll) {
      if (stopSim) { stopSim(); stopSim = null; }
      closeSteps();
      document.querySelectorAll('.tabs3d button').forEach(b => b.setAttribute('aria-selected', b.dataset.t === id));
      document.querySelectorAll('.panel').forEach(p => { p.hidden = p.dataset.p !== id; });
      if (id === 'sim') { const cur = $('.simtabs [aria-selected="true"]'); simOn = cur ? cur.dataset.sim : sims[0]; mountSim($('#sim'), simOn); }
      typeset($(`.panel[data-p="${id}"]`));
      history.replaceState(null, '', '#/l/' + l.id + (id === 'cours' ? '' : '/' + id));
      const b = $(`.tabs3d [data-t="${id}"]`); if (b && b.scrollIntoView) b.scrollIntoView({ block: 'nearest', inline: 'center' });
      if (scroll) $('.tabs3d').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    document.querySelectorAll('.tabs3d button').forEach(b => b.addEventListener('click', () => show(b.dataset.t)));
    document.querySelectorAll('.nextp').forEach(b => b.addEventListener('click', () => show(b.dataset.to, true)));
    document.querySelectorAll('.simtabs button').forEach(b => b.addEventListener('click', () => {
      document.querySelectorAll('.simtabs button').forEach(x => x.setAttribute('aria-selected', x === b));
      if (stopSim) stopSim();
      mountSim($('#sim'), b.dataset.sim);
    }));
    document.querySelectorAll('.fopen').forEach(b => b.addEventListener('click', () => lightbox(FICHES[+b.dataset.f])));
    let good = 0, done = 0;
    document.querySelectorAll('.qz').forEach(qz => qz.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
      if (qz.dataset.done) return; qz.dataset.done = 1; done++;
      const ok = b.dataset.j === qz.dataset.r; if (ok) good++;
      b.classList.add(ok ? 'ok' : 'ko'); qz.querySelector(`button[data-j="${qz.dataset.r}"]`).classList.add('ok');
      qz.querySelectorAll('button').forEach(x => { x.disabled = true; });
      qz.querySelector('.expl').hidden = false;
      $('#score').textContent = 'Score : ' + good + ' / ' + done + (done === 5 ? (good === 5 ? ' — Excellent !' : good >= 3 ? ' — Bien, revois les questions manquées.' : ' — Relis le cours puis réessaie.') : '');
    })));
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
  function route() {
    if (stopSim) { stopSim(); stopSim = null; }
    document.documentElement.lang = lang; document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    $('#lang').textContent = lang === 'ar' ? 'Français' : 'العربية';
    if (theme) document.documentElement.dataset.theme = theme; else delete document.documentElement.dataset.theme;
    const dark = theme ? theme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    $('#theme').textContent = dark ? '☀' : '☾';
    $('#theme').setAttribute('aria-label', dark ? t('Mode clair', 'الوضع الفاتح') : t('Mode sombre', 'الوضع الداكن'));
    $('#insta').href = INSTAGRAM_URL; $('#insta-top').href = INSTAGRAM_URL;
    $('#foot').textContent = t('Zakaria Lazrak — Professeur de Physique-Chimie · Programme marocain (BIOF) : Tronc Commun, 1ʳᵉ Bac, 2ᵉ Bac', 'Zakaria Lazrak — أستاذ الفيزياء والكيمياء · المقرر المغربي : الجذع المشترك، الأولى باك، الثانية باك');
    if (window.MathJax && MathJax.typesetClear) MathJax.typesetClear();
    const m = location.hash.match(/^#\/l\/([\w-]+)(?:\/(\w+))?/), l = m && ALL.find(x => x.id === m[1]);
    if (l) { lesson(l, m[2]); document.title = t(l.fr, l.ar) + ' — ' + t('Bibliothèque de Physique-Chimie', 'مكتبة الفيزياء والكيمياء'); window.scrollTo(0, 0); }
    else { home(); document.title = t('Bibliothèque de Physique-Chimie | Zakaria Lazrak', 'مكتبة الفيزياء والكيمياء | Zakaria Lazrak'); }
  }
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
