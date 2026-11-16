/* 2ᵉ Bac · Chimie · Réactions d’estérification et d’hydrolyse */
'use strict';
CONTENU['2bc-ester'] = {
  resume: {
    intro: TX`Un acide carboxylique et un alcool réagissent pour former un <b>ester</b> et de l’eau : c’est l’<b>estérification</b>. La réaction inverse est l’<b>hydrolyse</b>. Les deux réactions sont <b>lentes</b> et <b>limitées</b> : elles conduisent au même état d’équilibre.`,
    sections: [
      { titre: '1. Les esters', html: TX`<p>Groupe caractéristique \(\text{–COO–}\) : \(\text{R–COO–R'}\). Nom : « alcanoate d’alkyle » (ex. \(\text{CH}_3\text{COOC}_2\text{H}_5\) : éthanoate d’éthyle). Odeurs fruitées : arômes, parfums.</p>` },
      { titre: '2. Estérification et hydrolyse', sim: 'ester', html: TX`<p style="text-align:center">\(\text{R–COOH} + \text{R'–OH} \rightleftharpoons \text{R–COO–R'} + \text{H}_2\text{O}\)</p><p>Constante d’équilibre \(K = \dfrac{[\text{ester}][\text{eau}]}{[\text{acide}][\text{alcool}]}\) (tous en solution, l’eau n’étant pas le solvant) ; \(K \approx 4\) pour un alcool primaire.</p>`
        + FIG(440, 190, `<line x1="40" y1="170" x2="420" y2="170" stroke="#5b6577"/><line x1="40" y1="180" x2="40" y2="10" stroke="#5b6577"/><text x="410" y="188">t</text><text x="46" y="20">n(ester)</text><line x1="40" y1="70" x2="420" y2="70" stroke="#9aa6bf" stroke-dasharray="5 4"/><text x="300" y="64" font-size="11">0,67 mol (équilibre)</text><polyline points="${Array.from({ length: 77 }, (_, i) => (40 + i * 5) + ',' + (170 - 100 * (1 - Math.exp(-i * 5 / 90))).toFixed(1)).join(' ')}" fill="none" stroke="#1f6fe0" stroke-width="3"/><polyline points="${Array.from({ length: 77 }, (_, i) => (40 + i * 5) + ',' + (170 - 150 + 50 * (1 - Math.exp(-i * 5 / 90))).toFixed(1)).join(' ')}" fill="none" stroke="#d93a4a" stroke-width="3"/><text x="60" y="160" fill="#1f6fe0" font-size="11">estérification (1 mol acide + 1 mol alcool)</text><text x="60" y="34" fill="#d93a4a" font-size="11">hydrolyse (1 mol ester + 1 mol eau)</text>`) },
      { titre: '3. Rendement', html: TX`<p>\(r = \dfrac{n_{exp}}{n_{max}}\). Mélange équimolaire acide + alcool : r ≈ 67 % (alcool primaire), 60 % (secondaire), 5 % (tertiaire). On augmente le rendement en mettant un réactif en <b>excès</b> ou en <b>éliminant</b> un produit (eau ou ester) au fur et à mesure (déplacement de l’équilibre).</p>` },
      { titre: '4. Contrôle de la vitesse', html: TX`<p>La température et un <b>catalyseur</b> (ions \(\text{H}^+\) de l’acide sulfurique) accélèrent la réaction mais ne changent pas l’état d’équilibre (ni K ni le rendement final). Montage : chauffage à reflux.</p>` },
    ],
    formules: [
      { tex: TX`\text{R–COOH} + \text{R'–OH} \rightleftharpoons \text{R–COO–R'} + \text{H}_2\text{O}`, sens: 'Estérification / hydrolyse' },
      { tex: TX`K = \dfrac{[\text{ester}][\text{eau}]}{[\text{acide}][\text{alcool}]}`, sens: 'Constante d’équilibre (≈ 4)' },
      { tex: TX`r = \dfrac{n_{exp}}{n_{max}}`, sens: 'Rendement' },
      { tex: TX`r \approx 67\ \% \ ;\ 60\ \% \ ;\ 5\ \%`, sens: 'Alcool primaire ; secondaire ; tertiaire (mélange équimolaire)' },
    ],
    retenir: [
      'Estérification et hydrolyse : lentes, limitées, inverses l’une de l’autre.',
      'Le rendement dépend de la classe de l’alcool.',
      'Excès d’un réactif ou élimination d’un produit : rendement accru.',
      'Catalyseur et chauffage : équilibre atteint plus vite, sans changer le rendement.',
    ],
    erreurs: [
      'Croire qu’un catalyseur augmente le rendement.',
      'Confondre ester et acide (–COO– au milieu de la chaîne).',
      'Oublier l’eau dans K.',
    ],
  },
  experiences: {
    sims: ['ester'],
    protocole: { titre: 'Synthèse de l’éthanoate d’éthyle', materiel: 'acide éthanoïque et éthanol (1 mol chacun, en quantités réduites au laboratoire), acide sulfurique concentré, montage à reflux, soude pour le titrage.',
      etapes: ['Mélanger acide et alcool, ajouter quelques gouttes d’acide sulfurique et chauffer à reflux.', 'Faire des prélèvements réguliers, les refroidir (trempe) et titrer l’acide restant par la soude.', 'En déduire la quantité d’ester formée au cours du temps.'] },
    observations: TX`<ul><li>La quantité d’ester augmente puis se stabilise à environ 0,67 mol pour 1 mol de chaque réactif.</li><li>Sans catalyseur ni chauffage, l’évolution est beaucoup plus lente.</li></ul>`,
    conclusion: TX`<p>La réaction est limitée : \(\tau \approx 0{,}67\) ; \(K = \dfrac{0{,}67^2}{0{,}33^2} \approx 4\).</p>`,
  },
  quiz: [
    { q: 'Le nom de CH₃COOCH₃ :', o: ['éthanoate de méthyle', 'méthanoate d’éthyle', 'acide éthanoïque', 'propanone'], r: 0, e: 'Acide éthanoïque + méthanol.' },
    { q: 'Rendement d’un mélange équimolaire acide + alcool primaire :', o: ['100 %', '67 %', '33 %', '5 %'], r: 1, e: 'K ≈ 4.' },
    { q: 'Un catalyseur :', o: ['augmente le rendement', 'accélère la réaction sans changer le rendement', 'modifie K', 'déplace l’équilibre'], r: 1, e: 'Il agit sur la vitesse.' },
    { q: 'Pour augmenter le rendement, on peut :', o: ['ajouter un catalyseur', 'mettre l’alcool en excès', 'refroidir', 'ajouter de l’eau'], r: 1, e: 'Déplacement de l’équilibre.' },
    { q: 'L’hydrolyse d’un ester donne :', o: ['un acide et un alcool', 'un ester et de l’eau', 'un savon', 'un alcane'], r: 0, e: 'Réaction inverse de l’estérification.' },
  ],
};
