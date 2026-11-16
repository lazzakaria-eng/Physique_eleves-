/* 2ᵉ Bac PC/SM · Chimie · Contrôle de l’évolution d’un système chimique */
'use strict';
CONTENU['2bc-controle'] = {
  resume: {
    intro: TX`Le chimiste peut contrôler la <b>vitesse</b> d’une transformation (température, catalyseur) et son <b>état final</b> (choix des réactifs). En remplaçant l’acide par un <b>anhydride d’acide</b>, ou l’hydrolyse par une <b>saponification</b>, on obtient des réactions rapides et <b>totales</b>.`,
    sections: [
      { titre: '1. Remplacer l’acide par un anhydride', sim: 'ester_ctrl', html: TX`<p>\((\text{R–CO})_2\text{O} + \text{R'–OH} \longrightarrow \text{R–COO–R'} + \text{R–COOH}\) : réaction rapide et totale (pas d’eau formée). Exemple : synthèse de l’aspirine avec l’anhydride éthanoïque.</p>` },
      { titre: '2. La saponification', sim: 'ester', html: TX`<p>Hydrolyse basique d’un ester : \(\text{R–COO–R'} + \text{HO}^- \longrightarrow \text{R–COO}^- + \text{R'–OH}\), totale et relativement rapide (à chaud). Avec les triglycérides (corps gras) et la soude, on obtient des <b>savons</b> (carboxylates de sodium) et du glycérol.</p>`
        + FIG(440, 130, `<circle cx="80" cy="65" r="16" fill="#d93a4a"/><text x="80" y="70" text-anchor="middle" fill="#fff" font-size="10">COO⁻</text><path d="M96 65 h20 l8 -10 l8 10 l8 -10 l8 10 l8 -10 l8 10 l8 -10 l8 10 l8 -10 l8 10 l8 -10 l8 10 l8 -10 l8 10 h10" fill="none" stroke="#14213d" stroke-width="3"/><text x="60" y="110" font-size="11">tête hydrophile</text><text x="190" y="110" font-size="11">chaîne carbonée hydrophobe (lipophile)</text>`) },
      { titre: '3. Propriétés des savons', html: TX`<p>L’ion carboxylate a une tête <b>hydrophile</b> (–COO⁻) et une longue chaîne <b>hydrophobe</b>. Dans l’eau, les ions forment des <b>micelles</b> qui emprisonnent les graisses : pouvoir détergent.</p>` },
      { titre: '4. Rôle du catalyseur', html: TX`<p>Un catalyseur accélère une réaction sans être consommé et sans modifier l’état final. Il est spécifique. Catalyse homogène (même phase), hétérogène (solide), enzymatique (enzymes).</p>` },
    ],
    formules: [
      { tex: TX`(\text{R–CO})_2\text{O} + \text{R'–OH} \longrightarrow \text{R–COO–R'} + \text{R–COOH}`, sens: 'Estérification par un anhydride (totale)' },
      { tex: TX`\text{R–COO–R'} + \text{HO}^- \longrightarrow \text{R–COO}^- + \text{R'–OH}`, sens: 'Saponification (totale)' },
      { tex: TX`r = \dfrac{n_{exp}}{n_{max}}`, sens: 'Rendement' },
      { tex: TX`\text{catalyseur : } v \nearrow,\ K \text{ inchangée}`, sens: 'Rôle du catalyseur' },
    ],
    retenir: [
      'Anhydride + alcool : estérification rapide et totale.',
      'Saponification : hydrolyse basique totale ; corps gras + soude → savon + glycérol.',
      'Un savon a une tête hydrophile et une queue hydrophobe.',
      'Un catalyseur agit sur la vitesse, pas sur l’état final.',
    ],
    erreurs: [
      'Croire que la saponification est limitée.',
      'Confondre l’anhydride (R–CO)₂O et l’acide R–COOH.',
      'Penser qu’un catalyseur est consommé.',
    ],
  },
  experiences: {
    sims: ['ester_ctrl', 'ester'],
    protocole: { titre: 'Fabrication d’un savon', materiel: 'huile d’olive, solution concentrée de soude, éthanol, chauffage à reflux, eau salée, filtration (sous la hotte, gants et lunettes).',
      etapes: ['Chauffer à reflux 10 mL d’huile, 20 mL de soude et 10 mL d’éthanol pendant 20 min.', 'Verser le mélange dans de l’eau salée froide (relargage).', 'Filtrer et rincer le savon.', 'Tester son pouvoir moussant dans l’eau.'] },
    observations: TX`<ul><li>Le mélange devient homogène au cours du chauffage.</li><li>Le savon précipite dans l’eau salée ; il mousse dans l’eau douce.</li></ul>`,
    conclusion: TX`<p>La saponification d’un triglycéride par la soude est totale ; le savon est un carboxylate de sodium.</p>`,
  },
  quiz: [
    { q: 'L’estérification avec un anhydride d’acide est :', o: ['lente et limitée', 'rapide et totale', 'impossible', 'réversible'], r: 1, e: 'Pas d’eau formée.' },
    { q: 'La saponification produit :', o: ['un ester', 'un carboxylate et un alcool', 'un acide fort', 'un alcane'], r: 1, e: 'Hydrolyse basique.' },
    { q: 'La partie hydrophile d’un savon est :', o: ['la chaîne carbonée', 'le groupe –COO⁻', 'l’atome de sodium seul', 'aucune'], r: 1, e: 'Elle interagit avec l’eau.' },
    { q: 'Un catalyseur :', o: ['est consommé', 'modifie K', 'accélère la réaction', 'augmente le rendement'], r: 2, e: 'Il est régénéré.' },
    { q: 'Le relargage consiste à :', o: ['chauffer', 'ajouter de l’eau salée pour précipiter le savon', 'filtrer', 'ajouter un catalyseur'], r: 1, e: 'Le savon est peu soluble dans l’eau salée.' },
  ],
};
