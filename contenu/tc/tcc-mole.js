/* Tronc Commun · Chimie · La mole, unité de quantité de matière */
'use strict';
CONTENU['tcc-mole'] = {
  resume: {
    intro: TX`Les entités chimiques sont si petites et si nombreuses qu’on les compte par « paquets » : la <b>mole</b>. Une mole contient \(N_A = 6{,}02\times10^{23}\) entités. La quantité de matière \(n\) se calcule à partir d’un nombre d’entités, d’une masse ou d’un volume de gaz.`,
    sections: [
      { titre: '1. La mole et la constante d’Avogadro', sim: 'mole', html: TX`<p>Une mole est la quantité de matière d’un système contenant \(N_A = 6{,}02\times10^{23}\) entités identiques. Pour \(N\) entités : \(n = \dfrac{N}{N_A}\) (en mol).</p>` },
      { titre: '2. Masse molaire', html: TX`<p><b>Masse molaire atomique</b> \(M\) : masse d’une mole d’atomes (g/mol), donnée par le tableau (C : 12 ; H : 1 ; O : 16 ; N : 14…). <b>Masse molaire moléculaire</b> : somme des masses molaires des atomes : \(M(\text{H}_2\text{O}) = 2\times1 + 16 = 18\ \text{g/mol}\). Pour un ion, on néglige les électrons.</p>
<p>Relation : \(n = \dfrac{m}{M}\). Pour un liquide de masse volumique \(\rho\) : \(n = \dfrac{\rho\,V}{M}\).</p>` },
      { titre: '3. Volume molaire des gaz', sim: 'gaz', html: TX`<p><b>Loi d’Avogadro-Ampère</b> : dans les mêmes conditions de température et de pression, une mole de n’importe quel gaz occupe le même volume, le <b>volume molaire</b> \(V_m\) (22,4 L/mol à 0 °C et 1 atm ; environ 24 L/mol à 20 °C). Donc \(n = \dfrac{V}{V_m}\).</p>
<p>Densité d’un gaz par rapport à l’air : \(d = \dfrac{M}{29}\). Un gaz de densité \(> 1\) s’accumule en bas (\(\text{CO}_2\) : \(d \approx 1{,}5\)).</p>` },
    ],
    formules: [
      { tex: TX`n = \dfrac{N}{N_A}`, sens: 'À partir d’un nombre d’entités' },
      { tex: TX`N_A = 6{,}02\times10^{23}\ \text{mol}^{-1}`, sens: 'Constante d’Avogadro' },
      { tex: TX`n = \dfrac{m}{M}`, sens: 'À partir d’une masse' },
      { tex: TX`n = \dfrac{V}{V_m}`, sens: 'Pour un gaz' },
      { tex: TX`d = \dfrac{M}{29}`, sens: 'Densité d’un gaz par rapport à l’air' },
    ],
    retenir: [
      TX`1 mol = \(6{,}02\times10^{23}\) entités.`,
      'La masse molaire d’une molécule est la somme de celles de ses atomes.',
      TX`\(n = m/M\) pour un solide ou un liquide ; \(n = V/V_m\) pour un gaz.`,
      'Tous les gaz ont le même volume molaire dans les mêmes conditions.',
      TX`\(d_{gaz} = M/29\).`,
    ],
    erreurs: [
      TX`Utiliser \(n = V/V_m\) pour un liquide.`,
      'Oublier un indice en calculant M (H₂SO₄ : 2 H, 4 O).',
      TX`Mélanger L et mL avec \(V_m\) en L/mol.`,
      TX`Prendre \(V_m = 22{,}4\ \text{L/mol}\) quand l’énoncé donne d’autres conditions.`,
    ],
  },
  experiences: {
    sims: ['mole', 'gaz'],
    protocole: { titre: 'Prélever une quantité de matière donnée', materiel: 'balance, éprouvette graduée, spatule, sel (NaCl), éthanol (ρ = 0,79 g/mL).',
      etapes: [TX`Calculer la masse de sel à peser pour obtenir \(n = 0{,}10\ \text{mol}\) (\(M = 58{,}5\ \text{g/mol}\)) et la peser.`, TX`Calculer le volume d’éthanol (\(M = 46\ \text{g/mol}\)) correspondant à 0,10 mol et le mesurer.`, 'Comparer les deux échantillons et dénombrer les entités.'] },
    observations: TX`<ul><li>Il faut peser 5,85 g de sel et mesurer environ 5,8 mL d’éthanol.</li><li>Les deux échantillons ont des masses et volumes différents mais contiennent le même nombre d’entités : \(6{,}02\times10^{22}\).</li></ul>`,
    conclusion: TX`<p>La mole permet de comparer des quantités d’espèces différentes : on prélève \(n\) par pesée (\(m = nM\)) ou par mesure de volume (\(V = nM/\rho\)).</p>`,
  },
  quiz: [
    { q: TX`\(M(\text{CO}_2)\) avec C = 12 et O = 16 :`, o: ['28 g/mol', '44 g/mol', '40 g/mol', '32 g/mol'], r: 1, e: TX`\(12 + 2\times16 = 44\).` },
    { q: TX`Quantité de matière dans 9 g d’eau :`, o: ['0,5 mol', '2 mol', '162 mol', '9 mol'], r: 0, e: TX`\(9/18 = 0{,}5\ \text{mol}\).` },
    { q: TX`Volume de 0,25 mol de dioxygène (\(V_m = 24\ \text{L/mol}\)) :`, o: ['6 L', '96 L', '0,01 L', '24 L'], r: 0, e: TX`\(0{,}25\times24 = 6\ \text{L}\).` },
    { q: TX`Nombre de molécules dans 2 mol :`, o: [TX`\(1{,}2\times10^{24}\)`, TX`\(3{,}0\times10^{23}\)`, '2', TX`\(6{,}02\times10^{23}\)`], r: 0, e: TX`\(2\times6{,}02\times10^{23}\).` },
    { q: TX`La densité du dioxyde de carbone (\(M = 44\)) par rapport à l’air :`, o: ['0,66', '1,5', '44', '29'], r: 1, e: TX`\(44/29 \approx 1{,}5\).` },
  ],
};
