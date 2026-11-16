/* 2ᵉ Bac · Chimie · Suivi temporel d’une transformation – Vitesse de réaction */
'use strict';
CONTENU['2bc-vitesse'] = {
  resume: {
    intro: TX`On suit l’avancement \(x(t)\) d’une transformation lente par une méthode physique (pression, conductimétrie, spectrophotométrie) ou chimique (titrage après trempe). On en déduit la <b>vitesse volumique de réaction</b> et le <b>temps de demi-réaction</b>.`,
    sections: [
      { titre: '1. Méthodes de suivi', sim: 'cinetique', html: TX`<ul><li><b>Chimique</b> : prélèvements, trempe, titrage (méthode destructive).</li><li><b>Pression</b> : \(x = \dfrac{(P - P_0)V}{RT}\) pour un gaz formé.</li><li><b>Conductimétrie</b> : \(\sigma = \sum\lambda_i[X_i]\), affine en x.</li><li><b>Spectrophotométrie</b> : absorbance \(A = \varepsilon\,\ell\,C\) (loi de Beer-Lambert) d’une espèce colorée.</li></ul>` },
      { titre: '2. Vitesse volumique de réaction', html: TX`<p>\(v = \dfrac{1}{V}\,\dfrac{dx}{dt}\) (mol·L⁻¹·s⁻¹) : coefficient directeur de la tangente à la courbe \(x(t)\) divisé par V. Elle diminue au cours du temps (les réactifs s’épuisent).</p>`
        + FIG(440, 200, `<line x1="40" y1="170" x2="420" y2="170" stroke="#5b6577"/><line x1="40" y1="180" x2="40" y2="10" stroke="#5b6577"/><text x="410" y="188">t</text><text x="46" y="20">x</text><line x1="40" y1="40" x2="420" y2="40" stroke="#9aa6bf" stroke-dasharray="5 4"/><text x="14" y="44">x_f</text><polyline points="${Array.from({ length: 77 }, (_, i) => (40 + i * 5) + ',' + (170 - 130 * (1 - Math.exp(-i * 5 / 70))).toFixed(1)).join(' ')}" fill="none" stroke="#1f6fe0" stroke-width="3"/><line x1="40" y1="105" x2="88.5" y2="105" stroke="#d93a4a" stroke-dasharray="4 3"/><line x1="88.5" y1="105" x2="88.5" y2="170" stroke="#d93a4a" stroke-dasharray="4 3"/><text x="74" y="188" fill="#d93a4a">t½</text><text x="4" y="109" font-size="11">x_f/2</text><line x1="60" y1="150" x2="170" y2="30" stroke="#12946a" stroke-width="2"/><text x="170" y="26" fill="#12946a" font-size="11">tangente</text>`) },
      { titre: '3. Temps de demi-réaction', html: TX`<p>\(t_{1/2}\) : durée au bout de laquelle \(x(t_{1/2}) = \dfrac{x_f}{2}\). Il permet d’estimer la durée de la réaction (≈ quelques \(t_{1/2}\)) et de choisir la méthode de suivi.</p>` },
    ],
    formules: [
      { tex: TX`v = \dfrac{1}{V}\,\dfrac{dx}{dt}`, sens: 'Vitesse volumique de réaction' },
      { tex: TX`x(t_{1/2}) = \dfrac{x_f}{2}`, sens: 'Temps de demi-réaction' },
      { tex: TX`x = \dfrac{(P - P_0)\,V}{R\,T}`, sens: 'Suivi par pression' },
      { tex: TX`\sigma = \sum\lambda_i\,[X_i]`, sens: 'Suivi conductimétrique' },
      { tex: TX`A = \varepsilon\,\ell\,C`, sens: 'Loi de Beer-Lambert' },
    ],
    retenir: [
      'v = pente de la tangente à x(t), divisée par V.',
      'La vitesse diminue au cours du temps.',
      't½ : x = x_f/2.',
      'Une méthode physique ne perturbe pas le système.',
    ],
    erreurs: [
      'Oublier de diviser par V.',
      'Prendre x_max au lieu de x_f pour une réaction limitée.',
      'Lire t½ à x_max/2 sur une courbe qui n’a pas atteint son palier.',
    ],
  },
  experiences: {
    sims: ['cinetique'],
    protocole: { titre: 'Suivi spectrophotométrique de la formation du diiode', materiel: 'spectrophotomètre, solutions de KI (en excès) et de K₂S₂O₈, cuve, chronomètre.',
      etapes: ['Étalonner : tracer A = f([I₂]) avec des solutions connues.', 'Mélanger les réactifs et mesurer A toutes les minutes.', 'Calculer [I₂] puis x = [I₂]·V.', 'Tracer x(t), déterminer t½ et la vitesse à t = 0 et t = 10 min.'] },
    observations: TX`<ul><li>L’absorbance augmente rapidement puis de plus en plus lentement.</li><li>La pente de la tangente diminue au cours du temps.</li></ul>`,
    conclusion: TX`<p>La vitesse volumique diminue car la concentration du réactif limitant diminue.</p>`,
  },
  quiz: [
    { q: 'La vitesse volumique de réaction est :', o: ['x/t', '(1/V)·dx/dt', 'V·dx/dt', 'dx/dV'], r: 1, e: 'Définition.' },
    { q: 'Au cours du temps, la vitesse de réaction en général :', o: ['augmente', 'diminue', 'reste constante', 'change de signe'], r: 1, e: 'Les réactifs s’épuisent.' },
    { q: 'Le temps de demi-réaction correspond à :', o: ['x = x_f', 'x = x_f/2', 'v = 0', 't = durée totale/2'], r: 1, e: 'Définition.' },
    { q: 'La loi de Beer-Lambert relie l’absorbance à :', o: ['la température', 'la concentration', 'la pression', 'la masse'], r: 1, e: 'A = εℓC.' },
    { q: 'Une méthode de suivi chimique nécessite :', o: ['des prélèvements et une trempe', 'un spectrophotomètre', 'un manomètre', 'rien'], r: 0, e: 'Méthode destructive.' },
  ],
};
