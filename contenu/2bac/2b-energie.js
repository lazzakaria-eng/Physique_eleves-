/* 2ᵉ Bac PC/SM · Physique · Mécanique · Aspects énergétiques des oscillations mécaniques */
'use strict';
CONTENU['2b-energie'] = {
  resume: {
    intro: TX`Au cours des oscillations, l’énergie passe de la forme cinétique à la forme potentielle (élastique, de torsion ou de pesanteur). Sans frottement, l’<b>énergie mécanique se conserve</b> ; avec frottement, elle diminue.`,
    sections: [
      { titre: '1. Travail de la tension d’un ressort', html: TX`<p>Quand l’allongement passe de \(x_1\) à \(x_2\) : \(W(\vec T) = \dfrac{1}{2}k\,(x_1^2 - x_2^2)\). Ce travail ne dépend que des positions : on lui associe l’énergie potentielle élastique \(E_{pe} = \dfrac{1}{2}k\,x^2\) (référence : ressort au repos).</p>` },
      { titre: '2. Pendule élastique', sim: 'oscillateur', html: TX`<p>\(E_m = \dfrac{1}{2}mv^2 + \dfrac{1}{2}kx^2 = \dfrac{1}{2}kX_m^2 = \dfrac{1}{2}mV_m^2\) (constante sans frottement). Aux extrémités \(E_c = 0\) ; au passage par l’équilibre \(E_{pe} = 0\).</p>`
        + FIG(440, 190, `<line x1="40" y1="170" x2="420" y2="170" stroke="#5b6577"/><line x1="230" y1="180" x2="230" y2="10" stroke="#5b6577"/><text x="410" y="188">x</text><text x="236" y="20">E</text><path d="M60 40 Q 230 300 400 40" fill="none" stroke="#d93a4a" stroke-width="3"/><path d="M60 170 Q 230 -90 400 170" fill="none" stroke="#1f6fe0" stroke-width="3"/><line x1="60" y1="40" x2="400" y2="40" stroke="#12946a" stroke-width="3" stroke-dasharray="6 4"/><text x="70" y="34" fill="#12946a" font-size="11">E_m</text><text x="80" y="110" fill="#d93a4a" font-size="11">E_pe</text><text x="250" y="80" fill="#1f6fe0" font-size="11">E_c</text><text x="50" y="186" font-size="11">−X_m</text><text x="390" y="186" font-size="11">X_m</text>`) },
      { titre: '3. Pendule de torsion et pendule pesant', sim: 'pendule', html: TX`<p>Torsion : \(E_{pt} = \dfrac{1}{2}C\theta^2\), \(E_m = \dfrac{1}{2}J_\Delta\dot\theta^2 + \dfrac{1}{2}C\theta^2\). Pendule pesant : \(E_{pp} = mgd\,(1 - \cos\theta)\) (référence à l’équilibre) ; pour de petits angles \(E_{pp} \approx \tfrac12 mgd\,\theta^2\).</p>` },
      { titre: '4. Amortissement', html: TX`<p>Avec frottements, \(E_m\) diminue : l’énergie perdue est dissipée en chaleur ; l’amplitude décroît.</p>` },
    ],
    formules: [
      { tex: TX`W(\vec T) = \dfrac{1}{2}k\,(x_1^2 - x_2^2)`, sens: 'Travail de la tension du ressort' },
      { tex: TX`E_{pe} = \dfrac{1}{2}k\,x^2`, sens: 'Énergie potentielle élastique' },
      { tex: TX`E_m = \dfrac{1}{2}mv^2 + \dfrac{1}{2}kx^2 = \dfrac{1}{2}kX_m^2`, sens: 'Énergie mécanique du pendule élastique' },
      { tex: TX`E_m = \dfrac{1}{2}J_\Delta\dot\theta^2 + \dfrac{1}{2}C\theta^2`, sens: 'Pendule de torsion' },
      { tex: TX`E_{pp} = m\,g\,d\,(1 - \cos\theta)`, sens: 'Pendule pesant' },
    ],
    retenir: [
      'Sans frottement, E_m constante : échange entre E_c et E_p.',
      'E_m = ½kX_m² : proportionnelle au carré de l’amplitude.',
      'V_m = X_m·√(k/m) = 2πX_m/T₀.',
      'Avec frottement, l’amplitude diminue.',
    ],
    erreurs: [
      'Oublier le carré de x.',
      'Confondre x (position) et X_m (amplitude).',
      TX`Écrire \(E_{pp} = mgd\cos\theta\).`,
    ],
  },
  experiences: {
    sims: ['oscillateur', 'pendule', 'energie'],
    protocole: { titre: 'Énergies d’un pendule élastique', materiel: 'mobile sur banc à coussin d’air relié à un ressort, capteur de position, tableur (ou simulation).',
      etapes: ['Écarter le mobile de X_m et le lâcher.', 'Enregistrer x(t) et calculer v(t).', TX`Calculer \(E_c\), \(E_{pe}\) et \(E_m\) et tracer leurs évolutions.`, 'Ajouter un frottement dans la simulation.'] },
    observations: TX`<ul><li>\(E_c\) et \(E_{pe}\) oscillent à la période \(T_0/2\), en opposition.</li><li>\(E_m\) reste constante sans frottement, décroît avec frottement.</li></ul>`,
    conclusion: TX`<p>\(E_m = \tfrac12 kX_m^2\) se conserve sans frottement.</p>`,
  },
  quiz: [
    { q: TX`k = 50 N/m, X_m = 4 cm. E_m :`, o: ['0,04 J', '0,08 J', '1 J', '4 J'], r: 0, e: TX`\(\tfrac12\times50\times0{,}0016\).` },
    { q: 'Au passage par la position d’équilibre, l’énergie cinétique est :', o: ['nulle', 'maximale', 'égale à E_pe', 'négative'], r: 1, e: 'E_pe = 0.' },
    { q: 'Si l’amplitude double, E_m :', o: ['double', 'quadruple', 'ne change pas', 'est divisée par 2'], r: 1, e: 'E_m ∝ X_m².' },
    { q: TX`m = 0,5 kg, E_m = 0,25 J. V_m :`, o: ['1 m/s', '0,5 m/s', '0,25 m/s', '2 m/s'], r: 0, e: TX`\(\sqrt{2\times0{,}25/0{,}5}\).` },
    { q: 'Avec frottement, l’énergie perdue devient :', o: ['énergie potentielle', 'énergie thermique', 'énergie nucléaire', 'rien'], r: 1, e: 'Dissipation.' },
  ],
};
