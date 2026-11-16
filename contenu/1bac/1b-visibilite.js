/* 1ʳᵉ Bac · Physique · Optique · Visibilité d’un objet */
'use strict';
CONTENU['1b-visibilite'] = {
  resume: {
    intro: TX`On voit un objet quand de la lumière issue de cet objet pénètre dans l’œil. La lumière se propage en ligne droite dans un milieu homogène et transparent ; à la surface de séparation de deux milieux, elle est <b>réfléchie</b> et <b>réfractée</b>.`,
    sections: [
      { titre: '1. Condition de visibilité', html: TX`<p>Un objet est visible s’il est une <b>source primaire</b> (il produit sa lumière) ou une <b>source secondaire</b> (il diffuse la lumière reçue), et si la lumière qui en provient atteint l’œil. Propagation rectiligne : notion de rayon lumineux, ombres, chambre noire.</p>` },
      { titre: '2. Réflexion', sim: 'miroir', html: TX`<p>Lois de Descartes : le rayon réfléchi est dans le plan d’incidence et \(i' = i\) (angles mesurés par rapport à la <b>normale</b>).</p>` },
      { titre: '3. Réfraction', sim: 'refraction', html: TX`<p>Le rayon réfracté est dans le plan d’incidence et \(n_1\sin i = n_2\sin r\). Indice d’un milieu : \(n = \dfrac{c}{v} \ge 1\) (air ≈ 1 ; eau : 1,33 ; verre : 1,5). Passage vers un milieu plus réfringent (\(n_2 > n_1\)) : le rayon se rapproche de la normale.</p>`
        + FIG(320, 200, `<rect x="0" y="100" width="320" height="100" fill="#6aa5ff" opacity=".3"/><line x1="0" y1="100" x2="320" y2="100" stroke="#14213d" stroke-width="2"/><line x1="160" y1="10" x2="160" y2="190" stroke="#9aa6bf" stroke-dasharray="5 4"/><line x1="70" y1="20" x2="160" y2="100" stroke="#d93a4a" stroke-width="2.5"/><line x1="160" y1="100" x2="250" y2="20" stroke="#d93a4a" stroke-width="1.5" stroke-dasharray="4 3"/><line x1="160" y1="100" x2="214" y2="190" stroke="#d93a4a" stroke-width="2.5"/><text x="128" y="62">i</text><text x="176" y="62">i′</text><text x="172" y="146">r</text><text x="8" y="94">air (n₁)</text><text x="8" y="120">eau (n₂)</text>`) },
      { titre: '4. Réflexion totale', html: TX`<p>Si la lumière passe d’un milieu plus réfringent vers un milieu moins réfringent (\(n_1 > n_2\)), il existe un angle limite tel que \(\sin i_{lim} = \dfrac{n_2}{n_1}\). Pour \(i > i_{lim}\), il n’y a plus de rayon réfracté : <b>réflexion totale</b> (fibres optiques, prismes à réflexion totale).</p>` },
    ],
    formules: [
      { tex: TX`i' = i`, sens: 'Loi de la réflexion' },
      { tex: TX`n_1\sin i = n_2\sin r`, sens: 'Loi de la réfraction (Snell-Descartes)' },
      { tex: TX`n = \dfrac{c}{v}`, sens: 'Indice de réfraction' },
      { tex: TX`\sin i_{lim} = \dfrac{n_2}{n_1}`, sens: 'Angle limite (n₁ > n₂)' },
    ],
    retenir: [
      'On voit un objet si sa lumière atteint l’œil.',
      'Les angles se mesurent par rapport à la normale.',
      'Vers un milieu plus réfringent, le rayon se rapproche de la normale.',
      'Réflexion totale possible seulement si n₁ > n₂ et i > i_lim.',
    ],
    erreurs: [
      'Mesurer les angles par rapport à la surface.',
      'Chercher une réflexion totale de l’air vers l’eau.',
      'Calculatrice en radians.',
    ],
  },
  experiences: {
    sims: ['refraction', 'miroir'],
    protocole: { titre: 'Vérifier la loi de la réfraction', materiel: 'demi-cylindre de plexiglas, source laser (ou lanterne), disque gradué (ou simulation).',
      etapes: ['Envoyer le rayon vers le centre du demi-cylindre côté plan.', 'Mesurer r pour i = 10°, 20°, … 80°.', TX`Tracer \(\sin i = f(\sin r)\).`, 'Inverser le sens de propagation pour observer la réflexion totale.'] },
    observations: TX`<ul><li>\(\sin i\) est proportionnel à \(\sin r\) ; la pente vaut l’indice du plexiglas (≈ 1,5).</li><li>Du plexiglas vers l’air, au-delà de 42° environ, le rayon réfracté disparaît.</li></ul>`,
    conclusion: TX`<p>\(n_1\sin i = n_2\sin r\) ; angle limite \(\sin i_{lim} = 1/n\).</p>`,
  },
  quiz: [
    { q: TX`Air → verre (n = 1,5), i = 30°. r :`, o: ['19,5°', '30°', '48,6°', '45°'], r: 0, e: TX`\(\sin r = 0{,}5/1{,}5\).` },
    { q: 'Vitesse de la lumière dans l’eau (n = 1,33) :', o: [TX`\(2{,}25\times10^{8}\ \text{m/s}\)`, TX`\(4\times10^{8}\ \text{m/s}\)`, TX`\(3\times10^{8}\ \text{m/s}\)`, '1,33 m/s'], r: 0, e: TX`\(v = c/n\).` },
    { q: 'Angle limite verre (1,5) → air :', o: ['42°', '48°', '30°', '90°'], r: 0, e: TX`\(\sin i_{lim} = 1/1{,}5\).` },
    { q: 'La réflexion totale est utilisée dans :', o: ['les fibres optiques', 'les lentilles', 'les miroirs plans', 'les écrans'], r: 0, e: 'La lumière est guidée par réflexions totales.' },
    { q: 'La Lune est :', o: ['une source primaire', 'une source secondaire', 'invisible', 'un milieu réfringent'], r: 1, e: 'Elle diffuse la lumière du Soleil.' },
  ],
};
