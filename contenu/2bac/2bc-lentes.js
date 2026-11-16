/* 2ᵉ Bac · Chimie · Transformations lentes et transformations rapides */
'use strict';
CONTENU['2bc-lentes'] = {
  resume: {
    intro: TX`Certaines transformations sont <b>rapides</b> (achevées dès que les réactifs sont en contact), d’autres <b>lentes</b> (elles durent de quelques secondes à plusieurs heures). La <b>température</b> et la <b>concentration</b> des réactifs sont des <b>facteurs cinétiques</b>.`,
    sections: [
      { titre: '1. Rappels sur l’oxydoréduction', sim: 'av_redox', html: TX`<p>Couple \(\text{Ox} + n\,e^- \rightleftharpoons \text{Red}\) ; une réaction d’oxydoréduction est un transfert d’électrons du réducteur d’un couple vers l’oxydant d’un autre.</p>` },
      { titre: '2. Transformations rapides et lentes', html: TX`<ul><li><b>Rapides</b> : précipitations, réactions acide-base, certaines oxydoréductions (\(\text{MnO}_4^-\) + \(\text{Fe}^{2+}\)).</li><li><b>Lentes</b> : \(2\,\text{I}^- + \text{S}_2\text{O}_8^{2-} \to \text{I}_2 + 2\,\text{SO}_4^{2-}\) (la coloration jaune-brun du diiode apparaît progressivement), estérification.</li></ul>` },
      { titre: '3. Facteurs cinétiques', sim: 'cinetique', html: TX`<p>La vitesse d’évolution augmente avec la <b>température</b> et avec la <b>concentration initiale</b> des réactifs (plus de chocs efficaces entre entités). Applications : réfrigérateur et congélateur (ralentir), autocuiseur (accélérer), trempe (bloquer une réaction en refroidissant brutalement).</p>`
        + FIG(440, 190, `<line x1="40" y1="170" x2="420" y2="170" stroke="#5b6577"/><line x1="40" y1="180" x2="40" y2="10" stroke="#5b6577"/><text x="410" y="188">t</text><text x="46" y="20">x</text>${[[25, '#d93a4a', '60 °C'], [60, '#1f6fe0', '40 °C'], [140, '#12946a', '20 °C']].map(([k, c, l], j) => `<polyline points="${Array.from({ length: 77 }, (_, i) => (40 + i * 5) + ',' + (170 - 130 * (1 - Math.exp(-i * 5 / k))).toFixed(1)).join(' ')}" fill="none" stroke="${c}" stroke-width="2.6"/><text x="360" y="${110 + j * 26}" fill="${c}" font-size="11">${l}</text>`).join('')}`) },
    ],
    formules: [
      { tex: TX`\text{Ox} + n\,e^- \rightleftharpoons \text{Red}`, sens: 'Demi-équation électronique' },
      { tex: TX`2\,\text{I}^- + \text{S}_2\text{O}_8^{2-} \longrightarrow \text{I}_2 + 2\,\text{SO}_4^{2-}`, sens: 'Exemple de réaction lente' },
      { tex: TX`\theta \nearrow \ \text{ou} \ C \nearrow \ \Rightarrow\ v \nearrow`, sens: 'Facteurs cinétiques' },
    ],
    retenir: [
      'Rapide : on ne peut pas suivre l’évolution à l’œil ; lente : quelques secondes à plusieurs heures.',
      'Température et concentration sont des facteurs cinétiques.',
      'Refroidir ralentit ; chauffer accélère.',
      'La trempe bloque l’évolution pour faire une mesure.',
    ],
    erreurs: [
      'Croire qu’un facteur cinétique modifie l’état final.',
      'Confondre réaction lente et réaction limitée.',
      'Oublier d’équilibrer les charges dans les demi-équations.',
    ],
  },
  experiences: {
    sims: ['cinetique', 'av_redox'],
    protocole: { titre: 'Influence de la température sur la réaction iodure / peroxodisulfate', materiel: 'solutions de KI et de K₂S₂O₈, béchers, bain-marie, eau glacée, chronomètre.',
      etapes: ['Mélanger les deux solutions à température ambiante et observer la coloration.', 'Recommencer dans l’eau glacée puis au bain-marie à 40 °C.', 'Comparer les durées d’apparition de la teinte jaune-brun.'] },
    observations: TX`<ul><li>La teinte jaune-brun du diiode apparaît progressivement.</li><li>Elle apparaît beaucoup plus vite à chaud, très lentement à froid.</li></ul>`,
    conclusion: TX`<p>La réaction est lente et sa vitesse augmente avec la température.</p>`,
  },
  quiz: [
    { q: 'Une réaction de précipitation est en général :', o: ['lente', 'rapide', 'infiniment lente', 'impossible'], r: 1, e: 'Immédiate.' },
    { q: 'Un facteur cinétique agit sur :', o: ['l’état final', 'la vitesse', 'la constante d’équilibre', 'les coefficients'], r: 1, e: 'Il ne modifie pas l’état final.' },
    { q: 'Pour conserver des aliments, on :', o: ['chauffe', 'refroidit', 'ajoute de l’eau', 'agite'], r: 1, e: 'Ralentir les réactions.' },
    { q: 'Dans 2I⁻ + S₂O₈²⁻ → I₂ + 2SO₄²⁻, l’oxydant est :', o: ['I⁻', 'S₂O₈²⁻', 'I₂', 'SO₄²⁻'], r: 1, e: 'Il capte les électrons.' },
    { q: 'La trempe consiste à :', o: ['chauffer', 'refroidir brutalement', 'diluer très peu', 'ajouter un catalyseur'], r: 1, e: 'Pour bloquer la réaction.' },
  ],
};
