/* Tronc Commun · Chimie · Transformation chimique d’un système – Bilan de matière */
'use strict';
CONTENU['tcc-transformation'] = {
  resume: {
    intro: TX`Lors d’une <b>transformation chimique</b>, le système passe d’un état initial à un état final : des réactifs disparaissent, des produits apparaissent. On la modélise par une <b>équation chimique</b> équilibrée et on suit les quantités de matière avec l’<b>avancement</b> \(x\) dans un tableau d’avancement.`,
    sections: [
      { titre: '1. État d’un système et transformation', html: TX`<p>On décrit un système par les espèces présentes, leurs quantités, leur état physique, la température et la pression. Une transformation chimique change la nature des espèces ; elle peut s’accompagner d’effets thermiques (exo- ou endothermique).</p>` },
      { titre: '2. L’équation chimique', html: TX`<p>\(a\,\text{A} + b\,\text{B} \longrightarrow c\,\text{C} + d\,\text{D}\) : les <b>coefficients stœchiométriques</b> assurent la conservation des <b>éléments</b> et des <b>charges</b>. Exemple : \(\text{CH}_4 + 2\,\text{O}_2 \longrightarrow \text{CO}_2 + 2\,\text{H}_2\text{O}\).</p>` },
      { titre: '3. Avancement et tableau d’avancement', sim: 'avancement', html: TX`<p>L’avancement \(x\) (en mol) mesure le progrès de la réaction : \(n(\text{A}) = n_0(\text{A}) - a\,x\), \(n(\text{C}) = c\,x\). La réaction s’arrête quand un réactif est épuisé : le <b>réactif limitant</b>. L’avancement maximal est la plus petite des valeurs \(\dfrac{n_0(\text{A})}{a}\) et \(\dfrac{n_0(\text{B})}{b}\).</p>`
        + FIG(520, 150, `<rect x="10" y="10" width="500" height="130" fill="none" stroke="#14213d"/>${[40, 70, 100].map(y => `<line x1="10" y1="${y + 10}" x2="510" y2="${y + 10}" stroke="#14213d"/>`).join('')}${[120, 180, 290, 400].map(x => `<line x1="${x}" y1="10" x2="${x}" y2="140" stroke="#14213d"/>`).join('')}
          <text x="65" y="32" text-anchor="middle" font-size="12">équation</text><text x="345" y="32" text-anchor="middle" font-size="13">a A + b B → c C + d D</text><text x="65" y="62" text-anchor="middle" font-size="12">état initial</text><text x="150" y="62" text-anchor="middle">0</text><text x="235" y="62" text-anchor="middle">n₀(A)</text><text x="345" y="62" text-anchor="middle">n₀(B)</text><text x="455" y="62" text-anchor="middle">0 ; 0</text>
          <text x="65" y="92" text-anchor="middle" font-size="12">en cours</text><text x="150" y="92" text-anchor="middle">x</text><text x="235" y="92" text-anchor="middle">n₀(A) − a·x</text><text x="345" y="92" text-anchor="middle">n₀(B) − b·x</text><text x="455" y="92" text-anchor="middle">c·x ; d·x</text>
          <text x="65" y="124" text-anchor="middle" font-size="12">état final</text><text x="150" y="124" text-anchor="middle">x_max</text><text x="235" y="124" text-anchor="middle">n₀(A) − a·x_max</text><text x="345" y="124" text-anchor="middle">n₀(B) − b·x_max</text><text x="455" y="124" text-anchor="middle">c·x_max ; d·x_max</text>`) },
      { titre: '4. Mélange stœchiométrique', html: TX`<p>Si \(\dfrac{n_0(\text{A})}{a} = \dfrac{n_0(\text{B})}{b}\), les deux réactifs sont épuisés en même temps : le mélange initial est <b>stœchiométrique</b>.</p>` },
    ],
    formules: [
      { tex: TX`a\,\text{A} + b\,\text{B} \longrightarrow c\,\text{C} + d\,\text{D}`, sens: 'Équation chimique' },
      { tex: TX`n(\text{A}) = n_0(\text{A}) - a\,x`, sens: 'Quantité de réactif restante' },
      { tex: TX`n(\text{C}) = c\,x`, sens: 'Quantité de produit formée' },
      { tex: TX`x_{max} = \min\Big(\dfrac{n_0(\text{A})}{a}\ ;\ \dfrac{n_0(\text{B})}{b}\Big)`, sens: 'Avancement maximal' },
      { tex: TX`\dfrac{n_0(\text{A})}{a} = \dfrac{n_0(\text{B})}{b}`, sens: 'Mélange stœchiométrique' },
    ],
    retenir: [
      'Une équation équilibrée conserve les éléments et les charges.',
      'L’avancement x est en mol.',
      'Le réactif limitant donne le plus petit x_max.',
      'État final : quantités calculées avec x_max.',
      'Stœchiométrique : tous les réactifs disparaissent en même temps.',
    ],
    erreurs: [
      'Oublier le coefficient devant x.',
      'Prendre le réactif de plus petite quantité comme limitant sans diviser par son coefficient.',
      'Modifier les indices des formules pour équilibrer (on ne change que les coefficients).',
      'Écrire des quantités négatives à l’état final.',
    ],
  },
  experiences: {
    sims: ['avancement'],
    protocole: { titre: 'Action de l’acide chlorhydrique sur le calcaire', materiel: 'carbonate de calcium, acide chlorhydrique, ballon, tube à dégagement, éprouvette retournée sur une cuve à eau, balance.',
      etapes: ['Peser 1,0 g de carbonate de calcium et l’introduire dans le ballon.', 'Ajouter 20 mL d’acide chlorhydrique à 1,0 mol/L et recueillir le gaz.', 'Mesurer le volume final de CO₂ et observer s’il reste du solide.', 'Construire le tableau d’avancement et le comparer à la simulation.'] },
    observations: TX`<ul><li>Une effervescence se produit ; l’eau de chaux se trouble avec le gaz recueilli (CO₂).</li><li>Le solide disparaît entièrement : le carbonate de calcium est le réactif limitant (\(n_0 = 0{,}010\ \text{mol}\) contre 0,020 mol d’acide pour une stœchiométrie 1 : 2).</li><li>Volume de gaz voisin de \(0{,}010\times24 = 0{,}24\ \text{L}\).</li></ul>`,
    conclusion: TX`<p>L’équation \(\text{CaCO}_3 + 2\,\text{H}^+ \longrightarrow \text{Ca}^{2+} + \text{CO}_2 + \text{H}_2\text{O}\) et le tableau d’avancement prévoient l’état final : \(x_{max} = 0{,}010\ \text{mol}\).</p>`,
  },
  quiz: [
    { q: TX`Équilibrer : \(\dots\text{Al} + \dots\text{O}_2 \to \dots\text{Al}_2\text{O}_3\)`, o: ['4 ; 3 ; 2', '2 ; 3 ; 1', '1 ; 1 ; 1', '4 ; 6 ; 2'], r: 0, e: '4 Al + 3 O₂ → 2 Al₂O₃.' },
    { q: TX`\(2\,\text{H}_2 + \text{O}_2 \to 2\,\text{H}_2\text{O}\) avec 3 mol de H₂ et 2 mol de O₂. Réactif limitant :`, o: ['H₂', 'O₂', 'aucun', 'H₂O'], r: 0, e: TX`\(3/2 = 1{,}5 < 2/1\).` },
    { q: 'Dans ce cas, x_max vaut :', o: ['1,5 mol', '2 mol', '3 mol', '0,5 mol'], r: 0, e: 'x_max = 1,5 mol.' },
    { q: 'Quantité d’eau formée :', o: ['1,5 mol', '3 mol', '2 mol', '4 mol'], r: 1, e: TX`\(2x_{max} = 3\ \text{mol}\).` },
    { q: 'Quantité de O₂ restante :', o: ['0 mol', '0,5 mol', '1,5 mol', '2 mol'], r: 1, e: TX`\(2 - 1{,}5 = 0{,}5\ \text{mol}\).` },
  ],
};
