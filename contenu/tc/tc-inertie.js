/* Tronc Commun · Physique · Mécanique · Principe d’inertie */
'use strict';
CONTENU['tc-inertie'] = {
  resume: {
    intro: TX`Un corps qui n’est soumis à aucune force, ou à des forces qui se compensent, ne change pas son mouvement : il reste immobile ou garde un mouvement rectiligne uniforme. C’est le <b>principe d’inertie</b>.`,
    sections: [
      { titre: '1. Système isolé, pseudo-isolé', html: TX`<p>Un système est <b>isolé</b> s’il n’est soumis à aucune force (cas idéal). Il est <b>pseudo-isolé</b> si les forces qu’il subit se compensent : \(\sum \vec F_{ext} = \vec 0\). Exemple : un palet sur une table à coussin d’air horizontale (poids et action de l’air se compensent).</p>` },
      { titre: '2. Le centre d’inertie', html: TX`<p>Quand on lance un solide pseudo-isolé (palet, haltère) sur une table horizontale, un seul de ses points a toujours un mouvement <b>rectiligne uniforme</b> : c’est le <b>centre d’inertie</b> G. Les autres points ont des trajectoires plus compliquées (ils tournent autour de G).</p>`
        + FIG(500, 130, `<line x1="20" y1="110" x2="480" y2="20" stroke="#9aa6bf" stroke-dasharray="5 4"/>${[0, 1, 2, 3, 4, 5].map(k => { const x = 40 + k * 84, y = 106 - k * 16.4, a = k * 0.9; return `<line x1="${x - 22 * Math.cos(a)}" y1="${y - 22 * Math.sin(a)}" x2="${x + 22 * Math.cos(a)}" y2="${y + 22 * Math.sin(a)}" stroke="#5b6577" stroke-width="2"/><circle cx="${x - 22 * Math.cos(a)}" cy="${y - 22 * Math.sin(a)}" r="6" fill="#1f6fe0"/><circle cx="${x + 22 * Math.cos(a)}" cy="${y + 22 * Math.sin(a)}" r="4" fill="#d98200"/><circle cx="${x}" cy="${y}" r="3.5" fill="#d93a4a"/>`; }).join('')}<text x="300" y="120" fill="#d93a4a" font-weight="bold">G : trajectoire rectiligne, points équidistants</text>`)
        + TX`<p>Pour deux masses \(m_1\) (en \(G_1\)) et \(m_2\) (en \(G_2\)) : \(\overrightarrow{OG} = \dfrac{m_1\,\overrightarrow{OG_1} + m_2\,\overrightarrow{OG_2}}{m_1 + m_2}\) : G est sur le segment \([G_1G_2]\), plus près de la masse la plus grande. Le centre d’inertie est confondu avec le <b>centre de gravité</b>.</p>` },
      { titre: '3. Le principe d’inertie', sim: 'inertie', html: TX`<p><b>Énoncé.</b> Dans un référentiel galiléen, si un solide est isolé ou pseudo-isolé, son centre d’inertie G est soit <b>au repos</b>, soit en <b>mouvement rectiligne uniforme</b>. Et réciproquement :</p>
<p style="text-align:center">\(\sum \vec F_{ext} = \vec 0 \iff \vec v_G = \overrightarrow{\text{constante}}\)</p>
<p>Le référentiel terrestre est considéré comme galiléen pour des expériences de courte durée.</p>` },
      { titre: '4. Conséquences', sim: 'newton', html: TX`<ul><li>Si la vitesse de G change (en valeur ou en direction), les forces <b>ne se compensent pas</b>.</li><li>Dans un bus qui freine, le passager continue vers l’avant : son corps « garde » sa vitesse (d’où la ceinture de sécurité).</li><li>Une voiture qui roule à vitesse constante sur une route droite est pseudo-isolée : la force motrice compense les frottements.</li></ul>` },
    ],
    formules: [
      { tex: TX`\sum \vec F_{ext} = \vec 0 \iff \vec v_G = \overrightarrow{\text{constante}}`, sens: 'Principe d’inertie' },
      { tex: TX`\overrightarrow{OG} = \dfrac{m_1\,\overrightarrow{OG_1} + m_2\,\overrightarrow{OG_2}}{m_1 + m_2}`, sens: 'Position du centre d’inertie (barycentre)' },
      { tex: TX`m_1\,\overrightarrow{GG_1} + m_2\,\overrightarrow{GG_2} = \vec 0`, sens: 'Relation barycentrique' },
    ],
    retenir: [
      'Pseudo-isolé : les forces extérieures se compensent.',
      'Le centre d’inertie G d’un solide pseudo-isolé est immobile ou en mouvement rectiligne uniforme.',
      'Les autres points du solide peuvent tourner autour de G.',
      'G est plus proche de la masse la plus grande.',
      'Si la vitesse de G change, les forces extérieures ne se compensent pas.',
    ],
    erreurs: [
      'Croire qu’un mouvement a besoin d’une force pour continuer : sans frottement, il continue seul.',
      'Penser qu’un corps immobile n’est soumis à aucune force : les forces peuvent se compenser.',
      'Appliquer le principe à un point quelconque du solide au lieu du centre d’inertie.',
      'Croire qu’un mouvement circulaire uniforme vérifie le principe d’inertie : la direction de la vitesse change.',
      TX`Placer G au milieu de \([G_1G_2]\) alors que les masses sont différentes.`,
    ],
  },
  experiences: {
    sims: ['inertie', 'newton'],
    protocole: { titre: 'Enregistrer le mouvement d’un autoporteur pseudo-isolé', materiel: 'table à coussin d’air horizontale, autoporteur portant deux éclateurs (au centre et au bord), feuille d’enregistrement.',
      etapes: ['Régler la table bien horizontale.', 'Lancer l’autoporteur en le faisant tourner sur lui-même.', 'Observer les deux enregistrements : celui du centre et celui du bord.', 'Dans la simulation « inertie », mettre le frottement à zéro puis l’augmenter.'] },
    observations: TX`<ul><li>Les points du centre sont alignés et équidistants ; ceux du bord forment une courbe.</li><li>Sans frottement, le mobile garde sa vitesse ; avec frottement, il ralentit puis s’arrête.</li></ul>`,
    conclusion: TX`<p>Pour un solide pseudo-isolé, seul le centre d’inertie a un mouvement rectiligne uniforme : c’est le principe d’inertie. Un ralentissement prouve l’existence d’une force non compensée (le frottement).</p>`,
  },
  quiz: [
    { q: 'Un palet glisse sur une table à coussin d’air horizontale. Il est :', o: ['isolé', 'pseudo-isolé', 'soumis à une force motrice', 'en mouvement accéléré'], r: 1, e: 'Le poids et l’action de l’air se compensent.' },
    { q: 'Le centre d’inertie d’un solide pseudo-isolé a un mouvement :', o: ['circulaire uniforme', 'rectiligne accéléré', 'rectiligne uniforme ou nul', 'quelconque'], r: 2, e: 'C’est le principe d’inertie.' },
    { q: 'Une voiture roule à vitesse constante dans un virage. Les forces qu’elle subit :', o: ['se compensent', 'ne se compensent pas', 'sont nulles', 'sont toutes verticales'], r: 1, e: 'La direction de la vitesse change : le vecteur vitesse n’est pas constant.' },
    { q: TX`\(m_1 = 3\ \text{kg}\) en \(G_1\), \(m_2 = 1\ \text{kg}\) en \(G_2\), \(G_1G_2 = 40\ \text{cm}\). Distance \(G_1G\) :`, o: ['10 cm', '20 cm', '30 cm', '13 cm'], r: 0, e: TX`\(G_1G = \dfrac{m_2}{m_1 + m_2}\,G_1G_2 = \dfrac{1}{4}\times40 = 10\ \text{cm}\).` },
    { q: 'Dans un bus qui freine brusquement, un passager debout est projeté :', o: ['vers l’arrière', 'vers l’avant', 'vers le haut', 'il ne bouge pas'], r: 1, e: 'Par inertie, son corps tend à garder sa vitesse.' },
  ],
};
