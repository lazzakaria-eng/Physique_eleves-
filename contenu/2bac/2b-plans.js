/* 2ᵉ Bac · Physique · Mécanique · Mouvements plans */
'use strict';
CONTENU['2b-plans'] = {
  resume: {
    intro: TX`Un projectile dans le champ de pesanteur uniforme, ou une particule chargée dans un champ électrique uniforme, a une accélération constante : sa trajectoire est une <b>parabole</b>. Dans un champ magnétique uniforme, une particule chargée décrit un <b>cercle</b>.`,
    sections: [
      { titre: '1. Projectile dans le champ de pesanteur', sim: 'projectile', html: TX`<p>Lancé de O avec \(\vec v_0\) faisant l’angle α avec l’horizontale ; seul le poids : \(\vec a = \vec g\). Équations horaires : \(x = v_0\cos\alpha\,t\) ; \(y = -\tfrac12 gt^2 + v_0\sin\alpha\,t\). Trajectoire : \(y = -\dfrac{g}{2v_0^2\cos^2\alpha}x^2 + x\tan\alpha\).</p>
<p>Flèche (hauteur maximale) \(y_S = \dfrac{v_0^2\sin^2\alpha}{2g}\) ; portée \(x_P = \dfrac{v_0^2\sin2\alpha}{g}\) (maximale pour 45°).</p>`
        + FIG(440, 190, `<line x1="30" y1="170" x2="420" y2="170" stroke="#5b6577"/><line x1="30" y1="180" x2="30" y2="10" stroke="#5b6577"/><path d="M30 170 Q 210 -40 390 170" fill="none" stroke="#1f6fe0" stroke-width="3"/><line x1="210" y1="65" x2="210" y2="170" stroke="#9aa6bf" stroke-dasharray="4 3"/><text x="214" y="100" font-size="11">flèche</text><text x="370" y="186" font-size="11">portée</text><line x1="30" y1="170" x2="90" y2="110" stroke="#d93a4a" stroke-width="2.5"/><text x="70" y="104" fill="#d93a4a">v₀</text><text x="50" y="164">α</text>`) },
      { titre: '2. Particule dans un champ électrique uniforme', sim: 'champE', html: TX`<p>Entre deux plaques : \(\vec F = q\vec E\), poids négligeable : \(\vec a = \dfrac{q\vec E}{m}\), constante. Une particule entrant perpendiculairement au champ décrit une parabole : \(y = \dfrac{qE}{2mv_0^2}x^2\). Déviation à la sortie des plaques (longueur ℓ) : \(\tan\theta = \dfrac{qE\ell}{mv_0^2}\).</p>` },
      { titre: '3. Particule dans un champ magnétique uniforme', sim: 'lorentz', html: TX`<p>Force de Lorentz \(\vec F = q\,\vec v\wedge\vec B\), perpendiculaire à \(\vec v\) : elle ne travaille pas, la vitesse reste constante en valeur. Si \(\vec v \perp \vec B\) : mouvement <b>circulaire uniforme</b> de rayon \(R = \dfrac{mv}{|q|B}\). Applications : spectrographe de masse, cyclotron.</p>` },
    ],
    formules: [
      { tex: TX`x = v_0\cos\alpha\,t \qquad y = -\dfrac{1}{2}g\,t^2 + v_0\sin\alpha\,t`, sens: 'Équations horaires du projectile' },
      { tex: TX`y = -\dfrac{g}{2v_0^2\cos^2\alpha}\,x^2 + x\tan\alpha`, sens: 'Équation de la trajectoire' },
      { tex: TX`x_P = \dfrac{v_0^2\sin2\alpha}{g} \qquad y_S = \dfrac{v_0^2\sin^2\alpha}{2g}`, sens: 'Portée et flèche' },
      { tex: TX`\vec a = \dfrac{q\,\vec E}{m}`, sens: 'Particule dans un champ électrique' },
      { tex: TX`F = |q|\,v\,B \qquad R = \dfrac{m\,v}{|q|\,B}`, sens: 'Force de Lorentz ; rayon' },
    ],
    retenir: [
      'Accélération constante → trajectoire parabolique (ou rectiligne).',
      'La composante horizontale de la vitesse du projectile est constante.',
      'Portée maximale pour α = 45°.',
      'La force de Lorentz ne modifie pas la valeur de la vitesse.',
    ],
    erreurs: [
      'Oublier que v_x reste constante.',
      'Confondre flèche et portée.',
      'Utiliser l’angle en degrés dans une calculatrice en radians.',
      'Oublier la valeur absolue de q dans R.',
    ],
  },
  experiences: {
    sims: ['projectile', 'champE', 'lorentz'],
    protocole: { titre: 'Étudier un tir de projectile', materiel: 'vidéo d’un lancer de balle et logiciel de pointage (ou simulation « projectile »).',
      etapes: ['Pointer les positions de la balle.', TX`Tracer \(x(t)\), \(y(t)\), \(v_x(t)\), \(v_y(t)\).`, 'Faire varier α dans la simulation à v₀ fixée et noter la portée.'] },
    observations: TX`<ul><li>\(x(t)\) est une droite ; \(y(t)\) une parabole.</li><li>\(v_x\) est constante ; \(v_y\) décroît linéairement avec une pente −g.</li><li>La portée est maximale pour 45°.</li></ul>`,
    conclusion: TX`<p>Le mouvement se décompose en un mouvement uniforme horizontal et un mouvement uniformément varié vertical.</p>`,
  },
  quiz: [
    { q: TX`v₀ = 20 m/s, α = 45°, g = 10. Portée :`, o: ['40 m', '20 m', '28 m', '80 m'], r: 0, e: TX`\(400\times1/10\).` },
    { q: 'Au sommet de la trajectoire, la vitesse est :', o: ['nulle', 'horizontale', 'verticale', 'maximale'], r: 1, e: 'v_y = 0.' },
    { q: 'La composante horizontale de la vitesse d’un projectile :', o: ['augmente', 'diminue', 'est constante', 's’annule'], r: 2, e: 'Aucune force horizontale.' },
    { q: 'Une particule chargée dans un champ B uniforme (v ⊥ B) a un mouvement :', o: ['rectiligne', 'parabolique', 'circulaire uniforme', 'accéléré'], r: 2, e: 'Force perpendiculaire à v.' },
    { q: 'Si on double la vitesse, le rayon R :', o: ['double', 'quadruple', 'est divisé par 2', 'ne change pas'], r: 0, e: 'R ∝ v.' },
  ],
};
