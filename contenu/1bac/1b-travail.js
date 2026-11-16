/* 1ʳᵉ Bac · Physique · Travail et énergie · Travail et puissance d’une force */
'use strict';
CONTENU['1b-travail'] = {
  resume: {
    intro: TX`Une force travaille quand son point d’application se déplace. Le <b>travail</b> (en joules) mesure l’énergie transférée par la force ; la <b>puissance</b> (en watts) mesure la rapidité de ce transfert.`,
    sections: [
      { titre: '1. Travail d’une force constante', sim: 'travail', html: TX`<p>Pour une force constante \(\vec F\) dont le point d’application va de A à B :</p><p style="text-align:center">\(W_{AB}(\vec F) = \vec F\cdot\overrightarrow{AB} = F\cdot AB\cdot\cos\alpha\)</p>
<ul><li>\(0 \le \alpha < 90°\) : travail <b>moteur</b> (\(W > 0\)) ;</li><li>\(\alpha = 90°\) : travail <b>nul</b> (force perpendiculaire au déplacement) ;</li><li>\(90° < \alpha \le 180°\) : travail <b>résistant</b> (\(W < 0\)).</li></ul>`
        + FIG(400, 130, ARW('w1') + `<line x1="40" y1="100" x2="360" y2="100" stroke="#5b6577" stroke-width="2"/><rect x="90" y="76" width="50" height="24" fill="#d98200"/><rect x="280" y="76" width="50" height="24" fill="#d98200" opacity=".4"/><text x="110" y="122">A</text><text x="300" y="122">B</text>${VEC(115, 88, 195, 38, 'F', '#d93a4a', 'w1')}<line x1="115" y1="88" x2="215" y2="88" stroke="#9aa6bf" stroke-dasharray="4 3"/><path d="M150 88 A35 35 0 0 0 145 70" fill="none" stroke="#14213d"/><text x="155" y="78">α</text>`) },
      { titre: '2. Travail du poids', html: TX`<p>Le travail du poids ne dépend pas du chemin suivi, seulement des altitudes de départ et d’arrivée (axe Oz vers le haut) :</p><p style="text-align:center">\(W_{AB}(\vec P) = m\,g\,(z_A - z_B)\)</p><p>Moteur quand le corps descend, résistant quand il monte.</p>` },
      { titre: '3. Travail en rotation', html: TX`<p>Pour une force de moment constant \(\mathcal M_\Delta\) appliquée à un solide qui tourne de \(\Delta\theta\) : \(W = \mathcal M_\Delta\cdot\Delta\theta\) (même formule pour un couple).</p>` },
      { titre: '4. Puissance', html: TX`<p>Puissance moyenne : \(P = \dfrac{W}{\Delta t}\) (W). Puissance instantanée : \(P = \vec F\cdot\vec v = F\,v\cos\alpha\) en translation ; \(P = \mathcal M_\Delta\cdot\omega\) en rotation. \(1\ \text{kWh} = 3{,}6\times10^{6}\ \text{J}\).</p>` },
    ],
    formules: [
      { tex: TX`W_{AB}(\vec F) = F\cdot AB\cdot\cos\alpha`, sens: 'Travail d’une force constante (J)' },
      { tex: TX`W_{AB}(\vec P) = m\,g\,(z_A - z_B)`, sens: 'Travail du poids' },
      { tex: TX`W = \mathcal M_\Delta\cdot\Delta\theta`, sens: 'Travail en rotation' },
      { tex: TX`P = \dfrac{W}{\Delta t}`, sens: 'Puissance moyenne (W)' },
      { tex: TX`P = F\,v\cos\alpha \qquad P = \mathcal M_\Delta\,\omega`, sens: 'Puissance instantanée' },
    ],
    retenir: [
      'Une force ne travaille que si son point d’application se déplace.',
      'Le signe du travail dépend de l’angle entre la force et le déplacement.',
      'Le travail du poids ne dépend que de la différence d’altitude.',
      'Une force perpendiculaire au déplacement (réaction sans frottement) ne travaille pas.',
      'La puissance est le travail par unité de temps.',
    ],
    erreurs: [
      TX`Écrire \(m g (z_B - z_A)\) pour le travail du poids.`,
      'Utiliser une distance horizontale au lieu de la longueur du déplacement.',
      'Oublier le signe négatif d’un travail résistant (frottement).',
      'Mettre la calculatrice en radians avec un angle en degrés.',
    ],
  },
  experiences: {
    sims: ['travail', 'energie'],
    protocole: { titre: 'Mesurer le travail d’une force de traction', materiel: 'chariot, dynamomètre, règle, plan horizontal (ou simulation « travail »).',
      etapes: ['Tirer le chariot avec le dynamomètre à force constante sur 50 cm.', 'Recommencer en inclinant le dynamomètre de 30°, puis de 60°.', TX`Calculer \(W = F\cdot AB\cos\alpha\) dans chaque cas.`, 'Dans la simulation, faire varier α jusqu’à 180°.'] },
    observations: TX`<ul><li>Pour une même force, le travail diminue quand α augmente ; il est nul à 90°.</li><li>Au-delà de 90°, le travail devient négatif (résistant).</li></ul>`,
    conclusion: TX`<p>\(W = F\cdot AB\cos\alpha\) : seule la composante de la force parallèle au déplacement travaille.</p>`,
  },
  quiz: [
    { q: TX`F = 50 N, AB = 10 m, α = 60°. Le travail :`, o: ['500 J', '250 J', '433 J', '0 J'], r: 1, e: TX`\(50\times10\times0{,}5\).` },
    { q: 'Le travail de la réaction normale d’un plan sur un solide qui glisse :', o: ['moteur', 'résistant', 'nul', 'égal au poids'], r: 2, e: 'Elle est perpendiculaire au déplacement.' },
    { q: 'Un objet de 2 kg monte de 3 m (g = 10). Travail du poids :', o: ['60 J', '−60 J', '6 J', '−6 J'], r: 1, e: TX`\(mg(z_A - z_B) = 20\times(-3)\).` },
    { q: 'Un moteur fournit 1200 J en 4 s. Sa puissance :', o: ['300 W', '4800 W', '1200 W', '0,003 W'], r: 0, e: TX`\(P = W/\Delta t\).` },
    { q: TX`\(\mathcal M = 2\ \text{N·m}\), \(\omega = 50\ \text{rad/s}\). Puissance :`, o: ['25 W', '100 W', '52 W', '0,04 W'], r: 1, e: TX`\(P = \mathcal M\omega\).` },
  ],
};
