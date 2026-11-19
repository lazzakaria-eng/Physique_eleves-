/* Tronc Commun · Physique · Électricité · Le courant électrique continu */
'use strict';
CONTENU['tc-courant'] = {
  resume: {
    intro: TX`Le courant électrique est un <b>déplacement d’ensemble de porteurs de charge</b> : électrons libres dans les métaux, ions dans les solutions. Son intensité \(I\) mesure la quantité d’électricité qui traverse une section du circuit par seconde.`,
    sections: [
      { titre: '1. Nature et sens du courant', sim: 'courant', html: TX`<ul><li>Dans un métal : les <b>électrons libres</b> se déplacent de la borne \(-\) vers la borne \(+\) du générateur, à l’extérieur de celui-ci.</li><li>Dans une solution ionique (électrolyte) : les <b>cations</b> se déplacent dans le sens du courant, les <b>anions</b> en sens inverse.</li><li><b>Sens conventionnel</b> : à l’extérieur du générateur, le courant va de la borne \(+\) vers la borne \(-\) (sens inverse des électrons).</li></ul>`
        + FIG(440, 140, ARW('c1') + ARW('c1b', '#1f6fe0') + `<rect x="40" y="20" width="360" height="100" fill="none" stroke="#14213d" stroke-width="2.5"/><rect x="190" y="110" width="60" height="20" fill="#fff"/><line x1="205" y1="104" x2="205" y2="136" stroke="#14213d" stroke-width="3"/><line x1="235" y1="110" x2="235" y2="130" stroke="#14213d" stroke-width="6"/><text x="196" y="100">+</text><text x="240" y="100">−</text><circle cx="220" cy="20" r="12" fill="#ffd27a" stroke="#14213d"/><line x1="70" y1="50" x2="70" y2="90" stroke="#d93a4a" stroke-width="2.5" marker-end="url(#c1)"/><text x="80" y="74" fill="#d93a4a" font-weight="bold">I (conventionnel)</text><line x1="370" y1="50" x2="370" y2="90" stroke="#1f6fe0" stroke-width="2.5" marker-end="url(#c1b)"/><text x="364" y="74" text-anchor="end" fill="#1f6fe0" font-weight="bold">électrons e⁻</text>`) },
      { titre: '2. Quantité d’électricité et intensité', html: TX`<p>La charge élémentaire est \(e = 1{,}6\times10^{-19}\ \text{C}\). Si \(n\) électrons traversent une section, la quantité d’électricité est \(Q = n\cdot e\) (en coulombs C).</p>
<p>L’<b>intensité</b> du courant est le débit de charges : \(I = \dfrac{Q}{\Delta t}\), en ampères (A). \(1\ \text{A}\cdot\text{h} = 3600\ \text{C}\) (capacité des batteries).</p>` },
      { titre: '3. Mesure de l’intensité', html: TX`<p>On mesure \(I\) avec un <b>ampèremètre</b> branché <b>en série</b>, le courant entrant par la borne A (ou mA) et sortant par la borne COM. On commence par le plus grand calibre. Mesure d’un appareil à aiguille : \(I = \dfrac{C\cdot n}{n_0}\) (C : calibre ; n : lecture ; \(n_0\) : nombre total de divisions). Incertitude : \(\Delta I = \dfrac{\text{classe}\times C}{100}\).</p>` },
      { titre: '4. Lois des intensités', sim: 'assoc', html: TX`<ul><li><b>Circuit série</b> : l’intensité est la même en tout point.</li><li><b>Loi des nœuds</b> : la somme des intensités des courants qui arrivent à un nœud est égale à la somme des intensités des courants qui en partent : \(\sum I_{entrants} = \sum I_{sortants}\).</li></ul>`
        + FIG(380, 120, ARW('c2') + `<circle cx="190" cy="60" r="6" fill="#14213d"/><text x="190" y="88" text-anchor="middle">N</text>${VEC(60, 60, 182, 60, 'I₁', '#d93a4a', 'c2')}${VEC(196, 56, 330, 15, 'I₂', '#1f6fe0', 'c2')}${VEC(196, 64, 330, 105, 'I₃', '#1f6fe0', 'c2')}<text x="20" y="114">I₁ = I₂ + I₃</text>`) },
    ],
    formules: [
      { tex: TX`Q = n\cdot e`, sens: 'Quantité d’électricité (C)' },
      { tex: TX`e = 1{,}6\times10^{-19}\ \text{C}`, sens: 'Charge élémentaire' },
      { tex: TX`I = \dfrac{Q}{\Delta t}`, sens: 'Intensité du courant (A)' },
      { tex: TX`\sum I_{entrants} = \sum I_{sortants}`, sens: 'Loi des nœuds' },
      { tex: TX`I = \dfrac{C\cdot n}{n_0}`, sens: 'Lecture d’un ampèremètre à aiguille' },
    ],
    retenir: [
      'Dans les métaux, le courant est dû aux électrons ; dans les solutions, aux ions.',
      'Sens conventionnel : de + vers − à l’extérieur du générateur ; les électrons vont en sens inverse.',
      TX`\(I = Q/\Delta t\) ; l’ampèremètre se branche en série.`,
      'Dans un circuit série, l’intensité est la même partout.',
      'Loi des nœuds : ce qui entre dans un nœud en ressort.',
    ],
    erreurs: [
      'Brancher l’ampèremètre en dérivation (risque de court-circuit).',
      'Confondre sens des électrons et sens conventionnel.',
      TX`Oublier de convertir les durées en secondes ou les mA en A.`,
      'Penser que le courant « s’use » en traversant une lampe.',
      TX`Oublier que \(1\ \text{A}\cdot\text{h} = 3600\ \text{C}\).`,
    ],
  },
  experiences: {
    sims: ['courant', 'assoc'],
    protocole: { titre: 'Vérifier la loi des nœuds', materiel: 'générateur 6 V, deux lampes, conducteurs ohmiques, trois ampèremètres, fils.',
      etapes: ['Monter deux lampes en dérivation aux bornes du générateur.', TX`Placer un ampèremètre dans la branche principale (\(I_1\)) et un dans chaque branche dérivée (\(I_2\), \(I_3\)).`, 'Fermer l’interrupteur et relever les trois intensités.', TX`Comparer \(I_1\) et \(I_2 + I_3\) ; recommencer avec d’autres récepteurs.`] },
    observations: TX`<ul><li>Dans une même branche, l’intensité ne dépend pas de la place de l’ampèremètre.</li><li>On trouve toujours \(I_1 \approx I_2 + I_3\), aux incertitudes de mesure près.</li></ul>`,
    conclusion: TX`<p>L’intensité est la même en tout point d’un circuit série, et en un nœud : \(\sum I_{entrants} = \sum I_{sortants}\) (conservation de la charge).</p>`,
  },
  quiz: [
    { q: 'Dans un fil métallique, le courant est dû au déplacement :', o: ['des protons', 'des électrons libres', 'des ions', 'des neutrons'], r: 1, e: 'Les métaux possèdent des électrons libres.' },
    { q: 'À l’extérieur du générateur, le sens conventionnel du courant va :', o: ['de − vers +', 'de + vers −', 'dans les deux sens', 'il n’y a pas de sens'], r: 1, e: 'Les électrons vont de − vers +, en sens inverse.' },
    { q: TX`Une charge de 30 C traverse un fil en 1 min. L’intensité vaut :`, o: ['30 A', '0,5 A', '2 A', '1800 A'], r: 1, e: TX`\(I = \dfrac{30}{60} = 0{,}5\ \text{A}\).` },
    { q: TX`Au nœud N arrivent 0,8 A ; une branche sortante porte 0,3 A. L’autre porte :`, o: ['1,1 A', '0,5 A', '0,3 A', '0,8 A'], r: 1, e: TX`\(0{,}8 = 0{,}3 + I \Rightarrow I = 0{,}5\ \text{A}\).` },
    { q: 'Un ampèremètre se branche :', o: ['en dérivation', 'en série', 'aux bornes du générateur', 'n’importe comment'], r: 1, e: 'Il doit être traversé par le courant à mesurer.' },
    { q: TX`Le nombre d’électrons correspondant à \(Q = 1{,}6\ \text{C}\) :`, o: [TX`\(10^{19}\)`, TX`\(1{,}6\times10^{19}\)`, TX`\(10^{-19}\)`, TX`\(2{,}56\times10^{-19}\)`], r: 0, e: TX`\(n = \dfrac{Q}{e} = \dfrac{1{,}6}{1{,}6\times10^{-19}} = 10^{19}\).` },
  ],
};
