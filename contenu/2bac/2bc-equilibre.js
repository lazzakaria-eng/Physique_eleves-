/* 2ᵉ Bac · Chimie · État d’équilibre d’un système chimique */
'use strict';
CONTENU['2bc-equilibre'] = {
  resume: {
    intro: TX`Le <b>quotient de réaction</b> \(Q_r\) caractérise l’état d’un système. À l’équilibre, il prend une valeur qui ne dépend que de la température : la <b>constante d’équilibre</b> \(K\). Le taux d’avancement final dépend de K et de l’état initial.`,
    sections: [
      { titre: '1. Quotient de réaction', html: TX`<p>Pour \(a\,\text{A}(aq) + b\,\text{B}(aq) \rightleftharpoons c\,\text{C}(aq) + d\,\text{D}(aq)\) : \(Q_r = \dfrac{[\text{C}]^c\,[\text{D}]^d}{[\text{A}]^a\,[\text{B}]^b}\) (concentrations en mol/L, sans unité). L’eau (solvant) et les solides n’apparaissent pas.</p>` },
      { titre: '2. Constante d’équilibre', sim: 'acide_faible', html: TX`<p>À l’équilibre : \(Q_{r,éq} = K\). K ne dépend que de la température, pas de l’état initial. Plus K est grande, plus la réaction est avancée dans le sens direct.</p>` },
      { titre: '3. Détermination par conductimétrie', sim: 'conductimetrie', html: TX`<p>Pour un acide faible : \(\sigma = \lambda_{\text{H}_3\text{O}^+}[\text{H}_3\text{O}^+] + \lambda_{\text{A}^-}[\text{A}^-]\) avec \([\text{H}_3\text{O}^+] = [\text{A}^-]\) ; on en déduit les concentrations à l’équilibre, puis \(K = \dfrac{C\,\tau^2}{1 - \tau}\).</p>` },
      { titre: '4. Facteurs influençant τ', html: TX`<p>τ dépend de K et de l’état initial : pour un acide faible, plus la solution est diluée, plus τ est grand.</p>`
        + FIG(440, 190, `<line x1="40" y1="170" x2="420" y2="170" stroke="#5b6577"/><line x1="40" y1="180" x2="40" y2="10" stroke="#5b6577"/><text x="390" y="188" font-size="11">C (mol/L)</text><text x="46" y="20">τ</text><polyline points="${Array.from({ length: 76 }, (_, i) => { const C = 0.0005 + i * 0.0013; const K = 1.8e-5; const t = (-K + Math.sqrt(K * K + 4 * K * C)) / (2 * C); return (40 + i * 5) + ',' + (170 - 700 * t).toFixed(1); }).join(' ')}" fill="none" stroke="#1f6fe0" stroke-width="3"/><text x="200" y="100" font-size="11">τ diminue quand C augmente</text>`) },
    ],
    formules: [
      { tex: TX`Q_r = \dfrac{[\text{C}]^c\,[\text{D}]^d}{[\text{A}]^a\,[\text{B}]^b}`, sens: 'Quotient de réaction' },
      { tex: TX`K = Q_{r,éq}`, sens: 'Constante d’équilibre' },
      { tex: TX`\sigma = \sum\lambda_i\,[X_i]_{éq}`, sens: 'Conductivité à l’équilibre' },
      { tex: TX`K = \dfrac{C\,\tau^2}{1 - \tau}`, sens: 'Acide faible de concentration C' },
    ],
    retenir: [
      'L’eau et les solides n’apparaissent pas dans Q_r.',
      'K ne dépend que de la température.',
      'τ dépend de K et des conditions initiales.',
      'Plus un acide faible est dilué, plus il est dissocié.',
    ],
    erreurs: [
      'Mettre [H₂O] dans le quotient.',
      'Oublier les coefficients en exposant.',
      'Croire que K change avec la concentration initiale.',
      'Oublier la conversion mol/L → mol/m³ en conductimétrie.',
    ],
  },
  experiences: {
    sims: ['acide_faible', 'conductimetrie'],
    protocole: { titre: 'Constante d’acidité de l’acide éthanoïque par conductimétrie', materiel: 'conductimètre, solutions d’acide éthanoïque à 10⁻², 5×10⁻³ et 10⁻³ mol/L.',
      etapes: ['Mesurer σ de chaque solution.', TX`Calculer \([\text{H}_3\text{O}^+]_{éq} = \sigma/(\lambda_{\text{H}_3\text{O}^+} + \lambda_{\text{CH}_3\text{COO}^-})\).`, 'Calculer τ et K pour chaque solution.'] },
    observations: TX`<ul><li>τ augmente quand la concentration diminue.</li><li>K est pratiquement la même pour les trois solutions (≈ 1,8×10⁻⁵).</li></ul>`,
    conclusion: TX`<p>K ne dépend pas de l’état initial ; τ, si.</p>`,
  },
  quiz: [
    { q: TX`Q_r de \(\text{CH}_3\text{COOH} + \text{H}_2\text{O} \rightleftharpoons \text{CH}_3\text{COO}^- + \text{H}_3\text{O}^+\) :`, o: [TX`\(\dfrac{[\text{CH}_3\text{COO}^-][\text{H}_3\text{O}^+]}{[\text{CH}_3\text{COOH}]}\)`, TX`\(\dfrac{[\text{CH}_3\text{COOH}]}{[\text{CH}_3\text{COO}^-]}\)`, TX`\([\text{H}_3\text{O}^+]\)`, TX`avec [H₂O] au dénominateur`], r: 0, e: 'L’eau, solvant, n’apparaît pas.' },
    { q: 'La constante d’équilibre dépend :', o: ['de la concentration initiale', 'de la température', 'du volume', 'du catalyseur'], r: 1, e: 'Seulement de T.' },
    { q: TX`C = 0,01 mol/L, τ = 0,04. K ≈`, o: [TX`\(1{,}7\times10^{-5}\)`, TX`\(4\times10^{-4}\)`, TX`\(1{,}6\times10^{-3}\)`, '0,04'], r: 0, e: TX`\(0{,}01\times0{,}0016/0{,}96\).` },
    { q: 'Si on dilue un acide faible, τ :', o: ['augmente', 'diminue', 'ne change pas', 's’annule'], r: 0, e: 'Il se dissocie davantage.' },
    { q: 'À l’équilibre :', o: ['Q_r = 0', 'Q_r = K', 'Q_r > K', 'K = 1'], r: 1, e: 'Définition.' },
  ],
};
