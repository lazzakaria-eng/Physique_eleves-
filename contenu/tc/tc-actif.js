/* Tronc Commun · Physique · Électricité · Caractéristique d’un dipôle actif */
'use strict';
CONTENU['tc-actif'] = {
  resume: {
    intro: TX`Un <b>dipôle actif</b> (pile, batterie, générateur) a une tension non nulle à ses bornes même quand il ne débite pas. Sa caractéristique est une droite décroissante : \(U_{PN} = E - r\,I\).`,
    sections: [
      { titre: '1. Caractéristique d’un générateur', sim: 'generateur', html: TX`<p>Pour une pile, la tension aux bornes diminue quand l’intensité débitée augmente :</p><p style="text-align:center">\(U_{PN} = E - r\cdot I\)</p>
<p>\(E\) : <b>force électromotrice</b> (f.é.m.), tension à vide (\(I = 0\)) ; \(r\) : <b>résistance interne</b> (pente de la droite, en valeur absolue). Intensité de court-circuit (\(U = 0\)) : \(I_{cc} = \dfrac{E}{r}\).</p>`
        + FIG(360, 170, `<line x1="40" y1="140" x2="340" y2="140" stroke="#5b6577" stroke-width="1.5"/><line x1="40" y1="150" x2="40" y2="10" stroke="#5b6577" stroke-width="1.5"/><text x="330" y="158">I</text><text x="46" y="20">U</text><line x1="40" y1="30" x2="300" y2="140" stroke="#1f6fe0" stroke-width="3"/><text x="10" y="34">E</text><text x="290" y="158">I_cc</text><text x="170" y="70" fill="#1f6fe0">pente −r</text>`) },
      { titre: '2. Récepteur actif (électrolyseur, moteur)', html: TX`<p>Un électrolyseur ou un moteur a pour caractéristique \(U_{AB} = E' + r'\,I\) : \(E'\) est sa <b>force contre-électromotrice</b> (f.c.é.m.) et \(r'\) sa résistance interne. Il ne fonctionne (courant non nul) que si \(U > E'\).</p>` },
      { titre: '3. Point de fonctionnement', html: TX`<p>Le générateur branché à un récepteur impose \(U_{PN} = U_{AB}\) et la même intensité. Graphiquement : intersection des deux caractéristiques. Pour un conducteur ohmique \(R\) : \(E - rI = RI\), d’où \(I = \dfrac{E}{R + r}\).</p>` },
      { titre: '4. Loi de Pouillet', sim: 'bilan', html: TX`<p>Dans un circuit série comportant des générateurs (f.é.m. \(E\)), des récepteurs actifs (f.c.é.m. \(E'\)) et des résistances :</p><p style="text-align:center">\(I = \dfrac{\sum E - \sum E'}{\sum R}\)</p>
<p>où \(\sum R\) comprend toutes les résistances, y compris les résistances internes.</p>` },
      { titre: '5. Association de générateurs', html: TX`<p>En série (bornes + reliées à −) : \(E_{éq} = \sum E_i\) et \(r_{éq} = \sum r_i\). Des générateurs identiques en dérivation : même \(E\), \(r_{éq} = r/n\).</p>` },
    ],
    formules: [
      { tex: TX`U_{PN} = E - r\cdot I`, sens: 'Loi d’Ohm pour un générateur' },
      { tex: TX`I_{cc} = \dfrac{E}{r}`, sens: 'Intensité de court-circuit' },
      { tex: TX`U_{AB} = E' + r'\cdot I`, sens: 'Récepteur actif' },
      { tex: TX`I = \dfrac{\sum E - \sum E'}{\sum R}`, sens: 'Loi de Pouillet' },
      { tex: TX`I = \dfrac{E}{R + r}`, sens: 'Générateur + conducteur ohmique' },
    ],
    retenir: [
      'E est la tension à vide ; r la résistance interne.',
      'La tension aux bornes d’un générateur diminue quand il débite plus.',
      TX`Un récepteur actif ne fonctionne que si \(U > E'\).`,
      'Point de fonctionnement : intersection des caractéristiques.',
      'Loi de Pouillet : toutes les résistances (internes comprises) au dénominateur.',
    ],
    erreurs: [
      'Oublier la résistance interne dans la loi de Pouillet.',
      'Confondre f.é.m. du générateur et f.c.é.m. du récepteur.',
      'Lire E sur l’axe des I.',
      'Additionner les f.é.m. de générateurs branchés en opposition.',
      TX`Croire que \(U_{PN} = E\) quand le générateur débite.`,
    ],
  },
  experiences: {
    sims: ['generateur', 'bilan'],
    protocole: { titre: 'Tracer la caractéristique d’une pile', materiel: 'pile plate 4,5 V, rhéostat, résistance de protection 10 Ω, ampèremètre, voltmètre, interrupteur.',
      etapes: ['Mesurer la tension à vide de la pile (circuit ouvert).', 'Brancher la pile sur le rhéostat et la résistance de protection, avec l’ampèremètre en série et le voltmètre aux bornes de la pile.', 'Faire varier le rhéostat et relever (I, U) rapidement.', 'Tracer U = f(I), lire E et calculer r (pente).'] },
    observations: TX`<ul><li>À vide, la tension vaut environ 4,5 V.</li><li>Quand \(I\) augmente, \(U\) diminue ; les points sont alignés sur une droite décroissante.</li></ul>`,
    conclusion: TX`<p>La pile vérifie \(U_{PN} = E - rI\) : \(E\) est l’ordonnée à l’origine et \(r\) l’opposé de la pente.</p>`,
  },
  quiz: [
    { q: TX`Une pile a \(E = 4{,}5\ \text{V}\) et \(r = 1{,}5\ \Omega\). Pour \(I = 0{,}4\ \text{A}\), \(U_{PN}\) :`, o: ['4,5 V', '3,9 V', '5,1 V', '0,6 V'], r: 1, e: TX`\(4{,}5 - 1{,}5\times0{,}4 = 3{,}9\ \text{V}\).` },
    { q: 'Son intensité de court-circuit :', o: ['3 A', '6,75 A', '0,33 A', '4,5 A'], r: 0, e: TX`\(I_{cc} = 4{,}5/1{,}5 = 3\ \text{A}\).` },
    { q: TX`Cette pile alimente \(R = 7{,}5\ \Omega\). L’intensité :`, o: ['0,6 A', '0,5 A', '3 A', '0,45 A'], r: 1, e: TX`\(I = \dfrac{4{,}5}{7{,}5 + 1{,}5} = 0{,}5\ \text{A}\).` },
    { q: 'La f.é.m. E se lit sur la caractéristique U = f(I) :', o: ['à l’intersection avec l’axe des U', 'à l’intersection avec l’axe des I', 'sur la pente', 'au milieu'], r: 0, e: 'E est la tension pour I = 0.' },
    { q: TX`Générateur \(E = 12\ \text{V}\), moteur \(E' = 6\ \text{V}\), résistance totale 3 Ω. \(I\) :`, o: ['6 A', '2 A', '4 A', '18 A'], r: 1, e: TX`\(I = \dfrac{12 - 6}{3} = 2\ \text{A}\).` },
  ],
};
