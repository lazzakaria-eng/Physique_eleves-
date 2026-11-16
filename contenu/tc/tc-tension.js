/* Tronc Commun · Physique · Électricité · La tension électrique */
'use strict';
CONTENU['tc-tension'] = {
  resume: {
    intro: TX`La <b>tension électrique</b> \(U_{AB}\) entre deux points A et B est la différence de leurs potentiels électriques : \(U_{AB} = V_A - V_B\). Elle se mesure en volts (V) avec un voltmètre branché en dérivation, ou se visualise avec un oscilloscope.`,
    sections: [
      { titre: '1. Tension et potentiel', html: TX`<p>\(U_{AB} = V_A - V_B\) est une grandeur <b>algébrique</b> : \(U_{BA} = -U_{AB}\). On la représente par une flèche allant de B vers A (pointe en A). On choisit un point de potentiel nul : la <b>masse</b> (souvent la borne \(-\) du générateur).</p>`
        + FIG(380, 90, ARW('u1', '#1f6fe0') + `<line x1="40" y1="60" x2="120" y2="60" stroke="#14213d" stroke-width="2"/><rect x="120" y="48" width="140" height="24" fill="#fff" stroke="#14213d" stroke-width="2"/><line x1="260" y1="60" x2="340" y2="60" stroke="#14213d" stroke-width="2"/><text x="112" y="88">A</text><text x="262" y="88">B</text><path d="M260 30 Q190 0 120 30" fill="none" stroke="#1f6fe0" stroke-width="2" marker-end="url(#u1)"/><text x="190" y="14" text-anchor="middle" fill="#1f6fe0" font-weight="bold">U_AB</text>`) },
      { titre: '2. Mesure avec un voltmètre', html: TX`<p>Le voltmètre se branche <b>en dérivation</b> : borne V reliée à A et borne COM à B pour mesurer \(U_{AB}\). La lecture d’un appareil à aiguille : \(U = \dfrac{C\cdot n}{n_0}\).</p>` },
      { titre: '3. Lois des tensions', sim: 'assoc', html: TX`<ul><li><b>Additivité (loi des mailles)</b> : \(U_{AC} = U_{AB} + U_{BC}\). Dans une maille parcourue dans un sens, la somme algébrique des tensions est nulle.</li><li><b>Dérivation</b> : des dipôles en dérivation ont la même tension à leurs bornes.</li></ul>` },
      { titre: '4. Tensions variables et oscilloscope', sim: 'oscilloscope', html: TX`<p>L’oscilloscope trace \(u(t)\). Avec la sensibilité verticale \(S_v\) (V/div) et la vitesse de balayage \(S_h\) (s/div) :</p>
<p style="text-align:center">\(U_m = S_v\cdot y \qquad T = S_h\cdot x \qquad f = \dfrac{1}{T}\)</p>
<p>Une tension <b>alternative sinusoïdale</b> est périodique, alternativement positive et négative ; sa valeur efficace (lue par un voltmètre en mode AC) est \(U_{eff} = \dfrac{U_m}{\sqrt 2}\). Au Maroc, le secteur : 220 V, 50 Hz.</p>` },
    ],
    formules: [
      { tex: TX`U_{AB} = V_A - V_B = -U_{BA}`, sens: 'Tension entre A et B (V)' },
      { tex: TX`U_{AC} = U_{AB} + U_{BC}`, sens: 'Additivité des tensions' },
      { tex: TX`U_m = S_v\cdot y \qquad T = S_h\cdot x`, sens: 'Lecture à l’oscilloscope' },
      { tex: TX`f = \dfrac{1}{T}`, sens: 'Fréquence (Hz)' },
      { tex: TX`U_{eff} = \dfrac{U_m}{\sqrt 2}`, sens: 'Valeur efficace d’une tension sinusoïdale' },
    ],
    retenir: [
      TX`\(U_{AB} = V_A - V_B\) ; c’est une grandeur algébrique.`,
      'Le voltmètre se branche en dérivation.',
      'Les tensions s’ajoutent le long d’un circuit ; la somme algébrique est nulle dans une maille.',
      'Des dipôles en dérivation ont la même tension.',
      TX`Oscilloscope : \(U_m = S_v\,y\), \(T = S_h\,x\) ; \(U_{eff} = U_m/\sqrt2\).`,
    ],
    erreurs: [
      TX`Oublier le signe : \(U_{BA} = -U_{AB}\).`,
      'Brancher le voltmètre en série.',
      TX`Mesurer \(x\) ou \(y\) en cm au lieu de divisions.`,
      TX`Confondre valeur maximale \(U_m\) et valeur efficace \(U_{eff}\).`,
      'Lire la période sur une demi-oscillation.',
    ],
  },
  experiences: {
    sims: ['oscilloscope', 'assoc'],
    protocole: { titre: 'Visualiser une tension alternative à l’oscilloscope', materiel: 'GBF, oscilloscope, voltmètre (mode AC), fils.',
      etapes: ['Relier le GBF à la voie 1 de l’oscilloscope et régler une tension sinusoïdale.', TX`Choisir \(S_v\) et \(S_h\) pour voir 2 à 3 périodes sur l’écran.`, TX`Mesurer \(y\) (nombre de divisions pour \(U_m\)) et \(x\) (pour une période).`, TX`Mesurer la tension avec le voltmètre et comparer à \(U_m/\sqrt2\).`] },
    observations: TX`<ul><li>La courbe est une sinusoïde qui se répète à chaque période.</li><li>Le voltmètre affiche une valeur plus petite que \(U_m\) : environ \(0{,}71\,U_m\).</li></ul>`,
    conclusion: TX`<p>On calcule \(U_m = S_v\,y\), \(T = S_h\,x\), \(f = 1/T\) ; le voltmètre en alternatif indique la valeur efficace \(U_{eff} = U_m/\sqrt2\).</p>`,
  },
  quiz: [
    { q: TX`\(V_A = 5\ \text{V}\) et \(V_B = 2\ \text{V}\). La tension \(U_{BA}\) vaut :`, o: ['3 V', '−3 V', '7 V', '−7 V'], r: 1, e: TX`\(U_{BA} = V_B - V_A = -3\ \text{V}\).` },
    { q: 'Le voltmètre se branche :', o: ['en série', 'en dérivation', 'à la place du générateur', 'entre deux nœuds seulement'], r: 1, e: 'Il mesure la tension entre deux points.' },
    { q: TX`\(U_{AB} = 4\ \text{V}\), \(U_{BC} = 2\ \text{V}\). \(U_{AC}\) vaut :`, o: ['2 V', '6 V', '8 V', '−2 V'], r: 1, e: 'Additivité des tensions.' },
    { q: TX`Une période occupe 4 div avec \(S_h = 5\ \text{ms/div}\). La fréquence :`, o: ['20 Hz', '50 Hz', '200 Hz', '0,02 Hz'], r: 1, e: TX`\(T = 20\ \text{ms}\), \(f = 50\ \text{Hz}\).` },
    { q: TX`\(U_m = 311\ \text{V}\). La valeur efficace est environ :`, o: ['311 V', '440 V', '220 V', '155 V'], r: 2, e: TX`\(311/\sqrt2 \approx 220\ \text{V}\).` },
  ],
};
