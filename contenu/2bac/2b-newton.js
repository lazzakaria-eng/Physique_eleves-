/* 2ᵉ Bac · Physique · Mécanique · Lois de Newton */
'use strict';
CONTENU['2b-newton'] = {
  resume: {
    intro: TX`Les trois lois de Newton relient le mouvement d’un corps aux forces qu’il subit. La deuxième loi, \(\sum\vec F_{ext} = m\,\vec a_G\), permet de prévoir l’accélération, donc la vitesse et la position, à partir des forces.`,
    sections: [
      { titre: '1. Vecteurs vitesse et accélération', sim: 'newton', html: TX`<p>\(\vec v = \dfrac{d\overrightarrow{OG}}{dt}\), \(\vec a = \dfrac{d\vec v}{dt}\) (m/s²). Dans la base de Frenet : \(a_t = \dfrac{dv}{dt}\) (tangentielle), \(a_n = \dfrac{v^2}{\rho}\) (normale, vers le centre de courbure).</p>
<p>Mouvement rectiligne uniformément varié : \(a\) constante, \(v = at + v_0\), \(x = \tfrac12 at^2 + v_0t + x_0\), \(v^2 - v_0^2 = 2a(x - x_0)\).</p>` },
      { titre: '2. Les trois lois', html: TX`<ol><li><b>Principe d’inertie</b> : dans un référentiel galiléen, \(\sum\vec F_{ext} = \vec 0 \iff \vec v_G = \overrightarrow{\text{cte}}\).</li><li><b>Deuxième loi</b> : \(\sum\vec F_{ext} = m\,\vec a_G\).</li><li><b>Principe des actions réciproques</b> : \(\vec F_{A/B} = -\vec F_{B/A}\).</li></ol>` },
      { titre: '3. Méthode de résolution', sim: 'incline', html: TX`<p>Système ; référentiel galiléen ; bilan des forces ; deuxième loi ; projection sur des axes bien choisis ; résolution (accélération, puis équations horaires).</p>`
        + FIG(440, 190, ARW('nw1') + `<polygon points="20,170 420,170 420,46" fill="#e3e9f3" stroke="#5b6577"/><g transform="rotate(-17.2 220 110)"><rect x="190" y="88" width="60" height="36" fill="#d98200" rx="4"/></g>${VEC(222, 108, 222, 168, 'P', '#12946a', 'nw1')}${VEC(222, 108, 205, 52, 'R', '#1f6fe0', 'nw1')}<line x1="260" y1="150" x2="330" y2="128" stroke="#d93a4a" stroke-width="2" marker-end="url(#nw1)"/><text x="336" y="126" fill="#d93a4a">x</text><text x="60" y="164">α</text>`) },
      { titre: '4. Exemple : plan incliné sans frottement', html: TX`<p>Projection sur l’axe Ox parallèle au plan (vers le bas) : \(mg\sin\alpha = ma\) d’où \(a = g\sin\alpha\) : mouvement rectiligne uniformément accéléré.</p>` },
    ],
    formules: [
      { tex: TX`\vec v = \dfrac{d\overrightarrow{OG}}{dt} \qquad \vec a = \dfrac{d\vec v}{dt}`, sens: 'Vitesse et accélération' },
      { tex: TX`\sum\vec F_{ext} = m\,\vec a_G`, sens: 'Deuxième loi de Newton' },
      { tex: TX`\vec F_{A/B} = -\vec F_{B/A}`, sens: 'Actions réciproques' },
      { tex: TX`a_t = \dfrac{dv}{dt} \qquad a_n = \dfrac{v^2}{\rho}`, sens: 'Repère de Frenet' },
      { tex: TX`v^2 - v_0^2 = 2a\,(x - x_0)`, sens: 'Mouvement uniformément varié' },
    ],
    retenir: [
      'La 2ᵉ loi s’applique dans un référentiel galiléen.',
      'L’accélération a la direction et le sens de la somme des forces.',
      'Mouvement circulaire uniforme : accélération normale v²/R.',
      'Toujours projeter sur des axes choisis.',
    ],
    erreurs: [
      'Oublier une force (réaction, frottement).',
      'Confondre vecteur vitesse et vecteur accélération (la vitesse peut être perpendiculaire à a).',
      'Oublier les signes dans les projections.',
      'Appliquer la 2ᵉ loi dans un référentiel non galiléen (bus qui freine).',
    ],
  },
  experiences: {
    sims: ['newton', 'incline', 'rotation'],
    protocole: { titre: 'Vérifier la deuxième loi sur un plan incliné', materiel: 'table inclinée à coussin d’air, autoporteur, enregistrement (τ = 40 ms).',
      etapes: ['Lâcher l’autoporteur sans vitesse sur la table inclinée de α.', 'Calculer les vitesses v_i puis les accélérations a_i.', TX`Comparer a à \(g\sin\alpha\) ; recommencer pour plusieurs α.`] },
    observations: TX`<ul><li>Les écarts entre points augmentent régulièrement.</li><li>L’accélération est constante et voisine de \(g\sin\alpha\).</li></ul>`,
    conclusion: TX`<p>La 2ᵉ loi prévoit \(a = g\sin\alpha\) : vérifié expérimentalement.</p>`,
  },
  quiz: [
    { q: TX`m = 2 kg, ΣF = 10 N. a :`, o: ['20 m/s²', '5 m/s²', '0,2 m/s²', '12 m/s²'], r: 1, e: TX`\(a = F/m\).` },
    { q: 'Sur un plan incliné de 30° sans frottement (g = 10), a :', o: ['10 m/s²', '5 m/s²', '8,7 m/s²', '0'], r: 1, e: TX`\(g\sin30°\).` },
    { q: 'En mouvement circulaire uniforme, l’accélération est :', o: ['nulle', 'tangentielle', 'centripète', 'opposée à v'], r: 2, e: 'Normale, vers le centre.' },
    { q: TX`v passe de 0 à 20 m/s en 4 s (uniformément). a :`, o: ['5 m/s²', '80 m/s²', '0,2 m/s²', '20 m/s²'], r: 0, e: TX`\(\Delta v/\Delta t\).` },
    { q: 'La Terre attire une pomme avec 2 N. La pomme attire la Terre avec :', o: ['0 N', '2 N', 'une force négligeable', '20 N'], r: 1, e: 'Actions réciproques.' },
  ],
};
