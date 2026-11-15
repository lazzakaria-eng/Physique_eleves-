/* Séries complètes : au moins 7 exercices illustrés, du plus facile au plus difficile.
   Elles remplacent les séries courtes des mêmes chapitres. Champ « fig » : figure en SVG. */
'use strict';
const SVG = (w, h, body) => `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" font-family="Arial, sans-serif" font-size="13">${body}</svg>`;
const ptsRow = (x0, y, d, n, lab) => Array.from({ length: n }, (_, i) => {
  const x = x0 + d[i];
  return `<circle cx="${x}" cy="${y}" r="3.5" fill="#1f3a6b"/><text x="${x}" y="${y - 10}" text-anchor="middle" font-size="12">M<tspan baseline-shift="sub" font-size="9">${i}</tspan></text>`;
}).join('') + (lab || '');

Object.assign(EXOS, {
  'tc-mouvement': [
    { d: 1, t: 'Qui bouge ?', fig: SVG(520, 150, `
      <rect x="0" y="120" width="520" height="30" fill="#d9d4c7"/><line x1="0" y1="120" x2="520" y2="120" stroke="#333" stroke-width="2"/>
      <rect x="150" y="40" width="250" height="70" rx="8" fill="#2e75b6" stroke="#14213d" stroke-width="2"/>
      ${[0, 1, 2, 3].map(k => `<rect x="${165 + k * 58}" y="52" width="42" height="26" fill="#dcebf8"/>`).join('')}
      <circle cx="190" cy="117" r="9" fill="#14213d"/><circle cx="360" cy="117" r="9" fill="#14213d"/>
      <circle cx="232" cy="62" r="6" fill="#ffd27a" stroke="#14213d"/><text x="232" y="98" text-anchor="middle" font-weight="bold" fill="#fff">A</text>
      <circle cx="320" cy="62" r="6" fill="#ffd27a" stroke="#14213d"/><text x="320" y="98" text-anchor="middle" font-weight="bold" fill="#fff">B</text>
      <path d="M330 70 h28" stroke="#d93a4a" stroke-width="2.5" marker-end="url(#ar1)"/>
      <circle cx="60" cy="80" r="8" fill="none" stroke="#14213d" stroke-width="2"/><path d="M60 88v18M60 106l-7 13M60 106l7 13M50 95h20" stroke="#14213d" stroke-width="2"/>
      <text x="60" y="62" text-anchor="middle" font-weight="bold">C</text>
      <path d="M410 75 h60" stroke="#14213d" stroke-width="2.5" marker-end="url(#ar1)"/><text x="440" y="66" text-anchor="middle">sens du train</text>
      <defs><marker id="ar1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#14213d"/></marker></defs>`),
      q: TX`Un train roule sur une voie droite. Le voyageur A est assis ; le voyageur B marche vers l’avant du train ; la personne C est debout sur le quai.<br>1) A est-il en mouvement ou au repos par rapport au train ? par rapport au quai ?<br>2) B est-il en mouvement par rapport au train ? par rapport à A ?<br>3) Par rapport à A, la personne C est-elle immobile ? Justifier.<br>4) Que doit-on toujours préciser pour décrire un mouvement ?`,
      s: TX`1) A est au repos par rapport au train (sa position dans le train ne change pas) et en mouvement par rapport au quai.<br>2) B est en mouvement par rapport au train et par rapport à A (sa distance à A change).<br>3) Non : par rapport à A (donc au train), C se déplace vers l’arrière.<br>4) Le référentiel : le mouvement est relatif.` },
    { d: 1, t: 'La valve d’une roue', fig: SVG(520, 160, `
      <line x1="0" y1="140" x2="520" y2="140" stroke="#333" stroke-width="2"/>
      <circle cx="110" cy="90" r="50" fill="none" stroke="#14213d" stroke-width="3"/><circle cx="110" cy="90" r="4" fill="#14213d"/>
      <circle cx="110" cy="40" r="5" fill="#d93a4a"/><text x="122" y="36">V</text>
      <text x="110" y="158" text-anchor="middle">la roue</text>
      <path d="M260 140 C 270 60, 330 60, 340 140 C 350 60, 410 60, 420 140" fill="none" stroke="#d93a4a" stroke-width="2.5" stroke-dasharray="5 4"/>
      <text x="340" y="30" text-anchor="middle">courbe (2)</text>
      <circle cx="470" cy="90" r="38" fill="none" stroke="#2e75b6" stroke-width="2.5" stroke-dasharray="5 4"/><text x="470" y="30" text-anchor="middle">courbe (1)</text>`),
      q: TX`Un cycliste roule en ligne droite. On s’intéresse à la valve V de la roue avant.<br>1) Quelle est la trajectoire de V dans le référentiel lié au cadre du vélo ?<br>2) Quelle est sa trajectoire dans le référentiel lié à la route ?<br>3) Associer chaque référentiel à la courbe (1) ou (2) de la figure. Que peut-on conclure ?<br>4) Quelle est la trajectoire du centre de la roue par rapport à la route ?`,
      s: TX`1) Un cercle (courbe 1) : V tourne autour de l’axe de la roue.<br>2) Une courbe formée d’arches (cycloïde) : courbe 2.<br>3) Cadre → (1) ; route → (2). La trajectoire d’un même point dépend du référentiel.<br>4) Une droite parallèle à la route : mouvement rectiligne.` },
    { d: 2, t: 'Enregistrement d’un autoporteur', fig: SVG(540, 70, ptsRow(20, 40, [0, 60, 120, 180, 240, 300, 360, 420, 480], 9,
      `<line x1="20" y1="58" x2="80" y2="58" stroke="#d93a4a" stroke-width="2"/><text x="50" y="70" text-anchor="middle" fill="#d93a4a" font-size="11">1,2 cm</text>`)),
      q: TX`On enregistre les positions successives d’un point M d’un autoporteur sur une table horizontale, à intervalles de temps \(\tau = 40\ \text{ms}\). La distance entre deux points successifs est constante : 1,2 cm (échelle 1).<br>1) Quelle est la nature de la trajectoire ?<br>2) Calculer la vitesse moyenne entre \(M_0\) et \(M_8\).<br>3) Calculer les vitesses instantanées \(v_3\) et \(v_6\). Conclure sur la nature du mouvement.<br>4) Représenter \(\vec v_3\) avec l’échelle 1 cm ↔ 0,1 m/s.`,
      s: TX`1) Les points sont alignés : trajectoire rectiligne.<br>2) \(M_0M_8 = 8\times1{,}2 = 9{,}6\ \text{cm}\) parcourus en \(8\tau = 0{,}32\ \text{s}\) : \(v_m = 0{,}30\ \text{m/s}\).<br>3) \(v_3 = \dfrac{M_2M_4}{2\tau} = \dfrac{2{,}4\times10^{-2}}{0{,}08} = 0{,}30\ \text{m/s}\) ; de même \(v_6 = 0{,}30\ \text{m/s}\) : mouvement rectiligne uniforme.<br>4) Flèche d’origine \(M_3\), dans le sens du mouvement, de longueur 3 cm.` },
    { d: 2, t: 'Mouvement accéléré', fig: SVG(540, 70, ptsRow(20, 40, [0, 25, 75, 150, 250, 375], 6, '')),
      q: TX`Un enregistrement réalisé avec \(\tau = 20\ \text{ms}\) donne : \(M_0M_1 = 0{,}5\ \text{cm}\), \(M_1M_2 = 1{,}0\ \text{cm}\), \(M_2M_3 = 1{,}5\ \text{cm}\), \(M_3M_4 = 2{,}0\ \text{cm}\), \(M_4M_5 = 2{,}5\ \text{cm}\).<br>1) Comment évoluent les distances parcourues pendant chaque intervalle ? Qu’en déduire ?<br>2) Calculer \(v_1\), \(v_2\), \(v_3\) et \(v_4\).<br>3) Calculer la variation \(\Delta v\) entre deux points successifs. Que remarque-t-on ?`,
      s: TX`1) Elles augmentent : la vitesse augmente, le mouvement est accéléré.<br>2) \(v_1 = \dfrac{(0{,}5 + 1{,}0)\times10^{-2}}{0{,}04} = 0{,}375\ \text{m/s}\) ; \(v_2 = 0{,}625\ \text{m/s}\) ; \(v_3 = 0{,}875\ \text{m/s}\) ; \(v_4 = 1{,}125\ \text{m/s}\).<br>3) \(\Delta v = 0{,}25\ \text{m/s}\) à chaque intervalle : la vitesse augmente régulièrement (mouvement uniformément accéléré).` },
    { d: 2, t: 'Exploiter la courbe x(t)', fig: SVG(360, 230, `
      <g stroke="#dfe6f2">${[0, 1, 2, 3, 4, 5].map(k => `<line x1="${50 + k * 55}" y1="20" x2="${50 + k * 55}" y2="190"/>`).join('')}${[0, 1, 2, 3, 4, 5, 6].map(k => `<line x1="50" y1="${190 - k * 28}" x2="325" y2="${190 - k * 28}"/>`).join('')}</g>
      <line x1="50" y1="190" x2="335" y2="190" stroke="#14213d" stroke-width="1.5"/><line x1="50" y1="190" x2="50" y2="12" stroke="#14213d" stroke-width="1.5"/>
      ${[0, 1, 2, 3, 4, 5].map(k => `<text x="${50 + k * 55}" y="206" text-anchor="middle" font-size="11">${k}</text>`).join('')}
      ${[0, 2, 4, 6, 8, 10, 12].map((v, k) => `<text x="42" y="${194 - k * 28}" text-anchor="end" font-size="11">${v}</text>`).join('')}
      <line x1="50" y1="162" x2="325" y2="22" stroke="#2e75b6" stroke-width="3"/>
      <text x="335" y="206" font-size="12">t (s)</text><text x="54" y="12" font-size="12">x (m)</text>`),
      q: TX`La courbe donne l’abscisse \(x\) d’un mobile en mouvement rectiligne en fonction du temps.<br>1) Quelle est la nature du mouvement ? Justifier.<br>2) Déterminer graphiquement \(x_0\) et la vitesse \(v\).<br>3) Écrire l’équation horaire \(x(t)\).<br>4) Calculer la position à \(t = 7\ \text{s}\) et la date à laquelle le mobile passe par \(x = 20\ \text{m}\).`,
      s: TX`1) \(x(t)\) est une droite : la vitesse est constante, mouvement rectiligne uniforme.<br>2) \(x_0 = 2\ \text{m}\) ; \(v = \dfrac{12 - 2}{5 - 0} = 2\ \text{m/s}\).<br>3) \(x(t) = 2t + 2\) (m, s).<br>4) \(x(7) = 16\ \text{m}\) ; \(20 = 2t + 2 \Rightarrow t = 9\ \text{s}\).` },
    { d: 3, t: 'Deux voitures sur une route', fig: SVG(540, 110, `
      <rect x="0" y="40" width="540" height="40" fill="#cfd4da"/><line x1="0" y1="60" x2="540" y2="60" stroke="#fff" stroke-dasharray="14 10" stroke-width="2"/>
      <rect x="30" y="44" width="50" height="14" rx="4" fill="#2e75b6"/><text x="55" y="34" text-anchor="middle" font-weight="bold">A</text>
      <rect x="450" y="62" width="50" height="14" rx="4" fill="#d93a4a"/><text x="512" y="74" font-weight="bold">B</text>
      <path d="M85 51 h40" stroke="#2e75b6" stroke-width="2.5" marker-end="url(#ar2)"/><path d="M445 69 h-40" stroke="#d93a4a" stroke-width="2.5" marker-end="url(#ar2)"/>
      <line x1="30" y1="92" x2="500" y2="92" stroke="#14213d"/><text x="30" y="106" font-size="11">O (x = 0)</text><text x="500" y="106" text-anchor="end" font-size="11">x = 600 m</text>
      <defs><marker id="ar2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#14213d"/></marker></defs>`),
      q: TX`À \(t = 0\), la voiture A passe en O (\(x = 0\)) à 72 km/h et la voiture B passe en \(x = 600\ \text{m}\) à 36 km/h, en sens inverse. Les deux mouvements sont rectilignes uniformes ; l’axe est orienté de A vers B.<br>1) Exprimer les vitesses en m/s et écrire les équations horaires \(x_A(t)\) et \(x_B(t)\).<br>2) Déterminer la date et la position de leur rencontre.<br>3) Quelle est la vitesse de B par rapport à A ?<br>4) Si B roulait dans le même sens que A (départ à 600 m), A le rattraperait-il ? Où et quand ?`,
      s: TX`1) \(v_A = 20\ \text{m/s}\), \(v_B = 10\ \text{m/s}\) ; \(x_A = 20t\) ; \(x_B = 600 - 10t\).<br>2) \(20t = 600 - 10t \Rightarrow t = 20\ \text{s}\) ; \(x = 400\ \text{m}\).<br>3) Les deux voitures se rapprochent de \(20 + 10 = 30\ \text{m/s}\) : dans le référentiel de A, B arrive à 30 m/s.<br>4) \(x_B = 600 + 10t\) ; \(20t = 600 + 10t \Rightarrow t = 60\ \text{s}\), \(x = 1200\ \text{m}\).` },
    { d: 3, t: 'Point d’un disque en rotation', fig: SVG(260, 240, `
      <circle cx="120" cy="120" r="95" fill="#f4f7fc" stroke="#14213d" stroke-width="2"/><circle cx="120" cy="120" r="4" fill="#14213d"/><text x="108" y="138">O</text>
      ${[0, 1, 2, 3, 4, 5, 6].map(k => { const a = -k * Math.PI / 10; const x = 120 + 95 * Math.cos(a), y = 120 + 95 * Math.sin(a); return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="#d93a4a"/><text x="${(120 + 112 * Math.cos(a)).toFixed(1)}" y="${(124 + 112 * Math.sin(a)).toFixed(1)}" text-anchor="middle" font-size="11">M${k}</text>`; }).join('')}
      <line x1="120" y1="120" x2="215" y2="120" stroke="#14213d" stroke-dasharray="4 3"/><line x1="120" y1="120" x2="210.4" y2="90.6" stroke="#14213d" stroke-dasharray="4 3"/><text x="170" y="114" font-size="11">18°</text>`),
      q: TX`Un disque de rayon \(R = 12\ \text{cm}\) tourne autour d’un axe fixe passant par son centre O. On enregistre les positions d’un point M du bord toutes les \(\tau = 50\ \text{ms}\) : l’angle entre deux positions successives vaut 18°.<br>1) Quelle est la nature du mouvement de M ? Justifier.<br>2) Calculer la vitesse angulaire \(\omega\) en rad/s.<br>3) Calculer la période \(T\), la fréquence \(f\) et la vitesse \(v\) de M.<br>4) Un point N est situé à 6 cm de O. Comparer sa vitesse angulaire et sa vitesse à celles de M.`,
      s: TX`1) Trajectoire circulaire et angles égaux pendant des durées égales : mouvement circulaire uniforme.<br>2) \(18^\circ = \dfrac{\pi}{10}\ \text{rad}\) : \(\omega = \dfrac{\pi/10}{0{,}05} = 2\pi \approx 6{,}28\ \text{rad/s}\).<br>3) \(T = \dfrac{2\pi}{\omega} = 1\ \text{s}\) ; \(f = 1\ \text{Hz}\) ; \(v = R\omega \approx 0{,}75\ \text{m/s}\).<br>4) Même vitesse angulaire (solide), vitesse deux fois plus petite : \(v_N \approx 0{,}38\ \text{m/s}\).` },
  ],
  'tcc-extraction': [
    { d: 1, t: 'L’ampoule à décanter', fig: SVG(300, 260, `
      <path d="M136 20 v28 C 70 90, 80 170, 144 214 l3 18 h6 l3 -18 C 220 170, 230 90, 164 48 v-28 z" fill="#f4f7fc" stroke="#14213d" stroke-width="2.5"/>
      <path d="M96 110 C 110 105, 190 105, 204 110 C 214 140, 205 170, 190 182 L 110 182 C 95 170, 86 140, 96 110 z" fill="#a64ca6" opacity=".85"/>
      <path d="M110 182 L190 182 C 175 198, 160 210, 150 214 C 140 210, 125 198, 110 182 z" fill="#9cc6ea"/>
      <rect x="132" y="8" width="36" height="12" fill="#5b6577"/><rect x="128" y="232" width="44" height="8" fill="#14213d"/>
      <text x="230" y="150" font-weight="bold">(1)</text><line x1="206" y1="146" x2="226" y2="146" stroke="#14213d"/>
      <text x="230" y="200" font-weight="bold">(2)</text><line x1="168" y1="196" x2="226" y2="196" stroke="#14213d"/>
      <text x="175" y="18" font-weight="bold">(3)</text><text x="180" y="244" font-weight="bold">(4)</text>`),
      q: TX`On extrait le diiode d’une eau iodée avec du cyclohexane (\(d = 0{,}78\)). La figure montre l’ampoule après décantation.<br>1) Nommer les éléments (3) et (4).<br>2) Identifier les phases (1) et (2). Justifier.<br>3) Pourquoi la phase (1) est-elle violette ?<br>4) Pourquoi faut-il dégazer pendant l’agitation ?`,
      s: TX`1) (3) bouchon ; (4) robinet.<br>2) La phase la moins dense surnage : (1) phase organique (cyclohexane, \(d = 0{,}78\)), (2) phase aqueuse (\(d = 1\)).<br>3) Le diiode, plus soluble dans le cyclohexane que dans l’eau, y est passé ; il donne une couleur violette.<br>4) La pression augmente dans l’ampoule (vapeurs du solvant) : on l’évacue pour éviter que le bouchon saute.` },
    { d: 1, t: 'Choisir le solvant extracteur', fig: '',
      q: TX`<table class="tab"><tr><th></th><th>eau</th><th>éthanol</th><th>cyclohexane</th><th>dichlorométhane</th></tr><tr><td>solubilité du diiode</td><td>faible</td><td>grande</td><td>grande</td><td>grande</td></tr><tr><td>miscibilité avec l’eau</td><td>—</td><td>totale</td><td>nulle</td><td>nulle</td></tr><tr><td>densité</td><td>1</td><td>0,79</td><td>0,78</td><td>1,33</td></tr><tr><td>danger</td><td>—</td><td>inflammable</td><td>inflammable, nocif</td><td>toxique</td></tr></table>1) Pourquoi l’éthanol ne convient-il pas ?<br>2) Quels solvants conviennent ? Lequel choisir de préférence ?<br>3) Dans chaque cas, préciser la position de la phase organique dans l’ampoule.`,
      s: TX`1) Il est miscible à l’eau : on n’obtiendrait qu’une seule phase, impossible à séparer.<br>2) Le cyclohexane et le dichlorométhane (diiode très soluble, non miscibles à l’eau) ; on préfère le cyclohexane, moins dangereux que le dichlorométhane toxique.<br>3) Cyclohexane (\(d = 0{,}78 < 1\)) : phase organique en haut ; dichlorométhane (\(d = 1{,}33 > 1\)) : en bas.` },
    { d: 2, t: 'Remettre le protocole dans l’ordre', fig: '',
      q: TX`Pour extraire le limonène des écorces d’orange, on dispose des étapes suivantes, données dans le désordre :<br>a) laisser décanter ; b) verser le distillat dans l’ampoule et ajouter 10 mL de cyclohexane ; c) récupérer la phase organique dans un bécher sec ; d) boucher et agiter en dégazant ; e) éliminer la phase aqueuse par le robinet ; f) ajouter du sulfate de magnésium anhydre puis filtrer.<br>1) Remettre les étapes dans l’ordre.<br>2) Quel est le rôle du sulfate de magnésium anhydre ?<br>3) Le limonène a une densité de 0,84 et le cyclohexane 0,78 : où se trouve la phase contenant le limonène ?`,
      s: TX`1) b → d → a → e → c → f.<br>2) Il élimine les traces d’eau de la phase organique (desséchant).<br>3) La phase organique (cyclohexane + limonène) est moins dense que l’eau : elle est en haut.` },
    { d: 2, t: 'Le montage d’hydrodistillation', fig: SVG(520, 270, `
      <rect x="40" y="215" width="140" height="35" fill="#5b6577"/><text x="110" y="238" text-anchor="middle" fill="#fff" font-size="12">(1)</text>
      <circle cx="110" cy="170" r="48" fill="#d6e8f7" stroke="#14213d" stroke-width="2.5"/><path d="M64 175 h92 a48 48 0 0 1 -92 0z" fill="#7fb8e6"/>
      <text x="110" y="196" text-anchor="middle" font-size="12">(2)</text>
      <path d="M100 124 v-40 h90 M120 124 v-30 h70" fill="none" stroke="#14213d" stroke-width="2"/>
      <g transform="translate(190 89) rotate(23)"><rect x="0" y="-16" width="280" height="32" fill="#cfe6fb" stroke="#14213d" stroke-width="2"/><rect x="-10" y="-5" width="300" height="10" fill="#f4f8fd" stroke="#14213d"/></g>
      <text x="330" y="118" font-size="12">(3)</text>
      <path d="M440 236 l-14 -12" stroke="#2e75b6" stroke-width="2"/><text x="444" y="248" font-size="12" fill="#2e75b6">(5)</text>
      <path d="M206 60 l-10 -14" stroke="#2e75b6" stroke-width="2"/><text x="180" y="40" font-size="12" fill="#2e75b6">(6)</text>
      <path d="M440 210 v52 h50 v-52" fill="none" stroke="#14213d" stroke-width="2"/><rect x="441" y="242" width="48" height="19" fill="#b9d7f0"/><rect x="441" y="236" width="48" height="6" fill="#f2c94c"/>
      <text x="498" y="252" font-size="12">(4)</text>`),
      q: TX`La figure représente un montage d’hydrodistillation de la lavande.<br>1) Nommer les éléments numérotés de (1) à (4).<br>2) Parmi (5) et (6), où l’eau froide entre-t-elle dans le réfrigérant ? Pourquoi dans ce sens ?<br>3) Quel est le rôle du réfrigérant ?<br>4) Le distillat contient deux phases. Laquelle est l’huile essentielle (\(d = 0{,}88\)) ? Justifier.`,
      s: TX`1) (1) chauffe-ballon ; (2) ballon (eau + lavande) ; (3) réfrigérant à eau ; (4) erlenmeyer (ou éprouvette) recueillant le distillat.<br>2) Par (5), en bas : le réfrigérant se remplit complètement d’eau froide, ce qui condense mieux les vapeurs.<br>3) Il condense les vapeurs (eau + huile essentielle) en liquide.<br>4) La phase supérieure, jaune : l’huile essentielle, moins dense que l’eau et peu soluble dans l’eau.` },
    { d: 2, t: 'Rendement d’une hydrodistillation', fig: '',
      q: TX`L’hydrodistillation de 200 g de fleurs de lavande donne 2,4 mL d’huile essentielle de masse volumique \(\rho = 0{,}88\ \text{g/mL}\).<br>1) Calculer la masse d’huile essentielle obtenue.<br>2) Calculer le rendement massique (masse d’huile / masse de plante).<br>3) Avant la décantation, on ajoute du chlorure de sodium au distillat. Comment s’appelle cette opération ? Quel est son intérêt ?`,
      s: TX`1) \(m = \rho V = 0{,}88\times2{,}4 \approx 2{,}1\ \text{g}\).<br>2) \(r = \dfrac{2{,}1}{200} \approx 1{,}1\ \%\).<br>3) Le relargage : l’huile essentielle est encore moins soluble dans l’eau salée, elle se sépare mieux (et la densité de la phase aqueuse augmente).` },
    { d: 3, t: 'Analyse d’une huile essentielle par chromatographie', fig: SVG(300, 250, `
      <rect x="40" y="10" width="220" height="230" fill="#f7f9fc" stroke="#14213d" stroke-width="2"/>
      <line x1="40" y1="210" x2="260" y2="210" stroke="#5b6577" stroke-dasharray="5 4"/><line x1="40" y1="40" x2="260" y2="40" stroke="#2e75b6" stroke-dasharray="5 4"/>
      <text x="265" y="214" font-size="11">dépôt</text><text x="265" y="44" font-size="11" fill="#2e75b6">front</text>
      ${[['A', 90, [150.5, 91]], ['B', 150, [150.5]], ['C', 210, [91]]].map(([n, x, ys]) => `<text x="${x}" y="230" text-anchor="middle" font-weight="bold">${n}</text>${ys.map(y => `<ellipse cx="${x}" cy="${y}" rx="9" ry="6" fill="#a64ca6"/>`).join('')}`).join('')}
      <line x1="32" y1="210" x2="32" y2="40" stroke="#14213d"/><text x="2" y="130" font-size="11">6 cm</text>`),
      q: TX`On analyse une huile essentielle de lavande (A) par chromatographie. On dépose aussi le linalol pur (B) et l’acétate de linalyle pur (C). L’éluant parcourt 6,0 cm ; les taches de B et de C sont respectivement à 2,1 cm et 4,2 cm de la ligne de dépôt.<br>1) Que peut-on dire de l’huile essentielle A ?<br>2) Calculer le rapport frontal du linalol et de l’acétate de linalyle.<br>3) Pourquoi la ligne de dépôt doit-elle être au-dessus du niveau de l’éluant ?<br>4) Comment révéler des taches incolores ?`,
      s: TX`1) A donne deux taches, aux mêmes hauteurs que B et C : c’est un mélange qui contient du linalol et de l’acétate de linalyle.<br>2) \(R_f(B) = \dfrac{2{,}1}{6{,}0} = 0{,}35\) ; \(R_f(C) = \dfrac{4{,}2}{6{,}0} = 0{,}70\).<br>3) Sinon les dépôts se dissoudraient dans l’éluant de la cuve au lieu de migrer.<br>4) Sous une lampe UV ou dans une cuve contenant du diiode.` },
    { d: 3, t: 'Extraction de l’eugénol du clou de girofle', fig: '',
      q: TX`On réalise l’hydrodistillation de 10 g de clous de girofle. Le distillat contient de l’eugénol (\(d = 1{,}06\), peu soluble dans l’eau, très soluble dans le dichlorométhane). On extrait l’eugénol du distillat avec du dichlorométhane (\(d = 1{,}33\)) puis on évapore le solvant : on obtient 1,2 mL d’eugénol.<br>1) Pourquoi utilise-t-on une hydrodistillation plutôt qu’un simple chauffage des clous ?<br>2) Dans l’ampoule à décanter, la phase organique est-elle en haut ou en bas ? Justifier.<br>3) Calculer la masse d’eugénol obtenue et le rendement massique.<br>4) Proposer une méthode pour vérifier que le produit obtenu est bien de l’eugénol.`,
      s: TX`1) La vapeur d’eau entraîne l’eugénol à une température voisine de 100 °C, sans dégrader les molécules.<br>2) En bas : la phase organique (dichlorométhane, \(d = 1{,}33\)) est plus dense que l’eau.<br>3) \(m = 1{,}06\times1{,}2 \approx 1{,}27\ \text{g}\) ; \(r = \dfrac{1{,}27}{10} \approx 13\ \%\).<br>4) Une chromatographie en comparant avec de l’eugénol pur (même rapport frontal).` },
  ],
});
