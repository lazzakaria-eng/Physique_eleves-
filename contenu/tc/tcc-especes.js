/* Tronc Commun · Chimie · Les espèces chimiques */
'use strict';
CONTENU['tcc-especes'] = {
  resume: {
    intro: TX`Tout ce qui nous entoure est fait d’<b>espèces chimiques</b> : un ensemble d’entités identiques (atomes, molécules ou ions). On les identifie par nos sens, par des <b>tests chimiques</b> et par leurs <b>caractéristiques physiques</b> (masse volumique, températures de changement d’état, solubilité).`,
    sections: [
      { titre: '1. Espèces naturelles et synthétiques', html: TX`<p>Une espèce chimique peut être <b>naturelle</b> (extraite de la nature : caféine du café, limonène de l’orange) ou <b>synthétique</b> (fabriquée par l’Homme ; elle peut être identique à une espèce naturelle, ou artificielle si elle n’existe pas dans la nature : nylon).</p>
<p>Les espèces <b>organiques</b> contiennent du carbone et de l’hydrogène (elles brûlent en donnant \(\text{CO}_2\) et \(\text{H}_2\text{O}\)) ; les autres sont <b>inorganiques</b> (minérales).</p>` },
      { titre: '2. Tests d’identification', html: TX`<ul><li><b>Eau</b> : le sulfate de cuivre anhydre blanc devient <b>bleu</b>.</li><li><b>Dioxyde de carbone</b> : l’eau de chaux se <b>trouble</b>.</li><li><b>Glucose</b> : la liqueur de Fehling donne un précipité <b>rouge brique</b> à chaud.</li><li><b>Amidon</b> : l’eau iodée devient <b>bleu foncé</b>.</li><li><b>Dihydrogène</b> : petite détonation à l’approche d’une flamme ; <b>dioxygène</b> : rallume une buchette incandescente.</li><li><b>Ions chlorure</b> : précipité blanc avec le nitrate d’argent (qui noircit à la lumière).</li></ul>` },
      { titre: '3. Caractéristiques physiques', sim: 'densite', html: TX`<p><b>Masse volumique</b> : \(\rho = \dfrac{m}{V}\) (g/mL ou kg/m³). <b>Densité</b> par rapport à l’eau (solides, liquides) : \(d = \dfrac{\rho}{\rho_{eau}}\), sans unité (\(\rho_{eau} = 1\ \text{g/cm}^3\)).</p>
<p><b>Températures de changement d’état</b> : température de fusion \(\theta_f\) et d’ébullition \(\theta_{éb}\) d’une espèce pure sont constantes (palier). <b>Solubilité</b> : masse maximale qu’on peut dissoudre dans 1 L de solvant.</p>`
        + FIG(400, 170, `<line x1="40" y1="150" x2="380" y2="150" stroke="#5b6577" stroke-width="1.5"/><line x1="40" y1="160" x2="40" y2="10" stroke="#5b6577" stroke-width="1.5"/><text x="370" y="166">t</text><text x="46" y="20">θ (°C)</text><polyline points="40,140 120,90 260,90 360,30" fill="none" stroke="#1f6fe0" stroke-width="3"/><line x1="40" y1="90" x2="120" y2="90" stroke="#d93a4a" stroke-dasharray="4 3"/><text x="8" y="94" fill="#d93a4a">θ_f</text><text x="150" y="82" font-size="11">palier : solide + liquide</text>`) },
      { titre: '4. Corps pur et mélange', html: TX`<p>Un <b>corps pur</b> est constitué d’une seule espèce chimique : ses caractéristiques physiques sont fixes. Un <b>mélange</b> en contient plusieurs : il peut être <b>homogène</b> (une seule phase visible) ou <b>hétérogène</b> (plusieurs phases). On compare les valeurs mesurées aux valeurs des tables pour identifier une espèce.</p>` },
    ],
    formules: [
      { tex: TX`\rho = \dfrac{m}{V}`, sens: 'Masse volumique' },
      { tex: TX`d = \dfrac{\rho}{\rho_{eau}}`, sens: 'Densité (sans unité)' },
      { tex: TX`\rho_{eau} = 1\ \text{g·cm}^{-3} = 1000\ \text{kg·m}^{-3}`, sens: 'Masse volumique de l’eau' },
    ],
    retenir: [
      'Une espèce chimique est un ensemble d’entités identiques.',
      'Naturelle, synthétique ; organique (C et H) ou inorganique.',
      'Tests : CuSO₄ anhydre (eau), eau de chaux (CO₂), Fehling (glucose), eau iodée (amidon).',
      TX`\(\rho = m/V\) ; \(d = \rho/\rho_{eau}\) ; un liquide de densité \(< 1\) flotte sur l’eau (s’il n’y est pas miscible).`,
      'Un corps pur change d’état à température constante.',
    ],
    erreurs: [
      'Donner une unité à la densité.',
      TX`Confondre \(\text{cm}^3\) et \(\text{dm}^3\) : \(1\ \text{L} = 1\ \text{dm}^3 = 1000\ \text{cm}^3\).`,
      'Penser qu’une espèce synthétique est différente de la même espèce naturelle.',
      'Confondre mélange homogène et corps pur.',
      'Confondre test (qui identifie) et observation de la couleur seule.',
    ],
  },
  experiences: {
    sims: ['densite', 'ccm'],
    protocole: { titre: 'Mesurer la masse volumique d’un liquide', materiel: 'balance, éprouvette graduée de 50 mL, liquide (eau, huile, éthanol).',
      etapes: ['Peser l’éprouvette vide : m₁.', 'Verser 40 mL de liquide et peser : m₂.', TX`Calculer \(m = m_2 - m_1\), puis \(\rho = m/V\) et \(d\).`, 'Comparer avec les valeurs des tables ; vérifier dans la simulation qui flotte sur quoi.'] },
    observations: TX`<ul><li>Eau : \(\rho \approx 1{,}0\ \text{g/mL}\) ; huile : \(\approx 0{,}92\ \text{g/mL}\) ; éthanol : \(\approx 0{,}79\ \text{g/mL}\).</li><li>L’huile, non miscible et moins dense, flotte sur l’eau.</li></ul>`,
    conclusion: TX`<p>La masse volumique (ou la densité) est une caractéristique qui permet d’identifier une espèce chimique et de prévoir la position des phases.</p>`,
  },
  quiz: [
    { q: 'Le sulfate de cuivre anhydre devient bleu en présence :', o: ['de dioxyde de carbone', 'd’eau', 'de glucose', 'd’amidon'], r: 1, e: 'Test de l’eau.' },
    { q: 'L’eau de chaux se trouble en présence :', o: ['de dioxygène', 'de dihydrogène', 'de dioxyde de carbone', 'd’eau'], r: 2, e: 'Test du CO₂.' },
    { q: TX`50 mL d’un liquide ont une masse de 40 g. Sa densité :`, o: ['1,25', '0,8', '40', '2000'], r: 1, e: TX`\(\rho = 0{,}8\ \text{g/mL}\), \(d = 0{,}8\).` },
    { q: 'Un corps pur fond :', o: ['à température constante', 'sur un intervalle de températures', 'toujours à 0 °C', 'sans absorber d’énergie'], r: 0, e: 'Palier de fusion.' },
    { q: 'La vitamine C fabriquée en usine identique à celle du citron est :', o: ['artificielle', 'synthétique', 'naturelle', 'un mélange'], r: 1, e: 'Elle est synthétique (et identique à l’espèce naturelle).' },
  ],
};
