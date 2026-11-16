/* 1ʳᵉ Bac · Chimie · Les groupes caractéristiques en chimie organique */
'use strict';
CONTENU['1bc-groupes'] = {
  resume: {
    intro: TX`Les propriétés d’une molécule organique dépendent de ses <b>groupes caractéristiques</b> (hydroxyle, carbonyle, carboxyle, amine, halogène). Ils définissent des <b>familles</b> : alcools, aldéhydes, cétones, acides carboxyliques, amines, dérivés halogénés.`,
    sections: [
      { titre: '1. Familles et groupes', sim: 'groupes', html: TX`<ul><li><b>Alcool</b> \(\text{R–OH}\) (groupe hydroxyle) : éthanol.</li><li><b>Aldéhyde</b> \(\text{R–CHO}\) et <b>cétone</b> \(\text{R–CO–R'}\) (groupe carbonyle) : éthanal, propanone.</li><li><b>Acide carboxylique</b> \(\text{R–COOH}\) : acide éthanoïque.</li><li><b>Amine</b> \(\text{R–NH}_2\) ; <b>dérivé halogéné</b> \(\text{R–X}\).</li></ul>` },
      { titre: '2. Classes d’alcools', html: TX`<p>Selon le nombre d’atomes de carbone liés au carbone fonctionnel (celui qui porte OH) : alcool <b>primaire</b> (1), <b>secondaire</b> (2), <b>tertiaire</b> (3).</p>`
        + FIG(480, 110, `<text x="20" y="40" font-size="14">CH₃–CH₂–OH</text><text x="20" y="70" font-size="12">primaire</text><text x="170" y="40" font-size="14">CH₃–CH(OH)–CH₃</text><text x="170" y="70" font-size="12">secondaire</text><text x="350" y="40" font-size="14">(CH₃)₃C–OH</text><text x="350" y="70" font-size="12">tertiaire</text>`) },
      { titre: '3. Oxydation ménagée des alcools', html: TX`<p>Avec un oxydant (permanganate, dichromate en milieu acide) : alcool primaire → aldéhyde → acide carboxylique ; alcool secondaire → cétone ; alcool tertiaire : pas d’oxydation ménagée.</p>` },
      { titre: '4. Tests d’identification', html: TX`<ul><li><b>2,4-DNPH</b> : précipité jaune-orangé avec aldéhydes et cétones (groupe carbonyle).</li><li><b>Liqueur de Fehling</b> (rouge brique à chaud) ou <b>réactif de Tollens</b> (miroir d’argent) : aldéhydes seulement.</li><li>Acide carboxylique : solution acide (BBT jaune).</li></ul>` },
    ],
    formules: [
      { tex: TX`\text{R–OH}`, sens: 'Alcool (hydroxyle)' },
      { tex: TX`\text{R–CHO} \ ;\ \text{R–CO–R'}`, sens: 'Aldéhyde ; cétone (carbonyle)' },
      { tex: TX`\text{R–COOH}`, sens: 'Acide carboxylique' },
      { tex: TX`\text{R–NH}_2 \ ;\ \text{R–X}`, sens: 'Amine ; dérivé halogéné' },
      { tex: TX`r = \dfrac{n_{obtenue}}{n_{max}}`, sens: 'Rendement d’une synthèse' },
    ],
    retenir: [
      'Le groupe caractéristique détermine la famille et les propriétés.',
      'Classe d’un alcool : nombre de C liés au carbone fonctionnel.',
      'Primaire → aldéhyde → acide ; secondaire → cétone ; tertiaire : rien.',
      'DNPH : carbonyle ; Fehling / Tollens : aldéhyde.',
    ],
    erreurs: [
      'Confondre aldéhyde (CHO en bout de chaîne) et cétone (CO dans la chaîne).',
      'Compter les H au lieu des C pour la classe d’un alcool.',
      'Penser qu’un alcool tertiaire s’oxyde facilement.',
    ],
  },
  experiences: {
    sims: ['groupes'],
    protocole: { titre: 'Identifier un aldéhyde et une cétone', materiel: 'éthanal, propanone, DNPH, liqueur de Fehling, tubes à essais, bain-marie.',
      etapes: ['Ajouter quelques gouttes de chaque composé à la DNPH.', 'Ajouter chaque composé à la liqueur de Fehling et chauffer au bain-marie.', 'Noter les observations.'] },
    observations: TX`<ul><li>DNPH : précipité jaune-orangé dans les deux tubes.</li><li>Fehling : précipité rouge brique seulement avec l’éthanal.</li></ul>`,
    conclusion: TX`<p>Les deux possèdent le groupe carbonyle ; seul l’aldéhyde est oxydé par la liqueur de Fehling.</p>`,
  },
  quiz: [
    { q: 'CH₃–CO–CH₃ est :', o: ['un aldéhyde', 'une cétone', 'un alcool', 'un acide'], r: 1, e: 'Propanone, carbonyle dans la chaîne.' },
    { q: 'Le butan-2-ol est un alcool :', o: ['primaire', 'secondaire', 'tertiaire', 'aromatique'], r: 1, e: 'Le C fonctionnel est lié à 2 C.' },
    { q: 'L’oxydation ménagée d’un alcool secondaire donne :', o: ['un aldéhyde', 'une cétone', 'un acide', 'rien'], r: 1, e: 'Cétone.' },
    { q: 'Le test spécifique des aldéhydes :', o: ['DNPH', 'liqueur de Fehling', 'eau de chaux', 'BBT'], r: 1, e: 'La DNPH réagit aussi avec les cétones.' },
    { q: 'Le groupe –COOH caractérise :', o: ['les alcools', 'les acides carboxyliques', 'les amines', 'les esters'], r: 1, e: 'Groupe carboxyle.' },
  ],
};
