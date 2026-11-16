/* 1ʳᵉ Bac · Physique · Optique · Images formées par une lentille mince convergente */
'use strict';
CONTENU['1b-lentille'] = {
  resume: {
    intro: TX`Une <b>lentille mince convergente</b> (bords minces) fait converger un faisceau parallèle en son foyer image F′. Elle donne d’un objet une image <b>réelle</b> (recueillie sur un écran) ou <b>virtuelle</b> (effet loupe), dont la position et la taille se calculent par les relations de conjugaison et de grandissement.`,
    sections: [
      { titre: '1. Caractéristiques', html: TX`<p>Centre optique O, axe optique, foyers objet F et image F′ symétriques par rapport à O. Distance focale \(f' = \overline{OF'}\) (m) et vergence \(C = \dfrac{1}{f'}\) (dioptries δ).</p>` },
      { titre: '2. Construction de l’image', sim: 'lentille', html: TX`<p>Trois rayons particuliers issus de B : celui qui passe par O n’est pas dévié ; celui parallèle à l’axe émerge en passant par F′ ; celui qui passe par F émerge parallèle à l’axe.</p>`
        + FIG(480, 200, ARW('l1', '#14213d') + `<line x1="10" y1="110" x2="470" y2="110" stroke="#5b6577"/><line x1="240" y1="20" x2="240" y2="200" stroke="#1f6fe0" stroke-width="3"/><path d="M232 28 L240 20 L248 28 M232 192 L240 200 L248 192" fill="none" stroke="#1f6fe0" stroke-width="3"/><text x="244" y="126">O</text><circle cx="180" cy="110" r="3"/><text x="174" y="128">F</text><circle cx="300" cy="110" r="3"/><text x="296" y="128">F′</text><line x1="90" y1="110" x2="90" y2="60" stroke="#d93a4a" stroke-width="3" marker-end="url(#l1)"/><text x="84" y="54">B</text><text x="84" y="128">A</text><line x1="90" y1="60" x2="240" y2="60" stroke="#d98200" stroke-width="1.6"/><line x1="240" y1="60" x2="400" y2="193" stroke="#d98200" stroke-width="1.6"/><line x1="90" y1="60" x2="400" y2="163" stroke="#12946a" stroke-width="1.6"/><line x1="340" y1="110" x2="340" y2="143" stroke="#d93a4a" stroke-width="3" marker-end="url(#l1)"/><text x="346" y="156">B′</text><text x="334" y="102">A′</text>`) },
      { titre: '3. Relations de conjugaison et de grandissement', html: TX`<p>Avec les distances algébriques (axe orienté dans le sens de la lumière, origine O) :</p><p style="text-align:center">\(\dfrac{1}{\overline{OA'}} - \dfrac{1}{\overline{OA}} = \dfrac{1}{f'} \qquad \gamma = \dfrac{\overline{A'B'}}{\overline{AB}} = \dfrac{\overline{OA'}}{\overline{OA}}\)</p>
<ul><li>Objet au-delà de F : image réelle et renversée (\(\gamma < 0\)).</li><li>Objet entre F et O : image virtuelle, droite et agrandie (loupe).</li></ul>` },
      { titre: '4. Lentilles accolées', sim: 'loupe', html: TX`<p>Deux lentilles minces accolées équivalent à une lentille de vergence \(C = C_1 + C_2\).</p>` },
    ],
    formules: [
      { tex: TX`C = \dfrac{1}{f'}`, sens: 'Vergence (δ), f′ en m' },
      { tex: TX`\dfrac{1}{\overline{OA'}} - \dfrac{1}{\overline{OA}} = \dfrac{1}{f'}`, sens: 'Relation de conjugaison' },
      { tex: TX`\gamma = \dfrac{\overline{A'B'}}{\overline{AB}} = \dfrac{\overline{OA'}}{\overline{OA}}`, sens: 'Grandissement' },
      { tex: TX`C = C_1 + C_2`, sens: 'Lentilles accolées' },
    ],
    retenir: [
      'Rayon par O : non dévié ; parallèle à l’axe : passe par F′ ; par F : sort parallèle.',
      TX`\(\overline{OA} < 0\) pour un objet réel (avant la lentille).`,
      'Objet avant F : image réelle renversée ; entre F et O : image virtuelle droite (loupe).',
      'γ < 0 : image renversée ; |γ| > 1 : image agrandie.',
    ],
    erreurs: [
      TX`Oublier le signe de \(\overline{OA}\).`,
      TX`Calculer \(C\) avec \(f'\) en cm.`,
      'Confondre foyers F et F′.',
      'Inverser le signe du grandissement.',
    ],
  },
  experiences: {
    sims: ['lentille', 'loupe'],
    protocole: { titre: 'Vérifier la relation de conjugaison', materiel: 'banc d’optique, lentille f′ = 10 cm, objet lumineux, écran.',
      etapes: ['Placer l’objet à OA = −30 cm et chercher l’image nette sur l’écran.', 'Mesurer OA′ et la taille de l’image.', TX`Recommencer pour plusieurs positions et tracer \(1/\overline{OA'} = f(1/\overline{OA})\).`, 'Rapprocher l’objet à moins de 10 cm : l’image n’est plus sur l’écran (loupe).'] },
    observations: TX`<ul><li>Pour OA = −30 cm, l’image nette est à OA′ ≈ +15 cm, renversée, deux fois plus petite.</li><li>Le graphe est une droite de pente 1 et d’ordonnée à l’origine \(1/f' = 10\ \delta\).</li></ul>`,
    conclusion: TX`<p>La relation \(\dfrac{1}{\overline{OA'}} - \dfrac{1}{\overline{OA}} = \dfrac{1}{f'}\) est vérifiée.</p>`,
  },
  quiz: [
    { q: 'Lentille de f′ = 20 cm. Vergence :', o: ['5 δ', '20 δ', '0,05 δ', '−5 δ'], r: 0, e: TX`\(1/0{,}20\).` },
    { q: TX`f′ = 10 cm, \(\overline{OA} = -30\ \text{cm}\). \(\overline{OA'}\) :`, o: ['15 cm', '−15 cm', '30 cm', '7,5 cm'], r: 0, e: TX`\(1/\overline{OA'} = 1/10 - 1/30 = 1/15\).` },
    { q: 'Le grandissement correspondant :', o: ['−0,5', '0,5', '−2', '2'], r: 0, e: TX`\(15/(-30)\).` },
    { q: 'Un objet placé entre F et O donne une image :', o: ['réelle renversée', 'virtuelle droite agrandie', 'à l’infini', 'réelle droite'], r: 1, e: 'Effet loupe.' },
    { q: 'Deux lentilles de 5 δ et 3 δ accolées :', o: ['8 δ', '2 δ', '15 δ', '1,875 δ'], r: 0, e: 'Les vergences s’ajoutent.' },
  ],
};
