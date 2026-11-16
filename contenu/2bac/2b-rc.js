/* 2ᵉ Bac · Physique · Électricité · Dipôle RC */
'use strict';
CONTENU['2b-rc'] = {
  resume: {
    intro: TX`Un <b>condensateur</b> stocke des charges et de l’énergie. Associé à un conducteur ohmique (dipôle RC), il se charge et se décharge progressivement, avec une durée caractéristique : la <b>constante de temps</b> \(\tau = RC\).`,
    sections: [
      { titre: '1. Le condensateur', html: TX`<p>Deux armatures conductrices séparées par un isolant. Charges \(q_A = -q_B = q\). Relation charge – tension : \(q = C\,u_C\) (C en farads). En convention récepteur : \(i = \dfrac{dq}{dt} = C\,\dfrac{du_C}{dt}\).</p><p>Association : parallèle \(C_{éq} = C_1 + C_2\) ; série \(\dfrac{1}{C_{éq}} = \dfrac{1}{C_1} + \dfrac{1}{C_2}\).</p>` },
      { titre: '2. Charge : réponse à un échelon de tension', sim: 'rc', html: TX`<p>Loi d’additivité : \(u_R + u_C = E\) d’où l’équation différentielle \(RC\,\dfrac{du_C}{dt} + u_C = E\). Solution : \(u_C(t) = E\,(1 - e^{-t/\tau})\) avec \(\tau = RC\). Le courant \(i = \dfrac{E}{R}e^{-t/\tau}\) décroît.</p>`
        + FIG(440, 200, `<line x1="40" y1="170" x2="420" y2="170" stroke="#5b6577"/><line x1="40" y1="180" x2="40" y2="10" stroke="#5b6577"/><text x="410" y="190">t</text><text x="46" y="20">u_C</text><line x1="40" y1="40" x2="420" y2="40" stroke="#9aa6bf" stroke-dasharray="5 4"/><text x="16" y="44">E</text><polyline points="${Array.from({ length: 77 }, (_, i) => (40 + i * 5) + ',' + (170 - 130 * (1 - Math.exp(-i * 5 / 70))).toFixed(1)).join(' ')}" fill="none" stroke="#1f6fe0" stroke-width="3"/><line x1="40" y1="170" x2="110" y2="40" stroke="#d93a4a" stroke-dasharray="5 3"/><line x1="110" y1="170" x2="110" y2="88" stroke="#d93a4a" stroke-dasharray="3 3"/><text x="104" y="190" fill="#d93a4a">τ</text><text x="116" y="86" font-size="11">0,63 E</text>`) },
      { titre: '3. Décharge', html: TX`<p>Sans générateur : \(RC\,\dfrac{du_C}{dt} + u_C = 0\), \(u_C(t) = E\,e^{-t/\tau}\) ; à \(t = \tau\), \(u_C = 0{,}37E\).</p><p>Détermination de τ : tangente à l’origine (elle coupe l’asymptote à \(t = \tau\)), ou lecture de \(0{,}63E\) (charge) / \(0{,}37E\) (décharge). Régime permanent atteint pour \(t \approx 5\tau\).</p>` },
      { titre: '4. Énergie emmagasinée', html: TX`<p>\(E_e = \dfrac{1}{2}C\,u_C^2 = \dfrac{q^2}{2C}\). Elle est restituée lors de la décharge (flash d’appareil photo, défibrillateur).</p>` },
    ],
    formules: [
      { tex: TX`q = C\,u_C`, sens: 'Charge du condensateur' },
      { tex: TX`i = \dfrac{dq}{dt} = C\,\dfrac{du_C}{dt}`, sens: 'Intensité' },
      { tex: TX`RC\,\dfrac{du_C}{dt} + u_C = E`, sens: 'Équation différentielle (charge)' },
      { tex: TX`u_C = E\,(1 - e^{-t/\tau}) \qquad u_C = E\,e^{-t/\tau}`, sens: 'Charge ; décharge' },
      { tex: TX`\tau = R\,C`, sens: 'Constante de temps (s)' },
      { tex: TX`E_e = \dfrac{1}{2}C\,u_C^2`, sens: 'Énergie électrique stockée' },
    ],
    retenir: [
      'La tension aux bornes d’un condensateur est continue (pas de saut).',
      TX`\(\tau = RC\) ; à \(t = \tau\) : 63 % de la charge.`,
      'Régime permanent : i = 0 et u_C = E.',
      'L’énergie stockée vaut ½Cu².',
    ],
    erreurs: [
      'Confondre charge et décharge (signe de l’exponentielle).',
      'Oublier de convertir µF en F.',
      TX`Écrire \(i = C\,u_C\) au lieu de \(C\,du_C/dt\).`,
      'Lire τ à 37 % sur une courbe de charge.',
    ],
  },
  experiences: {
    sims: ['rc'],
    protocole: { titre: 'Charge d’un condensateur', materiel: 'générateur 6 V, R = 10 kΩ, C = 100 µF, interface d’acquisition, interrupteur.',
      etapes: ['Décharger le condensateur, puis fermer l’interrupteur sur le générateur.', TX`Enregistrer \(u_C(t)\).`, 'Déterminer τ par la tangente à l’origine et par la lecture de 0,63E.', 'Recommencer avec 2R puis 2C.'] },
    observations: TX`<ul><li>\(u_C\) croît puis tend vers E ; τ ≈ 1 s.</li><li>Doubler R ou C double τ.</li></ul>`,
    conclusion: TX`<p>\(\tau = RC\) ; la charge suit \(u_C = E(1 - e^{-t/RC})\).</p>`,
  },
  quiz: [
    { q: TX`R = 2 kΩ, C = 50 µF. τ :`, o: ['0,1 s', '100 s', '10 ms', '0,04 s'], r: 0, e: TX`\(2\times10^{3}\times5\times10^{-5}\).` },
    { q: 'À t = τ lors de la charge, u_C vaut :', o: ['37 % de E', '50 % de E', '63 % de E', 'E'], r: 2, e: TX`\(1 - e^{-1}\).` },
    { q: 'En régime permanent, l’intensité dans le circuit RC :', o: ['est maximale', 'est nulle', 'vaut E/R', 'oscille'], r: 1, e: 'Le condensateur est chargé.' },
    { q: TX`C = 10 µF chargé sous 100 V. Énergie :`, o: ['0,05 J', '0,5 J', '500 J', '0,001 J'], r: 0, e: TX`\(\tfrac12\times10^{-5}\times10^4\).` },
    { q: 'Deux condensateurs de 10 µF en série :', o: ['20 µF', '5 µF', '10 µF', '100 µF'], r: 1, e: 'Les inverses s’ajoutent.' },
  ],
};
