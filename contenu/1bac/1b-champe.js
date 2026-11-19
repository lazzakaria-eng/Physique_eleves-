/* 1ʳᵉ Bac SM · Physique · Électrostatique · Champ électrostatique */
'use strict';
CONTENU['1b-champe'] = {
  resume: {
    intro: TX`Deux charges électriques exercent l’une sur l’autre une force (<b>loi de Coulomb</b>). Une charge modifie l’espace qui l’entoure : elle crée un <b>champ électrostatique</b> \(\vec E\), et toute charge \(q\) placée dans ce champ subit la force \(\vec F = q\vec E\).`,
    sections: [
      { titre: '1. Loi de Coulomb', html: TX`<p>Deux charges ponctuelles \(q_A\) et \(q_B\) à la distance \(r\) : forces de même droite d’action, de sens opposés, <b>répulsives</b> si les charges sont de même signe, <b>attractives</b> sinon, d’intensité :</p><p style="text-align:center">\(F = k\,\dfrac{|q_A\,q_B|}{r^2}\) avec \(k = 9\times10^{9}\ \text{N}\cdot\text{m}^2\cdot\text{C}^{-2}\)</p>` },
      { titre: '2. Champ électrostatique', sim: 'champE', html: TX`<p>En un point M, \(\vec E = \dfrac{\vec F}{q}\) (V/m ou N/C) : \(\vec F\) a le sens de \(\vec E\) si \(q > 0\), le sens opposé si \(q < 0\).</p>
<p>Champ créé par une charge ponctuelle \(Q\) à la distance \(r\) : \(E = k\,\dfrac{|Q|}{r^2}\), radial, dirigé vers l’extérieur si \(Q > 0\), vers \(Q\) si \(Q < 0\). Plusieurs charges : les champs s’<b>additionnent vectoriellement</b>.</p>` },
      { titre: '3. Lignes de champ et champ uniforme', html: TX`<p>Une <b>ligne de champ</b> est tangente à \(\vec E\) en chacun de ses points, orientée dans le sens de \(\vec E\). Entre deux plaques parallèles chargées (condensateur plan) soumises à la tension \(U\) et distantes de \(d\), le champ est <b>uniforme</b> : perpendiculaire aux plaques, de la plaque \(+\) vers la plaque \(-\), d’intensité \(E = \dfrac{U}{d}\).</p>`
        + FIG(360, 170, ARW('e1', '#1f6fe0') + `<rect x="40" y="20" width="280" height="10" fill="#d93a4a"/><text x="330" y="30" fill="#d93a4a" font-weight="bold">+</text><rect x="40" y="140" width="280" height="10" fill="#1f6fe0"/><text x="330" y="150" fill="#1f6fe0" font-weight="bold">−</text>${[70, 120, 170, 220, 270].map(x => `<line x1="${x}" y1="34" x2="${x}" y2="134" stroke="#1f6fe0" stroke-width="1.8" marker-end="url(#e1)"/>`).join('')}<text x="290" y="90" fill="#1f6fe0" font-weight="bold">E</text><text x="12" y="90">d</text>`) },
    ],
    formules: [
      { tex: TX`F = k\,\dfrac{|q_A\,q_B|}{r^2}`, sens: 'Loi de Coulomb (k = 9×10⁹ SI)' },
      { tex: TX`\vec F = q\,\vec E`, sens: 'Force subie par une charge dans un champ' },
      { tex: TX`E = k\,\dfrac{|Q|}{r^2}`, sens: 'Champ d’une charge ponctuelle' },
      { tex: TX`E = \dfrac{U}{d}`, sens: 'Champ uniforme entre deux plaques' },
    ],
    retenir: [
      'Charges de même signe : répulsion ; de signes contraires : attraction.',
      'Le champ s’exprime en V/m (ou N/C).',
      'Pour q < 0, la force est opposée au champ.',
      'Entre deux plaques, le champ est uniforme, du + vers le −.',
      'Les champs de plusieurs charges s’ajoutent vectoriellement.',
    ],
    erreurs: [
      'Additionner les intensités des champs au lieu des vecteurs.',
      'Oublier la valeur absolue dans la loi de Coulomb.',
      'Orienter la force sur un électron dans le sens du champ.',
      TX`Oublier de convertir les µC (\(10^{-6}\ \text{C}\)) et les cm.`,
    ],
  },
  experiences: {
    sims: ['champE'],
    protocole: { titre: 'Observer l’effet d’un champ électrique', materiel: 'pendule électrostatique, bâton frotté, condensateur plan sous haute tension (démonstration), simulation « champ ».',
      etapes: ['Approcher un bâton électrisé d’un pendule électrostatique léger.', 'Dans la simulation, faire varier U et d entre les plaques et observer la trajectoire d’une particule chargée.', 'Changer le signe de la charge de la particule.'] },
    observations: TX`<ul><li>Le pendule est attiré puis repoussé après contact.</li><li>La particule est déviée vers la plaque de signe opposé ; la déviation augmente avec U et diminue avec d.</li></ul>`,
    conclusion: TX`<p>Une charge dans un champ subit \(\vec F = q\vec E\) ; entre deux plaques, \(E = U/d\).</p>`,
  },
  quiz: [
    { q: TX`Deux charges de 1 µC à 3 cm. F :`, o: ['10 N', '3 N', '0,3 N', '30 N'], r: 0, e: TX`\(9\times10^{9}\times10^{-12}/(9\times10^{-4}) = 10\ \text{N}\).` },
    { q: 'Si la distance double, la force de Coulomb est :', o: ['doublée', 'divisée par 2', 'divisée par 4', 'inchangée'], r: 2, e: 'Elle varie en 1/r².' },
    { q: TX`\(U = 200\ \text{V}\), \(d = 4\ \text{cm}\). Champ :`, o: ['50 V/m', '5000 V/m', '8 V/m', '800 V/m'], r: 1, e: TX`\(200/0{,}04\).` },
    { q: 'Un électron dans un champ uniforme subit une force :', o: ['dans le sens de E', 'opposée à E', 'perpendiculaire à E', 'nulle'], r: 1, e: 'q < 0.' },
    { q: 'L’unité du champ électrostatique :', o: ['V/m', 'C', 'N·m', 'V'], r: 0, e: 'Ou N/C.' },
  ],
};
