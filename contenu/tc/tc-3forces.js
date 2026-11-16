/* Tronc Commun · Physique · Mécanique · Équilibre d’un solide soumis à trois forces non parallèles */
'use strict';
CONTENU['tc-3forces'] = {
  resume: {
    intro: TX`Un solide soumis à trois forces non parallèles est en équilibre si leur somme vectorielle est nulle et si leurs droites d’action sont <b>concourantes</b> (elles se coupent en un même point). On résout par construction graphique ou par projection.`,
    sections: [
      { titre: '1. Conditions d’équilibre', html: TX`<p>Si un solide soumis à trois forces non parallèles \(\vec F_1, \vec F_2, \vec F_3\) est en équilibre :</p>
<ul><li>\(\vec F_1 + \vec F_2 + \vec F_3 = \vec 0\) ;</li><li>les trois droites d’action sont <b>coplanaires et concourantes</b>.</li></ul>` },
      { titre: '2. Méthode graphique : la ligne polygonale fermée', html: TX`<p>En mettant les trois vecteurs bout à bout (à l’échelle), on obtient un <b>triangle fermé</b>. On en déduit les intensités inconnues par mesure ou par trigonométrie.</p>`
        + FIG(460, 170, ARW('f31', '#1f6fe0') + `<line x1="40" y1="140" x2="200" y2="140" stroke="#1f6fe0" stroke-width="2.5" marker-end="url(#f31)"/><text x="110" y="160" fill="#1f6fe0" font-weight="bold">F₁</text><line x1="200" y1="140" x2="150" y2="30" stroke="#d93a4a" stroke-width="2.5" marker-end="url(#f31)"/><text x="186" y="80" fill="#d93a4a" font-weight="bold">F₂</text><line x1="150" y1="30" x2="40" y2="140" stroke="#12946a" stroke-width="2.5" marker-end="url(#f31)"/><text x="70" y="78" fill="#12946a" font-weight="bold">F₃</text><text x="250" y="70">Les vecteurs mis bout à bout</text><text x="250" y="92">forment un triangle fermé :</text><text x="250" y="114">F₁ + F₂ + F₃ = 0</text>`) },
      { titre: '3. Méthode analytique : la projection', html: TX`<p>On choisit un repère \((O, \vec i, \vec j)\) et on projette la relation vectorielle sur chaque axe :</p>
<p style="text-align:center">\(F_{1x} + F_{2x} + F_{3x} = 0 \qquad F_{1y} + F_{2y} + F_{3y} = 0\)</p>
<p>Une force d’intensité \(F\) faisant l’angle \(\alpha\) avec l’axe Ox a pour coordonnées \(F_x = F\cos\alpha\) et \(F_y = F\sin\alpha\) (avec le signe selon le sens).</p>` },
      { titre: '4. Solide sur un plan incliné', sim: 'incline', html: TX`<p>Un solide de masse \(m\) est retenu sur un plan incliné d’angle \(\alpha\) par un fil parallèle au plan, sans frottement. Forces : \(\vec P\), \(\vec T\), \(\vec R\). Par projection sur l’axe parallèle au plan puis sur l’axe perpendiculaire :</p>
<p style="text-align:center">\(T = m\,g\,\sin\alpha \qquad R = m\,g\,\cos\alpha\)</p>
<p>Avec frottement et sans fil : \(f = m\,g\,\sin\alpha\) et \(R_N = m\,g\,\cos\alpha\), soit \(\tan\varphi = \tan\alpha\) à la limite du glissement.</p>`
        + FIG(420, 190, ARW('f32') + `<polygon points="20,170 400,170 400,40" fill="#e3e9f3" stroke="#5b6577"/><g transform="rotate(-19 230 120)"><rect x="200" y="96" width="60" height="36" fill="#d98200" rx="4"/></g>${VEC(232, 112, 232, 172, 'P', '#12946a', 'f32')}${VEC(232, 112, 300, 89, 'T', '#d93a4a', 'f32')}${VEC(232, 112, 212, 54, 'R', '#1f6fe0', 'f32')}<text x="60" y="164">α</text>`) },
    ],
    formules: [
      { tex: TX`\vec F_1 + \vec F_2 + \vec F_3 = \vec 0`, sens: 'Condition d’équilibre (droites d’action concourantes)' },
      { tex: TX`F_x = F\cos\alpha \qquad F_y = F\sin\alpha`, sens: 'Coordonnées d’une force' },
      { tex: TX`T = m\,g\,\sin\alpha`, sens: 'Tension du fil (plan incliné sans frottement)' },
      { tex: TX`R = m\,g\,\cos\alpha`, sens: 'Réaction du plan incliné' },
      { tex: TX`\tan\varphi = \dfrac{f}{R_N}`, sens: 'Angle de frottement' },
    ],
    retenir: [
      'Trois forces en équilibre : somme vectorielle nulle et droites d’action concourantes.',
      'Méthode graphique : les vecteurs bout à bout forment un triangle fermé.',
      'Méthode analytique : la somme des projections est nulle sur chaque axe.',
      TX`Sur un plan incliné sans frottement : \(T = mg\sin\alpha\), \(R = mg\cos\alpha\).`,
      'Bien choisir les axes (souvent parallèle et perpendiculaire au plan) simplifie les calculs.',
    ],
    erreurs: [
      TX`Confondre \(\sin\alpha\) et \(\cos\alpha\) : faire une figure et repérer l’angle dans le bon triangle.`,
      'Oublier les signes des projections selon l’orientation des axes.',
      'Additionner les intensités au lieu des vecteurs.',
      'Oublier la condition de concours des droites d’action.',
      'Mettre la calculatrice en radians alors que l’angle est en degrés.',
    ],
  },
  experiences: {
    sims: ['incline'],
    protocole: { titre: 'Équilibre d’un anneau soumis à trois forces', materiel: 'anneau léger, trois fils, deux poulies, masses marquées, rapporteur, feuille de papier.',
      etapes: ['Accrocher trois masses différentes aux trois fils reliés à l’anneau, deux passant sur des poulies.', 'Attendre l’équilibre et tracer sur la feuille les directions des trois fils.', TX`Représenter les trois forces à l’échelle (\(F = mg\)) et les mettre bout à bout.`, 'Dans la simulation, faire varier l’angle du plan incliné et noter T et R.'] },
    observations: TX`<ul><li>Les trois directions se coupent au centre de l’anneau.</li><li>Les trois vecteurs mis bout à bout forment un triangle fermé.</li><li>Quand \(\alpha\) augmente, \(T\) augmente et \(R\) diminue.</li></ul>`,
    conclusion: TX`<p>À l’équilibre, \(\vec F_1 + \vec F_2 + \vec F_3 = \vec 0\) et les droites d’action sont concourantes. Sur un plan incliné : \(T = mg\sin\alpha\) et \(R = mg\cos\alpha\).</p>`,
  },
  quiz: [
    { q: 'Trois forces non parallèles en équilibre ont des droites d’action :', o: ['parallèles', 'concourantes', 'perpendiculaires deux à deux', 'confondues'], r: 1, e: 'Elles se coupent en un même point.' },
    { q: 'Mis bout à bout, les vecteurs de trois forces en équilibre forment :', o: ['une droite', 'un triangle fermé', 'un carré', 'un triangle ouvert'], r: 1, e: 'Leur somme est le vecteur nul.' },
    { q: TX`Solide de 2 kg retenu sur un plan incliné de 30° sans frottement (\(g = 10\ \text{N/kg}\)). La tension du fil parallèle au plan :`, o: ['20 N', '17,3 N', '10 N', '5 N'], r: 2, e: TX`\(T = mg\sin30° = 20\times0{,}5 = 10\ \text{N}\).` },
    { q: 'Dans le même cas, la réaction du plan vaut environ :', o: ['10 N', '17,3 N', '20 N', '0 N'], r: 1, e: TX`\(R = mg\cos30° = 20\times0{,}866 \approx 17{,}3\ \text{N}\).` },
    { q: TX`Une force de 10 N fait un angle de 60° avec Ox. Sa projection sur Ox :`, o: ['8,66 N', '5 N', '10 N', '0 N'], r: 1, e: TX`\(F_x = 10\cos60° = 5\ \text{N}\).` },
  ],
};
