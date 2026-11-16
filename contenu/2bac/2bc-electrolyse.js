/* 2ᵉ Bac PC/SM · Chimie · Transformations forcées – Électrolyse */
'use strict';
CONTENU['2bc-electrolyse'] = {
  resume: {
    intro: TX`Un générateur peut imposer à un système une évolution <b>dans le sens inverse</b> de son sens spontané : c’est une <b>transformation forcée</b>, ou <b>électrolyse</b>. Elle sert à produire des métaux, du dichlore, à recharger les accumulateurs et à protéger des objets (dépôts métalliques).`,
    sections: [
      { titre: '1. Principe', sim: 'electrolyse', html: TX`<p>Le générateur impose le sens du courant. Les électrons arrivent à la <b>cathode</b> (reliée au pôle −) où se produit une <b>réduction</b> ; ils partent de l’<b>anode</b> (reliée au pôle +) où se produit une <b>oxydation</b>. Le système évolue dans le sens tel que \(Q_r\) s’éloigne de K.</p>`
        + FIG(380, 200, `<rect x="60" y="80" width="260" height="110" fill="#6aa5ff" opacity=".35" stroke="#14213d" stroke-width="2"/><rect x="110" y="50" width="14" height="120" fill="#9aa6bf"/><rect x="256" y="50" width="14" height="120" fill="#9aa6bf"/><path d="M117 50 V20 H263 V50" fill="none" stroke="#14213d" stroke-width="2"/><rect x="176" y="6" width="28" height="28" fill="#fff"/><line x1="184" y1="6" x2="184" y2="34" stroke="#14213d" stroke-width="2.5"/><line x1="196" y1="12" x2="196" y2="28" stroke="#14213d" stroke-width="5"/><text x="172" y="4" font-size="11">+</text><text x="202" y="4" font-size="11">−</text><text x="80" y="196" font-size="11">cathode (−) : réduction</text><text x="210" y="196" font-size="11">anode (+) : oxydation</text>`) },
      { titre: '2. Exemples', html: TX`<ul><li>Électrolyse d’une solution de chlorure de cuivre : cathode \(\text{Cu}^{2+} + 2e^- \to \text{Cu}\) ; anode \(2\text{Cl}^- \to \text{Cl}_2 + 2e^-\).</li><li>Électrolyse de l’eau (acidulée) : cathode \(2\text{H}^+ + 2e^- \to \text{H}_2\) ; anode \(2\text{H}_2\text{O} \to \text{O}_2 + 4\text{H}^+ + 4e^-\).</li><li>Recharge d’un accumulateur au plomb : on inverse la réaction de décharge.</li></ul>` },
      { titre: '3. Bilan quantitatif', html: TX`<p>\(Q = I\,\Delta t = n(e^-)\,\mathcal F\) ; si z électrons par réaction : \(x = \dfrac{I\,\Delta t}{z\,\mathcal F}\). Masse déposée : \(m = \dfrac{I\,\Delta t\,M}{z\,\mathcal F}\) ; volume de gaz : \(V = \dfrac{I\,\Delta t\,V_m}{z\,\mathcal F}\).</p>` },
    ],
    formules: [
      { tex: TX`Q = I\,\Delta t = n(e^-)\,\mathcal F`, sens: 'Quantité d’électricité' },
      { tex: TX`x = \dfrac{I\,\Delta t}{z\,\mathcal F}`, sens: 'Avancement' },
      { tex: TX`m = \dfrac{I\,\Delta t\,M}{z\,\mathcal F}`, sens: 'Masse de métal déposée' },
      { tex: TX`V = \dfrac{I\,\Delta t\,V_m}{z\,\mathcal F}`, sens: 'Volume de gaz formé' },
    ],
    retenir: [
      'Électrolyse : transformation forcée par un générateur.',
      'Cathode (−) : réduction ; anode (+) : oxydation (comme dans une pile).',
      'm et V sont proportionnels à I·Δt.',
      'Applications : métallurgie, galvanoplastie, recharge des accumulateurs.',
    ],
    erreurs: [
      'Croire que la cathode est toujours le pôle + (c’est l’inverse dans l’électrolyse).',
      'Oublier z.',
      'Utiliser des minutes au lieu de secondes.',
    ],
  },
  experiences: {
    sims: ['electrolyse'],
    protocole: { titre: 'Cuivrage d’une clé', materiel: 'générateur, solution de sulfate de cuivre, clé (cathode), lame de cuivre (anode), ampèremètre, balance, chronomètre.',
      etapes: ['Peser la clé ; la relier au pôle −.', 'Faire passer I = 0,50 A pendant 20 min.', 'Rincer, sécher et peser.', 'Comparer la masse déposée à la valeur calculée.'] },
    observations: TX`<ul><li>La clé se recouvre de cuivre rouge.</li><li>Masse déposée ≈ 0,20 g.</li></ul>`,
    conclusion: TX`<p>\(m = \dfrac{0{,}50\times1200\times63{,}5}{2\times96\,500} \approx 0{,}20\ \text{g}\) : accord avec la mesure.</p>`,
  },
  quiz: [
    { q: 'Dans une électrolyse, la cathode est reliée :', o: ['au pôle + du générateur', 'au pôle − du générateur', 'au pont salin', 'à rien'], r: 1, e: 'Les électrons y arrivent.' },
    { q: 'À la cathode se produit :', o: ['une oxydation', 'une réduction', 'un dégagement de dichlore', 'rien'], r: 1, e: 'Gain d’électrons.' },
    { q: TX`I = 2 A pendant 9650 s, Cu²⁺ → Cu (M = 63,5). m :`, o: ['6,35 g', '12,7 g', '3,2 g', '63,5 g'], r: 0, e: TX`\(n(e^-) = 0{,}2\ \text{mol}\), \(n(\text{Cu}) = 0{,}1\ \text{mol}\).` },
    { q: 'L’électrolyse est une transformation :', o: ['spontanée', 'forcée', 'nucléaire', 'impossible'], r: 1, e: 'Imposée par un générateur.' },
    { q: 'Électrolyse de l’eau : gaz dégagé à la cathode :', o: ['dioxygène', 'dihydrogène', 'dichlore', 'dioxyde de carbone'], r: 1, e: TX`\(2\text{H}^+ + 2e^- \to \text{H}_2\).` },
  ],
};
