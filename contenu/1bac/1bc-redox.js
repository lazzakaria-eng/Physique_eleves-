/* 1ʳᵉ Bac · Chimie · Les réactions d’oxydo-réduction */
'use strict';
CONTENU['1bc-redox'] = {
  resume: {
    intro: TX`Une <b>oxydation</b> est une perte d’électrons, une <b>réduction</b> un gain d’électrons. Une réaction d’oxydo-réduction est un <b>transfert d’électrons</b> du réducteur d’un couple vers l’oxydant d’un autre couple.`,
    sections: [
      { titre: '1. Oxydant, réducteur, couple', html: TX`<p>Oxydant : espèce capable de <b>capter</b> des électrons ; réducteur : espèce capable d’en <b>céder</b>. Couple Ox/Red : \(\text{Ox} + n\,e^- \rightleftharpoons \text{Red}\). Exemples : \(\text{Cu}^{2+}/\text{Cu}\), \(\text{Zn}^{2+}/\text{Zn}\), \(\text{Fe}^{3+}/\text{Fe}^{2+}\), \(\text{I}_2/\text{I}^-\), \(\text{MnO}_4^-/\text{Mn}^{2+}\).</p>` },
      { titre: '2. Équilibrer une demi-équation en milieu acide', html: TX`<ol><li>Conserver l’élément principal.</li><li>Conserver O avec \(\text{H}_2\text{O}\).</li><li>Conserver H avec \(\text{H}^+\).</li><li>Conserver les charges avec \(e^-\).</li></ol><p>Exemple : \(\text{MnO}_4^- + 8\,\text{H}^+ + 5\,e^- \rightleftharpoons \text{Mn}^{2+} + 4\,\text{H}_2\text{O}\).</p>` },
      { titre: '3. Réaction d’oxydo-réduction', sim: 'av_redox', html: TX`<p>On combine les demi-équations de façon que les électrons cédés soient tous captés : \(n_2\,\text{Red}_1 + n_1\,\text{Ox}_2 \longrightarrow n_2\,\text{Ox}_1 + n_1\,\text{Red}_2\). Exemple : \(\text{Zn} + \text{Cu}^{2+} \to \text{Zn}^{2+} + \text{Cu}\).</p>`
        + FIG(440, 110, ARW('rx1', '#1f6fe0') + `<rect x="20" y="30" width="140" height="50" rx="10" fill="#e3e9f3" stroke="#14213d"/><text x="90" y="60" text-anchor="middle">réducteur Zn</text><rect x="280" y="30" width="140" height="50" rx="10" fill="#eaf1fd" stroke="#14213d"/><text x="350" y="60" text-anchor="middle">oxydant Cu²⁺</text><path d="M160 45 Q 220 0 278 45" fill="none" stroke="#1f6fe0" stroke-width="2.5" marker-end="url(#rx1)"/><text x="220" y="20" text-anchor="middle" fill="#1f6fe0" font-weight="bold">2 e⁻</text>`) },
      { titre: '4. Applications', sim: 'pile', html: TX`<p>Piles (transfert d’électrons indirect par un circuit), corrosion des métaux, dosages (permanganate, diiode), désinfection (eau de Javel).</p>` },
    ],
    formules: [
      { tex: TX`\text{Ox} + n\,e^- \rightleftharpoons \text{Red}`, sens: 'Demi-équation d’un couple' },
      { tex: TX`\text{Cu}^{2+} + 2\,e^- \rightleftharpoons \text{Cu}`, sens: 'Exemple simple' },
      { tex: TX`\text{MnO}_4^- + 8\,\text{H}^+ + 5\,e^- \rightleftharpoons \text{Mn}^{2+} + 4\,\text{H}_2\text{O}`, sens: 'Ion permanganate en milieu acide' },
      { tex: TX`n_2\,\text{Red}_1 + n_1\,\text{Ox}_2 \longrightarrow n_2\,\text{Ox}_1 + n_1\,\text{Red}_2`, sens: 'Équation bilan' },
    ],
    retenir: [
      'Oxydation = perte d’électrons ; réduction = gain.',
      'L’oxydant est réduit ; le réducteur est oxydé.',
      'Équilibrer : élément, O (H₂O), H (H⁺), charges (e⁻).',
      'Aucun électron libre dans l’équation bilan.',
    ],
    erreurs: [
      'Laisser des électrons dans l’équation bilan.',
      'Confondre oxydant et oxydation.',
      'Oublier d’équilibrer les charges.',
    ],
  },
  experiences: {
    sims: ['av_redox', 'pile'],
    protocole: { titre: 'Zinc dans une solution de sulfate de cuivre', materiel: 'poudre de zinc, solution de sulfate de cuivre bleue, tube à essais, soude.',
      etapes: ['Ajouter une pointe de spatule de zinc à 5 mL de solution de sulfate de cuivre ; agiter.', 'Observer la couleur de la solution et le dépôt.', 'Filtrer et ajouter quelques gouttes de soude au filtrat.'] },
    observations: TX`<ul><li>La solution se décolore ; un dépôt rouge de cuivre apparaît.</li><li>Avec la soude, le filtrat donne un précipité blanc (ions Zn²⁺).</li></ul>`,
    conclusion: TX`<p>\(\text{Zn} + \text{Cu}^{2+} \to \text{Zn}^{2+} + \text{Cu}\) : le zinc est oxydé, les ions cuivre sont réduits.</p>`,
  },
  quiz: [
    { q: 'Une oxydation est :', o: ['un gain d’électrons', 'une perte d’électrons', 'un gain de protons', 'une perte de protons'], r: 1, e: 'Le réducteur s’oxyde en perdant des électrons.' },
    { q: 'Dans Fe + Cu²⁺ → Fe²⁺ + Cu, l’oxydant est :', o: ['Fe', 'Cu²⁺', 'Fe²⁺', 'Cu'], r: 1, e: 'Il capte 2 électrons.' },
    { q: TX`Électrons dans \(\text{Cr}_2\text{O}_7^{2-} + 14\text{H}^+ + \dots e^- \to 2\text{Cr}^{3+} + 7\text{H}_2\text{O}\) :`, o: ['3', '6', '2', '14'], r: 1, e: TX`Charges : \(-2 + 14 - n = +6 \Rightarrow n = 6\).` },
    { q: 'Ag⁺ et Cu : équation équilibrée :', o: ['Cu + Ag⁺ → Cu²⁺ + Ag', 'Cu + 2Ag⁺ → Cu²⁺ + 2Ag', '2Cu + Ag⁺ → 2Cu²⁺ + Ag', 'Cu²⁺ + Ag → Cu + Ag⁺'], r: 1, e: 'Cu cède 2 e⁻, chaque Ag⁺ en capte 1.' },
    { q: 'Le réducteur du couple I₂/I⁻ est :', o: ['I₂', 'I⁻', 'les deux', 'aucun'], r: 1, e: 'I₂ + 2e⁻ ⇌ 2I⁻.' },
  ],
};
