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
  const mk = s => esc(s)
    .replace(/_\{([^}]*)\}/g, '<sub>$1</sub>').replace(/\^\{([^}]*)\}/g, '<sup>$1</sup>')
    .replace(/_([A-Za-z0-9ΔℓΩ])/g, '<sub>$1</sub>').replace(/\^([A-Za-z0-9])/g, '<sup>$1</sup>');

  // conversion mini-notation → LaTeX (pour MathJax)
  function toTex(s) {
    s = s.replace(/[A-Za-zÀ-ÿ]{3,}|\b(et|si|eV|Pa|Hz|km|Bq)\b/g, (w, _, i, str) => /^(sin|cos|tan|ln)$/.test(w) ? '\\' + w : (str[i - 1] === '{' ? '' : '\\,') + '\\text{' + w + '}' + (str[i + w.length] === ' ' && str[i - 1] !== '{' ? '\\ ' : ''))
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

  /* ---------- bibliothèque ---------- */
  function bookCard(l, showLevel) {
    return `<a class="book" href="#/l/${l.id}">
      <span class="num">${showLevel ? esc(l.lv.tag) + ' · ' : ''}${String(l.num).padStart(2, '0')}</span>
      <span class="ttl">${esc(t(l.fr, l.ar))}</span>
      <span class="sub" dir="${lang === 'ar' ? 'ltr' : 'rtl'}">${esc(t(l.ar, l.fr))}</span>
      <span class="chips"><i>${t('Explication', 'شرح')}</i><i>${t('Simulation', 'محاكاة')}</i><i>${l.f.length} ${t('relations', 'علاقات')}</i>${EXTRA[l.id] ? `<i class="full">${t('Exercices corrigés', 'تمارين مصححة')}</i>` : ''}</span>
    </a>`;
  }

  function shelves() {
    const q = query.trim().toLowerCase();
    if (q) {
      const hits = ALL.filter(l => (l.fr + ' ' + l.ar + ' ' + l.exFr + ' ' + l.exAr + ' ' + l.f.map(x => x[1] + ' ' + x[2]).join(' ')).toLowerCase().includes(q));
      return `<section class="shelf"><h2>${t('Résultats', 'نتائج البحث')} <small>${hits.length}</small></h2>
        ${hits.length ? `<div class="books">${hits.map(l => bookCard(l, true)).join('')}</div>` : `<p class="empty">${t('Aucune leçon trouvée.', 'لم يتم العثور على أي درس.')}</p>`}</section>`;
    }
    const lv = LEVELS.find(x => x.id === level) || LEVELS[0];
    return lv.domains.map(d => `<section class="shelf"><h2>${esc(t(d.fr, d.ar))} <small>${d.lessons.length}</small></h2>
      <div class="books">${d.lessons.map(l => bookCard(l)).join('')}</div></section>`).join('');
  }

  function home() {
    $('#app').innerHTML = `
      <section class="hero">
        <img src="assets/logo.jpg" alt="Zakaria Lazrak — Physique &amp; Chimie" width="150" height="150">
        <div>
          <h1>${t('Bibliothèque de Physique', 'مكتبة الفيزياء')}</h1>
          <p>${t('Toutes les leçons en un seul endroit : une explication courte, une expérience en simulation et le résumé des relations.',
      'جميع الدروس في مكان واحد : شرح قصير، تجربة بالمحاكاة وملخص العلاقات لكل درس.')}</p>
          <input id="q" type="search" value="${esc(query)}" placeholder="${t('Chercher une leçon ou une relation…', 'ابحث عن درس أو علاقة…')}" aria-label="${t('Recherche', 'بحث')}">
        </div>
      </section>
      <nav class="tabs" role="tablist">${LEVELS.map(lv => `<button role="tab" data-lv="${lv.id}" aria-selected="${lv.id === level}">
        <b dir="ltr">${esc(lv.tag)}</b><span>${esc(t(lv.fr, lv.ar))}</span><small>${lv.count} ${t('leçons', 'درسا')}</small></button>`).join('')}</nav>
      <div id="shelves">${shelves()}</div>`;
    $('#q').addEventListener('input', e => { query = e.target.value; $('#shelves').innerHTML = shelves(); });
    document.querySelectorAll('.tabs button').forEach(b => b.addEventListener('click', () => {
      level = b.dataset.lv; store.set('level', level); query = ''; home();
    }));
  }

  /* ---------- leçon ---------- */
  function lesson(l) {
    const i = ALL.indexOf(l), prev = ALL[i - 1], next = ALL[i + 1], X = EXTRA[l.id];
    const nav = (x, dir) => x ? `<a class="pn ${dir}" href="#/l/${x.id}"><small>${dir === 'prev' ? t('Précédent', 'السابق') : t('Suivant', 'التالي')} · ${esc(x.lv.tag)}</small>${esc(t(x.fr, x.ar))}</a>` : '<span></span>';
    $('#app').innerHTML = `
      <article class="lesson">
        <p class="crumb"><a href="#/">${t('Bibliothèque', 'المكتبة')}</a> › <span dir="ltr">${esc(l.lv.tag)}</span> › ${esc(t(l.dom.fr, l.dom.ar))}</p>
        <h1>${esc(t(l.fr, l.ar))}</h1>
        <p class="alt" dir="${lang === 'ar' ? 'ltr' : 'rtl'}">${esc(t(l.ar, l.fr))}</p>

        <section class="card"><h2><span>1</span>${t('L’essentiel du cours', 'شرح مختصر')}</h2>
          <p class="ex">${esc(t(l.exFr, l.exAr))}</p></section>

        <section class="card"><h2><span>2</span>${t('Formules et relations essentielles', 'ملخص العلاقات')}</h2>
          <div class="formulas">${l.f.map((x, k) => `<div class="fm"><div class="eq" dir="ltr" data-tex="${esc(X && X.tex[k] ? X.tex[k] : toTex(x[0]))}">${mk(x[0])}</div><div class="mean">${esc(t(x[1], x[2]))}</div></div>`).join('')}</div></section>

        <section class="card"><h2><span>3</span>${t('Simulation interactive', 'محاكاة تفاعلية')}</h2>
          <p class="hint">${t('Déplacez les curseurs et observez le résultat.', 'غيّر المقادير ولاحظ النتيجة.')}</p>
          <div id="sim" class="sim" dir="ltr"></div></section>

        ${X ? `<section class="card" dir="ltr" lang="fr"><h2><span>4</span>Expérience, étape par étape</h2>
          <p class="exp-t">${esc(X.exp.titre)}</p>
          <p class="hint"><b>Matériel :</b> ${esc(X.exp.materiel)}</p>
          <ol class="steps">${X.exp.etapes.map(e => `<li>${e}</li>`).join('')}</ol></section>

        <section class="card" dir="ltr" lang="fr"><h2><span>5</span>Exercices corrigés</h2>
          ${X.exos.map((e, k) => `<div class="exo"><p><b>Exercice ${k + 1}.</b> ${e.q}</p>
            <details><summary>Voir la correction</summary><div class="sol">${e.a}</div></details></div>`).join('')}</section>`
        : `<p class="soon">${t('Expérience détaillée et exercices corrigés : bientôt disponibles pour ce chapitre.', 'التجربة المفصلة والتمارين المصححة : قريبا لهذا الدرس.')}</p>`}

        <nav class="pnav">${nav(prev, 'prev')}${nav(next, 'next')}</nav>
      </article>`;
    level = l.lv.id; store.set('level', level);
    mountSim($('#sim'), l.sim);
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
    $('#insta').href = INSTAGRAM_URL;
    $('#foot').textContent = t('Zakaria Lazrak — Professeur de Physique-Chimie · Programme marocain : Tronc Commun, 1ʳᵉ Bac, 2ᵉ Bac', 'Zakaria Lazrak — أستاذ الفيزياء والكيمياء · المقرر المغربي : الجذع المشترك، الأولى باك، الثانية باك');
    const m = location.hash.match(/^#\/l\/([\w-]+)/), l = m && ALL.find(x => x.id === m[1]);
    if (l) { lesson(l); document.title = t(l.fr, l.ar) + ' — ' + t('Bibliothèque de Physique', 'مكتبة الفيزياء'); window.scrollTo(0, 0); }
    else { home(); document.title = t('Bibliothèque de Physique | Zakaria Lazrak', 'مكتبة الفيزياء | Zakaria Lazrak'); }
  }
  $('#lang').addEventListener('click', () => { lang = lang === 'ar' ? 'fr' : 'ar'; store.set('lang', lang); route(); });
  $('#theme').addEventListener('click', () => {
    const dark = theme ? theme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    theme = dark ? 'light' : 'dark'; store.set('theme', theme); route();
  });
  window.addEventListener('hashchange', route);
  route();
})();
