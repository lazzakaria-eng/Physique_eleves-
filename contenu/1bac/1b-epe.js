/* 1ʳᵉ Bac SM · Physique · Électrostatique · Énergie potentielle électrostatique */
'use strict';
CONTENU['1b-epe'] = {
  resume: {
    intro: TX`Le travail de la force électrostatique ne dépend pas du chemin suivi : on peut lui associer une <b>énergie potentielle électrostatique</b> \(E_{pe} = qV + C\). Une particule chargée accélérée par une tension gagne de l’énergie cinétique : c’est le principe du canon à électrons.`,
    sections: [
      { titre: '1. Travail de la force électrostatique', html: TX`<p>Dans un champ uniforme, la force \(\vec F = q\vec E\) est constante ; son travail entre A et B : \(W_{AB}(\vec F) = q\,\vec E\cdot\overrightarrow{AB} = q\,(V_A - V_B) = q\,U_{AB}\). Il est indépendant du chemin suivi.</p>` },
      { titre: '2. Potentiel et énergie potentielle', html: TX`<p>Dans un champ uniforme orienté selon Ox : \(V(x) = -E\,x + V_0\) : le potentiel <b>diminue dans le sens du champ</b>. L’énergie potentielle électrostatique d’une charge \(q\) au point de potentiel \(V\) : \(E_{pe} = q\,V + C\), avec \(\Delta E_{pe} = -W_{AB}(\vec F)\).</p>` },
      { titre: '3. Conservation de l’énergie', sim: 'champE', html: TX`<p>Si seule la force électrostatique travaille (poids négligeable) : \(E_c + E_{pe} = \text{constante}\), donc \(\tfrac12 mv_B^2 - \tfrac12 mv_A^2 = q\,U_{AB}\).</p>
<p><b>Électronvolt</b> : énergie gagnée par un électron accéléré sous 1 V : \(1\ \text{eV} = 1{,}6\times10^{-19}\ \text{J}\).</p>`
        + FIG(380, 140, ARW('ep1', '#d93a4a') + `<rect x="60" y="20" width="10" height="100" fill="#1f6fe0"/><text x="58" y="136" fill="#1f6fe0">C (−)</text><rect x="300" y="20" width="10" height="38" fill="#d93a4a"/><rect x="300" y="82" width="10" height="38" fill="#d93a4a"/><text x="292" y="136" fill="#d93a4a">A (+)</text><circle cx="90" cy="70" r="5" fill="#1f6fe0"/><line x1="96" y1="70" x2="290" y2="70" stroke="#d93a4a" stroke-width="2" marker-end="url(#ep1)"/><text x="150" y="60" font-size="11">électron accéléré</text><text x="330" y="74" font-size="11">→ faisceau</text>`) },
    ],
    formules: [
      { tex: TX`W_{AB}(\vec F) = q\,(V_A - V_B) = q\,U_{AB}`, sens: 'Travail de la force électrostatique' },
      { tex: TX`E_{pe} = q\,V + C`, sens: 'Énergie potentielle électrostatique' },
      { tex: TX`\Delta E_{pe} = -W_{AB}(\vec F)`, sens: 'Lien avec le travail' },
      { tex: TX`E_c + E_{pe} = \text{constante}`, sens: 'Conservation (seule la force électrique travaille)' },
      { tex: TX`1\ \text{eV} = 1{,}6\times10^{-19}\ \text{J}`, sens: 'Électronvolt' },
    ],
    retenir: [
      'Le travail de la force électrique ne dépend pas du chemin.',
      'Le potentiel diminue dans le sens du champ.',
      'Un électron est accéléré vers les potentiels croissants.',
      TX`\(\Delta E_c = qU_{AB}\) quand seule la force électrique travaille.`,
    ],
    erreurs: [
      TX`Inverser \(U_{AB}\) et \(U_{BA}\).`,
      'Oublier que la charge de l’électron est négative.',
      'Confondre eV et V.',
      'Utiliser une vitesse en km/s.',
    ],
  },
  experiences: {
    sims: ['champE'],
    protocole: { titre: 'Le canon à électrons', materiel: 'tube à faisceau d’électrons (démonstration), simulation « champ ».',
      etapes: ['Observer le faisceau pour plusieurs tensions d’accélération.', TX`Calculer la vitesse de sortie \(v = \sqrt{2eU/m}\).`, 'Dans la simulation, augmenter U et observer la vitesse de la particule.'] },
    observations: TX`<ul><li>Plus la tension est grande, plus les électrons sont rapides et moins le faisceau est dévié par un champ transversal.</li></ul>`,
    conclusion: TX`<p>L’énergie cinétique gagnée vaut \(eU\) : \(\tfrac12 mv^2 = eU\).</p>`,
  },
  quiz: [
    { q: 'Un électron accéléré sous 100 V gagne :', o: ['100 J', '100 eV', '1,6 eV', '−100 eV'], r: 1, e: 'ΔE_c = eU.' },
    { q: TX`\(q = 2\ \mu\text{C}\), \(U_{AB} = 50\ \text{V}\). \(W_{AB}\) :`, o: ['100 µJ', '25 µJ', '10⁻⁴ J', 'deux réponses justes'], r: 3, e: TX`\(2\times10^{-6}\times50 = 10^{-4}\ \text{J} = 100\ \mu\text{J}\).` },
    { q: 'Dans le sens du champ, le potentiel :', o: ['augmente', 'diminue', 'est constant', 'est nul'], r: 1, e: TX`\(V = -Ex + V_0\).` },
    { q: 'Le travail de la force électrostatique entre A et B :', o: ['dépend du chemin', 'ne dépend pas du chemin', 'est toujours nul', 'est toujours positif'], r: 1, e: TX`\(W = qU_{AB}\).` },
    { q: TX`1 eV vaut :`, o: [TX`\(1{,}6\times10^{-19}\ \text{J}\)`, '1 J', TX`\(9{,}1\times10^{-31}\ \text{J}\)`, '1 V'], r: 0, e: 'Énergie d’un électron sous 1 V.' },
  ],
};
