/* Séries d'exercices : c'est ici que le professeur ajoute ses séries.

   COMMENT AJOUTER UNE SÉRIE
   1. Mettre le fichier PDF dans le dossier « series » du dépôt (ou copier un lien Google Drive).
   2. Trouver le chapitre ci-dessous et ajouter une ligne entre ses crochets [ ] :
        ['Titre affiché', 'adresse du fichier ou lien'],

   EXEMPLE
     'tc-mouvement': [
       ['Série 1 — Le mouvement', 'series/tc-mouvement-serie1.pdf'],
       ['Série 1 — Correction', 'https://drive.google.com/file/d/XXXX/view'],
     ],

   Chaque ligne se termine par une virgule. Les chapitres laissés vides affichent « bientôt disponibles ». */
'use strict';
const SERIES = {

  /* ================= Tronc Commun ================= */
  // Mécanique
  'tc-gravitation': [],        // La gravitation universelle
  'tc-actions': [],            // Exemples d’actions mécaniques
  'tc-mouvement': [],          // Le mouvement
  'tc-inertie': [],            // Principe d’inertie
  'tc-2forces': [],            // Équilibre d’un solide soumis à deux forces
  'tc-3forces': [],            // Équilibre d’un solide soumis à trois forces non parallèles
  'tc-moment': [],             // Équilibre d’un solide en rotation autour d’un axe fixe
  // Électricité
  'tc-courant': [],            // Le courant électrique continu
  'tc-tension': [],            // La tension électrique
  'tc-association': [],        // Association des conducteurs ohmiques
  'tc-passifs': [],            // Caractéristiques de quelques dipôles passifs
  'tc-actif': [],              // Caractéristique d’un dipôle actif
  'tc-transistor': [],         // Le transistor
  'tc-aop': [],                // L’amplificateur opérationnel
  // Chimie
  'tcc-especes': [],           // Les espèces chimiques
  'tcc-extraction': [],        // Extraction, séparation et identification des espèces chimiques
  'tcc-synthese': [],          // Synthèse des espèces chimiques
  'tcc-atome': [],             // Modèle de l’atome
  'tcc-molecules': [],         // Géométrie de quelques molécules
  'tcc-classification': [],    // Classification périodique des éléments chimiques
  'tcc-mole': [],              // La mole, unité de quantité de matière
  'tcc-concentration': [],     // La concentration molaire
  'tcc-transformation': [],    // Transformation chimique d’un système – Bilan de matière

  /* ================= 1ʳᵉ Bac Sciences Mathématiques ================= */
  // Mécanique : travail et énergie
  '1b-rotation': [],           // Rotation d’un solide indéformable autour d’un axe fixe
  '1b-travail': [],            // Travail et puissance d’une force
  '1b-ec': [],                 // Travail et énergie cinétique
  '1b-epp': [],                // Énergie potentielle de pesanteur – Énergie mécanique
  '1b-interne': [],            // Travail et énergie interne
  '1b-thermique': [],          // Énergie thermique et transfert thermique
  // Électricité et magnétisme
  '1b-champe': [],             // Champ électrostatique
  '1b-epe': [],                // Énergie potentielle électrostatique
  '1b-transfert': [],          // Transfert d’énergie dans un circuit électrique
  '1b-global': [],             // Comportement global d’un circuit électrique
  '1b-champb': [],             // Le champ magnétique
  '1b-champb-courant': [],     // Champ magnétique créé par un courant
  '1b-laplace': [],            // Forces électromagnétiques – Loi de Laplace
  // Optique
  '1b-visibilite': [],         // Visibilité d’un objet
  '1b-miroir': [],             // Images formées par un miroir plan
  '1b-lentille': [],           // Images formées par une lentille mince convergente
  '1b-instruments': [],        // Quelques instruments d’optique
  // Chimie
  '1bc-grandeurs': [],         // Grandeurs physiques liées aux quantités de matière
  '1bc-electrolytes': [],      // La concentration et les solutions électrolytiques
  '1bc-suivi': [],             // Suivi d’une transformation chimique
  '1bc-conductimetrie': [],    // Mesure des quantités de matière par conductimétrie
  '1bc-acidobase': [],         // Les réactions acido-basiques
  '1bc-redox': [],             // Les réactions d’oxydo-réduction
  '1bc-dosages': [],           // Les dosages directs
  '1bc-squelettes': [],        // Les molécules organiques et les squelettes carbonés
  '1bc-groupes': [],           // Les groupes caractéristiques en chimie organique

  /* ================= 2ᵉ Bac Sciences Physiques ================= */
  // Ondes
  '2b-ondes': [],              // Ondes mécaniques progressives
  '2b-ondes-per': [],          // Ondes mécaniques progressives périodiques
  '2b-lumiere': [],            // Propagation des ondes lumineuses
  // Transformations nucléaires
  '2b-radioactivite': [],      // Décroissance radioactive
  '2b-noyaux': [],             // Noyaux, masse et énergie
  // Électricité
  '2b-rc': [],                 // Dipôle RC
  '2b-rl': [],                 // Dipôle RL
  '2b-rlc': [],                // Oscillations libres d’un circuit RLC série
  '2b-rlc-force': [],          // Circuit RLC série en régime sinusoïdal forcé
  '2b-ondes-em': [],           // Ondes électromagnétiques – Transmission d’information
  '2b-modulation': [],         // Modulation d’amplitude
  // Mécanique
  '2b-newton': [],             // Lois de Newton
  '2b-chute': [],              // Chute verticale d’un solide
  '2b-plans': [],              // Mouvements plans
  '2b-satellites': [],         // Mouvement des satellites et des planètes
  '2b-rotation': [],           // Mouvement de rotation d’un solide autour d’un axe fixe
  '2b-oscillants': [],         // Systèmes mécaniques oscillants
  '2b-energie': [],            // Aspects énergétiques des oscillations mécaniques
  '2b-atome': [],              // Atome et mécanique de Newton
  // Chimie
  '2bc-lentes': [],            // Transformations lentes et transformations rapides
  '2bc-vitesse': [],           // Suivi temporel d’une transformation – Vitesse de réaction
  '2bc-deuxsens': [],          // Transformations chimiques s’effectuant dans les deux sens
  '2bc-equilibre': [],         // État d’équilibre d’un système chimique
  '2bc-acidebase': [],         // Transformations liées à des réactions acide-base
  '2bc-dosage': [],            // Dosage acido-basique
  '2bc-spontanee': [],         // Évolution spontanée d’un système chimique
  '2bc-piles': [],             // Transformations spontanées dans les piles
  '2bc-electrolyse': [],       // Transformations forcées – Électrolyse
  '2bc-ester': [],             // Réactions d’estérification et d’hydrolyse
  '2bc-controle': [],          // Contrôle de l’évolution d’un système chimique
};
