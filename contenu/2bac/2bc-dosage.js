/* 2ᵉ Bac · Chimie · Dosage acido-basique */
'use strict';
CONTENU['2bc-dosage'] = {
  resume: {
    intro: TX`On dose un acide par une base forte (ou l’inverse) en suivant le pH. La courbe \(\text{pH} = f(V_B)\) présente un <b>saut de pH</b> à l’équivalence, repéré par la méthode des tangentes ou par un indicateur coloré.`,
    sections: [
      { titre: '1. Réaction de dosage', sim: 'titrage', html: TX`<p>\(\text{AH} + \text{HO}^- \longrightarrow \text{A}^- + \text{H}_2\text{O}\) : rapide et totale (\(\tau \approx 1\), K très grande). À l’équivalence : \(C_A\,V_A = C_B\,V_{BE}\).</p>` },
      { titre: '2. Courbe pH = f(V_B) et équivalence', html: TX`<p>Point d’équivalence E : méthode des <b>tangentes parallèles</b> (E au milieu) ou maximum de \(\dfrac{d\text{pH}}{dV}\). Acide fort + base forte : \(\text{pH}_E = 7\). Acide faible + base forte : \(\text{pH}_E > 7\) et, à la <b>demi-équivalence</b> (\(V_B = V_{BE}/2\)), \(\text{pH} = \text{p}K_A\).</p>`
        + FIG(440, 220, `<line x1="40" y1="200" x2="420" y2="200" stroke="#5b6577"/><line x1="40" y1="210" x2="40" y2="10" stroke="#5b6577"/><text x="400" y="216" font-size="11">V_B</text><text x="46" y="20">pH</text><polyline points="${Array.from({ length: 76 }, (_, i) => { const V = i * 0.4, Ve = 15; let pH; if (V < Ve - 0.05) { const r = V / Ve; pH = 4.8 + Math.log10((r + 0.02) / (1 - r + 0.0001)); } else pH = 12.4 - 3.5 * Math.exp(-(V - Ve) * 1.2); return (40 + V * 12) + ',' + (200 - Math.max(2.5, Math.min(12.6, pH)) * 14).toFixed(1); }).join(' ')}" fill="none" stroke="#1f6fe0" stroke-width="3"/><line x1="220" y1="200" x2="220" y2="70" stroke="#d93a4a" stroke-dasharray="4 3"/><text x="212" y="216" fill="#d93a4a" font-size="11">V_BE</text><line x1="130" y1="200" x2="130" y2="133" stroke="#12946a" stroke-dasharray="4 3"/><line x1="40" y1="133" x2="130" y2="133" stroke="#12946a" stroke-dasharray="4 3"/><text x="4" y="136" fill="#12946a" font-size="11">pK_A</text>`) },
      { titre: '3. Choix d’un indicateur coloré', html: TX`<p>La zone de virage de l’indicateur doit contenir \(\text{pH}_E\) : BBT (6,0 – 7,6) pour acide fort/base forte ; phénolphtaléine (8,2 – 10) pour acide faible/base forte ; hélianthine (3,1 – 4,4) pour base faible/acide fort.</p>` },
    ],
    formules: [
      { tex: TX`\text{AH} + \text{HO}^- \longrightarrow \text{A}^- + \text{H}_2\text{O}`, sens: 'Réaction de dosage' },
      { tex: TX`C_A\,V_A = C_B\,V_{BE}`, sens: 'Relation à l’équivalence' },
      { tex: TX`\text{pH} = \text{p}K_A \ \text{ pour } V_B = \dfrac{V_{BE}}{2}`, sens: 'Demi-équivalence' },
      { tex: TX`\text{pH}_E \in \text{zone de virage}`, sens: 'Choix de l’indicateur' },
    ],
    retenir: [
      'La réaction de dosage est rapide et totale.',
      'Équivalence : réactifs dans les proportions stœchiométriques.',
      'Demi-équivalence : pH = pK_A (acide faible).',
      'pH_E = 7 (fort/fort), > 7 (acide faible/base forte).',
    ],
    erreurs: [
      'Lire pK_A à l’équivalence au lieu de la demi-équivalence.',
      'Choisir un indicateur dont la zone de virage ne contient pas pH_E.',
      'Oublier un facteur de dilution.',
    ],
  },
  experiences: {
    sims: ['titrage', 'dosage_cond'],
    protocole: { titre: 'Dosage pH-métrique d’un vinaigre dilué', materiel: 'pH-mètre étalonné, burette, soude à 0,10 mol/L, 20,0 mL de vinaigre dilué 10 fois, agitateur.',
      etapes: ['Verser la soude mL par mL (0,5 mL près de l’équivalence) en relevant le pH.', 'Tracer pH = f(V_B) et déterminer E par la méthode des tangentes.', 'Lire le pK_A à la demi-équivalence.', 'Calculer la concentration du vinaigre.'] },
    observations: TX`<ul><li>Saut de pH vers \(V_{BE} = 14{,}0\ \text{mL}\), \(\text{pH}_E \approx 8{,}7\).</li><li>À 7,0 mL, pH ≈ 4,8.</li></ul>`,
    conclusion: TX`<p>\(C_A = \dfrac{0{,}10\times14{,}0}{20{,}0} = 0{,}070\ \text{mol/L}\) (vinaigre : 0,70 mol/L) ; \(\text{p}K_A \approx 4{,}8\).</p>`,
  },
  quiz: [
    { q: TX`V_A = 10 mL, C_B = 0,1 mol/L, V_BE = 12 mL. C_A :`, o: ['0,12 mol/L', '0,083 mol/L', '1,2 mol/L', '0,012 mol/L'], r: 0, e: TX`\(0{,}1\times12/10\).` },
    { q: 'À la demi-équivalence d’un acide faible :', o: ['pH = 7', 'pH = pK_A', 'pH = pH_E', 'pH = 14'], r: 1, e: '[AH] = [A⁻].' },
    { q: 'Pour doser un acide faible par la soude, on choisit :', o: ['l’hélianthine', 'la phénolphtaléine', 'aucun indicateur', 'le BBT obligatoirement'], r: 1, e: 'pH_E > 7.' },
    { q: 'Le pH à l’équivalence d’un dosage acide fort / base forte :', o: ['< 7', '7', '> 7', '14'], r: 1, e: 'Solution neutre de NaCl.' },
    { q: 'La méthode des tangentes sert à trouver :', o: ['le pK_A', 'le point d’équivalence', 'la température', 'le volume initial'], r: 1, e: 'E au milieu des tangentes parallèles.' },
  ],
};
