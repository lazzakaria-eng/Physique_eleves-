/* 1ʳᵉ Bac · Chimie · Les molécules organiques et les squelettes carbonés */
'use strict';
CONTENU['1bc-squelettes'] = {
  resume: {
    intro: TX`La chimie organique est la chimie des composés du <b>carbone</b>. Le carbone, tétravalent, forme des chaînes (squelettes carbonés) linéaires, ramifiées ou cycliques, saturées ou insaturées, à l’origine d’une immense variété de molécules.`,
    sections: [
      { titre: '1. Le carbone et ses liaisons', html: TX`<p>L’atome de carbone forme 4 liaisons covalentes (simples, doubles, triples). Une chaîne est <b>saturée</b> si elle ne contient que des liaisons simples, <b>insaturée</b> sinon. Elle peut être <b>linéaire</b>, <b>ramifiée</b> ou <b>cyclique</b>.</p>` },
      { titre: '2. Les alcanes', sim: 'organique', html: TX`<p>Hydrocarbures saturés non cycliques de formule \(\text{C}_n\text{H}_{2n+2}\) : méthane, éthane, propane, butane, pentane, hexane… Nomenclature d’un alcane ramifié : chaîne principale la plus longue, ramifications (méthyl, éthyl…) avec les plus petits numéros : 2-méthylbutane.</p>`
        + FIG(440, 110, `<text x="20" y="40" font-size="15">CH₃ – CH – CH₂ – CH₃</text><text x="70" y="88" font-size="15">CH₃</text><line x1="82" y1="48" x2="82" y2="72" stroke="#14213d" stroke-width="1.6"/><text x="260" y="40" font-size="13">2-méthylbutane</text><text x="260" y="64" font-size="13">C₅H₁₂</text>`) },
      { titre: '3. Les alcènes et l’isomérie', html: TX`<p>Alcènes : une double liaison C=C, formule \(\text{C}_n\text{H}_{2n}\) (éthène, propène, but-2-ène). <b>Isomérie de constitution</b> (chaîne, position) ; isomérie <b>Z/E</b> autour d’une double liaison quand chaque carbone porte deux groupes différents.</p>` },
      { titre: '4. Modifier le squelette', html: TX`<p>Craquage (raccourcir), reformage (ramifier, cycliser), <b>polymérisation</b> : \(n\,\text{CH}_2\text{=CH}_2 \to \text{–(CH}_2\text{–CH}_2\text{)}_n\text{–}\) (polyéthylène). Les hydrocarbures proviennent surtout du pétrole et du gaz naturel.</p>` },
    ],
    formules: [
      { tex: TX`\text{C}_n\text{H}_{2n+2}`, sens: 'Alcanes' },
      { tex: TX`\text{C}_n\text{H}_{2n}`, sens: 'Alcènes (et cyclanes)' },
      { tex: TX`M(\text{C}_n\text{H}_{2n+2}) = 14\,n + 2`, sens: 'Masse molaire d’un alcane (g/mol)' },
      { tex: TX`n\,\text{CH}_2\text{=CH}_2 \longrightarrow \text{–(CH}_2\text{–CH}_2\text{)}_n\text{–}`, sens: 'Polymérisation de l’éthène' },
    ],
    retenir: [
      'Carbone tétravalent : 4 liaisons.',
      'Alcanes CnH2n+2 saturés ; alcènes CnH2n avec une C=C.',
      'Nommer : chaîne la plus longue, ramifications aux plus petits numéros.',
      'Isomères : même formule brute, structures différentes.',
    ],
    erreurs: [
      'Ne pas choisir la chaîne la plus longue.',
      'Numéroter dans le mauvais sens.',
      'Oublier l’isomérie Z/E.',
    ],
  },
  experiences: {
    sims: ['organique'],
    protocole: { titre: 'Construire les isomères de C₅H₁₂', materiel: 'modèles moléculaires (ou simulation « organique »).',
      etapes: ['Construire la chaîne linéaire de 5 carbones et compléter avec des H.', 'Construire les isomères ramifiés.', 'Nommer chaque isomère.', 'Construire le but-2-ène et ses formes Z et E.'] },
    observations: TX`<ul><li>Trois isomères : pentane, 2-méthylbutane, 2,2-diméthylpropane.</li><li>Le but-2-ène existe sous deux formes non superposables (Z et E).</li></ul>`,
    conclusion: TX`<p>Une même formule brute peut correspondre à plusieurs squelettes : c’est l’isomérie.</p>`,
  },
  quiz: [
    { q: 'Formule brute de l’hexane :', o: ['C₆H₁₂', 'C₆H₁₄', 'C₆H₁₀', 'C₅H₁₂'], r: 1, e: 'CnH2n+2 avec n = 6.' },
    { q: 'Masse molaire d’un alcane à 4 carbones :', o: ['56 g/mol', '58 g/mol', '54 g/mol', '60 g/mol'], r: 1, e: TX`\(14\times4 + 2\).` },
    { q: 'Le propène possède :', o: ['une triple liaison', 'une double liaison C=C', 'uniquement des liaisons simples', 'un cycle'], r: 1, e: 'C’est un alcène.' },
    { q: 'Nombre d’isomères de C₅H₁₂ :', o: ['2', '3', '4', '5'], r: 1, e: 'Pentane, 2-méthylbutane, 2,2-diméthylpropane.' },
    { q: 'Le polyéthylène est obtenu par :', o: ['craquage', 'polymérisation', 'combustion', 'distillation'], r: 1, e: 'De l’éthène.' },
  ],
};
