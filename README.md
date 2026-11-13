# Bibliothèque de Physique-Chimie — مكتبة الفيزياء والكيمياء

Site de référence pour les élèves (Zakaria Lazrak — Physique & Chimie) : **79 chapitres** de physique et de chimie (50 + 29)
pour le **Tronc Commun**, la **1ʳᵉ Bac Sciences Mathématiques** et la **2ᵉ Bac Sciences Physiques**.

Chaque chapitre contient :

1. une explication simple (étape par étape pour les chapitres complets) ;
2. le résumé des formules essentielles (MathJax) ;
3. une simulation interactive (canvas JavaScript, avec curseurs) ;
4. une expérience virtuelle avec un protocole court ;
5. un mini-quiz de 5 questions corrigées (et des exercices corrigés).

Les parties 4 et 5 sont rédigées pour deux chapitres pour l'instant : **Le mouvement** (TC) et
**Décroissance radioactive** (2ᵉ Bac). Pour en ajouter, compléter `js/extra.js`.

Interface en français (arabe disponible), mode clair / sombre, adaptée au téléphone.

## Réglages

- **Instagram** : le lien du bouton est dans `js/extra.js` (`INSTAGRAM_URL`) et dans `index.html`.

## Publication avec GitHub Pages

Site statique, sans framework ni étape de build.

1. Fusionner cette branche dans `main`.
2. Sur GitHub : **Settings → Pages → Build and deployment → Deploy from a branch**,
   choisir la branche `main` et le dossier `/ (root)`, puis **Save**.
3. Le site est publié à l'adresse `https://<utilisateur>.github.io/Physique_eleves-/`.

Le fichier `.nojekyll` désactive Jekyll ; tous les chemins sont relatifs.

## Structure

- `index.html`, `css/style.css` — page et styles
- `js/data.js`, `js/data-chimie.js` — chapitres de physique et de chimie (titres, explications, relations)
- `js/extra.js` — lien Instagram, formules LaTeX, expériences et exercices corrigés
- `js/sims.js`, `js/sims-chimie.js` — simulations (paramètres + dessin sur canvas)
- `js/app.js` — navigation, recherche, affichage
- `assets/` — logo, MathJax (copie locale, licence Apache 2.0)
