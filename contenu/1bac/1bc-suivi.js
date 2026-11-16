/* 1ʳᵉ Bac · Chimie · Suivi d’une transformation chimique */
'use strict';
CONTENU['1bc-suivi'] = {
  resume: {
    intro: TX`Pour suivre une transformation, on mesure au cours du temps une grandeur physique liée à l’avancement : volume ou <b>pression</b> d’un gaz formé, conductance, couleur… Le tableau d’avancement relie cette grandeur à \(x\).`,
    sections: [
      { titre: '1. Tableau d’avancement (rappel)', sim: 'avancement', html: TX`<p>\(n(\text{A}) = n_0(\text{A}) - a\,x\), \(n(\text{C}) = c\,x\) ; \(x_{max}\) est la plus petite valeur annulant un réactif (réactif limitant).</p>` },
      { titre: '2. Suivi par mesure de pression', sim: 'gaz', html: TX`<p>Si un gaz se forme dans un récipient fermé de volume \(V\) à température \(T\) : la quantité de gaz formée \(n(\text{gaz}) = \dfrac{(P - P_0)\,V}{R\,T}\), où \(P_0\) est la pression initiale de l’air. Si le coefficient du gaz est 1 : \(x = \dfrac{(P - P_0)\,V}{R\,T}\).</p>`
        + FIG(420, 190, `<line x1="40" y1="170" x2="400" y2="170" stroke="#5b6577" stroke-width="1.5"/><line x1="40" y1="180" x2="40" y2="10" stroke="#5b6577" stroke-width="1.5"/><text x="390" y="186">t</text><text x="46" y="20">x (mol)</text><path d="M40 170 C 100 60, 180 40, 390 36" fill="none" stroke="#1f6fe0" stroke-width="3"/><line x1="40" y1="36" x2="390" y2="36" stroke="#d93a4a" stroke-dasharray="5 4"/><text x="300" y="30" fill="#d93a4a">x_max</text>`) },
      { titre: '3. Autres méthodes', html: TX`<ul><li>Volume de gaz recueilli par déplacement d’eau : \(n = V/V_m\).</li><li>Conductimétrie, si des ions apparaissent ou disparaissent.</li><li>Masse du système (gaz qui s’échappe).</li></ul>` },
    ],
    formules: [
      { tex: TX`n(\text{A}) = n_0(\text{A}) - a\,x`, sens: 'Quantité de réactif' },
      { tex: TX`x_{max} = \min\Big(\dfrac{n_0(\text{A})}{a}\ ;\ \dfrac{n_0(\text{B})}{b}\Big)`, sens: 'Avancement maximal' },
      { tex: TX`n(\text{gaz}) = \dfrac{P\,V}{R\,T}`, sens: 'Gaz parfait' },
      { tex: TX`x = \dfrac{(P - P_0)\,V}{R\,T}`, sens: 'Avancement par mesure de pression (coefficient 1)' },
    ],
    retenir: [
      'Une grandeur mesurable proportionnelle à x permet de suivre la réaction.',
      'La surpression P − P₀ est due au gaz formé.',
      'La courbe x(t) tend vers x_max (si la réaction est totale).',
    ],
    erreurs: [
      'Utiliser P au lieu de P − P₀.',
      'Oublier les unités SI (Pa, m³, K).',
      'Oublier le coefficient stœchiométrique du gaz.',
    ],
  },
  experiences: {
    sims: ['avancement', 'gaz'],
    protocole: { titre: 'Magnésium et acide chlorhydrique : suivi par pression', materiel: 'erlenmeyer fermé relié à un pressiomètre, ruban de magnésium, acide chlorhydrique, thermomètre.',
      etapes: ['Introduire 20 mL d’acide à 0,50 mol/L ; mesurer P₀, V du gaz et T.', 'Ajouter 0,024 g de magnésium (n = 1,0×10⁻³ mol) et fermer.', 'Relever P toutes les 30 s jusqu’à stabilisation.', TX`Calculer \(x = (P - P_0)V/RT\) et tracer \(x(t)\).`] },
    observations: TX`<ul><li>Effervescence ; la pression augmente puis se stabilise.</li><li>La valeur finale de x correspond à \(x_{max} = 1{,}0\times10^{-3}\ \text{mol}\) (magnésium limitant).</li></ul>`,
    conclusion: TX`<p>\(\text{Mg} + 2\text{H}^+ \to \text{Mg}^{2+} + \text{H}_2\) : la mesure de pression permet de suivre l’avancement en continu.</p>`,
  },
  quiz: [
    { q: TX`P − P₀ = 2000 Pa, V = 0,25 L, T = 300 K. x :`, o: [TX`\(2\times10^{-4}\ \text{mol}\)`, TX`\(2\times10^{-1}\ \text{mol}\)`, '0,2 mol', TX`\(6\times10^{-3}\ \text{mol}\)`], r: 0, e: TX`\(2000\times2{,}5\times10^{-4}/(8{,}31\times300)\).` },
    { q: 'La pression finale est atteinte quand :', o: ['un réactif est épuisé', 'le gaz s’échappe', 'la température baisse', 'x = 0'], r: 0, e: 'x = x_max.' },
    { q: TX`\(\text{Zn} + 2\text{H}^+ \to \text{Zn}^{2+} + \text{H}_2\) : n(H⁺) en cours :`, o: ['n₀ − x', 'n₀ − 2x', 'n₀ + 2x', '2x'], r: 1, e: 'Coefficient 2.' },
    { q: 'Pour utiliser PV = nRT, la température s’exprime en :', o: ['°C', 'K', '°F', 'J'], r: 1, e: 'Kelvins.' },
    { q: 'On peut suivre une réaction qui produit un gaz en mesurant :', o: ['la pression', 'la couleur seulement', 'la masse volumique de l’eau', 'rien'], r: 0, e: 'Ou le volume de gaz.' },
  ],
};
