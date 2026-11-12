/* Réglages du site + contenu complet des chapitres (formules LaTeX, expérience, exercices corrigés) */
'use strict';

// ▼ Remplacer MON_COMPTE par le nom du compte Instagram
const INSTAGRAM_URL = 'https://instagram.com/MON_COMPTE';

// EXTRA[id de la leçon] = { tex: [formules LaTeX, même ordre que dans data.js], exp: {titre, materiel, etapes}, exos: [{q, a}] }
const EXTRA = {
  'tc-mouvement': {
    tex: [
      'v_m = \\dfrac{d}{\\Delta t}',
      'v_i = \\dfrac{M_{i-1}M_{i+1}}{2\\,\\tau}',
      'x(t) = v\\cdot t + x_0',
      'v = R\\cdot\\omega',
      'T = \\dfrac{2\\pi}{\\omega} \\qquad f = \\dfrac{1}{T}',
    ],
    exp: {
      titre: 'Étude du mouvement d’un autoporteur sur une table à coussin d’air',
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
