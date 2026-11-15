/* Fiches résumés du professeur (images dans assets/fiches/).
   Pour ajouter une fiche : déposer l'image dans assets/fiches/ (et une petite copie dans assets/fiches/mini/),
   puis ajouter une ligne ci-dessous : [niveau, numéro de page, 'Titre', ['id du chapitre', ...]].
   Une fiche sans chapitre est une fiche générale (méthodes, constantes…). */
'use strict';
const FICHES = [
  ['2bac', 5, 'Complément mathématique', []],
  ['2bac', 6, 'Équation aux dimensions', []],
  ['2bac', 7, 'Constantes et données utiles', []],
  ['2bac', 8, 'Ondes (1) : ondes mécaniques et lumière', ['2b-ondes', '2b-ondes-per', '2b-lumiere']],
  ['2bac', 9, 'Ondes (2) : ondes sinusoïdales, son et lumière visible', ['2b-ondes', '2b-ondes-per', '2b-lumiere']],
  ['2bac', 10, 'Complément : lois de Descartes', ['2b-lumiere']],
  ['2bac', 11, 'Décroissance radioactive', ['2b-radioactivite']],
  ['2bac', 12, 'Décroissance radioactive (suite) : datation et applications', ['2b-radioactivite']],
  ['2bac', 13, 'Noyaux, masse et énergie', ['2b-noyaux']],
  ['2bac', 14, 'Dipôle RC', ['2b-rc']],
  ['2bac', 15, 'Dipôle RL', ['2b-rl']],
  ['2bac', 16, 'Oscillations libres dans un circuit RLC série', ['2b-rlc']],
  ['2bac', 17, 'Oscillations forcées dans un circuit RLC série (1)', ['2b-rlc-force']],
  ['2bac', 18, 'Oscillations forcées dans un circuit RLC série (2)', ['2b-rlc-force']],
  ['2bac', 19, 'Modulation – démodulation d’amplitude', ['2b-ondes-em', '2b-modulation']],
  ['2bac', 21, 'Lois de Newton : chute verticale avec frottements', ['2b-chute']],
  ['2bac', 22, 'Lois de Newton : chute libre et MRUV', ['2b-chute', '2b-newton']],
  ['2bac', 23, 'Lois de Newton : mouvements plans', ['2b-plans']],
  ['2bac', 24, 'Satellites artificiels et planètes', ['2b-satellites']],
  ['2bac', 34, 'Compléments et formules à retenir', []],
].map(([lv, n, titre, ch]) => {
  const f = lv + '-' + String(n).padStart(2, '0') + '.jpg';
  return { lv, n, titre, ch, src: 'assets/fiches/' + f, mini: 'assets/fiches/mini/' + f };
});
