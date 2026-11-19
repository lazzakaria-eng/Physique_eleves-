/* Tronc Commun · Physique · Mécanique · Équilibre d’un solide en rotation autour d’un axe fixe */
'use strict';
CONTENU['tc-moment'] = {
  resume: {
    intro: TX`L’effet de rotation d’une force sur un solide mobile autour d’un axe fixe dépend de son intensité et de sa distance à l’axe : c’est le <b>moment</b> de la force. Un tel solide est en équilibre si la somme des moments est nulle.`,
    sections: [
      { titre: '1. Effet de rotation d’une force', html: TX`<ul><li>Une force dont la droite d’action <b>coupe l’axe</b> ou lui est <b>parallèle</b> n’a pas d’effet de rotation.</li><li>L’effet de rotation est d’autant plus grand que la force est intense et que sa droite d’action est loin de l’axe (on pousse une porte loin des gonds).</li></ul>` },
      { titre: '2. Moment d’une force', sim: 'moment', html: TX`<p>Le moment d’une force \(\vec F\) orthogonale à l’axe \((\Delta)\) est :</p><p style="text-align:center">\(\mathcal M_\Delta(\vec F) = \pm F\cdot d\)</p>
<p>\(d\) : distance (en m) entre l’axe et la droite d’action de \(\vec F\) (le <b>bras de levier</b>) ; unité : le N·m. Signe \(+\) si la force fait tourner dans le sens positif choisi, \(-\) sinon.</p>`
        + FIG(440, 150, ARW('mo1') + `<line x1="40" y1="80" x2="400" y2="80" stroke="#d98200" stroke-width="10" stroke-linecap="round"/><circle cx="140" cy="80" r="7" fill="#fff" stroke="#14213d" stroke-width="2"/><text x="140" y="110" text-anchor="middle">axe Δ</text>${VEC(340, 80, 340, 20, 'F', '#d93a4a', 'mo1')}<line x1="340" y1="10" x2="340" y2="140" stroke="#d93a4a" stroke-dasharray="4 3"/><path d="M140 130 H340" stroke="#1f6fe0" stroke-width="2"/><text x="240" y="146" text-anchor="middle" fill="#1f6fe0" font-weight="bold">d</text><path d="M110 50 A40 40 0 0 1 170 50" fill="none" stroke="#12946a" stroke-width="2" marker-end="url(#mo1)"/><text x="186" y="44" fill="#12946a">sens +</text>`) },
      { titre: '3. Théorème des moments', html: TX`<p>Si un solide mobile autour d’un axe fixe est en équilibre, la somme algébrique des moments des forces qu’il subit par rapport à cet axe est nulle :</p><p style="text-align:center">\(\sum \mathcal M_\Delta(\vec F_i) = 0\)</p>
<p>Conditions d’équilibre complètes : \(\sum \vec F_{ext} = \vec 0\) <b>et</b> \(\sum \mathcal M_\Delta = 0\). Exemple : balance à fléau, levier, balançoire : \(m_1\,d_1 = m_2\,d_2\).</p>` },
      { titre: '4. Couple de forces et couple de torsion', html: TX`<p>Un <b>couple</b> est formé de deux forces de même intensité \(F\), de droites d’action parallèles et de sens opposés, distantes de \(d\) : son moment est \(\mathcal M_C = F\cdot d\) (volant, tournevis, robinet).</p>
<p>Un fil métallique tordu d’un angle \(\theta\) exerce un <b>couple de torsion</b> de moment \(\mathcal M = -C\,\theta\), où \(C\) est la constante de torsion (N·m/rad).</p>` },
    ],
    formules: [
      { tex: TX`\mathcal M_\Delta(\vec F) = \pm F\cdot d`, sens: 'Moment d’une force (N·m)' },
      { tex: TX`\sum \mathcal M_\Delta(\vec F_i) = 0`, sens: 'Théorème des moments' },
      { tex: TX`\sum \vec F_{ext} = \vec 0 \ \text{ et } \ \sum \mathcal M_\Delta = 0`, sens: 'Conditions d’équilibre' },
      { tex: TX`\mathcal M_C = F\cdot d`, sens: 'Moment d’un couple' },
      { tex: TX`\mathcal M = -C\,\theta`, sens: 'Moment du couple de torsion' },
    ],
    retenir: [
      'Une force dont la droite d’action coupe l’axe (ou lui est parallèle) a un moment nul.',
      TX`Le bras de levier \(d\) est la distance de l’axe à la <b>droite d’action</b>, pas au point d’application.`,
      'Le signe du moment dépend du sens de rotation choisi comme positif.',
      'Équilibre : somme des forces nulle et somme des moments nulle.',
      'Le moment d’un couple ne dépend pas de la position de l’axe.',
    ],
    erreurs: [
      'Prendre la distance entre l’axe et le point d’application au lieu de la distance à la droite d’action.',
      'Oublier les signes des moments.',
      'Oublier le moment du poids de la barre (appliqué en son milieu si elle est homogène).',
      'Oublier que la réaction de l’axe a un moment nul.',
      TX`Garder \(d\) en cm : le moment s’exprime en N·m.`,
    ],
  },
  experiences: {
    sims: ['moment'],
    protocole: { titre: 'Vérifier le théorème des moments avec un disque mobile', materiel: 'disque (ou règle) mobile autour d’un axe horizontal, masses marquées, dynamomètre, règle.',
      etapes: [TX`Accrocher une masse \(m_1\) à la distance \(d_1\) à gauche de l’axe.`, TX`Équilibrer avec une masse \(m_2\) placée à droite et mesurer \(d_2\).`, TX`Comparer les produits \(m_1 g d_1\) et \(m_2 g d_2\).`, 'Dans la simulation, chercher plusieurs positions d’équilibre.'] },
    observations: TX`<ul><li>À l’équilibre, \(m_1 d_1 = m_2 d_2\) pour toutes les positions.</li><li>Une masse placée sur la verticale de l’axe ne fait pas tourner le disque.</li></ul>`,
    conclusion: TX`<p>À l’équilibre, la somme des moments est nulle : \(m_1 g d_1 - m_2 g d_2 = 0\). C’est le principe du levier et de la balance.</p>`,
  },
  quiz: [
    { q: 'Une force dont la droite d’action passe par l’axe de rotation a un moment :', o: ['maximal', 'nul', 'négatif', 'égal à F'], r: 1, e: TX`\(d = 0\) donc \(\mathcal M = 0\).` },
    { q: 'Une force de 20 N agit à 30 cm de l’axe (droite d’action perpendiculaire au levier). Son moment :', o: ['600 N·m', '6 N·m', '0,67 N·m', '66,7 N·m'], r: 1, e: TX`\(\mathcal M = 20\times0{,}30 = 6\ \text{N}\cdot\text{m}\).` },
    { q: 'Sur une balançoire, un enfant de 30 kg est à 2 m de l’axe. Un adulte de 60 kg doit se placer à :', o: ['4 m', '2 m', '1 m', '0,5 m'], r: 2, e: TX`\(30\times2 = 60\times d \Rightarrow d = 1\ \text{m}\).` },
    { q: 'Pour desserrer un écrou plus facilement, on utilise une clé :', o: ['plus courte', 'plus longue', 'plus lourde', 'de même longueur'], r: 1, e: 'Un bras de levier plus grand donne un moment plus grand pour la même force.' },
    { q: 'Le moment d’un couple de forces (F, d) vaut :', o: ['2F·d', 'F·d', 'F/d', '0'], r: 1, e: TX`\(\mathcal M_C = F\cdot d\).` },
  ],
};
