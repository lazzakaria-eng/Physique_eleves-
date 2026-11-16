/* 2ᵉ Bac · Physique · Ondes · Ondes mécaniques progressives périodiques */
'use strict';
CONTENU['2b-ondes-per'] = {
  resume: {
    intro: TX`Une onde est <b>périodique</b> quand la perturbation se répète à intervalles de temps égaux. Elle présente une double périodicité : <b>temporelle</b> (période \(T\)) et <b>spatiale</b> (longueur d’onde \(\lambda\)), liées par \(\lambda = vT\).`,
    sections: [
      { titre: '1. Double périodicité', sim: 'onde_per', html: TX`<p>Période \(T\) (s), fréquence \(f = 1/T\) (Hz). La <b>longueur d’onde</b> \(\lambda\) est la distance parcourue par l’onde pendant une période : \(\lambda = v\,T = \dfrac{v}{f}\).</p>`
        + FIG(460, 140, `<line x1="20" y1="70" x2="440" y2="70" stroke="#9aa6bf"/><polyline points="${Array.from({ length: 211 }, (_, i) => (20 + i * 2) + ',' + (70 - 40 * Math.sin(2 * Math.PI * i * 2 / 160)).toFixed(1)).join(' ')}" fill="none" stroke="#1f6fe0" stroke-width="3"/><line x1="60" y1="120" x2="220" y2="120" stroke="#d93a4a" stroke-width="2"/><text x="140" y="136" text-anchor="middle" fill="#d93a4a" font-weight="bold">λ</text>`) },
      { titre: '2. Points en phase et en opposition', html: TX`<p>Deux points distants de \(d = k\lambda\) vibrent <b>en phase</b> ; de \(d = (2k + 1)\dfrac{\lambda}{2}\), en <b>opposition de phase</b>.</p>` },
      { titre: '3. Stroboscopie', html: TX`<p>Éclairé par un stroboscope de fréquence \(f_e\), le phénomène paraît immobile si \(f = k\,f_e\) (k entier). Si \(f_e\) est légèrement supérieure, il paraît avancer lentement en sens inverse.</p>` },
      { titre: '4. Diffraction et dispersion', sim: 'diffraction', html: TX`<p><b>Diffraction</b> : une onde qui traverse une ouverture de largeur \(a\) comparable ou inférieure à \(\lambda\) s’étale ; la longueur d’onde ne change pas. Un milieu est <b>dispersif</b> si la célérité dépend de la fréquence (ondes à la surface de l’eau).</p>` },
    ],
    formules: [
      { tex: TX`\lambda = v\cdot T = \dfrac{v}{f}`, sens: 'Longueur d’onde' },
      { tex: TX`d = k\,\lambda`, sens: 'Points en phase' },
      { tex: TX`d = (2k + 1)\,\dfrac{\lambda}{2}`, sens: 'Points en opposition de phase' },
      { tex: TX`f = k\,f_e`, sens: 'Immobilité apparente (stroboscope)' },
      { tex: TX`a \le \lambda`, sens: 'Diffraction marquée' },
    ],
    retenir: [
      'λ = vT : distance parcourue en une période.',
      'Deux points distants de kλ vibrent en phase.',
      'La diffraction ne change ni la fréquence ni la longueur d’onde.',
      'Milieu dispersif : v dépend de f.',
    ],
    erreurs: [
      'Mesurer λ entre une crête et un creux (c’est λ/2).',
      'Croire que la diffraction modifie λ.',
      'Confondre la fréquence de l’onde et celle du stroboscope.',
    ],
  },
  experiences: {
    sims: ['onde_per', 'diffraction'],
    protocole: { titre: 'Cuve à ondes et stroboscope', materiel: 'cuve à ondes, vibreur à fréquence réglable, stroboscope, règle.',
      etapes: ['Régler le vibreur à f = 20 Hz.', 'Immobiliser les ondes avec le stroboscope.', 'Mesurer la distance de 5 longueurs d’onde sur l’écran (tenir compte du grandissement).', TX`Calculer \(v = \lambda f\) ; placer un obstacle avec une fente étroite.`] },
    observations: TX`<ul><li>Les ondes paraissent immobiles pour \(f_e = 20, 10, 5\ \text{Hz}\)…</li><li>Après une fente étroite, les ondes deviennent circulaires : diffraction.</li></ul>`,
    conclusion: TX`<p>\(\lambda = v/f\) ; une ouverture de largeur voisine de \(\lambda\) diffracte l’onde.</p>`,
  },
  quiz: [
    { q: TX`f = 50 Hz et v = 10 m/s. λ :`, o: ['500 m', '0,2 m', '5 m', '2 m'], r: 1, e: TX`\(\lambda = v/f\).` },
    { q: TX`λ = 4 cm. Deux points distants de 6 cm vibrent :`, o: ['en phase', 'en opposition de phase', 'en quadrature', 'au hasard'], r: 1, e: TX`\(6 = 3\times\lambda/2\).` },
    { q: 'Onde de 100 Hz, stroboscope à 50 Hz :', o: ['immobilité apparente', 'mouvement apparent lent', 'aucune image', 'onde doublée'], r: 0, e: 'f = 2 f_e.' },
    { q: 'La diffraction est marquée si la largeur de la fente est :', o: ['très grande devant λ', 'comparable à λ', 'nulle', 'sans importance'], r: 1, e: 'a ≲ λ.' },
    { q: 'Après diffraction, la longueur d’onde :', o: ['augmente', 'diminue', 'ne change pas', 'devient nulle'], r: 2, e: 'Même milieu, même fréquence.' },
  ],
};
