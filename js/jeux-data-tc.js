/* Contenus supplémentaires des jeux de réflexion — TRONC COMMUN.
   Par chapitre : énigmes « Qui suis-je ? » [réponse, 4 indices (du plus difficile au plus facile), 5 fausses propositions],
   intrus [4 propositions dont l’intrus EN PREMIER (l’ordre est mélangé à l’affichage), explication],
   mots mélangés [MOT en majuscules sans accent, définition]. */
'use strict';
var JEUX_ADD = function (c, E, I, M) {
  const D = window.JEUX_DATA, n = /^tcc?-/.test(c) ? 'tc' : /^1bc?-/.test(c) ? '1bac' : '2bac';
  (E || []).forEach(e => D.quisuisje.push({ n, c: [c], r: e[0], i: e[1], o: e[2] }));
  (I || []).forEach(x => D.intrus.push({ n, c: [c], o: x[0], r: 0, e: x[1] }));
  (M || []).forEach(m => D.mots.push({ n, c: [c], m: m[0], d: m[1] }));
};

/* ===================== PHYSIQUE ===================== */
JEUX_ADD('tc-gravitation', [
  ['La constante de gravitation universelle', ['Je suis la même partout dans l’Univers.', 'Je m’exprime en N·m²·kg⁻².', 'Ma valeur est très petite : environ 6,67 × 10⁻¹¹.', 'On me note G dans F = G·m·m′/d².'], ['L’intensité de pesanteur', 'La constante d’Avogadro', 'La masse de la Terre', 'Le rayon terrestre', 'La constante de Planck']],
  ['L’intensité de pesanteur', ['Je diminue quand on s’élève en altitude.', 'Je vaux environ 1,6 N/kg sur la Lune.', 'Je m’exprime en N/kg.', 'Je vaux environ 9,8 N/kg à la surface de la Terre.'], ['La masse', 'La constante de gravitation', 'Le poids', 'La masse volumique', 'La vitesse']],
], [
  [['la masse', 'la force de gravitation', 'le poids', 'la force exercée par la Lune sur la Terre'], 'La masse est une grandeur scalaire en kg ; les trois autres sont des forces (vecteurs, en newton).'],
  [['F = m·a', 'F = G·m·m′/d²', 'P = m·g', 'g = G·M/R²'], 'F = m·a est la 2ᵉ loi de Newton (2ᵉ Bac) ; les trois autres relèvent de la gravitation étudiée en tronc commun.'],
], [
  ['GRAVITATION', 'Attraction mutuelle entre deux corps qui ont une masse'], ['ATTRACTION', 'La gravitation est toujours une …, jamais une répulsion'], ['ASTRE', 'Corps céleste : planète, étoile, satellite…'],
]);
JEUX_ADD('tc-actions', [
  ['Le dynamomètre', ['Je contiens souvent un ressort.', 'Ma graduation est en newtons.', 'Je mesure l’intensité d’une force.', 'On m’accroche un objet pour mesurer son poids.'], ['La balance', 'Le voltmètre', 'Le chronomètre', 'Le rapporteur', 'L’ampèremètre']],
  ['La poussée d’Archimède', ['Je suis une action répartie.', 'Je suis verticale et dirigée vers le haut.', 'Mon intensité égale le poids du fluide déplacé.', 'Je permets aux bateaux de flotter.'], ['La tension d’un fil', 'Le poids', 'La force de frottement', 'La force magnétique', 'La réaction du support']],
], [
  [['le poids', 'la tension d’un fil', 'la réaction d’un support', 'la force exercée par un ressort'], 'Le poids est une action à distance ; les trois autres sont des actions de contact.'],
  [['la réaction d’une table', 'la force magnétique', 'la force électrique', 'le poids'], 'La réaction d’une table est une action de contact ; les trois autres s’exercent à distance.'],
], [
  ['FROTTEMENT', 'Action de contact qui s’oppose au glissement'], ['DYNAMOMETRE', 'Appareil qui mesure l’intensité d’une force'], ['PRESSION', 'Force pressante divisée par la surface'],
]);
JEUX_ADD('tc-mouvement', [
  ['Le référentiel', ['Sans moi, le mot « mouvement » n’a pas de sens.', 'Je suis un objet de référence muni d’un repère et d’une horloge.', 'Je peux être terrestre, géocentrique ou héliocentrique.', 'Un passager est immobile dans le mien si je suis le train.'], ['La trajectoire', 'Le mobile', 'La vitesse', 'L’abscisse', 'Le centre d’inertie']],
  ['La vitesse angulaire', ['Je suis la même pour tous les points d’un solide en rotation.', 'Je m’exprime en rad/s.', 'Je suis liée à la vitesse linéaire par v = R·ω.', 'On me note ω.'], ['La fréquence', 'La période', 'La vitesse linéaire', 'L’abscisse angulaire', 'L’accélération']],
], [
  [['accéléré', 'rectiligne', 'circulaire', 'curviligne'], '« Accéléré » décrit la variation de vitesse ; les trois autres décrivent la forme de la trajectoire.'],
  [['kg', 'm/s', 'km/h', 'rad/s'], 'Le kilogramme est une unité de masse ; les trois autres sont des unités de vitesse.'],
], [
  ['REFERENTIEL', 'Objet de référence pour décrire un mouvement'], ['UNIFORME', 'Mouvement à vitesse de valeur constante'], ['VITESSE', 'Distance parcourue par unité de temps'],
]);
JEUX_ADD('tc-inertie', [
  ['Un solide pseudo-isolé', ['Je ne suis pas vraiment seul : des forces s’exercent sur moi.', 'Mais les forces qui s’exercent sur moi se compensent.', 'Mon centre d’inertie est immobile ou en mouvement rectiligne uniforme.', 'Un palet sur une table à coussin d’air horizontale en est un exemple.'], ['Un solide isolé', 'Un solide en chute libre', 'Un solide en équilibre sous trois forces', 'Un satellite', 'Un pendule']],
  ['Le principe d’inertie', ['On m’attribue souvent à Galilée et Newton.', 'Je concerne les solides isolés ou pseudo-isolés.', 'Je dis que le centre d’inertie garde un mouvement rectiligne uniforme ou reste au repos.', 'Je suis aussi appelé première loi de Newton.'], ['Le principe des actions réciproques', 'La loi de gravitation', 'Le théorème de l’énergie cinétique', 'La deuxième loi de Newton', 'La loi d’Ohm']],
], [
  [['un solide en mouvement circulaire uniforme', 'un palet sur coussin d’air horizontal', 'une voiture en ligne droite à vitesse constante', 'un livre posé sur une table'], 'En mouvement circulaire, la direction de la vitesse change : les forces ne se compensent pas. Les trois autres sont pseudo-isolés.'],
  [['la masse volumique', 'le centre d’inertie', 'le barycentre', 'la relation barycentrique'], 'La masse volumique n’intervient pas dans la position du centre d’inertie d’un système de deux corps.'],
], [
  ['REPOS', 'État d’un corps immobile dans un référentiel'], ['BARYCENTRE', 'Autre nom du centre d’inertie d’un système'], ['PSEUDOISOLE', 'Solide soumis à des forces qui se compensent'],
]);
JEUX_ADD('tc-2forces', [
  ['La raideur d’un ressort', ['Je caractérise un ressort.', 'Je m’exprime en N/m.', 'Je relie la tension à l’allongement : T = k·Δl.', 'On me note k.'], ['L’allongement', 'La longueur à vide', 'La tension', 'Le poids', 'La masse']],
  ['La densité', ['Je suis sans unité.', 'Je compare un corps à l’eau.', 'Si je suis inférieure à 1, le corps flotte.', 'Je vaux 7,8 pour le fer.'], ['La masse volumique', 'La raideur', 'La poussée d’Archimède', 'Le volume', 'La pression']],
], [
  [['même point d’application', 'même droite d’action', 'sens opposés', 'même intensité'], 'Pour l’équilibre sous deux forces, il faut même droite d’action, sens opposés et même intensité ; le même point d’application n’est pas exigé.'],
  [['la vitesse', 'la tension du fil', 'le poids', 'la poussée d’Archimède'], 'La vitesse n’est pas une force ; les trois autres en sont.'],
], [
  ['EQUILIBRE', 'État d’un solide immobile sous des forces qui se compensent'], ['RAIDEUR', 'Constante k d’un ressort'], ['ALLONGEMENT', 'Δl = l − l₀ d’un ressort'],
]);
JEUX_ADD('tc-3forces', [
  ['La ligne polygonale des forces', ['Je suis une construction graphique.', 'On place les vecteurs bout à bout.', 'Pour un équilibre, je suis fermée.', 'Avec trois forces, je suis un triangle.'], ['Le parallélogramme', 'Le diagramme objet-interactions', 'Le repère', 'La trajectoire', 'Le bras de levier']],
  ['L’angle de frottement', ['J’apparais quand il y a frottement.', 'Je suis entre la réaction et la normale au plan.', 'Ma tangente vaut f/R_N.', 'Je suis nul si le contact est sans frottement.'], ['L’angle d’inclinaison', 'Le coefficient de raideur', 'L’angle de réfraction', 'Le bras de levier', 'L’angle de rotation']],
], [
  [['parallèles et de même sens', 'coplanaires', 'concourantes', 'de somme vectorielle nulle'], 'Trois forces non parallèles en équilibre sont coplanaires, concourantes et de somme nulle.'],
  [['la masse', 'la réaction du plan', 'la tension du fil', 'le poids'], 'La masse n’est pas une force ; les trois autres sont des forces de l’équilibre.'],
], [
  ['CONCOURANTES', 'Droites d’action qui se coupent en un même point'], ['COPLANAIRES', 'Forces situées dans un même plan'], ['PROJECTION', 'Méthode analytique sur deux axes'],
]);
JEUX_ADD('tc-moment', [
  ['Le moment d’une force', ['Je mesure l’effet de rotation d’une force.', 'Je m’exprime en N·m.', 'Je vaux F × d, où d est la distance à l’axe.', 'Je suis nul si la force passe par l’axe.'], ['Le couple de torsion', 'Le travail', 'La puissance', 'L’énergie cinétique', 'Le poids']],
  ['Le bras de levier', ['Je suis une distance.', 'Je vais de l’axe à la droite d’action de la force.', 'Je suis perpendiculaire à la droite d’action.', 'Plus je suis grand, plus il est facile de tourner un écrou.'], ['Le rayon', 'Le moment', 'L’axe de rotation', 'La longueur du fil', 'Le diamètre']],
], [
  [['le kilogramme', 'le newton-mètre', 'le moment d’une force', 'le couple de forces'], 'Le kilogramme est une unité de masse ; les autres concernent la rotation.'],
  [['une force passant par l’axe', 'une clé à molette', 'une balance romaine', 'une porte qu’on pousse loin des gonds'], 'Une force qui passe par l’axe a un moment nul : elle ne fait pas tourner.'],
], [
  ['MOMENT', 'Effet de rotation d’une force, en N·m'], ['COUPLE', 'Deux forces opposées non alignées qui font tourner'], ['LEVIER', 'Barre qui tourne autour d’un point d’appui'],
]);
JEUX_ADD('tc-courant', [
  ['L’ampèremètre', ['Je me branche toujours en série.', 'Ma résistance interne est très faible.', 'Mon calibre se choisit du plus grand au plus petit.', 'Je mesure l’intensité du courant.'], ['Le voltmètre', 'L’ohmmètre', 'L’oscilloscope', 'Le rhéostat', 'Le générateur']],
  ['La loi des nœuds', ['Je traduis la conservation de la charge.', 'Je concerne les circuits avec dérivations.', 'Je dis que la somme des courants entrants égale celle des sortants.', 'On m’applique à un nœud du circuit.'], ['La loi des mailles', 'La loi d’Ohm', 'La loi de Pouillet', 'La loi de Joule', 'L’additivité des tensions']],
], [
  [['volt', 'ampère', 'coulomb par seconde', 'milliampère'], 'Le volt est une unité de tension ; les autres expriment une intensité.'],
  [['les protons', 'les électrons dans un métal', 'les ions dans une solution', 'les porteurs de charge mobiles'], 'Les protons ne se déplacent pas dans un circuit ; le courant est dû aux électrons (métaux) ou aux ions (solutions).'],
], [
  ['AMPEREMETRE', 'Appareil branché en série qui mesure l’intensité'], ['ELECTRON', 'Porteur de charge du courant dans un métal'], ['COULOMB', 'Unité de quantité d’électricité'],
]);
JEUX_ADD('tc-tension', [
  ['Le voltmètre', ['Je me branche en dérivation.', 'Ma résistance interne est très grande.', 'J’ai une borne COM et une borne V.', 'Je mesure une tension.'], ['L’ampèremètre', 'L’ohmmètre', 'Le rhéostat', 'La diode', 'Le fusible']],
  ['L’oscilloscope', ['Je visualise une tension au cours du temps.', 'J’ai une sensibilité verticale et un balayage.', 'On lit sur moi la période et la valeur maximale.', 'Mon écran est quadrillé en divisions.'], ['Le voltmètre', 'Le multimètre', 'Le GBF', 'L’ampèremètre', 'Le chronomètre']],
], [
  [['la loi des nœuds', 'la loi des mailles', 'l’additivité des tensions', 'U_AC = U_AB + U_BC'], 'La loi des nœuds concerne les intensités ; les trois autres concernent les tensions.'],
  [['ampère', 'volt', 'millivolt', 'kilovolt'], 'L’ampère est une unité d’intensité ; les autres expriment une tension.'],
], [
  ['VOLTMETRE', 'Appareil branché en dérivation'], ['OSCILLOSCOPE', 'Visualise une tension variable'], ['PERIODE', 'Durée d’un motif d’une tension périodique'],
]);
JEUX_ADD('tc-association', [
  ['La résistance équivalente', ['Je remplace plusieurs conducteurs ohmiques.', 'En série, je suis la somme des résistances.', 'En dérivation, mon inverse est la somme des inverses.', 'On me note R_éq.'], ['La conductance', 'La tension', 'L’intensité', 'La puissance', 'La résistivité']],
  ['Le diviseur de tension', ['Je suis un montage de deux résistances en série.', 'Je fournis une fraction de la tension d’entrée.', 'U₂ = U × R₂/(R₁ + R₂).', 'Le potentiomètre en est un exemple réglable.'], ['Le pont de Wheatstone', 'L’amplificateur', 'Le transistor', 'La diode Zener', 'Le court-circuit']],
], [
  [['R_éq = R₁·R₂', 'R_éq = R₁ + R₂', '1/R_éq = 1/R₁ + 1/R₂', 'G_éq = G₁ + G₂'], 'R_éq = R₁·R₂ n’est pas homogène ; les trois autres sont des lois d’association correctes.'],
  [['en série, l’intensité se partage', 'en série, R_éq est plus grande que chaque R', 'en dérivation, R_éq est plus petite que chaque R', 'en dérivation, les tensions sont égales'], 'En série, l’intensité est la même partout ; elle se partage en dérivation.'],
], [
  ['SERIE', 'Association où le même courant traverse tous les dipôles'], ['DERIVATION', 'Association où les dipôles ont la même tension'], ['CONDUCTANCE', 'Inverse de la résistance, en siemens'],
]);
JEUX_ADD('tc-passifs', [
  ['La thermistance', ['Je suis un dipôle passif.', 'Ma résistance dépend de la température.', 'On m’utilise comme capteur de température.', 'Mon symbole porte la lettre θ.'], ['La photorésistance', 'La diode', 'La varistance', 'Le condensateur', 'Le fusible']],
  ['La caractéristique d’un dipôle', ['Je suis une courbe.', 'Je relie la tension aux bornes à l’intensité.', 'Pour un conducteur ohmique, je suis une droite passant par l’origine.', 'On me trace point par point avec un voltmètre et un ampèremètre.'], ['Le schéma du circuit', 'La loi des mailles', 'Le chronogramme', 'Le spectre', 'La puissance']],
], [
  [['la pile', 'la diode', 'la lampe', 'le conducteur ohmique'], 'La pile est un dipôle actif ; les trois autres sont passifs.'],
  [['la lampe', 'R = 100 Ω', 'U = R·I', 'caractéristique linéaire'], 'La lampe n’est pas un conducteur ohmique : sa caractéristique n’est pas une droite.'],
], [
  ['THERMISTANCE', 'Résistance qui dépend de la température'], ['LAMPE', 'Dipôle non ohmique dont le filament chauffe'], ['ZENER', 'Diode utilisée en inverse pour stabiliser une tension'],
]);
JEUX_ADD('tc-actif', [
  ['La force électromotrice', ['J’appartiens au générateur.', 'Je m’exprime en volts.', 'Je suis la tension à vide (I = 0).', 'On me note E dans U = E − r·I.'], ['La résistance interne', 'L’intensité de court-circuit', 'La puissance', 'La tension de seuil', 'La conductance']],
  ['L’intensité de court-circuit', ['On m’obtient quand U = 0.', 'Je vaux E/r.', 'Je suis l’intersection de la caractéristique avec l’axe des intensités.', 'Il est dangereux de m’atteindre avec une pile.'], ['La force électromotrice', 'Le point de fonctionnement', 'L’intensité nominale', 'La tension à vide', 'La résistance interne']],
], [
  [['la diode', 'la pile', 'l’alimentation stabilisée', 'la batterie'], 'La diode est un dipôle passif ; les trois autres sont des générateurs (dipôles actifs).'],
  [['U = R·I', 'U = E − r·I', 'I_cc = E/r', 'U = E à vide'], 'U = R·I est la loi d’Ohm d’un conducteur ohmique ; les autres concernent le générateur.'],
], [
  ['GENERATEUR', 'Dipôle actif qui fournit de l’énergie électrique'], ['PILE', 'Générateur chimique de tension continue'], ['INTERNE', 'Résistance r d’une pile'],
]);
JEUX_ADD('tc-transistor', [
  ['La base', ['Je suis l’une des trois bornes du transistor.', 'Le courant qui me traverse est faible.', 'Je commande le courant du collecteur.', 'On me note B.'], ['Le collecteur', 'L’émetteur', 'La cathode', 'L’anode', 'La masse']],
  ['Le gain en courant', ['Je n’ai pas d’unité.', 'Je relie I_C et I_B.', 'Je vaux souvent environ 100.', 'On me note β dans I_C = β·I_B.'], ['La résistance', 'La tension de seuil', 'Le rendement', 'La fréquence', 'Le coefficient de frottement']],
], [
  [['anode', 'base', 'collecteur', 'émetteur'], 'L’anode est une borne de la diode ; les trois autres sont les bornes du transistor.'],
  [['transistor bloqué : I_C = β·I_B', 'transistor bloqué : I_B = 0', 'régime linéaire : I_C = β·I_B', 'saturé : interrupteur fermé'], 'Bloqué, I_B = 0 et I_C = 0 : la relation I_C = β·I_B ne vaut qu’en régime linéaire.'],
], [
  ['TRANSISTOR', 'Composant à trois bornes qui amplifie le courant'], ['COLLECTEUR', 'Borne C du transistor'], ['SATURATION', 'Régime où le transistor est un interrupteur fermé'],
]);
JEUX_ADD('tc-aop', [
  ['L’amplificateur opérationnel', ['J’ai deux entrées et une sortie.', 'Je dois être alimenté, souvent en ±15 V.', 'Mes entrées sont notées E⁺ et E⁻.', 'On me schématise par un triangle.'], ['Le transistor', 'La diode', 'Le conducteur ohmique', 'Le condensateur', 'Le générateur']],
  ['La tension de saturation', ['Je limite la sortie de l’amplificateur opérationnel.', 'Je suis un peu inférieure à la tension d’alimentation.', 'On m’atteint en régime non linéaire.', 'On me note ±V_sat.'], ['La tension d’entrée', 'La tension de seuil', 'La force électromotrice', 'La tension efficace', 'La tension Zener']],
], [
  [['E⁺, E⁻ et anode', 'U_s = −(R₂/R₁)·U_e', 'U_s = (1 + R₂/R₁)·U_e', 'ε = 0 en régime linéaire'], 'L’AOP n’a pas d’anode ; les trois autres sont des relations correctes de l’AOP.'],
  [['inverseur sans contre-réaction', 'amplificateur inverseur', 'amplificateur non inverseur', 'suiveur'], 'Sans contre-réaction, l’AOP sature (comparateur) ; les trois autres sont des montages linéaires.'],
], [
  ['AMPLIFICATEUR', 'Composant qui multiplie une tension'], ['INVERSEUR', 'Montage où U_s = −(R₂/R₁)·U_e'], ['SUIVEUR', 'Montage où U_s = U_e'],
]);

/* ===================== CHIMIE ===================== */
JEUX_ADD('tcc-especes', [
  ['La masse volumique', ['Je dépends de la nature de la substance.', 'Je m’exprime en g/cm³ ou kg/m³.', 'Je vaux 1 g/cm³ pour l’eau.', 'On me calcule par ρ = m/V.'], ['La densité', 'La masse', 'Le volume', 'La concentration', 'La solubilité']],
  ['Une espèce synthétique', ['Je suis fabriquée par l’Homme.', 'Je peux être identique à une espèce naturelle.', 'J’ai alors les mêmes propriétés qu’elle.', 'L’aspirine en est un exemple.'], ['Une espèce naturelle', 'Un mélange', 'Un élément chimique', 'Un ion', 'Un isotope']],
], [
  [['la couleur', 'la température de fusion', 'la température d’ébullition', 'la masse volumique'], 'La couleur ne suffit pas à identifier une espèce ; les trois autres sont des caractéristiques physiques mesurables.'],
  [['le sulfate de cuivre anhydre pour le CO₂', 'l’eau de chaux pour le CO₂', 'le sulfate de cuivre anhydre pour l’eau', 'la flamme qui ravive pour le dioxygène'], 'Le sulfate de cuivre anhydre teste l’eau, pas le CO₂ (c’est l’eau de chaux).'],
], [
  ['NATURELLE', 'Espèce chimique qui existe dans la nature'], ['DENSITE', 'Rapport sans unité par rapport à l’eau'], ['ETIQUETTE', 'Elle porte les pictogrammes de sécurité'],
]);
JEUX_ADD('tcc-extraction', [
  ['L’ampoule à décanter', ['On m’agite puis on me laisse reposer.', 'Je sépare deux liquides non miscibles.', 'J’ai un robinet en bas.', 'On m’utilise lors d’une extraction par solvant.'], ['L’éprouvette', 'La fiole jaugée', 'Le ballon', 'Le réfrigérant', 'La burette']],
  ['Le rapport frontal', ['Je suis sans unité et inférieur à 1.', 'Je dépends de l’éluant.', 'Je vaux h/H.', 'On me mesure sur un chromatogramme.'], ['La densité', 'La solubilité', 'La masse volumique', 'La concentration', 'Le rendement']],
], [
  [['la combustion', 'l’hydrodistillation', 'l’extraction par solvant', 'la décantation'], 'La combustion est une transformation chimique ; les trois autres sont des techniques d’extraction ou de séparation.'],
  [['un solvant miscible à l’eau', 'un solvant non miscible à l’eau', 'un solvant où l’espèce est très soluble', 'un solvant peu dangereux'], 'Pour extraire d’une phase aqueuse, le solvant ne doit PAS être miscible à l’eau.'],
], [
  ['DECANTATION', 'Séparation de deux liquides non miscibles par repos'], ['MISCIBLE', 'Se dit de deux liquides qui se mélangent'], ['ELUANT', 'Solvant qui monte sur la plaque'],
]);
JEUX_ADD('tcc-synthese', [
  ['Le chauffage à reflux', ['J’accélère une transformation.', 'J’évite la perte de réactifs et de produits.', 'J’utilise un réfrigérant à boules vertical.', 'Les vapeurs se condensent et retombent dans le ballon.'], ['La distillation', 'La filtration', 'La décantation', 'La cristallisation', 'La chromatographie']],
  ['Le rendement', ['Je suis sans unité.', 'Je suis inférieur ou égal à 100 %.', 'Je compare la masse obtenue à la masse attendue.', 'r = m_exp/m_th.'], ['La densité', 'Le rapport frontal', 'La concentration', 'La pureté', 'La masse volumique']],
], [
  [['la décantation', 'le chauffage à reflux', 'la pierre ponce', 'le réfrigérant'], 'La décantation n’est pas une étape de la synthèse elle-même mais de séparation.'],
  [['l’huile essentielle de lavande', 'l’aspirine', 'le nylon', 'l’arôme de banane de synthèse'], 'L’huile essentielle de lavande est naturelle ; les trois autres sont synthétiques.'],
], [
  ['SYNTHESE', 'Fabrication d’une espèce chimique'], ['REFLUX', 'Chauffage sans perte de matière'], ['RENDEMENT', 'Masse obtenue sur masse attendue'],
]);
JEUX_ADD('tcc-atome', [
  ['Le numéro atomique', ['Je caractérise un élément chimique.', 'Je ne change pas au cours d’une réaction chimique.', 'Je compte les protons du noyau.', 'On me note Z.'], ['Le nombre de masse', 'Le nombre de neutrons', 'La charge de l’ion', 'La masse molaire', 'Le nombre de couches']],
  ['La couche externe', ['Je suis la dernière couche occupée.', 'Mes électrons sont appelés électrons de valence.', 'Je détermine les propriétés chimiques.', 'Pour le sodium (2,8,1), je contiens 1 électron.'], ['La couche K', 'Le noyau', 'Le nuage électronique', 'La couche interne', 'Le nucléon']],
], [
  [['l’électron', 'le proton', 'le neutron', 'le nucléon'], 'L’électron n’est pas dans le noyau ; les trois autres en sont des constituants.'],
  [['¹⁴N', '¹²C', '¹³C', '¹⁴C'], '¹⁴N est de l’azote (Z = 7) ; les trois autres sont des isotopes du carbone (Z = 6).'],
], [
  ['NUCLEON', 'Proton ou neutron'], ['NEUTRON', 'Particule du noyau sans charge'], ['ELECTRONIQUE', 'Répartition … : (K)²(L)⁸(M)¹'],
]);
JEUX_ADD('tcc-molecules', [
  ['La règle de l’octet', ['Je concerne la couche externe.', 'Les atomes cherchent à me satisfaire.', 'Je demande 8 électrons sur la couche externe.', 'L’hydrogène suit plutôt la règle du duet.'], ['La règle du duet', 'La loi de Lavoisier', 'Le principe d’inertie', 'La loi d’Avogadro', 'La règle de Klechkowski']],
  ['Un doublet non liant', ['Je suis une paire d’électrons.', 'Je n’appartiens qu’à un seul atome.', 'J’influence la géométrie de la molécule.', 'L’oxygène de l’eau en possède deux.'], ['Un doublet liant', 'Une liaison covalente', 'Un ion', 'Un électron célibataire', 'Un nucléon']],
], [
  [['NaCl', 'H₂O', 'CH₄', 'NH₃'], 'NaCl est un composé ionique ; les trois autres sont des molécules.'],
  [['CO₂ coudée', 'CH₄ tétraédrique', 'NH₃ pyramidale', 'H₂O coudée'], 'CO₂ est linéaire, pas coudée.'],
], [
  ['TETRAEDRE', 'Géométrie de la molécule de méthane'], ['COVALENTE', 'Liaison par mise en commun d’électrons'], ['OCTET', 'Règle des 8 électrons'],
]);
JEUX_ADD('tcc-classification', [
  ['Les gaz nobles', ['Nous sommes très peu réactifs.', 'Notre couche externe est saturée.', 'Nous occupons la dernière colonne.', 'L’hélium, le néon et l’argon en font partie.'], ['Les halogènes', 'Les alcalins', 'Les alcalino-terreux', 'Les métaux de transition', 'Les non-métaux']],
  ['Mendeleïev', ['Je suis un chimiste russe.', 'J’ai classé les éléments au XIXᵉ siècle.', 'J’ai laissé des cases vides pour des éléments inconnus.', 'Mon classement est l’ancêtre du tableau périodique.'], ['Lavoisier', 'Avogadro', 'Rutherford', 'Dalton', 'Bohr']],
], [
  [['Ne', 'F', 'Cl', 'Br'], 'Ne est un gaz noble ; F, Cl et Br sont des halogènes.'],
  [['Mg', 'Li', 'Na', 'K'], 'Mg est un alcalino-terreux (colonne 2) ; Li, Na et K sont des alcalins.'],
], [
  ['HALOGENE', 'Famille de F, Cl, Br, I'], ['ALCALIN', 'Famille de Li, Na, K'], ['PERIODE', 'Ligne du tableau périodique'],
]);
JEUX_ADD('tcc-mole', [
  ['La masse molaire', ['Je dépends de l’espèce chimique.', 'Je m’exprime en g/mol.', 'Pour une molécule, je suis la somme des masses molaires des atomes.', 'On me note M dans n = m/M.'], ['La masse', 'Le volume molaire', 'La constante d’Avogadro', 'La masse volumique', 'La concentration']],
  ['La quantité de matière', ['Je compte des entités chimiques par paquets.', 'Je m’exprime en mol.', 'n = N/N_A.', 'n = m/M pour un solide.'], ['La masse', 'Le volume', 'La concentration', 'La masse molaire', 'Le nombre d’Avogadro']],
], [
  [['n = m·M', 'n = m/M', 'n = V/V_m', 'n = N/N_A'], 'n = m·M est faux ; les trois autres sont des relations correctes.'],
  [['kg/m³', 'mol', 'g/mol', 'L/mol'], 'kg/m³ est l’unité de masse volumique ; les trois autres sont liées à la mole.'],
], [
  ['AVOGADRO', 'Savant dont la constante vaut 6,02 × 10²³'], ['MOLAIRE', 'Masse … en g/mol'], ['QUANTITE', '… de matière, en mol'],
]);
JEUX_ADD('tcc-concentration', [
  ['La fiole jaugée', ['Je contiens un volume très précis.', 'J’ai un trait de jauge.', 'On m’utilise pour préparer une solution.', 'On complète avec de l’eau distillée jusqu’à mon trait.'], ['Le bécher', 'L’éprouvette graduée', 'L’erlenmeyer', 'La burette', 'Le ballon']],
  ['Le facteur de dilution', ['Je suis sans unité et supérieur à 1.', 'Je compare la solution mère et la solution fille.', 'Je vaux C₀/C₁.', 'Je vaux aussi V₁/V₀.'], ['La concentration', 'Le rendement', 'La densité', 'La masse volumique', 'Le volume molaire']],
], [
  [['le bécher pour prélever 10,0 mL', 'la pipette jaugée pour prélever 10,0 mL', 'la fiole jaugée pour préparer 100,0 mL', 'la balance pour peser le soluté'], 'Le bécher n’est pas précis : on prélève un volume précis à la pipette jaugée.'],
  [['C = m·V', 'C = n/V', 'C_m = m/V', 'C_m = C·M'], 'C = m·V est faux ; les trois autres sont des relations correctes.'],
], [
  ['SOLUTION', 'Mélange d’un soluté dans un solvant'], ['PIPETTE', 'Verrerie pour prélever un volume précis'], ['SOLVANT', 'Espèce majoritaire qui dissout'],
]);
JEUX_ADD('tcc-transformation', [
  ['Le réactif limitant', ['Je disparais en premier.', 'C’est moi qui arrête la transformation.', 'Je fixe l’avancement maximal.', 'À l’état final, ma quantité est nulle.'], ['Le réactif en excès', 'Le produit', 'L’espèce spectatrice', 'Le catalyseur', 'Le solvant']],
  ['L’avancement', ['Je m’exprime en mol.', 'Je vaux 0 à l’état initial.', 'J’apparais dans le tableau d’avancement.', 'On me note x.'], ['La concentration', 'Le rendement', 'La masse molaire', 'Le coefficient stœchiométrique', 'Le volume']],
], [
  [['la dissolution du sucre', 'la combustion du méthane', 'la rouille du fer', 'la précipitation de Cu(OH)₂'], 'La dissolution du sucre est une transformation physique ; les trois autres sont chimiques.'],
  [['la masse molaire', 'l’état initial', 'l’état final', 'l’avancement maximal'], 'La masse molaire n’est pas une notion du tableau d’avancement.'],
], [
  ['AVANCEMENT', 'Grandeur x du tableau, en mol'], ['LIMITANT', 'Réactif qui disparaît en premier'], ['PRECIPITE', 'Solide qui apparaît dans une solution'],
]);
