/* 2ᵉ Bac PC/SM · Physique · Électricité · Ondes électromagnétiques – Transmission d’information */
'use strict';
CONTENU['2b-ondes-em'] = {
  resume: {
    intro: TX`Les <b>ondes électromagnétiques</b> (radio, micro-ondes, lumière, rayons X…) se propagent dans le vide à la vitesse \(c\). Elles servent à transmettre des informations à distance : un signal de basse fréquence (son, image) est « transporté » par une onde de haute fréquence, la <b>porteuse</b>.`,
    sections: [
      { titre: '1. Les ondes électromagnétiques', sim: 'onde_per', html: TX`<p>Propagation dans le vide à \(c = 3{,}0\times10^{8}\ \text{m/s}\) ; \(\lambda = \dfrac{c}{f}\). Spectre : ondes radio (λ > 1 m), micro-ondes, infrarouge, visible (400 – 800 nm), ultraviolet, X, γ.</p>`
        + FIG(480, 80, `${[['radio', '#d98200'], ['micro-ondes', '#e2574c'], ['IR', '#c0392b'], ['visible', '#12946a'], ['UV', '#7a4fd6'], ['X', '#1f6fe0'], ['γ', '#14213d']].map(([n, c], k) => `<rect x="${10 + k * 66}" y="20" width="64" height="30" fill="${c}"/><text x="${42 + k * 66}" y="40" text-anchor="middle" fill="#fff" font-size="11">${n}</text>`).join('')}<text x="10" y="70" font-size="11">λ grande</text><text x="400" y="70" font-size="11">λ petite</text>`) },
      { titre: '2. Chaîne de transmission', html: TX`<p>Émetteur : capteur (micro) → signal électrique → <b>modulation</b> → antenne. Récepteur : antenne → sélection (circuit LC accordé) → <b>démodulation</b> → amplification → haut-parleur.</p>` },
      { titre: '3. Pourquoi moduler ?', sim: 'modulation', html: TX`<ul><li>Une antenne efficace doit avoir une taille de l’ordre de \(\lambda\) : pour un son (f ≈ 1 kHz, λ = 300 km) c’est impossible ; avec une porteuse de 1 MHz, λ = 300 m.</li><li>Des porteuses de fréquences différentes permettent de transmettre plusieurs émissions sans se mélanger.</li><li>Les ondes de basse fréquence s’atténuent vite.</li></ul><p>Condition : \(F_p \gg f_s\). Porteuse : \(p(t) = P_m\cos(2\pi F_p t)\).</p>` },
    ],
    formules: [
      { tex: TX`\lambda = \dfrac{c}{f}`, sens: 'Longueur d’onde dans le vide' },
      { tex: TX`p(t) = P_m\cos(2\pi F_p\,t)`, sens: 'Onde porteuse' },
      { tex: TX`F_p \gg f_s`, sens: 'Condition de modulation' },
    ],
    retenir: [
      'Les ondes électromagnétiques se propagent même dans le vide, à la vitesse c.',
      'On module une porteuse de haute fréquence par le signal à transmettre.',
      'Taille d’antenne de l’ordre de λ.',
      'Chaque station a sa fréquence porteuse.',
    ],
    erreurs: [
      'Confondre onde sonore (mécanique) et onde radio (électromagnétique).',
      'Croire que le son lui-même voyage par l’antenne.',
      'Oublier de convertir MHz en Hz.',
    ],
  },
  experiences: {
    sims: ['modulation', 'onde_per'],
    protocole: { titre: 'Visualiser une porteuse et un signal modulant', materiel: 'deux GBF, multiplieur (circuit intégré), oscilloscope (ou simulation « modulation »).',
      etapes: ['Régler la porteuse à 100 kHz et le signal à 1 kHz.', 'Visualiser chaque signal puis le signal modulé.', 'Observer l’effet d’une porteuse de fréquence trop basse.'] },
    observations: TX`<ul><li>L’enveloppe du signal modulé reproduit le signal basse fréquence.</li><li>Si \(F_p\) n’est pas très grande devant \(f_s\), l’enveloppe est mal définie.</li></ul>`,
    conclusion: TX`<p>La modulation permet de transporter l’information sur une onde haute fréquence ; il faut \(F_p \gg f_s\).</p>`,
  },
  quiz: [
    { q: 'Longueur d’onde d’une station FM à 100 MHz :', o: ['3 m', '30 m', '0,3 m', '300 m'], r: 0, e: TX`\(3\times10^{8}/10^{8}\).` },
    { q: 'Les ondes électromagnétiques se propagent :', o: ['seulement dans l’air', 'aussi dans le vide', 'seulement dans les métaux', 'seulement dans l’eau'], r: 1, e: 'Contrairement au son.' },
    { q: 'On module une porteuse car :', o: ['le son est trop rapide', 'une antenne pour basse fréquence serait gigantesque', 'pour augmenter le volume', 'pour changer la voix'], r: 1, e: 'Taille d’antenne ~ λ.' },
    { q: 'Le domaine de plus grande longueur d’onde :', o: ['rayons X', 'visible', 'ondes radio', 'UV'], r: 2, e: 'λ > 1 m.' },
    { q: 'Le circuit LC du récepteur sert à :', o: ['amplifier', 'sélectionner une station', 'démoduler', 'produire la porteuse'], r: 1, e: 'Il est accordé sur F_p.' },
  ],
};
