# Contenu des chapitres

## Où se trouve quoi

| Fichier | Rôle |
|---|---|
| `contenu/programme.js` | Ordre officiel : niveaux → filières → Physique / Chimie → unités → chapitres. Filières réservées (`SEULEMENT`), chapitres vérifiés (`VERIFIES`), chapitres rédigés en entier (`FICHIERS_CONTENU`). |
| `contenu/<niveau>/<identifiant>.js` | Contenu complet d'un chapitre (résumé, expériences, séries, quiz). Facultatif : sans ce fichier, le site utilise les données de base. |
| `js/data.js`, `js/data-chimie.js` | Titre, explication courte, formules et simulation principale de chaque chapitre. |
| `pdf/documents.json` + `pdf/tc`, `pdf/1bac`, `pdf/2bac` | Vos séries et devoirs en PDF. |

## Ajouter un PDF (série, devoir…)

1. Déposez le fichier dans le bon dossier, par exemple `pdf/tc/serie2-mouvement.pdf`
   (sur GitHub : ouvrir le dossier → **Add file → Upload files** → **Commit changes**).
2. Ouvrez `pdf/documents.json` (crayon ✏️) et ajoutez un bloc dans la liste :

```json
    {
      "titre": "Série 2 — Le mouvement",
      "niveau": "tc",
      "chapitre": "tc-mouvement",
      "fichier": "serie2-mouvement.pdf",
      "type": "Série"
    }
```

- `niveau` : `tc`, `1bac` ou `2bac` (= le dossier où se trouve le fichier).
- `chapitre` : identifiant du chapitre (voir `programme.js`) ; mettez `""` pour un document général du niveau.
- `fichier` : le nom du fichier dans le dossier du niveau (ou un lien `https://…`, par exemple Google Drive).
- `type` : texte libre (Série, Devoir surveillé, Correction…).
- Séparez deux blocs par une **virgule**. Le document apparaît dans l'onglet « Séries d'exercices » du chapitre
  et en bas de la page du niveau.

## Ajouter un nouveau chapitre

1. Dans `js/data.js` (physique) ou `js/data-chimie.js` (chimie), copiez une ligne `L('…')` existante et changez :
   identifiant, titre français, titre arabe, explication, simulation, formules.
2. Dans `contenu/programme.js`, ajoutez l'identifiant à la bonne place dans la liste `ch: [...]` de son unité
   (et dans `SEULEMENT` s'il est réservé à certaines filières).
3. Facultatif : écrivez le contenu complet dans `contenu/<niveau>/<identifiant>.js` (copiez le fichier d'un chapitre
   modèle) et ajoutez l'identifiant dans `FICHIERS_CONTENU`.
4. Changez la date dans `version.txt` pour que les élèves reçoivent tout de suite la nouvelle version.

## Ajouter une expérience à un chapitre

Les expériences de l’onglet « Expériences » sont dans `contenu/exp-tc.js`, `contenu/exp-1bac.js` et `contenu/exp-2bac.js`.
L’expérience n° 1 de chaque chapitre est le protocole du fichier `contenu/<niveau>/<id>.js` ; les suivantes sont dans ces fichiers.
Pour en ajouter une, copiez un bloc `{ t: …, but: …, mat: …, e: […], obs: […], cc: …, sim: … },` dans la liste du chapitre :

```js
{ t: 'Titre de l’expérience', but: 'Ce que l’on veut montrer.',
  mat: 'liste du matériel.',
  e: ['Étape 1.', 'Étape 2.'],
  obs: ['Observation 1.', 'Observation 2.'],
  cc: 'Conclusion.',
  sim: 'nom de la simulation (facultatif)' },
```

Écrivez les apostrophes avec ’ (et non ') à l’intérieur des textes. Puis changez `version.txt`.

## Format d'un fichier de contenu complet

```js
CONTENU['tc-mouvement'] = {
  resume: {
    intro: 'L’essentiel en deux phrases…',
    sections: [{ titre: '1. Définitions', html: '<p>…\\( v = \\dfrac{d}{\\Delta t} \\)…</p>', sim: 'mouvement' }],
    formules: [{ tex: 'v_m = \\dfrac{d}{\\Delta t}', sens: 'Vitesse moyenne' }],
    retenir: ['…'], erreurs: ['…'],
  },
  experiences: { sims: ['mouvement'], protocole: { titre, materiel, etapes: [] }, observations: '<p>…</p>', conclusion: '<p>…</p>' },
  series: [{ d: 1, t: 'Titre', q: 'Énoncé', s: 'Correction', fig: '<svg>…</svg>' }],   // d : 1 facile, 2 moyen, 3 bac/approfondissement
  quiz: [{ q: 'Question', o: ['A', 'B', 'C', 'D'], r: 0, e: 'Explication' }],
};
```

Les formules s'écrivent en LaTeX entre `\( … \)` (rendu par KaTeX).
