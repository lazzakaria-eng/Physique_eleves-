/* 1ʳᵉ Bac · Chimie · La concentration et les solutions électrolytiques */
'use strict';
CONTENU['1bc-electrolytes'] = {
  resume: {
    intro: TX`Une <b>solution électrolytique</b> contient des ions : elle conduit le courant. Elle s’obtient en dissolvant un solide ionique ou certains composés moléculaires polaires (HCl) dans un solvant polaire comme l’eau. On distingue la concentration en <b>soluté apporté</b> \(C\) et les concentrations effectives des ions \([X]\).`,
    sections: [
      { titre: '1. Solides ioniques et molécules polaires', html: TX`<p>Un solide ionique (NaCl, CaCl₂) est un empilement régulier d’ions ; il est électriquement neutre. Une liaison covalente est <b>polarisée</b> si les atomes ont des électronégativités différentes ; la molécule d’eau est <b>polaire</b> (dipôle électrique), ce qui explique son pouvoir dissolvant.</p>` },
      { titre: '2. Dissolution en trois étapes', sim: 'electrolyte', html: TX`<ol><li><b>Dissociation</b> : les molécules d’eau détachent les ions du cristal.</li><li><b>Solvatation (hydratation)</b> : chaque ion s’entoure de molécules d’eau.</li><li><b>Dispersion</b> : les ions hydratés se répartissent dans la solution.</li></ol><p>Équation : \(\text{CaCl}_2(s) \xrightarrow{\text{eau}} \text{Ca}^{2+}(aq) + 2\,\text{Cl}^-(aq)\).</p>` },
      { titre: '3. Concentrations', sim: 'dilution', html: TX`<p>Concentration en soluté apporté : \(C = \dfrac{n(\text{soluté})}{V}\). Concentration effective d’un ion : \([X] = \dfrac{n(X)}{V}\). Pour \(\text{CaCl}_2\) de concentration \(C\) : \([\text{Ca}^{2+}] = C\) et \([\text{Cl}^-] = 2C\). La solution est électriquement neutre : \(2[\text{Ca}^{2+}] = [\text{Cl}^-]\).</p>` },
    ],
    formules: [
      { tex: TX`\text{CaCl}_2(s) \longrightarrow \text{Ca}^{2+}(aq) + 2\,\text{Cl}^-(aq)`, sens: 'Équation de dissolution' },
      { tex: TX`C = \dfrac{n(\text{soluté})}{V}`, sens: 'Concentration en soluté apporté' },
      { tex: TX`[X] = \dfrac{n(X)}{V}`, sens: 'Concentration effective d’un ion' },
      { tex: TX`[\text{Ca}^{2+}] = C \qquad [\text{Cl}^-] = 2C`, sens: 'Exemple CaCl₂' },
    ],
    retenir: [
      'Une solution électrolytique contient des ions et est électriquement neutre.',
      'L’eau est un solvant polaire.',
      'Dissolution : dissociation, hydratation, dispersion.',
      'Les coefficients de l’équation de dissolution donnent les concentrations des ions.',
    ],
    erreurs: [
      'Écrire [Cl⁻] = C pour CaCl₂.',
      'Oublier l’état (aq) des ions.',
      'Confondre C (soluté apporté) et [X] (ion présent).',
    ],
  },
  experiences: {
    sims: ['electrolyte', 'dilution'],
    protocole: { titre: 'Préparer une solution de chlorure de calcium', materiel: 'CaCl₂ anhydre (M = 111 g/mol), fiole jaugée de 100 mL, balance, conductimètre.',
      etapes: ['Peser 1,11 g de CaCl₂, le dissoudre dans la fiole et compléter à 100 mL.', TX`Calculer \(C\), \([\text{Ca}^{2+}]\) et \([\text{Cl}^-]\).`, 'Comparer la conductivité de l’eau distillée et de la solution.'] },
    observations: TX`<ul><li>La dissolution est exothermique (la fiole tiédit).</li><li>La solution conduit le courant ; l’eau distillée très peu.</li></ul>`,
    conclusion: TX`<p>\(C = 0{,}10\ \text{mol/L}\), \([\text{Ca}^{2+}] = 0{,}10\ \text{mol/L}\) et \([\text{Cl}^-] = 0{,}20\ \text{mol/L}\) : ce sont les ions qui conduisent le courant.</p>`,
  },
  quiz: [
    { q: TX`Solution de \(\text{Na}_2\text{SO}_4\) à 0,1 mol/L : \([\text{Na}^+]\) :`, o: ['0,1 mol/L', '0,2 mol/L', '0,05 mol/L', '0,3 mol/L'], r: 1, e: 'Deux ions Na⁺ par unité.' },
    { q: 'L’eau dissout bien les solides ioniques parce qu’elle est :', o: ['apolaire', 'polaire', 'acide', 'conductrice'], r: 1, e: 'Les dipôles attirent les ions.' },
    { q: 'L’étape où les ions s’entourent de molécules d’eau est :', o: ['la dissociation', 'la solvatation', 'la dispersion', 'la précipitation'], r: 1, e: 'Aussi appelée hydratation.' },
    { q: TX`Pour \(\text{AlCl}_3\) à C : [Cl⁻] =`, o: ['C', '3C', 'C/3', '2C'], r: 1, e: 'Trois ions chlorure.' },
    { q: 'Une solution électrolytique est :', o: ['chargée positivement', 'chargée négativement', 'électriquement neutre', 'isolante'], r: 2, e: 'Autant de charges + que de charges −.' },
  ],
};
