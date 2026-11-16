/* 1ʳᵉ Bac · Chimie · Mesure des quantités de matière par conductimétrie */
'use strict';
CONTENU['1bc-conductimetrie'] = {
  resume: {
    intro: TX`La <b>conductance</b> \(G\) d’une solution mesure sa capacité à conduire le courant. Elle dépend de la cellule et de la solution ; la <b>conductivité</b> \(\sigma\) ne dépend que de la solution et permet de déterminer une concentration.`,
    sections: [
      { titre: '1. Conductance', sim: 'conductimetrie', html: TX`<p>Deux plaques de surface \(S\) distantes de \(L\) plongent dans la solution ; on applique une tension alternative \(U\) et on mesure \(I\) : \(G = \dfrac{1}{R} = \dfrac{I}{U}\) (siemens S). \(G\) augmente avec \(S\), diminue avec \(L\) : \(G = \sigma\,\dfrac{S}{L}\) (\(k = S/L\) : constante de cellule).</p>` },
      { titre: '2. Conductivité', sim: 'electrolyte', html: TX`<p>\(\sigma\) (S/m) dépend de la nature des ions, de leurs concentrations et de la température : \(\sigma = \sum \lambda_i\,[X_i]\) avec \(\lambda_i\) la conductivité molaire ionique (S·m²/mol) et \([X_i]\) en <b>mol/m³</b>. Pour un électrolyte de concentration \(C\) : \(\sigma = \Lambda\,C\) (conductivité molaire \(\Lambda\)). H₃O⁺ et HO⁻ ont des \(\lambda\) très élevées.</p>` },
      { titre: '3. Courbe d’étalonnage', html: TX`<p>Pour des solutions diluées d’un même soluté : \(G = k\,C\). On mesure \(G\) pour des solutions de concentrations connues, on trace la droite \(G = f(C)\), puis on lit la concentration d’une solution inconnue.</p>`
        + FIG(400, 200, cfig({ w: 400, h: 200, x1: 10, xs: 2, y1: 2.5, ys: 0.5, xl: 'C (mmol/L)', yl: 'G (mS)', f: c => 0.24 * c, fmty: y => String(y).replace('.', ','), ext: (X, Y) => [2, 4, 6, 8].map(c => `<circle cx="${X(c)}" cy="${Y(0.24 * c)}" r="4" fill="#d93a4a"/>`).join('') + `<line x1="${X(0)}" y1="${Y(1.2)}" x2="${X(5)}" y2="${Y(1.2)}" stroke="#12946a" stroke-dasharray="4 3"/><line x1="${X(5)}" y1="${Y(1.2)}" x2="${X(5)}" y2="${Y(0)}" stroke="#12946a" stroke-dasharray="4 3"/>` }).replace(/^<svg[^>]*>|<\/svg>$/g, '')) },
    ],
    formules: [
      { tex: TX`G = \dfrac{1}{R} = \dfrac{I}{U}`, sens: 'Conductance (S)' },
      { tex: TX`G = \sigma\,\dfrac{S}{L}`, sens: 'Conductance et conductivité' },
      { tex: TX`\sigma = \sum \lambda_i\,[X_i]`, sens: 'Conductivité ([X] en mol/m³)' },
      { tex: TX`G = k\,C`, sens: 'Solutions diluées (étalonnage)' },
    ],
    retenir: [
      'On utilise une tension alternative pour éviter l’électrolyse.',
      'G dépend de la cellule ; σ dépend seulement de la solution (et de T).',
      TX`Dans \(\sigma = \sum\lambda_i[X_i]\), les concentrations sont en mol/m³ (\(1\ \text{mol/L} = 10^{3}\ \text{mol/m}^3\)).`,
      'Courbe d’étalonnage : G proportionnelle à C pour des solutions diluées.',
    ],
    erreurs: [
      'Oublier la conversion mol/L → mol/m³.',
      'Utiliser une solution trop concentrée (hors du domaine linéaire).',
      'Changer de cellule ou de température entre deux mesures.',
    ],
  },
  experiences: {
    sims: ['conductimetrie', 'electrolyte'],
    protocole: { titre: 'Doser le sel d’un sérum par étalonnage', materiel: 'conductimètre, solutions étalons de NaCl (2 à 10 mmol/L), sérum physiologique dilué 20 fois.',
      etapes: ['Étalonner le conductimètre, puis mesurer G (ou σ) de chaque solution étalon.', 'Tracer G = f(C).', 'Mesurer G du sérum dilué et lire C.', 'Remonter à la concentration du sérum (× 20).'] },
    observations: TX`<ul><li>Les points sont alignés sur une droite passant par l’origine.</li><li>Le sérum dilué donne une conductance correspondant à environ 7,7 mmol/L.</li></ul>`,
    conclusion: TX`<p>Sérum : \(C \approx 20\times7{,}7 \approx 154\ \text{mmol/L}\), soit environ 9 g/L de NaCl.</p>`,
  },
  quiz: [
    { q: TX`U = 1,0 V, I = 2,5 mA. G :`, o: ['2,5 mS', '400 S', '0,4 mS', '2,5 S'], r: 0, e: TX`\(G = I/U\).` },
    { q: 'La conductivité dépend :', o: ['de la cellule', 'de la solution et de T', 'de la tension appliquée', 'du volume de solution'], r: 1, e: 'σ est une propriété de la solution.' },
    { q: TX`0,010 mol/L en mol/m³ :`, o: ['10', '0,01', '10⁻⁵', '1000'], r: 0, e: '× 1000.' },
    { q: 'Pourquoi une tension alternative ?', o: ['pour éviter l’électrolyse', 'pour chauffer', 'pour augmenter G', 'par habitude'], r: 0, e: 'Une tension continue provoquerait des réactions aux électrodes.' },
    { q: 'Sur la courbe d’étalonnage ci-dessus, G = 1,2 mS correspond à :', o: ['5 mmol/L', '1,2 mmol/L', '0,24 mmol/L', '10 mmol/L'], r: 0, e: 'Lecture graphique.' },
  ],
};
