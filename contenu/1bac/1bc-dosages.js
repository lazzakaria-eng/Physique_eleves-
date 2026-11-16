/* 1ʳᵉ Bac · Chimie · Les dosages directs */
'use strict';
CONTENU['1bc-dosages'] = {
  resume: {
    intro: TX`<b>Doser</b> (titrer) une espèce, c’est déterminer sa concentration grâce à une réaction rapide, totale et unique avec un réactif de concentration connue. À l’<b>équivalence</b>, les réactifs ont été mélangés dans les proportions stœchiométriques.`,
    sections: [
      { titre: '1. Principe et montage', html: TX`<p>On place un volume \(V_A\) de solution à doser dans un bécher et on verse la solution titrante (concentration \(C_B\)) avec une <b>burette graduée</b>. On repère l’équivalence (volume \(V_E\)) par un changement de couleur ou par la conductimétrie.</p>`
        + FIG(240, 230, `<rect x="110" y="10" width="20" height="130" fill="#fff" stroke="#14213d" stroke-width="2"/><rect x="112" y="30" width="16" height="108" fill="#d98200" opacity=".5"/><path d="M114 140 h12 l-3 16 h-6 z" fill="#5b6577"/><text x="136" y="40" font-size="11">burette (C_B)</text><path d="M80 170 h80 v50 h-80 z" fill="#6aa5ff" opacity=".35" stroke="#14213d" stroke-width="2"/><text x="164" y="200" font-size="11">V_A à doser</text><rect x="70" y="220" width="100" height="8" fill="#5b6577"/>`) },
      { titre: '2. Relation à l’équivalence', sim: 'dosage_cond', html: TX`<p>Pour la réaction \(a\,\text{A} + b\,\text{B} \to \dots\), à l’équivalence : \(\dfrac{n_0(\text{A})}{a} = \dfrac{n_E(\text{B})}{b}\), soit \(\dfrac{C_A\,V_A}{a} = \dfrac{C_B\,V_E}{b}\). Si \(a = b = 1\) : \(C_A\,V_A = C_B\,V_E\).</p>` },
      { titre: '3. Repérage de l’équivalence', sim: 'av_redox', html: TX`<ul><li><b>Colorimétrique</b> : une espèce colorée apparaît ou disparaît (permanganate violet qui ne se décolore plus), ou un indicateur change de couleur.</li><li><b>Conductimétrique</b> : la courbe \(\sigma = f(V)\) change de pente à l’équivalence ; \(V_E\) est l’abscisse du point d’intersection des deux segments.</li></ul>` },
    ],
    formules: [
      { tex: TX`\dfrac{n_0(\text{A})}{a} = \dfrac{n_E(\text{B})}{b}`, sens: 'Équivalence' },
      { tex: TX`\dfrac{C_A\,V_A}{a} = \dfrac{C_B\,V_E}{b}`, sens: 'Relation de dosage' },
      { tex: TX`C_A\,V_A = C_B\,V_E`, sens: 'Cas a = b = 1' },
      { tex: TX`\sigma = \sum\lambda_i\,[X_i]`, sens: 'Conductivité' },
    ],
    retenir: [
      'Réaction de dosage : rapide, totale, unique.',
      'À l’équivalence, il y a changement de réactif limitant.',
      'Utiliser les coefficients stœchiométriques dans la relation d’équivalence.',
      'En conductimétrie, V_E est au changement de pente.',
    ],
    erreurs: [
      'Oublier les coefficients (ex. MnO₄⁻ / Fe²⁺ : 1 pour 5).',
      'Confondre le volume versé et le volume dosé.',
      'Lire la burette sans se placer à hauteur du ménisque.',
    ],
  },
  experiences: {
    sims: ['dosage_cond', 'av_redox'],
    protocole: { titre: 'Dosage conductimétrique de l’acide chlorhydrique par la soude', materiel: 'burette, soude C_B = 0,10 mol/L, 20,0 mL d’acide chlorhydrique, conductimètre, agitateur magnétique.',
      etapes: ['Placer 20,0 mL d’acide dans le bécher avec de l’eau distillée pour immerger la cellule.', 'Verser la soude mL par mL et relever σ après chaque ajout.', 'Tracer σ = f(V) et déterminer V_E.', TX`Calculer \(C_A = C_BV_E/V_A\).`] },
    observations: TX`<ul><li>σ diminue (les ions H₃O⁺ très conducteurs sont remplacés par Na⁺) puis augmente après l’équivalence (excès de HO⁻ et Na⁺).</li><li>Les deux droites se coupent pour \(V_E = 12{,}0\ \text{mL}\).</li></ul>`,
    conclusion: TX`<p>\(C_A = \dfrac{0{,}10\times12{,}0}{20{,}0} = 0{,}060\ \text{mol/L}\).</p>`,
  },
  quiz: [
    { q: TX`\(V_A = 20\ \text{mL}\), \(C_B = 0{,}1\ \text{mol/L}\), \(V_E = 15\ \text{mL}\), a = b = 1. \(C_A\) :`, o: ['0,075 mol/L', '0,13 mol/L', '0,15 mol/L', '0,3 mol/L'], r: 0, e: TX`\(0{,}1\times15/20\).` },
    { q: TX`\(\text{MnO}_4^- + 5\text{Fe}^{2+} + \dots\) : à l’équivalence :`, o: [TX`\(n(\text{Fe}^{2+}) = n(\text{MnO}_4^-)\)`, TX`\(n(\text{Fe}^{2+}) = 5\,n(\text{MnO}_4^-)\)`, TX`\(5\,n(\text{Fe}^{2+}) = n(\text{MnO}_4^-)\)`, 'aucune'], r: 1, e: TX`\(n(\text{Fe}^{2+})/5 = n(\text{MnO}_4^-)/1\).` },
    { q: 'Une réaction de dosage doit être :', o: ['lente', 'totale et rapide', 'réversible', 'endothermique'], r: 1, e: 'Rapide, totale, unique.' },
    { q: 'Dans un dosage par le permanganate, l’équivalence est repérée par :', o: ['la persistance de la couleur violette', 'un précipité', 'un dégagement gazeux', 'la décoloration'], r: 0, e: 'Le permanganate en excès ne se décolore plus.' },
    { q: 'Avant l’équivalence, le réactif limitant est :', o: ['le réactif titré', 'le réactif titrant', 'aucun', 'l’eau'], r: 1, e: 'Le réactif versé est entièrement consommé.' },
  ],
};
