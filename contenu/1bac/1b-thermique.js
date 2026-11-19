/* 1ʳᵉ Bac SM · Physique · Travail et énergie · Énergie thermique et transfert thermique */
'use strict';
CONTENU['1b-thermique'] = {
  resume: {
    intro: TX`Un <b>transfert thermique</b> (chaleur \(Q\)) se fait spontanément du corps chaud vers le corps froid. Il modifie la température d’un corps (\(Q = mc\Delta\theta\)) ou provoque un changement d’état (\(Q = mL\)). La <b>calorimétrie</b> permet de mesurer ces transferts.`,
    sections: [
      { titre: '1. Modes de transfert', html: TX`<ul><li><b>Conduction</b> : de proche en proche dans un solide (cuillère dans le thé).</li><li><b>Convection</b> : par déplacement de matière dans un fluide (chauffage).</li><li><b>Rayonnement</b> : par ondes électromagnétiques, même dans le vide (Soleil).</li></ul>` },
      { titre: '2. Variation de température', sim: 'calorimetrie', html: TX`<p>\(Q = m\,c\,(\theta_f - \theta_i)\) : \(c\) est la <b>capacité thermique massique</b> (J·kg⁻¹·K⁻¹ ; eau : 4185). \(\mu = mc\) est la capacité thermique du corps (J/K). \(Q > 0\) : le corps reçoit de la chaleur.</p>` },
      { titre: '3. Changement d’état', html: TX`<p>Un corps pur change d’état à température constante en recevant ou cédant \(Q = m\,L\), où \(L\) est la <b>chaleur latente</b> (J/kg ; fusion de la glace : \(3{,}34\times10^{5}\ \text{J/kg}\)). Fusion, vaporisation : \(Q > 0\) ; solidification, liquéfaction : \(Q < 0\).</p>` },
      { titre: '4. Calorimétrie', html: TX`<p>Dans un calorimètre (système isolé), la somme des chaleurs échangées est nulle : \(\sum Q_i = 0\). On détermine ainsi une température d’équilibre, une capacité thermique massique ou une chaleur latente. La température finale est la même pour tous les corps.</p>`
        + FIG(260, 180, `<rect x="40" y="30" width="180" height="140" rx="12" fill="#e3e9f3" stroke="#14213d" stroke-width="2"/><rect x="60" y="50" width="140" height="110" rx="8" fill="#fff" stroke="#14213d"/><rect x="62" y="90" width="136" height="68" fill="#6aa5ff" opacity=".4"/><line x1="160" y1="10" x2="160" y2="130" stroke="#d93a4a" stroke-width="4"/><text x="166" y="22" font-size="11">thermomètre</text><line x1="100" y1="16" x2="100" y2="120" stroke="#5b6577" stroke-width="2"/><text x="60" y="14" font-size="11">agitateur</text>`) },
    ],
    formules: [
      { tex: TX`Q = m\,c\,(\theta_f - \theta_i)`, sens: 'Chaleur et variation de température (J)' },
      { tex: TX`\mu = m\,c`, sens: 'Capacité thermique (J/K)' },
      { tex: TX`Q = m\,L`, sens: 'Chaleur de changement d’état' },
      { tex: TX`\sum Q_i = 0`, sens: 'Système isolé (calorimètre)' },
      { tex: TX`c_{eau} = 4185\ \text{J}\cdot\text{kg}^{-1}\cdot\text{K}^{-1}`, sens: 'Capacité thermique massique de l’eau' },
    ],
    retenir: [
      'La chaleur va spontanément du chaud vers le froid.',
      'Q > 0 si le corps reçoit de la chaleur.',
      'Pendant un changement d’état, la température reste constante.',
      'Dans un calorimètre, la somme des chaleurs échangées est nulle.',
      'Une variation de 1 °C est une variation de 1 K.',
    ],
    erreurs: [
      TX`Écrire \(\theta_i - \theta_f\) dans \(Q = mc\Delta\theta\).`,
      'Oublier la capacité thermique du calorimètre.',
      'Oublier la chaleur de fusion de la glace avant son réchauffement.',
      'Confondre chaleur et température.',
    ],
  },
  experiences: {
    sims: ['calorimetrie'],
    protocole: { titre: 'Mélanger de l’eau chaude et de l’eau froide', materiel: 'calorimètre, thermomètre, éprouvette, eau froide et eau chaude.',
      etapes: ['Verser 200 g d’eau froide dans le calorimètre ; mesurer θ₁ après équilibre.', 'Ajouter 100 g d’eau chaude à θ₂ ; agiter et relever la température finale θ_f.', TX`Comparer à la valeur prévue par \(\sum Q = 0\).`, 'Utiliser la simulation pour d’autres masses.'] },
    observations: TX`<ul><li>La température finale est comprise entre θ₁ et θ₂, plus proche de celle de la masse la plus grande.</li><li>Elle est légèrement inférieure à la prévision : le calorimètre absorbe un peu de chaleur.</li></ul>`,
    conclusion: TX`<p>\(m_1c(\theta_f - \theta_1) + m_2c(\theta_f - \theta_2) = 0\) donne \(\theta_f = \dfrac{m_1\theta_1 + m_2\theta_2}{m_1 + m_2}\) (calorimètre négligé).</p>`,
  },
  quiz: [
    { q: 'Chaleur pour chauffer 1 kg d’eau de 20 °C à 70 °C :', o: ['209 kJ', '4185 J', '293 kJ', '83,7 kJ'], r: 0, e: TX`\(1\times4185\times50\).` },
    { q: 'On mélange 1 kg d’eau à 20 °C et 1 kg à 60 °C (sans pertes). θ_f :', o: ['40 °C', '80 °C', '30 °C', '50 °C'], r: 0, e: 'Masses égales : moyenne.' },
    { q: 'Pendant la fusion de la glace, la température :', o: ['augmente', 'reste à 0 °C', 'diminue', 'oscille'], r: 1, e: 'Changement d’état d’un corps pur.' },
    { q: 'Chaleur pour fondre 100 g de glace à 0 °C (L = 334 kJ/kg) :', o: ['33,4 kJ', '334 kJ', '3,34 kJ', '41,8 kJ'], r: 0, e: TX`\(0{,}1\times334\).` },
    { q: 'Le transfert de chaleur du Soleil vers la Terre se fait par :', o: ['conduction', 'convection', 'rayonnement', 'calorimétrie'], r: 2, e: 'Le vide ne permet ni conduction ni convection.' },
  ],
};
