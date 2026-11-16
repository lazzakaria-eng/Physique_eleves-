/* 2ᵉ Bac PC/SM · Physique · Mécanique · Mouvement de rotation d’un solide autour d’un axe fixe */
'use strict';
CONTENU['2b-rotation'] = {
  resume: {
    intro: TX`Pour un solide en rotation autour d’un axe fixe Δ, la relation fondamentale de la dynamique s’écrit avec les <b>moments</b> : \(\sum\mathcal M_\Delta(\vec F_{ext}) = J_\Delta\,\ddot\theta\). Le moment d’inertie \(J_\Delta\) joue le rôle de la masse.`,
    sections: [
      { titre: '1. Grandeurs cinématiques', sim: 'rotation', html: TX`<p>Vitesse angulaire \(\dot\theta = \dfrac{d\theta}{dt}\) ; accélération angulaire \(\ddot\theta = \dfrac{d\dot\theta}{dt}\) (rad/s²). Pour un point à la distance R : \(v = R\dot\theta\), \(a_t = R\ddot\theta\), \(a_n = R\dot\theta^2\).</p><p>Rotation uniformément variée : \(\dot\theta = \ddot\theta\,t + \dot\theta_0\), \(\theta = \tfrac12\ddot\theta t^2 + \dot\theta_0 t + \theta_0\).</p>` },
      { titre: '2. Relation fondamentale de la dynamique en rotation', sim: 'rotdyn', html: TX`<p>\(\sum\mathcal M_\Delta(\vec F_{ext}) = J_\Delta\,\ddot\theta\). Moments d’inertie : anneau \(mR^2\) ; disque ou cylindre plein \(\tfrac12mR^2\) ; tige par son milieu \(\tfrac{1}{12}mL^2\) ; boule pleine \(\tfrac25mR^2\).</p>` },
      { titre: '3. Exemple : poulie et charge suspendue', html: TX`<p>Une masse m suspendue à un fil enroulé sur une poulie (rayon r, moment d’inertie J) : pour la masse \(mg - T = ma\) ; pour la poulie \(T\,r = J\ddot\theta\) avec \(a = r\ddot\theta\). D’où \(a = \dfrac{mg}{m + J/r^2}\).</p>`
        + FIG(260, 220, ARW('rt1', '#d93a4a') + `<line x1="40" y1="10" x2="220" y2="10" stroke="#5b6577" stroke-width="4"/><line x1="130" y1="10" x2="130" y2="50" stroke="#5b6577" stroke-width="3"/><circle cx="130" cy="70" r="30" fill="#9aa6bf" stroke="#14213d" stroke-width="2"/><circle cx="130" cy="70" r="4" fill="#14213d"/><line x1="160" y1="70" x2="160" y2="160" stroke="#14213d" stroke-width="2"/><rect x="145" y="160" width="30" height="30" fill="#d98200"/>${VEC(160, 175, 160, 215, 'P', '#12946a', 'rt1')}${VEC(160, 158, 160, 120, 'T', '#d93a4a', 'rt1')}`) },
    ],
    formules: [
      { tex: TX`\dot\theta = \dfrac{d\theta}{dt} \qquad \ddot\theta = \dfrac{d\dot\theta}{dt}`, sens: 'Vitesse et accélération angulaires' },
      { tex: TX`v = R\,\dot\theta \quad a_t = R\,\ddot\theta \quad a_n = R\,\dot\theta^2`, sens: 'Point à la distance R' },
      { tex: TX`\sum\mathcal M_\Delta(\vec F_{ext}) = J_\Delta\,\ddot\theta`, sens: 'RFD en rotation' },
      { tex: TX`\theta = \dfrac{1}{2}\ddot\theta\,t^2 + \dot\theta_0\,t + \theta_0`, sens: 'Rotation uniformément variée' },
    ],
    retenir: [
      'J_Δ dépend de la répartition de la masse autour de l’axe.',
      'Somme des moments nulle : rotation uniforme (ou repos).',
      'Fil inextensible sans glissement : a = r·θ̈.',
      'La réaction de l’axe a un moment nul.',
    ],
    erreurs: [
      'Oublier le signe des moments.',
      'Confondre a (m/s²) et θ̈ (rad/s²).',
      'Écrire T = mg pour une masse accélérée.',
    ],
  },
  experiences: {
    sims: ['rotdyn', 'rotation'],
    protocole: { titre: 'Poulie entraînée par une masse', materiel: 'poulie à axe fixe, fil, masse marquée, chronomètre (ou simulation « rotation »).',
      etapes: ['Lâcher la masse et mesurer la durée pour descendre de h.', TX`Calculer \(a = 2h/t^2\) puis \(\ddot\theta = a/r\).`, 'Changer la masse et recommencer.', 'En déduire J.'] },
    observations: TX`<ul><li>La masse descend d’un mouvement uniformément accéléré.</li><li>a augmente avec m mais reste inférieure à g.</li></ul>`,
    conclusion: TX`<p>\(a = \dfrac{mg}{m + J/r^2}\) : on en déduit J.</p>`,
  },
  quiz: [
    { q: TX`ω passe de 0 à 100 rad/s en 5 s. θ̈ :`, o: ['20 rad/s²', '500 rad/s²', '0,05 rad/s²', '100 rad/s²'], r: 0, e: TX`\(100/5\).` },
    { q: 'Moment d’inertie d’un disque plein (m = 2 kg, R = 0,1 m) :', o: ['0,01 kg·m²', '0,02 kg·m²', '0,1 kg·m²', '0,2 kg·m²'], r: 0, e: TX`\(\tfrac12\times2\times0{,}01\).` },
    { q: TX`ΣM = 0,5 N·m, J = 0,1 kg·m². θ̈ :`, o: ['5 rad/s²', '0,05 rad/s²', '50 rad/s²', '0,6 rad/s²'], r: 0, e: TX`\(0{,}5/0{,}1\).` },
    { q: 'Si la somme des moments est nulle, la rotation est :', o: ['accélérée', 'uniforme', 'freinée', 'impossible'], r: 1, e: 'θ̈ = 0.' },
    { q: 'Le moment de la réaction de l’axe est :', o: ['maximal', 'nul', 'égal au moment du poids', 'négatif'], r: 1, e: 'Sa droite d’action passe par l’axe.' },
  ],
};
