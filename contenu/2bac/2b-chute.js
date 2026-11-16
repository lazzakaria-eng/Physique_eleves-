/* 2ᵉ Bac · Physique · Mécanique · Chute verticale d’un solide */
'use strict';
CONTENU['2b-chute'] = {
  resume: {
    intro: TX`Un solide qui tombe verticalement est soumis à son poids, à la poussée d’Archimède et à une force de frottement fluide. Sans frottement (<b>chute libre</b>), son accélération vaut \(g\). Avec frottement, sa vitesse tend vers une <b>vitesse limite</b>.`,
    sections: [
      { titre: '1. Chute libre', sim: 'chute', html: TX`<p>Seul le poids agit : \(\vec a = \vec g\). Axe Oz vers le bas : \(v = gt + v_0\) et \(z = \tfrac12 gt^2 + v_0t + z_0\). L’accélération ne dépend pas de la masse.</p>` },
      { titre: '2. Chute avec frottement fluide', html: TX`<p>Forces : poids \(mg\), poussée d’Archimède \(F_A = \rho_f V g\), frottement \(f = k\,v^n\) (n = 1 aux faibles vitesses, n = 2 aux grandes). 2ᵉ loi : \(m\dfrac{dv}{dt} = mg - F_A - kv^n\), soit \(\dfrac{dv}{dt} = A - B\,v^n\) avec \(A = g\Big(1 - \dfrac{\rho_f V}{m}\Big)\) et \(B = \dfrac{k}{m}\).</p>` },
      { titre: '3. Régime transitoire et permanent', html: TX`<p>La vitesse augmente puis tend vers la <b>vitesse limite</b> \(v_\ell = \Big(\dfrac{A}{B}\Big)^{1/n}\) (accélération nulle). <b>Temps caractéristique</b> τ : abscisse du point où la tangente à l’origine coupe l’asymptote \(v = v_\ell\).</p>`
        + FIG(440, 190, `<line x1="40" y1="170" x2="420" y2="170" stroke="#5b6577"/><line x1="40" y1="180" x2="40" y2="10" stroke="#5b6577"/><text x="410" y="188">t</text><text x="46" y="20">v</text><line x1="40" y1="40" x2="420" y2="40" stroke="#9aa6bf" stroke-dasharray="5 4"/><text x="12" y="44">v_ℓ</text><polyline points="${Array.from({ length: 77 }, (_, i) => (40 + i * 5) + ',' + (170 - 130 * Math.tanh(i * 5 / 70)).toFixed(1)).join(' ')}" fill="none" stroke="#1f6fe0" stroke-width="3"/><line x1="40" y1="170" x2="110" y2="40" stroke="#d93a4a" stroke-dasharray="5 3"/><text x="104" y="188" fill="#d93a4a">τ</text><text x="200" y="70" font-size="11">régime permanent</text><text x="50" y="120" font-size="11">transitoire</text>`) },
      { titre: '4. Méthode d’Euler', html: TX`<p>Résolution numérique de \(\dfrac{dv}{dt} = A - Bv^n\) avec un pas \(\Delta t\) : \(a_i = A - B\,v_i^n\) puis \(v_{i+1} = v_i + a_i\,\Delta t\). Plus le pas est petit, plus la solution est précise.</p>` },
    ],
    formules: [
      { tex: TX`a = g \qquad v = g\,t + v_0`, sens: 'Chute libre (axe vers le bas)' },
      { tex: TX`z = \dfrac{1}{2}g\,t^2 + v_0\,t + z_0`, sens: 'Équation horaire' },
      { tex: TX`m\,\dfrac{dv}{dt} = m\,g - F_A - k\,v^n`, sens: 'Chute avec frottement' },
      { tex: TX`\dfrac{dv}{dt} = A - B\,v^n`, sens: 'Équation différentielle' },
      { tex: TX`v_\ell = \Big(\dfrac{A}{B}\Big)^{1/n}`, sens: 'Vitesse limite' },
      { tex: TX`v_{i+1} = v_i + a_i\,\Delta t`, sens: 'Méthode d’Euler' },
    ],
    retenir: [
      'Chute libre : seul le poids ; a = g, indépendante de la masse.',
      'Avec frottement : vitesse limite quand les forces se compensent.',
      'Régime transitoire puis régime permanent.',
      'Euler : calcul pas à pas de la vitesse.',
    ],
    erreurs: [
      'Oublier la poussée d’Archimède dans un liquide.',
      'Confondre τ et le temps pour atteindre v_ℓ.',
      'Se tromper de signe en orientant l’axe vers le haut.',
    ],
  },
  experiences: {
    sims: ['chute'],
    protocole: { titre: 'Chute d’une bille dans l’huile', materiel: 'éprouvette d’huile, bille d’acier, caméra et logiciel de pointage (ou simulation « chute »).',
      etapes: ['Filmer la chute de la bille et pointer ses positions.', 'Tracer v = f(t).', 'Déterminer v_ℓ et τ.', TX`Retrouver A (pente à l’origine) et B = A/v_ℓ (si n = 1).`] },
    observations: TX`<ul><li>La vitesse croît rapidement puis devient constante.</li><li>La pente à l’origine est inférieure à g (poussée d’Archimède).</li></ul>`,
    conclusion: TX`<p>Le modèle \(dv/dt = A - Bv\) décrit bien la chute ; \(v_\ell = A/B\).</p>`,
  },
  quiz: [
    { q: 'Un objet lâché tombe en chute libre pendant 2 s (g = 10). v :', o: ['10 m/s', '20 m/s', '40 m/s', '5 m/s'], r: 1, e: TX`\(v = gt\).` },
    { q: 'Distance parcourue en 3 s depuis le repos (g = 10) :', o: ['15 m', '30 m', '45 m', '90 m'], r: 2, e: TX`\(\tfrac12\times10\times9\).` },
    { q: 'À la vitesse limite, l’accélération est :', o: ['g', 'nulle', 'maximale', 'négative'], r: 1, e: 'Les forces se compensent.' },
    { q: TX`A = 9 m/s², B = 3 s⁻¹, n = 1. v_ℓ :`, o: ['27 m/s', '3 m/s', '0,33 m/s', '12 m/s'], r: 1, e: TX`\(A/B\).` },
    { q: 'En chute libre, une bille lourde et une bille légère tombent :', o: ['la lourde plus vite', 'la légère plus vite', 'de la même façon', 'impossible à dire'], r: 2, e: 'a = g.' },
  ],
};
