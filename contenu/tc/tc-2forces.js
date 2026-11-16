/* Tronc Commun · Physique · Mécanique · Équilibre d’un solide soumis à deux forces */
'use strict';
CONTENU['tc-2forces'] = {
  resume: {
    intro: TX`Un solide soumis à deux forces est en équilibre si ces deux forces ont la <b>même droite d’action</b>, la <b>même intensité</b> et des <b>sens opposés</b>. On applique cette condition au fil, au ressort et à la poussée d’Archimède.`,
    sections: [
      { titre: '1. Condition d’équilibre', html: TX`<p>Si un solide soumis à deux forces \(\vec F_1\) et \(\vec F_2\) est en équilibre, alors :</p><ul><li>\(\vec F_1 + \vec F_2 = \vec 0\) (condition nécessaire à l’immobilité de G) ;</li><li>\(\vec F_1\) et \(\vec F_2\) ont la <b>même droite d’action</b> (pas de rotation).</li></ul>
<p><b>Méthode</b> : préciser le système, faire l’inventaire des forces, appliquer la condition d’équilibre, représenter les forces à l’échelle.</p>` },
      { titre: '2. Solide suspendu à un fil', html: TX`<p>Le système {solide} est soumis à son poids \(\vec P\) et à la tension du fil \(\vec T\). À l’équilibre : \(\vec T = -\vec P\), donc \(T = P = mg\) et le fil est <b>vertical</b> (c’est le principe du fil à plomb).</p>`
        + FIG(260, 160, ARW('f21') + `<line x1="30" y1="15" x2="230" y2="15" stroke="#5b6577" stroke-width="4"/><line x1="130" y1="15" x2="130" y2="70" stroke="#5b6577" stroke-width="2"/><circle cx="130" cy="92" r="22" fill="#1f6fe0"/>${VEC(130, 92, 130, 40, 'T', '#d93a4a', 'f21')}${VEC(130, 92, 130, 144, 'P', '#12946a', 'f21')}<circle cx="130" cy="92" r="3" fill="#fff"/><text x="138" y="98" fill="#fff" font-size="11">G</text>`) },
      { titre: '3. La tension d’un ressort', sim: 'ressort', html: TX`<p>Un ressort de longueur à vide \(l_0\) exerce, quand sa longueur est \(l\), une tension d’intensité \(T = k\,|l - l_0|\) (loi de Hooke). Pour un solide de masse \(m\) suspendu : \(k(l - l_0) = mg\), donc l’allongement \(\Delta l = \dfrac{mg}{k}\) est proportionnel à la masse.</p>
<p>La courbe \(T = f(\Delta l)\) est une droite passant par l’origine, de pente \(k\) (raideur en N/m).</p>` },
      { titre: '4. Poussée d’Archimède', sim: 'densite', html: TX`<p>Tout corps immergé dans un fluide subit une force verticale, dirigée vers le haut, appliquée au centre de la partie immergée, d’intensité égale au poids du fluide déplacé :</p><p style="text-align:center">\(F_A = \rho_f\,V_{im}\,g\)</p>
<p>Un corps <b>flotte</b> en équilibre si \(F_A = P\) : \(\rho_f\,V_{im} = \rho_c\,V\), donc \(\dfrac{V_{im}}{V} = \dfrac{\rho_c}{\rho_f}\) (partie immergée). Si \(\rho_c > \rho_f\), le corps coule.</p>` },
    ],
    formules: [
      { tex: TX`\vec F_1 + \vec F_2 = \vec 0`, sens: 'Condition d’équilibre sous deux forces (même droite d’action)' },
      { tex: TX`T = k\,(l - l_0)`, sens: 'Loi de Hooke' },
      { tex: TX`k\,\Delta l = m\,g`, sens: 'Équilibre d’un solide suspendu à un ressort' },
      { tex: TX`F_A = \rho_f\,V_{im}\,g`, sens: 'Poussée d’Archimède (N)' },
      { tex: TX`\dfrac{V_{im}}{V} = \dfrac{\rho_c}{\rho_f}`, sens: 'Fraction immergée d’un corps qui flotte' },
    ],
    retenir: [
      'Deux forces en équilibre : même droite d’action, même intensité, sens opposés.',
      'Un fil tendu qui retient un solide immobile est vertical et sa tension vaut le poids.',
      TX`L’allongement d’un ressort est proportionnel à la force : \(T = k\,\Delta l\).`,
      'La poussée d’Archimède est égale au poids du fluide déplacé, dirigée vers le haut.',
      'Un corps flotte si sa masse volumique est inférieure à celle du liquide.',
    ],
    erreurs: [
      TX`Utiliser \(l\) au lieu de \(l - l_0\) dans la loi de Hooke.`,
      TX`Oublier de convertir les cm en m pour \(\Delta l\) et les \(\text{cm}^3\) en \(\text{m}^3\) pour \(V\) (\(1\ \text{cm}^3 = 10^{-6}\ \text{m}^3\)).`,
      TX`Utiliser la masse volumique du corps au lieu de celle du fluide dans \(F_A\).`,
      'Prendre tout le volume du corps alors qu’il n’est qu’en partie immergé.',
      'Dessiner les deux forces décalées : elles doivent avoir la même droite d’action.',
    ],
  },
  experiences: {
    sims: ['ressort', 'densite'],
    protocole: { titre: 'Déterminer la raideur d’un ressort', materiel: 'ressort, potence, masses marquées de 50 g, règle graduée (ou la simulation « ressort »).',
      etapes: [TX`Mesurer la longueur à vide \(l_0\).`, TX`Accrocher successivement 50 g, 100 g, … 300 g et mesurer la longueur \(l\) à l’équilibre.`, TX`Calculer \(T = mg\) et \(\Delta l = l - l_0\) ; tracer \(T = f(\Delta l)\).`, 'Déterminer la pente de la droite.'] },
    observations: TX`<ul><li>Les points \((\Delta l, T)\) sont alignés sur une droite qui passe par l’origine.</li><li>Doubler la masse double l’allongement.</li><li>Un ressort plus raide s’allonge moins pour la même masse.</li></ul>`,
    conclusion: TX`<p>La tension d’un ressort est proportionnelle à son allongement : \(T = k\,\Delta l\) ; la raideur \(k\) est la pente de la droite \(T = f(\Delta l)\).</p>`,
  },
  quiz: [
    { q: 'Un solide soumis à deux forces est en équilibre. Ces forces ont :', o: ['même sens', 'même droite d’action et sens opposés', 'des droites d’action perpendiculaires', 'des intensités différentes'], r: 1, e: TX`\(\vec F_1 + \vec F_2 = \vec 0\) avec la même droite d’action.` },
    { q: TX`Une masse de 200 g est suspendue à un fil (\(g = 10\ \text{N/kg}\)). La tension vaut :`, o: ['200 N', '20 N', '2 N', '0,2 N'], r: 2, e: TX`\(T = mg = 0{,}2\times10 = 2\ \text{N}\).` },
    { q: TX`Un ressort (\(k = 25\ \text{N/m}\)) retient une masse de 100 g (\(g = 10\ \text{N/kg}\)). Son allongement :`, o: ['4 cm', '25 cm', '2,5 cm', '0,4 cm'], r: 0, e: TX`\(\Delta l = \dfrac{mg}{k} = \dfrac{1}{25} = 0{,}04\ \text{m}\).` },
    { q: 'La poussée d’Archimède est dirigée :', o: ['vers le bas', 'vers le haut', 'horizontalement', 'dans le sens du mouvement'], r: 1, e: 'Elle est verticale, vers le haut.' },
    { q: TX`Un glaçon (\(\rho = 920\ \text{kg/m}^3\)) flotte dans l’eau (\(1000\ \text{kg/m}^3\)). La partie immergée :`, o: ['8 %', '50 %', '92 %', '100 %'], r: 2, e: TX`\(\dfrac{V_{im}}{V} = \dfrac{920}{1000} = 0{,}92\).` },
  ],
};
