/* Tronc Commun · Chimie · La concentration molaire */
'use strict';
CONTENU['tcc-concentration'] = {
  resume: {
    intro: TX`Une <b>solution</b> est obtenue en dissolvant un <b>soluté</b> dans un <b>solvant</b> (solution aqueuse si le solvant est l’eau). Sa composition est donnée par la <b>concentration molaire</b> \(C = n/V\) ou massique \(C_m = m/V\). On prépare une solution par dissolution ou par dilution.`,
    sections: [
      { titre: '1. Concentrations', html: TX`<p>Concentration molaire : \(C = \dfrac{n}{V}\) (mol/L) ; concentration massique : \(C_m = \dfrac{m}{V}\) (g/L). Relation : \(C_m = C\cdot M\). Une solution est <b>saturée</b> quand on ne peut plus dissoudre de soluté (limite : la solubilité).</p>` },
      { titre: '2. Préparer une solution par dissolution', html: TX`<ol><li>Calculer la masse à peser : \(m = C\cdot V\cdot M\).</li><li>Peser le soluté dans une capsule ; l’introduire dans une <b>fiole jaugée</b> avec un entonnoir ; rincer.</li><li>Remplir aux trois quarts d’eau distillée, agiter pour dissoudre.</li><li>Compléter jusqu’au <b>trait de jauge</b>, boucher, homogénéiser.</li></ol>`
        + FIG(200, 200, `<circle cx="100" cy="150" r="42" fill="#6aa5ff" opacity=".35" stroke="#14213d" stroke-width="2"/><rect x="88" y="20" width="24" height="94" fill="#fff" stroke="#14213d" stroke-width="2"/><rect x="89" y="60" width="22" height="53" fill="#6aa5ff" opacity=".35"/><line x1="82" y1="60" x2="118" y2="60" stroke="#d93a4a" stroke-width="2"/><text x="124" y="64" fill="#d93a4a" font-size="11">trait de jauge</text><text x="100" y="196" text-anchor="middle" font-size="11">fiole jaugée</text>`) },
      { titre: '3. Dilution', sim: 'dilution', html: TX`<p>Diluer, c’est ajouter du solvant : la quantité de soluté se conserve : \(C_0V_0 = C_fV_f\). On prélève \(V_0\) de solution mère avec une <b>pipette jaugée</b>, on l’introduit dans une fiole jaugée de volume \(V_f\) et on complète. <b>Facteur de dilution</b> : \(F = \dfrac{C_0}{C_f} = \dfrac{V_f}{V_0} > 1\).</p>` },
    ],
    formules: [
      { tex: TX`C = \dfrac{n}{V}`, sens: 'Concentration molaire (mol/L)' },
      { tex: TX`C_m = \dfrac{m}{V} = C\cdot M`, sens: 'Concentration massique (g/L)' },
      { tex: TX`C_0\,V_0 = C_f\,V_f`, sens: 'Conservation de la matière lors d’une dilution' },
      { tex: TX`F = \dfrac{C_0}{C_f} = \dfrac{V_f}{V_0}`, sens: 'Facteur de dilution' },
    ],
    retenir: [
      'Soluté + solvant → solution.',
      TX`\(C = n/V\) ; \(C_m = m/V = CM\).`,
      'On prépare une solution précise dans une fiole jaugée.',
      'Lors d’une dilution, la quantité de soluté ne change pas.',
      TX`Pour diluer 10 fois : \(V_0 = V_f/10\).`,
    ],
    erreurs: [
      TX`Utiliser le volume de solvant ajouté au lieu du volume final \(V_f\).`,
      'Prélever la solution mère avec une éprouvette (imprécis) au lieu d’une pipette jaugée.',
      'Remplir la fiole jusqu’au trait avant d’avoir dissous le solide.',
      TX`Oublier de convertir les mL en L.`,
    ],
  },
  experiences: {
    sims: ['dilution'],
    protocole: { titre: 'Préparer une solution de sulfate de cuivre puis la diluer', materiel: 'sulfate de cuivre pentahydraté (M = 249,7 g/mol), balance, fioles jaugées de 100 mL et 50 mL, pipette jaugée de 10 mL, eau distillée.',
      etapes: [TX`Préparer 100 mL de solution à \(C_0 = 0{,}10\ \text{mol/L}\) : peser \(m = 2{,}50\ \text{g}\).`, TX`Prélever \(V_0 = 10{,}0\ \text{mL}\) avec la pipette jaugée et les verser dans la fiole de 50 mL.`, 'Compléter jusqu’au trait de jauge, boucher et agiter.', 'Comparer les teintes ; vérifier avec la simulation.'] },
    observations: TX`<ul><li>La solution diluée est plus claire.</li><li>Facteur de dilution : \(F = 50/10 = 5\), donc \(C_f = 0{,}020\ \text{mol/L}\).</li></ul>`,
    conclusion: TX`<p>Plus une solution colorée est concentrée, plus elle est foncée. La dilution conserve la quantité de soluté : \(C_0V_0 = C_fV_f\).</p>`,
  },
  quiz: [
    { q: TX`0,02 mol de soluté dans 200 mL. \(C\) :`, o: ['0,1 mol/L', '0,004 mol/L', '10 mol/L', '4 mol/L'], r: 0, e: TX`\(0{,}02/0{,}200 = 0{,}1\).` },
    { q: TX`\(C = 0{,}5\ \text{mol/L}\) de NaCl (\(M = 58{,}5\)). \(C_m\) :`, o: ['117 g/L', '29,25 g/L', '0,0085 g/L', '58,5 g/L'], r: 1, e: TX`\(0{,}5\times58{,}5\).` },
    { q: 'On dilue 20 fois une solution à 0,1 mol/L. La concentration finale :', o: ['2 mol/L', '0,005 mol/L', '0,02 mol/L', '0,1 mol/L'], r: 1, e: TX`\(0{,}1/20\).` },
    { q: 'Pour préparer 100 mL d’une solution diluée 5 fois, on prélève :', o: ['5 mL', '20 mL', '50 mL', '500 mL'], r: 1, e: TX`\(V_0 = 100/5\).` },
    { q: 'Le matériel le plus précis pour prélever 10 mL :', o: ['bécher', 'éprouvette graduée', 'pipette jaugée', 'erlenmeyer'], r: 2, e: 'La pipette jaugée est la plus précise.' },
  ],
};
