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
  const esc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
  // mini-notation : x_{ab} / x_a → indice ; x^{ab} / x^a → exposant
  const mk = s => esc(s.replace(/^§/, ''))
    .replace(/_\{([^}]*)\}/g, '<sub>$1</sub>').replace(/\^\{([^}]*)\}/g, '<sup>$1</sup>')
    .replace(/_([A-Za-z0-9ΔℓΩ])/g, '<sub>$1</sub>').replace(/\^([A-Za-z0-9])/g, '<sup>$1</sup>');

  // conversion mini-notation → LaTeX (pour MathJax)
  function toTex(s) {
    if (s[0] === '§') return '\\mathrm{' + s.slice(1).replace(/([_^])([A-Za-z0-9+-])/g, '$1{$2}').replace(/−/g, '{-}').replace(/′/g, "'")
      .replace(/ \+ /g, ' + ').replace(/ ; /g, '\\quad;\\quad ').replace(/ \/ /g, '\\,/\\,').replace(/ \|\| /g, '\\;\\|\\;').replace(/ \| /g, '\\;|\\;').replace(/ /g, '\\ ')
      .replace(/→/g, '\\longrightarrow{}').replace(/⇌/g, '\\rightleftharpoons{}') + '}';
    s = s.replace(/[A-Za-zÀ-ÿ]{3,}|\b(et|si|eV|Pa|Hz|km|Bq|pH|pK|ou|mol)\b/g, (w, _, i, str) => /^(sin|cos|tan|ln|log|min)$/.test(w) ? '\\' + w : (str[i - 1] === '{' ? '' : '\\,') + '\\text{' + w + '}' + (str[i + w.length] === ' ' && str[i + w.length + 1] !== ' ' && str[i - 1] !== '{' ? '~' : ''))
      .replace(/θ̈/g, '\\ddot{θ}').replace(/θ̇/g, '\\dot{θ}');
    for (let i; (i = s.indexOf('√(')) >= 0;) {
      let d = 0, j = i + 1;
      for (; j < s.length; j++) { if (s[j] === '(') d++; else if (s[j] === ')' && --d === 0) break; }
      s = s.slice(0, i) + '\\sqrt{' + s.slice(i + 2, j) + '}' + s.slice(j + 1);
    }
    return s.replace(/√(\w+)/g, '\\sqrt{$1}')
      .replace(/(\d),(\d)/g, '$1{,}$2').replace(/(\d) (\d{3})/g, '$1\\,$2')
      .replace(/·/g, '\\cdot ').replace(/×/g, '\\times ').replace(/½/g, '\\tfrac{1}{2}').replace(/′/g, "'")
      .replace(/ℓ/g, '\\ell{}').replace(/ℰ/g, '\\mathcal{E}').replace(/−/g, '-').replace(/%/g, '\\%')
      .replace(/ {2,}/g, '\\quad ').replace(/ ; /g, '\;;\\quad ');
  }
  function typeset() {
    if (!(window.MathJax && MathJax.typesetPromise)) return;
    document.querySelectorAll('[data-tex]').forEach(el => { el.textContent = '\\(' + el.dataset.tex + '\\)'; el.removeAttribute('data-tex'); el.classList.add('mj'); });
    MathJax.typesetClear && MathJax.typesetClear();
    MathJax.typesetPromise([$('#app')]).catch(e => console.error(e));
  }
  window.__typeset = typeset;

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

  function home() {
    const feats = [
      ['book', t('Cours résumé', 'ملخص الدرس'), t('L’essentiel de chaque chapitre, point par point.', 'أهم ما في كل درس، نقطة بنقطة.')],
      ['sigma', t('Formules', 'العلاقات'), t('Toutes les relations à connaître, bien présentées.', 'جميع العلاقات التي يجب معرفتها.')],
      ['sliders', t('Simulations', 'المحاكاة'), t('Change les grandeurs et observe l’expérience.', 'غيّر المقادير ولاحظ التجربة.')],
      ['check', t('Quiz corrigés', 'اختبارات مصححة'), t('Teste-toi et vois la correction tout de suite.', 'اختبر نفسك وشاهد التصحيح فورا.')],
    ];
    $('#app').innerHTML = `
      <section class="hero">
        <div>
          <p class="who" dir="ltr">Zakaria Lazrak — Professeur de Physique-Chimie</p>
          <h1>${t('Bibliothèque de Physique-Chimie', 'مكتبة الفيزياء والكيمياء')}</h1>
          <p class="lead">${t('Tout le programme du Tronc Commun au Bac : le cours résumé, les formules, des simulations pour expérimenter et des quiz pour s’entraîner.',
      'المقرر كاملا من الجذع المشترك إلى الباكالوريا : ملخص الدرس، العلاقات، محاكاة للتجريب واختبارات للتمرن.')}</p>
          <label class="search">${IC.search}<input id="q" type="search" value="${esc(query)}" placeholder="${t('Chercher un chapitre, une notion, une formule…', 'ابحث عن درس أو مفهوم أو علاقة…')}" aria-label="${t('Recherche', 'بحث')}"></label>
          <div class="hero-cta">
            <button class="cta" id="go" type="button">${t('Voir les chapitres', 'تصفح الدروس')} ${IC.arrow}</button>
            <span class="stats">${ALL.length} ${t('chapitres', 'درسا')} · ${Object.keys(SIMS).length} ${t('simulations', 'محاكاة')}</span>
          </div>
        </div>
        <div class="hero-art"><img src="assets/logo.jpg" alt="Zakaria Lazrak — Physique &amp; Chimie" width="250" height="250"></div>
      </section>
      <section class="feats">${feats.map(f => `<div class="feat"><i>${IC[f[0]]}</i><b>${f[1]}</b><span>${f[2]}</span></div>`).join('')}</section>
      <h2 class="sec" id="niveaux">${t('Choisis ton niveau', 'اختر مستواك')}</h2>
      <nav class="levels" role="tablist">${LEVELS.map(lv => `<button class="lvl lv-${lv.id}" role="tab" data-lv="${lv.id}" aria-selected="${lv.id === level}">
        <b dir="ltr">${esc(lv.tag)}</b><span>${esc(t(lv.fr, lv.ar))}</span><small>${lv.count} ${t('chapitres', 'درسا')}</small></button>`).join('')}</nav>
      <div id="shelves">${shelves()}</div>`;
    $('#q').addEventListener('input', e => { query = e.target.value; $('#shelves').innerHTML = shelves(); });
    $('#go').addEventListener('click', () => $('#niveaux').scrollIntoView({ behavior: 'smooth', block: 'start' }));
    document.querySelectorAll('.lvl').forEach(b => b.addEventListener('click', () => {
      level = b.dataset.lv; store.set('level', level); query = ''; $('#q').value = '';
      document.querySelectorAll('.lvl').forEach(x => x.setAttribute('aria-selected', x === b));
      $('#shelves').innerHTML = shelves();
    }));
  }

  /* ---------- chapitre ---------- */
  function lesson(l) {
    const i = ALL.indexOf(l), prev = ALL[i - 1], next = ALL[i + 1], X = EXTRA[l.id], k = domKey(l.dom), sims = simsOf(l), keys = RESUME[l.id] || [], ser = seriesOf(l);
    const nav = (x, dir) => x ? `<a class="pn ${dir}" href="#/l/${x.id}"><small>${dir === 'prev' ? t('Précédent', 'السابق') : t('Suivant', 'التالي')} · ${esc(x.lv.tag)}</small>${esc(t(x.fr, x.ar))}</a>` : '<span></span>';
    const steps = X && X.cours && lang !== 'ar';
    const jump = [['s-cours', t('Cours', 'الدرس')], ['s-form', t('Formules', 'العلاقات')], ['s-sim', t('Simulations', 'المحاكاة')]]
      .concat(X ? [['s-exp', 'Expérience'], ['s-quiz', 'Quiz'], ['s-exo', 'Exercices']] : [], [['s-series', t('Séries', 'السلاسل')]]);
    $('#app').innerHTML = `
      <article class="lesson k-${k}">
        <header class="lhead">
          <p class="crumb"><a href="#/">${t('Bibliothèque', 'المكتبة')}</a> › <span dir="ltr">${esc(l.lv.tag)}</span> › ${esc(t(l.dom.fr, l.dom.ar))}</p>
          <div class="lh-row"><span class="bic">${IC[k]}</span><div>
            <h1>${esc(t(l.fr, l.ar))}</h1>
            <p class="alt" dir="${lang === 'ar' ? 'ltr' : 'rtl'}">${esc(t(l.ar, l.fr))}</p></div></div>
          <nav class="jump" aria-label="${t('Sections', 'الأقسام')}">${jump.map(j => `<button type="button" data-go="${j[0]}">${j[1]}</button>`).join('')}</nav>
        </header>

        <section class="card" id="s-cours"><h2><span>1</span>${t('Résumé du cours', 'ملخص الدرس')}</h2>
          <p class="ex">${esc(t(l.exFr, l.exAr))}</p>
          ${steps ? `<h3>Étape par étape</h3><ol class="steps cours">${X.cours.map(e => `<li>${e}</li>`).join('')}</ol>` : ''}
          ${keys.length ? `<h3>${t('À retenir', 'يجب أن أتذكر')}</h3><ul class="keys" dir="ltr" lang="fr">${keys.map(e => `<li>${mk(e)}</li>`).join('')}</ul>` : ''}</section>

        <section class="card" id="s-form"><h2><span>2</span>${t('Formules essentielles', 'العلاقات الأساسية')}</h2>
          <div class="formulas">${l.f.map((x, n) => `<div class="fm"><div class="eq" dir="ltr" data-tex="${esc(X && X.tex[n] ? X.tex[n] : toTex(x[0]))}">${mk(x[0])}</div><div class="mean">${esc(t(x[1], x[2]))}</div></div>`).join('')}</div></section>

        <section class="card" id="s-sim"><h2><span>3</span>${sims.length > 1 ? t('Simulations interactives', 'محاكاة تفاعلية') + ' (' + sims.length + ')' : t('Simulation interactive', 'محاكاة تفاعلية')}</h2>
          <p class="hint">${t('Déplace les curseurs et observe le résultat.', 'غيّر المقادير ولاحظ النتيجة.')}</p>
          ${sims.length > 1 ? `<div class="simtabs" role="tablist">${sims.map((n, j) => `<button type="button" role="tab" data-sim="${n}" aria-selected="${j === 0}">${esc(simName(n))}</button>`).join('')}</div>` : ''}
          <div id="sim" class="sim" dir="ltr"></div></section>

        ${X ? `<section class="card" id="s-exp" dir="ltr" lang="fr"><h2><span>4</span>Expérience virtuelle — protocole</h2>
          <p class="exp-t">${esc(X.exp.titre)}</p>
          <p class="hint"><b>Matériel :</b> ${esc(X.exp.materiel)}</p>
          <ol class="steps">${X.exp.etapes.map(e => `<li>${e}</li>`).join('')}</ol></section>

        <section class="card" id="s-quiz" dir="ltr" lang="fr"><h2><span>5</span>Mini-quiz</h2>
          <p class="hint">5 questions : choisis une réponse, la correction s’affiche tout de suite.</p>
          ${X.quiz.map((q, n) => `<div class="qz" data-r="${q.r}"><p><b>${n + 1}.</b> ${q.q}</p>
            <div class="opts">${q.o.map((o, j) => `<button type="button" data-j="${j}">${o}</button>`).join('')}</div>
            <p class="expl" hidden>${q.e}</p></div>`).join('')}
          <p class="score" id="score" aria-live="polite"></p></section>

        <section class="card" id="s-exo" dir="ltr" lang="fr"><h2><span>6</span>Exercices corrigés</h2>
          ${X.exos.map((e, n) => `<div class="exo"><p><b>Exercice ${n + 1}.</b> ${e.q}</p>
            <details><summary>Voir la correction</summary><div class="sol">${e.a}</div></details></div>`).join('')}</section>`
        : `<p class="soon">${t('Expérience virtuelle et mini-quiz : bientôt disponibles pour ce chapitre.', 'التجربة الافتراضية والاختبار القصير : قريبا لهذا الدرس.')}</p>`}

        <section class="card" id="s-series"><h2><span>${X ? 7 : 4}</span>${t('Séries d’exercices', 'سلاسل التمارين')}</h2>
          ${ser.length ? `<div class="series">${ser.map(x => `<a class="serie" href="${esc(x[1])}" target="_blank" rel="noopener">${IC.file}<span>${esc(x[0])}</span>${IC.arrow}</a>`).join('')}</div>`
        : `<p class="noser">${IC.file}<span>${t('Les séries d’exercices de ce chapitre seront ajoutées ici par le professeur.', 'سلاسل تمارين هذا الدرس سيضيفها الأستاذ هنا.')}</span></p>`}</section>

        <nav class="pnav">${nav(prev, 'prev')}${nav(next, 'next')}</nav>
      </article>`;
    level = l.lv.id; store.set('level', level);
    mountSim($('#sim'), sims[0]);
    document.querySelectorAll('.simtabs button').forEach(b => b.addEventListener('click', () => {
      document.querySelectorAll('.simtabs button').forEach(x => x.setAttribute('aria-selected', x === b));
      if (stopSim) stopSim();
      mountSim($('#sim'), b.dataset.sim);
    }));
    document.querySelectorAll('.jump button').forEach(b => b.addEventListener('click', () => document.getElementById(b.dataset.go).scrollIntoView({ behavior: 'smooth', block: 'start' })));
    let good = 0, done = 0;
    document.querySelectorAll('.qz').forEach(qz => qz.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
      if (qz.dataset.done) return; qz.dataset.done = 1; done++;
      const ok = b.dataset.j === qz.dataset.r; if (ok) good++;
      b.classList.add(ok ? 'ok' : 'ko'); qz.querySelector(`button[data-j="${qz.dataset.r}"]`).classList.add('ok');
      qz.querySelectorAll('button').forEach(x => { x.disabled = true; });
      qz.querySelector('.expl').hidden = false;
      $('#score').textContent = 'Score : ' + good + ' / ' + done + (done === 5 ? (good === 5 ? ' — Excellent !' : good >= 3 ? ' — Bien, revois les questions manquées.' : ' — Relis le cours puis réessaie.') : '');
    })));
    typeset();
  }

  /* ---------- simulation ---------- */
  function mountSim(host, name) {
    const sim = SIMS[name];
    if (!sim) { host.textContent = '—'; return; }
    SIM_LANG = lang;
    const W = 640, H = 360, v = {};
    const lab = x => Array.isArray(x) ? x[lang === 'ar' ? 1 : 0] : x;
    host.innerHTML = `<div class="stage"><canvas width="${W}" height="${H}"></canvas>${sim.anim ? `<button class="replay" type="button">↻ ${t('Rejouer', 'إعادة')}</button>` : ''}</div>
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
    let t0 = performance.now(), raf = 0, alive = true, lastOut = '';

    function colors() {
      const cs = getComputedStyle(document.documentElement), g = k => cs.getPropertyValue(k).trim();
      return { ink: g('--ink'), mute: g('--mute'), grid: g('--grid'), bg: g('--card'), a: g('--s-a'), b: g('--s-b'), c: g('--s-c'), d: g('--s-d'), e: g('--s-e') };
    }
    function frame() {
      if (!alive) return;
      const c = makeG(ctx, W, H, colors());
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.direction = 'ltr';
      ctx.clearRect(0, 0, W, H); ctx.setLineDash([]); ctx.globalAlpha = 1;
      let res;
      try { res = sim.draw(c, v, (performance.now() - t0) / 1000) || []; }
      catch (e) { res = ['⚠ ' + e.message]; console.error(e); }
      const html = res.map(r => `<li>${mk(r)}</li>`).join('');
      if (html !== lastOut) { out.innerHTML = html; lastOut = html; }
      if (sim.anim) raf = requestAnimationFrame(frame);
    }
    function fmtVal(x) { return String(+(+x).toFixed(4)).replace('.', ','); }
    host.addEventListener('input', e => {
      const id = e.target.dataset.id; if (!id) return;
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
    const m = location.hash.match(/^#\/l\/([\w-]+)/), l = m && ALL.find(x => x.id === m[1]);
    if (l) { lesson(l); document.title = t(l.fr, l.ar) + ' — ' + t('Bibliothèque de Physique-Chimie', 'مكتبة الفيزياء والكيمياء'); window.scrollTo(0, 0); }
    else { home(); document.title = t('Bibliothèque de Physique-Chimie | Zakaria Lazrak', 'مكتبة الفيزياء والكيمياء | Zakaria Lazrak'); }
  }
  $('#lang').addEventListener('click', () => { lang = lang === 'ar' ? 'fr' : 'ar'; store.set('lang', lang); route(); });
  $('#theme').addEventListener('click', () => {
    const dark = theme ? theme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    theme = dark ? 'light' : 'dark'; store.set('theme', theme); route();
  });
  window.addEventListener('hashchange', route);
  route();
})();
