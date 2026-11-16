/* 2ᵉ Bac · Chimie · Transformations liées à des réactions acide-base */
'use strict';
CONTENU['2bc-acidebase'] = {
  resume: {
    intro: TX`L’eau s’autoprotolyse : \([\text{H}_3\text{O}^+][\text{HO}^-] = K_e\). Chaque couple acide/base est caractérisé par sa <b>constante d’acidité</b> \(K_A\) (ou \(\text{p}K_A\)), qui permet de prévoir l’espèce prédominante selon le pH et la constante d’une réaction acide-base.`,
    sections: [
      { titre: '1. Produit ionique de l’eau', html: TX`<p>\(2\,\text{H}_2\text{O} \rightleftharpoons \text{H}_3\text{O}^+ + \text{HO}^-\) ; \(K_e = [\text{H}_3\text{O}^+][\text{HO}^-] = 10^{-14}\) à 25 °C (\(\text{p}K_e = 14\)). Solution neutre : pH = 7 ; acide : pH < 7 ; basique : pH > 7. Dans une solution basique : \([\text{HO}^-] = 10^{\text{pH} - 14}\).</p>` },
      { titre: '2. Constante d’acidité', sim: 'acide_faible', html: TX`<p>Pour \(\text{AH} + \text{H}_2\text{O} \rightleftharpoons \text{A}^- + \text{H}_3\text{O}^+\) : \(K_A = \dfrac{[\text{A}^-]_{éq}[\text{H}_3\text{O}^+]_{éq}}{[\text{AH}]_{éq}}\), \(\text{p}K_A = -\log K_A\). Relation : \(\text{pH} = \text{p}K_A + \log\dfrac{[\text{A}^-]}{[\text{AH}]}\). Plus le pK_A est petit, plus l’acide est fort (dissocié).</p>` },
      { titre: '3. Diagramme de prédominance', sim: 'predominance', html: TX`<p>pH < pK_A : AH prédomine ; pH > pK_A : A⁻ prédomine ; pH = pK_A : \([\text{AH}] = [\text{A}^-]\). Indicateur coloré : sa zone de virage est \([\text{p}K_A - 1 ; \text{p}K_A + 1]\).</p>`
        + FIG(440, 90, `<line x1="20" y1="45" x2="420" y2="45" stroke="#14213d" stroke-width="2"/><line x1="220" y1="30" x2="220" y2="60" stroke="#d93a4a" stroke-width="2"/><text x="208" y="78" fill="#d93a4a">pK_A</text><text x="410" y="78">pH</text><text x="110" y="34" text-anchor="middle" font-weight="bold">AH prédomine</text><text x="320" y="34" text-anchor="middle" font-weight="bold">A⁻ prédomine</text>`) },
      { titre: '4. Constante d’une réaction acide-base', html: TX`<p>Pour \(\text{A}_1\text{H} + \text{A}_2^- \rightleftharpoons \text{A}_1^- + \text{A}_2\text{H}\) : \(K = \dfrac{K_{A1}}{K_{A2}} = 10^{\text{p}K_{A2} - \text{p}K_{A1}}\). Si \(K > 10^{4}\), la réaction est pratiquement totale.</p>` },
    ],
    formules: [
      { tex: TX`K_e = [\text{H}_3\text{O}^+][\text{HO}^-] = 10^{-14}`, sens: 'Produit ionique de l’eau (25 °C)' },
      { tex: TX`K_A = \dfrac{[\text{A}^-][\text{H}_3\text{O}^+]}{[\text{AH}]}`, sens: 'Constante d’acidité' },
      { tex: TX`\text{p}K_A = -\log K_A`, sens: 'pK_A' },
      { tex: TX`\text{pH} = \text{p}K_A + \log\dfrac{[\text{A}^-]}{[\text{AH}]}`, sens: 'Relation pH – pK_A' },
      { tex: TX`K = \dfrac{K_{A1}}{K_{A2}} = 10^{\text{p}K_{A2} - \text{p}K_{A1}}`, sens: 'Constante d’une réaction acide-base' },
    ],
    retenir: [
      'pKe = 14 à 25 °C.',
      'Petit pK_A : acide plus fort ; grand pK_A : base plus forte.',
      'pH = pK_A : autant d’acide que de base.',
      'K > 10⁴ : réaction pratiquement totale.',
    ],
    erreurs: [
      'Inverser K_A1 et K_A2 dans K.',
      'Oublier que [HO⁻] = Ke/[H₃O⁺].',
      'Confondre force d’un acide et concentration.',
    ],
  },
  experiences: {
    sims: ['predominance', 'acide_faible'],
    protocole: { titre: 'Déterminer un pK_A par mesure de pH', materiel: 'pH-mètre, solutions d’acide éthanoïque et d’éthanoate de sodium de même concentration, éprouvettes.',
      etapes: ['Préparer des mélanges de volumes V₁ d’acide et V₂ de base (V₁/V₂ = 4, 2, 1, 1/2, 1/4).', 'Mesurer le pH de chaque mélange.', TX`Tracer \(\text{pH} = f(\log([\text{A}^-]/[\text{AH}]))\).`] },
    observations: TX`<ul><li>Les points sont alignés sur une droite de pente 1.</li><li>Pour le mélange équimolaire, pH ≈ 4,8.</li></ul>`,
    conclusion: TX`<p>\(\text{pK}_A(\text{CH}_3\text{COOH}/\text{CH}_3\text{COO}^-) \approx 4{,}8\).</p>`,
  },
  quiz: [
    { q: 'Solution de pH = 10. [HO⁻] :', o: [TX`\(10^{-4}\ \text{mol/L}\)`, TX`\(10^{-10}\ \text{mol/L}\)`, '10 mol/L', TX`\(10^{-14}\ \text{mol/L}\)`], r: 0, e: TX`\(10^{-14}/10^{-10}\).` },
    { q: 'À pH = 3 pour le couple CH₃COOH/CH₃COO⁻ (pK_A = 4,8), l’espèce prédominante est :', o: ['CH₃COOH', 'CH₃COO⁻', 'les deux à égalité', 'H₂O'], r: 0, e: 'pH < pK_A.' },
    { q: 'L’acide le plus fort a :', o: ['le plus grand pK_A', 'le plus petit pK_A', 'pK_A = 7', 'K_A = 1'], r: 1, e: 'K_A plus grande.' },
    { q: TX`pK_A1 = 4,8, pK_A2 = 9,2. K de A₁H + A₂⁻ :`, o: [TX`\(10^{4{,}4}\)`, TX`\(10^{-4{,}4}\)`, '4,4', TX`\(10^{14}\)`], r: 0, e: TX`\(10^{9{,}2 - 4{,}8}\).` },
    { q: 'pH = pK_A + 1. [A⁻]/[AH] :', o: ['10', '1', '0,1', '2'], r: 0, e: TX`\(\log(\dots) = 1\).` },
  ],
};
