/* 1ʳᵉ Bac · Chimie · Les réactions acido-basiques */
'use strict';
CONTENU['1bc-acidobase'] = {
  resume: {
    intro: TX`Selon Brønsted, un <b>acide</b> est une espèce capable de <b>céder un proton</b> \(\text{H}^+\) et une <b>base</b> une espèce capable d’en <b>capter</b> un. Une réaction acido-basique est un <b>transfert de proton</b> entre l’acide d’un couple et la base d’un autre couple.`,
    sections: [
      { titre: '1. Acides, bases et couples', html: TX`<p>Un acide AH et sa base conjuguée A⁻ forment un <b>couple acide/base</b> AH/A⁻, défini par la demi-équation \(\text{AH} \rightleftharpoons \text{A}^- + \text{H}^+\). Exemples : \(\text{CH}_3\text{COOH}/\text{CH}_3\text{COO}^-\) ; \(\text{NH}_4^+/\text{NH}_3\) ; \(\text{HCl}/\text{Cl}^-\).</p>` },
      { titre: '2. L’eau, espèce amphotère', html: TX`<p>L’eau appartient à deux couples : \(\text{H}_3\text{O}^+/\text{H}_2\text{O}\) (elle est base) et \(\text{H}_2\text{O}/\text{HO}^-\) (elle est acide). C’est un <b>ampholyte</b>. Une solution acide contient des ions oxonium \(\text{H}_3\text{O}^+\) ; une solution basique des ions hydroxyde \(\text{HO}^-\).</p>` },
      { titre: '3. Réaction acido-basique', sim: 'av_ab', html: TX`<p>Entre l’acide \(\text{A}_1\text{H}\) du couple 1 et la base \(\text{A}_2^-\) du couple 2 :</p><p style="text-align:center">\(\text{A}_1\text{H} + \text{A}_2^- \longrightarrow \text{A}_1^- + \text{A}_2\text{H}\)</p>
<p>On l’obtient en additionnant les deux demi-équations (les \(\text{H}^+\) s’éliminent). Exemple : \(\text{CH}_3\text{COOH} + \text{HO}^- \to \text{CH}_3\text{COO}^- + \text{H}_2\text{O}\).</p>`
        + FIG(440, 110, ARW('ab1', '#d93a4a') + `<rect x="20" y="30" width="140" height="50" rx="10" fill="#fff1d2" stroke="#14213d"/><text x="90" y="60" text-anchor="middle">acide A₁H</text><rect x="280" y="30" width="140" height="50" rx="10" fill="#eaf1fd" stroke="#14213d"/><text x="350" y="60" text-anchor="middle">base A₂⁻</text><path d="M160 45 Q 220 0 278 45" fill="none" stroke="#d93a4a" stroke-width="2.5" marker-end="url(#ab1)"/><text x="220" y="20" text-anchor="middle" fill="#d93a4a" font-weight="bold">H⁺</text>`) },
      { titre: '4. Indicateurs colorés', html: TX`<p>Un indicateur coloré est un couple acide/base dont les deux formes ont des couleurs différentes (BBT : jaune en milieu acide, bleu en milieu basique ; phénolphtaléine : incolore / rose).</p>` },
    ],
    formules: [
      { tex: TX`\text{AH} \rightleftharpoons \text{A}^- + \text{H}^+`, sens: 'Demi-équation d’un couple' },
      { tex: TX`\text{A}_1\text{H} + \text{A}_2^- \longrightarrow \text{A}_1^- + \text{A}_2\text{H}`, sens: 'Réaction acido-basique' },
      { tex: TX`\text{H}_3\text{O}^+/\text{H}_2\text{O} \ ;\ \text{H}_2\text{O}/\text{HO}^-`, sens: 'Couples de l’eau' },
      { tex: TX`\text{CH}_3\text{COOH}/\text{CH}_3\text{COO}^- \ ;\ \text{NH}_4^+/\text{NH}_3`, sens: 'Couples usuels' },
    ],
    retenir: [
      'Acide : donneur de H⁺ ; base : accepteur de H⁺.',
      'Un couple acide/base ne diffère que d’un H⁺.',
      'L’eau est amphotère.',
      'La réaction fait intervenir l’acide d’un couple et la base d’un autre.',
    ],
    erreurs: [
      'Écrire un couple base/acide dans le mauvais ordre.',
      'Faire réagir l’acide et la base d’un même couple.',
      'Oublier d’équilibrer les charges.',
    ],
  },
  experiences: {
    sims: ['av_ab'],
    protocole: { titre: 'Réaction entre l’acide éthanoïque et la soude', materiel: 'vinaigre dilué, soude à 0,1 mol/L, BBT, burette, bécher.',
      etapes: ['Ajouter quelques gouttes de BBT au vinaigre dilué.', 'Verser progressivement la soude en agitant.', 'Noter le changement de couleur.', 'Écrire les demi-équations et l’équation de la réaction.'] },
    observations: TX`<ul><li>La solution, jaune au départ, devient verte puis bleue quand la soude est en excès.</li></ul>`,
    conclusion: TX`<p>\(\text{CH}_3\text{COOH} + \text{HO}^- \to \text{CH}_3\text{COO}^- + \text{H}_2\text{O}\) : transfert d’un proton de l’acide éthanoïque vers l’ion hydroxyde.</p>`,
  },
  quiz: [
    { q: 'La base conjuguée de NH₄⁺ est :', o: ['NH₃', 'NH₂⁻', 'NH₅⁺', 'N₂'], r: 0, e: 'NH₄⁺ ⇌ NH₃ + H⁺.' },
    { q: 'L’eau est une espèce :', o: ['acide seulement', 'basique seulement', 'amphotère', 'neutre qui ne réagit pas'], r: 2, e: 'Elle appartient à deux couples.' },
    { q: 'Dans NH₃ + H₃O⁺ → NH₄⁺ + H₂O, l’acide qui réagit est :', o: ['NH₃', 'H₃O⁺', 'NH₄⁺', 'H₂O'], r: 1, e: 'Il cède son proton.' },
    { q: 'Le BBT est jaune en milieu :', o: ['basique', 'acide', 'neutre', 'salé'], r: 1, e: 'Bleu en milieu basique.' },
    { q: 'Un couple acide/base diffère de :', o: ['un électron', 'un proton H⁺', 'un ion HO⁻', 'une molécule d’eau'], r: 1, e: 'Par définition.' },
  ],
};
