/* 1ʳᵉ Bac · Chimie · Grandeurs physiques liées aux quantités de matière */
'use strict';
CONTENU['1bc-grandeurs'] = {
  resume: {
    intro: TX`Pour mesurer une quantité de matière, on utilise des grandeurs faciles à mesurer : la masse (solides, liquides), le volume et la masse volumique (liquides), la pression, le volume et la température (gaz, avec l’équation d’état des gaz parfaits).`,
    sections: [
      { titre: '1. Solides et liquides', html: TX`<p>\(n = \dfrac{m}{M}\) ; pour un liquide de masse volumique \(\rho\) : \(m = \rho V\), donc \(n = \dfrac{\rho\,V}{M}\). Densité \(d = \dfrac{\rho}{\rho_{eau}}\).</p>` },
      { titre: '2. Pression d’un gaz et loi de Boyle-Mariotte', sim: 'gaz', html: TX`<p>La pression d’un gaz résulte des chocs de ses molécules sur les parois ; elle se mesure avec un manomètre (Pa). À température constante, pour une quantité de gaz donnée : \(P\cdot V = \text{constante}\) (loi de Boyle-Mariotte).</p>` },
      { titre: '3. Équation d’état des gaz parfaits', html: TX`<p>\(P\,V = n\,R\,T\) avec \(P\) en Pa, \(V\) en m³, \(T\) en kelvins (\(T = \theta + 273{,}15\)), \(R = 8{,}31\ \text{J·mol}^{-1}\text{·K}^{-1}\). Volume molaire : \(V_m = \dfrac{RT}{P}\) (24 L/mol à 20 °C et 1013 hPa).</p>`
        + FIG(400, 180, `<line x1="40" y1="160" x2="380" y2="160" stroke="#5b6577" stroke-width="1.5"/><line x1="40" y1="170" x2="40" y2="10" stroke="#5b6577" stroke-width="1.5"/><text x="370" y="176">V</text><text x="46" y="20">P</text><polyline points="${Array.from({ length: 60 }, (_, i) => { const V = 0.6 + i * 0.1; return (40 + V * 50) + ',' + (160 - 120 / V); }).join(' ')}" fill="none" stroke="#1f6fe0" stroke-width="3"/><text x="200" y="70" fill="#1f6fe0">P·V = constante (θ fixe)</text>`) },
    ],
    formules: [
      { tex: TX`n = \dfrac{m}{M} = \dfrac{\rho\,V}{M}`, sens: 'Solides et liquides' },
      { tex: TX`P\,V = n\,R\,T`, sens: 'Équation d’état des gaz parfaits' },
      { tex: TX`T(\text{K}) = \theta(°\text{C}) + 273{,}15`, sens: 'Température absolue' },
      { tex: TX`n = \dfrac{V}{V_m} \qquad V_m = \dfrac{R\,T}{P}`, sens: 'Volume molaire' },
      { tex: TX`P\,V = \text{constante}`, sens: 'Loi de Boyle-Mariotte (n et T fixes)' },
    ],
    retenir: [
      'Liquide : n = ρV/M.',
      'Gaz parfait : PV = nRT en unités SI (Pa, m³, K).',
      'À T constante, P et V sont inversement proportionnels.',
      'Le volume molaire dépend de T et P, pas de la nature du gaz.',
    ],
    erreurs: [
      'Utiliser des degrés Celsius dans PV = nRT.',
      TX`Mettre V en L avec P en Pa (il faut des m³ : \(1\ \text{L} = 10^{-3}\ \text{m}^3\)).`,
      TX`Utiliser hPa ou bar sans conversion.`,
    ],
  },
  experiences: {
    sims: ['gaz', 'mole'],
    protocole: { titre: 'Vérifier la loi de Boyle-Mariotte', materiel: 'seringue de 60 mL reliée à un manomètre (pressiomètre).',
      etapes: ['Emprisonner 60 mL d’air dans la seringue, relever P.', 'Comprimer à 50, 40, 30 mL lentement (température constante) ; relever P.', TX`Calculer \(P\cdot V\) et tracer \(P = f(1/V)\).`] },
    observations: TX`<ul><li>P augmente quand V diminue.</li><li>Le produit \(P\cdot V\) reste pratiquement constant ; \(P = f(1/V)\) est une droite passant par l’origine.</li></ul>`,
    conclusion: TX`<p>À température constante, \(PV = \text{constante} = nRT\).</p>`,
  },
  quiz: [
    { q: TX`Quantité de matière contenue dans 2,0 L de gaz à 20 °C et \(10^5\ \text{Pa}\) :`, o: ['0,082 mol', '0,82 mol', '8,2 mol', '0,0082 mol'], r: 0, e: TX`\(n = \dfrac{10^5\times2\times10^{-3}}{8{,}31\times293} \approx 0{,}082\ \text{mol}\).` },
    { q: 'À T constante, si V est divisé par 2, P est :', o: ['divisée par 2', 'multipliée par 2', 'inchangée', 'multipliée par 4'], r: 1, e: 'PV = constante.' },
    { q: '25 °C en kelvins :', o: ['248 K', '298 K', '25 K', '273 K'], r: 1, e: '25 + 273.' },
    { q: TX`10 mL d’éthanol (\(\rho = 0{,}79\ \text{g/mL}\), \(M = 46\)) : n ≈`, o: ['0,17 mol', '0,22 mol', '7,9 mol', '0,46 mol'], r: 0, e: TX`\(7{,}9/46\).` },
    { q: 'Le volume molaire d’un gaz dépend :', o: ['de sa nature', 'de T et P', 'de sa masse molaire', 'de sa couleur'], r: 1, e: TX`\(V_m = RT/P\).` },
  ],
};
