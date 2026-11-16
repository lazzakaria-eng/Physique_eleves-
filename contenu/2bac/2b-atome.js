/* 2ᵉ Bac PC/SM · Physique · Mécanique · Atome et mécanique de Newton */
'use strict';
CONTENU['2b-atome'] = {
  resume: {
    intro: TX`La mécanique de Newton ne suffit pas à décrire l’atome : son énergie est <b>quantifiée</b>. Un atome passe d’un niveau à un autre en absorbant ou en émettant un <b>photon</b> d’énergie \(h\nu\) égale à la différence d’énergie : c’est l’origine des spectres de raies.`,
    sections: [
      { titre: '1. Limites de la mécanique de Newton', html: TX`<p>Selon Newton, l’électron pourrait tourner sur n’importe quelle orbite et perdrait de l’énergie en rayonnant ; de plus tous les atomes d’un même élément devraient être différents. L’expérience montre au contraire des <b>spectres de raies</b> identiques pour tous les atomes d’un élément.</p>` },
      { titre: '2. Quantification de l’énergie', sim: 'bohr', html: TX`<p>L’énergie d’un atome ne peut prendre que certaines valeurs \(E_n\) (niveaux). Pour l’hydrogène : \(E_n = -\dfrac{13{,}6}{n^2}\ \text{eV}\). Niveau fondamental \(n = 1\) ; états excités \(n > 1\) ; ionisation (\(E = 0\)) : \(13{,}6\ \text{eV}\).</p>`
        + FIG(380, 220, `${[[1, -13.6], [2, -3.4], [3, -1.51], [4, -0.85], [5, -0.54]].map(([n, E]) => { const y = 20 - E * 13; return `<line x1="60" y1="${y}" x2="240" y2="${y}" stroke="#14213d" stroke-width="2"/>${n <= 3 ? `<text x="250" y="${y + 4}" font-size="11">n = ${n} : ${String(E).replace('.', ',')} eV</text>` : ''}`; }).join('')}<line x1="60" y1="12" x2="240" y2="12" stroke="#12946a" stroke-dasharray="5 4"/><text x="250" y="10" fill="#12946a" font-size="11">E = 0 (ionisé)</text><line x1="120" y1="39.6" x2="120" y2="64.2" stroke="#d93a4a" stroke-width="2.5"/><text x="80" y="56" fill="#d93a4a" font-size="11">hν</text>`) },
      { titre: '3. Émission et absorption', html: TX`<p>Transition entre les niveaux \(E_p\) et \(E_n\) : \(\Delta E = |E_p - E_n| = h\nu = \dfrac{hc}{\lambda}\), avec \(h = 6{,}63\times10^{-34}\ \text{J·s}\). <b>Émission</b> : l’atome descend d’un niveau et émet un photon ; <b>absorption</b> : il monte en absorbant un photon d’énergie exactement égale. Les raies d’absorption et d’émission d’un élément ont les mêmes longueurs d’onde.</p>` },
    ],
    formules: [
      { tex: TX`E_n = -\dfrac{13{,}6}{n^2}\ \text{(eV)}`, sens: 'Niveaux d’énergie de l’hydrogène' },
      { tex: TX`\Delta E = |E_p - E_n| = h\,\nu`, sens: 'Énergie du photon' },
      { tex: TX`\lambda = \dfrac{h\,c}{\Delta E}`, sens: 'Longueur d’onde de la radiation' },
      { tex: TX`h = 6{,}63\times10^{-34}\ \text{J·s}`, sens: 'Constante de Planck' },
      { tex: TX`E_{ionisation} = 13{,}6\ \text{eV}`, sens: 'Ionisation de l’hydrogène' },
    ],
    retenir: [
      'L’énergie d’un atome est quantifiée.',
      'Un photon emporte ou apporte exactement la différence d’énergie entre deux niveaux.',
      'Spectre de raies : signature d’un élément.',
      TX`Penser à convertir : \(1\ \text{eV} = 1{,}6\times10^{-19}\ \text{J}\).`,
    ],
    erreurs: [
      'Oublier de convertir les eV en J dans λ = hc/ΔE.',
      'Croire qu’un photon d’énergie quelconque peut être absorbé.',
      'Oublier le signe négatif des niveaux.',
    ],
  },
  experiences: {
    sims: ['bohr'],
    protocole: { titre: 'Spectres d’émission et d’absorption', materiel: 'lampe à hydrogène (ou à vapeur de sodium), réseau ou spectroscope, simulation « Bohr ».',
      etapes: ['Observer le spectre de la lampe à travers le spectroscope.', 'Repérer les raies visibles et noter leurs couleurs.', 'Dans la simulation, provoquer les transitions vers n = 2 et comparer les longueurs d’onde.'] },
    observations: TX`<ul><li>Le spectre est formé de raies fines (rouge 656 nm, bleu-vert 486 nm, violet 434 et 410 nm pour l’hydrogène).</li><li>Ces raies correspondent aux transitions vers le niveau n = 2.</li></ul>`,
    conclusion: TX`<p>Les raies prouvent la quantification de l’énergie : \(\lambda = hc/(E_p - E_n)\).</p>`,
  },
  quiz: [
    { q: 'Énergie du niveau n = 2 de l’hydrogène :', o: ['−13,6 eV', '−3,4 eV', '−6,8 eV', '0 eV'], r: 1, e: TX`\(-13{,}6/4\).` },
    { q: 'Énergie du photon émis lors de la transition 3 → 2 :', o: ['1,89 eV', '3,4 eV', '12,1 eV', '1,51 eV'], r: 0, e: TX`\(-1{,}51 - (-3{,}40)\).` },
    { q: 'Longueur d’onde correspondante (hc = 1240 eV·nm) :', o: ['656 nm', '486 nm', '122 nm', '1240 nm'], r: 0, e: TX`\(1240/1{,}89\).` },
    { q: 'Un atome d’hydrogène dans l’état fondamental absorbe un photon de 5 eV :', o: ['oui, il passe à n = 2', 'non, ce n’est pas une différence de niveaux', 'il est ionisé', 'il émet'], r: 1, e: 'E₂ − E₁ = 10,2 eV.' },
    { q: 'L’énergie d’ionisation de l’hydrogène depuis n = 1 :', o: ['13,6 eV', '3,4 eV', '0 eV', '10,2 eV'], r: 0, e: 'De −13,6 eV à 0.' },
  ],
};
