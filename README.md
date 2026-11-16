# Bibliothèque de Physique-Chimie — Prof. Zakaria Lazrak

Site statique (HTML / CSS / JavaScript, compatible GitHub Pages) pour les élèves : tout le programme marocain
(BIOF) de physique-chimie, du **Tronc Commun** au **2ᵉ Bac**.

## Organisation

- **Accueil** : 3 grandes cartes → Tronc Commun, 1ʳᵉ Bac (SX / SM), 2ᵉ Bac (PC / SVT / SM).
- **Page d'un niveau** : choix de la filière, puis **Physique** et **Chimie** séparées, en unités, chapitres dans l'ordre officiel.
- **Page d'un chapitre** (même modèle partout), 4 onglets :
  1. **Résumé du cours** — l'essentiel, cours pas à pas, formules (KaTeX), encadrés « À retenir » et « Erreurs fréquentes », résumé PDF, fiches du professeur ;
  2. **Expériences** — simulations interactives (curseurs, graphe en temps réel), protocole, observations, conclusion ;
  3. **Séries d'exercices** — classées Facile / Moyen / Type Bac (ou Approfondissement), correction derrière « Afficher la correction », PDF ;
  4. **Quiz** — QCM corrigé automatiquement ;
  et les boutons « Chapitre précédent / suivant ».
- **Recherche globale** (loupe en haut) : chapitre, formule, mot-clé.
- Mode clair / sombre, interface FR / عربي, adapté au téléphone.
- Les chapitres non encore vérifiés affichent « Contenu à vérifier par le professeur ».

## Ajouter un PDF ou un chapitre

Voir **`contenu/LISEZMOI.md`** (pas à pas). En bref :
- PDF : déposer le fichier dans `pdf/tc`, `pdf/1bac` ou `pdf/2bac` et ajouter une ligne dans `pdf/documents.json` ;
- chapitre : une ligne dans `js/data.js` (ou `js/data-chimie.js`) + son identifiant dans `contenu/programme.js`.

Après chaque modification, changer le texte de `version.txt` (par ex. la date) : les élèves reçoivent tout de suite la nouvelle version.

## Structure

- `index.html`, `css/style.css`, `version.txt`
- `contenu/programme.js` — ordre officiel, filières, chapitres vérifiés ; `contenu/<niveau>/<id>.js` — contenus complets
- `pdf/` — documents du professeur (`documents.json` + dossiers par niveau)
- `js/data.js`, `js/data-chimie.js` — chapitres (titres, explications, formules) ; `js/resume.js` — points à retenir
- `js/extra.js` (lien Instagram, quiz), `js/details.js`, `js/exos*.js` (séries rédigées), `js/series.js` (liens de séries)
- `js/sims*.js` — simulations ; `js/app.js` — navigation, onglets, recherche
- `series/serie.html` + `series/pdf/`, `resumes/resume.html` + `resumes/pdf/` — pages imprimables et PDF
- `tools/make_pdfs.js`, `tools/make_resumes.js` — régénèrent les PDF (`python3 -m http.server 8765`, puis `node tools/…`, Playwright)
- `assets/` — logo, fiches, KaTeX (copie locale, licence MIT)

## Publication

GitHub : **Settings → Pages → Deploy from a branch → `main` / `(root)`**. Le fichier `.nojekyll` désactive Jekyll.
