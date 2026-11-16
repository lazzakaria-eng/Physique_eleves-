/* Tronc Commun · Chimie · Modèle de l’atome */
'use strict';
CONTENU['tcc-atome'] = {
  resume: {
    intro: TX`L’atome est formé d’un <b>noyau</b> très petit, chargé positivement (protons et neutrons), autour duquel se déplacent des <b>électrons</b> chargés négativement. Il est <b>électriquement neutre</b> et presque toute sa masse est dans le noyau.`,
    sections: [
      { titre: '1. Constitution de l’atome', sim: 'atome', html: TX`<p>Particules : proton (\(+e\), \(m_p = 1{,}673\times10^{-27}\ \text{kg}\)), neutron (charge nulle, \(m_n \approx m_p\)), électron (\(-e\), \(m_e = 9{,}1\times10^{-31}\ \text{kg}\), environ 1836 fois plus léger). \(e = 1{,}6\times10^{-19}\ \text{C}\).</p>
<p>Le noyau est noté \({}^{A}_{Z}\text{X}\) : \(Z\) protons (numéro atomique), \(A\) nucléons, \(N = A - Z\) neutrons. L’atome neutre a \(Z\) électrons.</p>` },
      { titre: '2. Dimensions et masse', html: TX`<p>Rayon de l’atome \(\approx 10^{-10}\ \text{m}\) ; rayon du noyau \(\approx 10^{-15}\ \text{m}\) : le rapport est d’environ \(10^{5}\). La matière est essentiellement <b>vide</b> (structure lacunaire). Masse de l’atome : \(m_{atome} \approx A\cdot m_p\) (les électrons sont négligeables).</p>` },
      { titre: '3. Élément chimique, isotopes, ions', html: TX`<p>Un <b>élément chimique</b> est caractérisé par son numéro atomique \(Z\) (ex. tous les atomes et ions de cuivre ont \(Z = 29\)). Les <b>isotopes</b> ont le même \(Z\) mais des \(A\) différents. Un <b>ion</b> est un atome qui a gagné (anion) ou perdu (cation) des électrons : \(\text{Na}^+\), \(\text{Cl}^-\). L’élément se conserve au cours des transformations chimiques.</p>` },
      { titre: '4. Répartition électronique', html: TX`<p>Les électrons se répartissent en couches K, L, M… contenant au maximum 2, 8, 8 (pour les 18 premiers éléments) électrons. On remplit K, puis L, puis M. La dernière couche occupée est la <b>couche externe</b>.</p>`
        + FIG(420, 150, `<circle cx="90" cy="75" r="9" fill="#d93a4a"/><text x="90" y="79" text-anchor="middle" fill="#fff" font-size="9">8+</text><circle cx="90" cy="75" r="30" fill="none" stroke="#5b6577"/><circle cx="90" cy="75" r="55" fill="none" stroke="#5b6577"/>${[0, 180].map(a => `<circle cx="${90 + 30 * Math.cos(a * Math.PI / 180)}" cy="${75 + 30 * Math.sin(a * Math.PI / 180)}" r="4" fill="#1f6fe0"/>`).join('')}${[0, 60, 120, 180, 240, 300].map(a => `<circle cx="${90 + 55 * Math.cos(a * Math.PI / 180)}" cy="${75 + 55 * Math.sin(a * Math.PI / 180)}" r="4" fill="#1f6fe0"/>`).join('')}<text x="180" y="60">Oxygène O (Z = 8)</text><text x="180" y="84">structure : (K)² (L)⁶</text><text x="180" y="108">6 électrons externes</text>`) },
    ],
    formules: [
      { tex: TX`A = Z + N`, sens: 'Nombre de nucléons' },
      { tex: TX`q_{noyau} = +Z\cdot e`, sens: 'Charge du noyau' },
      { tex: TX`m_{atome} \approx A\cdot m_p`, sens: 'Masse approchée d’un atome' },
      { tex: TX`\dfrac{r_{atome}}{r_{noyau}} \approx 10^{5}`, sens: 'Structure lacunaire' },
      { tex: TX`\text{K} : 2 \quad \text{L} : 8 \quad \text{M} : 8`, sens: 'Remplissage maximal des couches (Z ≤ 18)' },
    ],
    retenir: [
      'Noyau : Z protons et A − Z neutrons ; Z électrons autour.',
      'L’atome est neutre ; sa masse est concentrée dans le noyau.',
      'La matière est lacunaire : le noyau est 100 000 fois plus petit que l’atome.',
      'Isotopes : même Z, A différents. Un élément est défini par Z.',
      'Remplissage : K (2), L (8), M (8).',
    ],
    erreurs: [
      'Confondre A (nucléons) et Z (protons).',
      'Oublier de modifier le nombre d’électrons pour un ion (Mg²⁺ a 10 électrons).',
      'Placer 8 électrons sur la couche K.',
      'Croire que des isotopes sont des éléments différents.',
    ],
  },
  experiences: {
    sims: ['atome'],
    protocole: { titre: 'Construire des atomes et des ions', materiel: 'simulation « atome » (ajout de protons, neutrons, électrons).',
      etapes: ['Construire l’atome de carbone 12 : 6 protons, 6 neutrons, 6 électrons.', 'Ajouter 2 neutrons : quel isotope obtient-on ?', 'Retirer un électron à l’atome de sodium : quel ion obtient-on ?', 'Donner la structure électronique de chaque atome construit.'] },
    observations: TX`<ul><li>Changer le nombre de neutrons ne change pas l’élément.</li><li>Changer le nombre de protons change l’élément.</li><li>Un déséquilibre protons / électrons donne une charge (ion).</li></ul>`,
    conclusion: TX`<p>L’élément est fixé par \(Z\) ; \(A\) distingue les isotopes ; le nombre d’électrons fixe la charge.</p>`,
  },
  quiz: [
    { q: TX`L’atome \({}^{27}_{13}\text{Al}\) contient :`, o: ['13 protons, 14 neutrons, 13 électrons', '27 protons', '13 protons, 27 neutrons', '14 protons, 13 neutrons'], r: 0, e: TX`\(N = 27 - 13 = 14\).` },
    { q: 'La structure électronique du chlore (Z = 17) :', o: ['(K)²(L)⁸(M)⁷', '(K)²(L)⁷(M)⁸', '(K)⁸(L)⁸(M)¹', '(K)²(L)¹⁵'], r: 0, e: '2 + 8 + 7 = 17.' },
    { q: 'L’ion Mg²⁺ (Z = 12) possède :', o: ['12 électrons', '14 électrons', '10 électrons', '2 électrons'], r: 2, e: 'Il a perdu 2 électrons.' },
    { q: 'Deux isotopes ont :', o: ['même A', 'même Z', 'même nombre de neutrons', 'des Z différents'], r: 1, e: 'Même élément.' },
    { q: 'La masse d’un atome est concentrée :', o: ['dans les électrons', 'dans le noyau', 'également partout', 'dans le vide'], r: 1, e: 'Les nucléons sont 1836 fois plus lourds que les électrons.' },
  ],
};
