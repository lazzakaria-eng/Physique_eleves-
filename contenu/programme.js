/* PROGRAMME OFFICIEL (BIOF) : niveaux → filières → Physique / Chimie → unités → chapitres, dans l'ordre du cours.

   Chaque chapitre est désigné par son identifiant (ex. 'tc-mouvement'). Ses titres, formules et simulations
   sont dans js/data.js et js/data-chimie.js ; son contenu complet (résumé, expériences, quiz…) peut être écrit
   dans un fichier contenu/<niveau>/<identifiant>.js (voir contenu/LISEZMOI.md).

   POUR CHANGER L'ORDRE : déplacer l'identifiant dans la liste.
   POUR RÉSERVER UN CHAPITRE À CERTAINES FILIÈRES : ajouter une ligne dans « seulement » plus bas.
   QUAND VOUS AVEZ VÉRIFIÉ UN CHAPITRE : ajouter son identifiant dans « VERIFIES » (le bandeau
   « Contenu à vérifier par le professeur » disparaît). */
'use strict';
const PROGRAMME = [
  {
    id: 'tc', titre: 'Tronc Commun', ar: 'الجذع المشترك', court: 'TC',
    desc: 'Mécanique, électricité et chimie : les bases du lycée.',
    filieres: [],
    physique: [
      { titre: 'Mécanique', ar: 'الميكانيك', ch: ['tc-gravitation', 'tc-actions', 'tc-mouvement', 'tc-inertie', 'tc-2forces', 'tc-3forces', 'tc-moment'] },
      { titre: 'Électricité', ar: 'الكهرباء', ch: ['tc-courant', 'tc-tension', 'tc-association', 'tc-passifs', 'tc-actif', 'tc-transistor', 'tc-aop'] },
    ],
    chimie: [
      { titre: 'La chimie autour de nous', ar: 'الكيمياء من حولنا', ch: ['tcc-especes', 'tcc-extraction', 'tcc-synthese'] },
      { titre: 'Constitution de la matière', ar: 'مكونات المادة', ch: ['tcc-atome', 'tcc-molecules', 'tcc-classification'] },
      { titre: 'Les transformations de la matière', ar: 'تحولات المادة', ch: ['tcc-mole', 'tcc-concentration', 'tcc-transformation'] },
    ],
  },
  {
    id: '1bac', titre: '1ʳᵉ Bac', ar: 'الأولى باكالوريا', court: '1BAC',
    desc: 'Travail et énergie, champs, optique et chimie des solutions.',
    filieres: [{ id: 'sx', titre: 'Sciences Expérimentales', court: 'SX' }, { id: 'sm', titre: 'Sciences Mathématiques', court: 'SM' }],
    physique: [
      { titre: 'Travail et énergie', ar: 'الشغل والطاقة', ch: ['1b-rotation', '1b-travail', '1b-ec', '1b-epp', '1b-interne', '1b-thermique'] },
      { titre: 'Électrostatique', ar: 'الكهرساكن', ch: ['1b-champe', '1b-epe'] },
      { titre: 'Électrodynamique', ar: 'الكهرودينامية', ch: ['1b-transfert', '1b-global'] },
      { titre: 'Électromagnétisme', ar: 'الكهرمغنطيسية', ch: ['1b-champb', '1b-champb-courant', '1b-laplace'] },
      { titre: 'Optique', ar: 'البصريات', ch: ['1b-visibilite', '1b-miroir', '1b-lentille', '1b-instruments'] },
    ],
    chimie: [
      { titre: 'Mesure des quantités de matière', ar: 'قياس كميات المادة', ch: ['1bc-grandeurs', '1bc-electrolytes', '1bc-suivi', '1bc-conductimetrie'] },
      { titre: 'Réactions chimiques et dosages', ar: 'التفاعلات الكيميائية والمعايرة', ch: ['1bc-acidobase', '1bc-redox', '1bc-dosages'] },
      { titre: 'Chimie organique', ar: 'الكيمياء العضوية', ch: ['1bc-squelettes', '1bc-groupes'] },
    ],
  },
  {
    id: '2bac', titre: '2ᵉ Bac', ar: 'الثانية باكالوريا', court: '2BAC',
    desc: 'Ondes, nucléaire, électricité, mécanique et chimie du Bac.',
    filieres: [{ id: 'pc', titre: 'Sciences Physiques', court: 'PC' }, { id: 'svt', titre: 'Sciences de la Vie et de la Terre', court: 'SVT' }, { id: 'sm', titre: 'Sciences Mathématiques', court: 'SM' }],
    physique: [
      { titre: 'Ondes', ar: 'الموجات', ch: ['2b-ondes', '2b-ondes-per', '2b-lumiere'] },
      { titre: 'Transformations nucléaires', ar: 'التحولات النووية', ch: ['2b-radioactivite', '2b-noyaux'] },
      { titre: 'Électricité', ar: 'الكهرباء', ch: ['2b-rc', '2b-rl', '2b-rlc', '2b-rlc-force', '2b-ondes-em', '2b-modulation'] },
      { titre: 'Mécanique', ar: 'الميكانيك', ch: ['2b-newton', '2b-chute', '2b-plans', '2b-satellites', '2b-rotation', '2b-oscillants', '2b-energie', '2b-atome'] },
    ],
    chimie: [
      { titre: 'Transformations rapides et lentes', ar: 'التحولات السريعة والبطيئة', ch: ['2bc-lentes', '2bc-vitesse'] },
      { titre: 'Transformations non totales', ar: 'التحولات غير الكلية', ch: ['2bc-deuxsens', '2bc-equilibre', '2bc-acidebase', '2bc-dosage'] },
      { titre: 'Sens d’évolution d’un système chimique', ar: 'منحى تطور مجموعة كيميائية', ch: ['2bc-spontanee', '2bc-piles', '2bc-electrolyse'] },
      { titre: 'Méthodes de contrôle de l’évolution', ar: 'طرق التحكم في تطور المجموعات', ch: ['2bc-ester', '2bc-controle'] },
    ],
  },
];

// Chapitres réservés à certaines filières (les autres chapitres sont pour toutes les filières du niveau).
const SEULEMENT = {
  '1b-interne': ['sm'], '1b-thermique': ['sm'], '1b-champe': ['sm'], '1b-epe': ['sm'], '1b-instruments': ['sm'],
  '2b-rlc-force': ['sm'], '2b-ondes-em': ['pc', 'sm'], '2b-modulation': ['pc', 'sm'],
  '2b-rotation': ['pc', 'sm'], '2b-energie': ['pc', 'sm'], '2b-atome': ['pc', 'sm'],
  '2bc-piles': ['pc', 'sm'], '2bc-electrolyse': ['pc', 'sm'], '2bc-controle': ['pc', 'sm'],
};

// Chapitres vérifiés par le professeur (pas de bandeau « à vérifier »).
const VERIFIES = [];

// Chapitres qui ont un fichier de contenu complet contenu/<niveau>/<identifiant>.js
const FICHIERS_CONTENU = [
  'tc-gravitation', 'tc-actions', 'tc-mouvement', 'tc-inertie', 'tc-2forces', 'tc-3forces', 'tc-moment', 'tc-courant', 'tc-tension', 'tc-association', 'tc-passifs', 'tc-actif', 'tc-transistor', 'tc-aop', 'tcc-especes', 'tcc-extraction', 'tcc-synthese', 'tcc-atome', 'tcc-molecules', 'tcc-classification', 'tcc-mole', 'tcc-concentration', 'tcc-transformation', '2b-radioactivite',
  '1b-rotation', '1b-travail', '1b-ec', '1b-epp', '1b-interne', '1b-thermique', '1b-champe', '1b-epe', '1b-transfert', '1b-global', '1b-champb', '1b-champb-courant', '1b-laplace', '1b-visibilite', '1b-miroir', '1b-lentille', '1b-instruments', '1bc-grandeurs', '1bc-electrolytes', '1bc-suivi', '1bc-conductimetrie', '1bc-acidobase', '1bc-redox', '1bc-dosages', '1bc-squelettes', '1bc-groupes',
  '2b-ondes', '2b-ondes-per', '2b-lumiere', '2b-noyaux', '2b-rc', '2b-rl', '2b-rlc', '2b-rlc-force', '2b-ondes-em', '2b-modulation', '2b-newton', '2b-chute', '2b-plans', '2b-satellites', '2b-rotation', '2b-oscillants', '2b-energie', '2b-atome', '2bc-lentes', '2bc-vitesse', '2bc-deuxsens', '2bc-equilibre', '2bc-acidebase', '2bc-dosage', '2bc-spontanee', '2bc-piles', '2bc-electrolyse', '2bc-ester', '2bc-controle',
];
var CONTENU = window.CONTENU || {};
