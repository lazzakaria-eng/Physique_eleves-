/* Tronc Commun · Chimie · Synthèse des espèces chimiques */
'use strict';
CONTENU['tcc-synthese'] = {
  resume: {
    intro: TX`<b>Synthétiser</b> une espèce chimique, c’est la fabriquer par une transformation chimique à partir d’autres espèces (les réactifs). La synthèse permet de produire en grande quantité, à moindre coût, des espèces naturelles ou de créer des espèces nouvelles.`,
    sections: [
      { titre: '1. Pourquoi synthétiser ?', html: TX`<ul><li>Les ressources naturelles sont limitées ou chères (vanilline, indigo).</li><li>On peut obtenir une espèce plus pure et en grande quantité.</li><li>On peut créer des espèces <b>artificielles</b> qui n’existent pas dans la nature (matières plastiques, médicaments).</li></ul>` },
      { titre: '2. Le chauffage à reflux', html: TX`<p>On chauffe le mélange réactionnel pour accélérer la réaction ; le <b>réfrigérant à boules</b> (vertical) condense les vapeurs qui retombent dans le ballon : pas de perte de matière. La <b>pierre ponce</b> régularise l’ébullition.</p>`
        + FIG(300, 220, `<ellipse cx="150" cy="175" rx="45" ry="35" fill="#e3e9f3" stroke="#14213d" stroke-width="2"/><rect x="138" y="110" width="24" height="40" fill="#e3e9f3" stroke="#14213d" stroke-width="2"/>${[0, 1, 2, 3].map(k => `<circle cx="150" cy="${95 - k * 22}" r="11" fill="#eaf1fd" stroke="#14213d" stroke-width="2"/>`).join('')}<path d="M162 100 h40" stroke="#1f6fe0" stroke-width="2"/><text x="206" y="104" font-size="11">sortie d’eau</text><path d="M162 40 h40" stroke="#1f6fe0" stroke-width="2"/><text x="206" y="44" font-size="11">entrée d’eau</text><rect x="110" y="208" width="80" height="10" fill="#d93a4a"/><text x="30" y="180" font-size="11">mélange</text><text x="30" y="194" font-size="11">réactionnel</text>`) },
      { titre: '3. Étapes d’une synthèse', html: TX`<ol><li><b>Transformation</b> : réaction des réactifs (souvent à reflux).</li><li><b>Isolement</b> : séparer le produit (décantation, filtration, extraction).</li><li><b>Purification</b> (lavage, séchage, recristallisation).</li><li><b>Identification</b> : CCM, température de fusion, densité… et comparaison avec l’espèce naturelle.</li></ol>` },
      { titre: '4. Identification et rendement', sim: 'ccm', html: TX`<p>L’espèce synthétique est identique à l’espèce naturelle si elles ont les mêmes caractéristiques : en CCM, \(R_f(\text{synthétique}) = R_f(\text{naturelle})\).</p>
<p><b>Rendement</b> : \(r = \dfrac{m_{obtenue}}{m_{maximale}}\times100\ \%\) ; il est toujours inférieur à 100 % (pertes, réaction incomplète).</p>` },
    ],
    formules: [
      { tex: TX`\text{réactifs} \longrightarrow \text{produits}`, sens: 'Transformation chimique' },
      { tex: TX`R_f(\text{synthétique}) = R_f(\text{naturelle})`, sens: 'Même espèce en CCM' },
      { tex: TX`r = \dfrac{m_{obtenue}}{m_{max}}\times100\ \%`, sens: 'Rendement de la synthèse' },
    ],
    retenir: [
      'Une espèce synthétique peut être identique à une espèce naturelle ou artificielle.',
      'Le chauffage à reflux accélère la réaction sans perte de matière.',
      'Étapes : transformation, isolement, purification, identification.',
      'Même R_f et mêmes constantes physiques : même espèce.',
      'Le rendement est inférieur à 100 %.',
    ],
    erreurs: [
      'Placer le réfrigérant à reflux horizontalement (c’est le montage de distillation).',
      'Faire entrer l’eau du réfrigérant par le haut.',
      'Boucher le haut du réfrigérant (risque de surpression).',
      'Croire qu’une espèce synthétique est « moins bonne » que l’espèce naturelle identique.',
    ],
  },
  experiences: {
    sims: ['ccm'],
    protocole: { titre: 'Synthèse de l’acétate d’isoamyle (arôme de banane)', materiel: 'ballon, réfrigérant à boules, chauffe-ballon, acide acétique, alcool isoamylique, quelques gouttes d’acide sulfurique, pierre ponce, ampoule à décanter, eau salée.',
      etapes: ['Introduire 20 mL d’alcool isoamylique, 30 mL d’acide acétique, l’acide sulfurique et la pierre ponce dans le ballon (sous la hotte, gants et lunettes).', 'Chauffer à reflux pendant 30 min.', 'Refroidir, verser dans l’eau salée, décanter et garder la phase organique (en haut).', 'Réaliser une CCM : produit obtenu et arôme commercial.'] },
    observations: TX`<ul><li>Une odeur de banane se dégage.</li><li>Deux phases dans l’ampoule ; le produit est dans la phase supérieure.</li><li>En CCM, la tache du produit a le même \(R_f\) que celle de l’arôme commercial.</li></ul>`,
    conclusion: TX`<p>On a synthétisé l’acétate d’isoamyle, identique à l’espèce présente dans la banane.</p>`,
  },
  quiz: [
    { q: 'Le chauffage à reflux permet :', o: ['de refroidir le mélange', 'd’accélérer la réaction sans perte de matière', 'de séparer deux liquides', 'de mesurer le R_f'], r: 1, e: 'Les vapeurs se condensent et retombent.' },
    { q: 'Une espèce synthétique identique à une espèce naturelle a :', o: ['des propriétés différentes', 'les mêmes propriétés', 'un R_f plus grand', 'une autre formule'], r: 1, e: 'C’est la même espèce.' },
    { q: 'On attendait 12 g de produit, on en obtient 9 g. Le rendement :', o: ['133 %', '75 %', '25 %', '9 %'], r: 1, e: TX`\(9/12 = 0{,}75\).` },
    { q: 'Le nylon est une espèce :', o: ['naturelle', 'synthétique artificielle', 'extraite du pétrole tel quel', 'minérale naturelle'], r: 1, e: 'Elle n’existe pas dans la nature.' },
    { q: 'La pierre ponce sert à :', o: ['catalyser la réaction', 'régulariser l’ébullition', 'colorer le mélange', 'sécher le produit'], r: 1, e: 'Elle évite les surchauffes brutales.' },
  ],
};
