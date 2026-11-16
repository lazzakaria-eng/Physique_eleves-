/* Tronc Commun · Chimie · Classification périodique des éléments chimiques */
'use strict';
(() => {
  const EL = [['H', 1, 1, 1], ['He', 2, 1, 8], ['Li', 3, 2, 1], ['Be', 4, 2, 2], ['B', 5, 2, 3], ['C', 6, 2, 4], ['N', 7, 2, 5], ['O', 8, 2, 6], ['F', 9, 2, 7], ['Ne', 10, 2, 8],
    ['Na', 11, 3, 1], ['Mg', 12, 3, 2], ['Al', 13, 3, 3], ['Si', 14, 3, 4], ['P', 15, 3, 5], ['S', 16, 3, 6], ['Cl', 17, 3, 7], ['Ar', 18, 3, 8]];
  const col = g => g === 1 ? '#ffd27a' : g === 7 ? '#a8e6c9' : g === 8 ? '#cfe0ff' : '#eef2f8';
  const table = FIG(440, 190, EL.map(([s, z, p, g]) => `<rect x="${20 + (g - 1) * 52}" y="${12 + (p - 1) * 56}" width="48" height="50" rx="6" fill="${col(g)}" stroke="#14213d"/><text x="${44 + (g - 1) * 52}" y="${30 + (p - 1) * 56}" text-anchor="middle" font-size="10">${z}</text><text x="${44 + (g - 1) * 52}" y="${52 + (p - 1) * 56}" text-anchor="middle" font-size="17" font-weight="bold" fill="#14213d">${s}</text>`).join(''));
  CONTENU['tcc-classification'] = {
    resume: {
      intro: TX`Les éléments chimiques sont classés par <b>numéro atomique Z croissant</b> dans un tableau où chaque <b>ligne (période)</b> correspond à une couche électronique et chaque <b>colonne (groupe)</b> rassemble des éléments ayant le même nombre d’électrons externes, donc des propriétés chimiques voisines.`,
      sections: [
        { titre: '1. Historique', html: TX`<p>Mendeleïev (1869) classe les éléments connus par masse atomique croissante et regroupe ceux qui ont des propriétés semblables, en laissant des cases vides pour des éléments non encore découverts. La classification actuelle utilise le numéro atomique Z.</p>` },
        { titre: '2. Principe de la classification (18 premiers éléments)', sim: 'classification', html: TX`<ul><li><b>Période</b> \(n\) = nombre de couches électroniques occupées (K → 1, L → 2, M → 3).</li><li><b>Groupe</b> (colonne I à VIII) = nombre d’électrons de la couche externe (sauf He : 2 électrons, placé avec les gaz rares).</li></ul>` + table },
        { titre: '3. Familles chimiques', html: TX`<ul><li><b>Alcalins</b> (groupe I, sauf H) : Li, Na, K ; très réactifs, donnent des ions \(\text{M}^+\).</li><li><b>Alcalino-terreux</b> (groupe II) : Be, Mg, Ca ; ions \(\text{M}^{2+}\).</li><li><b>Halogènes</b> (groupe VII) : F, Cl, Br, I ; ions \(\text{X}^-\), forment des molécules \(\text{X}_2\).</li><li><b>Gaz rares</b> (groupe VIII) : He, Ne, Ar ; très stables, chimiquement inertes.</li></ul>` },
        { titre: '4. Utiliser la classification', html: TX`<p>Connaissant la position d’un élément, on trouve sa structure électronique, le nombre de liaisons covalentes qu’il forme (\(8 - p\)) et l’ion monoatomique qu’il donne : groupe I → \(+1\), II → \(+2\), III → \(+3\), VI → \(-2\), VII → \(-1\).</p>` },
      ],
      formules: [
        { tex: TX`\text{période} = \text{nombre de couches occupées}`, sens: 'Ligne du tableau' },
        { tex: TX`\text{groupe} = \text{nombre d’électrons externes}`, sens: 'Colonne du tableau' },
        { tex: TX`\text{I : alcalins} \quad \text{VII : halogènes} \quad \text{VIII : gaz rares}`, sens: 'Familles chimiques' },
      ],
      retenir: [
        'Classement par Z croissant.',
        'Ligne = période = nombre de couches ; colonne = groupe = électrons externes.',
        'Un même groupe = une même famille = propriétés chimiques semblables.',
        'Alcalins M⁺, alcalino-terreux M²⁺, halogènes X⁻, gaz rares inertes.',
      ],
      erreurs: [
        'Classer par masse atomique (méthode historique) au lieu de Z.',
        'Confondre période (ligne) et groupe (colonne).',
        'Placer l’hélium dans le groupe II.',
        'Oublier que l’hydrogène n’est pas un alcalin.',
      ],
    },
    experiences: {
      sims: ['classification'],
      protocole: { titre: 'Comparer les propriétés d’une famille', materiel: 'vidéos ou observations : sodium et lithium dans l’eau (avec phénolphtaléine), tests des ions halogénures au nitrate d’argent.',
        etapes: ['Observer la réaction du lithium puis du sodium avec l’eau (démonstration du professeur).', 'Ajouter quelques gouttes de nitrate d’argent à des solutions de chlorure, bromure et iodure de sodium.', 'Comparer les observations à l’intérieur de chaque famille.'] },
      observations: TX`<ul><li>Li et Na réagissent vivement avec l’eau, en dégageant du dihydrogène ; la solution devient basique (rose avec la phénolphtaléine).</li><li>Les trois halogénures donnent un précipité avec les ions argent.</li></ul>`,
      conclusion: TX`<p>Les éléments d’un même groupe ont des propriétés chimiques semblables, car ils ont le même nombre d’électrons externes.</p>`,
    },
    quiz: [
      { q: 'Le soufre (Z = 16) est dans :', o: ['la 3ᵉ période, groupe VI', 'la 2ᵉ période, groupe VI', 'la 3ᵉ période, groupe II', 'la 6ᵉ période'], r: 0, e: '(K)²(L)⁸(M)⁶.' },
      { q: 'Les éléments d’un même groupe ont le même :', o: ['nombre de couches', 'nombre d’électrons externes', 'nombre de neutrons', 'nombre de nucléons'], r: 1, e: 'D’où des propriétés semblables.' },
      { q: 'Le chlore donne l’ion :', o: ['Cl⁺', 'Cl²⁻', 'Cl⁻', 'Cl³⁺'], r: 2, e: 'Groupe VII : il gagne un électron.' },
      { q: 'Les gaz rares sont :', o: ['très réactifs', 'chimiquement inertes', 'des métaux', 'des halogènes'], r: 1, e: 'Couche externe saturée.' },
      { q: 'Un élément de la 2ᵉ période, groupe IV, est :', o: ['le silicium', 'le carbone', 'l’azote', 'le béryllium'], r: 1, e: 'C : (K)²(L)⁴.' },
    ],
  };
})();
