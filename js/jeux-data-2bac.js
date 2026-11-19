/* Contenus supplémentaires des jeux de réflexion — 2e BAC (même format que jeux-data-tc.js). */
'use strict';
/* ===================== PHYSIQUE ===================== */
JEUX_ADD('2b-ondes', [
  ['Une onde transversale', ['Je suis une onde mécanique.', 'La perturbation est perpendiculaire à ma direction de propagation.', 'Je me propage le long d’une corde.', 'Les vagues à la surface de l’eau me ressemblent.'], ['Une onde longitudinale', 'Une onde électromagnétique', 'Une onde stationnaire', 'Une onde sonore', 'Un rayon lumineux']],
  ['Le retard', ['Je suis une durée.', 'Je sépare deux points touchés par la même perturbation.', 'τ = d/v.', 'Le point le plus éloigné de la source reproduit le mouvement de la source avec moi.'], ['La période', 'La célérité', 'La longueur d’onde', 'La fréquence', 'L’amplitude']],
], [
  [['la matière avance avec l’onde', 'l’onde transporte de l’énergie', 'l’onde a besoin d’un milieu matériel', 'la célérité dépend du milieu'], 'Une onde mécanique transporte de l’énergie sans transport de matière.'],
  [['la lumière', 'le son', 'la ride sur l’eau', 'l’onde sur une corde'], 'La lumière n’est pas une onde mécanique : elle se propage dans le vide.'],
], [
  ['CELERITE', 'Vitesse de propagation d’une onde'], ['RETARD', 'Durée τ = d/v'], ['LONGITUDINALE', 'Onde dont la perturbation est parallèle à la propagation'],
]);
JEUX_ADD('2b-ondes-per', [
  ['La double périodicité', ['Je caractérise une onde progressive sinusoïdale.', 'Je suis à la fois temporelle et spatiale.', 'La période T et la longueur d’onde λ me décrivent.', 'λ = v·T me relie.'], ['La diffraction', 'La dispersion', 'L’amortissement', 'La résonance', 'La modulation']],
  ['La stroboscopie', ['Je permets d’observer un mouvement rapide comme immobile.', 'J’utilise des éclairs lumineux réguliers.', 'Si ma fréquence égale celle de l’onde, elle semble figée.', 'On m’utilise avec une cuve à ondes.'], ['La diffraction', 'L’oscilloscope', 'La chronophotographie', 'L’interférométrie', 'Le sonar']],
], [
  [['λ = v/T', 'λ = v·T', 'λ = v/f', 'v = λ·f'], 'λ = v/T est faux : λ = v·T = v/f.'],
  [['deux points distants de λ/2 vibrent en phase', 'deux points distants de λ vibrent en phase', 'deux points distants de λ/2 vibrent en opposition', 'la diffraction est marquée si a ≈ λ'], 'Deux points distants de λ/2 vibrent en opposition de phase.'],
], [
  ['PERIODIQUE', 'Onde dont la perturbation se répète'], ['STROBOSCOPE', 'Appareil qui émet des éclairs réguliers'], ['DIFFRACTION', 'Étalement d’une onde après une ouverture'],
]);
JEUX_ADD('2b-lumiere', [
  ['L’indice de réfraction', ['Je suis sans unité.', 'Je suis supérieur ou égal à 1.', 'n = c/v.', 'Je dépends de la fréquence : c’est la dispersion.'], ['La longueur d’onde', 'La célérité', 'L’angle de réfraction', 'La fréquence', 'L’écart angulaire']],
  ['L’écart angulaire', ['Je caractérise une figure de diffraction.', 'Je m’exprime en radians.', 'θ = λ/a.', 'Je suis le demi-angle de la tache centrale.'], ['L’indice de réfraction', 'L’angle d’incidence', 'La longueur d’onde', 'La largeur de la fente', 'L’angle de déviation']],
], [
  [['la fréquence change en passant dans l’eau', 'la longueur d’onde change en passant dans l’eau', 'la célérité diminue dans l’eau', 'n = c/v'], 'La fréquence d’une onde lumineuse ne change pas en changeant de milieu.'],
  [['lumière dans le vide à 340 m/s', 'lumière dans le vide à 3 × 10⁸ m/s', 'λ du visible entre 400 et 800 nm', 'lumière monochromatique : une seule fréquence'], 'La lumière se propage à 3 × 10⁸ m/s dans le vide ; 340 m/s est la vitesse du son dans l’air.'],
], [
  ['DISPERSION', 'Décomposition de la lumière blanche par un prisme'], ['SPECTRE', 'Ensemble des radiations d’une lumière'], ['PRISME', 'Bloc de verre qui décompose la lumière'],
]);
JEUX_ADD('2b-radioactivite', [
  ['La constante radioactive', ['Je caractérise un radionucléide.', 'Je m’exprime en s⁻¹.', 'Je suis liée à la demi-vie par λ·t₁/₂ = ln 2.', 'J’apparais dans N = N₀·e^(−λt).'], ['La demi-vie', 'L’activité', 'Le nombre de masse', 'La constante de temps', 'L’énergie de liaison']],
  ['La désintégration β⁻', ['Je transforme un neutron en proton.', 'J’émets un électron.', 'Le numéro atomique augmente de 1.', 'Le nombre de masse ne change pas.'], ['La désintégration α', 'La désintégration β⁺', 'L’émission γ', 'La fission', 'La fusion']],
], [
  [['la fusion', 'α', 'β⁻', 'β⁺'], 'La fusion est une réaction nucléaire provoquée ; α, β⁻ et β⁺ sont des désintégrations spontanées.'],
  [['chauffer accélère la désintégration', 'la désintégration est aléatoire', 'la désintégration est spontanée', 'l’activité diminue au cours du temps'], 'La désintégration ne dépend ni de la température ni de la pression.'],
], [
  ['RADIOACTIVITE', 'Désintégration spontanée de noyaux instables'], ['ACTIVITE', 'Nombre de désintégrations par seconde'], ['DATATION', 'Détermination de l’âge grâce au carbone 14'],
]);
JEUX_ADD('2b-noyaux', [
  ['Le défaut de masse', ['Je suis toujours positif pour un noyau stable.', 'Je compare la masse des nucléons séparés à celle du noyau.', 'Δm = Z·m_p + (A − Z)·m_n − m(noyau).', 'Multiplié par c², je donne l’énergie de liaison.'], ['L’énergie de liaison', 'Le nombre de masse', 'La masse molaire', 'L’unité de masse atomique', 'La demi-vie']],
  ['La fusion nucléaire', ['Je libère beaucoup d’énergie.', 'Je réunis deux noyaux légers.', 'J’exige des températures énormes.', 'Je suis la source d’énergie des étoiles.'], ['La fission', 'La désintégration α', 'La radioactivité β⁻', 'La combustion', 'L’électrolyse']],
], [
  [['E = m·c', 'E = m·c²', 'E_ℓ = Δm·c²', '1 u ≈ 931,5 MeV/c²'], 'E = m·c n’est pas homogène : la relation d’Einstein est E = m·c².'],
  [['la combustion du charbon', 'la fission de l’uranium 235', 'la fusion du deutérium et du tritium', 'la désintégration α du radium'], 'La combustion est une réaction chimique ; les trois autres sont des réactions nucléaires.'],
], [
  ['MASSE', 'Le noyau en a moins que ses nucléons séparés'], ['EINSTEIN', 'Savant de E = mc²'], ['NUCLEON', 'Proton ou neutron'],
]);
JEUX_ADD('2b-rc', [
  ['La capacité d’un condensateur', ['Je caractérise un condensateur.', 'Je m’exprime en farads.', 'q = C·u_C.', 'J’apparais dans τ = R·C.'], ['La charge', 'La constante de temps', 'L’inductance', 'La résistance', 'L’énergie électrique']],
  ['La charge d’un condensateur', ['Je suis exprimée en coulombs.', 'Je suis portée par l’armature positive.', 'Ma dérivée par rapport au temps est l’intensité.', 'q = C·u_C.'], ['La capacité', 'La tension', 'L’énergie', 'La constante de temps', 'L’intensité']],
], [
  [['u_C discontinue à la fermeture', 'u_C continue', 'i = C·du_C/dt', 'τ = R·C'], 'La tension aux bornes d’un condensateur est toujours continue.'],
  [['E = ½·C·u', 'E = ½·C·u²', 'E = q²/(2C)', 'E = ½·q·u'], 'E = ½·C·u est faux : l’énergie stockée vaut ½·C·u².'],
], [
  ['DECHARGE', 'Le condensateur se vide dans le conducteur ohmique'], ['FARAD', 'Unité de capacité'], ['ARMATURE', 'Plaque conductrice d’un condensateur'],
]);
JEUX_ADD('2b-rl', [
  ['L’inductance', ['Je caractérise une bobine.', 'Je m’exprime en henrys.', 'u = r·i + L·di/dt.', 'J’apparais dans τ = L/R.'], ['La capacité', 'La résistance interne', 'La constante de temps', 'Le flux', 'La force électromotrice']],
  ['La bobine', ['Je retarde l’établissement du courant.', 'Je retarde aussi la rupture du courant.', 'L’intensité qui me traverse est continue.', 'Je stocke une énergie ½·L·i².'], ['Le condensateur', 'Le conducteur ohmique', 'La diode', 'Le générateur', 'L’interrupteur']],
], [
  [['i discontinue dans une bobine', 'i continue dans une bobine', 'u_L = L·di/dt pour r = 0', 'τ = L/R'], 'L’intensité qui traverse une bobine est toujours continue.'],
  [['τ = R/L', 'τ = L/R', 'τ = R·C', 'T₀ = 2π√(LC)'], 'τ = R/L est faux : pour un dipôle RL, τ = L/R.'],
], [
  ['INDUCTANCE', 'Grandeur L d’une bobine'], ['HENRY', 'Unité d’inductance'], ['RUPTURE', 'Ouverture du circuit : la bobine la retarde'],
]);
JEUX_ADD('2b-rlc', [
  ['La pseudo-période', ['J’existe en régime pseudo-périodique.', 'Je suis légèrement supérieure à la période propre.', 'Je sépare deux maxima successifs.', 'On me note T.'], ['La période propre', 'La constante de temps', 'La fréquence', 'L’amplitude', 'La demi-vie']],
  ['Le régime apériodique', ['J’apparais quand la résistance est grande.', 'Je n’ai aucune oscillation.', 'Le condensateur se décharge lentement.', 'Je ressemble à une décharge RC.'], ['Le régime pseudo-périodique', 'Le régime périodique', 'Le régime critique', 'Le régime forcé', 'La résonance']],
], [
  [['l’énergie totale se conserve avec R ≠ 0', 'l’énergie s’échange entre C et L', 'l’amortissement est dû à R', 'E = ½·C·u² + ½·L·i²'], 'Avec R ≠ 0, l’énergie totale diminue par effet Joule.'],
  [['T₀ = 2π√(L/C)', 'T₀ = 2π√(LC)', 'q(t) = Q_m·cos(2πt/T₀)', 'oscillations non amorties si R = 0'], 'T₀ = 2π√(L/C) est faux : la période propre est T₀ = 2π√(LC).'],
], [
  ['AMORTISSEMENT', 'Diminution de l’amplitude'], ['OSCILLATIONS', 'Variations périodiques de q et de i'], ['ENTRETIEN', 'Compensation des pertes par un générateur'],
]);
JEUX_ADD('2b-rlc-force', [
  ['L’impédance', ['Je m’exprime en ohms.', 'Je relie les valeurs efficaces.', 'U = Z·I.', 'À la résonance, je suis minimale et égale à R.'], ['La résistance', 'La réactance', 'La puissance', 'La pulsation', 'Le déphasage']],
  ['Le facteur de qualité', ['Je suis sans unité.', 'Je mesure l’acuité de la résonance.', 'Q = f₀/Δf.', 'Plus je suis grand, plus la résonance est aiguë.'], ['La bande passante', 'L’impédance', 'Le déphasage', 'La fréquence propre', 'La puissance moyenne']],
], [
  [['à la résonance, Z est maximale', 'à la résonance, f = f₀', 'à la résonance, I est maximale', 'à la résonance, u et i sont en phase'], 'À la résonance d’intensité, l’impédance est minimale (Z = R).'],
  [['Q = Δf/f₀', 'Q = f₀/Δf', 'U = Z·I', 'P = U·I·cos φ'], 'Q = Δf/f₀ est faux : le facteur de qualité est Q = f₀/Δf.'],
], [
  ['PULSATION', 'Grandeur ω = 2πf'], ['IMPEDANCE', 'Grandeur Z en ohms'], ['EFFICACE', 'Valeur U ou I lue au voltmètre'],
]);
JEUX_ADD('2b-ondes-em', [
  ['Une onde électromagnétique', ['Je n’ai pas besoin de milieu matériel.', 'Je me propage à 3 × 10⁸ m/s dans le vide.', 'Je suis formée d’un champ électrique et d’un champ magnétique.', 'Les ondes radio et la lumière en font partie.'], ['Une onde sonore', 'Une onde sur une corde', 'Une onde sismique', 'Une ride sur l’eau', 'Une onde de compression']],
  ['L’antenne', ['Je suis un conducteur.', 'Je peux émettre ou recevoir.', 'Je convertis un signal électrique en onde électromagnétique.', 'On me trouve sur les toits et les téléphones.'], ['Le haut-parleur', 'Le microphone', 'La diode', 'Le filtre', 'Le multiplieur']],
], [
  [['le son', 'les ondes radio', 'les rayons X', 'la lumière visible'], 'Le son est une onde mécanique ; les trois autres sont électromagnétiques.'],
  [['les ondes EM ont besoin d’air', 'les ondes EM se propagent dans le vide', 'c = 3 × 10⁸ m/s', 'λ = c/f'], 'Les ondes électromagnétiques n’ont pas besoin de milieu matériel.'],
], [
  ['ANTENNE', 'Conducteur qui émet ou reçoit les ondes'], ['PORTEUSE', 'Onde de haute fréquence qui transporte l’information'], ['RADIO', 'Ondes EM utilisées pour la diffusion d’émissions'],
]);
JEUX_ADD('2b-modulation', [
  ['Le multiplieur', ['Je suis un circuit intégré.', 'J’ai deux entrées et une sortie.', 'Ma sortie vaut k·x·y.', 'On m’utilise pour moduler en amplitude.'], ['L’amplificateur', 'Le détecteur d’enveloppe', 'Le filtre passe-haut', 'Le transistor', 'La diode']],
  ['Le détecteur d’enveloppe', ['Je fais partie de la démodulation.', 'Je contiens une diode.', 'Je contiens aussi un circuit RC parallèle.', 'Je récupère l’enveloppe du signal modulé.'], ['Le multiplieur', 'L’antenne', 'Le filtre passe-bas seul', 'Le circuit LC', 'Le générateur']],
], [
  [['taux de modulation m > 1 pour une bonne modulation', 'm < 1 pour une bonne modulation', 'F_p ≫ f_s', 'u(t) = A·(1 + m·cos 2πf_s t)·cos 2πF_p t'], 'Pour une bonne modulation, il faut m < 1 (sinon surmodulation).'],
  [['la pile', 'la diode', 'le condensateur', 'le circuit LC d’accord'], 'La pile n’est pas un élément de la chaîne de réception d’un signal AM.'],
], [
  ['SIGNAL', 'Information à transmettre'], ['DEMODULATION', 'Récupération du signal à la réception'], ['ENVELOPPE', 'Courbe qui suit les maxima du signal modulé'],
]);
JEUX_ADD('2b-newton', [
  ['Le vecteur accélération', ['Je suis la dérivée du vecteur vitesse.', 'Je m’exprime en m/s².', 'Dans un mouvement circulaire uniforme, je suis centripète.', 'Σ F = m·a me relie aux forces.'], ['Le vecteur vitesse', 'Le vecteur position', 'Le vecteur force', 'La quantité de mouvement', 'Le vecteur déplacement']],
  ['Un référentiel galiléen', ['Le principe d’inertie est vérifié dans le mien.', 'Je suis en translation rectiligne uniforme par rapport à un autre de mon espèce.', 'Le référentiel terrestre l’est approximativement.', 'Les lois de Newton s’y appliquent.'], ['Un référentiel tournant', 'Un repère de Frenet', 'Un référentiel accéléré', 'Un repère cartésien', 'Un référentiel quelconque']],
], [
  [['Σ F = m·v', 'Σ F = m·a', 'a = dv/dt', 'F_A/B = −F_B/A'], 'Σ F = m·v est faux : la 2ᵉ loi de Newton s’écrit Σ F = m·a.'],
  [['un manège qui tourne', 'le référentiel terrestre', 'le référentiel géocentrique', 'le référentiel héliocentrique'], 'Un manège en rotation n’est pas galiléen ; les trois autres le sont (approximativement).'],
], [
  ['ACCELERATION', 'Dérivée de la vitesse par rapport au temps'], ['GALILEEN', 'Référentiel où le principe d’inertie est vérifié'], ['NEWTON', 'Savant des trois lois du mouvement'],
]);
JEUX_ADD('2b-chute', [
  ['La vitesse limite', ['J’apparais dans une chute avec frottements.', 'Je suis atteinte en régime permanent.', 'Les forces s’y compensent.', 'Dans mon cas, l’accélération est nulle.'], ['La vitesse initiale', 'La vitesse angulaire', 'La célérité', 'La vitesse moyenne', 'La vitesse de libération']],
  ['La méthode d’Euler', ['Je suis une méthode numérique.', 'Je résous pas à pas une équation différentielle.', 'J’utilise un pas de calcul Δt.', 'v(t + Δt) = v(t) + a(t)·Δt.'], ['La méthode graphique', 'La loi de Stokes', 'Le principe d’inertie', 'La chronophotographie', 'L’analyse dimensionnelle']],
], [
  [['une plume dans l’air', 'une bille dans le vide', 'un objet lâché sur la Lune', 'une pierre dans le vide'], 'Une plume dans l’air subit des frottements importants : ce n’est pas une chute libre.'],
  [['la masse influence la chute libre', 'en chute libre a = g', 'en chute libre v = g·t + v₀', 'en chute libre, seul le poids agit'], 'En chute libre, le mouvement ne dépend pas de la masse.'],
], [
  ['FROTTEMENT', 'Force qui s’oppose au mouvement dans un fluide'], ['LIMITE', 'Vitesse atteinte en régime permanent'], ['ARCHIMEDE', 'Savant de la poussée d’un fluide'],
]);
JEUX_ADD('2b-plans', [
  ['La flèche', ['Je suis un point particulier d’une trajectoire parabolique.', 'En moi, la composante verticale de la vitesse est nulle.', 'Je suis le point le plus haut.', 'On me note souvent S.'], ['La portée', 'L’origine', 'Le point d’impact', 'Le foyer', 'L’angle de tir']],
  ['La portée', ['Je suis une distance horizontale.', 'Je dépends de la vitesse initiale et de l’angle de tir.', 'Je suis maximale pour un tir à 45° sur un sol horizontal.', 'Je sépare le point de lancement du point de retombée.'], ['La flèche', 'La hauteur maximale', 'L’abscisse du sommet', 'La trajectoire', 'La vitesse initiale']],
], [
  [['a_x = −g', 'a_x = 0', 'a_y = −g', 'v_x = v₀·cos α'], 'Pour un projectile, l’accélération horizontale est nulle : a_x = 0.'],
  [['une droite pour un projectile lancé obliquement', 'une parabole pour un projectile', 'un mouvement uniforme selon l’horizontale', 'un mouvement uniformément varié selon la verticale'], 'Un projectile lancé obliquement décrit une parabole, pas une droite.'],
], [
  ['PARABOLE', 'Trajectoire d’un projectile'], ['PORTEE', 'Distance horizontale de tir'], ['PROJECTILE', 'Objet lancé soumis à son seul poids'],
]);
JEUX_ADD('2b-satellites', [
  ['Un satellite géostationnaire', ['Je tourne dans le plan de l’équateur.', 'Ma période est de 24 h environ.', 'Je suis à environ 36 000 km d’altitude.', 'Je parais immobile depuis la Terre.'], ['La Lune', 'La station spatiale internationale', 'Un satellite polaire', 'Une comète', 'Une sonde spatiale']],
  ['La deuxième loi de Kepler', ['Je concerne les aires.', 'Je dis que le rayon vecteur balaie des aires égales en des durées égales.', 'J’explique pourquoi une planète va plus vite près du Soleil.', 'On m’appelle aussi loi des aires.'], ['La première loi de Kepler', 'La troisième loi de Kepler', 'La loi de gravitation', 'Le principe d’inertie', 'La deuxième loi de Newton']],
], [
  [['un satellite en orbite ne subit aucune force', 'le mouvement circulaire est uniforme', 'l’accélération est centripète', 'v = √(GM/r)'], 'Un satellite subit la force de gravitation de la Terre.'],
  [['T²/r = constante', 'T²/r³ = constante', 'T = 2π·r/v', 'v = √(GM/r)'], 'La 3ᵉ loi de Kepler est T²/r³ = constante.'],
], [
  ['KEPLER', 'Astronome des trois lois des planètes'], ['ORBITE', 'Trajectoire d’un satellite'], ['GRAVITATION', 'Force qui maintient un satellite en orbite'],
]);
JEUX_ADD('2b-rotation', [
  ['La relation fondamentale de la dynamique en rotation', ['Je m’applique à un solide tournant autour d’un axe fixe.', 'J’utilise le moment d’inertie.', 'Σ M = J·θ̈.', 'Je suis l’équivalent de Σ F = m·a pour la rotation.'], ['Le théorème de l’énergie cinétique', 'Le principe d’inertie', 'La loi de Hooke', 'La loi de Kepler', 'Le théorème de Huygens']],
  ['L’accélération angulaire', ['Je suis la dérivée de la vitesse angulaire.', 'Je m’exprime en rad/s².', 'Je suis constante dans une rotation uniformément variée.', 'On me note θ̈.'], ['La vitesse angulaire', 'L’abscisse angulaire', 'Le moment d’inertie', 'Le moment d’une force', 'La fréquence']],
], [
  [['kg', 'kg·m²', 'N·m', 'rad/s²'], 'Le kg est une unité de masse ; les trois autres sont des grandeurs de la rotation (J, M, θ̈).'],
  [['J ne dépend pas de la répartition des masses', 'J s’exprime en kg·m²', 'Ec = ½·J·ω²', 'Σ M = J·θ̈'], 'Le moment d’inertie dépend de la répartition des masses autour de l’axe.'],
], [
  ['ANGULAIRE', 'Accélération … en rad/s²'], ['ROTATION', 'Mouvement autour d’un axe'], ['TORSION', 'Couple de … d’un fil'],
]);
JEUX_ADD('2b-oscillants', [
  ['Le pendule élastique', ['Je suis un oscillateur mécanique.', 'Je suis formé d’un solide et d’un ressort.', 'Ma période propre vaut 2π√(m/K).', 'Ma période ne dépend pas de l’amplitude.'], ['Le pendule simple', 'Le pendule de torsion', 'Le pendule pesant', 'Le circuit LC', 'Le métronome']],
  ['Le pendule de torsion', ['J’oscille autour d’un axe.', 'Un fil tordu crée sur moi un couple de rappel.', 'Ma période vaut 2π√(J/C).', 'C est la constante de torsion du fil.'], ['Le pendule simple', 'Le pendule élastique', 'Le pendule pesant', 'Le gyroscope', 'Le ressort']],
], [
  [['T₀ dépend de la masse pour un pendule simple', 'T₀ = 2π√(ℓ/g) pour un pendule simple', 'T₀ = 2π√(m/K) pour un pendule élastique', 'T₀ = 2π√(J/C) pour un pendule de torsion'], 'La période d’un pendule simple ne dépend pas de la masse.'],
  [['l’horloge à quartz', 'le pendule simple', 'le pendule élastique', 'le pendule de torsion'], 'L’horloge à quartz est un oscillateur électrique ; les trois autres sont mécaniques.'],
], [
  ['OSCILLATEUR', 'Système qui effectue des oscillations'], ['ISOCHRONISME', 'Période indépendante de l’amplitude'], ['RESSORT', 'Élément de rappel d’un pendule élastique'],
]);
JEUX_ADD('2b-energie', [
  ['L’énergie potentielle élastique', ['Je suis stockée dans un ressort déformé.', 'Je m’exprime en joules.', 'Je vaux ½·K·x².', 'Je suis maximale aux élongations extrêmes.'], ['L’énergie cinétique', 'L’énergie de pesanteur', 'L’énergie interne', 'L’énergie de torsion', 'L’énergie électrique']],
  ['La position d’équilibre', ['Je suis une position particulière d’un oscillateur.', 'En moi, la vitesse est maximale.', 'En moi, l’énergie potentielle élastique est nulle.', 'L’oscillateur passe par moi deux fois par période.'], ['Une élongation maximale', 'La position initiale', 'Le point d’attache', 'Le sommet', 'L’amplitude']],
], [
  [['Em augmente avec les frottements', 'Em se conserve sans frottement', 'Ec et Ep s’échangent', 'Em = ½·K·X_m²'], 'Les frottements font DIMINUER l’énergie mécanique.'],
  [['Ep = K·x', 'Ep = ½·K·x²', 'Ec = ½·m·v²', 'Ep_t = ½·C·θ²'], 'Ep = K·x est faux : Ep = ½·K·x².'],
], [
  ['ELASTIQUE', 'Énergie potentielle d’un ressort'], ['CONSERVATION', 'Em constante sans frottement'], ['AMPLITUDE', 'Élongation maximale'],
]);
JEUX_ADD('2b-atome', [
  ['Le photon', ['Je suis une particule de lumière.', 'Je n’ai pas de masse.', 'Mon énergie vaut h·ν.', 'Je suis émis quand un atome se désexcite.'], ['L’électron', 'Le proton', 'Le neutron', 'Le noyau', 'L’ion']],
  ['L’état fondamental', ['Je suis le niveau d’énergie le plus bas.', 'L’atome est le plus stable dans mon état.', 'On me note souvent n = 1.', 'Un atome excité finit par revenir vers moi.'], ['Un état excité', 'L’état ionisé', 'La raie d’émission', 'Le continuum', 'L’état de transition']],
], [
  [['un photon d’énergie quelconque est absorbé', 'les niveaux d’énergie sont quantifiés', 'E = h·ν', 'un spectre de raies caractérise l’élément'], 'Un atome n’absorbe qu’un photon dont l’énergie correspond exactement à une transition.'],
  [['la mécanique de Newton explique les raies', 'la constante de Planck vaut 6,63 × 10⁻³⁴ J·s', 'ΔE = h·c/λ', '1 eV = 1,6 × 10⁻¹⁹ J'], 'La mécanique de Newton ne peut pas expliquer la quantification ; il faut la mécanique quantique.'],
], [
  ['PHOTON', 'Particule de lumière'], ['NIVEAU', '… d’énergie d’un atome'], ['PLANCK', 'Savant de la constante h'],
]);

/* ===================== CHIMIE ===================== */
JEUX_ADD('2bc-lentes', [
  ['Un facteur cinétique', ['J’influence la vitesse d’une transformation.', 'Je ne change pas l’état final.', 'La température en est un exemple.', 'La concentration des réactifs aussi.'], ['Un catalyseur', 'Un réactif limitant', 'La constante d’équilibre', 'Le rendement', 'Le taux d’avancement']],
  ['La trempe', ['Je suis une opération de laboratoire.', 'Je consiste souvent à refroidir brutalement.', 'Je bloque l’évolution d’un mélange.', 'On me fait avant de doser un prélèvement.'], ['La dilution', 'La filtration', 'Le chauffage à reflux', 'La catalyse', 'La distillation']],
], [
  [['le volume du bécher', 'la température', 'la concentration des réactifs', 'le catalyseur'], 'Le volume du récipient n’est pas un facteur cinétique ; les trois autres le sont.'],
  [['une explosion est lente', 'la précipitation de AgCl est rapide', 'l’oxydation des ions iodure par H₂O₂ est lente', 'la rouille est très lente'], 'Une explosion est une transformation rapide.'],
], [
  ['CINETIQUE', 'Étude de la vitesse des transformations'], ['TREMPE', 'Refroidissement brutal qui bloque une réaction'], ['CATALYSEUR', 'Il accélère sans être consommé'],
]);
JEUX_ADD('2bc-vitesse', [
  ['Le temps de demi-réaction', ['Je suis une durée caractéristique.', 'À mon instant, l’avancement vaut la moitié de l’avancement final.', 'On me lit sur la courbe x = f(t).', 'On me note t₁/₂.'], ['La demi-vie', 'La constante de temps', 'La période', 'La durée totale', 'L’instant initial']],
  ['La vitesse volumique de réaction', ['Je m’exprime en mol·L⁻¹·s⁻¹.', 'Je suis liée à la pente de la tangente à x(t).', 'v = (1/V)·dx/dt.', 'Je diminue souvent au cours du temps.'], ['Le temps de demi-réaction', 'L’avancement', 'La concentration', 'Le taux d’avancement', 'La constante d’équilibre']],
], [
  [['la vitesse augmente au cours du temps', 'la vitesse diminue avec la consommation des réactifs', 'v = (1/V)·dx/dt', 'v est la pente de la tangente divisée par V'], 'En général, la vitesse volumique DIMINUE au cours du temps.'],
  [['t₁/₂ = durée totale / 2', 'x(t₁/₂) = x_f/2', 't₁/₂ se lit sur x = f(t)', 't₁/₂ diminue si on chauffe'], 't₁/₂ n’est pas la moitié de la durée totale de la réaction.'],
], [
  ['VITESSE', 'Grandeur v = (1/V)·dx/dt'], ['TANGENTE', 'Droite dont la pente donne la vitesse'], ['ABSORBANCE', 'Grandeur mesurée par un spectrophotomètre'],
]);
JEUX_ADD('2bc-deuxsens', [
  ['Le taux d’avancement final', ['Je suis sans unité.', 'Je suis compris entre 0 et 1.', 'τ = x_f/x_max.', 'Je vaux moins de 1 pour une réaction limitée.'], ['Le rendement', 'La constante d’équilibre', 'Le pH', 'Le quotient de réaction', 'La vitesse volumique']],
  ['Le pH-mètre', ['Je suis un appareil de mesure.', 'J’ai une sonde à étalonner.', 'J’indique une grandeur sans unité.', 'pH = −log[H₃O⁺] est ce que je mesure.'], ['Le conductimètre', 'Le spectrophotomètre', 'Le thermomètre', 'Le voltmètre', 'Le manomètre']],
], [
  [['τ = 1 pour l’acide éthanoïque dans l’eau', 'τ < 1 pour l’acide éthanoïque dans l’eau', 'la réaction s’effectue dans les deux sens', 'l’état final est un état d’équilibre'], 'La réaction de l’acide éthanoïque avec l’eau est limitée : τ < 1.'],
  [['[H₃O⁺] = log pH', 'pH = −log[H₃O⁺]', '[H₃O⁺] = 10^(−pH)', 'à 25 °C, pH neutre = 7'], '[H₃O⁺] = log pH est faux : [H₃O⁺] = 10^(−pH).'],
], [
  ['EQUILIBRE', 'État final d’une réaction limitée'], ['LIMITEE', 'Réaction avec τ < 1'], ['LOGARITHME', 'Fonction utilisée dans pH = −log[H₃O⁺]'],
]);
JEUX_ADD('2bc-equilibre', [
  ['Le quotient de réaction', ['Je suis sans unité.', 'Je n’utilise ni le solvant ni les solides.', 'À l’équilibre, je deviens égal à K.', 'On me note Q_r.'], ['La constante d’équilibre', 'Le taux d’avancement', 'Le pH', 'La concentration', 'L’avancement']],
  ['La constante d’équilibre', ['Je ne dépends que de la température.', 'Je ne dépends pas de l’état initial.', 'Je suis la valeur de Q_r à l’équilibre.', 'On me note K.'], ['Le quotient de réaction', 'Le taux d’avancement final', 'Le produit ionique', 'La vitesse', 'Le rendement']],
], [
  [['K dépend des concentrations initiales', 'K ne dépend que de la température', 'Q_r,éq = K', 'l’eau n’apparaît pas dans Q_r'], 'K ne dépend pas des concentrations initiales.'],
  [['[H₂O]', '[H₃O⁺]', '[CH₃COO⁻]', '[CH₃COOH]'], 'L’eau, solvant, n’apparaît pas dans l’expression de Q_r.'],
], [
  ['QUOTIENT', 'Q_r de réaction'], ['CONSTANTE', '… d’équilibre K'], ['TEMPERATURE', 'Seul paramètre dont dépend K'],
]);
JEUX_ADD('2bc-acidebase', [
  ['La constante d’acidité', ['Je caractérise un couple acide/base.', 'Je suis la constante d’équilibre de la réaction de l’acide avec l’eau.', 'pK_A = −log K_A.', 'Plus je suis grande, plus l’acide est fort.'], ['Le produit ionique de l’eau', 'Le pH', 'Le taux d’avancement', 'La concentration', 'La constante de cellule']],
  ['Le produit ionique de l’eau', ['Je vaux 10⁻¹⁴ à 25 °C.', 'Je dépends de la température.', 'K_e = [H₃O⁺]·[HO⁻].', 'Je traduis l’autoprotolyse de l’eau.'], ['La constante d’acidité', 'Le pH', 'La concentration de l’eau', 'Le pK_A', 'La conductivité']],
], [
  [['si pH > pK_A, l’acide prédomine', 'si pH > pK_A, la base prédomine', 'si pH = pK_A, [A] = [B]', 'pH = pK_A + log([B]/[A])'], 'Si pH > pK_A, c’est la BASE qui prédomine.'],
  [['NaCl', 'HCl', 'NaOH', 'CH₃COOH'], 'NaCl est un sel neutre ; les trois autres sont des acides ou des bases.'],
], [
  ['AUTOPROTOLYSE', 'Réaction de l’eau avec elle-même'], ['PREDOMINANCE', 'Diagramme de … d’un couple'], ['ACIDITE', 'Constante K_A d’…'],
]);
JEUX_ADD('2bc-dosage', [
  ['La méthode des tangentes', ['Je suis une méthode graphique.', 'J’utilise deux tangentes parallèles.', 'Je permets de trouver le point d’équivalence.', 'On m’applique à une courbe pH = f(V).'], ['La méthode de la dérivée', 'La méthode d’Euler', 'La loi de Kohlrausch', 'La demi-équivalence', 'L’étalonnage']],
  ['La demi-équivalence', ['Je suis un point particulier d’un dosage.', 'J’ai lieu pour V = V_E/2.', 'Dans un dosage d’acide faible, en moi pH = pK_A.', 'Les formes acide et base y sont en même quantité.'], ['L’équivalence', 'Le point de neutralité', 'Le point initial', 'Le saut de pH', 'Le virage']],
], [
  [['l’indicateur dont la zone de virage est loin du pH_E', 'la phénolphtaléine pour un pH_E ≈ 8,5', 'le BBT pour un pH_E ≈ 7', 'l’hélianthine pour un pH_E ≈ 4'], 'La zone de virage de l’indicateur doit CONTENIR le pH à l’équivalence.'],
  [['pH_E = 7 pour un acide faible dosé par une base forte', 'pH_E = 7 pour un acide fort dosé par une base forte', 'pH_E > 7 pour un acide faible dosé par une base forte', 'à la demi-équivalence, pH = pK_A'], 'Pour un acide faible dosé par une base forte, pH_E > 7.'],
], [
  ['EQUIVALENCE', 'Réactifs dans les proportions stœchiométriques'], ['TANGENTES', 'Méthode graphique pour trouver l’équivalence'], ['TITRAGE', 'Autre nom du dosage'],
]);
JEUX_ADD('2bc-spontanee', [
  ['Le critère d’évolution spontanée', ['Je compare deux grandeurs.', 'J’utilise Q_r,i et K.', 'Si Q_r,i < K, j’annonce le sens direct.', 'Si Q_r,i = K, j’annonce l’absence d’évolution.'], ['La loi de Hess', 'La loi de Kohlrausch', 'Le principe de Le Chatelier', 'La règle de l’octet', 'La loi de Faraday']],
  ['L’état d’équilibre', ['Je suis l’état final d’une réaction limitée.', 'À mon état, Q_r = K.', 'Les réactions directe et inverse ont la même vitesse.', 'Les quantités ne varient plus.'], ['L’état initial', 'L’état de transition', 'L’état standard', 'L’état excité', 'L’état fondamental']],
], [
  [['Q_r,i > K : sens direct', 'Q_r,i < K : sens direct', 'Q_r,i > K : sens inverse', 'Q_r,i = K : pas d’évolution'], 'Si Q_r,i > K, le système évolue dans le sens INVERSE.'],
  [['Q_r diminue lors d’une évolution dans le sens direct', 'Q_r augmente lors d’une évolution dans le sens direct', 'Q_r tend vers K', 'à l’équilibre Q_r = K'], 'Dans le sens direct, Q_r augmente jusqu’à K.'],
], [
  ['SPONTANEE', 'Évolution sans intervention extérieure'], ['CRITERE', '… d’évolution : comparer Q_r et K'], ['DIRECT', 'Sens si Q_r,i < K'],
]);
JEUX_ADD('2bc-piles', [
  ['Le pont salin', ['Je relie deux demi-piles.', 'Je contiens une solution ionique.', 'J’assure la neutralité électrique des solutions.', 'Je permets la circulation du courant par des ions.'], ['L’électrode', 'Le fil de connexion', 'L’anode', 'La cathode', 'Le voltmètre']],
  ['L’anode', ['Je suis une électrode.', 'L’oxydation a lieu en moi.', 'Dans une pile, je suis le pôle négatif.', 'Les électrons partent de moi dans le circuit extérieur.'], ['La cathode', 'Le pont salin', 'L’électrolyte', 'Le pôle positif', 'Le générateur']],
], [
  [['la cathode est le pôle − de la pile', 'la cathode est le siège de la réduction', 'l’anode est le pôle − de la pile', 'les électrons vont de l’anode à la cathode'], 'Dans une pile, la cathode est le pôle POSITIF.'],
  [['Q = I/Δt', 'Q = I·Δt', 'Q = n(e⁻)·F', 'F = N_A·e ≈ 96 500 C/mol'], 'Q = I/Δt est faux : la quantité d’électricité est Q = I·Δt.'],
], [
  ['CATHODE', 'Électrode de la réduction'], ['ANODE', 'Électrode de l’oxydation'], ['FARADAY', 'Constante F ≈ 96 500 C/mol'],
]);
JEUX_ADD('2bc-electrolyse', [
  ['L’électrolyseur', ['Je suis un récepteur.', 'Je force une réaction non spontanée.', 'J’ai besoin d’un générateur.', 'On m’utilise pour le dépôt de cuivre ou la production de dichlore.'], ['La pile', 'L’accumulateur en décharge', 'Le pont salin', 'Le condensateur', 'Le voltmètre']],
  ['Une transformation forcée', ['J’ai lieu dans le sens inverse du sens spontané.', 'Un générateur m’impose son sens.', 'Q_r s’éloigne de K pendant moi.', 'L’électrolyse en est un exemple.'], ['Une transformation spontanée', 'Une transformation lente', 'Une transformation totale', 'Une dissolution', 'Une précipitation']],
], [
  [['la pile Daniell', 'l’électrolyse de l’eau', 'le zingage', 'l’accumulateur en charge'], 'La pile Daniell fonctionne spontanément ; les trois autres sont des transformations forcées.'],
  [['la cathode est reliée au pôle + du générateur', 'la cathode est le siège de la réduction', 'l’anode est le siège de l’oxydation', 'm = M·I·Δt/(n·F)'], 'Dans un électrolyseur, la cathode est reliée au pôle NÉGATIF du générateur.'],
], [
  ['GENERATEUR', 'Il impose le sens d’une transformation forcée'], ['FORCEE', 'Transformation imposée par un générateur'], ['ACCUMULATEUR', 'Pile rechargeable'],
]);
JEUX_ADD('2bc-ester', [
  ['L’hydrolyse d’un ester', ['Je suis la réaction inverse de l’estérification.', 'Je suis lente et limitée.', 'Je donne un acide carboxylique et un alcool.', 'J’utilise de l’eau.'], ['L’estérification', 'La saponification', 'L’oxydation ménagée', 'La combustion', 'La neutralisation']],
  ['Le rendement d’une estérification', ['Je suis sans unité.', 'Je vaux environ 67 % pour un alcool primaire en mélange équimolaire.', 'Je baisse avec un alcool tertiaire.', 'Je peux augmenter si on élimine l’eau.'], ['La constante d’équilibre', 'La vitesse', 'Le taux d’avancement de la saponification', 'Le temps de demi-réaction', 'La masse molaire']],
], [
  [['la saponification est limitée', 'l’estérification est lente', 'l’estérification est limitée', 'l’hydrolyse est l’inverse de l’estérification'], 'La saponification est TOTALE.'],
  [['un catalyseur augmente le rendement', 'un excès d’alcool augmente le rendement', 'éliminer l’eau augmente le rendement', 'un catalyseur accélère la réaction'], 'Un catalyseur accélère la réaction mais ne change pas le rendement.'],
], [
  ['ACIDE', 'Réactif carboxylique de l’estérification'], ['HYDROLYSE', 'Réaction d’un ester avec l’eau'], ['ALCOOL', 'Réactif de l’estérification avec l’acide'],
]);
JEUX_ADD('2bc-controle', [
  ['L’anhydride d’acide', ['Je suis plus réactif qu’un acide carboxylique.', 'Avec un alcool, je donne un ester rapidement et totalement.', 'L’anhydride éthanoïque en est un exemple.', 'On m’utilise pour synthétiser l’aspirine.'], ['L’acide carboxylique', 'L’ester', 'L’alcool', 'La cétone', 'L’aldéhyde']],
  ['Le savon', ['Je suis obtenu par saponification.', 'Je suis un carboxylate de sodium ou de potassium.', 'J’ai une tête hydrophile et une queue hydrophobe.', 'Je forme des micelles dans l’eau.'], ['L’ester', 'Le glycérol', 'L’acide gras', 'L’anhydride', 'Le détergent synthétique']],
], [
  [['ajouter de l’eau', 'utiliser un anhydride d’acide', 'utiliser un excès d’alcool', 'éliminer l’eau formée'], 'Ajouter de l’eau favorise l’hydrolyse et diminue le rendement de l’estérification.'],
  [['la saponification donne un acide carboxylique', 'la saponification est totale', 'la saponification donne un ion carboxylate', 'la saponification utilise HO⁻'], 'La saponification donne un ion CARBOXYLATE (savon) et un alcool, pas l’acide.'],
], [
  ['GLYCEROL', 'Alcool obtenu par saponification d’un corps gras'], ['ANHYDRIDE', 'Réactif plus efficace qu’un acide'], ['MICELLE', 'Agrégat de molécules de savon dans l’eau'],
]);
