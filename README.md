# Bibliothèque de Physique — مكتبة الفيزياء

Site de référence pour les élèves (Zakaria Lazrak — Physique & Chimie) : **50 leçons** de physique
pour le **Tronc Commun**, la **1ʳᵉ Bac Sciences Mathématiques** et la **2ᵉ Bac Sciences Physiques**.

Chaque chapitre contient :

1. une explication simple et courte du cours ;
2. le résumé des formules et relations essentielles (MathJax) ;
3. une simulation interactive (canvas JavaScript, avec curseurs) ;
4. une expérience expliquée étape par étape ;
5. des exercices corrigés.

Les parties 4 et 5 sont rédigées pour deux chapitres pour l'instant : **Le mouvement** (TC) et
**Décroissance radioactive** (2ᵉ Bac). Pour en ajouter, compléter `js/extra.js`.

Interface en français (arabe disponible), mode clair / sombre, adaptée au téléphone.

## Réglages

- **Instagram** : remplacer `MON_COMPTE` dans `js/extra.js` (`INSTAGRAM_URL`) et dans `index.html`.

## Publication avec GitHub Pages

Site statique, sans framework ni étape de build.

1. Fusionner cette branche dans `main`.
2. Sur GitHub : **Settings → Pages → Build and deployment → Deploy from a branch**,
   choisir la branche `main` et le dossier `/ (root)`, puis **Save**.
3. Le site est publié à l'adresse `https://<utilisateur>.github.io/Physique_eleves-/`.

Le fichier `.nojekyll` désactive Jekyll ; tous les chemins sont relatifs.

## Structure

- `index.html`, `css/style.css` — page et styles
- `js/data.js` — chapitres (titres, explications, relations)
- `js/extra.js` — lien Instagram, formules LaTeX, expériences et exercices corrigés
- `js/sims.js` — simulations (paramètres + dessin sur canvas)
- `js/app.js` — navigation, recherche, affichage
- `assets/` — logo, MathJax (copie locale, licence Apache 2.0)
