/* 2ᵉ Bac · Physique · Transformations nucléaires · Noyaux, masse et énergie */
'use strict';
CONTENU['2b-noyaux'] = {
  resume: {
    intro: TX`La masse d’un noyau est inférieure à la somme des masses de ses nucléons : c’est le <b>défaut de masse</b>. Selon Einstein (\(E = mc^2\)), il correspond à l’<b>énergie de liaison</b> du noyau. Fission et fusion libèrent de l’énergie car elles produisent des noyaux plus stables.`,
    sections: [
      { titre: '1. Équivalence masse – énergie', html: TX`<p>\(E = m\,c^2\). Unités : \(1\ \text{eV} = 1{,}6\times10^{-19}\ \text{J}\) ; \(1\ \text{MeV} = 1{,}6\times10^{-13}\ \text{J}\) ; unité de masse atomique \(1\ \text{u} = 1{,}66\times10^{-27}\ \text{kg} \leftrightarrow 931{,}5\ \text{MeV}/c^2\).</p>` },
      { titre: '2. Défaut de masse et énergie de liaison', html: TX`<p>\(\Delta m = Z\,m_p + (A - Z)\,m_n - m({}^{A}_{Z}\text{X}) > 0\). Énergie de liaison : \(E_\ell = \Delta m\,c^2\) (énergie à fournir pour séparer tous les nucléons). Énergie de liaison par nucléon \(\mathcal E = E_\ell / A\) : plus elle est grande, plus le noyau est <b>stable</b>.</p>` },
      { titre: '3. Courbe d’Aston', sim: 'liaison', html: TX`<p>La courbe \(-\mathcal E = f(A)\) présente un minimum vers \(A \approx 60\) (fer, nickel) : noyaux les plus stables. Les noyaux légers peuvent <b>fusionner</b> et les noyaux lourds <b>fissionner</b> pour gagner en stabilité.</p>`
        + FIG(440, 190, `<line x1="40" y1="20" x2="420" y2="20" stroke="#5b6577"/><line x1="40" y1="20" x2="40" y2="180" stroke="#5b6577"/><text x="410" y="14">A</text><text x="44" y="190" font-size="11">−E_ℓ/A</text><path d="M48 60 C 70 160, 110 172, 150 172 S 330 160, 410 148" fill="none" stroke="#1f6fe0" stroke-width="3"/><text x="60" y="140" fill="#12946a" font-weight="bold">fusion</text><text x="330" y="130" fill="#d98200" font-weight="bold">fission</text><text x="140" y="164" font-size="11">Fe</text>`) },
      { titre: '4. Bilan énergétique d’une réaction', html: TX`<p>\(\Delta E = \big[\sum m(\text{produits}) - \sum m(\text{réactifs})\big]\,c^2 < 0\) : énergie libérée \(E_{lib} = |\Delta E|\). Aussi : \(E_{lib} = \sum E_\ell(\text{produits}) - \sum E_\ell(\text{réactifs})\).</p>
<ul><li><b>Fission</b> : un neutron lent casse un noyau lourd (\({}^{235}\text{U}\)) en deux noyaux moyens + neutrons (réaction en chaîne).</li><li><b>Fusion</b> : deux noyaux légers forment un noyau plus lourd (Soleil, \({}^{2}\text{H} + {}^{3}\text{H}\)).</li></ul>` },
    ],
    formules: [
      { tex: TX`E = m\,c^2`, sens: 'Équivalence masse – énergie' },
      { tex: TX`\Delta m = Z\,m_p + (A - Z)\,m_n - m(\text{X})`, sens: 'Défaut de masse' },
      { tex: TX`E_\ell = \Delta m\,c^2`, sens: 'Énergie de liaison' },
      { tex: TX`\mathcal E = \dfrac{E_\ell}{A}`, sens: 'Énergie de liaison par nucléon' },
      { tex: TX`\Delta E = \Big[\sum m_{prod} - \sum m_{réac}\Big]c^2`, sens: 'Bilan d’une réaction nucléaire' },
      { tex: TX`1\ \text{u} = 931{,}5\ \text{MeV}/c^2`, sens: 'Unité de masse atomique' },
    ],
    retenir: [
      'Le défaut de masse est toujours positif.',
      'Plus E_ℓ/A est grande, plus le noyau est stable.',
      'Fusion des noyaux légers, fission des noyaux lourds : libération d’énergie.',
      'Une réaction libère de l’énergie si la masse des produits est inférieure à celle des réactifs.',
    ],
    erreurs: [
      'Oublier de multiplier par c² (ou par 931,5 MeV/u).',
      'Confondre énergie de liaison et énergie de liaison par nucléon.',
      'Oublier un neutron dans le bilan de masse d’une fission.',
      'Mélanger MeV et J.',
    ],
  },
  experiences: {
    sims: ['liaison', 'fission', 'fusion'],
    protocole: { titre: 'Exploiter la courbe d’Aston', materiel: 'simulation « courbe d’Aston », tableau des énergies de liaison.',
      etapes: ['Repérer le noyau le plus stable.', 'Comparer E_ℓ/A pour ²H, ⁴He, ⁵⁶Fe, ²³⁵U.', 'Prévoir si la fusion de deux noyaux de ²H, ou la fission de ²³⁵U, libère de l’énergie.'] },
    observations: TX`<ul><li>\(E_\ell/A\) est maximale (≈ 8,8 MeV) vers le fer.</li><li>⁴He (7,1 MeV) est beaucoup plus stable que ²H (1,1 MeV) ; ²³⁵U (7,6 MeV) est moins stable que les noyaux moyens.</li></ul>`,
    conclusion: TX`<p>Les réactions qui rapprochent les noyaux de la zone du fer libèrent de l’énergie : fusion à gauche, fission à droite.</p>`,
  },
  quiz: [
    { q: 'Le défaut de masse d’un noyau est :', o: ['négatif', 'nul', 'positif', 'égal à sa masse'], r: 2, e: 'Le noyau est plus léger que ses nucléons séparés.' },
    { q: TX`Δm = 0,0304 u. E_ℓ :`, o: ['28,3 MeV', '0,0304 MeV', '931,5 MeV', '2,83 MeV'], r: 0, e: TX`\(0{,}0304\times931{,}5\).` },
    { q: 'Le noyau le plus stable est celui qui a :', o: ['le plus grand A', 'la plus grande E_ℓ', 'la plus grande E_ℓ/A', 'le plus petit Z'], r: 2, e: 'Énergie de liaison par nucléon.' },
    { q: 'La fusion concerne :', o: ['les noyaux lourds', 'les noyaux légers', 'le fer', 'les électrons'], r: 1, e: 'Comme dans le Soleil.' },
    { q: TX`1 MeV vaut :`, o: [TX`\(1{,}6\times10^{-13}\ \text{J}\)`, TX`\(1{,}6\times10^{-19}\ \text{J}\)`, TX`\(10^{6}\ \text{J}\)`, TX`\(9\times10^{16}\ \text{J}\)`], r: 0, e: TX`\(10^{6}\times1{,}6\times10^{-19}\).` },
  ],
};
