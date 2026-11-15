/* Outils partagés : échappement HTML, mini-notation (indices/exposants) et conversion en LaTeX pour MathJax */
'use strict';
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
  s = s.replace(/[A-Za-zÀ-ÿ]{3,}|\b(et|si|eV|Pa|Hz|km|Bq|pH|pK|ou|mol|ln)\b/g, (w, _, i, str) => /^(sin|cos|tan|ln|log|min)$/.test(w) ? '\\' + w : (str[i - 1] === '{' ? '' : '\\,') + '\\text{' + w + '}' + (str[i + w.length] === ' ' && str[i + w.length + 1] !== ' ' && str[i - 1] !== '{' ? '~' : ''))
    .replace(/θ̈/g, '\\ddot{θ}').replace(/θ̇/g, '\\dot{θ}');
  for (let i; (i = s.indexOf('√(')) >= 0;) {
    let d = 0, j = i + 1;
    for (; j < s.length; j++) { if (s[j] === '(') d++; else if (s[j] === ')' && --d === 0) break; }
    s = s.slice(0, i) + '\\sqrt{' + s.slice(i + 2, j) + '}' + s.slice(j + 1);
  }
  s = s.replace(/√(\w+)/g, '\\sqrt{$1}');
  s = fracify(s);
  return s
    .replace(/(\d),(\d)/g, '$1{,}$2').replace(/(\d) (\d{3})/g, '$1\\,$2')
    .replace(/·/g, '\\cdot ').replace(/×/g, '\\times ').replace(/½/g, '\\tfrac{1}{2}').replace(/′/g, "'")
    .replace(/ℓ/g, '\\ell{}').replace(/ℰ/g, '\\mathcal{E}').replace(/−/g, '-').replace(/%/g, '\\%')
    .replace(/ {2,}/g, '\\quad ').replace(/ ; /g, '\\;;\\quad ')
    // unités après un nombre : en caractères droits (N, kg, J·s, T·m·A^{-1}…)
    .replace(/(\d|10\^\{[^}]*\})( |\\,)((?:N|m|kg|J|s|T|A|K|C|g|h|W|V|u|cm|nm|Ω)(?:\^\{-?\d+\}|²|³)?(?:\\cdot (?:N|m|kg|J|s|T|A|K|C|g|h|W|V|mol|\\,\\text\{mol\})(?:\^\{-?\d+\}|²|³)?)*)(?=$|\s|\\quad|;|\)|=)/g,
      (all, n, sp, u) => n + '\\,\\mathrm{' + u.replace(/\\cdot /g, '\\cdot ') + '}');
}

// a / b  →  \dfrac{a}{b}  (fraction horizontale). Les « / » des indices et exposants (t_{1/2}, e^{−t/τ}) sont conservés.
function fracify(s) {
  const STOP = ' =+−-;<>≈⇒⇔≥≤∈≪∧:';
  const OPEN = { ')': '(', ']': '[', '}': '{' }, CLOSE = { '(': ')', '[': ']', '{': '}' };
  const FN = /(\\(sin|cos|tan|ln|log)|\b(sin|cos|tan|ln|log))$/;
  const inScript = (str, i) => { // « / » à l'intérieur d'un indice ou d'un exposant ?
    const st = [];
    for (let k = 0; k < i; k++) {
      if (str[k] === '{') st.push(str[k - 1] === '_' || str[k - 1] === '^');
      else if (str[k] === '}') st.pop();
    }
    return st.some(Boolean);
  };
  const isStop = (str, k, tight) => {
    const c = str[k];
    if (c === ',' ) return !(/\d/.test(str[k - 1] || '') && /\d/.test(str[k + 1] || ''));
    if (tight && c === '·') return true;
    return STOP.includes(c);
  };
  for (let guard = 0; guard < 40; guard++) {
    let i = -1;
    for (let k = 0; k < s.length; k++) if (s[k] === '/' && s[k - 1] !== ',' && s[k + 1] !== ',' && !inScript(s, k)) { i = k; break; }
    if (i < 0) break;
    const tight = s[i - 1] !== ' ' && s[i + 1] !== ' ';
    // opérande de gauche
    let a = i; while (s[a - 1] === ' ') a--;
    const aEnd = a;
    for (;;) {
      if (a <= 0) break;
      const c = s[a - 1];
      if (OPEN[c]) { let d = 0, k = a - 1; for (; k >= 0; k--) { if (s[k] === c) d++; else if (s[k] === OPEN[c] && --d === 0) break; } a = k; continue; }
      if (c === '|') { const k = s.lastIndexOf('|', a - 2); if (k >= 0) { a = k; continue; } }
      if (c === '(' || c === '[' || c === '{' || isStop(s, a - 1, tight)) {
        if (c === ' ' && !tight && FN.test(s.slice(0, a - 1))) { a = a - 1 - s.slice(0, a - 1).match(FN)[0].length; continue; }
        break;
      }
      a--;
    }
    // opérande de droite
    let b = i + 1; while (s[b] === ' ') b++;
    const bStart = b;
    for (;;) {
      if (b >= s.length) break;
      const c = s[b];
      if (CLOSE[c] && (b === bStart || c !== '(' || /[\w}\]′²³)]/.test(s[b - 1]))) { let d = 0, k = b; for (; k < s.length; k++) { if (s[k] === c) d++; else if (s[k] === CLOSE[c] && --d === 0) break; } b = k + 1; continue; }
      if (c === '\\') { b++; while (/[A-Za-z]/.test(s[b] || '')) b++; continue; }
      if (c === ')' || c === ']' || c === '}' || isStop(s, b, tight)) break;
      b++;
    }
    let L = s.slice(a, aEnd), R = s.slice(bStart, b);
    if (!L || !R) { s = s.slice(0, i) + '∕' + s.slice(i + 1); continue; }
    const whole = x => { if (x[0] !== '(' || x[x.length - 1] !== ')') return false; let d = 0; for (let k = 0; k < x.length; k++) { if (x[k] === '(') d++; else if (x[k] === ')' && --d === 0 && k < x.length - 1) return false; } return true; };
    if (whole(L)) L = L.slice(1, -1);
    if (whole(R)) R = R.slice(1, -1);
    s = s.slice(0, a) + '\\dfrac{' + L.trim() + '}{' + R.trim() + '}' + s.slice(b);
  }
  return s.replace(/∕/g, '/');
}
