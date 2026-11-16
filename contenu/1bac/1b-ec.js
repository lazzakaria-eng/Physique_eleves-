/* 1ʳᵉ Bac · Physique · Travail et énergie · Travail et énergie cinétique */
'use strict';
CONTENU['1b-ec'] = {
  resume: {
    intro: TX`Un corps en mouvement possède une <b>énergie cinétique</b>. Le <b>théorème de l’énergie cinétique</b> relie sa variation à la somme des travaux des forces extérieures : c’est un outil puissant pour calculer une vitesse, une distance de freinage ou une force.`,
    sections: [
      { titre: '1. Énergie cinétique', sim: 'energie', html: TX`<p>Solide en <b>translation</b> (tous ses points ont la même vitesse) : \(E_c = \dfrac{1}{2}m\,v^2\) (J, avec m en kg et v en m/s).</p>
<p>Solide en <b>rotation</b> autour d’un axe fixe : \(E_c = \dfrac{1}{2}J_\Delta\,\omega^2\), où \(J_\Delta\) (kg·m²) est le <b>moment d’inertie</b> par rapport à l’axe (anneau : \(mR^2\) ; disque ou cylindre plein : \(\tfrac12 mR^2\) ; tige par son milieu : \(\tfrac{1}{12}mL^2\)).</p>` },
      { titre: '2. Théorème de l’énergie cinétique', html: TX`<p>Dans un référentiel galiléen, la variation de l’énergie cinétique d’un solide entre deux instants est égale à la somme des travaux des forces extérieures appliquées entre ces instants :</p><p style="text-align:center">\(\Delta E_c = E_{cB} - E_{cA} = \sum W_{AB}(\vec F_{ext})\)</p>
<p><b>Méthode</b> : système, référentiel, bilan des forces, travail de chaque force, application du théorème.</p>` },
      { titre: '3. Applications', sim: 'newton', html: TX`<ul><li><b>Chute libre</b> d’une hauteur \(h\) sans vitesse initiale : \(\tfrac12 mv^2 = mgh\), d’où \(v = \sqrt{2gh}\).</li><li><b>Freinage</b> sur une route horizontale avec une force de frottement constante \(f\) : \(0 - \tfrac12 mv_0^2 = -f\,d\), d’où \(d = \dfrac{mv_0^2}{2f}\) : la distance de freinage est proportionnelle au <b>carré</b> de la vitesse.</li></ul>` },
    ],
    formules: [
      { tex: TX`E_c = \dfrac{1}{2}\,m\,v^2`, sens: 'Énergie cinétique de translation (J)' },
      { tex: TX`E_c = \dfrac{1}{2}\,J_\Delta\,\omega^2`, sens: 'Énergie cinétique de rotation' },
      { tex: TX`\Delta E_c = E_{cB} - E_{cA} = \sum W_{AB}(\vec F_{ext})`, sens: 'Théorème de l’énergie cinétique' },
      { tex: TX`v = \sqrt{2\,g\,h}`, sens: 'Vitesse après une chute libre de hauteur h' },
    ],
    retenir: [
      TX`\(E_c\) est toujours positive ou nulle ; elle dépend du référentiel.`,
      'Si la vitesse double, l’énergie cinétique quadruple.',
      'Le théorème utilise la somme des travaux de toutes les forces extérieures.',
      'Le travail d’une force de frottement est négatif : il diminue E_c.',
      'La distance de freinage est proportionnelle au carré de la vitesse.',
    ],
    erreurs: [
      'Oublier de convertir les km/h en m/s.',
      'Oublier le carré de la vitesse.',
      'Oublier une force dans le bilan (réaction, frottement).',
      TX`Écrire \(\Delta E_c = E_{cA} - E_{cB}\).`,
    ],
  },
  experiences: {
    sims: ['energie', 'newton'],
    protocole: { titre: 'Vérifier le théorème avec un mobile sur un plan incliné', materiel: 'plan incliné (sans frottement : coussin d’air), mobile, capteurs de vitesse (ou chronophotographie).',
      etapes: ['Lâcher le mobile sans vitesse initiale en haut du plan.', 'Mesurer sa vitesse après plusieurs distances parcourues d.', TX`Tracer \(v^2 = f(d)\).`, TX`Comparer la pente à \(2g\sin\alpha\).`] },
    observations: TX`<ul><li>\(v^2\) est proportionnelle à la distance parcourue.</li><li>La pente de la droite vaut \(2g\sin\alpha\).</li></ul>`,
    conclusion: TX`<p>\(\tfrac12 mv^2 - 0 = mg\,d\sin\alpha\) : la variation d’énergie cinétique est égale au travail du poids (la réaction ne travaille pas).</p>`,
  },
  quiz: [
    { q: 'Une voiture de 1000 kg roule à 72 km/h. Son énergie cinétique :', o: ['2,6 MJ', '200 kJ', '36 kJ', '20 kJ'], r: 1, e: TX`\(v = 20\ \text{m/s}\), \(E_c = \tfrac12\times1000\times400\).` },
    { q: 'Si la vitesse est multipliée par 3, E_c est multipliée par :', o: ['3', '6', '9', '1,5'], r: 2, e: 'E_c varie comme v².' },
    { q: 'Vitesse après une chute libre de 5 m (g = 10) :', o: ['10 m/s', '50 m/s', '5 m/s', '100 m/s'], r: 0, e: TX`\(\sqrt{2\times10\times5}\).` },
    { q: 'Le travail d’une force de frottement est :', o: ['positif', 'nul', 'négatif', 'égal à E_c'], r: 2, e: 'Elle s’oppose au déplacement.' },
    { q: 'Disque plein (m = 2 kg, R = 0,1 m) à 10 rad/s. E_c :', o: ['0,5 J', '1 J', '0,1 J', '10 J'], r: 0, e: TX`\(J = \tfrac12\times2\times0{,}01 = 0{,}01\) ; \(E_c = \tfrac12\times0{,}01\times100\).` },
  ],
};
