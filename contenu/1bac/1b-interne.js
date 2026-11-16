/* 1ʳᵉ Bac SM · Physique · Travail et énergie · Travail et énergie interne */
'use strict';
CONTENU['1b-interne'] = {
  resume: {
    intro: TX`Un système possède, en plus de son énergie mécanique, une <b>énergie interne</b> \(U\), liée à l’agitation et aux interactions de ses particules. Elle varie quand le système reçoit du <b>travail</b> \(W\) ou de la <b>chaleur</b> \(Q\) : c’est le <b>premier principe</b> de la thermodynamique.`,
    sections: [
      { titre: '1. Énergie interne', html: TX`<p>\(U\) est la somme des énergies cinétiques microscopiques (agitation thermique) et des énergies potentielles d’interaction des particules. Elle augmente avec la température et change lors d’un changement d’état.</p>` },
      { titre: '2. Premier principe', sim: 'energie', html: TX`<p>Pour un système au repos macroscopique (\(E_m\) constante) : \(\Delta U = W + Q\). Convention : \(W\) et \(Q\) sont <b>positifs quand le système les reçoit</b>. Exemples : un frein qui chauffe (\(W > 0\)), un gaz comprimé (\(W > 0\)), de l’eau chauffée (\(Q > 0\)).</p>` },
      { titre: '3. Travail des forces de pression', sim: 'gaz', html: TX`<p>Un gaz dont le volume varie de \(\Delta V\) sous une pression extérieure constante \(P_{ext}\) reçoit le travail \(W = -P_{ext}\,\Delta V\). Compression (\(\Delta V < 0\)) : \(W > 0\) ; détente : \(W < 0\).</p>`
        + FIG(320, 160, ARW('in1') + `<rect x="80" y="40" width="160" height="100" fill="#eaf1fd" stroke="#14213d" stroke-width="2"/><rect x="82" y="60" width="156" height="12" fill="#5b6577"/><line x1="160" y1="20" x2="160" y2="60" stroke="#5b6577" stroke-width="5"/>${VEC(200, 10, 200, 52, 'F', '#d93a4a', 'in1')}<text x="160" y="110" text-anchor="middle">gaz</text><text x="246" y="70" font-size="11">piston</text>`) },
      { titre: '4. Transferts et conservation', sim: 'calorimetrie', html: TX`<p>Pour un système isolé (\(W = 0\), \(Q = 0\)) : \(\Delta U = 0\). Lors d’un frottement, l’énergie mécanique perdue devient de l’énergie interne : \(\Delta U = -\Delta E_m\).</p>` },
    ],
    formules: [
      { tex: TX`\Delta U = W + Q`, sens: 'Premier principe (système au repos)' },
      { tex: TX`W = -P_{ext}\,\Delta V`, sens: 'Travail des forces de pression' },
      { tex: TX`\Delta U = 0`, sens: 'Système isolé' },
    ],
    retenir: [
      'U : énergie microscopique (agitation + interactions).',
      'W et Q sont comptés positivement quand le système les reçoit.',
      'Comprimer un gaz lui fournit du travail.',
      'Les frottements transforment l’énergie mécanique en énergie interne.',
    ],
    erreurs: [
      'Se tromper de signe pour W ou Q.',
      TX`Oublier le signe moins dans \(W = -P\Delta V\).`,
      TX`Oublier de convertir les L en m³ (\(1\ \text{L} = 10^{-3}\ \text{m}^3\)).`,
      'Confondre chaleur (transfert) et température (grandeur d’état).',
    ],
  },
  experiences: {
    sims: ['energie', 'gaz', 'calorimetrie'],
    protocole: { titre: 'Échauffer un corps par frottement ou par compression', materiel: 'pompe à vélo bouchée, thermomètre, bloc de bois et papier de verre.',
      etapes: ['Comprimer rapidement l’air de la pompe bouchée plusieurs fois ; toucher l’embout.', 'Frotter énergiquement le bloc avec le papier de verre et mesurer sa température.', 'Dans la simulation « gaz », comprimer le gaz et observer l’agitation des particules.'] },
    observations: TX`<ul><li>L’embout de la pompe chauffe ; le bois frotté aussi.</li><li>Les particules du gaz comprimé s’agitent plus vite.</li></ul>`,
    conclusion: TX`<p>Un travail reçu peut augmenter l’énergie interne d’un système (et donc sa température) : \(\Delta U = W + Q\).</p>`,
  },
  quiz: [
    { q: 'Un gaz reçoit 300 J de travail et cède 100 J de chaleur. ΔU :', o: ['400 J', '200 J', '−200 J', '−400 J'], r: 1, e: TX`\(300 + (-100)\).` },
    { q: TX`Gaz comprimé de 2 L à 1 L sous \(P = 10^5\ \text{Pa}\). W reçu :`, o: ['100 J', '−100 J', '10⁵ J', '0'], r: 0, e: TX`\(W = -10^5\times(-10^{-3})\).` },
    { q: 'Pour un système isolé :', o: ['ΔU > 0', 'ΔU < 0', 'ΔU = 0', 'U = 0'], r: 2, e: 'Aucun échange.' },
    { q: 'Quand on freine, l’énergie cinétique devient surtout :', o: ['énergie potentielle', 'énergie interne des freins', 'énergie électrique', 'rien'], r: 1, e: 'Les freins chauffent.' },
    { q: 'Lors de la détente d’un gaz (ΔV > 0), le travail reçu par le gaz est :', o: ['positif', 'négatif', 'nul', 'égal à Q'], r: 1, e: TX`\(W = -P\Delta V < 0\) : le gaz fournit du travail.` },
  ],
};
