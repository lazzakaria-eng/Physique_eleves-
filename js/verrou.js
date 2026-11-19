/* Verrou du professeur : les jeux, les expériences et les corrections des séries demandent un code.
   Le code n’est pas écrit ici : seule son empreinte (EMP) est stockée.
   POUR CHANGER LE CODE : ouvrir la console du navigateur sur le site et taper  VERROU.empreinte('nouveau code'),
   puis remplacer la valeur de EMP ci-dessous par le résultat.
   Une fois le code saisi, tout reste ouvert jusqu’à la fermeture de l’onglet (ou le bouton 🔒).
   ATTENTION : c’est un verrou de classe, pas une protection forte (le site est public et statique). */
'use strict';
window.VERROU = (() => {
  const EMP = 'n45hrcj8vf', KEY = 'pc-verrou';
  const hash = (str, seed = 0) => { // cyrb53
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) { ch = str.charCodeAt(i); h1 = Math.imul(h1 ^ ch, 2654435761); h2 = Math.imul(h2 ^ ch, 1597334677); }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
  };
  const empreinte = code => hash('pc-lazrak|' + String(code).trim());
  let mem = false;
  const ok = () => { if (mem) return true; try { return sessionStorage.getItem(KEY) === EMP; } catch (e) { return false; } };
  const set = v => { mem = v; try { if (v) sessionStorage.setItem(KEY, EMP); else sessionStorage.removeItem(KEY); } catch (e) { /* stockage indisponible */ } document.dispatchEvent(new CustomEvent('verrou', { detail: v })); };
  const ar = () => document.documentElement.lang === 'ar';
  const T = (fr, a) => ar() ? a : fr;

  const CSS = `.vr-back{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;background:rgba(15,23,42,.55);backdrop-filter:blur(6px);padding:16px}
  .vr-box,.vr-page{background:#fff;color:#0f172a;border-radius:24px;box-shadow:0 30px 80px rgba(0,0,0,.35);padding:28px;width:min(420px,100%);text-align:center;font-family:inherit}
  .vr-page{margin:40px auto;box-shadow:0 20px 50px rgba(15,23,42,.15)}
  .vr-ic{font-size:46px;line-height:1}.vr-box h2,.vr-page h2{margin:10px 0 4px;font-size:1.35rem}.vr-box p,.vr-page p{margin:0 0 14px;color:#475569;font-size:.95rem}
  .vr-dots{display:flex;justify-content:center;gap:12px;margin:8px 0 16px}.vr-dots i{width:18px;height:18px;border-radius:50%;border:2px solid #94a3b8}.vr-dots i.on{background:#0f766e;border-color:#0f766e}
  .vr-keys{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.vr-keys button{font:inherit;font-size:1.6rem;font-weight:700;padding:14px 0;border-radius:16px;border:0;background:#f1f5f9;color:#0f172a;cursor:pointer;touch-action:manipulation}
  .vr-keys button:active{transform:scale(.96)}.vr-keys .vr-ok{background:#0f766e;color:#fff}.vr-keys .vr-del{background:#e2e8f0}
  .vr-err{color:#dc2626!important;font-weight:700;min-height:1.3em}.vr-shake{animation:vrs .4s}@keyframes vrs{20%,60%{transform:translateX(-10px)}40%,80%{transform:translateX(10px)}}
  .vr-cancel{margin-top:14px;font:inherit;background:none;border:0;color:#475569;text-decoration:underline;cursor:pointer}
  @media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .vr-box,:root:not([data-theme="light"]) .vr-page{background:#1e293b;color:#f1f5f9}:root:not([data-theme="light"]) .vr-keys button{background:#334155;color:#f1f5f9}}
  :root[data-theme="dark"] .vr-box,:root[data-theme="dark"] .vr-page{background:#1e293b;color:#f1f5f9}:root[data-theme="dark"] .vr-keys button{background:#334155;color:#f1f5f9}`;
  const style = () => { if (!document.getElementById('vr-css')) { const s = document.createElement('style'); s.id = 'vr-css'; s.textContent = CSS; document.head.appendChild(s); } };

  // pavé numérique (adapté au tableau interactif) ; inline = dans la page au lieu d’une fenêtre
  function pad(host, what, onOk, onCancel, inline) {
    style(); let val = '';
    host.innerHTML = `<div class="${inline ? 'vr-page' : 'vr-box'}" role="dialog" aria-modal="true"><div class="vr-ic">🔒</div>
      <h2>${T('Accès réservé', 'دخول محفوظ')}</h2><p>${what || T('Entrez le code donné par le professeur.', 'أدخل الرمز الذي يعطيه الأستاذ.')}</p>
      <div class="vr-dots">${'<i></i>'.repeat(4)}</div><p class="vr-err" aria-live="polite"></p>
      <input class="vr-in" type="password" inputmode="numeric" autocomplete="off" aria-label="Code" style="position:absolute;opacity:0;width:1px;height:1px">
      <div class="vr-keys">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => `<button type="button" data-k="${n}">${n}</button>`).join('')}<button type="button" class="vr-del" data-k="del">⌫</button><button type="button" data-k="0">0</button><button type="button" class="vr-ok" data-k="ok">✔</button></div>
      ${onCancel ? `<button type="button" class="vr-cancel">${T('Annuler', 'إلغاء')}</button>` : ''}</div>`;
    const box = host.firstElementChild, dots = box.querySelectorAll('.vr-dots i'), err = box.querySelector('.vr-err'), inp = box.querySelector('.vr-in');
    const paint = () => { const n = Math.max(4, val.length); if (dots.length !== n) box.querySelector('.vr-dots').innerHTML = '<i></i>'.repeat(n); box.querySelectorAll('.vr-dots i').forEach((d, i) => d.classList.toggle('on', i < val.length)); };
    const tryIt = () => {
      if (empreinte(val) === EMP) { set(true); onOk(); return; }
      err.textContent = T('Code incorrect', 'رمز خاطئ'); box.classList.remove('vr-shake'); void box.offsetWidth; box.classList.add('vr-shake'); val = ''; paint();
    };
    const key = k => { err.textContent = ''; if (k === 'del') val = val.slice(0, -1); else if (k === 'ok') return tryIt(); else if (val.length < 8) { val += k; if (val.length >= 4 && empreinte(val) === EMP) return tryIt(); } paint(); };
    box.querySelectorAll('.vr-keys button').forEach(b => b.addEventListener('click', () => key(b.dataset.k)));
    const kb = e => { if (!host.isConnected) return document.removeEventListener('keydown', kb); if (/^[0-9]$/.test(e.key)) key(e.key); else if (e.key === 'Backspace') key('del'); else if (e.key === 'Enter') key('ok'); else if (e.key === 'Escape' && onCancel) onCancel(); };
    document.addEventListener('keydown', kb);
    const c = box.querySelector('.vr-cancel'); if (c) c.addEventListener('click', () => { document.removeEventListener('keydown', kb); onCancel(); });
    if (!('ontouchstart' in window)) try { inp.focus({ preventScroll: true }); } catch (e) { /* rien */ }
    return () => document.removeEventListener('keydown', kb);
  }

  // demande le code dans une fenêtre ; ok → onOk()
  function ask(onOk, onCancel, what) {
    if (ok()) { onOk(); return; }
    const back = document.createElement('div'); back.className = 'vr-back'; document.body.appendChild(back);
    let off = () => {};
    const close = () => { off(); back.remove(); };
    off = pad(back, what, () => { close(); onOk(); }, () => { close(); if (onCancel) onCancel(); });
    back.addEventListener('click', e => { if (e.target === back) { close(); if (onCancel) onCancel(); } });
  }
  // page entière verrouillée (ex. Espace Jeux)
  function page(host, onOk, what) { pad(host, what, onOk, null, true); }

  return { ok, ask, page, lock: () => set(false), empreinte };
})();
