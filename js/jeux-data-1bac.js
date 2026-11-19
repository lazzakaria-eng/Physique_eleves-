/* Contenus supplémentaires des jeux de réflexion — 1re BAC (même format que jeux-data-tc.js). */
'use strict';
/* ===================== PHYSIQUE ===================== */
JEUX_ADD('1b-rotation', [
  ['L’abscisse angulaire', ['Je repère la position d’un point d’un solide en rotation.', 'Je m’exprime en radians.', 'Je suis liée à l’abscisse curviligne par s = R·θ.', 'On me note θ.'], ['La vitesse angulaire', 'La période', 'La fréquence', 'Le rayon', 'L’accélération angulaire']],
  ['La fréquence de rotation', ['Je compte des tours par unité de temps.', 'Je m’exprime en Hz ou tr/s.', 'Je suis l’inverse de la période.', 'ω = 2π·f.'], ['La vitesse angulaire', 'L’abscisse angulaire', 'La vitesse linéaire', 'La période', 'Le moment']],
], [
  [['tous les points ont la même vitesse linéaire', 'tous les points ont la même vitesse angulaire', 'v = R·ω', 'la trajectoire de chaque point est un cercle centré sur l’axe'], 'Dans une rotation, v = R·ω dépend de la distance à l’axe : les vitesses linéaires sont différentes.'],
  [['m/s²', 'rad', 'rad/s', 'tr/min'], 'm/s² est une unité d’accélération ; les trois autres décrivent la rotation.'],
], [
  ['ROTATION', 'Mouvement autour d’un axe fixe'], ['RADIAN', 'Unité d’angle du SI'], ['ANGULAIRE', 'Vitesse … ω en rad/s'],
]);
JEUX_ADD('1b-travail', [
  ['Une force résistante', ['Mon travail est négatif.', 'L’angle entre moi et le déplacement est obtus.', 'Je m’oppose au mouvement.', 'Les frottements sont souvent un exemple.'], ['Une force motrice', 'Une force perpendiculaire au déplacement', 'Une force conservative', 'Le poids d’un corps qui descend', 'La réaction normale']],
  ['Le watt', ['Je suis une unité du SI.', 'Je vaux un joule par seconde.', 'Je mesure une puissance.', 'Mon nom est celui d’un ingénieur écossais.'], ['Le joule', 'Le newton', 'Le volt', 'L’ampère', 'Le pascal']],
], [
  [['W = F·v', 'W = F·AB·cos α', 'W(P) = m·g·(z_A − z_B)', 'P = W/Δt'], 'W = F·v est faux (c’est la puissance P = F·v) ; les trois autres sont correctes.'],
  [['la réaction normale d’un plan horizontal', 'le poids d’un corps qui descend', 'la force d’un moteur', 'la tension qui tire un traîneau'], 'La réaction normale est perpendiculaire au déplacement : son travail est nul. Les trois autres sont motrices.'],
], [
  ['MOTRICE', 'Force dont le travail est positif'], ['RESISTANTE', 'Force dont le travail est négatif'], ['JOULE', 'Unité de travail'],
]);
JEUX_ADD('1b-ec', [
  ['Le théorème de l’énergie cinétique', ['Je m’applique entre deux instants.', 'Je relie travail et énergie.', 'ΔEc = Σ W(F).', 'Je permets de calculer une vitesse sans connaître la durée.'], ['La conservation de l’énergie mécanique', 'Le principe d’inertie', 'La deuxième loi de Newton', 'Le théorème de Huygens', 'La loi de Joule']],
  ['Le moment d’inertie', ['J’interviens dans l’énergie cinétique de rotation.', 'Je m’exprime en kg·m².', 'Je dépends de la répartition des masses autour de l’axe.', 'Ec = ½ J·ω².'], ['La masse', 'La vitesse angulaire', 'Le moment d’une force', 'Le couple', 'La raideur']],
], [
  [['Ec = m·v²', 'Ec = ½ m·v²', 'Ec = ½ J·ω²', 'ΔEc = ΣW'], 'Ec = m·v² est faux : il manque le facteur ½.'],
  [['Ec peut être négative', 'Ec est toujours positive ou nulle', 'Ec dépend du référentiel', 'Ec est en joules'], 'L’énergie cinétique ne peut pas être négative.'],
], [
  ['CINETIQUE', 'Énergie liée à la vitesse'], ['THEOREME', '… de l’énergie cinétique'], ['INERTIE', 'Moment d’… J en kg·m²'],
]);
JEUX_ADD('1b-epp', [
  ['L’énergie mécanique', ['Je suis la somme de deux énergies.', 'Je me conserve sans frottement.', 'Em = Ec + Epp.', 'Je diminue quand il y a des frottements.'], ['L’énergie cinétique', 'L’énergie potentielle', 'L’énergie interne', 'La chaleur', 'Le travail']],
  ['L’état de référence', ['Je suis un choix arbitraire.', 'Pour moi, Epp = 0.', 'Je fixe l’origine de l’axe vertical.', 'Changer de moi change Epp mais pas ΔEpp.'], ['L’état final', 'L’état initial', 'Le référentiel', 'Le centre d’inertie', 'L’équilibre']],
], [
  [['Epp = m·g·v', 'Epp = m·g·z + C', 'Em = Ec + Epp', 'ΔEpp = −W(P)'], 'Epp = m·g·v est faux : l’énergie potentielle dépend de l’altitude z.'],
  [['une chute avec frottements', 'une chute libre', 'un pendule sans frottement', 'un glissement sur glace parfaite'], 'Avec frottements, l’énergie mécanique diminue ; elle se conserve dans les trois autres cas.'],
], [
  ['POTENTIELLE', 'Énergie liée à la position'], ['MECANIQUE', 'Énergie Ec + Epp'], ['ALTITUDE', 'Grandeur z dont dépend Epp'],
]);
JEUX_ADD('1b-interne', [
  ['L’énergie interne', ['Je suis l’énergie microscopique d’un système.', 'Je dépends de la température.', 'Je varie quand le système reçoit du travail ou de la chaleur.', 'On me note U.'], ['L’énergie mécanique', 'L’énergie cinétique', 'L’énergie potentielle de pesanteur', 'La puissance', 'Le travail']],
  ['Le premier principe de la thermodynamique', ['Je suis un principe de conservation.', 'Je concerne les systèmes au repos macroscopique.', 'ΔU = W + Q.', 'Je relie énergie interne, travail et chaleur.'], ['Le théorème de l’énergie cinétique', 'Le principe d’inertie', 'La loi de Joule', 'La loi de Laplace', 'La conservation de la masse']],
], [
  [['la vitesse du système', 'la température', 'l’état physique', 'les interactions microscopiques'], 'La vitesse d’ensemble n’influe pas sur l’énergie interne ; les trois autres oui.'],
  [['W = F·d pour un gaz', 'frottement : W reçu sous forme d’énergie interne', 'compression : le gaz reçoit du travail', 'ΔU = W + Q'], 'Pour un gaz, le travail de pression est W = −P·ΔV ; les trois autres sont corrects.'],
], [
  ['INTERNE', 'Énergie microscopique U'], ['AGITATION', 'Mouvement désordonné des molécules'], ['COMPRESSION', 'Diminution du volume d’un gaz'],
]);
JEUX_ADD('1b-thermique', [
  ['La capacité thermique massique', ['Je dépends du matériau.', 'Je m’exprime en J·kg⁻¹·K⁻¹.', 'Je vaux 4180 pour l’eau.', 'Q = m·c·Δθ.'], ['La chaleur latente', 'La conductivité', 'La température', 'L’énergie interne', 'La masse volumique']],
  ['La chaleur latente de fusion', ['J’interviens pendant un changement d’état.', 'Pendant moi, la température ne change pas.', 'Je m’exprime en J/kg.', 'Q = m·L pour faire fondre de la glace.'], ['La capacité thermique', 'La chaleur massique', 'L’énergie interne', 'La température de fusion', 'Le rayonnement']],
], [
  [['la diffraction', 'la conduction', 'la convection', 'le rayonnement'], 'La diffraction est un phénomène ondulatoire ; les trois autres sont des modes de transfert thermique.'],
  [['°C/J', 'J', 'J/(kg·K)', 'J/kg'], '°C/J n’est l’unité d’aucune grandeur du chapitre.'],
], [
  ['CALORIMETRE', 'Récipient isolé pour mesurer des chaleurs'], ['CONDUCTION', 'Transfert thermique de proche en proche sans mouvement de matière'], ['FUSION', 'Passage de l’état solide à l’état liquide'],
]);
JEUX_ADD('1b-champe', [
  ['Le champ électrostatique', ['Je suis une grandeur vectorielle.', 'Je m’exprime en V/m ou N/C.', 'F = q·E.', 'Je suis uniforme entre deux plaques parallèles.'], ['Le champ magnétique', 'Le champ de pesanteur', 'La force de Coulomb', 'La tension', 'Le potentiel']],
  ['La loi de Coulomb', ['Je décris une interaction à distance.', 'Je ressemble à la loi de gravitation.', 'Mon intensité est k·|q·q′|/d².', 'Je peux être attractive ou répulsive.'], ['La loi de Laplace', 'La loi d’Ohm', 'La loi de Newton', 'La loi de Snell-Descartes', 'La loi de Lenz']],
], [
  [['E en N·m', 'E en V/m', 'E en N/C', 'E = U/d entre deux plaques'], 'N·m est l’unité du moment ; le champ électrostatique s’exprime en V/m ou N/C.'],
  [['une force sur un électron dans le sens de E', 'une force sur un proton dans le sens de E', 'F = q·E', 'E dirigé vers les potentiels décroissants'], 'Pour un électron (q < 0), la force est opposée à E.'],
], [
  ['CHARGE', 'Grandeur q en coulombs'], ['COULOMB', 'Loi de l’interaction entre deux charges'], ['UNIFORME', 'Champ identique en tout point'],
]);
JEUX_ADD('1b-epe', [
  ['L’électronvolt', ['Je suis une unité d’énergie.', 'Je suis adapté à l’échelle de l’atome.', 'Je vaux 1,6 × 10⁻¹⁹ J.', 'On me note eV.'], ['Le joule', 'Le volt', 'Le coulomb', 'Le watt', 'Le kilowattheure']],
  ['Le potentiel électrique', ['Je m’exprime en volts.', 'La différence entre deux de mes valeurs est une tension.', 'Le champ E est dirigé vers mes valeurs décroissantes.', 'U_AB = V_A − V_B.'], ['Le champ électrique', 'La charge', 'L’énergie cinétique', 'La force électrique', 'L’intensité']],
], [
  [['W = q·E·d·v', 'W_AB = q·U_AB', 'Epe = q·V + C', 'ΔEc = q·U'], 'W = q·E·d·v n’est pas homogène ; les trois autres sont correctes.'],
  [['le kilogramme', 'l’électronvolt', 'le joule', 'le kilowattheure'], 'Le kilogramme est une unité de masse ; les trois autres mesurent une énergie.'],
], [
  ['POTENTIEL', 'Grandeur V dont la différence est une tension'], ['ELECTRONVOLT', 'Énergie de 1,6 × 10⁻¹⁹ J'], ['ACCELERATEUR', 'Dispositif qui augmente la vitesse des particules'],
]);
JEUX_ADD('1b-transfert', [
  ['L’effet Joule', ['Je transforme l’énergie électrique en chaleur.', 'Je suis utile dans un radiateur.', 'Je suis gênant dans les lignes électriques.', 'P = R·I².'], ['L’effet photoélectrique', 'L’induction', 'L’électrolyse', 'La force contre-électromotrice', 'Le court-circuit']],
  ['Le récepteur', ['Je reçois de l’énergie électrique.', 'Je peux la convertir en mouvement ou en chaleur.', 'Un moteur est un exemple.', 'Pour moi, U = E′ + r′·I.'], ['Le générateur', 'L’interrupteur', 'Le fil de connexion', 'Le voltmètre', 'La pile']],
], [
  [['P = U/I', 'P = U·I', 'P = R·I²', 'W = U·I·Δt'], 'P = U/I est faux : la puissance électrique est P = U·I.'],
  [['la pile qui débite', 'le moteur', 'la lampe', 'le radiateur'], 'La pile qui débite est un générateur ; les trois autres sont des récepteurs.'],
], [
  ['JOULE', 'Effet thermique du courant'], ['RECEPTEUR', 'Dipôle qui reçoit l’énergie électrique'], ['MOTEUR', 'Récepteur qui produit un travail mécanique'],
]);
JEUX_ADD('1b-global', [
  ['La loi de Pouillet', ['Je donne l’intensité d’un circuit série.', 'J’utilise E et la somme des résistances.', 'I = (E − E′)/(R + r + r′).', 'Je porte le nom d’un physicien français.'], ['La loi d’Ohm', 'La loi des nœuds', 'La loi de Joule', 'La loi de Lenz', 'La loi de Coulomb']],
  ['Le rendement d’un générateur', ['Je suis sans unité.', 'Je suis inférieur à 1.', 'Je compare la puissance fournie au circuit à la puissance totale.', 'ρ = U/E.'], ['La force électromotrice', 'La résistance interne', 'La puissance', 'L’intensité', 'La conductance']],
], [
  [['P maximale si R = 0', 'P maximale si R = r', 'I = E/(R + r)', 'P_J = r·I²'], 'La puissance transférée à R est maximale pour R = r, pas pour R = 0.'],
  [['augmenter R augmente I', 'augmenter R diminue I', 'augmenter E augmente I', 'ajouter un moteur diminue I'], 'Augmenter la résistance diminue l’intensité.'],
], [
  ['POUILLET', 'Loi I = ΣE/ΣR'], ['RENDEMENT', 'Rapport des puissances utile et totale'], ['DISTRIBUTION', 'Répartition de l’énergie dans un circuit'],
]);
JEUX_ADD('1b-champb', [
  ['La boussole', ['Je contiens une petite aiguille aimantée.', 'Je m’oriente selon le champ magnétique.', 'Mon pôle nord indique le sens du champ.', 'Les navigateurs m’utilisent.'], ['Le teslamètre', 'Le dynamomètre', 'L’ampèremètre', 'Le gyroscope', 'Le compas']],
  ['Le teslamètre', ['Je contiens souvent une sonde à effet Hall.', 'Je mesure une grandeur vectorielle.', 'Mon unité porte le nom d’un inventeur serbe.', 'Je mesure l’intensité du champ magnétique.'], ['La boussole', 'Le voltmètre', 'L’oscilloscope', 'Le galvanomètre', 'Le spectre magnétique']],
], [
  [['le cuivre', 'le fer', 'le nickel', 'le cobalt'], 'Le cuivre n’est pas attiré par un aimant ; le fer, le nickel et le cobalt sont ferromagnétiques.'],
  [['les lignes de champ se croisent', 'les lignes sortent du pôle nord', 'B est tangent aux lignes', 'les lignes sont parallèles dans un champ uniforme'], 'Deux lignes de champ ne se croisent jamais.'],
], [
  ['AIMANT', 'Objet qui crée un champ magnétique permanent'], ['NORD', 'Pôle d’un aimant d’où sortent les lignes de champ'], ['BOUSSOLE', 'Aiguille aimantée qui indique le nord'],
]);
JEUX_ADD('1b-champb-courant', [
  ['Le solénoïde', ['Je suis une bobine longue.', 'Mon champ intérieur est uniforme.', 'B = μ₀·n·I.', 'Je ressemble à un aimant droit.'], ['La spire', 'Le fil rectiligne', 'L’aimant en U', 'La bobine plate', 'Le condensateur']],
  ['La perméabilité du vide', ['Je suis une constante.', 'Je vaux 4π × 10⁻⁷ SI.', 'J’apparais dans B = μ₀·n·I.', 'On me note μ₀.'], ['La constante de Coulomb', 'La constante de gravitation', 'La permittivité', 'La vitesse de la lumière', 'La charge élémentaire']],
], [
  [['B ne dépend pas de I', 'B est proportionnel à I', 'B dépend du nombre de spires par mètre', 'B est uniforme à l’intérieur'], 'Le champ d’un solénoïde est proportionnel à l’intensité.'],
  [['le pôle sud par où sortent les lignes', 'la règle de la main droite', 'le pôle nord par où sortent les lignes', 'les faces nord et sud'], 'Les lignes de champ sortent par la face NORD.'],
], [
  ['SOLENOIDE', 'Bobine longue au champ intérieur uniforme'], ['SPIRE', 'Une boucle de fil d’une bobine'], ['OERSTED', 'Savant qui a dévié une boussole avec un courant'],
]);
JEUX_ADD('1b-laplace', [
  ['Le haut-parleur', ['Je contiens un aimant et une bobine mobile.', 'La force de Laplace fait vibrer ma membrane.', 'Je transforme un signal électrique en son.', 'On me branche à un amplificateur.'], ['Le microphone', 'Le moteur', 'La dynamo', 'Le transformateur', 'L’électroaimant']],
  ['Les rails de Laplace', ['Je suis une expérience classique.', 'Une tige mobile roule sur deux rails.', 'Un aimant en U crée un champ vertical.', 'La tige se déplace quand un courant la traverse.'], ['La roue de Barlow', 'Le pendule', 'La balance de Cotton', 'Le solénoïde', 'La boussole']],
], [
  [['F = q·E', 'F = I·L·B·sin α', 'F perpendiculaire au plan (I, B)', 'la règle des trois doigts'], 'F = q·E est la force électrique ; les trois autres concernent la force de Laplace.'],
  [['la lampe', 'le moteur électrique', 'le haut-parleur', 'la roue de Barlow'], 'La lampe ne fonctionne pas grâce à la force de Laplace.'],
], [
  ['RAILS', 'Expérience des … de Laplace'], ['ROTOR', 'Partie tournante d’un moteur'], ['MEMBRANE', 'Partie vibrante d’un haut-parleur'],
]);
JEUX_ADD('1b-visibilite', [
  ['La propagation rectiligne', ['Je suis une propriété de la lumière.', 'Je ne suis valable que dans un milieu homogène et transparent.', 'J’explique les ombres.', 'On me représente par des rayons.'], ['La réfraction', 'La réflexion', 'La diffraction', 'La dispersion', 'La diffusion']],
  ['Une source primaire', ['Je produis ma propre lumière.', 'Le Soleil en est une.', 'Une lampe allumée aussi.', 'La Lune, elle, n’en est pas une.'], ['Une source secondaire', 'Un récepteur', 'Un écran', 'Un miroir', 'Un objet diffusant']],
], [
  [['la Lune', 'le Soleil', 'une flamme', 'une lampe allumée'], 'La Lune diffuse la lumière du Soleil : c’est une source secondaire.'],
  [['un miroir', 'l’œil', 'une cellule photoélectrique', 'une pellicule photo'], 'Un miroir n’est pas un récepteur de lumière.'],
], [
  ['RECTILIGNE', 'La lumière se propage en ligne droite'], ['PENOMBRE', 'Zone partiellement éclairée'], ['DIFFUSION', 'Renvoi de la lumière dans toutes les directions'],
]);
JEUX_ADD('1b-miroir', [
  ['L’image virtuelle', ['On ne peut pas me recueillir sur un écran.', 'Je semble située derrière le miroir.', 'Je suis symétrique de l’objet.', 'C’est ce que donne un miroir plan.'], ['L’image réelle', 'L’objet réel', 'Le rayon réfléchi', 'L’ombre', 'Le foyer']],
  ['La normale', ['Je suis une droite.', 'Je suis perpendiculaire au miroir au point d’incidence.', 'Les angles sont mesurés par rapport à moi.', 'i = r de part et d’autre de moi.'], ['Le rayon incident', 'Le rayon réfléchi', 'Le plan d’incidence', 'L’axe optique', 'Le foyer']],
], [
  [['i = 2r', 'i = r', 'le rayon réfléchi est dans le plan d’incidence', 'image symétrique de l’objet'], 'La loi de la réflexion est i = r, pas i = 2r.'],
  [['image réelle', 'image virtuelle', 'image de même taille', 'image droite'], 'Un miroir plan donne une image virtuelle, droite, de même taille ; jamais réelle.'],
], [
  ['REFLEXION', 'Renvoi de la lumière par un miroir'], ['SYMETRIQUE', 'L’image est … de l’objet'], ['INCIDENCE', 'Angle entre le rayon et la normale'],
]);
JEUX_ADD('1b-lentille', [
  ['Le foyer image', ['Je suis un point de l’axe optique.', 'Les rayons parallèles à l’axe convergent en moi.', 'Je suis à une distance f′ du centre optique.', 'On me note F′.'], ['Le foyer objet', 'Le centre optique', 'L’image', 'L’objet', 'Le plan focal objet']],
  ['La vergence', ['Je caractérise une lentille.', 'Je m’exprime en dioptries.', 'Je suis l’inverse de la distance focale.', 'Je suis positive pour une lentille convergente.'], ['La distance focale', 'Le grandissement', 'Le diamètre', 'L’épaisseur', 'Le foyer']],
], [
  [['un rayon passant par F′ ressort parallèle', 'un rayon passant par O n’est pas dévié', 'un rayon parallèle à l’axe passe par F′', 'un rayon passant par F ressort parallèle'], 'C’est un rayon passant par F (foyer OBJET) qui ressort parallèle à l’axe.'],
  [['mètre⁻¹ pour f′', 'dioptrie', 'm', 'sans unité pour γ'], 'f′ s’exprime en mètres ; m⁻¹ (dioptrie) est l’unité de la vergence.'],
], [
  ['CONVERGENTE', 'Lentille à bords minces'], ['DIOPTRIE', 'Unité de vergence'], ['GRANDISSEMENT', 'Rapport A′B′/AB'],
]);
JEUX_ADD('1b-instruments', [
  ['Le microscope', ['J’ai deux systèmes convergents.', 'Mon objectif a une très petite distance focale.', 'Je permets d’observer des objets très petits.', 'Les biologistes m’utilisent.'], ['La lunette astronomique', 'La loupe', 'Le télescope', 'Le périscope', 'L’appareil photo']],
  ['Le cercle oculaire', ['J’existe pour un microscope ou une lunette.', 'Je suis l’image de l’objectif par l’oculaire.', 'Tous les rayons sortants passent par moi.', 'On y place l’œil.'], ['Le foyer image', 'Le centre optique', 'L’objectif', 'Le diaphragme', 'L’oculaire']],
], [
  [['le miroir plan', 'la loupe', 'le microscope', 'la lunette astronomique'], 'Le miroir plan ne grossit pas ; les trois autres utilisent des lentilles convergentes.'],
  [['grossissement en dioptries', 'G = α′/α', 'puissance P = α′/AB', 'P en dioptries'], 'Le grossissement est sans unité ; c’est la puissance qui s’exprime en dioptries.'],
], [
  ['MICROSCOPE', 'Instrument pour voir les très petits objets'], ['OCULAIRE', 'Lentille placée côté œil'], ['OBJECTIF', 'Lentille placée côté objet'],
]);

/* ===================== CHIMIE ===================== */
JEUX_ADD('1bc-grandeurs', [
  ['Le volume molaire', ['Je concerne les gaz.', 'Je dépends de la température et de la pression.', 'Je vaux environ 24 L/mol à 20 °C sous 1 atm.', 'n = V/V_m.'], ['La masse molaire', 'La concentration', 'La masse volumique', 'La constante R', 'La pression']],
  ['L’équation d’état des gaz parfaits', ['Je relie quatre grandeurs.', 'Je m’applique aux gaz à faible pression.', 'J’utilise la constante R = 8,31 SI.', 'P·V = n·R·T.'], ['La loi de Boyle-Mariotte', 'La loi d’Avogadro', 'La relation n = m/M', 'La loi de Kohlrausch', 'La loi d’Ohm']],
], [
  [['T en °C dans PV = nRT', 'P en pascals', 'V en m³', 'T en kelvins'], 'Dans PV = nRT, la température doit être en kelvins.'],
  [['ρ = n·M', 'n = m/M', 'n = ρ·V/M', 'm = ρ·V'], 'ρ = n·M est faux ; les trois autres sont correctes.'],
], [
  ['PASCAL', 'Unité de pression'], ['KELVIN', 'Unité de température absolue'], ['PARFAIT', 'Gaz … : PV = nRT'],
]);
JEUX_ADD('1bc-electrolytes', [
  ['Un électrolyte', ['Je contiens des ions.', 'Je conduis le courant électrique.', 'NaCl dissous dans l’eau en est un.', 'Le sucre dissous n’en est pas un.'], ['Un solvant', 'Un isolant', 'Une molécule polaire', 'Un précipité', 'Un catalyseur']],
  ['Une molécule polaire', ['Le barycentre de mes charges + et − ne coïncide pas.', 'Je contiens des atomes d’électronégativités différentes.', 'Je suis un bon solvant pour les ions.', 'L’eau en est un exemple.'], ['Une molécule apolaire', 'Un ion', 'Un cristal ionique', 'Un atome', 'Un gaz noble']],
], [
  [['le sucre dans l’eau', 'le sel dans l’eau', 'l’acide chlorhydrique', 'le sulfate de cuivre dans l’eau'], 'Le sucre dissous ne donne pas d’ions : la solution n’est pas électrolytique.'],
  [['[Cl⁻] = C dans CaCl₂', '[Ca²⁺] = C dans CaCl₂', '[Cl⁻] = 2C dans CaCl₂', 'électroneutralité : 2[Ca²⁺] = [Cl⁻]'], 'Dans CaCl₂ à C, [Cl⁻] = 2C, pas C.'],
], [
  ['ELECTROLYTE', 'Substance qui donne des ions en solution'], ['SOLVATATION', 'Ions entourés de molécules d’eau'], ['POLAIRE', 'Molécule comme l’eau'],
]);
JEUX_ADD('1bc-suivi', [
  ['Le tableau d’avancement', ['Je décris un système au cours d’une transformation.', 'J’ai une ligne état initial et une ligne état final.', 'J’utilise x et x_max.', 'Je permets de trouver le réactif limitant.'], ['L’équation chimique', 'La courbe d’étalonnage', 'Le spectre', 'La classification périodique', 'Le diagramme de prédominance']],
  ['Le mélange stœchiométrique', ['Je suis un état initial particulier.', 'Dans mon cas, les réactifs sont dans les proportions de l’équation.', 'Tous les réactifs disparaissent ensemble.', 'Aucun réactif n’est en excès.'], ['Le réactif limitant', 'L’état d’équilibre', 'Le mélange racémique', 'Le mélange azéotrope', 'L’excès']],
], [
  [['la masse molaire', 'la pression', 'la conductance', 'le volume de gaz'], 'La masse molaire est constante : elle ne permet pas de suivre l’avancement ; les trois autres grandeurs varient au cours de la transformation.'],
  [['x_max dépend du réactif en excès', 'x_max est fixé par le réactif limitant', 'n(produit) = coefficient × x', 'n(réactif) = n₀ − coefficient × x'], 'x_max est fixé par le réactif limitant, pas par celui en excès.'],
], [
  ['AVANCEMENT', 'Grandeur x en mol'], ['SUIVI', 'Étude d’une transformation au cours du temps'], ['EXCES', 'Réactif qui reste à la fin'],
]);
JEUX_ADD('1bc-conductimetrie', [
  ['La conductance', ['Je suis l’inverse d’une résistance.', 'Je m’exprime en siemens.', 'G = I/U.', 'Je dépends de la cellule et de la solution.'], ['La conductivité', 'La résistivité', 'La concentration', 'La tension', 'La constante de cellule']],
  ['La conductivité molaire ionique', ['Je caractérise un ion.', 'Je m’exprime en S·m²·mol⁻¹.', 'Je suis très grande pour H₃O⁺ et HO⁻.', 'On me note λ.'], ['La conductance', 'La conductivité', 'La concentration', 'La constante de cellule', 'La masse molaire']],
], [
  [['un courant continu', 'un GBF', 'une tension alternative', 'une cellule à deux plaques'], 'En conductimétrie on utilise une tension ALTERNATIVE pour éviter l’électrolyse.'],
  [['σ = λ·C·V', 'σ = Σλᵢ·[Xᵢ]', 'G = k·σ', 'G = I/U'], 'σ = λ·C·V est faux ; les trois autres sont correctes.'],
], [
  ['CELLULE', 'Deux plaques plongées dans la solution'], ['SIEMENS', 'Unité de conductance'], ['ETALONNAGE', 'Courbe G = f(C) pour doser'],
]);
JEUX_ADD('1bc-acidobase', [
  ['Une base selon Brønsted', ['Je suis une espèce chimique.', 'J’ai un doublet non liant.', 'Je capte un proton H⁺.', 'NH₃ et HO⁻ en sont des exemples.'], ['Un acide', 'Un oxydant', 'Un réducteur', 'Un ion spectateur', 'Un ampholyte']],
  ['Un ampholyte', ['Je suis à la fois acide et base.', 'J’appartiens à deux couples.', 'L’eau en est un exemple.', 'HCO₃⁻ aussi.'], ['Un acide fort', 'Une base forte', 'Un indicateur coloré', 'Un oxydant', 'Un sel']],
], [
  [['Cl⁻', 'HCl', 'CH₃COOH', 'NH₄⁺'], 'Cl⁻ n’est pas un acide ; HCl, CH₃COOH et NH₄⁺ peuvent céder un proton.'],
  [['Fe²⁺/Fe', 'NH₄⁺/NH₃', 'CH₃COOH/CH₃COO⁻', 'H₃O⁺/H₂O'], 'Fe²⁺/Fe est un couple oxydant/réducteur ; les trois autres sont acide/base.'],
], [
  ['BRONSTED', 'Chimiste qui définit l’acide comme donneur de H⁺'], ['PROTON', 'Particule H⁺ échangée'], ['AMPHOLYTE', 'Espèce à la fois acide et base'],
]);
JEUX_ADD('1bc-redox', [
  ['Un réducteur', ['Je suis une espèce chimique.', 'Je cède des électrons.', 'Je subis une oxydation.', 'Les métaux comme Zn et Fe en sont de bons exemples.'], ['Un oxydant', 'Un acide', 'Une base', 'Un catalyseur', 'Un ion spectateur']],
  ['Une demi-équation électronique', ['J’associe les deux membres d’un couple.', 'J’ai des électrons e⁻.', 'Je dois être équilibrée en atomes et en charges.', 'Cu²⁺ + 2e⁻ ⇌ Cu en est un exemple.'], ['Une équation bilan', 'Un tableau d’avancement', 'Un couple acide/base', 'Une loi de Kohlrausch', 'Une formule brute']],
], [
  [['H₃O⁺/H₂O', 'Cu²⁺/Cu', 'Fe³⁺/Fe²⁺', 'MnO₄⁻/Mn²⁺'], 'H₃O⁺/H₂O est un couple acide/base ; les trois autres sont des couples ox/red.'],
  [['oxydation = gain d’électrons', 'réduction = gain d’électrons', 'l’oxydant est réduit', 'le réducteur est oxydé'], 'L’oxydation est une PERTE d’électrons.'],
], [
  ['ELECTRONS', 'Particules échangées en oxydoréduction'], ['REDUCTION', 'Gain d’électrons'], ['OXYDATION', 'Perte d’électrons'],
]);
JEUX_ADD('1bc-dosages', [
  ['La burette graduée', ['Je contiens la solution titrante.', 'J’ai un robinet.', 'On lit sur moi le volume versé.', 'On me remplit puis on ajuste au zéro.'], ['La pipette jaugée', 'Le bécher', 'L’erlenmeyer', 'La fiole jaugée', 'L’éprouvette']],
  ['L’indicateur coloré', ['Je change de couleur.', 'J’indique l’équivalence.', 'Il me faut une zone de virage adaptée.', 'La phénolphtaléine en est un.'], ['La solution titrante', 'Le réactif titré', 'Le pH-mètre', 'Le conductimètre', 'L’agitateur magnétique']],
], [
  [['la fiole jaugée pour verser la solution titrante', 'la burette pour verser la solution titrante', 'la pipette pour prélever la solution titrée', 'l’agitateur pour homogénéiser'], 'La solution titrante est versée à la burette, pas à la fiole jaugée.'],
  [['à l’équivalence, le réactif titré est en excès', 'à l’équivalence, les réactifs sont dans les proportions stœchiométriques', 'C_A·V_A = C_B·V_E pour une réaction 1:1', 'l’équivalence est repérée par un changement'], 'À l’équivalence, aucun réactif n’est en excès.'],
], [
  ['BURETTE', 'Verrerie qui délivre la solution titrante'], ['TITRANTE', 'Solution de concentration connue'], ['VIRAGE', 'Changement de couleur d’un indicateur'],
]);
JEUX_ADD('1bc-squelettes', [
  ['Une chaîne ramifiée', ['Je suis un type de squelette carboné.', 'J’ai au moins un carbone lié à trois ou quatre autres carbones.', 'Le méthylpropane me possède.', 'Je ne suis ni linéaire ni cyclique.'], ['Une chaîne linéaire', 'Une chaîne cyclique', 'Une chaîne insaturée', 'Un groupe fonctionnel', 'Une double liaison']],
  ['Des isomères', ['Nous avons la même formule brute.', 'Nos formules développées sont différentes.', 'Nos propriétés peuvent différer.', 'Le butane et le méthylpropane en sont.'], ['Des isotopes', 'Des homologues', 'Des polymères', 'Des ions', 'Des allotropes']],
], [
  [['C₂H₄', 'C₂H₆', 'C₃H₈', 'C₄H₁₀'], 'C₂H₄ est un alcène (insaturé) ; les trois autres sont des alcanes CₙH₂ₙ₊₂.'],
  [['propanol', 'méthane', 'éthane', 'butane'], 'Le propanol est un alcool ; les trois autres sont des alcanes.'],
], [
  ['CYCLIQUE', 'Chaîne carbonée fermée'], ['ISOMERE', 'Même formule brute, structure différente'], ['RAMIFIEE', 'Chaîne avec des branches'],
]);
JEUX_ADD('1bc-groupes', [
  ['Le groupe carbonyle', ['Je contiens une double liaison C=O.', 'Je suis présent dans deux familles.', 'Je donne un aldéhyde en bout de chaîne.', 'Je donne une cétone au milieu de la chaîne.'], ['Le groupe hydroxyle', 'Le groupe carboxyle', 'Le groupe amine', 'Le groupe ester', 'La double liaison C=C']],
  ['Le test à la 2,4-DNPH', ['Je suis un test d’identification.', 'Je donne un précipité jaune-orangé.', 'Je suis positif pour les aldéhydes et les cétones.', 'Je détecte le groupe carbonyle.'], ['Le test à la liqueur de Fehling', 'Le test à l’eau de chaux', 'Le test au BBT', 'Le test à la flamme', 'Le test au sulfate de cuivre anhydre']],
], [
  [['un alcool tertiaire oxydé en cétone', 'un alcool primaire oxydé en aldéhyde', 'un alcool secondaire oxydé en cétone', 'un aldéhyde oxydé en acide carboxylique'], 'Un alcool tertiaire ne subit pas d’oxydation ménagée.'],
  [['propanone', 'éthanal', 'propanal', 'méthanal'], 'La propanone est une cétone ; les trois autres sont des aldéhydes.'],
], [
  ['ALDEHYDE', 'Famille de l’éthanal'], ['CETONE', 'Famille de la propanone'], ['HYDROXYLE', 'Groupe –OH des alcools'],
]);
