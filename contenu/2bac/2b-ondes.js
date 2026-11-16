/* 2ᵉ Bac · Physique · Ondes · Ondes mécaniques progressives */
'use strict';
CONTENU['2b-ondes'] = {
  resume: {
    intro: TX`Une <b>onde mécanique progressive</b> est la propagation d’une perturbation dans un milieu matériel, <b>sans transport de matière</b> mais avec transport d’énergie. Elle se propage à une vitesse (célérité) qui dépend du milieu.`,
    sections: [
      { titre: '1. Définitions', sim: 'onde_pulse', html: TX`<ul><li><b>Onde transversale</b> : la perturbation est perpendiculaire à la direction de propagation (corde, surface de l’eau).</li><li><b>Onde longitudinale</b> : la perturbation est parallèle à la direction de propagation (son, ressort comprimé).</li><li>Dimension : 1 (corde), 2 (surface de l’eau), 3 (son dans l’air).</li></ul>` },
      { titre: '2. Célérité', html: TX`<p>\(v = \dfrac{d}{\Delta t}\) (m/s). Elle dépend du milieu (nature, tension, température…), pas de la forme de la perturbation. Corde de tension \(F\) et de masse linéique \(\mu\) : \(v = \sqrt{F/\mu}\). Son : ≈ 340 m/s dans l’air, ≈ 1500 m/s dans l’eau.</p>` },
      { titre: '3. Retard temporel', html: TX`<p>Un point M situé à la distance SM de la source reproduit le mouvement de S avec un <b>retard</b> \(\tau = \dfrac{SM}{v}\) : \(y_M(t) = y_S(t - \tau)\).</p>`
        + FIG(460, 150, `<line x1="20" y1="100" x2="440" y2="100" stroke="#9aa6bf"/><path d="M20 100 L180 100 Q 210 40 240 100 L440 100" fill="none" stroke="#1f6fe0" stroke-width="3"/><circle cx="20" cy="100" r="5" fill="#d93a4a"/><text x="14" y="124">S</text><circle cx="360" cy="100" r="5" fill="#12946a"/><text x="354" y="124">M</text><text x="250" y="60" font-size="12">→ v</text><text x="140" y="140" font-size="12">M sera atteint au bout de τ = SM / v</text>`) },
    ],
    formules: [
      { tex: TX`v = \dfrac{d}{\Delta t}`, sens: 'Célérité (m/s)' },
      { tex: TX`\tau = \dfrac{SM}{v}`, sens: 'Retard temporel' },
      { tex: TX`y_M(t) = y_S(t - \tau)`, sens: 'Le point M reproduit le mouvement de S' },
      { tex: TX`v = \sqrt{\dfrac{F}{\mu}}`, sens: 'Célérité le long d’une corde' },
    ],
    retenir: [
      'Une onde transporte de l’énergie, pas de matière.',
      'Transversale : perpendiculaire ; longitudinale : parallèle à la propagation.',
      'La célérité dépend du milieu, pas de l’amplitude.',
      'Le point M reproduit le mouvement de S avec un retard τ = SM/v.',
    ],
    erreurs: [
      'Confondre vitesse de l’onde et vitesse des points du milieu.',
      'Croire que la matière avance avec l’onde.',
      TX`Écrire \(y_M(t) = y_S(t + \tau)\).`,
      'Croire que le son se propage dans le vide.',
    ],
  },
  experiences: {
    sims: ['onde_pulse'],
    protocole: { titre: 'Mesurer la célérité du son dans l’air', materiel: 'deux microphones, oscilloscope ou interface, source sonore brève (claquement), règle.',
      etapes: ['Placer deux micros alignés avec la source, à la distance d l’un de l’autre.', 'Produire un son bref et mesurer le décalage Δt entre les deux signaux.', 'Recommencer pour plusieurs distances d.', TX`Tracer \(d = f(\Delta t)\) et en déduire \(v\).`] },
    observations: TX`<ul><li>Le signal du micro le plus éloigné arrive avec un retard proportionnel à d.</li><li>La pente de la droite vaut environ 340 m/s.</li></ul>`,
    conclusion: TX`<p>\(v = d/\Delta t \approx 340\ \text{m/s}\) dans l’air à 20 °C.</p>`,
  },
  quiz: [
    { q: 'Une onde mécanique transporte :', o: ['de la matière', 'de l’énergie sans matière', 'de la matière et de l’énergie', 'rien'], r: 1, e: 'Les points du milieu oscillent sur place.' },
    { q: 'Le son est une onde :', o: ['transversale', 'longitudinale', 'électromagnétique', 'qui se propage dans le vide'], r: 1, e: 'Compressions et dilatations de l’air.' },
    { q: 'Onde sur une corde à 5 m/s ; M à 2 m de S. Retard :', o: ['10 s', '0,4 s', '2,5 s', '0,1 s'], r: 1, e: TX`\(\tau = 2/5\).` },
    { q: 'Si on tend davantage une corde, la célérité :', o: ['diminue', 'augmente', 'ne change pas', 'devient nulle'], r: 1, e: TX`\(v = \sqrt{F/\mu}\).` },
    { q: 'Une vague à la surface de l’eau est une onde à :', o: ['une dimension', 'deux dimensions', 'trois dimensions', 'zéro dimension'], r: 1, e: 'Elle se propage sur une surface.' },
  ],
};
