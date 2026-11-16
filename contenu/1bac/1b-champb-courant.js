/* 1ʳᵉ Bac · Physique · Électromagnétisme · Champ magnétique créé par un courant */
'use strict';
CONTENU['1b-champb-courant'] = {
  resume: {
    intro: TX`Un courant électrique crée un champ magnétique (expérience d’Œrsted, 1820). Son intensité est proportionnelle à l’intensité du courant ; sa forme dépend de la géométrie du conducteur : fil rectiligne, bobine plate ou solénoïde.`,
    sections: [
      { titre: '1. Fil rectiligne', sim: 'boussole', html: TX`<p>Les lignes de champ sont des <b>cercles</b> centrés sur le fil, dans des plans perpendiculaires au fil. Sens donné par la règle de la <b>main droite</b> (pouce dans le sens du courant, les doigts s’enroulent dans le sens de \(\vec B\)). Intensité à la distance \(d\) : \(B = \dfrac{\mu_0\,I}{2\pi\,d}\).</p>` },
      { titre: '2. Bobine plate', html: TX`<p>Au centre d’une bobine plate de \(N\) spires de rayon \(R\) : \(B = \dfrac{\mu_0\,N\,I}{2R}\), perpendiculaire au plan des spires.</p>` },
      { titre: '3. Le solénoïde', sim: 'solenoide', html: TX`<p>À l’intérieur d’un long solénoïde (longueur \(L\) grande devant le rayon), le champ est <b>uniforme</b>, parallèle à l’axe : \(B = \mu_0\,n\,I = \mu_0\,\dfrac{N}{L}\,I\) (\(n\) : nombre de spires par mètre). À l’extérieur, il ressemble à celui d’un aimant droit : face nord (sortie des lignes) et face sud.</p>`
        + FIG(440, 150, ARW('s1', '#1f6fe0') + `${Array.from({ length: 10 }, (_, k) => `<ellipse cx="${110 + k * 24}" cy="75" rx="8" ry="40" fill="none" stroke="#d98200" stroke-width="2.5"/>`).join('')}${[55, 75, 95].map(y => `<line x1="90" y1="${y}" x2="350" y2="${y}" stroke="#1f6fe0" stroke-width="1.6" marker-end="url(#s1)"/>`).join('')}<text x="70" y="80" font-weight="bold">S</text><text x="360" y="80" font-weight="bold">N</text><text x="220" y="140" text-anchor="middle" font-size="11">champ uniforme à l’intérieur</text>`) },
      { titre: '4. Perméabilité du vide', html: TX`<p>\(\mu_0 = 4\pi\times10^{-7}\ \text{T·m·A}^{-1}\). Un noyau de fer doux à l’intérieur d’une bobine renforce fortement le champ (électroaimant).</p>` },
    ],
    formules: [
      { tex: TX`B = \dfrac{\mu_0\,I}{2\pi\,d}`, sens: 'Fil rectiligne infini' },
      { tex: TX`B = \dfrac{\mu_0\,N\,I}{2\,R}`, sens: 'Centre d’une bobine plate' },
      { tex: TX`B = \mu_0\,n\,I = \mu_0\,\dfrac{N}{L}\,I`, sens: 'Intérieur d’un solénoïde' },
      { tex: TX`\mu_0 = 4\pi\times10^{-7}\ \text{T·m·A}^{-1}`, sens: 'Perméabilité du vide' },
    ],
    retenir: [
      'Un courant crée un champ magnétique proportionnel à I.',
      'Fil : lignes circulaires ; règle de la main droite.',
      'Solénoïde : champ uniforme à l’intérieur, B = μ₀nI.',
      'Inverser le courant inverse le champ.',
    ],
    erreurs: [
      TX`Utiliser \(N\) au lieu de \(n = N/L\) pour le solénoïde.`,
      'Oublier de convertir les cm en m.',
      'Se tromper de face nord / sud du solénoïde.',
    ],
  },
  experiences: {
    sims: ['solenoide', 'boussole'],
    protocole: { titre: 'Vérifier B = μ₀nI', materiel: 'solénoïde, générateur, ampèremètre, rhéostat, teslamètre.',
      etapes: ['Placer la sonde du teslamètre au centre du solénoïde, parallèle à l’axe.', 'Faire varier I de 0 à 2 A et relever B.', 'Tracer B = f(I) et comparer la pente à μ₀n.', 'Déplacer la sonde le long de l’axe pour vérifier l’uniformité.'] },
    observations: TX`<ul><li>B est proportionnel à I.</li><li>B est pratiquement constant à l’intérieur, sauf près des extrémités.</li></ul>`,
    conclusion: TX`<p>À l’intérieur d’un long solénoïde : \(B = \mu_0 n I\), champ uniforme.</p>`,
  },
  quiz: [
    { q: TX`Solénoïde : 1000 spires, L = 50 cm, I = 2 A. B :`, o: ['5,0 mT', '2,5 mT', '1,6 mT', '50 mT'], r: 0, e: TX`\(4\pi\times10^{-7}\times2000\times2 \approx 5{,}0\times10^{-3}\ \text{T}\).` },
    { q: 'Si on double I, B :', o: ['double', 'quadruple', 'reste le même', 'est divisé par 2'], r: 0, e: 'B est proportionnel à I.' },
    { q: 'Les lignes de champ d’un fil rectiligne sont :', o: ['des droites', 'des cercles', 'des spirales', 'parallèles au fil'], r: 1, e: 'Centrés sur le fil.' },
    { q: TX`Fil : I = 10 A, d = 2 cm. B :`, o: ['0,1 mT', '1 mT', '10 mT', '0,01 mT'], r: 0, e: TX`\(2\times10^{-7}\times10/0{,}02 = 10^{-4}\ \text{T}\).` },
    { q: 'Le champ à l’intérieur d’un long solénoïde est :', o: ['nul', 'uniforme', 'circulaire', 'radial'], r: 1, e: 'Parallèle à l’axe.' },
  ],
};
