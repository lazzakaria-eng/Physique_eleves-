/* Tronc Commun · Physique · Électricité · Association des conducteurs ohmiques */
'use strict';
CONTENU['tc-association'] = {
  resume: {
    intro: TX`Un <b>conducteur ohmique</b> vérifie la loi d’Ohm \(U = R\,I\). Plusieurs conducteurs ohmiques associés en série ou en dérivation se comportent comme un seul conducteur de <b>résistance équivalente</b> \(R_{éq}\).`,
    sections: [
      { titre: '1. Loi d’Ohm et résistance', sim: 'caract', html: TX`<p>La tension aux bornes d’un conducteur ohmique est proportionnelle à l’intensité qui le traverse : \(U = R\cdot I\) (convention récepteur), \(R\) en ohms (Ω). Sa caractéristique \(U = f(I)\) est une droite passant par l’origine, de pente \(R\). La conductance est \(G = 1/R\) (siemens).</p>
<p>Pour un fil : \(R = \rho\,\dfrac{L}{S}\) (\(\rho\) : résistivité en Ω·m, \(L\) : longueur, \(S\) : section). On lit \(R\) avec un ohmmètre ou le code des couleurs.</p>` },
      { titre: '2. Association en série', sim: 'assoc', html: TX`<p>Les conducteurs sont traversés par le même courant ; les tensions s’ajoutent : \(R_{éq} = R_1 + R_2 + \dots\) La résistance équivalente est <b>plus grande</b> que chacune.</p>`
        + FIG(420, 70, `<line x1="20" y1="35" x2="80" y2="35" stroke="#14213d" stroke-width="2"/><rect x="80" y="23" width="80" height="24" fill="#fff" stroke="#14213d" stroke-width="2"/><text x="120" y="40" text-anchor="middle">R₁</text><line x1="160" y1="35" x2="240" y2="35" stroke="#14213d" stroke-width="2"/><rect x="240" y="23" width="80" height="24" fill="#fff" stroke="#14213d" stroke-width="2"/><text x="280" y="40" text-anchor="middle">R₂</text><line x1="320" y1="35" x2="400" y2="35" stroke="#14213d" stroke-width="2"/>`) },
      { titre: '3. Association en dérivation', html: TX`<p>Les conducteurs ont la même tension ; les intensités s’ajoutent : \(\dfrac{1}{R_{éq}} = \dfrac{1}{R_1} + \dfrac{1}{R_2} + \dots\) (les conductances s’ajoutent). Pour deux : \(R_{éq} = \dfrac{R_1R_2}{R_1 + R_2}\), plus petite que chacune.</p>`
        + FIG(420, 110, `<line x1="20" y1="55" x2="100" y2="55" stroke="#14213d" stroke-width="2"/><line x1="100" y1="20" x2="100" y2="90" stroke="#14213d" stroke-width="2"/><line x1="320" y1="20" x2="320" y2="90" stroke="#14213d" stroke-width="2"/><line x1="100" y1="20" x2="170" y2="20" stroke="#14213d" stroke-width="2"/><rect x="170" y="8" width="80" height="24" fill="#fff" stroke="#14213d" stroke-width="2"/><text x="210" y="25" text-anchor="middle">R₁</text><line x1="250" y1="20" x2="320" y2="20" stroke="#14213d" stroke-width="2"/><line x1="100" y1="90" x2="170" y2="90" stroke="#14213d" stroke-width="2"/><rect x="170" y="78" width="80" height="24" fill="#fff" stroke="#14213d" stroke-width="2"/><text x="210" y="95" text-anchor="middle">R₂</text><line x1="250" y1="90" x2="320" y2="90" stroke="#14213d" stroke-width="2"/><line x1="320" y1="55" x2="400" y2="55" stroke="#14213d" stroke-width="2"/>`) },
      { titre: '4. Le diviseur de tension', html: TX`<p>Deux conducteurs en série sous une tension \(U\) : la tension aux bornes de \(R_1\) est \(U_1 = U\,\dfrac{R_1}{R_1 + R_2}\). C’est le principe du <b>potentiomètre</b> (rhéostat monté en diviseur), qui fournit une tension réglable.</p>` },
    ],
    formules: [
      { tex: TX`U = R\cdot I`, sens: 'Loi d’Ohm' },
      { tex: TX`R = \rho\,\dfrac{L}{S}`, sens: 'Résistance d’un fil' },
      { tex: TX`R_{éq} = R_1 + R_2`, sens: 'Association en série' },
      { tex: TX`\dfrac{1}{R_{éq}} = \dfrac{1}{R_1} + \dfrac{1}{R_2}`, sens: 'Association en dérivation' },
      { tex: TX`U_1 = U\,\dfrac{R_1}{R_1 + R_2}`, sens: 'Diviseur de tension' },
    ],
    retenir: [
      TX`Loi d’Ohm : \(U = RI\) ; caractéristique linéaire passant par l’origine.`,
      'En série, les résistances s’ajoutent.',
      'En dérivation, les inverses des résistances (conductances) s’ajoutent.',
      'R_éq série > chaque R ; R_éq dérivation < chaque R.',
      'Le diviseur de tension partage U proportionnellement aux résistances.',
    ],
    erreurs: [
      TX`Écrire \(R_{éq} = \dfrac{1}{R_1} + \dfrac{1}{R_2}\) : il faut inverser le résultat.`,
      'Additionner directement des résistances en dérivation.',
      TX`Oublier les kΩ (\(1\ \text{k}\Omega = 10^{3}\ \Omega\)) ou les mA.`,
      TX`Utiliser la section en \(\text{mm}^2\) dans \(R = \rho L/S\) sans conversion.`,
      'Appliquer le diviseur de tension quand un courant est prélevé entre les deux résistances.',
    ],
  },
  experiences: {
    sims: ['assoc', 'caract'],
    protocole: { titre: 'Mesurer une résistance équivalente', materiel: 'générateur réglable, deux conducteurs ohmiques (100 Ω et 220 Ω), ampèremètre, voltmètre, ohmmètre.',
      etapes: ['Tracer la caractéristique U = f(I) de chaque conducteur.', 'Les monter en série, mesurer U et I et calculer U/I.', 'Les monter en dérivation, mesurer U et I et calculer U/I.', 'Comparer avec les formules et avec l’ohmmètre.'] },
    observations: TX`<ul><li>Chaque caractéristique est une droite passant par l’origine.</li><li>En série : \(U/I \approx 320\ \Omega\) ; en dérivation : \(U/I \approx 69\ \Omega\).</li></ul>`,
    conclusion: TX`<p>\(R_{série} = R_1 + R_2\) et \(\dfrac{1}{R_{dériv}} = \dfrac{1}{R_1} + \dfrac{1}{R_2}\).</p>`,
  },
  quiz: [
    { q: TX`Deux conducteurs de 100 Ω et 300 Ω en série. \(R_{éq}\) :`, o: ['75 Ω', '400 Ω', '200 Ω', '30 kΩ'], r: 1, e: 'En série, les résistances s’ajoutent.' },
    { q: TX`Les mêmes en dérivation. \(R_{éq}\) :`, o: ['75 Ω', '400 Ω', '200 Ω', '0,013 Ω'], r: 0, e: TX`\(\dfrac{100\times300}{400} = 75\ \Omega\).` },
    { q: TX`Un conducteur de 47 Ω est traversé par 0,2 A. La tension :`, o: ['235 V', '9,4 V', '0,0043 V', '47,2 V'], r: 1, e: TX`\(U = 47\times0{,}2 = 9{,}4\ \text{V}\).` },
    { q: TX`Diviseur : \(U = 12\ \text{V}\), \(R_1 = 1\ \text{k}\Omega\), \(R_2 = 2\ \text{k}\Omega\). \(U_1\) :`, o: ['4 V', '8 V', '6 V', '12 V'], r: 0, e: TX`\(U_1 = 12\times\dfrac{1}{3} = 4\ \text{V}\).` },
    { q: 'Si on double la longueur d’un fil (même section), sa résistance :', o: ['double', 'est divisée par 2', 'reste la même', 'quadruple'], r: 0, e: TX`\(R = \rho L/S\) est proportionnelle à \(L\).` },
  ],
};
