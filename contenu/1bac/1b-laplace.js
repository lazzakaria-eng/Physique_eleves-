/* 1ʳᵉ Bac · Physique · Électromagnétisme · Forces électromagnétiques – Loi de Laplace */
'use strict';
CONTENU['1b-laplace'] = {
  resume: {
    intro: TX`Un conducteur parcouru par un courant et placé dans un champ magnétique subit une force : la <b>force de Laplace</b>. Elle est à l’origine du fonctionnement des moteurs électriques et des haut-parleurs.`,
    sections: [
      { titre: '1. Loi de Laplace', sim: 'laplace', html: TX`<p>Une portion rectiligne de conducteur de longueur \(\ell\), parcourue par \(I\), dans un champ uniforme \(\vec B\) : \(\vec F = I\,\vec\ell\wedge\vec B\) (\(\vec\ell\) orienté dans le sens du courant).</p>
<ul><li>Point d’application : milieu de la portion dans le champ ;</li><li>direction : perpendiculaire au plan \((\vec\ell, \vec B)\) ;</li><li>sens : règle des trois doigts de la main droite (pouce : I, index : B, majeur : F) ;</li><li>intensité : \(F = I\,\ell\,B\,|\sin\alpha|\), \(\alpha\) angle entre \(\vec\ell\) et \(\vec B\).</li></ul>`
        + FIG(420, 170, ARW('lp1') + `<rect x="40" y="20" width="340" height="130" fill="#eaf1fd" stroke="#9aa6bf"/>${[0, 1, 2, 3, 4, 5].map(i => [0, 1, 2].map(j => `<text x="${70 + i * 55}" y="${50 + j * 40}" fill="#1f6fe0" font-size="14">×</text>`).join('')).join('')}<text x="44" y="16" font-size="11">B entrant (×)</text><line x1="210" y1="10" x2="210" y2="160" stroke="#d98200" stroke-width="5"/><text x="218" y="160" font-size="11">I vers le haut</text>${VEC(210, 85, 120, 85, 'F', '#d93a4a', 'lp1')}`) },
      { titre: '2. Applications', html: TX`<ul><li><b>Rails de Laplace</b> : une tige mobile posée sur deux rails parcourus par un courant se met en mouvement.</li><li><b>Moteur à courant continu</b> : un couple de forces de Laplace fait tourner le rotor.</li><li><b>Haut-parleur</b> : une bobine dans le champ d’un aimant vibre avec le courant et fait vibrer la membrane.</li></ul>` },
      { titre: '3. Travail et puissance', html: TX`<p>Si la tige se déplace de \(d\) dans la direction de la force : \(W = F\cdot d = I\ell B\,d\) ; puissance \(P = F\cdot v\). La force de Laplace convertit l’énergie électrique en énergie mécanique.</p>` },
    ],
    formules: [
      { tex: TX`\vec F = I\,\vec\ell\wedge\vec B`, sens: 'Force de Laplace' },
      { tex: TX`F = I\,\ell\,B\,|\sin\alpha|`, sens: 'Intensité' },
      { tex: TX`W = F\cdot d \qquad P = F\cdot v`, sens: 'Travail et puissance' },
    ],
    retenir: [
      'F est perpendiculaire au conducteur et au champ.',
      'Règle de la main droite : pouce I, index B, majeur F.',
      'F est maximale quand le conducteur est perpendiculaire à B, nulle s’il lui est parallèle.',
      'Inverser I ou B inverse le sens de F.',
    ],
    erreurs: [
      'Prendre toute la longueur du conducteur au lieu de la partie dans le champ.',
      'Placer la force dans le plan (ℓ, B).',
      'Oublier sin α.',
    ],
  },
  experiences: {
    sims: ['laplace'],
    protocole: { titre: 'Les rails de Laplace', materiel: 'aimant en U, deux rails, tige de cuivre, générateur, ampèremètre, rhéostat.',
      etapes: ['Poser la tige sur les rails entre les branches de l’aimant ; fermer le circuit.', 'Observer le sens du mouvement ; inverser le courant, puis l’aimant.', 'Augmenter I et observer.', 'Dans la simulation, faire varier I, B et ℓ et noter F.'] },
    observations: TX`<ul><li>La tige se déplace perpendiculairement aux rails et au champ.</li><li>Inverser I ou B inverse le sens du mouvement.</li><li>Plus I est grand, plus la tige est entraînée vivement.</li></ul>`,
    conclusion: TX`<p>\(F = I\ell B\sin\alpha\), perpendiculaire à \(\vec\ell\) et à \(\vec B\).</p>`,
  },
  quiz: [
    { q: TX`I = 5 A, ℓ = 10 cm, B = 0,2 T, perpendiculaires. F :`, o: ['0,1 N', '10 N', '1 N', '0,01 N'], r: 0, e: TX`\(5\times0{,}1\times0{,}2\).` },
    { q: 'Si le conducteur est parallèle à B, F :', o: ['est maximale', 'est nulle', 'double', 'change de sens'], r: 1, e: TX`\(\sin0 = 0\).` },
    { q: 'On inverse le sens du courant. La force :', o: ['garde le même sens', 'change de sens', 'devient nulle', 'double'], r: 1, e: 'F dépend du sens de I.' },
    { q: 'La force de Laplace est à la base du fonctionnement :', o: ['du moteur électrique', 'de la pile', 'du thermomètre', 'de la lampe'], r: 0, e: 'Conversion électrique → mécanique.' },
    { q: 'La direction de F est :', o: ['celle de B', 'celle du conducteur', 'perpendiculaire au conducteur et à B', 'quelconque'], r: 2, e: 'Produit vectoriel.' },
  ],
};
