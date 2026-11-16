/* 1ʳᵉ Bac · Physique · Électrodynamique · Comportement global d’un circuit électrique */
'use strict';
CONTENU['1b-global'] = {
  resume: {
    intro: TX`On étudie un circuit dans son ensemble : la <b>loi de Pouillet</b> donne l’intensité, la conservation de l’énergie relie les puissances, et l’on cherche les conditions qui optimisent le transfert d’énergie du générateur vers les récepteurs.`,
    sections: [
      { titre: '1. Loi de Pouillet', sim: 'generateur', html: TX`<p>Circuit série comportant un générateur \((E, r)\), un récepteur actif \((E', r')\) et un conducteur ohmique \(R\) : \(E - rI = E' + r'I + RI\), d’où</p><p style="text-align:center">\(I = \dfrac{E - E'}{R + r + r'}\)</p>` },
      { titre: '2. Bilan d’énergie du circuit', sim: 'bilan', html: TX`<p>Puissance produite par le générateur = somme des puissances reçues : \(E\,I = E'\,I + (R + r + r')\,I^2\). Rendement global du circuit : \(\eta = \dfrac{E'\,I}{E\,I} = \dfrac{E'}{E}\).</p>` },
      { titre: '3. Influence de E et de R', html: TX`<ul><li>Augmenter \(E\) augmente \(I\) et la puissance reçue par les récepteurs.</li><li>Augmenter \(R\) diminue \(I\).</li></ul>` },
      { titre: '4. Puissance maximale transférée', html: TX`<p>Générateur \((E, r)\) branché sur \(R\) : \(P = RI^2 = \dfrac{R\,E^2}{(R + r)^2}\). Cette puissance est maximale quand \(R = r\) : \(P_{max} = \dfrac{E^2}{4r}\) (adaptation d’impédance) ; le rendement vaut alors 50 %.</p>`
        + FIG(380, 200, `<line x1="40" y1="170" x2="360" y2="170" stroke="#5b6577" stroke-width="1.5"/><line x1="40" y1="180" x2="40" y2="15" stroke="#5b6577" stroke-width="1.5"/><text x="350" y="190">R</text><text x="46" y="24">P</text><polyline points="${Array.from({ length: 61 }, (_, i) => { const R = i * 0.2; const P = R / ((R + 2) ** 2); return (40 + R * 26) + ',' + (170 - P * 1100); }).join(' ')}" fill="none" stroke="#1f6fe0" stroke-width="3"/><line x1="92" y1="170" x2="92" y2="32" stroke="#d93a4a" stroke-dasharray="4 3"/><text x="86" y="188" fill="#d93a4a">r</text><text x="100" y="30" fill="#d93a4a" font-size="11">P_max = E²/4r</text>`) },
    ],
    formules: [
      { tex: TX`I = \dfrac{E - E'}{R + r + r'}`, sens: 'Loi de Pouillet' },
      { tex: TX`E\,I = E'\,I + (R + r + r')\,I^2`, sens: 'Conservation de l’énergie' },
      { tex: TX`\eta = \dfrac{E'}{E}`, sens: 'Rendement global' },
      { tex: TX`P_{max} = \dfrac{E^2}{4\,r} \ \text{ pour } R = r`, sens: 'Puissance maximale transférée' },
    ],
    retenir: [
      'Loi de Pouillet : toutes les résistances au dénominateur.',
      'La puissance du générateur se répartit entre récepteurs et pertes.',
      'Transfert de puissance maximal pour R = r (rendement 50 %).',
    ],
    erreurs: [
      'Oublier r ou r′ dans la loi de Pouillet.',
      'Confondre puissance maximale et rendement maximal.',
      TX`Appliquer la formule si \(E < E'\) (alors \(I = 0\)).`,
    ],
  },
  experiences: {
    sims: ['generateur', 'bilan'],
    protocole: { titre: 'Chercher la puissance maximale', materiel: 'pile (E, r), rhéostat, ampèremètre, voltmètre (ou simulation « générateur »).',
      etapes: ['Brancher le rhéostat aux bornes de la pile.', 'Pour plusieurs valeurs de R, mesurer U et I et calculer P = U·I.', 'Tracer P = f(R) et repérer le maximum.'] },
    observations: TX`<ul><li>P augmente, passe par un maximum puis diminue.</li><li>Le maximum est atteint quand R est égale à la résistance interne r.</li></ul>`,
    conclusion: TX`<p>\(P_{max} = E^2/4r\) pour \(R = r\).</p>`,
  },
  quiz: [
    { q: TX`\(E = 12\ \text{V}\), \(r = 1\ \Omega\), \(E' = 4\ \text{V}\), \(r' = 1\ \Omega\), \(R = 2\ \Omega\). I :`, o: ['2 A', '4 A', '3 A', '1 A'], r: 0, e: TX`\(8/4\).` },
    { q: 'Rendement global de ce circuit :', o: ['33 %', '50 %', '67 %', '100 %'], r: 0, e: TX`\(E'/E = 4/12\).` },
    { q: TX`Pile \(E = 6\ \text{V}\), \(r = 2\ \Omega\). Puissance maximale transférable :`, o: ['4,5 W', '18 W', '3 W', '9 W'], r: 0, e: TX`\(36/8\).` },
    { q: 'Cette puissance est obtenue pour R égale à :', o: ['0 Ω', '1 Ω', '2 Ω', '∞'], r: 2, e: 'R = r.' },
    { q: 'Si on augmente la résistance R du circuit, l’intensité :', o: ['augmente', 'diminue', 'ne change pas', 'devient négative'], r: 1, e: 'R est au dénominateur de la loi de Pouillet.' },
  ],
};
