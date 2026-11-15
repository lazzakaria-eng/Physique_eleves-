/* Mots-clés de chaque simulation : ils servent à placer une expérience à côté de chaque étape du cours qui en a besoin.
   Pour forcer une simulation sur une étape : STEP_SIMS['id du chapitre'] = { numéro de l'étape (1, 2, …) : 'nom de la simulation' }. */
'use strict';
const SIM_KEYS = {
  gravitation: ['gravitation', 'attirent', 'attraction', 'masses', 'distance', 'divisee par 4', 'carre de la distance'],
  pression: ['pression', 'pressante', 'surface', 'manometre', 'hpa', 'repartie'],
  mouvement: ['trajectoire', 'vitesse moyenne', 'uniforme', 'accelere', 'retarde', 'equation horaire', 'x(t)', 'rectiligne'],
  inertie: ['inertie', 'pseudo-isole', 'se compensent', 'galileen', 'isole'],
  ressort: ['ressort', 'raideur', 'allonge', 'tension d', 'elastique'],
  incline: ['plan incline', 'incline', 'trois forces', 'polygone', 'triangle ferme', 'frottement s', 'reaction du plan', 'projette'],
  moment: ['moment', 'axe', 'couple', 'tourner', 'balance'],
  courant: ['electrons', 'courant', 'intensite', 'ampere', 'sens conventionnel'],
  assoc: ['serie', 'derivation', 'resistance equivalente', 'loi des mailles', 'voltmetre', 'diviseur de tension', 'branches'],
  caract: ['caracteristique', 'diode', 'zener', 'seuil', 'non lineaire', 'lineaire et symetrique'],
  generateur: ['generateur', 'point de fonctionnement', 'f.e.m', 'resistance interne', 'recepteur'],
  transistor: ['transistor', 'base', 'collecteur', 'bloque', 'sature', 'effet transistor'],
  aop: ['amplificateur', 'u_sat', 'inverseuse', 'ecrete', 'suiveur'],
  oscilloscope: ['oscilloscope', 'alternative', 'sinusoidale', 'periode et sa frequence', 'valeur maximale'],
  rotation: ['rotation', 'vitesse angulaire', 'cercle', 'abscisse angulaire', 'circulaire uniforme', 'tourne'],
  travail: ['travail', 'moteur', 'resistant', 'puissance', 'joules'],
  energie: ['energie cinetique', 'energie potentielle', 'energie mecanique', 'conserve', 'altitude', 'chaleur'],
  calorimetrie: ['calorimetre', 'chaleur', 'equilibre thermique', 'temperature', 'transfert thermique', 'changement d'],
  champE: ['champ electrostatique', 'charges', 'plaques', 'champ uniforme', 'potentiel', 'acceleree', 'champ electrique'],
  boussole: ['aiguille', 'aimant', 'superposent', 'somme vectorielle des champs', 'pole'],
  solenoide: ['solenoide', 'champ magnetique', 'main droite', 'fil rectiligne', 'proportionnel a l'],
  laplace: ['laplace', 'trois doigts', 'moteur electrique', 'haut-parleur', 'conducteur parcouru'],
  refraction: ['refraction', 'reflexion', 'indice', 'normale', 'refringent', 'reflexion totale', 'prisme'],
  miroir: ['miroir', 'symetrique', 'image virtuelle', 'champ du miroir'],
  lentille: ['lentille', 'convergente', 'foyer', 'image reelle', 'distance focale', 'vergence', 'gauss'],
  loupe: ['loupe', 'microscope', 'grossissement', 'oculaire', 'objectif'],
  bilan: ['effet joule', 'rendement', 'bilan', 'energie utile', 'puissance fournie'],
  onde_pulse: ['perturbation', 'celerite', 'transversale', 'longitudinale', 'retard', 'onde mecanique', 'sans transport de matiere'],
  onde_per: ['longueur d', 'periodicite', 'periode', 'frequence est imposee', 'en phase', 'dispersif'],
  diffraction: ['diffraction', 'fente', 'tache centrale', 'ouverture'],
  decroissance: ['demi-vie', 'aleatoire', 'activite', 'desintegr', 'n(t)', 'decroit', 'datation', 'radioacti'],
  liaison: ['energie de liaison', 'defaut de masse', 'fission', 'fusion', 'stable', 'nucleon'],
  rc: ['condensateur', 'armature', 'charge', 'decharge', 'rc', '63 %'],
  rl: ['bobine', 'inductance', 'surtension', 'roue libre', 's’etablit', 'magnetique'],
  rlc: ['pseudo-periodique', 'aperiodique', 'oscillations', 'amortissement', 'lc', 'entretien'],
  rlcf: ['resonance', 'impedance', 'bande passante', 'excitateur', 'facteur de qualite'],
  modulation: ['modulation', 'porteuse', 'antenne', 'demodulation', 'enveloppe', 'surmodulation'],
  newton: ['newton', 'acceleration', 'somme des forces', 'referentiel galileen', 'uniformement varie'],
  chute: ['chute', 'vitesse limite', 'frottement fluide', 'euler', 'regime permanent', 'archimede'],
  projectile: ['projectile', 'parabol', 'portee', 'angle de tir', 'pesanteur'],
  lorentz: ['lorentz', 'champ magnetique uniforme', 'particule chargee'],
  satellite: ['satellite', 'orbite', 'kepler', 'geostationnaire', 'planete'],
  rotdyn: ['moment d', 'acceleration angulaire', 'relation fondamentale', 'j_δ'],
  pendule: ['pendule', 'pendule simple', 'periode propre', 'petites oscillations'],
  oscillateur: ['oscillateur', 'energie mecanique', 'frottement', 'amortissement', 'resonance', 'va-et-vient', 'pendule elastique', 'e_c et e_p', 'energie mecanique d'],
  bohr: ['niveau', 'quantifiee', 'photon', 'raie', 'spectre'],
  densite: ['masse volumique', 'densite', 'flotte', 'dense', 'decantation'],
  ccm: ['chromatographie', 'tache', 'r_f', 'eluant', 'migrent'],
  atome: ['atome', 'noyau', 'protons', 'neutrons', 'couches', 'isotopes', 'electrons se repartissent', 'ion'],
  classification: ['tableau periodique', 'periode', 'groupe', 'alcalins', 'halogenes', 'gaz rares', 'famille chimique'],
  molecule: ['doublet', 'octet', 'duet', 'liaison covalente', 'lewis', 'tetraedrique', 'geometrie', 'cram'],
  mole: ['mole', 'avogadro', 'masse molaire', 'quantite de matiere'],
  dilution: ['dilution', 'fiole', 'pipette', 'solution mere', 'concentration'],
  avancement: ['avancement', 'reactif limitant', 'stoechiometrique', 'tableau d', 'etat final'],
  av_ab: ['proton h', 'acide', 'base', 'couple acide', 'ampholyte'],
  av_redox: ['oxydant', 'reducteur', 'oxydation', 'reduction', 'electrons', 'demi-equation'],
  gaz: ['gaz', 'pression', 'boyle', 'kelvin', 'volume molaire', 'gaz parfaits'],
  electrolyte: ['cristal ionique', 'dissolution', 'solvatation', 'ions', 'polaire', 'electriquement neutre'],
  conductimetrie: ['conductance', 'conductivite', 'etalonnage', 'cellule', 'conducteurs'],
  dosage_cond: ['dosage', 'equivalence', 'titrante', 'burette', 'rupture de pente'],
  organique: ['chaine carbonee', 'alcane', 'ramifiee', 'squelette', 'formule brute', 'nom d'],
  groupes: ['groupe caracteristique', 'alcool', 'aldehyde', 'cetone', 'oxydation menagee', 'dnph', 'famille'],
  cinetique: ['lente', 'rapide', 'facteurs cinetiques', 'vitesse volumique', 'demi-reaction', 'temperature', 'trempe'],
  acide_faible: [' ph ', 'ph =', 'limitee', 'taux d', 'dilue', 'totale'],
  predominance: ['pk_a', 'predomine', 'diagramme', 'zone de virage', 'indicateur'],
  titrage: ['saut de ph', ' ph ', 'reaction de dosage', 'acide faible', 'dosage', 'demi-equivalence', 'tangentes', 'indicateur colore'],
  quotient: ['quotient', 'constante d', 'equilibre', 'evolue', 'sens direct', 'critere'],
  pile: ['pile', 'pont salin', 'anode', 'cathode', 'usee'],
  electrolyse: ['electrolyse', 'forcee', 'impose le sens', 'depot', 'accumulateur'],
  ester: ['ester', 'esterification', 'hydrolyse', 'catalyseur', 'rendement', 'excès'],
  ester_ctrl: ['anhydride', 'saponification', 'savon', 'catalyse'],
};
const STEP_SIMS = {
  '2b-energie': { 1: 'oscillateur', 2: 'oscillateur', 5: 'pendule' },
};

// Choisit la simulation la plus adaptée à une étape (ou rien si aucune ne correspond).
function simForStep(lessonId, n, html, lessonSims) {
  const forced = STEP_SIMS[lessonId] && STEP_SIMS[lessonId][n];
  if (forced) return forced;
  const txt = ' ' + String(html).replace(/<[^>]+>/g, ' ').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[\\{}()^_]/g, m => m === '_' ? '_' : ' ').toLowerCase() + ' ';
  let best = '', score = 0;
  for (const name in SIM_KEYS) {
    if (!SIMS[name]) continue;
    let s = 0;
    for (const k of SIM_KEYS[name]) if (txt.includes(k.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase())) s += k.length > 6 ? 1.2 : 1;
    if (s && lessonSims.includes(name)) s += 3;
    if (s > score) { score = s; best = name; }
  }
  return score >= 2 ? best : '';
}
