/* Réglages du site + contenu complet des chapitres (formules LaTeX, expérience, exercices corrigés) */
'use strict';

// Lien du bouton Instagram (pied de page)
const INSTAGRAM_URL = 'https://instagram.com/zakarialazrak';

// EXTRA[id de la leçon] = { cours: [étapes], quiz: [{q, o: options, r: bonne réponse, e: explication}], tex: [formules LaTeX, même ordre que dans data.js], exp: {titre, materiel, etapes}, exos: [{q, a}] }
const EXTRA = {
  'tc-mouvement': {
    cours: [
      '<b>Choisir un référentiel.</b> Le mouvement est relatif : un passager assis dans un train est immobile par rapport au train, mais en mouvement par rapport au quai. On précise toujours le corps de référence.',
      '<b>Repérer la position.</b> On associe au référentiel un repère d’espace (position \\(x\\)) et un repère de temps (date \\(t\\)).',
      '<b>Observer la trajectoire.</b> C’est l’ensemble des positions occupées par le point : droite (mouvement rectiligne), cercle (circulaire) ou courbe quelconque (curviligne).',
      '<b>Calculer la vitesse.</b> La vitesse moyenne vaut \\(v_m = \\dfrac{d}{\\Delta t}\\). La vitesse instantanée en \\(M_i\\) se calcule entre les deux points voisins : \\(v_i = \\dfrac{M_{i-1}M_{i+1}}{2\\tau}\\).',
      '<b>Reconnaître la nature du mouvement.</b> Vitesse constante : mouvement uniforme ; vitesse qui augmente : accéléré ; vitesse qui diminue : retardé.',
      '<b>Écrire l’équation horaire.</b> Pour un mouvement rectiligne uniforme : \\(x(t) = v\\cdot t + x_0\\). Pour un mouvement circulaire uniforme : \\(v = R\\cdot\\omega\\) et \\(T = \\dfrac{2\\pi}{\\omega}\\).',
    ],
    quiz: [
      { q: 'Un passager est assis dans un train qui roule. Il est…', o: ['immobile par rapport au train et en mouvement par rapport au quai', 'en mouvement par rapport au train', 'immobile par rapport au quai', 'immobile dans tous les référentiels'], r: 0, e: 'Le mouvement dépend du référentiel choisi : il est relatif.' },
      { q: 'Sur un enregistrement (\\(\\tau = 20\\ \\text{ms}\\)), on mesure \\(M_1M_3 = 2{,}0\\ \\text{cm}\\). La vitesse \\(v_2\\) vaut :', o: ['\\(0{,}25\\ \\text{m/s}\\)', '\\(0{,}50\\ \\text{m/s}\\)', '\\(1{,}0\\ \\text{m/s}\\)', '\\(2{,}0\\ \\text{m/s}\\)'], r: 1, e: '\\(v_2 = \\dfrac{M_1M_3}{2\\tau} = \\dfrac{0{,}020}{0{,}040} = 0{,}50\\ \\text{m/s}\\).' },
      { q: 'L’équation horaire d’un mobile est \\(x(t) = 3t + 2\\) (en m et s). Sa vitesse est :', o: ['\\(2\\ \\text{m/s}\\)', '\\(5\\ \\text{m/s}\\)', '\\(3\\ \\text{m/s}\\)', '\\(1{,}5\\ \\text{m/s}\\)'], r: 2, e: 'Dans \\(x(t) = v\\cdot t + x_0\\), le coefficient de \\(t\\) est la vitesse : \\(v = 3\\ \\text{m/s}\\) et \\(x_0 = 2\\ \\text{m}\\).' },
      { q: 'Sur un enregistrement rectiligne, la distance entre deux points successifs augmente. Le mouvement est :', o: ['uniforme', 'retardé', 'circulaire', 'accéléré'], r: 3, e: 'Pendant la même durée \\(\\tau\\), le mobile parcourt une distance de plus en plus grande : sa vitesse augmente.' },
      { q: 'Un point situé à \\(R = 0{,}20\\ \\text{m}\\) de l’axe tourne à \\(\\omega = 10\\ \\text{rad/s}\\). Sa vitesse est :', o: ['\\(2{,}0\\ \\text{m/s}\\)', '\\(50\\ \\text{m/s}\\)', '\\(0{,}02\\ \\text{m/s}\\)', '\\(20\\ \\text{m/s}\\)'], r: 0, e: '\\(v = R\\cdot\\omega = 0{,}20\\times10 = 2{,}0\\ \\text{m/s}\\).' },
    ],
    tex: [
      'v_m = \\dfrac{d}{\\Delta t}',
      'v_i = \\dfrac{M_{i-1}M_{i+1}}{2\\,\\tau}',
      'x(t) = v\\cdot t + x_0',
      'v = R\\cdot\\omega',
      'T = \\dfrac{2\\pi}{\\omega} \\qquad f = \\dfrac{1}{T}',
    ],
    exp: {
      titre: 'Enregistrement du mouvement d’un autoporteur sur une table à coussin d’air',
      materiel: 'Table à coussin d’air horizontale, autoporteur, feuille d’enregistrement, règle graduée.',
      etapes: [
        'Régler la table à l’horizontale et choisir la durée entre deux marques : \\(\\tau = 40\\ \\text{ms}\\).',
        'Lancer l’autoporteur : il laisse sur la feuille une marque \\(M_0, M_1, M_2, \\dots\\) toutes les \\(\\tau\\) secondes.',
        'Observer la trajectoire : les points sont alignés, le mouvement est donc <b>rectiligne</b>.',
        'Mesurer à la règle les distances \\(M_{i-1}M_{i+1}\\) autour de chaque point, puis calculer \\(v_i = \\dfrac{M_{i-1}M_{i+1}}{2\\tau}\\).',
        'Comparer les vitesses : si elles sont égales (points équidistants), le mouvement est <b>uniforme</b> ; si elles augmentent, il est accéléré ; si elles diminuent, il est retardé.',
        'Représenter le vecteur vitesse en un point : tangent à la trajectoire, dans le sens du mouvement, avec une échelle (par exemple 1 cm pour 0,2 m/s).',
        'Tracer \\(x = f(t)\\) : pour un mouvement rectiligne uniforme on obtient une droite, dont la pente est la vitesse \\(v\\).',
      ],
    },
    exos: [
      {
        q: 'Une voiture parcourt \\(180\\ \\text{km}\\) en \\(2\\ \\text{h}\\ 30\\ \\text{min}\\). Calculer sa vitesse moyenne en km/h puis en m/s.',
        a: '\\(v_m = \\dfrac{d}{\\Delta t} = \\dfrac{180}{2{,}5} = 72\\ \\text{km/h}\\).<br>Conversion : \\(v_m = \\dfrac{72}{3{,}6} = 20\\ \\text{m/s}\\).',
      },
      {
        q: 'Sur un enregistrement (\\(\\tau = 40\\ \\text{ms}\\)), on mesure \\(M_2M_4 = 4{,}8\\ \\text{cm}\\) et \\(M_4M_6 = 4{,}8\\ \\text{cm}\\) ; les points sont alignés.<br>a) Calculer \\(v_3\\) et \\(v_5\\).<br>b) Quelle est la nature du mouvement ?<br>c) À \\(t = 0\\), \\(x_0 = 2\\ \\text{cm}\\). Écrire l’équation horaire et calculer \\(x\\) à \\(t = 0{,}5\\ \\text{s}\\).',
        a: 'a) \\(v_3 = \\dfrac{M_2M_4}{2\\tau} = \\dfrac{4{,}8\\times10^{-2}}{2\\times 40\\times10^{-3}} = 0{,}60\\ \\text{m/s}\\) ; de même \\(v_5 = 0{,}60\\ \\text{m/s}\\).<br>b) Trajectoire rectiligne et vitesse constante : mouvement <b>rectiligne uniforme</b>.<br>c) \\(x(t) = v\\cdot t + x_0 = 0{,}60\\,t + 0{,}02\\) (en m). À \\(t = 0{,}5\\ \\text{s}\\) : \\(x = 0{,}60\\times0{,}5 + 0{,}02 = 0{,}32\\ \\text{m}\\).',
      },
      {
        q: 'Un disque de rayon \\(R = 15\\ \\text{cm}\\) tourne à \\(45\\ \\text{tr/min}\\) d’un mouvement uniforme. Calculer la fréquence, la période, la vitesse angulaire, puis la vitesse d’un point du bord.',
        a: '\\(f = \\dfrac{45}{60} = 0{,}75\\ \\text{Hz}\\) ; \\(T = \\dfrac{1}{f} \\approx 1{,}33\\ \\text{s}\\).<br>\\(\\omega = 2\\pi f = 2\\pi\\times0{,}75 \\approx 4{,}71\\ \\text{rad/s}\\).<br>\\(v = R\\cdot\\omega = 0{,}15\\times4{,}71 \\approx 0{,}71\\ \\text{m/s}\\).',
      },
    ],
  },

  '2b-radioactivite': {
    cours: [
      '<b>Un noyau instable.</b> Certains noyaux \\({}^{A}_{Z}\\text{X}\\) ont trop de protons, trop de neutrons ou trop de nucléons : ils sont radioactifs.',
      '<b>Il se désintègre.</b> Le noyau se transforme spontanément en un autre noyau en émettant une particule : \\(\\alpha\\) (noyau \\({}^{4}_{2}\\text{He}\\)), \\(\\beta^-\\) (électron) ou \\(\\beta^+\\) (positon), souvent suivie d’un rayonnement \\(\\gamma\\).',
      '<b>On équilibre l’équation.</b> Les lois de Soddy imposent la conservation du nombre de nucléons \\(A\\) et du nombre de charge \\(Z\\).',
      '<b>Le phénomène est aléatoire.</b> On ne peut pas prévoir quand un noyau donné va se désintégrer, mais pour un grand nombre de noyaux on connaît la loi : \\(N(t) = N_0\\,e^{-\\lambda t}\\).',
      '<b>La demi-vie.</b> Au bout de \\(t_{1/2} = \\dfrac{\\ln 2}{\\lambda}\\), la moitié des noyaux a disparu ; au bout de \\(2\\,t_{1/2}\\) il en reste le quart, et ainsi de suite.',
      '<b>L’activité.</b> C’est le nombre de désintégrations par seconde : \\(a = \\lambda N\\), en becquerels (Bq). Elle décroît comme \\(N\\), ce qui permet de dater un échantillon.',
    ],
    quiz: [
      { q: 'La désintégration d’un noyau radioactif est un phénomène :', o: ['provoqué par la chaleur', 'spontané et aléatoire', 'périodique', 'qui dépend de la pression'], r: 1, e: 'Elle est spontanée, aléatoire et indépendante des conditions extérieures (température, pression…).' },
      { q: 'Au bout de deux demi-vies, il reste :', o: ['50 % des noyaux', '0 % des noyaux', '25 % des noyaux', '12,5 % des noyaux'], r: 2, e: '\\(N = \\dfrac{N_0}{2^2} = \\dfrac{N_0}{4}\\), soit 25 %.' },
      { q: 'Pour \\(t_{1/2} = 10\\ \\text{jours}\\), la constante radioactive vaut environ :', o: ['\\(0{,}069\\ \\text{j}^{-1}\\)', '\\(6{,}9\\ \\text{j}^{-1}\\)', '\\(0{,}10\\ \\text{j}^{-1}\\)', '\\(14\\ \\text{j}^{-1}\\)'], r: 0, e: '\\(\\lambda = \\dfrac{\\ln 2}{t_{1/2}} = \\dfrac{0{,}693}{10} \\approx 0{,}069\\ \\text{j}^{-1}\\).' },
      { q: 'La désintégration \\({}^{14}_{6}\\text{C} \\longrightarrow {}^{14}_{7}\\text{N} + {}^{0}_{-1}\\text{e}\\) est de type :', o: ['\\(\\alpha\\)', '\\(\\beta^+\\)', '\\(\\gamma\\)', '\\(\\beta^-\\)'], r: 3, e: 'La particule émise est un électron \\({}^{0}_{-1}\\text{e}\\) : radioactivité \\(\\beta^-\\).' },
      { q: 'Un échantillon a une activité \\(a_0 = 800\\ \\text{Bq}\\) et une demi-vie de 5 min. Son activité au bout de 15 min est :', o: ['\\(400\\ \\text{Bq}\\)', '\\(100\\ \\text{Bq}\\)', '\\(200\\ \\text{Bq}\\)', '\\(267\\ \\text{Bq}\\)'], r: 1, e: '15 min \\(= 3\\,t_{1/2}\\), donc \\(a = \\dfrac{a_0}{2^3} = \\dfrac{800}{8} = 100\\ \\text{Bq}\\).' },
    ],
    tex: [
      'N(t) = N_0\\,e^{-\\lambda t}',
      't_{1/2} = \\dfrac{\\ln 2}{\\lambda}',
      '\\tau = \\dfrac{1}{\\lambda}',
      'a(t) = -\\dfrac{dN}{dt} = \\lambda\\,N(t) = a_0\\,e^{-\\lambda t}',
      't = \\dfrac{1}{\\lambda}\\,\\ln\\dfrac{a_0}{a}',
      '\\sum A = \\text{constante} \\qquad \\sum Z = \\text{constante}',
    ],
    exp: {
      titre: 'Modéliser la décroissance radioactive avec des dés',
      materiel: 'Une centaine de dés (ou de pièces), une boîte, une feuille de papier millimétré ou un tableur.',
      etapes: [
        'Chaque dé représente un noyau radioactif. Compter le nombre initial \\(N_0\\) (par exemple 100).',
        'Lancer tous les dés : ceux qui affichent 6 sont « désintégrés ». Les retirer et noter le nombre \\(N\\) de dés restants.',
        'Relancer uniquement les dés restants et recommencer ; chaque lancer représente une durée \\(\\Delta t\\).',
        'Tracer \\(N\\) en fonction du numéro du lancer : la courbe décroît de façon exponentielle, alors que chaque désintégration est <b>aléatoire</b>.',
        'Lire sur la courbe le nombre de lancers pour lequel \\(N = \\dfrac{N_0}{2}\\) : c’est la demi-vie \\(t_{1/2}\\) (environ 3,8 lancers pour une probabilité de \\(\\tfrac16\\)).',
        'Vérifier qu’au bout de \\(2\\,t_{1/2}\\) il reste environ \\(\\dfrac{N_0}{4}\\), puis \\(\\dfrac{N_0}{8}\\) au bout de \\(3\\,t_{1/2}\\).',
        'Recommencer avec plus de dés : plus \\(N_0\\) est grand, plus la courbe se rapproche de la loi \\(N(t) = N_0\\,e^{-\\lambda t}\\).',
      ],
    },
    exos: [
      {
        q: 'L’iode 131 a une demi-vie \\(t_{1/2} = 8{,}0\\ \\text{jours}\\). Un échantillon contient \\(N_0 = 4{,}0\\times10^{15}\\) noyaux.<br>a) Calculer la constante radioactive \\(\\lambda\\) en \\(\\text{s}^{-1}\\).<br>b) Calculer l’activité initiale \\(a_0\\).<br>c) Calculer \\(N\\) et \\(a\\) au bout de 24 jours.',
        a: 'a) \\(\\lambda = \\dfrac{\\ln 2}{t_{1/2}} = \\dfrac{0{,}693}{8{,}0\\times86400} \\approx 1{,}0\\times10^{-6}\\ \\text{s}^{-1}\\).<br>b) \\(a_0 = \\lambda N_0 = 1{,}0\\times10^{-6}\\times4{,}0\\times10^{15} = 4{,}0\\times10^{9}\\ \\text{Bq}\\).<br>c) 24 jours \\(= 3\\,t_{1/2}\\), donc \\(N = \\dfrac{N_0}{2^3} = 5{,}0\\times10^{14}\\) noyaux et \\(a = \\dfrac{a_0}{8} = 5{,}0\\times10^{8}\\ \\text{Bq}\\).',
      },
      {
        q: 'Datation au carbone 14 (\\(t_{1/2} = 5730\\ \\text{ans}\\)). L’activité d’un morceau de bois ancien vaut 60 % de celle d’un bois récent de même masse. Calculer l’âge du bois.',
        a: '\\(\\dfrac{a}{a_0} = e^{-\\lambda t} = 0{,}60\\), donc \\(t = \\dfrac{1}{\\lambda}\\ln\\dfrac{a_0}{a} = \\dfrac{t_{1/2}}{\\ln 2}\\,\\ln\\dfrac{1}{0{,}60}\\).<br>\\(t = \\dfrac{5730}{0{,}693}\\times0{,}511 \\approx 4{,}2\\times10^{3}\\ \\text{ans}\\).',
      },
      {
        q: 'Le polonium \\({}^{210}_{84}\\text{Po}\\) se désintègre en plomb \\({}^{206}_{82}\\text{Pb}\\) ; sa demi-vie est \\(t_{1/2} = 138\\ \\text{jours}\\).<br>a) Écrire l’équation de désintégration et donner le type de radioactivité.<br>b) Quel pourcentage de noyaux reste-t-il après 414 jours ?<br>c) Au bout de combien de temps ne reste-t-il que 1 % des noyaux ?',
        a: 'a) Lois de Soddy : \\(210 = 206 + A\\) et \\(84 = 82 + Z\\), d’où \\(A = 4\\), \\(Z = 2\\) :<br>\\({}^{210}_{84}\\text{Po} \\longrightarrow {}^{206}_{82}\\text{Pb} + {}^{4}_{2}\\text{He}\\) — radioactivité <b>α</b>.<br>b) 414 jours \\(= 3\\,t_{1/2}\\) : \\(\\dfrac{N}{N_0} = \\dfrac{1}{8} = 12{,}5\\ \\%\\).<br>c) \\(e^{-\\lambda t} = 0{,}01 \\Rightarrow t = \\dfrac{t_{1/2}}{\\ln 2}\\,\\ln 100 = 138\\times\\dfrac{4{,}605}{0{,}693} \\approx 917\\ \\text{jours}\\).',
      },
    ],
  },
};
