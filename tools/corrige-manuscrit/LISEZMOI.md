# Corrections « manuscrites »

Génère une correction au style manuscrit (papier Seyès, encre bleue, titres rouges, résultats encadrés),
avec le logo et le nom du professeur.

    node tools/corrige-manuscrit/manuscrit.js tools/corrige-manuscrit/c-actions.js sortie.pdf

Le fichier de contenu (`c-actions.js` en exemple) exporte `title`, `subtitle` et `html`. Aides disponibles :
`EX(n, titre)` titre d’exercice, `F(a, b)` fraction, `B(x)` résultat encadré, `R(x)` texte rouge,
`V(x)` vecteur, `TAB(lignes, entêtes)` tableau. Une ligne = un `<p>` ; `<p class="ind">` pour une ligne en retrait.

Placer ensuite le PDF dans `pdf/<niveau>/` et l’ajouter dans `pdf/documents.json` avec `"corrige": true`
(le code du professeur est alors demandé à l’ouverture).

Police : Kalam (Indian Type Foundry), licence SIL Open Font License 1.1.
Nécessite Playwright (`npm install playwright`).
