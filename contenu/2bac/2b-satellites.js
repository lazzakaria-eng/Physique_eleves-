/* 2ᵉ Bac · Physique · Mécanique · Mouvement des satellites et des planètes */
'use strict';
CONTENU['2b-satellites'] = {
  resume: {
    intro: TX`Les planètes autour du Soleil et les satellites autour de la Terre sont soumis à la seule attraction gravitationnelle de l’astre central. Pour une orbite circulaire, le mouvement est <b>uniforme</b> et la période vérifie la troisième loi de Kepler.`,
    sections: [
      { titre: '1. Lois de Kepler', sim: 'satellite', html: TX`<ol><li>Les orbites sont des <b>ellipses</b> dont l’astre central occupe un foyer.</li><li>Le segment astre–planète balaie des <b>aires égales</b> pendant des durées égales.</li><li>\(\dfrac{T^2}{a^3} = \text{constante}\) pour toutes les planètes d’un même astre (a : demi-grand axe).</li></ol>` },
      { titre: '2. Orbite circulaire', sim: 'gravitation', html: TX`<p>Référentiel géocentrique (ou héliocentrique) ; force \(F = G\dfrac{Mm}{r^2}\), centripète. 2ᵉ loi : \(a_n = \dfrac{v^2}{r} = \dfrac{GM}{r^2}\) et \(a_t = 0\) : mouvement circulaire <b>uniforme</b>.</p><p style="text-align:center">\(v = \sqrt{\dfrac{GM}{r}} \qquad T = 2\pi\sqrt{\dfrac{r^3}{GM}} \qquad \dfrac{T^2}{r^3} = \dfrac{4\pi^2}{GM}\)</p><p>avec \(r = R_T + h\). La vitesse ne dépend pas de la masse du satellite.</p>`
        + FIG(320, 220, ARW('st1', '#d93a4a') + `<circle cx="160" cy="110" r="40" fill="#1f6fe0"/><text x="160" y="115" text-anchor="middle" fill="#fff" font-weight="bold">Terre</text><circle cx="160" cy="110" r="90" fill="none" stroke="#9aa6bf" stroke-dasharray="5 4"/><circle cx="224" cy="46" r="7" fill="#d98200"/><line x1="224" y1="46" x2="196" y2="74" stroke="#d93a4a" stroke-width="2.5" marker-end="url(#st1)"/><text x="190" y="64" fill="#d93a4a" font-size="11">F</text><line x1="224" y1="46" x2="268" y2="90" stroke="#12946a" stroke-width="2.5"/><text x="270" y="96" fill="#12946a" font-size="11">v</text><text x="160" y="214" text-anchor="middle" font-size="11">r = R_T + h</text>`) },
      { titre: '3. Satellite géostationnaire', html: TX`<p>Il reste à la verticale d’un même point de l’équateur : orbite dans le plan équatorial, même sens de rotation que la Terre, période \(T = 23\ \text{h}\ 56\ \text{min}\) (≈ 24 h), altitude \(h \approx 36\,000\ \text{km}\). Usage : télécommunications, météo.</p>` },
    ],
    formules: [
      { tex: TX`\dfrac{T^2}{a^3} = \dfrac{4\pi^2}{G\,M}`, sens: 'Troisième loi de Kepler' },
      { tex: TX`a_n = \dfrac{v^2}{r} = \dfrac{G\,M}{r^2}`, sens: 'Accélération (orbite circulaire)' },
      { tex: TX`v = \sqrt{\dfrac{G\,M}{r}}`, sens: 'Vitesse orbitale' },
      { tex: TX`T = 2\pi\sqrt{\dfrac{r^3}{G\,M}}`, sens: 'Période de révolution' },
      { tex: TX`h \approx 36\,000\ \text{km} \ ;\ T \approx 24\ \text{h}`, sens: 'Satellite géostationnaire' },
    ],
    retenir: [
      'Orbite circulaire : mouvement uniforme, accélération centripète.',
      'v et T ne dépendent pas de la masse du satellite.',
      'Plus le satellite est haut, plus il est lent et plus T est grande.',
      'T²/r³ est la même pour tous les satellites d’un même astre.',
    ],
    erreurs: [
      'Utiliser h au lieu de r = R_T + h.',
      'Oublier de convertir les km en m.',
      'Croire qu’un satellite en orbite n’est soumis à aucune force.',
      'Utiliser la masse du satellite au lieu de celle de l’astre.',
    ],
  },
  experiences: {
    sims: ['satellite', 'gravitation'],
    protocole: { titre: 'Vérifier la 3ᵉ loi de Kepler', materiel: 'tableau des satellites de Jupiter (ou simulation « satellite »), tableur.',
      etapes: ['Relever r et T pour plusieurs satellites.', TX`Calculer \(T^2/r^3\) pour chacun.`, TX`Tracer \(T^2 = f(r^3)\) et en déduire la masse de l’astre.`] },
    observations: TX`<ul><li>\(T^2/r^3\) est la même pour tous les satellites.</li><li>\(T^2 = f(r^3)\) est une droite passant par l’origine.</li></ul>`,
    conclusion: TX`<p>Pente \(= 4\pi^2/(GM)\) : on « pèse » l’astre central.</p>`,
  },
  quiz: [
    { q: 'Un satellite en orbite circulaire a un mouvement :', o: ['accéléré', 'uniforme', 'retardé', 'rectiligne'], r: 1, e: 'a_t = 0.' },
    { q: 'Si r augmente, la vitesse orbitale :', o: ['augmente', 'diminue', 'ne change pas', 's’annule'], r: 1, e: TX`\(v = \sqrt{GM/r}\).` },
    { q: 'Le satellite géostationnaire a une période de :', o: ['1 h', '12 h', '≈ 24 h', '1 an'], r: 2, e: 'Comme la rotation de la Terre.' },
    { q: 'Deux satellites de masses différentes sur la même orbite ont :', o: ['des vitesses différentes', 'la même vitesse', 'des périodes différentes', 'des orbites différentes'], r: 1, e: 'v ne dépend pas de m.' },
    { q: 'Si r est multiplié par 4, T est multipliée par :', o: ['4', '2', '8', '16'], r: 2, e: TX`\(T \propto r^{3/2}\).` },
  ],
};
