/* Tronc Commun · Physique · Mécanique · La gravitation universelle */
'use strict';
CONTENU['tc-gravitation'] = {
  resume: {
    intro: TX`Deux corps qui ont une masse s’attirent toujours : c’est l’<b>interaction gravitationnelle</b>. Elle explique la chute des corps, le poids, le mouvement de la Lune autour de la Terre et des planètes autour du Soleil.`,
    sections: [
      { titre: '1. Les échelles de longueurs', html: TX`<p>L’Univers s’étend de l’atome (\(10^{-10}\ \text{m}\)) aux galaxies (\(10^{21}\ \text{m}\)). On écrit les longueurs en <b>notation scientifique</b> \(a\times10^{n}\) avec \(1 \le a < 10\).</p>
<p><b>Ordre de grandeur</b> : la puissance de 10 la plus proche : si \(a < 5\), c’est \(10^{n}\) ; si \(a \ge 5\), c’est \(10^{n+1}\). Exemple : rayon de la Terre \(6{,}4\times10^{6}\ \text{m}\) → ordre de grandeur \(10^{7}\ \text{m}\).</p>
<p>Unité astronomique : \(1\ \text{UA} = 1{,}5\times10^{11}\ \text{m}\) ; année-lumière : \(1\ \text{a.l.} \approx 9{,}5\times10^{15}\ \text{m}\).</p>` },
      { titre: '2. Loi de la gravitation universelle', sim: 'gravitation', html: TX`<p><b>Loi de Newton.</b> Deux corps ponctuels A et B, de masses \(m_A\) et \(m_B\), séparés par la distance \(d\), exercent l’un sur l’autre des forces attractives :</p>
<p style="text-align:center">\(F_{A/B} = F_{B/A} = G\,\dfrac{m_A\,m_B}{d^2}\)</p>
<p>avec \(G = 6{,}67\times10^{-11}\ \text{N·m}^2\text{·kg}^{-2}\) (constante de gravitation). Les deux forces ont la même droite d’action (AB), la même intensité et des sens opposés : \(\vec F_{A/B} = -\vec F_{B/A}\).</p>`
        + FIG(460, 110, ARW('gv1') + `<circle cx="90" cy="55" r="26" fill="#1f6fe0"/><text x="90" y="60" text-anchor="middle" fill="#fff" font-weight="bold">A</text><circle cx="370" cy="55" r="18" fill="#d98200"/><text x="370" y="60" text-anchor="middle" fill="#fff" font-weight="bold">B</text>
          <line x1="90" y1="55" x2="370" y2="55" stroke="#9aa6bf" stroke-dasharray="4 4"/>${VEC(116, 55, 190, 55, 'F B/A', '#d93a4a', 'gv1')}${VEC(352, 55, 278, 55, 'F A/B', '#d93a4a', 'gv1')}<text x="230" y="100" text-anchor="middle">d</text>`)
        + TX`<p>La loi reste valable pour des corps à <b>répartition sphérique de masse</b> (planètes, étoiles, boules) : \(d\) est alors la distance entre leurs centres.</p>` },
      { titre: '3. Le poids d’un corps', html: TX`<p>Le <b>poids</b> \(\vec P\) d’un corps est (pratiquement) la force de gravitation exercée par la Terre sur lui. Caractéristiques : point d’application le centre de gravité G ; direction verticale ; sens vers le bas ; intensité \(P = m\cdot g\).</p>
<p>À la surface de la Terre : \(m\,g_0 = G\,\dfrac{M_T\,m}{R_T^2}\), d’où \(g_0 = G\,\dfrac{M_T}{R_T^2} \approx 9{,}8\ \text{N/kg}\).</p>` },
      { titre: '4. Variation de g avec l’altitude', sim: 'satellite', html: TX`<p>À l’altitude \(h\) : \(g_h = G\,\dfrac{M_T}{(R_T + h)^2} = g_0\,\dfrac{R_T^2}{(R_T + h)^2}\). L’intensité de pesanteur <b>diminue</b> quand l’altitude augmente ; elle varie aussi un peu avec la latitude (plus grande aux pôles).</p>
<p>La <b>masse</b> (en kg) d’un corps ne change pas ; seul son <b>poids</b> (en N) change. Sur la Lune, \(g_L \approx 1{,}6\ \text{N/kg}\).</p>` },
    ],
    formules: [
      { tex: TX`F = G\,\dfrac{m_A\,m_B}{d^2}`, sens: 'Loi de la gravitation universelle (N)' },
      { tex: TX`G = 6{,}67\times10^{-11}\ \text{N·m}^2\text{·kg}^{-2}`, sens: 'Constante de gravitation' },
      { tex: TX`P = m\cdot g`, sens: 'Intensité du poids (N)' },
      { tex: TX`g_0 = G\,\dfrac{M_T}{R_T^2}`, sens: 'Intensité de pesanteur au sol' },
      { tex: TX`g_h = g_0\,\dfrac{R_T^2}{(R_T + h)^2}`, sens: 'Intensité de pesanteur à l’altitude h' },
    ],
    retenir: [
      'Deux corps s’attirent avec des forces de même droite d’action, de même intensité et de sens opposés.',
      TX`\(F\) est proportionnelle aux masses et inversement proportionnelle au carré de la distance : si \(d\) double, \(F\) est divisée par 4.`,
      TX`Pour des corps sphériques, \(d\) est la distance entre les centres.`,
      TX`Le poids est vertical, vers le bas, appliqué en G, d’intensité \(P = mg\).`,
      TX`\(g\) diminue avec l’altitude ; la masse d’un corps ne change jamais.`,
      'Ordre de grandeur : la puissance de 10 la plus proche de la valeur.',
    ],
    erreurs: [
      TX`Prendre pour \(d\) l’altitude \(h\) au lieu de \(R_T + h\).`,
      TX`Oublier de mettre les distances en mètres (les km doivent être multipliés par \(10^{3}\)).`,
      'Croire que la Terre attire la Lune plus fort que la Lune n’attire la Terre : les deux forces ont la même intensité.',
      'Confondre masse (kg, invariable) et poids (N, dépend de g).',
      TX`Oublier le carré de la distance : \(F\) varie en \(1/d^2\), pas en \(1/d\).`,
    ],
  },
  experiences: {
    sims: ['gravitation', 'satellite'],
    protocole: { titre: 'Étudier l’influence des masses et de la distance', materiel: TX`simulation « gravitation » (curseurs \(m_A\), \(m_B\), \(d\)), tableur.`,
      etapes: [TX`Fixer \(m_A\) et \(d\), doubler puis tripler \(m_B\) et noter \(F\).`, TX`Fixer les masses, doubler puis tripler \(d\) et noter \(F\).`, TX`Tracer \(F\) en fonction de \(m_B\) puis \(F\) en fonction de \(1/d^2\).`, 'Avec la simulation « satellite », observer comment g varie avec l’altitude.'] },
    observations: TX`<ul><li>Si \(m_B\) double, \(F\) double : \(F\) est proportionnelle à \(m_B\).</li><li>Si \(d\) double, \(F\) est divisée par 4 ; si \(d\) triple, par 9.</li><li>\(F = f(1/d^2)\) est une droite passant par l’origine.</li><li>Les deux vecteurs forces ont toujours la même longueur.</li></ul>`,
    conclusion: TX`<p>L’intensité de l’attraction est \(F = G\,\dfrac{m_A m_B}{d^2}\) : proportionnelle au produit des masses et inversement proportionnelle au carré de la distance.</p>`,
  },
  quiz: [
    { q: TX`Si la distance entre deux corps double, la force d’attraction est :`, o: ['doublée', 'divisée par 2', 'divisée par 4', 'multipliée par 4'], r: 2, e: TX`\(F\) varie en \(1/d^2\) : \(1/2^2 = 1/4\).` },
    { q: 'La Terre attire la Lune avec une force F. La Lune attire la Terre avec une force :', o: ['plus petite que F', 'égale à F', 'plus grande que F', 'nulle'], r: 1, e: 'Interaction : les deux forces ont la même intensité et des sens opposés.' },
    { q: TX`Un astronaute de masse 80 kg va sur la Lune (\(g_L = 1{,}6\ \text{N/kg}\)). Sa masse sur la Lune est :`, o: ['80 kg', '13 kg', '128 kg', '128 N'], r: 0, e: 'La masse ne dépend pas du lieu ; seul le poids change (128 N sur la Lune).' },
    { q: TX`L’ordre de grandeur de \(6{,}4\times10^{6}\ \text{m}\) est :`, o: [TX`\(10^{6}\ \text{m}\)`, TX`\(10^{7}\ \text{m}\)`, TX`\(6\ \text{m}\)`, TX`\(10^{5}\ \text{m}\)`], r: 1, e: TX`\(6{,}4 \ge 5\) donc on arrondit à \(10^{7}\).` },
    { q: TX`Quand l’altitude augmente, l’intensité de pesanteur \(g\) :`, o: ['augmente', 'reste constante', 'diminue', 'devient négative'], r: 2, e: TX`\(g_h = g_0R_T^2/(R_T + h)^2\) diminue quand \(h\) augmente.` },
    { q: 'Pour deux planètes sphériques, la distance d dans la loi de Newton est :', o: ['la distance entre leurs surfaces', 'la distance entre leurs centres', 'la somme de leurs rayons', 'le diamètre de la plus grande'], r: 1, e: 'Pour des corps à répartition sphérique de masse, on prend la distance entre les centres.' },
  ],
};
