/* 2ᵉ Bac · Chimie · Transformations chimiques s’effectuant dans les deux sens */
'use strict';
CONTENU['2bc-deuxsens'] = {
  resume: {
    intro: TX`Certaines transformations ne sont pas totales : à l’état final, tous les réactifs sont encore présents. La réaction se produit dans les <b>deux sens</b> ; on le montre en mesurant le pH d’une solution d’acide faible et en calculant le <b>taux d’avancement final</b> \(\tau\).`,
    sections: [
      { titre: '1. Le pH', sim: 'acide_faible', html: TX`<p>\(\text{pH} = -\log[\text{H}_3\text{O}^+]\) et \([\text{H}_3\text{O}^+] = 10^{-\text{pH}}\) (mol/L). Mesure au pH-mètre étalonné. Solution acide : pH < 7 ; neutre : pH = 7 ; basique : pH > 7 (à 25 °C).</p>` },
      { titre: '2. Taux d’avancement final', html: TX`<p>\(\tau = \dfrac{x_f}{x_{max}}\). Pour un acide AH de concentration C dans l’eau : \(\text{AH} + \text{H}_2\text{O} \rightleftharpoons \text{A}^- + \text{H}_3\text{O}^+\), \(\tau = \dfrac{[\text{H}_3\text{O}^+]}{C} = \dfrac{10^{-\text{pH}}}{C}\). Si \(\tau = 1\) : transformation <b>totale</b> (acide fort, HCl) ; si \(\tau < 1\) : <b>limitée</b> (acide faible, \(\text{CH}_3\text{COOH}\)).</p>`
        + FIG(400, 170, `<rect x="40" y="50" width="120" height="100" fill="#6aa5ff" opacity=".3" stroke="#14213d"/><text x="100" y="40" text-anchor="middle" font-size="12">HCl 10⁻² mol/L</text><text x="100" y="105" text-anchor="middle">pH = 2,0</text><text x="100" y="128" text-anchor="middle" font-size="11">τ = 1</text><rect x="240" y="50" width="120" height="100" fill="#ffd27a" opacity=".4" stroke="#14213d"/><text x="300" y="40" text-anchor="middle" font-size="12">CH₃COOH 10⁻² mol/L</text><text x="300" y="105" text-anchor="middle">pH ≈ 3,4</text><text x="300" y="128" text-anchor="middle" font-size="11">τ ≈ 0,04</text>`) },
      { titre: '3. Interprétation', sim: 'avancement', html: TX`<p>Les réactifs réagissent (sens direct) et les produits réagissent entre eux (sens inverse). À l’état final, les deux réactions se produisent à la même vitesse : le système est en <b>équilibre dynamique</b>. On écrit l’équation avec la double flèche \(\rightleftharpoons\).</p>` },
    ],
    formules: [
      { tex: TX`\text{pH} = -\log[\text{H}_3\text{O}^+]`, sens: 'Définition du pH' },
      { tex: TX`[\text{H}_3\text{O}^+] = 10^{-\text{pH}}`, sens: 'Concentration en ions oxonium' },
      { tex: TX`\tau = \dfrac{x_f}{x_{max}}`, sens: 'Taux d’avancement final' },
      { tex: TX`\tau = \dfrac{10^{-\text{pH}}}{C}`, sens: 'Acide dans l’eau' },
    ],
    retenir: [
      'τ = 1 : totale ; τ < 1 : limitée.',
      'À l’équilibre, les réactions directe et inverse ont la même vitesse.',
      'Pour un acide faible, pH > −log C.',
      'Diluer un acide faible augmente τ.',
    ],
    erreurs: [
      'Oublier le signe moins dans pH = −log[H₃O⁺].',
      'Utiliser x_max à la place de x_f.',
      'Confondre réaction lente et réaction limitée.',
    ],
  },
  experiences: {
    sims: ['acide_faible', 'avancement'],
    protocole: { titre: 'Comparer un acide fort et un acide faible', materiel: 'pH-mètre étalonné, solutions à 1,0×10⁻² mol/L d’acide chlorhydrique et d’acide éthanoïque.',
      etapes: ['Mesurer le pH des deux solutions.', TX`Calculer \([\text{H}_3\text{O}^+]\) et τ pour chacune.`, 'Diluer 10 fois la solution d’acide éthanoïque et recommencer.'] },
    observations: TX`<ul><li>HCl : pH = 2,0 → τ = 1. Acide éthanoïque : pH ≈ 3,4 → τ ≈ 0,04.</li><li>Après dilution, τ de l’acide éthanoïque augmente (≈ 0,12).</li></ul>`,
    conclusion: TX`<p>La réaction de l’acide éthanoïque avec l’eau est limitée : elle a lieu dans les deux sens.</p>`,
  },
  quiz: [
    { q: TX`[H₃O⁺] = 10⁻³ mol/L. pH :`, o: ['3', '−3', '0,001', '11'], r: 0, e: TX`\(-\log10^{-3}\).` },
    { q: TX`pH = 4,5. [H₃O⁺] :`, o: [TX`\(3{,}2\times10^{-5}\ \text{mol/L}\)`, '4,5 mol/L', TX`\(10^{-4}\ \text{mol/L}\)`, TX`\(4{,}5\times10^{-1}\ \text{mol/L}\)`], r: 0, e: TX`\(10^{-4{,}5}\).` },
    { q: TX`C = 0,010 mol/L, pH = 3,0. τ :`, o: ['0,1', '1', '0,01', '0,3'], r: 0, e: TX`\(10^{-3}/10^{-2}\).` },
    { q: 'τ < 1 signifie :', o: ['réaction totale', 'réaction limitée', 'réaction lente', 'aucune réaction'], r: 1, e: 'L’état final contient tous les réactifs.' },
    { q: 'À l’équilibre dynamique :', o: ['plus aucune réaction n’a lieu', 'les deux réactions ont la même vitesse', 'seule la réaction directe a lieu', 'x = x_max'], r: 1, e: 'Équilibre dynamique.' },
  ],
};
