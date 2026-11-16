/* 2ᵉ Bac · Physique · Mécanique · Systèmes mécaniques oscillants */
'use strict';
CONTENU['2b-oscillants'] = {
  resume: {
    intro: TX`Un système oscillant effectue un mouvement de va-et-vient autour d’une position d’équilibre stable. Sans frottement, ses oscillations sont <b>sinusoïdales</b> de période propre \(T_0\) : pendule élastique, pendule pesant, pendule de torsion.`,
    sections: [
      { titre: '1. Pendule élastique horizontal', sim: 'oscillateur', html: TX`<p>Solide de masse m attaché à un ressort de raideur k, sans frottement. 2ᵉ loi projetée : \(m\ddot x + kx = 0\). Solution \(x = X_m\cos\Big(\dfrac{2\pi}{T_0}t + \varphi\Big)\) avec \(T_0 = 2\pi\sqrt{\dfrac{m}{k}}\). \(X_m\) et φ sont fixés par les conditions initiales.</p>`
        + FIG(440, 110, `<rect x="10" y="20" width="12" height="70" fill="#5b6577"/><line x1="10" y1="90" x2="430" y2="90" stroke="#5b6577" stroke-width="2"/><polyline points="22,60 40,60 50,45 70,75 90,45 110,75 130,45 150,75 170,45 190,75 200,60 220,60" fill="none" stroke="#14213d" stroke-width="2"/><rect x="220" y="40" width="50" height="40" fill="#d98200"/><line x1="245" y1="96" x2="245" y2="106" stroke="#14213d"/><text x="240" y="104" font-size="11">O</text><line x1="245" y1="100" x2="340" y2="100" stroke="#1f6fe0" stroke-width="1.5"/><text x="344" y="104" fill="#1f6fe0">x</text>`) },
      { titre: '2. Pendule pesant et pendule simple', sim: 'pendule', html: TX`<p>Pour de faibles oscillations : pendule pesant \(T_0 = 2\pi\sqrt{\dfrac{J_\Delta}{mgd}}\) (d : distance axe – centre de gravité) ; pendule simple (fil de longueur ℓ) \(T_0 = 2\pi\sqrt{\dfrac{\ell}{g}}\).</p>` },
      { titre: '3. Pendule de torsion', html: TX`<p>Tige suspendue à un fil de constante de torsion C : \(J_\Delta\ddot\theta + C\theta = 0\), \(T_0 = 2\pi\sqrt{\dfrac{J_\Delta}{C}}\).</p>` },
      { titre: '4. Amortissement et résonance', html: TX`<p>Avec frottements, les oscillations sont amorties (pseudo-périodiques ou apériodiques). En oscillations forcées par un excitateur de fréquence N, l’amplitude est maximale quand \(N \approx N_0\) : <b>résonance mécanique</b> (utile : instruments ; dangereuse : ponts, machines).</p>` },
    ],
    formules: [
      { tex: TX`m\,\ddot x + k\,x = 0`, sens: 'Équation différentielle (pendule élastique)' },
      { tex: TX`x = X_m\cos\Big(\dfrac{2\pi}{T_0}t + \varphi\Big)`, sens: 'Solution' },
      { tex: TX`T_0 = 2\pi\sqrt{\dfrac{m}{k}}`, sens: 'Pendule élastique' },
      { tex: TX`T_0 = 2\pi\sqrt{\dfrac{\ell}{g}}`, sens: 'Pendule simple (faibles oscillations)' },
      { tex: TX`T_0 = 2\pi\sqrt{\dfrac{J_\Delta}{C}}`, sens: 'Pendule de torsion' },
      { tex: TX`T_0 = 2\pi\sqrt{\dfrac{J_\Delta}{m\,g\,d}}`, sens: 'Pendule pesant' },
    ],
    retenir: [
      'La période propre ne dépend pas de l’amplitude (petites oscillations).',
      'T₀ augmente avec la masse (inertie) et diminue avec la raideur.',
      'La période d’un pendule simple ne dépend pas de la masse.',
      'Résonance : amplitude maximale quand N ≈ N₀.',
    ],
    erreurs: [
      'Inverser m et k sous la racine.',
      'Croire que la période du pendule simple dépend de la masse.',
      'Oublier que la formule du pendule simple vaut pour de petits angles.',
    ],
  },
  experiences: {
    sims: ['pendule', 'oscillateur'],
    protocole: { titre: 'Période d’un pendule élastique', materiel: 'ressort, masses marquées, chronomètre, potence (ou simulation « oscillateur »).',
      etapes: ['Mesurer la durée de 10 oscillations pour m = 100 g.', 'Recommencer pour 200, 300, 400 g.', TX`Tracer \(T_0^2 = f(m)\).`, 'En déduire k.'] },
    observations: TX`<ul><li>La période augmente avec la masse.</li><li>\(T_0^2\) est proportionnel à m.</li></ul>`,
    conclusion: TX`<p>Pente \(= 4\pi^2/k\) : on vérifie \(T_0 = 2\pi\sqrt{m/k}\).</p>`,
  },
  quiz: [
    { q: TX`m = 0,4 kg, k = 40 N/m. T₀ ≈`, o: ['0,63 s', '6,3 s', '0,1 s', '1 s'], r: 0, e: TX`\(2\pi\sqrt{0{,}01}\).` },
    { q: 'Pendule simple de 1 m (g = 9,8). T₀ ≈', o: ['1 s', '2 s', '3,1 s', '0,5 s'], r: 1, e: TX`\(2\pi\sqrt{1/9{,}8}\).` },
    { q: 'Si on quadruple la masse d’un pendule élastique, T₀ :', o: ['quadruple', 'double', 'ne change pas', 'est divisée par 2'], r: 1, e: 'T₀ ∝ √m.' },
    { q: 'La période d’un pendule simple dépend :', o: ['de la masse', 'de la longueur', 'de l’amplitude (grande)', 'de la couleur'], r: 1, e: 'Pour de petits angles.' },
    { q: 'La résonance mécanique se produit quand :', o: ['N ≫ N₀', 'N ≈ N₀', 'N = 0', 'il n’y a pas d’excitateur'], r: 1, e: 'Amplitude maximale.' },
  ],
};
