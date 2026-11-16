/* Tronc Commun · Chimie · Extraction, séparation et identification des espèces chimiques
   Les explications détaillées (décantation, hydrodistillation) sont dans js/details.js (« Pour bien comprendre »). */
'use strict';
CONTENU['tcc-extraction'] = {
  resume: {
    intro: TX`Pour obtenir une espèce chimique naturelle, on l’<b>extrait</b> d’un mélange (plante, fruit…), on la <b>sépare</b> des autres espèces, puis on l’<b>identifie</b>, souvent par chromatographie sur couche mince (CCM).`,
    sections: [
      { titre: '1. Techniques d’extraction anciennes', html: TX`<ul><li><b>Pressage</b> : écraser (huile d’olive, jus).</li><li><b>Infusion</b> : verser de l’eau bouillante sur la plante (thé).</li><li><b>Décoction</b> : faire bouillir la plante dans l’eau.</li><li><b>Macération</b> : laisser la plante dans un solvant à froid.</li><li><b>Enfleurage</b> : fixer les parfums des fleurs dans une graisse.</li></ul>` },
      { titre: '2. L’hydrodistillation', sim: 'hydrodistillation', html: TX`<p>On chauffe la plante dans l’eau : la vapeur d’eau entraîne les espèces odorantes (huile essentielle), puis le mélange se condense dans le réfrigérant. Le <b>distillat</b> recueilli contient deux phases : l’eau et l’huile essentielle, qu’on sépare ensuite.</p>`
        + FIG(460, 180, `<ellipse cx="80" cy="130" rx="45" ry="38" fill="#e3e9f3" stroke="#14213d" stroke-width="2"/><rect x="70" y="60" width="20" height="40" fill="#e3e9f3" stroke="#14213d" stroke-width="2"/><path d="M60 140 q20 -14 40 0" fill="none" stroke="#12946a" stroke-width="3"/><rect x="40" y="168" width="80" height="10" fill="#d93a4a"/><text x="80" y="176" text-anchor="middle" fill="#fff" font-size="9">chauffe-ballon</text><line x1="90" y1="64" x2="300" y2="120" stroke="#14213d" stroke-width="10" stroke-linecap="round"/><line x1="90" y1="64" x2="300" y2="120" stroke="#eaf1fd" stroke-width="6" stroke-linecap="round"/><text x="180" y="78" font-size="11">réfrigérant (eau froide)</text><path d="M300 120 v20" stroke="#14213d" stroke-width="2"/><rect x="285" y="140" width="40" height="34" fill="#6aa5ff" opacity=".4" stroke="#14213d"/><rect x="285" y="140" width="40" height="8" fill="#ffd27a"/><text x="335" y="150" font-size="11">huile essentielle</text><text x="335" y="170" font-size="11">eau</text>`) },
      { titre: '3. Extraction par solvant et décantation', sim: 'decantation', html: TX`<p>Le solvant extracteur doit : dissoudre l’espèce <b>mieux que l’eau</b> ; être <b>non miscible</b> à l’eau ; être le moins dangereux possible. On agite dans une <b>ampoule à décanter</b>, on dégaze, on laisse reposer : la phase la plus <b>dense</b> est en bas. On recueille la phase organique.</p>
<p>Ajouter du sel (relargage) diminue la solubilité de l’huile dans l’eau et améliore la séparation.</p>` },
      { titre: '4. Identification par chromatographie (CCM)', sim: 'ccm', html: TX`<p>On dépose les échantillons sur une plaque, puis l’éluant monte par capillarité et entraîne les espèces à des vitesses différentes. Après révélation (UV, diiode), on compare les taches : deux taches à la même hauteur correspondent à la même espèce. <b>Rapport frontal</b> : \(R_f = \dfrac{h}{H}\) (\(h\) : hauteur de la tache, \(H\) : hauteur du front de l’éluant).</p>` },
    ],
    formules: [
      { tex: TX`R_f = \dfrac{h}{H}`, sens: 'Rapport frontal (CCM), entre 0 et 1' },
      { tex: TX`s = \dfrac{m_{max}}{V}`, sens: 'Solubilité (g/L)' },
      { tex: TX`d = \dfrac{\rho}{\rho_{eau}}`, sens: 'Densité : la phase de plus grande densité est en bas' },
    ],
    retenir: [
      'Le solvant extracteur dissout mieux l’espèce que l’eau et n’est pas miscible à l’eau.',
      'Dans l’ampoule à décanter, la phase la plus dense est en bas.',
      'L’hydrodistillation entraîne les huiles essentielles par la vapeur d’eau.',
      'En CCM, une espèce pure donne une seule tache ; même hauteur = même espèce.',
      TX`\(R_f = h/H\) caractérise une espèce pour un éluant donné.`,
    ],
    erreurs: [
      'Choisir un solvant miscible à l’eau (éthanol, acétone).',
      'Croire que la phase organique est toujours en haut : cela dépend de sa densité.',
      'Oublier de dégazer l’ampoule à décanter.',
      'Mesurer H depuis le bas de la plaque au lieu de la ligne de dépôt.',
      'Plonger la ligne de dépôt dans l’éluant.',
    ],
  },
  experiences: {
    sims: ['hydrodistillation', 'decantation', 'ccm'],
    protocole: { titre: 'Extraire l’huile essentielle de lavande', materiel: 'montage d’hydrodistillation, fleurs de lavande, eau, ampoule à décanter, cyclohexane, sel, plaque CCM.',
      etapes: ['Placer 20 g de fleurs et 200 mL d’eau dans le ballon ; chauffer et recueillir environ 60 mL de distillat.', 'Ajouter du sel au distillat (relargage) puis le verser dans l’ampoule à décanter avec 10 mL de cyclohexane.', TX`Agiter, dégazer, laisser décanter ; recueillir la phase organique (en haut, \(d = 0{,}78\)).`, 'Réaliser une CCM : dépôts de l’extrait et de linalol pur ; éluer, révéler et comparer.'] },
    observations: TX`<ul><li>Le distillat est trouble puis forme deux phases ; une odeur forte de lavande s’en dégage.</li><li>Dans l’ampoule, la phase organique (cyclohexane) est au-dessus de la phase aqueuse.</li><li>Sur la plaque, l’extrait présente une tache à la hauteur de celle du linalol, et d’autres taches.</li></ul>`,
    conclusion: TX`<p>L’hydrodistillation suivie d’une extraction par solvant permet d’isoler l’huile essentielle ; la CCM montre que c’est un mélange contenant du linalol.</p>`,
  },
  quiz: [
    { q: 'Un bon solvant extracteur doit être :', o: ['miscible à l’eau', 'non miscible à l’eau et dissoudre mieux l’espèce', 'plus dense que l’eau obligatoirement', 'coloré'], r: 1, e: 'Sinon on ne pourrait pas séparer les deux phases.' },
    { q: TX`Dichlorométhane (\(d = 1{,}33\)) et eau dans une ampoule : la phase organique est :`, o: ['en haut', 'en bas', 'mélangée à l’eau', 'invisible'], r: 1, e: 'Plus dense que l’eau, elle est en bas.' },
    { q: TX`En CCM, une tache est à 3,0 cm et le front à 7,5 cm. \(R_f\) :`, o: ['2,5', '0,40', '4,5', '0,25'], r: 1, e: TX`\(R_f = 3{,}0/7{,}5 = 0{,}40\).` },
    { q: 'L’hydrodistillation utilise :', o: ['la vapeur d’eau pour entraîner les espèces', 'un solvant organique bouillant', 'le pressage', 'la congélation'], r: 0, e: 'Entraînement à la vapeur.' },
    { q: 'Un échantillon donne trois taches en CCM. Il est :', o: ['pur', 'un mélange d’au moins trois espèces', 'de l’eau', 'impossible à identifier'], r: 1, e: 'Chaque espèce donne une tache.' },
  ],
};
