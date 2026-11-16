/* Tronc Commun · Physique · Électricité · L’amplificateur opérationnel */
'use strict';
CONTENU['tc-aop'] = {
  resume: {
    intro: TX`L’<b>amplificateur opérationnel</b> (AOP) est un circuit intégré à deux entrées (\(E^+\) non inverseuse, \(E^-\) inverseuse) et une sortie S. Alimenté (souvent \(\pm15\ \text{V}\)), il permet de réaliser des montages amplificateurs, suiveurs, sommateurs…`,
    sections: [
      { titre: '1. Description et modèle idéal', html: TX`<p>Les courants d’entrée sont pratiquement nuls : \(i^+ = i^- = 0\). La tension de sortie est limitée : \(-U_{sat} \le U_s \le +U_{sat}\) (un peu moins que la tension d’alimentation). On note \(\varepsilon = V_{E^+} - V_{E^-}\) la tension d’entrée différentielle.</p>`
        + FIG(320, 130, `<polygon points="100,20 100,110 210,65" fill="#fff" stroke="#14213d" stroke-width="2"/><line x1="50" y1="45" x2="100" y2="45" stroke="#14213d" stroke-width="2"/><line x1="50" y1="88" x2="100" y2="88" stroke="#14213d" stroke-width="2"/><line x1="210" y1="65" x2="270" y2="65" stroke="#14213d" stroke-width="2"/><text x="106" y="50">−</text><text x="106" y="93">+</text><text x="30" y="49">E⁻</text><text x="30" y="92">E⁺</text><text x="276" y="69">S</text><text x="140" y="70" font-size="12">∞</text>`) },
      { titre: '2. Régimes de fonctionnement', sim: 'aop', html: TX`<ul><li><b>Régime linéaire</b> (sortie reliée à \(E^-\) par une résistance : contre-réaction) : \(\varepsilon = 0\), donc \(V_{E^+} = V_{E^-}\).</li><li><b>Régime saturé</b> (pas de contre-réaction ou entrée trop grande) : \(U_s = +U_{sat}\) si \(\varepsilon > 0\), \(U_s = -U_{sat}\) si \(\varepsilon < 0\). La sortie est « écrêtée ».</li></ul>` },
      { titre: '3. Montages amplificateurs', html: TX`<ul><li><b>Inverseur</b> : \(U_s = -\dfrac{R_2}{R_1}\,U_e\) (gain \(-R_2/R_1\)).</li><li><b>Non inverseur</b> : \(U_s = \Big(1 + \dfrac{R_2}{R_1}\Big)U_e\).</li><li><b>Suiveur</b> : \(U_s = U_e\) (sert d’adaptateur d’impédance).</li><li><b>Sommateur inverseur</b> : \(U_s = -R\Big(\dfrac{U_1}{R_1} + \dfrac{U_2}{R_2}\Big)\).</li></ul>
<p>Démonstration (inverseur) : \(V_{E^-} = 0\) ; le même courant traverse \(R_1\) et \(R_2\) : \(\dfrac{U_e}{R_1} = -\dfrac{U_s}{R_2}\).</p>` },
    ],
    formules: [
      { tex: TX`i^+ = i^- = 0`, sens: 'Courants d’entrée nuls' },
      { tex: TX`\varepsilon = V_{E^+} - V_{E^-} = 0`, sens: 'Régime linéaire' },
      { tex: TX`U_s = -\dfrac{R_2}{R_1}\,U_e`, sens: 'Amplificateur inverseur' },
      { tex: TX`U_s = \Big(1 + \dfrac{R_2}{R_1}\Big)U_e`, sens: 'Amplificateur non inverseur' },
      { tex: TX`U_s = \pm U_{sat}`, sens: 'Régime saturé' },
    ],
    retenir: [
      'Courants d’entrée nuls ; sortie limitée à ±U_sat.',
      'Linéaire (contre-réaction sur E⁻) : V(E⁺) = V(E⁻).',
      'Saturé : le signe de ε fixe la sortie (+U_sat ou −U_sat).',
      'Inverseur : gain −R₂/R₁ ; non inverseur : 1 + R₂/R₁ ; suiveur : 1.',
      'Si |U_s| calculée dépasse U_sat, la sortie est écrêtée.',
    ],
    erreurs: [
      'Oublier le signe moins de l’inverseur.',
      TX`Donner \(U_s = -\dfrac{R_2}{R_1}U_e\) même quand le résultat dépasse \(U_{sat}\).`,
      'Supposer ε = 0 sans contre-réaction.',
      'Inverser R₁ et R₂ dans le gain.',
    ],
  },
  experiences: {
    sims: ['aop'],
    protocole: { titre: 'Étudier l’amplificateur inverseur', materiel: 'AOP (TL081) alimenté en ±15 V, R₁ = 10 kΩ, R₂ = 22 kΩ, GBF, oscilloscope deux voies.',
      etapes: ['Réaliser le montage inverseur et visualiser U_e (voie 1) et U_s (voie 2).', 'Mesurer les amplitudes et calculer U_s / U_e.', 'Augmenter l’amplitude de U_e jusqu’à observer l’écrêtage.', 'Comparer avec la simulation (modes inverseur, non inverseur, comparateur).'] },
    observations: TX`<ul><li>\(U_s\) est en opposition de phase avec \(U_e\) et environ 2,2 fois plus grande.</li><li>Au-delà d’environ ±14 V, le sommet de la sinusoïde est coupé.</li></ul>`,
    conclusion: TX`<p>En régime linéaire, \(U_s = -\dfrac{R_2}{R_1}U_e\) ; quand ce calcul dépasse \(U_{sat}\), l’AOP sature.</p>`,
  },
  quiz: [
    { q: TX`Inverseur, \(R_1 = 10\ \text{k}\Omega\), \(R_2 = 50\ \text{k}\Omega\), \(U_e = 1\ \text{V}\). \(U_s\) :`, o: ['5 V', '−5 V', '6 V', '−0,2 V'], r: 1, e: TX`\(U_s = -5\times1 = -5\ \text{V}\).` },
    { q: 'Non inverseur avec les mêmes résistances et U_e = 1 V. U_s :', o: ['5 V', '6 V', '−6 V', '0,2 V'], r: 1, e: TX`\((1 + 5)\times1 = 6\ \text{V}\).` },
    { q: TX`Inverseur de gain −10, \(U_e = 2\ \text{V}\), \(U_{sat} = 14\ \text{V}\). \(U_s\) :`, o: ['−20 V', '−14 V', '20 V', '14 V'], r: 1, e: 'Le calcul donne −20 V : la sortie sature à −14 V.' },
    { q: 'En régime linéaire, on a :', o: ['ε = U_sat', 'V(E⁺) = V(E⁻)', 'i⁺ = U_s / R', 'U_s = 0'], r: 1, e: 'ε = 0.' },
    { q: 'Un montage suiveur a un gain de :', o: ['0', '1', '−1', '∞'], r: 1, e: TX`\(U_s = U_e\).` },
  ],
};
