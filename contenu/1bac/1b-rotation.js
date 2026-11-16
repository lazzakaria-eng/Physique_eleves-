/* 1ʳᵉ Bac · Physique · Travail et énergie · Rotation d’un solide indéformable autour d’un axe fixe */
'use strict';
CONTENU['1b-rotation'] = {
  resume: {
    intro: TX`Un solide est en <b>rotation autour d’un axe fixe</b> quand tous ses points (hors de l’axe) décrivent des cercles centrés sur l’axe. Tous les points tournent du même angle pendant la même durée : ils ont la même <b>vitesse angulaire</b> \(\omega\), mais leur vitesse linéaire \(v = R\omega\) dépend de leur distance à l’axe.`,
    sections: [
      { titre: '1. Repérage d’un point', html: TX`<p>Un point M à la distance \(R\) de l’axe est repéré par son <b>abscisse angulaire</b> \(\theta\) (rad) ou par son <b>abscisse curviligne</b> \(s = \overset{\frown}{M_0M}\) (m) : \(s = R\cdot\theta\).</p>`
        + FIG(300, 200, ARW('r1') + `<circle cx="150" cy="100" r="80" fill="none" stroke="#5b6577" stroke-width="2"/><circle cx="150" cy="100" r="4" fill="#14213d"/><line x1="150" y1="100" x2="230" y2="100" stroke="#5b6577" stroke-dasharray="4 3"/><line x1="150" y1="100" x2="207" y2="43" stroke="#14213d" stroke-width="2"/><circle cx="207" cy="43" r="5" fill="#d93a4a"/><text x="214" y="40">M</text><circle cx="230" cy="100" r="4" fill="#1f6fe0"/><text x="236" y="114">M₀</text><path d="M180 100 A30 30 0 0 0 171 79" fill="none" stroke="#d93a4a" stroke-width="2"/><text x="184" y="86" fill="#d93a4a">θ</text><text x="138" y="96">O</text><path d="M232 98 A82 82 0 0 0 210 41" fill="none" stroke="#12946a" stroke-width="3"/><text x="240" y="70" fill="#12946a">s</text>`) },
      { titre: '2. Vitesse angulaire et vitesse linéaire', sim: 'rotation', html: TX`<p>Vitesse angulaire moyenne : \(\omega = \dfrac{\Delta\theta}{\Delta t}\) (rad/s). Relation avec la vitesse linéaire d’un point : \(v = R\cdot\omega\). Sur un enregistrement, \(\omega_i = \dfrac{\theta_{i+1} - \theta_{i-1}}{2\tau}\).</p>
<p>Conversion : \(f\ (\text{tr/s}) = \dfrac{f\ (\text{tr/min})}{60}\) et \(\omega = 2\pi f\).</p>` },
      { titre: '3. Mouvement de rotation uniforme', html: TX`<p>\(\omega\) est constante : \(\theta(t) = \omega\,t + \theta_0\) et \(s(t) = v\,t + s_0\). C’est un mouvement <b>périodique</b> : période \(T = \dfrac{2\pi}{\omega}\) (durée d’un tour), fréquence \(f = \dfrac{1}{T}\).</p>` },
      { titre: '4. Transmission du mouvement', html: TX`<p>Deux poulies reliées par une courroie (ou deux roues dentées) qui ne glisse pas : les points de contact ont la <b>même vitesse linéaire</b> : \(R_1\omega_1 = R_2\omega_2\). La petite poulie tourne plus vite.</p>` },
    ],
    formules: [
      { tex: TX`s = R\cdot\theta`, sens: 'Abscisse curviligne (m), θ en rad' },
      { tex: TX`\omega = \dfrac{\Delta\theta}{\Delta t}`, sens: 'Vitesse angulaire (rad/s)' },
      { tex: TX`v = R\cdot\omega`, sens: 'Vitesse linéaire d’un point' },
      { tex: TX`\theta(t) = \omega\,t + \theta_0`, sens: 'Équation horaire (rotation uniforme)' },
      { tex: TX`T = \dfrac{2\pi}{\omega} \qquad f = \dfrac{1}{T}`, sens: 'Période et fréquence' },
      { tex: TX`R_1\,\omega_1 = R_2\,\omega_2`, sens: 'Transmission par courroie' },
    ],
    retenir: [
      'Tous les points d’un solide en rotation ont la même vitesse angulaire.',
      TX`La vitesse linéaire \(v = R\omega\) augmente avec la distance à l’axe.`,
      'Les angles s’expriment en radians dans les formules.',
      TX`Rotation uniforme : \(\theta = \omega t + \theta_0\), mouvement périodique.`,
      'Courroie sans glissement : même vitesse linéaire sur les deux poulies.',
    ],
    erreurs: [
      'Utiliser des degrés au lieu de radians.',
      TX`Oublier de diviser par 60 pour passer de tr/min à tr/s.`,
      'Croire que tous les points d’un solide en rotation ont la même vitesse linéaire.',
      TX`Écrire \(\omega = 2\pi/f\) au lieu de \(\omega = 2\pi f\).`,
    ],
  },
  experiences: {
    sims: ['rotation'],
    protocole: { titre: 'Enregistrer la rotation d’un disque', materiel: 'disque tournant autour d’un axe, papier enregistreur, éclateur (τ = 40 ms), rapporteur.',
      etapes: ['Lancer le disque ; l’éclateur marque la position d’un point M toutes les τ.', 'Mesurer les angles θ_i à partir de M₀.', TX`Calculer \(\omega_i\) et \(v_i\) pour deux points à des rayons différents.`, 'Dans la simulation, faire varier ω puis R et comparer v.'] },
    observations: TX`<ul><li>Les angles entre marques successives sont égaux : rotation uniforme.</li><li>Un point deux fois plus éloigné de l’axe a une vitesse deux fois plus grande.</li></ul>`,
    conclusion: TX`<p>\(\omega\) est commune à tout le solide ; \(v = R\omega\) est proportionnelle à la distance à l’axe.</p>`,
  },
  quiz: [
    { q: 'Un disque tourne à 45 tr/min. Sa vitesse angulaire :', o: ['4,7 rad/s', '0,75 rad/s', '283 rad/s', '45 rad/s'], r: 0, e: TX`\(\omega = 2\pi\times\dfrac{45}{60} \approx 4{,}7\ \text{rad/s}\).` },
    { q: TX`Un point à 10 cm de l’axe, \(\omega = 20\ \text{rad/s}\). Sa vitesse :`, o: ['200 m/s', '2 m/s', '0,5 m/s', '20 m/s'], r: 1, e: TX`\(v = 0{,}10\times20\).` },
    { q: 'Dans un solide en rotation, deux points à des distances différentes de l’axe ont :', o: ['même v', 'même ω', 'même trajectoire', 'même accélération'], r: 1, e: 'Ils tournent du même angle.' },
    { q: TX`Période pour \(\omega = \pi\ \text{rad/s}\) :`, o: ['0,5 s', '1 s', '2 s', 'π s'], r: 2, e: TX`\(T = 2\pi/\pi\).` },
    { q: 'Courroie : poulie 1 (R = 5 cm, 600 tr/min), poulie 2 (R = 15 cm). Fréquence de la poulie 2 :', o: ['200 tr/min', '1800 tr/min', '600 tr/min', '300 tr/min'], r: 0, e: TX`\(f_2 = f_1R_1/R_2\).` },
  ],
};
