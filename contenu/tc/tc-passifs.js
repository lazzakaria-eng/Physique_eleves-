/* Tronc Commun · Physique · Électricité · Caractéristiques de quelques dipôles passifs */
'use strict';
CONTENU['tc-passifs'] = {
  resume: {
    intro: TX`Un <b>dipôle passif</b> ne fournit pas d’énergie : la tension à ses bornes est nulle quand il n’est parcouru par aucun courant. Sa <b>caractéristique</b> \(U = f(I)\) (ou \(I = f(U)\)) résume son comportement.`,
    sections: [
      { titre: '1. Tracer une caractéristique', html: TX`<p>On place le dipôle en série avec un générateur réglable (ou un potentiomètre) et une résistance de protection ; un ampèremètre en série mesure \(I\), un voltmètre en dérivation mesure \(U\). On relève des couples \((I, U)\) dans les deux sens de branchement, puis on trace la courbe.</p>` },
      { titre: '2. Dipôles linéaires et non linéaires', sim: 'caract', html: TX`<ul><li><b>Conducteur ohmique</b> : caractéristique droite passant par l’origine, <b>linéaire et symétrique</b> : \(U = RI\).</li><li><b>Lampe à incandescence</b> : symétrique mais <b>non linéaire</b> (sa résistance augmente quand le filament chauffe).</li><li><b>Thermistance (CTN)</b> : sa résistance diminue quand la température augmente ; <b>photorésistance (LDR)</b> : sa résistance diminue quand l’éclairement augmente.</li></ul>` },
      { titre: '3. La diode', html: TX`<p>La diode est <b>polarisée</b> (anode, cathode). En sens direct, elle conduit dès que \(U > U_s\) (tension de seuil \(\approx 0{,}6\ \text{V}\) pour le silicium) ; en sens inverse, \(I = 0\) : elle est <b>bloquée</b>. Modèle simplifié : \(U < U_s \Rightarrow I = 0\).</p>`
        + FIG(380, 170, `<line x1="40" y1="140" x2="360" y2="140" stroke="#5b6577" stroke-width="1.5"/><line x1="200" y1="160" x2="200" y2="10" stroke="#5b6577" stroke-width="1.5"/><text x="352" y="158">U</text><text x="206" y="20">I</text><path d="M40 140 L230 140 Q250 138 262 100 L285 20" fill="none" stroke="#1f6fe0" stroke-width="3"/><text x="226" y="156" font-size="11">Uₛ ≈ 0,6 V</text><text x="60" y="130" font-size="11">bloquée</text><text x="290" y="60" font-size="11">passante</text>`) },
      { titre: '4. La diode Zener', html: TX`<p>En sens direct, elle se comporte comme une diode ordinaire. En sens inverse, elle conduit quand la tension atteint \(-U_Z\) (tension Zener) : la tension reste alors pratiquement égale à \(-U_Z\) quel que soit le courant. On l’utilise pour <b>stabiliser</b> une tension.</p>` },
      { titre: '5. Point de fonctionnement', html: TX`<p>Quand un dipôle passif est branché à un générateur, le point de fonctionnement \(P(I_P, U_P)\) est l’intersection de leurs deux caractéristiques ; il donne la tension et l’intensité réelles dans le circuit.</p>` },
    ],
    formules: [
      { tex: TX`U = R\cdot I`, sens: 'Conducteur ohmique (linéaire)' },
      { tex: TX`U < U_s \ \Rightarrow\ I = 0`, sens: 'Diode bloquée (sens direct, sous le seuil)' },
      { tex: TX`U = -U_Z`, sens: 'Diode Zener en sens inverse, en conduction' },
      { tex: TX`R = \dfrac{U}{I}`, sens: 'Résistance en un point (dipôle non linéaire)' },
    ],
    retenir: [
      'Passif : U = 0 quand I = 0.',
      'Linéaire : caractéristique droite passant par l’origine ; symétrique : même comportement dans les deux sens.',
      'La diode laisse passer le courant dans un seul sens (au-delà du seuil).',
      'La Zener en inverse maintient une tension constante U_Z.',
      'Le point de fonctionnement est l’intersection des caractéristiques.',
    ],
    erreurs: [
      'Oublier la résistance de protection en série avec une diode.',
      'Croire qu’une lampe suit la loi d’Ohm.',
      'Inverser anode et cathode.',
      'Tracer la caractéristique sans relever les points dans les deux sens.',
      'Confondre tension de seuil et tension Zener.',
    ],
  },
  experiences: {
    sims: ['caract'],
    protocole: { titre: 'Tracer la caractéristique d’une diode', materiel: 'générateur réglable 0–6 V, diode au silicium, résistance de protection 100 Ω, ampèremètre (mA), voltmètre.',
      etapes: ['Monter la diode en sens direct en série avec la résistance et l’ampèremètre ; le voltmètre aux bornes de la diode.', 'Augmenter la tension par petits pas et relever (U, I).', 'Inverser la diode et recommencer.', 'Tracer I = f(U) et lire la tension de seuil ; comparer avec la simulation.'] },
    observations: TX`<ul><li>En sens direct, \(I \approx 0\) jusqu’à environ 0,6 V, puis augmente très vite.</li><li>En sens inverse, \(I = 0\).</li></ul>`,
    conclusion: TX`<p>La diode est un dipôle passif non linéaire et non symétrique : passante en sens direct au-delà de \(U_s\), bloquée en sens inverse.</p>`,
  },
  quiz: [
    { q: 'Un dipôle passif est un dipôle :', o: ['qui fournit de l’énergie', 'dont U = 0 quand I = 0', 'qui a toujours une caractéristique droite', 'qui contient une pile'], r: 1, e: 'C’est la définition.' },
    { q: 'La caractéristique d’une lampe est :', o: ['linéaire', 'non linéaire et symétrique', 'non symétrique', 'horizontale'], r: 1, e: 'Sa résistance varie avec la température du filament.' },
    { q: 'En sens inverse, une diode ordinaire est :', o: ['passante', 'bloquée', 'en court-circuit', 'détruite'], r: 1, e: 'I = 0 en sens inverse.' },
    { q: 'Une diode Zener sert surtout à :', o: ['amplifier un courant', 'stabiliser une tension', 'mesurer une intensité', 'produire de la lumière'], r: 1, e: 'Sa tension reste égale à U_Z en inverse.' },
    { q: 'La résistance d’une photorésistance quand l’éclairement augmente :', o: ['augmente', 'diminue', 'reste constante', 'devient infinie'], r: 1, e: 'Plus de lumière, plus de porteurs de charge.' },
  ],
};
