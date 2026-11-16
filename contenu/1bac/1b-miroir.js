/* 1ʳᵉ Bac · Physique · Optique · Images formées par un miroir plan */
'use strict';
CONTENU['1b-miroir'] = {
  resume: {
    intro: TX`Un miroir plan donne d’un objet une <b>image virtuelle</b>, symétrique de l’objet par rapport au plan du miroir, de même taille. L’œil voit cette image en prolongeant les rayons réfléchis.`,
    sections: [
      { titre: '1. Image d’un point', sim: 'miroir', html: TX`<p>Tous les rayons issus de A et réfléchis par le miroir semblent provenir d’un même point A′, symétrique de A : \(HA' = HA\) (H : projeté de A sur le miroir). A′ est une image <b>virtuelle</b> (on ne peut pas la recueillir sur un écran).</p>`
        + FIG(380, 180, `<line x1="190" y1="10" x2="190" y2="170" stroke="#14213d" stroke-width="4"/>${Array.from({ length: 16 }, (_, k) => `<line x1="190" y1="${14 + k * 10}" x2="198" y2="${8 + k * 10}" stroke="#14213d"/>`).join('')}<circle cx="90" cy="90" r="5" fill="#d93a4a"/><text x="76" y="86">A</text><circle cx="290" cy="90" r="5" fill="none" stroke="#d93a4a" stroke-width="2"/><text x="300" y="86">A′</text><line x1="90" y1="90" x2="290" y2="90" stroke="#9aa6bf" stroke-dasharray="4 3"/><text x="180" y="106">H</text><line x1="90" y1="90" x2="190" y2="40" stroke="#1f6fe0" stroke-width="2"/><line x1="190" y1="40" x2="90" y2="-10" stroke="#1f6fe0" stroke-width="2"/><line x1="190" y1="40" x2="290" y2="90" stroke="#1f6fe0" stroke-dasharray="4 3"/>`) },
      { titre: '2. Image d’un objet étendu', html: TX`<p>L’image A′B′ d’un objet AB est symétrique de l’objet : même taille, grandissement \(\gamma = \dfrac{A'B'}{AB} = +1\), mais gauche et droite sont inversées.</p>` },
      { titre: '3. Champ de vision', html: TX`<p>Le champ de vision d’un miroir pour un œil donné est la zone de l’espace délimitée par les rayons qui passent par les bords du miroir et par l’œil (ou par son image). Pour se voir en entier, un miroir vertical doit mesurer au moins la <b>moitié</b> de la taille de la personne.</p>` },
      { titre: '4. Rotation d’un miroir', html: TX`<p>Si le miroir tourne d’un angle \(\alpha\) (rayon incident fixe), le rayon réfléchi tourne de \(\beta = 2\alpha\).</p>` },
    ],
    formules: [
      { tex: TX`HA' = HA`, sens: 'Image symétrique de l’objet' },
      { tex: TX`\gamma = \dfrac{A'B'}{AB} = +1`, sens: 'Grandissement' },
      { tex: TX`\beta = 2\,\alpha`, sens: 'Rotation du rayon réfléchi' },
    ],
    retenir: [
      'L’image donnée par un miroir plan est virtuelle, droite, de même taille.',
      'Image et objet sont symétriques par rapport au miroir.',
      'Pour se voir en entier : miroir de hauteur ≥ la moitié de sa taille.',
      'Miroir tourné de α : rayon réfléchi tourné de 2α.',
    ],
    erreurs: [
      'Croire que l’image est sur la surface du miroir.',
      'Penser qu’un miroir plus éloigné permet de se voir en entier avec un miroir plus petit.',
      'Oublier le facteur 2 lors de la rotation.',
    ],
  },
  experiences: {
    sims: ['miroir'],
    protocole: { titre: 'Localiser l’image d’une bougie', materiel: 'vitre (miroir semi-transparent), deux bougies identiques, règle.',
      etapes: ['Placer une bougie allumée devant la vitre.', 'Déplacer la seconde bougie (éteinte) derrière la vitre jusqu’à ce qu’elle semble allumée.', 'Mesurer les distances des deux bougies à la vitre.', 'Utiliser la simulation pour déplacer l’objet et suivre l’image.'] },
    observations: TX`<ul><li>La bougie éteinte « s’allume » quand elle occupe la position symétrique de la bougie allumée.</li><li>Les distances à la vitre sont égales.</li></ul>`,
    conclusion: TX`<p>L’image est symétrique de l’objet par rapport au miroir : \(HA' = HA\).</p>`,
  },
  quiz: [
    { q: 'L’image donnée par un miroir plan est :', o: ['réelle et inversée', 'virtuelle et de même taille', 'agrandie', 'réelle et droite'], r: 1, e: 'γ = +1.' },
    { q: 'Un objet est à 2 m du miroir. Distance objet-image :', o: ['2 m', '4 m', '1 m', '0 m'], r: 1, e: 'Image à 2 m derrière le miroir.' },
    { q: 'Pour qu’une personne de 1,70 m se voie en entier, miroir minimal :', o: ['1,70 m', '85 cm', '3,40 m', '50 cm'], r: 1, e: 'La moitié de la taille.' },
    { q: 'Le miroir tourne de 15°. Le rayon réfléchi tourne de :', o: ['15°', '7,5°', '30°', '45°'], r: 2, e: 'β = 2α.' },
    { q: 'On s’éloigne du miroir de 1 m. L’image :', o: ['s’éloigne du miroir de 1 m', 'se rapproche', 'reste fixe', 's’éloigne de 2 m du miroir'], r: 0, e: 'Elle reste symétrique de l’objet.' },
  ],
};
