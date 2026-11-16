/* Tronc Commun · Physique · Mécanique · Exemples d’actions mécaniques */
'use strict';
CONTENU['tc-actions'] = {
  resume: {
    intro: TX`Une <b>action mécanique</b> est toute cause capable de mettre un corps en mouvement, de modifier son mouvement, de le déformer ou de le maintenir en équilibre. On la modélise par une <b>force</b>, représentée par un vecteur.`,
    sections: [
      { titre: '1. Effets et classement des actions', html: TX`<ul><li>Actions <b>de contact</b> (un fil, un support, un ressort, l’air…) ou <b>à distance</b> (poids, forces électriques et magnétiques).</li>
<li>Actions <b>localisées</b> (en un point : tension d’un fil) ou <b>réparties</b> (sur une surface : action d’un gaz ; dans un volume : le poids).</li>
<li>Forces <b>intérieures</b> (exercées par une partie du système sur une autre) ou <b>extérieures</b> (exercées par l’extérieur). Il faut toujours préciser le <b>système</b> étudié.</li></ul>` },
      { titre: '2. Caractéristiques d’une force', html: TX`<p>Une force \(\vec F\) a quatre caractéristiques : <b>point d’application</b>, <b>droite d’action</b> (direction), <b>sens</b>, <b>intensité</b> en newtons (N), mesurée avec un <b>dynamomètre</b>. On la représente par un vecteur à l’échelle (ex. 1 cm ↔ 2 N).</p>`
        + FIG(420, 120, ARW('ac1') + `<line x1="20" y1="20" x2="200" y2="20" stroke="#5b6577" stroke-width="3"/><line x1="110" y1="20" x2="110" y2="62" stroke="#5b6577" stroke-width="2"/><rect x="85" y="62" width="50" height="40" rx="4" fill="#1f6fe0"/>${VEC(110, 62, 110, 28, 'T', '#d93a4a', 'ac1')}${VEC(110, 82, 110, 116, 'P', '#12946a', 'ac1')}<text x="240" y="50">T : action du fil (contact, localisée)</text><text x="240" y="80">P : poids (à distance, répartie)</text>`) },
      { titre: '3. Action d’un ressort', sim: 'ressort', html: TX`<p>Un ressort allongé ou comprimé exerce une force de rappel, de même direction que son axe, d’intensité proportionnelle à la déformation : \(T = k\,|\Delta l|\), avec \(\Delta l = l - l_0\) et \(k\) la <b>raideur</b> (N/m).</p>` },
      { titre: '4. Réaction d’un support et frottement', sim: 'incline', html: TX`<p>Un support exerce une force répartie modélisée par la <b>réaction</b> \(\vec R\). On la décompose : \(\vec R = \vec R_N + \vec f\), où \(\vec R_N\) est la composante normale (perpendiculaire au support) et \(\vec f\) la <b>force de frottement</b> (tangente, opposée au mouvement ou à la tendance au mouvement).</p>
<ul><li>Sans frottement : \(\vec R\) est perpendiculaire au support.</li><li>Avec frottement : \(\vec R\) est inclinée de l’angle \(\varphi\) ; \(R = \sqrt{R_N^2 + f^2}\) et le coefficient de frottement \(k = \tan\varphi = \dfrac{f}{R_N}\).</li></ul>`
        + FIG(420, 150, ARW('ac2') + `<polygon points="20,130 400,130 400,140 20,140" fill="#c9d3e3"/><rect x="160" y="80" width="90" height="50" fill="#d98200" rx="4"/>${VEC(205, 130, 205, 40, 'RN', '#1f6fe0', 'ac2')}${VEC(205, 130, 140, 130, 'f', '#12946a', 'ac2')}${VEC(205, 130, 140, 40, 'R', '#d93a4a', 'ac2')}<path d="M205 100 A30 30 0 0 0 188 106" fill="none" stroke="#5b6577"/><text x="178" y="96">φ</text><text x="300" y="70">sens du mouvement →</text>`) },
      { titre: '5. Forces pressantes et pression', sim: 'pression', html: TX`<p>Un fluide (gaz ou liquide) exerce sur toute surface une force pressante \(\vec F\), perpendiculaire à la surface. La <b>pression</b> est \(P = \dfrac{F}{S}\) en pascals (Pa) avec \(F\) en N et \(S\) en \(\text{m}^2\). \(1\ \text{bar} = 10^{5}\ \text{Pa}\) ; pression atmosphérique \(\approx 1013\ \text{hPa}\). On la mesure avec un <b>manomètre</b> (ou un baromètre pour l’air).</p>` },
    ],
    formules: [
      { tex: TX`P = \dfrac{F}{S}`, sens: 'Pression (Pa)' },
      { tex: TX`1\ \text{bar} = 10^{5}\ \text{Pa}`, sens: 'Conversion d’unités de pression' },
      { tex: TX`T = k\,|l - l_0|`, sens: 'Tension d’un ressort (N)' },
      { tex: TX`R = \sqrt{R_N^2 + f^2}`, sens: 'Intensité de la réaction avec frottement' },
      { tex: TX`k = \tan\varphi = \dfrac{f}{R_N}`, sens: 'Coefficient de frottement' },
    ],
    retenir: [
      'Une action mécanique peut mettre en mouvement, modifier un mouvement, déformer ou maintenir en équilibre.',
      'Contact ou à distance ; localisée ou répartie ; intérieure ou extérieure selon le système choisi.',
      'Une force : point d’application, droite d’action, sens, intensité (N).',
      TX`Sans frottement \(\vec R \perp\) support ; avec frottement, \(\vec R\) est inclinée vers l’arrière du mouvement.`,
      TX`Pression \(P = F/S\) en Pa ; la force pressante est perpendiculaire à la surface.`,
    ],
    erreurs: [
      'Ne pas préciser le système : une même force peut être intérieure ou extérieure.',
      TX`Oublier de convertir les \(\text{cm}^2\) en \(\text{m}^2\) (\(1\ \text{cm}^2 = 10^{-4}\ \text{m}^2\)).`,
      'Dessiner la force de frottement dans le sens du mouvement.',
      'Représenter le poids à partir du point de contact avec le sol au lieu du centre de gravité.',
      TX`Confondre la longueur du ressort \(l\) et son allongement \(\Delta l = l - l_0\).`,
    ],
  },
  experiences: {
    sims: ['pression', 'incline', 'ressort'],
    protocole: { titre: 'Mettre en évidence la réaction d’un plan et le frottement', materiel: 'plan inclinable, solide en bois, dynamomètre, rapporteur (ou la simulation « plan incliné »).',
      etapes: ['Poser le solide sur le plan horizontal et le tirer doucement avec le dynamomètre : noter la force juste avant qu’il glisse.', 'Incliner progressivement le plan jusqu’à ce que le solide commence à glisser et noter l’angle.', 'Recommencer avec une surface plus lisse (papier glacé, plastique).', 'Dans la simulation « pression », faire varier F puis S et noter P.'] },
    observations: TX`<ul><li>Il faut une force non nulle pour faire glisser le solide : le support exerce une force de frottement.</li><li>Le solide glisse au-delà d’un certain angle, plus grand pour une surface rugueuse.</li><li>Pour une même force, la pression est d’autant plus grande que la surface est petite.</li></ul>`,
    conclusion: TX`<p>La réaction d’un support a deux composantes : normale \(\vec R_N\) et tangentielle \(\vec f\) (frottement). Une force pressante produit un effet d’autant plus grand que la surface est petite : \(P = F/S\).</p>`,
  },
  quiz: [
    { q: 'Le poids d’un corps est une action :', o: ['de contact et localisée', 'à distance et répartie', 'de contact et répartie', 'intérieure'], r: 1, e: 'La Terre agit sans contact sur tout le volume du corps.' },
    { q: TX`Une force de 200 N s’exerce sur \(4\ \text{cm}^2\). La pression vaut :`, o: ['50 Pa', TX`\(5\times10^{5}\ \text{Pa}\)`, '800 Pa', TX`\(5\times10^{3}\ \text{Pa}\)`], r: 1, e: TX`\(P = \dfrac{200}{4\times10^{-4}} = 5\times10^{5}\ \text{Pa}\).` },
    { q: 'Sans frottement, la réaction d’un plan sur un solide est :', o: ['parallèle au plan', 'verticale', 'perpendiculaire au plan', 'nulle'], r: 2, e: 'Sans frottement, la composante tangentielle est nulle.' },
    { q: TX`Un ressort de raideur \(k = 50\ \text{N/m}\) s’allonge de 4 cm. Sa tension vaut :`, o: ['200 N', '2 N', '12,5 N', '0,08 N'], r: 1, e: TX`\(T = 50\times0{,}04 = 2\ \text{N}\).` },
    { q: TX`\(R_N = 6\ \text{N}\) et \(f = 8\ \text{N}\). L’intensité de la réaction est :`, o: ['14 N', '2 N', '10 N', '48 N'], r: 2, e: TX`\(R = \sqrt{36 + 64} = 10\ \text{N}\).` },
    { q: 'On étudie le système {voiture + remorque}. La force exercée par la voiture sur la remorque est :', o: ['extérieure', 'intérieure', 'à distance', 'nulle'], r: 1, e: 'Elle est exercée par une partie du système sur une autre partie du système.' },
  ],
};
