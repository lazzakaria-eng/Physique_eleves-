/* 1ʳᵉ Bac SM · Physique · Optique · Quelques instruments d’optique */
'use strict';
CONTENU['1b-instruments'] = {
  resume: {
    intro: TX`Les instruments d’optique (loupe, microscope, lunette) permettent de voir un objet sous un angle plus grand qu’à l’œil nu. On les caractérise par leur <b>puissance</b> et leur <b>grossissement</b>.`,
    sections: [
      { titre: '1. L’œil et le diamètre apparent', html: TX`<p>L’œil normal voit net de son <b>punctum proximum</b> (\(d_m \approx 25\ \text{cm}\)) à l’infini. La taille perçue dépend du <b>diamètre apparent</b> \(\alpha\) (angle sous lequel on voit l’objet) ; on ne distingue deux points que si \(\alpha > \varepsilon \approx 3\times10^{-4}\ \text{rad}\).</p>` },
      { titre: '2. La loupe', sim: 'loupe', html: TX`<p>Lentille convergente de petite distance focale ; l’objet est placé entre F et O (de préférence en F : image à l’infini, observation sans fatigue).</p><p>Puissance \(P = \dfrac{\alpha'}{AB}\) (δ) ; puissance intrinsèque \(P_i = \dfrac{1}{f'}\) ; grossissement \(G = \dfrac{\alpha'}{\alpha}\), commercial \(G = \dfrac{0{,}25}{f'}\).</p>` },
      { titre: '3. Le microscope', sim: 'lentille', html: TX`<p>Un <b>objectif</b> (très petite focale \(f'_1\)) donne de l’objet une image réelle agrandie \(A_1B_1\) ; l’<b>oculaire</b> (focale \(f'_2\)) l’observe comme une loupe. Intervalle optique \(\Delta = \overline{F'_1F_2}\).</p><p style="text-align:center">\(P_i = \dfrac{\Delta}{f'_1\,f'_2} \qquad G = |\gamma_1|\,G_2\)</p>`
        + FIG(480, 150, `<line x1="10" y1="80" x2="470" y2="80" stroke="#5b6577"/><line x1="110" y1="30" x2="110" y2="130" stroke="#1f6fe0" stroke-width="3"/><text x="96" y="146">objectif</text><line x1="380" y1="20" x2="380" y2="140" stroke="#1f6fe0" stroke-width="3"/><text x="360" y="146">oculaire</text><line x1="80" y1="80" x2="80" y2="66" stroke="#d93a4a" stroke-width="3"/><text x="70" y="60">AB</text><line x1="330" y1="80" x2="330" y2="130" stroke="#d98200" stroke-width="3"/><text x="300" y="146">A₁B₁</text>`) },
    ],
    formules: [
      { tex: TX`P = \dfrac{\alpha'}{AB}`, sens: 'Puissance (δ)' },
      { tex: TX`G = \dfrac{\alpha'}{\alpha}`, sens: 'Grossissement' },
      { tex: TX`P_i = \dfrac{1}{f'} \qquad G = \dfrac{0{,}25}{f'}`, sens: 'Loupe (image à l’infini)' },
      { tex: TX`P_i = \dfrac{\Delta}{f'_1\,f'_2}`, sens: 'Puissance intrinsèque du microscope' },
      { tex: TX`G = |\gamma_1|\cdot G_2`, sens: 'Grossissement du microscope' },
    ],
    retenir: [
      'Un instrument augmente le diamètre apparent.',
      'Loupe : objet entre F et O ; en F, image à l’infini.',
      'Microscope : objectif (image réelle agrandie) + oculaire (loupe).',
      TX`\(G = P\cdot d_m\) avec \(d_m = 0{,}25\ \text{m}\).`,
    ],
    erreurs: [
      'Confondre puissance (δ) et grossissement (sans unité).',
      'Oublier la valeur absolue du grandissement de l’objectif.',
      'Exprimer les focales en cm dans les formules.',
    ],
  },
  experiences: {
    sims: ['loupe', 'lentille'],
    protocole: { titre: 'Réaliser un microscope sur banc d’optique', materiel: 'deux lentilles (f′₁ = 5 cm, f′₂ = 10 cm), objet lumineux, écran, banc d’optique.',
      etapes: ['Placer l’objectif pour obtenir une image A₁B₁ réelle et agrandie sur un écran.', 'Retirer l’écran et placer l’oculaire de façon que A₁B₁ soit dans son plan focal objet.', 'Observer à travers l’oculaire ; mesurer Δ.', TX`Calculer \(P_i\) et \(G\).`] },
    observations: TX`<ul><li>L’image finale est renversée par rapport à l’objet et très agrandie.</li><li>Elle est vue sans accommoder quand A₁B₁ est en F₂.</li></ul>`,
    conclusion: TX`<p>Le microscope associe deux grandissements : celui de l’objectif et le grossissement de l’oculaire.</p>`,
  },
  quiz: [
    { q: 'Loupe de f′ = 5 cm. Grossissement commercial :', o: ['5', '20', '0,2', '50'], r: 0, e: TX`\(0{,}25/0{,}05\).` },
    { q: 'Pour une observation sans fatigue avec une loupe, l’objet est placé :', o: ['en F', 'en O', 'au-delà de 2f′', 'en F′'], r: 0, e: 'Image à l’infini.' },
    { q: TX`Microscope : Δ = 16 cm, f′₁ = 4 mm, f′₂ = 2,5 cm. \(P_i\) :`, o: ['1600 δ', '160 δ', '16 δ', '4 δ'], r: 0, e: TX`\(0{,}16/(0{,}004\times0{,}025)\).` },
    { q: 'L’image donnée par l’objectif d’un microscope est :', o: ['virtuelle', 'réelle et agrandie', 'réelle et réduite', 'à l’infini'], r: 1, e: 'Elle sert d’objet pour l’oculaire.' },
    { q: 'L’unité de la puissance d’un instrument est :', o: ['la dioptrie', 'le radian', 'sans unité', 'le mètre'], r: 0, e: TX`\(P = \alpha'/AB\) en rad/m = δ.` },
  ],
};
