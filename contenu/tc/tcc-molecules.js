/* Tronc Commun · Chimie · Géométrie de quelques molécules */
'use strict';
CONTENU['tcc-molecules'] = {
  resume: {
    intro: TX`Les atomes s’associent en <b>molécules</b> en mettant en commun des électrons (<b>liaisons covalentes</b>) pour acquérir une structure stable en <b>duet</b> ou en <b>octet</b>. La représentation de Lewis et le modèle de Cram décrivent les molécules.`,
    sections: [
      { titre: '1. Règles du duet et de l’octet', html: TX`<p>Au cours des transformations, les atomes évoluent pour avoir la structure du gaz rare le plus proche : <b>duet</b> (2 électrons externes, comme He) pour H, Li… ; <b>octet</b> (8 électrons externes) pour les autres. Ions monoatomiques : \(\text{Na}^+\), \(\text{Mg}^{2+}\), \(\text{Cl}^-\), \(\text{O}^{2-}\).</p>` },
      { titre: '2. Liaison covalente et schéma de Lewis', sim: 'molecule', html: TX`<p>Une <b>liaison covalente</b> est un doublet d’électrons mis en commun par deux atomes. Nombre de liaisons d’un atome : \(n_L = 8 - p\) (\(p\) : électrons externes), soit H : 1, C : 4, N : 3, O : 2, Cl : 1.</p>
<p>Nombre total de doublets : \(n_d = \dfrac{\sum(\text{électrons externes})}{2}\) ; ils se répartissent en doublets <b>liants</b> et <b>non liants</b>.</p>`
        + FIG(480, 110, `<text x="30" y="62" text-anchor="middle" font-size="20" font-weight="bold">H</text><line x1="42" y1="55" x2="68" y2="55" stroke="#14213d" stroke-width="2.5"/><text x="80" y="62" text-anchor="middle" font-size="20" font-weight="bold">O</text><line x1="92" y1="55" x2="118" y2="55" stroke="#14213d" stroke-width="2.5"/><text x="130" y="62" text-anchor="middle" font-size="20" font-weight="bold">H</text><line x1="72" y1="36" x2="88" y2="36" stroke="#14213d" stroke-width="2.5"/><line x1="72" y1="74" x2="88" y2="74" stroke="#14213d" stroke-width="2.5"/><text x="80" y="100" text-anchor="middle" font-size="11">eau H₂O</text><text x="190" y="62" text-anchor="middle" font-size="20" font-weight="bold">H</text><line x1="202" y1="55" x2="228" y2="55" stroke="#14213d" stroke-width="2.5"/><text x="240" y="62" text-anchor="middle" font-size="20" font-weight="bold">N</text><line x1="252" y1="55" x2="278" y2="55" stroke="#14213d" stroke-width="2.5"/><text x="290" y="62" text-anchor="middle" font-size="20" font-weight="bold">H</text><line x1="240" y1="68" x2="240" y2="86" stroke="#14213d" stroke-width="2.5"/><text x="240" y="106" text-anchor="middle" font-size="20" font-weight="bold">H</text><line x1="232" y1="36" x2="248" y2="36" stroke="#14213d" stroke-width="2.5"/><text x="300" y="100" font-size="11">NH₃</text><text x="350" y="62" text-anchor="middle" font-size="20" font-weight="bold">O</text><line x1="362" y1="51" x2="388" y2="51" stroke="#14213d" stroke-width="2.5"/><line x1="362" y1="59" x2="388" y2="59" stroke="#14213d" stroke-width="2.5"/><text x="400" y="62" text-anchor="middle" font-size="20" font-weight="bold">C</text><line x1="412" y1="51" x2="438" y2="51" stroke="#14213d" stroke-width="2.5"/><line x1="412" y1="59" x2="438" y2="59" stroke="#14213d" stroke-width="2.5"/><text x="450" y="62" text-anchor="middle" font-size="20" font-weight="bold">O</text><line x1="342" y1="36" x2="358" y2="36" stroke="#14213d" stroke-width="2.5"/><line x1="342" y1="74" x2="358" y2="74" stroke="#14213d" stroke-width="2.5"/><line x1="442" y1="36" x2="458" y2="36" stroke="#14213d" stroke-width="2.5"/><line x1="442" y1="74" x2="458" y2="74" stroke="#14213d" stroke-width="2.5"/><text x="400" y="100" text-anchor="middle" font-size="11">CO₂</text>`) },
      { titre: '3. Géométrie des molécules', html: TX`<p>Les doublets (liants et non liants) autour d’un atome central se repoussent et s’écartent au maximum :</p><ul><li>\(\text{CH}_4\) : <b>tétraédrique</b> (angles de 109,5°) ;</li><li>\(\text{NH}_3\) : <b>pyramidale</b> (un doublet non liant) ;</li><li>\(\text{H}_2\text{O}\) : <b>coudée</b> (deux doublets non liants) ;</li><li>\(\text{CO}_2\) : <b>linéaire</b>.</li></ul><p><b>Représentation de Cram</b> : trait plein (dans le plan), triangle plein (vers l’avant), triangle hachuré (vers l’arrière).</p>` },
      { titre: '4. Formules et isomérie', html: TX`<p>Formule brute (\(\text{C}_2\text{H}_6\text{O}\)), formule développée (toutes les liaisons), formule semi-développée (\(\text{CH}_3\text{–CH}_2\text{–OH}\)). Des <b>isomères</b> ont la même formule brute mais des formules développées différentes : éthanol \(\text{CH}_3\text{CH}_2\text{OH}\) et méthoxyméthane \(\text{CH}_3\text{OCH}_3\).</p>` },
    ],
    formules: [
      { tex: TX`n_L = 8 - p`, sens: 'Nombre de liaisons covalentes (octet)' },
      { tex: TX`n_d = \dfrac{\sum p}{2}`, sens: 'Nombre total de doublets' },
      { tex: TX`\text{H} : 1 \quad \text{C} : 4 \quad \text{N} : 3 \quad \text{O} : 2 \quad \text{Cl} : 1`, sens: 'Valences usuelles' },
    ],
    retenir: [
      'Duet pour H ; octet pour C, N, O, Cl…',
      'Une liaison covalente = un doublet partagé.',
      'Les doublets s’écartent au maximum : tétraèdre, pyramide, molécule coudée, linéaire.',
      'Isomères : même formule brute, formules développées différentes.',
      'En Lewis, on représente aussi les doublets non liants.',
    ],
    erreurs: [
      'Oublier les doublets non liants de O ou N.',
      'Donner 2 liaisons à l’hydrogène.',
      'Dessiner H₂O linéaire.',
      'Compter les électrons de toutes les couches au lieu de la couche externe.',
    ],
  },
  experiences: {
    sims: ['molecule'],
    protocole: { titre: 'Construire des molécules avec des modèles', materiel: 'boîte de modèles moléculaires (ou simulation « molécule »).',
      etapes: ['Construire CH₄, NH₃, H₂O et CO₂.', 'Observer la forme de chaque molécule et estimer les angles.', 'Construire deux molécules différentes de formule C₂H₆O.', 'Écrire le schéma de Lewis de chacune.'] },
    observations: TX`<ul><li>CH₄ forme un tétraèdre, NH₃ une pyramide, H₂O un V, CO₂ une droite.</li><li>Deux arrangements différents existent pour C₂H₆O.</li></ul>`,
    conclusion: TX`<p>La géométrie dépend du nombre de doublets autour de l’atome central ; une même formule brute peut correspondre à plusieurs isomères.</p>`,
  },
  quiz: [
    { q: 'L’azote (Z = 7) forme en général :', o: ['1 liaison', '2 liaisons', '3 liaisons', '4 liaisons'], r: 2, e: '5 électrons externes : 8 − 5 = 3.' },
    { q: 'La molécule d’eau est :', o: ['linéaire', 'coudée', 'tétraédrique', 'plane carrée'], r: 1, e: 'Deux doublets non liants sur O.' },
    { q: 'Nombre total de doublets dans NH₃ :', o: ['3', '4', '8', '5'], r: 1, e: TX`\((5 + 3\times1)/2 = 4\) : 3 liants + 1 non liant.` },
    { q: 'L’éthanol et le méthoxyméthane sont :', o: ['identiques', 'isomères', 'isotopes', 'des ions'], r: 1, e: 'Même formule brute C₂H₆O.' },
    { q: 'Dans le modèle de Cram, un triangle hachuré représente une liaison :', o: ['dans le plan', 'vers l’avant', 'vers l’arrière', 'double'], r: 2, e: 'Hachuré = en arrière du plan.' },
  ],
};
