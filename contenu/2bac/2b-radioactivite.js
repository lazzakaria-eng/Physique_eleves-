/* Chapitre modèle — 2ᵉ Bac · Physique · Transformations nucléaires · Décroissance radioactive
   Formules en LaTeX entre \( … \) ; TX`…` garde les barres obliques inverses telles quelles. */
'use strict';
(() => {
  const fig = (w, h, body) => `<figure class="fig"><svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" font-family="Arial, sans-serif" font-size="13">${body}</svg></figure>`;
  // courbe N(t) = N0 / 2^(t / t1/2) avec repères des demi-vies
  const L = 60, B = 190, W = 420, H = 165, X = k => L + W * k / 4, Y = y => B - H * y;
  const pts = Array.from({ length: 81 }, (_, i) => { const k = 4 * i / 80; return X(k).toFixed(1) + ',' + Y(Math.pow(2, -k)).toFixed(1); }).join(' ');
  const decay = fig(500, 225, `<line x1="${L}" y1="${B}" x2="${L + W + 10}" y2="${B}" stroke="#5b6577" stroke-width="1.5"/><line x1="${L}" y1="${B}" x2="${L}" y2="12" stroke="#5b6577" stroke-width="1.5"/>
    <polyline points="${pts}" fill="none" stroke="#1f6fe0" stroke-width="3"/>
    ${[1, 2, 3].map(k => `<path d="M${X(k)} ${B}V${Y(Math.pow(2, -k))}H${L}" fill="none" stroke="#d93a4a" stroke-dasharray="4 3"/><text x="${X(k)}" y="${B + 16}" text-anchor="middle" font-size="12">${k === 1 ? '' : k}t½</text><text x="${L - 6}" y="${Y(Math.pow(2, -k)) + 4}" text-anchor="end" font-size="12">N₀/${2 ** k}</text>`).join('')}
    <text x="${L - 6}" y="${Y(1) + 4}" text-anchor="end" font-size="12">N₀</text><text x="${L + W + 10}" y="${B + 30}" text-anchor="end" font-weight="bold">t</text><text x="18" y="14" font-weight="bold">N</text>`);
  const nuc = (lab, col) => `<circle r="16" fill="${col}" stroke="#14213d"/><text y="5" text-anchor="middle" font-weight="bold" fill="#fff" font-size="12">${lab}</text>`;
  const types = fig(520, 150, `<defs><marker id="rd-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#5b6577"/></marker></defs>
    ${[['α', '⁴₂He', '#d98200', 25], ['β⁻', '⁰₋₁e', '#1f6fe0', 75], ['β⁺', '⁰₁e', '#12946a', 125]].map(([n, p, c, y]) => `<g transform="translate(60 ${y})">${nuc('X', '#7a4fd6')}</g><line x1="82" y1="${y}" x2="190" y2="${y}" stroke="#5b6577" stroke-width="2" marker-end="url(#rd-ar)"/><g transform="translate(220 ${y})">${nuc('Y', '#7a4fd6')}</g><text x="250" y="${y + 5}">+</text><circle cx="290" cy="${y}" r="9" fill="${c}"/><text x="310" y="${y + 5}" font-weight="bold">${n} : ${p}</text>`).join('')}`);

  CONTENU['2b-radioactivite'] = {
    resume: {
      intro: TX`Un noyau radioactif se désintègre <b>spontanément</b> en émettant une particule (\(\alpha\), \(\beta^-\) ou \(\beta^+\)), souvent accompagnée d’un rayonnement \(\gamma\). Pour un grand nombre de noyaux, le nombre de noyaux restants décroît <b>exponentiellement</b> : il est divisé par 2 à chaque demi-vie.`,
      sections: [
        {
          titre: '1. Le noyau atomique',
          html: TX`<p>Un noyau est noté \({}^{A}_{Z}\text{X}\) : \(Z\) = nombre de <b>protons</b> (nombre de charge), \(A\) = nombre de <b>nucléons</b> (nombre de masse), \(N = A - Z\) = nombre de <b>neutrons</b>.</p>
<p><b>Isotopes</b> : noyaux de même \(Z\) mais de \(A\) différents (ex. \({}^{12}_{6}\text{C}\) et \({}^{14}_{6}\text{C}\)).</p>
<p><b>Diagramme \((N, Z)\)</b> (de Segré) : les noyaux stables forment la « vallée de stabilité » (\(N \approx Z\) pour les noyaux légers, \(N > Z\) pour les lourds). Les noyaux hors de cette vallée sont radioactifs.</p>`,
        },
        {
          titre: '2. La radioactivité et ses types',
          html: TX`<p><b>Définition.</b> La radioactivité est la transformation <b>spontanée</b> d’un noyau instable (père) en un noyau plus stable (fils), avec émission d’une particule. Elle est <b>aléatoire</b>, <b>inévitable</b> et <b>indépendante</b> des conditions extérieures (température, pression, état chimique).</p>`
            + types
            + TX`<ul><li><b>\(\alpha\)</b> : émission d’un noyau d’hélium ; concerne les noyaux lourds (\(A > 200\)) : \({}^{A}_{Z}\text{X} \to {}^{A-4}_{Z-2}\text{Y} + {}^{4}_{2}\text{He}\).</li>
<li><b>\(\beta^-\)</b> : émission d’un électron ; noyaux ayant trop de neutrons ; un neutron devient un proton : \({}^{1}_{0}\text{n} \to {}^{1}_{1}\text{p} + {}^{0}_{-1}\text{e}\).</li>
<li><b>\(\beta^+\)</b> : émission d’un positon ; noyaux ayant trop de protons ; un proton devient un neutron : \({}^{1}_{1}\text{p} \to {}^{1}_{0}\text{n} + {}^{0}_{1}\text{e}\).</li>
<li><b>\(\gamma\)</b> : rayonnement électromagnétique de grande énergie émis par un noyau fils excité \(\text{Y}^*\) : \(\text{Y}^* \to \text{Y} + \gamma\).</li></ul>`,
        },
        {
          titre: '3. Lois de conservation de Soddy',
          html: TX`<p>Lors d’une désintégration \({}^{A}_{Z}\text{X} \to {}^{A_1}_{Z_1}\text{Y} + {}^{A_2}_{Z_2}\text{P}\), il y a conservation du <b>nombre de nucléons</b> et du <b>nombre de charge</b> :</p>
<p style="text-align:center">\(A = A_1 + A_2 \qquad Z = Z_1 + Z_2\)</p>
<p>Exemple : \({}^{238}_{92}\text{U} \to {}^{234}_{90}\text{Th} + {}^{4}_{2}\text{He}\) (\(238 = 234 + 4\) ; \(92 = 90 + 2\)).</p>`,
        },
        {
          titre: '4. Loi de décroissance radioactive', sim: 'des',
          html: TX`<p>On ne peut pas prévoir l’instant où un noyau donné se désintègre. Mais pour une population de \(N\) noyaux, le nombre de désintégrations pendant \(dt\) est proportionnel à \(N\) : \(dN = -\lambda N\,dt\). D’où :</p>
<p style="text-align:center">\(N(t) = N_0\,e^{-\lambda t}\)</p>
<p>\(N_0\) : nombre de noyaux à \(t = 0\) ; \(\lambda\) : <b>constante radioactive</b> (en \(\text{s}^{-1}\)), caractéristique du noyau. La <b>constante de temps</b> est \(\tau = \dfrac{1}{\lambda}\) : la tangente à l’origine de \(N(t)\) coupe l’axe des temps à \(t = \tau\), et \(N(\tau) \approx 0{,}37\,N_0\).</p>`,
        },
        {
          titre: '5. La demi-vie', sim: 'decroissance',
          html: TX`<p>La <b>demi-vie</b> \(t_{1/2}\) est la durée au bout de laquelle la moitié des noyaux initiaux s’est désintégrée : \(N(t_{1/2}) = \dfrac{N_0}{2}\), d’où \(t_{1/2} = \dfrac{\ln 2}{\lambda} = \tau\ln 2\).</p>`
            + decay
            + TX`<p>Après \(n\) demi-vies : \(N = \dfrac{N_0}{2^n}\). Exemples : iode 131 : 8 jours ; carbone 14 : 5730 ans ; uranium 238 : \(4{,}5\times10^{9}\) ans.</p>`,
        },
        {
          titre: '6. L’activité',
          html: TX`<p>L’<b>activité</b> \(a\) d’un échantillon est le nombre de désintégrations par seconde ; unité : le <b>becquerel</b> (Bq).</p>
<p style="text-align:center">\(a(t) = -\dfrac{dN}{dt} = \lambda N(t) = a_0\,e^{-\lambda t}\) avec \(a_0 = \lambda N_0\)</p>
<p>Nombre de noyaux à partir de la masse : \(N = \dfrac{m}{M}\,N_A\).</p>`,
        },
        {
          titre: '7. Application : la datation',
          html: TX`<p>On compare l’activité \(a\) d’un échantillon ancien à l’activité \(a_0\) d’un échantillon actuel identique :</p>
<p style="text-align:center">\(t = \dfrac{1}{\lambda}\ln\dfrac{a_0}{a} = \dfrac{t_{1/2}}{\ln 2}\ln\dfrac{a_0}{a}\)</p>
<p>Le <b>carbone 14</b> date les restes d’êtres vivants jusqu’à environ 40 000 ans ; l’<b>uranium–plomb</b> ou le <b>potassium–argon</b> datent les roches (millions à milliards d’années). On choisit un noyau dont la demi-vie est du même ordre que l’âge à mesurer.</p>`,
        },
      ],
      formules: [
        { tex: TX`N = A - Z`, sens: 'Nombre de neutrons d’un noyau' },
        { tex: TX`A = A_1 + A_2 \qquad Z = Z_1 + Z_2`, sens: 'Lois de conservation de Soddy' },
        { tex: TX`N(t) = N_0\,e^{-\lambda t}`, sens: 'Loi de décroissance radioactive' },
        { tex: TX`\tau = \dfrac{1}{\lambda}`, sens: 'Constante de temps (s)' },
        { tex: TX`t_{1/2} = \dfrac{\ln 2}{\lambda} = \tau\,\ln 2`, sens: 'Demi-vie' },
        { tex: TX`a(t) = -\dfrac{dN}{dt} = \lambda\,N(t) = a_0\,e^{-\lambda t}`, sens: 'Activité (Bq)' },
        { tex: TX`N = \dfrac{m}{M}\,N_A`, sens: 'Nombre de noyaux dans une masse m' },
        { tex: TX`t = \dfrac{t_{1/2}}{\ln 2}\,\ln\dfrac{a_0}{a}`, sens: 'Datation' },
      ],
      retenir: [
        TX`Noyau \({}^{A}_{Z}\text{X}\) : \(Z\) protons, \(A\) nucléons, \(A - Z\) neutrons ; isotopes : même \(Z\), \(A\) différents.`,
        'La désintégration est spontanée, aléatoire, inévitable et indépendante des conditions extérieures.',
        TX`\(\alpha\) : \({}^{4}_{2}\text{He}\) ; \(\beta^-\) : \({}^{0}_{-1}\text{e}\) ; \(\beta^+\) : \({}^{0}_{1}\text{e}\) ; \(\gamma\) : désexcitation du noyau fils.`,
        TX`Lois de Soddy : conservation de \(A\) et de \(Z\).`,
        TX`\(N(t) = N_0e^{-\lambda t}\) ; après \(n\) demi-vies il reste \(N_0/2^n\).`,
        TX`\(t_{1/2} = \ln 2/\lambda\) ; \(a = \lambda N\) en becquerels ; l’activité décroît avec la même demi-vie que \(N\).`,
      ],
      erreurs: [
        TX`Oublier la conservation de la charge : pour \(\beta^-\), le noyau fils a \(Z + 1\) (et non \(Z - 1\)).`,
        TX`Utiliser \(\lambda\) en \(\text{j}^{-1}\) ou \(\text{an}^{-1}\) pour calculer une activité en Bq : il faut \(\lambda\) en \(\text{s}^{-1}\).`,
        TX`Croire qu’au bout de \(2\,t_{1/2}\) tous les noyaux ont disparu : il en reste \(N_0/4\).`,
        TX`Confondre \(\tau\) et \(t_{1/2}\) : \(t_{1/2} = \tau\ln 2 \approx 0{,}69\,\tau\).`,
        TX`Inverser le rapport dans la datation : c’est \(\ln\dfrac{a_0}{a}\) (supérieur à 1), pas \(\ln\dfrac{a}{a_0}\).`,
        'Penser que chauffer ou comprimer un échantillon change sa vitesse de désintégration.',
      ],
    },
    experiences: {
      sims: ['des', 'decroissance'],
      protocole: {
        titre: 'Modéliser la décroissance radioactive avec des dés',
        materiel: 'une centaine de dés (ou la simulation « Modèle des dés »), une boîte, un tableur ou du papier millimétré.',
        etapes: [
          TX`Chaque dé représente un noyau. Compter le nombre initial \(N_0\) (par exemple 200).`,
          TX`Lancer tous les dés : ceux qui montrent 6 sont « désintégrés » (probabilité \(p = 1/6\)). Les retirer et noter le nombre \(N\) de dés restants.`,
          'Relancer les dés restants et recommencer jusqu’à ce qu’il en reste très peu.',
          TX`Tracer \(N\) en fonction du numéro du lancer \(n\), puis \(\ln N\) en fonction de \(n\).`,
          TX`Dans la simulation, faire varier \(N_0\) puis \(p\) et comparer les points au modèle \(N = N_0(1 - p)^n\).`,
        ],
      },
      observations: TX`<ul><li>On ne peut pas prévoir quel dé va « se désintégrer » : le phénomène est <b>aléatoire</b>.</li><li>Pourtant le nombre de dés restants diminue régulièrement : à chaque lancer, il est multiplié par environ \(1 - p = 5/6\).</li><li>La courbe \(N(n)\) a l’allure d’une exponentielle décroissante ; \(\ln N\) est une droite de pente \(\ln(1 - p) \approx -p\).</li><li>Le nombre de dés est divisé par 2 environ tous les 4 lancers, quel que soit \(N_0\).</li></ul>`,
      conclusion: TX`<p>Un grand nombre d’événements individuels aléatoires conduit à une loi collective précise : \(N = N_0e^{-\lambda t}\). Comme pour les dés, la demi-vie \(t_{1/2} = \ln 2/\lambda\) ne dépend pas du nombre initial de noyaux mais seulement de la probabilité de désintégration, c’est-à-dire de la nature du noyau.</p>`,
    },
    quiz: [
      { q: 'La désintégration d’un noyau radioactif est un phénomène :', o: ['provoqué par la chaleur', 'spontané et aléatoire', 'périodique', 'qui dépend de la pression'], r: 1, e: 'Elle est spontanée, aléatoire et indépendante des conditions extérieures.' },
      { q: TX`Le noyau \({}^{14}_{6}\text{C}\) contient :`, o: ['6 protons et 14 neutrons', '14 protons et 6 neutrons', '6 protons et 8 neutrons', '8 protons et 6 neutrons'], r: 2, e: TX`\(Z = 6\) protons et \(N = A - Z = 8\) neutrons.` },
      { q: TX`La désintégration \({}^{14}_{6}\text{C} \to {}^{14}_{7}\text{N} + {}^{0}_{-1}\text{e}\) est de type :`, o: [TX`\(\alpha\)`, TX`\(\beta^+\)`, TX`\(\gamma\)`, TX`\(\beta^-\)`], r: 3, e: TX`La particule émise est un électron : radioactivité \(\beta^-\).` },
      { q: TX`Dans \({}^{226}_{88}\text{Ra} \to {}^{A}_{Z}\text{Rn} + {}^{4}_{2}\text{He}\), on a :`, o: [TX`\(A = 222,\ Z = 86\)`, TX`\(A = 230,\ Z = 90\)`, TX`\(A = 222,\ Z = 90\)`, TX`\(A = 226,\ Z = 86\)`], r: 0, e: TX`\(226 = A + 4\) et \(88 = Z + 2\).` },
      { q: 'Au bout de deux demi-vies, il reste :', o: ['50 % des noyaux', '0 % des noyaux', '25 % des noyaux', '12,5 % des noyaux'], r: 2, e: TX`\(N = \dfrac{N_0}{2^2} = \dfrac{N_0}{4}\), soit 25 %.` },
      { q: TX`Pour \(t_{1/2} = 10\ \text{jours}\), la constante radioactive vaut environ :`, o: [TX`\(0{,}069\ \text{j}^{-1}\)`, TX`\(6{,}9\ \text{j}^{-1}\)`, TX`\(0{,}10\ \text{j}^{-1}\)`, TX`\(14\ \text{j}^{-1}\)`], r: 0, e: TX`\(\lambda = \dfrac{\ln 2}{t_{1/2}} = \dfrac{0{,}693}{10} \approx 0{,}069\ \text{j}^{-1}\).` },
      { q: TX`Un échantillon a une activité \(a_0 = 800\ \text{Bq}\) et une demi-vie de 5 min. Au bout de 15 min, son activité est :`, o: [TX`\(400\ \text{Bq}\)`, TX`\(100\ \text{Bq}\)`, TX`\(200\ \text{Bq}\)`, TX`\(267\ \text{Bq}\)`], r: 1, e: TX`15 min \(= 3\,t_{1/2}\) : \(a = \dfrac{800}{2^3} = 100\ \text{Bq}\).` },
      { q: TX`La tangente à l’origine de la courbe \(N(t)\) coupe l’axe des temps à :`, o: [TX`\(t_{1/2}\)`, TX`\(\tau = 1/\lambda\)`, TX`\(2\,t_{1/2}\)`, TX`\(\ln 2\)`], r: 1, e: TX`La tangente \(y = N_0(1 - \lambda t)\) s’annule pour \(t = 1/\lambda = \tau\).` },
      { q: 'Pour dater un os de quelques milliers d’années, on utilise :', o: ['l’uranium 238 (4,5 milliards d’années)', 'le carbone 14 (5730 ans)', 'l’iode 131 (8 jours)', 'le radon 222 (3,8 jours)'], r: 1, e: 'On choisit un noyau dont la demi-vie est du même ordre de grandeur que l’âge à mesurer.' },
      { q: 'Si on chauffe un échantillon radioactif, sa demi-vie :', o: ['diminue', 'augmente', 'ne change pas', 'devient nulle'], r: 2, e: 'La radioactivité est indépendante des conditions extérieures.' },
    ],
  };
})();
