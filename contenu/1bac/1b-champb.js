/* 1ʳᵉ Bac · Physique · Électromagnétisme · Le champ magnétique */
'use strict';
CONTENU['1b-champb'] = {
  resume: {
    intro: TX`Un aimant, la Terre ou un courant électrique créent dans l’espace qui les entoure un <b>champ magnétique</b> \(\vec B\), mis en évidence par l’orientation d’une aiguille aimantée. Il se mesure en <b>teslas</b> (T) avec un teslamètre.`,
    sections: [
      { titre: '1. Sources et mise en évidence', sim: 'boussole', html: TX`<p>Sources : aimants (pôles nord et sud), Terre, courants électriques. Deux pôles de même nom se repoussent, de noms contraires s’attirent. Une petite aiguille aimantée s’oriente selon \(\vec B\) : de son pôle sud vers son pôle nord.</p>` },
      { titre: '2. Vecteur champ et lignes de champ', html: TX`<p>\(\vec B\) en un point : direction et sens donnés par l’aiguille (S → N), intensité en teslas. Les <b>lignes de champ</b> sont tangentes à \(\vec B\) ; à l’extérieur d’un aimant droit elles vont du pôle N vers le pôle S. Le champ est <b>uniforme</b> entre les branches d’un aimant en U (lignes parallèles).</p>`
        + FIG(420, 150, ARW('b1', '#1f6fe0') + `<rect x="150" y="60" width="60" height="30" fill="#d93a4a"/><text x="180" y="80" text-anchor="middle" fill="#fff" font-weight="bold">N</text><rect x="210" y="60" width="60" height="30" fill="#1f6fe0"/><text x="240" y="80" text-anchor="middle" fill="#fff" font-weight="bold">S</text>${[30, 55].map(h => `<path d="M150 75 C 110 ${75 - h * 1.6}, 310 ${75 - h * 1.6}, 270 75" fill="none" stroke="#1f6fe0" stroke-width="1.5" marker-end="url(#b1)"/><path d="M150 75 C 110 ${75 + h * 1.6}, 310 ${75 + h * 1.6}, 270 75" fill="none" stroke="#1f6fe0" stroke-width="1.5" marker-end="url(#b1)"/>`).join('')}`) },
      { titre: '3. Superposition des champs', sim: 'solenoide', html: TX`<p>En un point soumis à plusieurs champs : \(\vec B = \vec B_1 + \vec B_2\) (somme vectorielle). Exemple : une aiguille soumise au champ terrestre horizontal \(\vec B_H\) et à un champ \(\vec B_S\) perpendiculaire tourne d’un angle \(\alpha\) tel que \(\tan\alpha = \dfrac{B_S}{B_H}\).</p>` },
      { titre: '4. Le champ magnétique terrestre', html: TX`<p>La Terre se comporte comme un aimant ; sa composante horizontale \(B_H \approx 2\times10^{-5}\ \text{T}\) au Maroc oriente la boussole vers le nord magnétique.</p>` },
    ],
    formules: [
      { tex: TX`\vec B = \vec B_1 + \vec B_2`, sens: 'Superposition des champs magnétiques' },
      { tex: TX`\tan\alpha = \dfrac{B_S}{B_H}`, sens: 'Déviation d’une aiguille (champs perpendiculaires)' },
      { tex: TX`B_H \approx 2\times10^{-5}\ \text{T}`, sens: 'Composante horizontale du champ terrestre' },
    ],
    retenir: [
      'Une aiguille aimantée indique le sens de B (de S vers N dans l’aiguille).',
      'À l’extérieur d’un aimant, les lignes de champ vont de N vers S.',
      'Entre les branches d’un aimant en U, le champ est uniforme.',
      'Les champs s’additionnent vectoriellement.',
    ],
    erreurs: [
      'Additionner les intensités de champs non colinéaires.',
      'Inverser le sens des lignes de champ.',
      'Confondre nord géographique et pôle nord magnétique.',
    ],
  },
  experiences: {
    sims: ['boussole', 'solenoide'],
    protocole: { titre: 'Visualiser des lignes de champ', materiel: 'aimant droit, aimant en U, limaille de fer, plaque de verre, petites boussoles.',
      etapes: ['Saupoudrer de la limaille sur une plaque posée sur l’aimant ; tapoter.', 'Placer des boussoles autour de l’aimant et noter leur orientation.', 'Recommencer avec l’aimant en U.', 'Dans la simulation, ajouter un champ perpendiculaire au champ terrestre et mesurer la déviation.'] },
    observations: TX`<ul><li>La limaille dessine des lignes qui partent d’un pôle et arrivent à l’autre.</li><li>Entre les branches du U, les lignes sont parallèles.</li><li>La déviation de l’aiguille augmente avec \(B_S\).</li></ul>`,
    conclusion: TX`<p>Le champ magnétique est un vecteur ; les lignes de champ en donnent la direction et la répartition.</p>`,
  },
  quiz: [
    { q: 'L’unité du champ magnétique :', o: ['le weber', 'le tesla', 'le volt', 'le newton'], r: 1, e: 'Symbole T.' },
    { q: 'À l’extérieur d’un aimant droit, les lignes de champ vont :', o: ['de S vers N', 'de N vers S', 'en cercle autour de l’aimant', 'n’importe comment'], r: 1, e: 'Elles sortent par le pôle nord.' },
    { q: TX`\(B_S = B_H\) et perpendiculaires. Déviation de l’aiguille :`, o: ['30°', '45°', '60°', '90°'], r: 1, e: TX`\(\tan\alpha = 1\).` },
    { q: 'Le champ entre les branches d’un aimant en U est :', o: ['nul', 'uniforme', 'radial', 'circulaire'], r: 1, e: 'Lignes parallèles et équidistantes.' },
    { q: TX`Deux champs colinéaires de même sens, \(2\) mT et \(3\) mT. Champ résultant :`, o: ['1 mT', '5 mT', '3,6 mT', '6 mT'], r: 1, e: 'Somme des intensités car même direction et même sens.' },
  ],
};
