/* Tronc Commun · Physique · Électricité · Le transistor */
'use strict';
CONTENU['tc-transistor'] = {
  resume: {
    intro: TX`Le <b>transistor bipolaire</b> est un composant à trois bornes (base B, collecteur C, émetteur E). Un faible courant de base \(I_B\) commande un courant de collecteur \(I_C\) beaucoup plus grand : c’est l’<b>effet transistor</b>. Il sert d’amplificateur ou d’interrupteur commandé.`,
    sections: [
      { titre: '1. Description', html: TX`<p>Transistor NPN : trois bornes B, C, E ; la flèche, sur l’émetteur, indique le sens du courant. Loi des nœuds : \(I_E = I_B + I_C\).</p>`
        + FIG(300, 160, ARW('tr1', '#14213d') + `<circle cx="150" cy="80" r="45" fill="none" stroke="#14213d" stroke-width="2"/><line x1="70" y1="80" x2="130" y2="80" stroke="#14213d" stroke-width="2"/><line x1="130" y1="55" x2="130" y2="105" stroke="#14213d" stroke-width="5"/><line x1="130" y1="68" x2="175" y2="40" stroke="#14213d" stroke-width="2"/><line x1="175" y1="40" x2="175" y2="10" stroke="#14213d" stroke-width="2"/><line x1="130" y1="92" x2="172" y2="118" stroke="#14213d" stroke-width="2" marker-end="url(#tr1)"/><line x1="175" y1="120" x2="175" y2="150" stroke="#14213d" stroke-width="2"/><text x="60" y="74">B</text><text x="182" y="22">C</text><text x="182" y="148">E</text><text x="210" y="84" font-size="11">NPN</text>`) },
      { titre: '2. L’effet transistor', sim: 'transistor', html: TX`<p>Si \(I_B = 0\), alors \(I_C = 0\) : le transistor est <b>bloqué</b>. Si \(I_B > 0\) (et \(U_{BE} \approx 0{,}6\ \text{V}\)), un courant de collecteur apparaît : \(I_C = \beta\,I_B\), où \(\beta\) (gain en courant, souvent 100 à 300) est l’<b>amplification</b> en courant. On a alors \(I_E \approx I_C\).</p>` },
      { titre: '3. Régime de saturation', html: TX`<p>\(I_C\) est limité par le circuit du collecteur : \(I_{Csat} \approx \dfrac{E}{R_C}\). Quand \(\beta I_B\) dépasse cette valeur, le transistor est <b>saturé</b> : \(I_C = I_{Csat} < \beta I_B\) et \(U_{CE} \approx 0\). Il se comporte alors comme un <b>interrupteur fermé</b> entre C et E ; bloqué, comme un interrupteur ouvert.</p>` },
      { titre: '4. Applications', html: TX`<ul><li><b>Interrupteur commandé</b> : une photorésistance (LDR) ou une thermistance dans le circuit de base allume une lampe ou une LED selon la lumière ou la température (détecteur d’obscurité, alarme incendie).</li><li><b>Amplificateur</b> : un petit signal sur la base est reproduit, amplifié, sur le collecteur.</li></ul>` },
    ],
    formules: [
      { tex: TX`I_E = I_B + I_C`, sens: 'Loi des nœuds pour le transistor' },
      { tex: TX`I_C = \beta\cdot I_B`, sens: 'Régime linéaire (effet transistor)' },
      { tex: TX`I_B = 0 \Rightarrow I_C = 0`, sens: 'Transistor bloqué' },
      { tex: TX`I_C = I_{Csat} < \beta I_B \ ;\ U_{CE} \approx 0`, sens: 'Transistor saturé' },
    ],
    retenir: [
      'Trois bornes : base, collecteur, émetteur ; I_E = I_B + I_C.',
      'Un petit courant de base commande un grand courant de collecteur.',
      TX`Régime linéaire : \(I_C = \beta I_B\) avec \(\beta\) de l’ordre de 100.`,
      'Bloqué : interrupteur ouvert ; saturé : interrupteur fermé.',
      'Applications : détecteurs (lumière, température), amplificateurs.',
    ],
    erreurs: [
      TX`Appliquer \(I_C = \beta I_B\) en régime saturé.`,
      'Oublier la résistance de base (le transistor peut être détruit).',
      TX`Écrire \(I_C = I_B + I_E\) au lieu de \(I_E = I_B + I_C\).`,
      'Confondre collecteur et émetteur (la flèche est sur l’émetteur).',
    ],
  },
  experiences: {
    sims: ['transistor'],
    protocole: { titre: 'Mettre en évidence l’effet transistor', materiel: 'transistor NPN, générateurs 6 V et réglable, résistances (R_B = 10 kΩ, R_C = 100 Ω), deux milliampèremètres, LED.',
      etapes: ['Monter le circuit de base (générateur réglable, R_B, mA) et le circuit de collecteur (6 V, R_C, LED, mA).', TX`Augmenter progressivement la tension de base et relever \(I_B\) et \(I_C\).`, TX`Tracer \(I_C = f(I_B)\).`, 'Dans la simulation, faire varier β et R_C et repérer la saturation.'] },
    observations: TX`<ul><li>Tant que \(I_B = 0\), la LED est éteinte et \(I_C = 0\).</li><li>Puis \(I_C\) est proportionnel à \(I_B\) (droite de pente \(\beta\)).</li><li>Au-delà d’une certaine valeur, \(I_C\) n’augmente plus : saturation.</li></ul>`,
    conclusion: TX`<p>Le courant de base commande le courant de collecteur : \(I_C = \beta I_B\) en régime linéaire ; le transistor peut aussi fonctionner en tout-ou-rien (bloqué / saturé).</p>`,
  },
  quiz: [
    { q: TX`\(I_B = 50\ \mu\text{A}\) et \(\beta = 200\). En régime linéaire, \(I_C\) :`, o: ['10 mA', '4 mA', '250 µA', '1 A'], r: 0, e: TX`\(200\times50\ \mu\text{A} = 10\ \text{mA}\).` },
    { q: 'Si I_B = 0, le transistor est :', o: ['saturé', 'bloqué', 'en régime linéaire', 'détruit'], r: 1, e: 'Pas de courant de base, pas de courant de collecteur.' },
    { q: 'Saturé, le transistor se comporte comme :', o: ['un interrupteur ouvert', 'un interrupteur fermé', 'un condensateur', 'une pile'], r: 1, e: TX`\(U_{CE} \approx 0\).` },
    { q: TX`\(I_B = 0{,}1\ \text{mA}\), \(I_C = 15\ \text{mA}\). \(I_E\) :`, o: ['15,1 mA', '14,9 mA', '150 mA', '1,5 mA'], r: 0, e: TX`\(I_E = I_B + I_C\).` },
    { q: 'Dans un détecteur d’obscurité, la LDR est placée :', o: ['dans le circuit de base', 'à la place de la LED', 'en série avec le générateur de collecteur seulement', 'nulle part'], r: 0, e: 'Elle commande le courant de base selon l’éclairement.' },
  ],
};
