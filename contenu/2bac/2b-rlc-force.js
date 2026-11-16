/* 2ᵉ Bac SM · Physique · Électricité · Circuit RLC série en régime sinusoïdal forcé */
'use strict';
CONTENU['2b-rlc-force'] = {
  resume: {
    intro: TX`Alimenté par un générateur de tension sinusoïdale de fréquence \(N\), un circuit RLC série oscille à la fréquence <b>imposée</b> \(N\) (régime forcé). L’intensité est maximale quand \(N\) est égale à la fréquence propre \(N_0\) : c’est la <b>résonance d’intensité</b>.`,
    sections: [
      { titre: '1. Impédance et déphasage', sim: 'rlcf', html: TX`<p>\(u = U_m\cos(\omega t)\), \(i = I_m\cos(\omega t - \varphi)\). Impédance \(Z = \dfrac{U}{I} = \sqrt{R^2 + \Big(L\omega - \dfrac{1}{C\omega}\Big)^2}\) (Ω), déphasage \(\tan\varphi = \dfrac{L\omega - 1/(C\omega)}{R}\). Circuit inductif si \(\varphi > 0\), capacitif si \(\varphi < 0\).</p>` },
      { titre: '2. Résonance d’intensité', html: TX`<p>Pour \(L\omega_0 = \dfrac{1}{C\omega_0}\) : \(N_0 = \dfrac{1}{2\pi\sqrt{LC}}\), \(Z = R\) minimale, \(I_0 = U/R\) maximale, \(\varphi = 0\) (u et i en phase).</p>`
        + FIG(440, 190, `<line x1="40" y1="170" x2="420" y2="170" stroke="#5b6577"/><line x1="40" y1="180" x2="40" y2="10" stroke="#5b6577"/><text x="410" y="188">N</text><text x="46" y="20">I</text><polyline points="${Array.from({ length: 190 }, (_, i) => { const N = 0.1 + i * 0.02; const y = 1 / Math.sqrt(1 + 9 * (N - 1 / N) ** 2); return (40 + i * 2) + ',' + (170 - 140 * y).toFixed(1); }).join(' ')}" fill="none" stroke="#1f6fe0" stroke-width="3"/><line x1="130" y1="170" x2="130" y2="30" stroke="#d93a4a" stroke-dasharray="4 3"/><text x="124" y="188" fill="#d93a4a">N₀</text><line x1="40" y1="71" x2="420" y2="71" stroke="#12946a" stroke-dasharray="3 3"/><text x="300" y="66" fill="#12946a" font-size="11">I₀/√2 → bande passante</text>`) },
      { titre: '3. Bande passante et facteur de qualité', html: TX`<p>Bande passante à −3 dB : fréquences pour lesquelles \(I \ge I_0/\sqrt2\) ; largeur \(\Delta N = \dfrac{R}{2\pi L}\). Facteur de qualité \(Q = \dfrac{N_0}{\Delta N} = \dfrac{L\omega_0}{R}\) : plus R est faible, plus la résonance est <b>aiguë</b> (sélective).</p>` },
      { titre: '4. Puissance', html: TX`<p>Puissance moyenne : \(P = U\,I\cos\varphi = R\,I^2\) (U, I efficaces). Facteur de puissance \(\cos\varphi\), égal à 1 à la résonance.</p>` },
    ],
    formules: [
      { tex: TX`Z = \sqrt{R^2 + \Big(L\omega - \dfrac{1}{C\omega}\Big)^2}`, sens: 'Impédance (Ω)' },
      { tex: TX`\tan\varphi = \dfrac{L\omega - \dfrac{1}{C\omega}}{R}`, sens: 'Déphasage' },
      { tex: TX`N_0 = \dfrac{1}{2\pi\sqrt{LC}}`, sens: 'Fréquence de résonance' },
      { tex: TX`\Delta N = \dfrac{R}{2\pi L} \qquad Q = \dfrac{N_0}{\Delta N}`, sens: 'Bande passante ; facteur de qualité' },
      { tex: TX`P = U\,I\cos\varphi`, sens: 'Puissance moyenne' },
    ],
    retenir: [
      'En régime forcé, le circuit oscille à la fréquence du générateur.',
      'À la résonance : Z = R, φ = 0, I maximale.',
      'Faible R : résonance aiguë, Q grand.',
      'Seule la résistance consomme de la puissance.',
    ],
    erreurs: [
      'Confondre fréquence propre et fréquence imposée.',
      'Utiliser N au lieu de ω = 2πN dans Lω.',
      'Oublier la racine dans Z.',
    ],
  },
  experiences: {
    sims: ['rlcf'],
    protocole: { titre: 'Courbe de résonance', materiel: 'GBF, R = 50 Ω, bobine L = 0,1 H, C = 1 µF, oscilloscope (u et u_R).',
      etapes: ['Faire varier N de 100 Hz à 1000 Hz à tension efficace constante.', TX`Mesurer \(I = U_R/R\) pour chaque fréquence.`, 'Tracer I = f(N), repérer N₀ et la bande passante.', 'Recommencer avec R = 200 Ω.'] },
    observations: TX`<ul><li>I est maximale vers 503 Hz ; u et i sont alors en phase.</li><li>Avec R plus grande, le pic est plus bas et plus large.</li></ul>`,
    conclusion: TX`<p>\(N_0 = 1/(2\pi\sqrt{LC}) \approx 503\ \text{Hz}\) ; l’acuité dépend de R.</p>`,
  },
  quiz: [
    { q: TX`L = 0,1 H, C = 1 µF. N₀ ≈`, o: ['503 Hz', '159 Hz', '3160 Hz', '50 Hz'], r: 0, e: TX`\(1/(2\pi\sqrt{10^{-7}})\).` },
    { q: 'À la résonance, l’impédance vaut :', o: ['0', 'R', 'Lω', '∞'], r: 1, e: 'Les termes L et C se compensent.' },
    { q: 'À la résonance, le déphasage u/i est :', o: ['π/2', '0', 'π', '−π/2'], r: 1, e: 'u et i en phase.' },
    { q: 'Pour une résonance plus aiguë, il faut :', o: ['augmenter R', 'diminuer R', 'augmenter U', 'diminuer N'], r: 1, e: 'ΔN = R/(2πL).' },
    { q: 'Si φ > 0, le circuit est :', o: ['capacitif', 'inductif', 'résistif', 'à la résonance'], r: 1, e: 'Lω > 1/(Cω).' },
  ],
};
