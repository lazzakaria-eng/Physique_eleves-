/* 2ᵉ Bac PC/SM · Physique · Électricité · Modulation d’amplitude */
'use strict';
CONTENU['2b-modulation'] = {
  resume: {
    intro: TX`En <b>modulation d’amplitude</b> (AM), l’amplitude de la porteuse varie au rythme du signal à transmettre. Le récepteur sélectionne la porteuse avec un circuit LC, puis la <b>démodule</b> (détecteur d’enveloppe) pour retrouver le signal.`,
    sections: [
      { titre: '1. Signal modulé', sim: 'modulation', html: TX`<p>Avec un multiplieur : \(u_s(t) = A\,[1 + m\cos(2\pi f_s t)]\cos(2\pi F_p t)\). Le <b>taux de modulation</b> \(m = \dfrac{S_m}{U_0} = \dfrac{U_{max} - U_{min}}{U_{max} + U_{min}}\).</p>`
        + FIG(460, 170, `<line x1="20" y1="85" x2="440" y2="85" stroke="#9aa6bf"/><polyline points="${Array.from({ length: 421 }, (_, i) => (20 + i) + ',' + (85 - 50 * (1 + 0.6 * Math.cos(2 * Math.PI * i / 210)) * Math.cos(2 * Math.PI * i / 12)).toFixed(1)).join(' ')}" fill="none" stroke="#1f6fe0" stroke-width="1.2"/><polyline points="${Array.from({ length: 421 }, (_, i) => (20 + i) + ',' + (85 - 50 * (1 + 0.6 * Math.cos(2 * Math.PI * i / 210))).toFixed(1)).join(' ')}" fill="none" stroke="#d93a4a" stroke-width="2.2" stroke-dasharray="6 4"/><text x="330" y="16" fill="#d93a4a" font-size="11">enveloppe</text>`) },
      { titre: '2. Qualité de la modulation', html: TX`<p>Pour éviter la <b>surmodulation</b> (enveloppe déformée) il faut \(m < 1\) et \(F_p \gg f_s\). Spectre : trois raies \(F_p - f_s\), \(F_p\), \(F_p + f_s\).</p>` },
      { titre: '3. Démodulation', html: TX`<ol><li><b>Sélection</b> : circuit LC accordé, \(N_0 = \dfrac{1}{2\pi\sqrt{LC}} = F_p\).</li><li><b>Détection d’enveloppe</b> : diode + circuit RC parallèle avec \(T_p \ll RC < T_s\).</li><li><b>Élimination de la composante continue</b> : filtre passe-haut (condensateur en série).</li></ol>` },
    ],
    formules: [
      { tex: TX`u_s(t) = A\,[1 + m\cos(2\pi f_s t)]\cos(2\pi F_p t)`, sens: 'Tension modulée' },
      { tex: TX`m = \dfrac{U_{max} - U_{min}}{U_{max} + U_{min}}`, sens: 'Taux de modulation' },
      { tex: TX`m < 1 \ \text{ et } \ F_p \gg f_s`, sens: 'Bonne modulation' },
      { tex: TX`T_p \ll RC < T_s`, sens: 'Détecteur d’enveloppe' },
      { tex: TX`N_0 = \dfrac{1}{2\pi\sqrt{LC}} = F_p`, sens: 'Accord du récepteur' },
    ],
    retenir: [
      'L’amplitude de la porteuse suit le signal modulant.',
      'm < 1 sinon surmodulation.',
      'Démodulation : sélection (LC), détection d’enveloppe (diode + RC), filtrage de la composante continue.',
      'Condition du détecteur : T_p ≪ RC < T_s.',
    ],
    erreurs: [
      'Inverser U_max et U_min dans m.',
      'Choisir RC trop grand (l’enveloppe ne suit plus le signal).',
      'Accorder le circuit LC sur f_s au lieu de F_p.',
    ],
  },
  experiences: {
    sims: ['modulation', 'rlcf'],
    protocole: { titre: 'Modulation et démodulation', materiel: 'deux GBF, multiplieur, diode, R = 10 kΩ, C variable, oscilloscope.',
      etapes: ['Produire un signal modulé (F_p = 50 kHz, f_s = 500 Hz).', 'Mesurer U_max et U_min et calculer m ; augmenter l’amplitude du signal jusqu’à la surmodulation.', 'Réaliser le détecteur d’enveloppe et tester plusieurs valeurs de C.'] },
    observations: TX`<ul><li>Pour m > 1, l’enveloppe est déformée.</li><li>Avec C trop petit, il reste des ondulations de la porteuse ; trop grand, l’enveloppe est lissée.</li></ul>`,
    conclusion: TX`<p>Une bonne transmission exige \(m < 1\), \(F_p \gg f_s\) et \(T_p \ll RC < T_s\).</p>`,
  },
  quiz: [
    { q: TX`U_max = 8 V, U_min = 2 V. m :`, o: ['0,6', '0,25', '4', '1,6'], r: 0, e: TX`\(6/10\).` },
    { q: 'Si m > 1 :', o: ['bonne modulation', 'surmodulation', 'pas de porteuse', 'démodulation'], r: 1, e: 'L’enveloppe ne reproduit plus le signal.' },
    { q: 'Le spectre d’un signal AM contient :', o: ['une raie', 'deux raies', 'trois raies', 'une infinité'], r: 2, e: TX`\(F_p\) et \(F_p \pm f_s\).` },
    { q: TX`F_p = 100 kHz, f_s = 1 kHz. RC convenable :`, o: ['0,1 ms', '1 µs', '10 ms', '1 s'], r: 0, e: TX`\(10\ \mu\text{s} \ll RC < 1\ \text{ms}\).` },
    { q: 'Le circuit LC du récepteur est accordé sur :', o: ['f_s', 'F_p', 'F_p + f_s', '0'], r: 1, e: 'Sélection de la station.' },
  ],
};
