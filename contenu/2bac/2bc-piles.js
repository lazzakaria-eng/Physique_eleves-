/* 2ᵉ Bac PC/SM · Chimie · Transformations spontanées dans les piles */
'use strict';
CONTENU['2bc-piles'] = {
  resume: {
    intro: TX`Dans une <b>pile</b>, une réaction d’oxydoréduction spontanée est réalisée sans contact direct entre les réactifs : les électrons passent par le circuit extérieur. La pile convertit de l’énergie chimique en énergie électrique.`,
    sections: [
      { titre: '1. Constitution', sim: 'pile', html: TX`<p>Deux demi-piles (métal M plongeant dans une solution de ses ions \(\text{M}^{n+}\)) reliées par un <b>pont salin</b> qui assure la neutralité électrique et la conduction par les ions. Exemple, pile Daniell : \(\ominus\ \text{Zn}\,|\,\text{Zn}^{2+}\,\|\,\text{Cu}^{2+}\,|\,\text{Cu}\ \oplus\).</p>`
        + FIG(460, 200, ARW('pl1', '#1f6fe0') + `<rect x="40" y="90" width="120" height="100" fill="#cfd8e6" stroke="#14213d" stroke-width="2"/><rect x="300" y="90" width="120" height="100" fill="#6aa5ff" opacity=".5" stroke="#14213d" stroke-width="2"/><rect x="92" y="60" width="14" height="110" fill="#9aa6bf"/><rect x="352" y="60" width="14" height="110" fill="#c0392b" opacity=".75"/><path d="M130 110 V70 H330 V110" fill="none" stroke="#d98200" stroke-width="10"/><text x="200" y="64" font-size="11">pont salin</text><path d="M99 60 V20 H359 V60" fill="none" stroke="#14213d" stroke-width="2"/><rect x="205" y="8" width="50" height="24" fill="#fff" stroke="#14213d"/><text x="230" y="25" text-anchor="middle" font-weight="bold">A</text><line x1="150" y1="14" x2="200" y2="14" stroke="#1f6fe0" stroke-width="2" marker-end="url(#pl1)"/><text x="150" y="44" fill="#1f6fe0" font-size="11">e⁻</text><text x="60" y="186" font-size="11">Zn²⁺ (anode ⊖)</text><text x="306" y="186" font-size="11">Cu²⁺ (cathode ⊕)</text>`) },
      { titre: '2. Fonctionnement', html: TX`<ul><li><b>Anode</b> (pôle −) : oxydation \(\text{Zn} \to \text{Zn}^{2+} + 2e^-\) ; l’électrode s’use.</li><li><b>Cathode</b> (pôle +) : réduction \(\text{Cu}^{2+} + 2e^- \to \text{Cu}\) ; dépôt de cuivre.</li><li>Les électrons vont de l’anode vers la cathode dans le circuit extérieur ; le courant, en sens inverse.</li></ul><p>Le sens d’évolution est celui prévu par le critère \(Q_{r,i} < K\). La pile est « usée » quand \(Q_r = K\).</p>` },
      { titre: '3. Quantité d’électricité', html: TX`<p>\(Q = I\,\Delta t = n(e^-)\,\mathcal F\) avec \(\mathcal F = 96\,500\ \text{C/mol}\) (Faraday). Si z électrons sont échangés par réaction : \(n(e^-) = z\,x\). Capacité maximale : \(Q_{max} = z\,x_{max}\,\mathcal F\). Variation de masse d’une électrode : \(\Delta m = \pm x\,M\).</p>` },
    ],
    formules: [
      { tex: TX`\ominus\ \text{Zn}\,|\,\text{Zn}^{2+}\,\|\,\text{Cu}^{2+}\,|\,\text{Cu}\ \oplus`, sens: 'Représentation de la pile Daniell' },
      { tex: TX`Q = I\,\Delta t = n(e^-)\,\mathcal F`, sens: 'Quantité d’électricité' },
      { tex: TX`n(e^-) = z\,x`, sens: 'Électrons échangés' },
      { tex: TX`Q_{max} = z\,x_{max}\,\mathcal F`, sens: 'Capacité de la pile' },
      { tex: TX`\Delta m = \pm\,x\,M`, sens: 'Variation de masse d’une électrode' },
    ],
    retenir: [
      'Anode : oxydation, pôle − ; cathode : réduction, pôle +.',
      'Le pont salin ferme le circuit et maintient l’électroneutralité.',
      'F = 96 500 C/mol.',
      'La pile s’use quand Q_r atteint K.',
    ],
    erreurs: [
      'Confondre anode et cathode.',
      'Faire passer les électrons dans le pont salin.',
      'Oublier le facteur z.',
    ],
  },
  experiences: {
    sims: ['pile', 'av_redox'],
    protocole: { titre: 'Réaliser et étudier une pile Daniell', materiel: 'lames de zinc et de cuivre, solutions de ZnSO₄ et CuSO₄ à 0,1 mol/L, pont salin (KNO₃), voltmètre, ampèremètre, résistance.',
      etapes: ['Mesurer la tension à vide avec le voltmètre (COM sur le zinc).', 'Brancher une résistance et un ampèremètre ; noter le sens du courant.', 'Retirer le pont salin et observer.', 'Peser les électrodes après 1 h de fonctionnement.'] },
    observations: TX`<ul><li>Tension à vide ≈ 1,1 V ; le cuivre est le pôle +.</li><li>Sans pont salin, le courant s’arrête.</li><li>La lame de zinc s’allège, celle de cuivre s’alourdit.</li></ul>`,
    conclusion: TX`<p>Le zinc est oxydé (anode), les ions cuivre sont réduits (cathode) : \(\text{Zn} + \text{Cu}^{2+} \to \text{Zn}^{2+} + \text{Cu}\).</p>`,
  },
  quiz: [
    { q: 'À l’anode d’une pile se produit :', o: ['une réduction', 'une oxydation', 'un dépôt de métal', 'rien'], r: 1, e: 'Pôle −.' },
    { q: 'Le pont salin sert à :', o: ['faire passer les électrons', 'assurer la neutralité et fermer le circuit', 'mesurer la tension', 'produire de l’énergie'], r: 1, e: 'Conduction par les ions.' },
    { q: 'Pile débitant 0,1 A pendant 965 s. n(e⁻) :', o: ['10⁻³ mol', '0,1 mol', '96,5 mol', '1 mol'], r: 0, e: TX`\(96{,}5/96\,500\).` },
    { q: 'Dans la pile Daniell, la masse de l’électrode de cuivre :', o: ['diminue', 'augmente', 'ne change pas', 's’annule'], r: 1, e: 'Dépôt de cuivre.' },
    { q: 'Une pile est usée quand :', o: ['Q_r = 0', 'Q_r = K', 'Q_r > K', 'I est maximal'], r: 1, e: 'Équilibre atteint.' },
  ],
};
