/* 2ᵉ Bac · Physique · Électricité · Dipôle RL */
'use strict';
CONTENU['2b-rl'] = {
  resume: {
    intro: TX`Une <b>bobine</b> (inductance \(L\), résistance \(r\)) s’oppose aux variations du courant : l’intensité ne peut pas varier brusquement. Dans un dipôle RL, le courant s’établit et s’annule progressivement avec la constante de temps \(\tau = L/R_T\).`,
    sections: [
      { titre: '1. La bobine', html: TX`<p>Tension aux bornes (convention récepteur) : \(u_L = r\,i + L\,\dfrac{di}{dt}\) (L en henrys). En régime permanent (\(i\) constant), la bobine se comporte comme un conducteur ohmique de résistance \(r\). Phénomène d’<b>auto-induction</b> : retard à l’établissement du courant, surtension à la rupture.</p>` },
      { titre: '2. Établissement du courant', sim: 'rl', html: TX`<p>\(L\,\dfrac{di}{dt} + R_T\,i = E\) avec \(R_T = R + r\). Solution : \(i(t) = \dfrac{E}{R_T}\,(1 - e^{-t/\tau})\) avec \(\tau = \dfrac{L}{R_T}\). Régime permanent : \(I_0 = E/R_T\).</p>`
        + FIG(440, 190, `<line x1="40" y1="160" x2="420" y2="160" stroke="#5b6577"/><line x1="40" y1="170" x2="40" y2="10" stroke="#5b6577"/><text x="410" y="180">t</text><text x="46" y="20">i</text><line x1="40" y1="40" x2="420" y2="40" stroke="#9aa6bf" stroke-dasharray="5 4"/><text x="14" y="44">I₀</text><polyline points="${Array.from({ length: 77 }, (_, i) => (40 + i * 5) + ',' + (160 - 120 * (1 - Math.exp(-i * 5 / 70))).toFixed(1)).join(' ')}" fill="none" stroke="#12946a" stroke-width="3"/><line x1="110" y1="160" x2="110" y2="84" stroke="#d93a4a" stroke-dasharray="3 3"/><text x="104" y="180" fill="#d93a4a">τ</text>`) },
      { titre: '3. Rupture du courant', html: TX`<p>\(i(t) = I_0\,e^{-t/\tau}\). Si le circuit est ouvert brutalement, \(di/dt\) est énorme : surtension (étincelle) ; on protège par une diode de roue libre.</p>` },
      { titre: '4. Énergie magnétique', html: TX`<p>\(E_m = \dfrac{1}{2}L\,i^2\), stockée dans la bobine et restituée à la rupture du courant.</p>` },
    ],
    formules: [
      { tex: TX`u_L = r\,i + L\,\dfrac{di}{dt}`, sens: 'Tension aux bornes d’une bobine' },
      { tex: TX`L\,\dfrac{di}{dt} + R_T\,i = E`, sens: 'Équation différentielle (établissement)' },
      { tex: TX`i = \dfrac{E}{R_T}\,(1 - e^{-t/\tau}) \qquad i = I_0\,e^{-t/\tau}`, sens: 'Établissement ; rupture' },
      { tex: TX`\tau = \dfrac{L}{R_T}`, sens: 'Constante de temps' },
      { tex: TX`E_m = \dfrac{1}{2}L\,i^2`, sens: 'Énergie magnétique' },
    ],
    retenir: [
      'L’intensité dans une bobine ne subit pas de discontinuité.',
      'τ = L/R_T avec R_T la résistance totale (r comprise).',
      'En régime permanent, la bobine équivaut à sa résistance r.',
      'Rupture brutale : surtension.',
    ],
    erreurs: [
      'Oublier r dans R_T.',
      TX`Oublier le terme \(r\,i\) dans \(u_L\).`,
      'Croire que la tension aux bornes de la bobine ne peut pas varier brusquement (c’est i qui est continue).',
      'Utiliser des mH sans conversion.',
    ],
  },
  experiences: {
    sims: ['rl'],
    protocole: { titre: 'Établissement du courant dans un dipôle RL', materiel: 'bobine (L ≈ 0,1 H, r ≈ 10 Ω), R = 100 Ω, générateur 6 V, interface (mesure de u_R).',
      etapes: [TX`Enregistrer \(u_R(t)\), image de \(i = u_R/R\), à la fermeture du circuit.`, 'Déterminer τ (tangente ou 63 % de I₀).', TX`Comparer avec \(L/(R + r)\).`, 'Recommencer avec un noyau de fer dans la bobine (L augmente).'] },
    observations: TX`<ul><li>Le courant s’établit progressivement ; τ ≈ 0,9 ms.</li><li>Avec le noyau de fer, l’établissement est plus lent.</li></ul>`,
    conclusion: TX`<p>\(\tau = L/R_T\) : la bobine retarde l’établissement du courant d’autant plus que L est grande.</p>`,
  },
  quiz: [
    { q: TX`L = 0,5 H, R_T = 50 Ω. τ :`, o: ['10 ms', '25 s', '100 s', '0,1 s'], r: 0, e: TX`\(0{,}5/50\).` },
    { q: 'Dans une bobine, la grandeur continue est :', o: ['la tension', 'l’intensité', 'la puissance', 'aucune'], r: 1, e: 'Elle s’oppose aux variations de i.' },
    { q: 'En régime permanent, la tension aux bornes de la bobine vaut :', o: ['0', 'r·I₀', 'E', 'L·I₀'], r: 1, e: 'di/dt = 0.' },
    { q: TX`L = 0,2 H, i = 0,5 A. Énergie stockée :`, o: ['0,025 J', '0,05 J', '0,1 J', '0,25 J'], r: 0, e: TX`\(\tfrac12\times0{,}2\times0{,}25\).` },
    { q: 'L’ouverture brutale d’un circuit inductif provoque :', o: ['une surtension', 'une baisse de tension', 'rien', 'une charge'], r: 0, e: 'di/dt très grand.' },
  ],
};
