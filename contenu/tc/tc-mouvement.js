/* Chapitre modèle — Tronc Commun · Physique · Mécanique · Le mouvement
   Formules en LaTeX entre \( … \) ; TX`…` garde les barres obliques inverses telles quelles. */
'use strict';
(() => {
  const fig = (w, h, body) => `<figure class="fig"><svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" font-family="Arial, sans-serif" font-size="13">${body}</svg></figure>`;
  const dots = (y, xs, col) => xs.map((x, i) => `<circle cx="${x}" cy="${y}" r="4" fill="${col}"/><text x="${x}" y="${y - 10}" text-anchor="middle" font-size="10">M${i}</text>`).join('');
  const arrow = `<defs><marker id="mv-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#d93a4a"/></marker></defs>`;

  CONTENU['tc-mouvement'] = {
    resume: {
      intro: TX`Un corps est en mouvement par rapport à un autre s’il change de position par rapport à lui. On décrit un mouvement par sa <b>trajectoire</b> et sa <b>vitesse</b>, toujours dans un <b>référentiel</b> précisé.`,
      sections: [
        {
          titre: '1. Relativité du mouvement', sim: 'relativite',
          html: TX`<p><b>Définition.</b> Le <b>référentiel</b> est le corps de référence par rapport auquel on étudie le mouvement. Un corps est <b>au repos</b> dans un référentiel si sa position par rapport à ce référentiel ne change pas ; sinon il est <b>en mouvement</b>.</p>
<p><b>Loi.</b> Le mouvement est <b>relatif</b> : un même corps peut être au repos dans un référentiel et en mouvement dans un autre. Exemple : un passager assis est immobile par rapport au train mais en mouvement par rapport au quai.</p>
<p>Référentiels usuels : <b>terrestre</b> (le sol, le laboratoire), <b>géocentrique</b> (centre de la Terre), <b>héliocentrique</b> (centre du Soleil).</p>`,
        },
        {
          titre: '2. Repérer la position d’un point',
          html: TX`<p>On associe au référentiel :</p><ul><li>un <b>repère d’espace</b> \((O, \vec i, \vec j)\) : la position du point M est donnée par le vecteur position \(\overrightarrow{OM} = x\,\vec i + y\,\vec j\) ;</li>
<li>un <b>repère de temps</b> : une origine des dates \(t = 0\) et une unité (la seconde).</li></ul>
<p>Pour un mouvement rectiligne, une seule coordonnée suffit : l’<b>abscisse</b> \(x\). Pour un mouvement circulaire, on utilise l’<b>abscisse curviligne</b> \(s\) ou l’<b>abscisse angulaire</b> \(\theta\), avec \(s = R\,\theta\).</p>`,
        },
        {
          titre: '3. La trajectoire',
          html: TX`<p>La <b>trajectoire</b> est l’ensemble des positions successives occupées par le point au cours du mouvement. Elle peut être <b>rectiligne</b> (une droite), <b>circulaire</b> (un cercle) ou <b>curviligne</b> (une courbe quelconque).</p>
<p>La trajectoire dépend aussi du référentiel : la valve d’une roue décrit un cercle par rapport au vélo, mais une cycloïde (des arches) par rapport à la route.</p>`
            + fig(520, 120, `<line x1="10" y1="100" x2="510" y2="100" stroke="#888" stroke-width="2"/><circle cx="80" cy="60" r="38" fill="none" stroke="#2e75b6" stroke-width="2.5"/><circle cx="80" cy="22" r="5" fill="#d93a4a"/><text x="80" y="116" text-anchor="middle">par rapport au vélo : cercle</text><path d="M200 100 C 212 30, 268 30, 280 100 C 292 30, 348 30, 360 100 C 372 30, 428 30, 440 100" fill="none" stroke="#d93a4a" stroke-width="2.5" stroke-dasharray="6 4"/><text x="320" y="116" text-anchor="middle">par rapport à la route : cycloïde</text>`),
        },
        {
          titre: '4. La vitesse', sim: 'mouvement',
          html: TX`<p><b>Vitesse moyenne</b> : \(v_m = \dfrac{d}{\Delta t}\) (d : distance parcourue en m, \(\Delta t\) : durée en s, \(v_m\) en m/s ; \(1\ \text{m/s} = 3{,}6\ \text{km/h}\)).</p>
<p><b>Vitesse instantanée</b> à la position \(M_i\) d’un enregistrement de durée \(\tau\) entre deux points : \(v_i = \dfrac{M_{i-1}M_{i+1}}{2\tau}\).</p>
<p><b>Vecteur vitesse</b> \(\vec v_i\) : origine \(M_i\) ; direction <b>tangente</b> à la trajectoire ; sens du mouvement ; longueur proportionnelle à \(v_i\) (on choisit une échelle).</p>`
            + fig(520, 110, `${arrow}<path d="M20 90 Q 200 -10 500 70" fill="none" stroke="#2e75b6" stroke-width="2.5"/><circle cx="200" cy="44" r="5" fill="#14213d"/><text x="190" y="70">M<tspan baseline-shift="sub" font-size="9">i</tspan></text><line x1="200" y1="44" x2="300" y2="34" stroke="#d93a4a" stroke-width="3" marker-end="url(#mv-ar)"/><text x="306" y="30" fill="#d93a4a" font-weight="bold">v⃗ (tangent)</text>`),
        },
        {
          titre: '5. Nature du mouvement',
          html: TX`<p>Sur un enregistrement à intervalles de temps égaux \(\tau\) :</p>`
            + fig(520, 150, dots(30, [20, 80, 140, 200, 260, 320, 380], '#12946a') + '<text x="430" y="34" fill="#12946a" font-weight="bold">uniforme</text>'
              + dots(80, [20, 30, 50, 80, 120, 170, 230], '#d98200') + '<text x="430" y="84" fill="#d98200" font-weight="bold">accéléré</text>'
              + dots(130, [20, 80, 130, 170, 200, 220, 230], '#d93a4a') + '<text x="430" y="134" fill="#d93a4a" font-weight="bold">retardé</text>')
            + TX`<ul><li>distances égales → vitesse constante : mouvement <b>uniforme</b> ;</li><li>distances croissantes → mouvement <b>accéléré</b> ;</li><li>distances décroissantes → mouvement <b>retardé</b>.</li></ul>`,
        },
        {
          titre: '6. Mouvement rectiligne uniforme',
          html: TX`<p>Trajectoire droite et vitesse constante. <b>Équation horaire</b> : \(x(t) = v\cdot t + x_0\), où \(x_0\) est l’abscisse à \(t = 0\). La courbe \(x = f(t)\) est une <b>droite</b> de pente \(v\).</p>`
            + fig(300, 170, `<line x1="40" y1="150" x2="290" y2="150" stroke="#14213d"/><line x1="40" y1="150" x2="40" y2="10" stroke="#14213d"/><text x="282" y="166">t</text><text x="20" y="18">x</text><line x1="40" y1="120" x2="270" y2="30" stroke="#2e75b6" stroke-width="3"/><text x="10" y="124">x₀</text><path d="M130 85 h60 v-23" fill="none" stroke="#d93a4a" stroke-dasharray="4 3"/><text x="196" y="80" fill="#d93a4a">pente = v</text>`),
        },
        {
          titre: '7. Mouvement circulaire uniforme', sim: 'rotation',
          html: TX`<p>Trajectoire circulaire de rayon \(R\) et vitesse de valeur constante (sa direction change). On définit :</p>
<ul><li>la <b>vitesse angulaire</b> \(\omega = \dfrac{\Delta\theta}{\Delta t}\) en rad/s ;</li><li>la relation \(v = R\cdot\omega\) ;</li><li>la <b>période</b> \(T = \dfrac{2\pi}{\omega}\) (durée d’un tour) et la <b>fréquence</b> \(f = \dfrac{1}{T}\) en Hz (tours par seconde).</li></ul>
<p>Équation horaire : \(\theta(t) = \omega\, t + \theta_0\).</p>`,
        },
      ],
      formules: [
        { tex: TX`v_m = \dfrac{d}{\Delta t}`, sens: 'Vitesse moyenne (m/s)' },
        { tex: TX`v_i = \dfrac{M_{i-1}M_{i+1}}{2\,\tau}`, sens: 'Vitesse instantanée sur un enregistrement' },
        { tex: TX`x(t) = v\cdot t + x_0`, sens: 'Équation horaire du mouvement rectiligne uniforme' },
        { tex: TX`s = R\cdot\theta \qquad v = R\cdot\omega`, sens: 'Abscisse curviligne et vitesse en mouvement circulaire' },
        { tex: TX`\theta(t) = \omega\cdot t + \theta_0`, sens: 'Équation horaire du mouvement circulaire uniforme' },
        { tex: TX`T = \dfrac{2\pi}{\omega} \qquad f = \dfrac{1}{T}`, sens: 'Période (s) et fréquence (Hz)' },
        { tex: TX`1\ \text{m/s} = 3{,}6\ \text{km/h}`, sens: 'Conversion d’unités' },
      ],
      retenir: [
        'On précise <b>toujours</b> le référentiel : le mouvement et la trajectoire en dépendent.',
        'La trajectoire est l’ensemble des positions successives : rectiligne, circulaire ou curviligne.',
        TX`Le vecteur vitesse est <b>tangent</b> à la trajectoire et orienté dans le sens du mouvement.`,
        'Distances égales pendant des durées égales : mouvement uniforme ; croissantes : accéléré ; décroissantes : retardé.',
        TX`Mouvement rectiligne uniforme : \(x(t) = v\,t + x_0\), une droite de pente \(v\).`,
        TX`Mouvement circulaire uniforme : \(v = R\,\omega\), \(T = 2\pi/\omega\), \(f = 1/T\).`,
      ],
      erreurs: [
        'Dire « le corps bouge » sans préciser le référentiel.',
        TX`Calculer \(v_i\) avec \(M_iM_{i+1}/\tau\) au lieu de \(M_{i-1}M_{i+1}/(2\tau)\).`,
        'Oublier de convertir : les cm en m, les ms en s, les km/h en m/s (diviser par 3,6).',
        TX`Confondre la fréquence de rotation en tr/min et en tr/s : \(f(\text{Hz}) = \dfrac{f(\text{tr/min})}{60}\).`,
        'Dessiner le vecteur vitesse vers le centre du cercle : il est tangent à la trajectoire.',
        TX`Penser qu’un mouvement circulaire uniforme a une vitesse constante en <b>vecteur</b> : seule sa valeur est constante.`,
      ],
    },
    experiences: {
      sims: ['mouvement', 'relativite', 'rotation'],
      protocole: {
        titre: 'Enregistrement du mouvement d’un autoporteur sur une table à coussin d’air',
        materiel: 'table à coussin d’air horizontale, autoporteur avec éclateur, feuille d’enregistrement, règle graduée.',
        etapes: [
          TX`Régler la table à l’horizontale et choisir la durée entre deux marques \(\tau = 40\ \text{ms}\).`,
          TX`Lancer l’autoporteur : il marque la feuille aux positions \(M_0, M_1, M_2, \dots\) toutes les \(\tau\) secondes.`,
          TX`Mesurer les distances \(M_{i-1}M_{i+1}\) et calculer les vitesses \(v_i = \dfrac{M_{i-1}M_{i+1}}{2\tau}\).`,
          TX`Tracer \(x = f(t)\) puis le vecteur vitesse en quelques points (échelle : 1 cm pour 0,2 m/s).`,
          'Dans la simulation : fais varier la vitesse initiale puis l’accélération et observe les points et la courbe.',
        ],
      },
      observations: TX`<ul><li>Les points sont <b>alignés</b> : la trajectoire est rectiligne.</li><li>Avec une table bien horizontale, les points sont <b>équidistants</b> : les vitesses \(v_i\) sont égales.</li><li>La courbe \(x(t)\) est une <b>droite</b> ; si on incline la table, les écarts augmentent et la courbe se courbe (mouvement accéléré).</li></ul>`,
      conclusion: TX`<p>Sur une table horizontale, l’autoporteur lancé a un mouvement <b>rectiligne uniforme</b> : \(x(t) = v\,t + x_0\), où \(v\) est la pente de la droite \(x(t)\). La nature du mouvement se lit directement sur l’écart entre les points.</p>`,
    },
    quiz: [
      { q: 'Un passager est assis dans un train qui roule. Il est…', o: ['immobile par rapport au train et en mouvement par rapport au quai', 'en mouvement par rapport au train', 'immobile par rapport au quai', 'immobile dans tous les référentiels'], r: 0, e: 'Le mouvement dépend du référentiel choisi : il est relatif.' },
      { q: 'Par rapport à la route, la valve d’une roue de vélo qui roule décrit…', o: ['un cercle', 'une droite', 'une cycloïde (des arches)', 'un point fixe'], r: 2, e: 'Par rapport au vélo c’est un cercle ; par rapport à la route, une courbe formée d’arches.' },
      { q: TX`Sur un enregistrement (\(\tau = 20\ \text{ms}\)), \(M_1M_3 = 2{,}0\ \text{cm}\). La vitesse \(v_2\) vaut :`, o: [TX`\(0{,}25\ \text{m/s}\)`, TX`\(0{,}50\ \text{m/s}\)`, TX`\(1{,}0\ \text{m/s}\)`, TX`\(2{,}0\ \text{m/s}\)`], r: 1, e: TX`\(v_2 = \dfrac{M_1M_3}{2\tau} = \dfrac{0{,}020}{0{,}040} = 0{,}50\ \text{m/s}\).` },
      { q: TX`L’équation horaire d’un mobile est \(x(t) = 3t + 2\) (m, s). Sa vitesse est :`, o: [TX`\(2\ \text{m/s}\)`, TX`\(5\ \text{m/s}\)`, TX`\(3\ \text{m/s}\)`, TX`\(1{,}5\ \text{m/s}\)`], r: 2, e: TX`Le coefficient de \(t\) est la vitesse : \(v = 3\ \text{m/s}\) et \(x_0 = 2\ \text{m}\).` },
      { q: 'Sur un enregistrement rectiligne, la distance entre deux points successifs augmente. Le mouvement est :', o: ['uniforme', 'retardé', 'circulaire', 'accéléré'], r: 3, e: TX`Pendant la même durée \(\tau\), la distance parcourue augmente : la vitesse augmente.` },
      { q: 'Le vecteur vitesse d’un point en mouvement circulaire est…', o: ['dirigé vers le centre', 'tangent au cercle', 'nul', 'dirigé vers l’extérieur, selon le rayon'], r: 1, e: 'Le vecteur vitesse est toujours tangent à la trajectoire.' },
      { q: TX`Un point à \(R = 0{,}20\ \text{m}\) de l’axe tourne à \(\omega = 10\ \text{rad/s}\). Sa vitesse est :`, o: [TX`\(2{,}0\ \text{m/s}\)`, TX`\(50\ \text{m/s}\)`, TX`\(0{,}02\ \text{m/s}\)`, TX`\(20\ \text{m/s}\)`], r: 0, e: TX`\(v = R\cdot\omega = 0{,}20\times10 = 2{,}0\ \text{m/s}\).` },
      { q: 'Une voiture roule à 72 km/h. Sa vitesse en m/s est :', o: ['7,2 m/s', '20 m/s', '259 m/s', '2 m/s'], r: 1, e: TX`\(72 / 3{,}6 = 20\ \text{m/s}\).` },
    ],
  };
})();
