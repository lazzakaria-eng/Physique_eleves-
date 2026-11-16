/* 1ʳᵉ Bac · Physique · Électrodynamique · Transfert d’énergie dans un circuit électrique */
'use strict';
CONTENU['1b-transfert'] = {
  resume: {
    intro: TX`Dans un circuit, le <b>générateur</b> convertit une énergie (chimique, mécanique…) en énergie électrique qu’il transfère aux <b>récepteurs</b>. Une partie de l’énergie est toujours dissipée en chaleur : c’est l’<b>effet Joule</b>.`,
    sections: [
      { titre: '1. Énergie et puissance électriques', sim: 'bilan', html: TX`<p>Un récepteur soumis à la tension \(U_{AB}\) et traversé par \(I\) reçoit pendant \(\Delta t\) l’énergie \(W_e = U_{AB}\,I\,\Delta t\) (J) ; puissance \(P_e = U_{AB}\,I\) (W).</p>` },
      { titre: '2. Effet Joule', html: TX`<p>Un conducteur ohmique transforme toute l’énergie reçue en chaleur : \(W_J = R\,I^2\,\Delta t\), \(P_J = R\,I^2 = \dfrac{U^2}{R}\). Applications : radiateurs, fers à repasser, fusibles. Inconvénient : pertes dans les lignes et les appareils.</p>` },
      { titre: '3. Bilans de puissance', sim: 'generateur', html: TX`<ul><li><b>Générateur</b> : \(E\,I = U_{PN}\,I + r\,I^2\) (puissance produite = puissance fournie au circuit + pertes Joule internes). Rendement \(\eta = \dfrac{U_{PN}}{E}\).</li><li><b>Récepteur actif</b> (moteur, électrolyseur) : \(U_{AB}\,I = E'\,I + r'\,I^2\) (puissance reçue = puissance utile + pertes). Rendement \(\eta' = \dfrac{E'}{U_{AB}}\).</li></ul>`
        + FIG(440, 130, ARW('tf1', '#12946a') + ARW('tf2', '#d93a4a') + `<rect x="20" y="40" width="110" height="50" rx="10" fill="#eaf1fd" stroke="#14213d"/><text x="75" y="70" text-anchor="middle">générateur</text><rect x="300" y="40" width="120" height="50" rx="10" fill="#fff7e6" stroke="#14213d"/><text x="360" y="70" text-anchor="middle">moteur</text><line x1="130" y1="65" x2="296" y2="65" stroke="#12946a" stroke-width="4" marker-end="url(#tf1)"/><text x="215" y="58" text-anchor="middle" font-size="11">U·I</text><line x1="75" y1="90" x2="75" y2="124" stroke="#d93a4a" stroke-width="3" marker-end="url(#tf2)"/><text x="82" y="118" font-size="11" fill="#d93a4a">r·I²</text><line x1="360" y1="90" x2="360" y2="124" stroke="#d93a4a" stroke-width="3" marker-end="url(#tf2)"/><text x="367" y="118" font-size="11" fill="#d93a4a">r′·I²</text><line x1="420" y1="65" x2="440" y2="65" stroke="#12946a" stroke-width="3"/><text x="360" y="32" text-anchor="middle" font-size="11">E′·I utile</text>`) },
    ],
    formules: [
      { tex: TX`W_e = U\,I\,\Delta t \qquad P = U\,I`, sens: 'Énergie et puissance électriques' },
      { tex: TX`W_J = R\,I^2\,\Delta t`, sens: 'Effet Joule' },
      { tex: TX`E\,I = U_{PN}\,I + r\,I^2`, sens: 'Bilan du générateur' },
      { tex: TX`U_{AB}\,I = E'\,I + r'\,I^2`, sens: 'Bilan d’un récepteur actif' },
      { tex: TX`\eta = \dfrac{U_{PN}}{E} \qquad \eta' = \dfrac{E'}{U_{AB}}`, sens: 'Rendements' },
    ],
    retenir: [
      'P = U·I pour tout dipôle.',
      'Effet Joule : P = R·I² ; toujours une perte (sauf dans un appareil de chauffage).',
      'Générateur : puissance totale E·I = puissance fournie + pertes.',
      'Le rendement est toujours inférieur à 1.',
      TX`\(1\ \text{kWh} = 3{,}6\times10^{6}\ \text{J}\).`,
    ],
    erreurs: [
      'Confondre puissance (W) et énergie (J ou kWh).',
      'Oublier le carré de I dans l’effet Joule.',
      'Utiliser des minutes au lieu de secondes.',
      'Écrire un rendement supérieur à 100 %.',
    ],
  },
  experiences: {
    sims: ['bilan', 'generateur'],
    protocole: { titre: 'Bilan énergétique d’un moteur', materiel: 'générateur réglable, petit moteur, ampèremètre, voltmètre, chronomètre, masse à soulever.',
      etapes: ['Bloquer le moteur : mesurer U et I et en déduire r′.', 'Laisser tourner le moteur à vide puis en soulevant une masse : mesurer U et I.', TX`Calculer \(E' = U - r'I\), la puissance utile et le rendement.`, 'Vérifier avec la simulation « bilan ».'] },
    observations: TX`<ul><li>Moteur bloqué : l’intensité est grande et le moteur chauffe.</li><li>En fonctionnement, \(U > r'I\) : une partie de la puissance est convertie en puissance mécanique.</li></ul>`,
    conclusion: TX`<p>\(U I = E'I + r'I^2\) : la puissance reçue se partage entre puissance utile et pertes Joule ; \(\eta' = E'/U\).</p>`,
  },
  quiz: [
    { q: 'Une lampe sous 12 V est traversée par 0,5 A. Sa puissance :', o: ['6 W', '24 W', '0,04 W', '12,5 W'], r: 0, e: 'P = UI.' },
    { q: 'Énergie consommée par un radiateur de 2000 W pendant 3 h :', o: ['6 kWh', '600 Wh', '2 kWh', '6000 kWh'], r: 0, e: TX`\(2\ \text{kW}\times3\ \text{h}\).` },
    { q: TX`\(R = 10\ \Omega\), \(I = 2\ \text{A}\). Puissance Joule :`, o: ['20 W', '40 W', '5 W', '200 W'], r: 1, e: TX`\(RI^2\).` },
    { q: TX`Pile \(E = 9\ \text{V}\), \(U_{PN} = 8{,}1\ \text{V}\). Rendement :`, o: ['90 %', '81 %', '111 %', '10 %'], r: 0, e: TX`\(8{,}1/9\).` },
    { q: 'Dans un moteur, la puissance utile est :', o: ['U·I', 'E′·I', 'r′·I²', 'E·I'], r: 1, e: 'Convertie en puissance mécanique.' },
  ],
};
