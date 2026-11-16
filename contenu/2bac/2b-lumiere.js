/* 2ᵉ Bac · Physique · Ondes · Propagation des ondes lumineuses */
'use strict';
CONTENU['2b-lumiere'] = {
  resume: {
    intro: TX`La lumière est une <b>onde électromagnétique</b> : elle se propage même dans le vide, à \(c = 3{,}00\times10^{8}\ \text{m/s}\). La diffraction en est la preuve. Une lumière monochromatique est caractérisée par sa fréquence \(\nu\), qui ne change pas d’un milieu à l’autre.`,
    sections: [
      { titre: '1. Diffraction de la lumière', sim: 'diffraction', html: TX`<p>Un faisceau laser traversant une fente (ou un fil) de largeur \(a\) donne sur un écran une tache centrale entourée de taches plus petites. Écart angulaire : \(\theta = \dfrac{\lambda}{a}\) (rad). Largeur de la tache centrale à la distance \(D\) : \(L = \dfrac{2\lambda D}{a}\) (car \(\tan\theta \approx \theta = \dfrac{L}{2D}\)).</p>`
        + FIG(460, 160, `<rect x="20" y="70" width="40" height="20" fill="#d93a4a"/><text x="14" y="110" font-size="11">laser</text><line x1="60" y1="80" x2="160" y2="80" stroke="#d93a4a" stroke-width="3"/><rect x="160" y="20" width="6" height="52" fill="#14213d"/><rect x="160" y="88" width="6" height="52" fill="#14213d"/><line x1="166" y1="80" x2="420" y2="40" stroke="#d93a4a" stroke-dasharray="4 3"/><line x1="166" y1="80" x2="420" y2="120" stroke="#d93a4a" stroke-dasharray="4 3"/><rect x="420" y="10" width="8" height="140" fill="#9aa6bf"/><rect x="430" y="40" width="10" height="80" fill="#d93a4a" opacity=".7"/><text x="200" y="84" font-size="12">θ</text><text x="280" y="150" font-size="11">D</text><text x="444" y="84" font-size="11">L</text>`) },
      { titre: '2. Lumière monochromatique et polychromatique', html: TX`<p>Dans le vide, \(\lambda_0 = \dfrac{c}{\nu}\). Domaine visible : de 400 nm (violet) à 800 nm (rouge). Une lumière blanche est polychromatique.</p>` },
      { titre: '3. Propagation dans un milieu transparent', sim: 'refraction', html: TX`<p>Indice \(n = \dfrac{c}{v} = \dfrac{\lambda_0}{\lambda}\) (la fréquence est conservée). Le verre est <b>dispersif</b> : \(n\) dépend de la fréquence (le violet est plus dévié que le rouge).</p>` },
      { titre: '4. Le prisme', html: TX`<p>Relations : \(\sin i = n\sin r\) ; \(\sin i' = n\sin r'\) ; \(A = r + r'\) ; déviation \(D = i + i' - A\). La dispersion décompose la lumière blanche en un spectre.</p>` },
    ],
    formules: [
      { tex: TX`\theta = \dfrac{\lambda}{a}`, sens: 'Écart angulaire de diffraction' },
      { tex: TX`L = \dfrac{2\,\lambda\,D}{a}`, sens: 'Largeur de la tache centrale' },
      { tex: TX`\lambda_0 = \dfrac{c}{\nu}`, sens: 'Longueur d’onde dans le vide' },
      { tex: TX`n = \dfrac{c}{v} = \dfrac{\lambda_0}{\lambda}`, sens: 'Indice de réfraction' },
      { tex: TX`A = r + r' \qquad D = i + i' - A`, sens: 'Relations du prisme' },
    ],
    retenir: [
      'La lumière se propage dans le vide : c’est une onde électromagnétique.',
      'θ = λ/a : plus la fente est fine, plus la tache est large.',
      'La fréquence ne change pas d’un milieu à l’autre ; λ et v changent.',
      'Le prisme disperse la lumière car n dépend de la fréquence.',
    ],
    erreurs: [
      'Oublier le facteur 2 dans L = 2λD/a.',
      'Penser que la couleur change en passant dans l’eau.',
      'Utiliser des nm et des mm sans conversion.',
    ],
  },
  experiences: {
    sims: ['diffraction', 'refraction'],
    protocole: { titre: 'Mesurer la longueur d’onde d’un laser', materiel: 'laser, fentes de largeurs connues (40 à 120 µm), écran à D = 2,0 m, règle.',
      etapes: ['Placer la fente devant le laser et mesurer la largeur L de la tache centrale.', 'Recommencer pour chaque fente.', TX`Tracer \(L = f(1/a)\).`, TX`La pente vaut \(2\lambda D\) : en déduire \(\lambda\).`] },
    observations: TX`<ul><li>La tache centrale s’élargit quand a diminue.</li><li>\(L\) est proportionnelle à \(1/a\).</li></ul>`,
    conclusion: TX`<p>La pente donne \(\lambda \approx 633\ \text{nm}\) pour un laser hélium-néon.</p>`,
  },
  quiz: [
    { q: TX`λ = 600 nm, a = 0,10 mm. θ :`, o: [TX`\(6\times10^{-3}\ \text{rad}\)`, TX`\(6\times10^{-6}\ \text{rad}\)`, '0,6 rad', '6 rad'], r: 0, e: TX`\(6\times10^{-7}/10^{-4}\).` },
    { q: 'Si on divise la largeur de la fente par 2, L :', o: ['double', 'est divisée par 2', 'ne change pas', 'quadruple'], r: 0, e: 'L ∝ 1/a.' },
    { q: 'Quand la lumière passe de l’air au verre, sa fréquence :', o: ['augmente', 'diminue', 'ne change pas', 'devient nulle'], r: 2, e: 'Seules λ et v changent.' },
    { q: TX`Fréquence d’une radiation de 500 nm dans le vide :`, o: [TX`\(6\times10^{14}\ \text{Hz}\)`, TX`\(1{,}5\times10^{2}\ \text{Hz}\)`, TX`\(6\times10^{8}\ \text{Hz}\)`, '500 Hz'], r: 0, e: TX`\(3\times10^{8}/5\times10^{-7}\).` },
    { q: 'Dans un prisme de verre, la radiation la plus déviée est :', o: ['le rouge', 'le violet', 'le vert', 'aucune'], r: 1, e: 'n est plus grand pour le violet.' },
  ],
};
