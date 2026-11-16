/* 2ᵉ Bac · Physique · Électricité · Oscillations libres d’un circuit RLC série */
'use strict';
CONTENU['2b-rlc'] = {
  resume: {
    intro: TX`Un condensateur chargé qui se décharge dans une bobine donne des <b>oscillations électriques libres</b> : l’énergie passe du condensateur à la bobine et inversement. La résistance du circuit dissipe de l’énergie : les oscillations s’amortissent.`,
    sections: [
      { titre: '1. Régimes d’oscillation', sim: 'rlc', html: TX`<ul><li><b>Périodique</b> (R = 0, cas idéal) : oscillations sinusoïdales d’amplitude constante.</li><li><b>Pseudo-périodique</b> (R faible) : oscillations d’amplitude décroissante, de pseudo-période \(T \approx T_0\).</li><li><b>Apériodique</b> (R grande) : pas d’oscillation.</li></ul>` },
      { titre: '2. Circuit LC idéal', html: TX`<p>\(\dfrac{d^2u_C}{dt^2} + \dfrac{1}{LC}\,u_C = 0\) ; solution \(u_C = U_m\cos\Big(\dfrac{2\pi}{T_0}t + \varphi\Big)\), avec la <b>période propre</b> \(T_0 = 2\pi\sqrt{LC}\). De même \(q = Q_m\cos(2\pi t/T_0 + \varphi)\).</p>`
        + FIG(440, 170, `<line x1="30" y1="85" x2="420" y2="85" stroke="#5b6577"/><polyline points="${Array.from({ length: 195 }, (_, i) => (30 + i * 2) + ',' + (85 - 65 * Math.exp(-i / 140) * Math.cos(2 * Math.PI * i / 48)).toFixed(1)).join(' ')}" fill="none" stroke="#1f6fe0" stroke-width="2.6"/><text x="300" y="30" font-size="12">régime pseudo-périodique</text>`) },
      { titre: '3. Énergie totale', html: TX`<p>\(\mathcal E = \dfrac{1}{2}C\,u_C^2 + \dfrac{1}{2}L\,i^2\). Sans résistance, \(\mathcal E\) est constante (échange entre énergie électrique et magnétique). Avec résistance : \(\dfrac{d\mathcal E}{dt} = -R\,i^2 < 0\) (effet Joule).</p>` },
      { titre: '4. Entretien des oscillations', html: TX`<p>Un générateur qui fournit une tension \(u_g = R_0\,i\) compense les pertes si \(R_0 = R\) : on obtient des oscillations sinusoïdales de période \(T_0\).</p>` },
    ],
    formules: [
      { tex: TX`\dfrac{d^2u_C}{dt^2} + \dfrac{R}{L}\,\dfrac{du_C}{dt} + \dfrac{1}{LC}\,u_C = 0`, sens: 'Équation différentielle (RLC)' },
      { tex: TX`T_0 = 2\pi\sqrt{L\,C}`, sens: 'Période propre' },
      { tex: TX`q = Q_m\cos\Big(\dfrac{2\pi}{T_0}t + \varphi\Big)`, sens: 'Solution (LC)' },
      { tex: TX`\mathcal E = \dfrac{1}{2}C\,u_C^2 + \dfrac{1}{2}L\,i^2`, sens: 'Énergie totale' },
      { tex: TX`\dfrac{d\mathcal E}{dt} = -R\,i^2`, sens: 'Dissipation par effet Joule' },
    ],
    retenir: [
      'LC : oscillations sinusoïdales de période T₀ = 2π√(LC).',
      'R faible : pseudo-périodique ; R grande : apériodique.',
      'L’énergie passe du condensateur à la bobine.',
      'Entretien : générateur de « résistance négative » R₀ = R.',
    ],
    erreurs: [
      TX`Oublier la racine : \(T_0 = 2\pi\sqrt{LC}\), pas \(2\pi LC\).`,
      'Confondre amortissement et période.',
      'Croire que l’énergie totale se conserve avec R ≠ 0.',
    ],
  },
  experiences: {
    sims: ['rlc'],
    protocole: { titre: 'Décharge d’un condensateur dans une bobine', materiel: 'C = 1 µF chargé sous 6 V, bobine L = 0,1 H, résistance variable, interface.',
      etapes: [TX`Enregistrer \(u_C(t)\) avec R = 0 (résistance de la bobine seule).`, 'Mesurer la pseudo-période.', 'Augmenter R et observer.', TX`Comparer T à \(2\pi\sqrt{LC}\).`] },
    observations: TX`<ul><li>Oscillations amorties de pseudo-période ≈ 2 ms.</li><li>Plus R est grande, plus l’amortissement est rapide ; au-delà d’une valeur, plus d’oscillation.</li></ul>`,
    conclusion: TX`<p>\(T \approx T_0 = 2\pi\sqrt{LC} \approx 2{,}0\ \text{ms}\) ; la résistance dissipe l’énergie.</p>`,
  },
  quiz: [
    { q: TX`L = 0,1 H, C = 1 µF. T₀ ≈`, o: ['2,0 ms', '0,63 ms', '20 ms', '0,2 s'], r: 0, e: TX`\(2\pi\sqrt{10^{-7}}\).` },
    { q: 'Si on quadruple C, T₀ :', o: ['quadruple', 'double', 'est divisée par 2', 'ne change pas'], r: 1, e: 'T₀ ∝ √C.' },
    { q: 'Quand u_C est maximale, l’intensité est :', o: ['maximale', 'nulle', 'égale à u_C/R', 'négative'], r: 1, e: 'Toute l’énergie est dans le condensateur.' },
    { q: 'Une grande résistance donne un régime :', o: ['périodique', 'pseudo-périodique', 'apériodique', 'forcé'], r: 2, e: 'Pas d’oscillation.' },
    { q: 'L’énergie perdue est dissipée par :', o: ['le condensateur', 'la bobine idéale', 'effet Joule', 'rayonnement uniquement'], r: 2, e: 'dℰ/dt = −Ri².' },
  ],
};
