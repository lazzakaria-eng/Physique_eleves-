/* Petits outils pour écrire les chapitres (contenu/<niveau>/<id>.js) et les exercices :
   FIG(l, h, dessin)  → figure SVG centrée ;   ARW(id, couleur) → définition d'une pointe de flèche (marker). */
'use strict';
const FIG = (w, h, body) => `<figure class="fig"><svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" font-family="Arial, sans-serif" font-size="13">${body}</svg></figure>`;
const ARW = (id, c) => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="${c || '#d93a4a'}"/></marker></defs>`;
// flèche de (x1, y1) à (x2, y2) avec étiquette
const VEC = (x1, y1, x2, y2, lab, c, id) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c || '#d93a4a'}" stroke-width="2.5" marker-end="url(#${id})"/>${lab ? `<text x="${x2 + (x2 >= x1 ? 6 : -6)}" y="${y2 + (y2 > y1 ? 14 : -4)}" text-anchor="${x2 >= x1 ? 'start' : 'end'}" font-weight="bold" fill="${c || '#d93a4a'}">${lab}</text>` : ''}`;
