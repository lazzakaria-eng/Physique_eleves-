/* 1ʳᵉ Bac · Physique · Travail et énergie · Énergie potentielle de pesanteur – Énergie mécanique */
'use strict';
CONTENU['1b-epp'] = {
  resume: {
    intro: TX`Un corps placé en altitude possède une <b>énergie potentielle de pesanteur</b> \(E_{pp}\). Avec l’énergie cinétique, elle forme l’<b>énergie mécanique</b> \(E_m = E_c + E_{pp}\), qui se conserve en l’absence de frottement.`,
    sections: [
      { titre: '1. Énergie potentielle de pesanteur', html: TX`<p>Avec un axe Oz vertical orienté vers le <b>haut</b> : \(E_{pp} = m\,g\,z + C\). La constante \(C\) dépend de l’<b>état de référence</b> choisi (\(E_{pp} = 0\) en \(z_{ref}\)) ; souvent \(E_{pp} = mgz\) avec \(z = 0\) au sol.</p>
<p>Relation avec le travail du poids : \(\Delta E_{pp} = -W(\vec P)\). Quand le corps descend, le poids travaille positivement et \(E_{pp}\) diminue.</p>` },
      { titre: '2. Énergie mécanique', sim: 'energie', html: TX`<p>\(E_m = E_c + E_{pp}\). En l’absence de frottement (seul le poids travaille, les autres forces ne travaillent pas), l’énergie mécanique se <b>conserve</b> : \(\Delta E_m = 0\). Il y a échange entre \(E_c\) et \(E_{pp}\).</p>`
        + FIG(420, 170, `<path d="M30 30 Q 140 190 230 110 T 400 60" fill="none" stroke="#5b6577" stroke-width="3"/><circle cx="30" cy="30" r="8" fill="#d93a4a"/><text x="44" y="30" font-size="11">E_pp max, E_c = 0</text><circle cx="135" cy="118" r="8" fill="#d93a4a"/><text x="110" y="160" font-size="11">E_pp min, E_c max</text><text x="250" y="150" font-size="12" fill="#1f6fe0">sans frottement : E_m = constante</text>`) },
      { titre: '3. Non-conservation avec frottement', sim: 'pendule', html: TX`<p>Si des forces de frottement travaillent : \(\Delta E_m = W(\vec f) < 0\). L’énergie mécanique diminue ; l’énergie perdue est transférée en <b>énergie thermique</b> (échauffement).</p>` },
      { titre: '4. Applications', sim: 'projectile', html: TX`<ul><li>Pendule simple : la vitesse au point le plus bas \(v = \sqrt{2gL(1 - \cos\theta_0)}\).</li><li>Projectile : la hauteur maximale atteinte se déduit de la conservation de \(E_m\).</li></ul>` },
    ],
    formules: [
      { tex: TX`E_{pp} = m\,g\,z + C`, sens: 'Énergie potentielle de pesanteur (axe vers le haut)' },
      { tex: TX`\Delta E_{pp} = -W(\vec P)`, sens: 'Lien avec le travail du poids' },
      { tex: TX`E_m = E_c + E_{pp}`, sens: 'Énergie mécanique' },
      { tex: TX`\Delta E_m = 0`, sens: 'Conservation (sans frottement)' },
      { tex: TX`\Delta E_m = W(\vec f) < 0`, sens: 'Avec frottement' },
    ],
    retenir: [
      'E_pp dépend du choix de l’état de référence ; ses variations n’en dépendent pas.',
      'Quand un corps descend, E_pp diminue et E_c augmente.',
      'Sans frottement, E_m se conserve.',
      'Avec frottement, E_m diminue : transfert thermique vers l’extérieur.',
      'Raisonner avec E_m évite de connaître la forme de la trajectoire.',
    ],
    erreurs: [
      'Orienter l’axe vers le bas et garder E_pp = mgz.',
      'Oublier de préciser l’état de référence.',
      'Appliquer la conservation de E_m en présence de frottements.',
      'Confondre altitude z et distance parcourue sur une pente.',
    ],
  },
  experiences: {
    sims: ['energie', 'pendule', 'projectile'],
    protocole: { titre: 'Étudier les énergies d’un pendule simple', materiel: 'pendule (bille et fil), règle, capteur de vitesse ou chronophotographie (ou simulation « pendule »).',
      etapes: ['Écarter le pendule de θ₀ = 30° et le lâcher sans vitesse.', 'Mesurer la vitesse au passage par la position d’équilibre.', TX`Calculer \(E_c\), \(E_{pp}\) et \(E_m\) en plusieurs points.`, 'Dans la simulation, ajouter un frottement et observer E_m.'] },
    observations: TX`<ul><li>Sans frottement, \(E_m\) reste constante ; \(E_c\) et \(E_{pp}\) varient en sens inverse.</li><li>Avec frottement, l’amplitude diminue et \(E_m\) décroît.</li></ul>`,
    conclusion: TX`<p>L’énergie mécanique se conserve en l’absence de frottement ; sinon elle diminue d’une quantité égale au travail des frottements.</p>`,
  },
  quiz: [
    { q: 'Un livre de 1 kg passe du sol à une étagère de 2 m (g = 10). ΔE_pp :', o: ['20 J', '−20 J', '2 J', '0'], r: 0, e: TX`\(mg\Delta z\).` },
    { q: 'Sans frottement, quand un skieur descend :', o: ['E_m augmente', 'E_c diminue', 'E_pp se transforme en E_c', 'E_c et E_pp diminuent'], r: 2, e: 'E_m se conserve.' },
    { q: 'Une balle lâchée de 20 m (g = 10, sans frottement) arrive au sol à :', o: ['20 m/s', '200 m/s', '14 m/s', '10 m/s'], r: 0, e: TX`\(\sqrt{2\times10\times20}\).` },
    { q: 'Avec frottement, l’énergie mécanique :', o: ['se conserve', 'augmente', 'diminue', 'devient nulle immédiatement'], r: 2, e: TX`\(\Delta E_m = W(\vec f) < 0\).` },
    { q: 'Changer l’état de référence modifie :', o: ['ΔE_pp', 'la valeur de E_pp', 'E_c', 'le travail du poids'], r: 1, e: 'Seule la constante change.' },
  ],
};
