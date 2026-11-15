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
