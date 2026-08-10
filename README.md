# ADEKMA Levage — Formulaires

Portail statique regroupant les formulaires de terrain ADEKMA Levage / Fournier Energies.
Chaque formulaire est une page HTML autonome (aucun backend, aucune base de données) qui
génère un PDF rempli directement dans le navigateur.

## Contenu

| Fichier | Description |
|---|---|
| `index.html` | Page d'accueil : choix du formulaire à remplir |
| `Examen_Adequation-UFL_ADEKMA_V1_04.html` | Examen d'Adéquation — UFL (grue mobile) |
| `Examen_Adequation_ADEKMA_v7_7.html` | Examen Adéquation ADEKMA (grues / nacelles / bras de grue) |
| `fiche-previsite-chantier-v6_10.html` | Fiche de Pré-Visite de Chantier (PAC — Fournier Energies) |
| `adekma_formulaire_declaration_travaux_v1_01.html` | Déclaration de Travaux (garage mécanique — véhicules ou engins de levage) |
| `manifest.json` | Manifeste PWA (icône, nom, mode standalone) |
| `sw.js` | Service worker minimal (requis pour l'installation Android/Chrome) |
| `icon-192.png` / `icon-512.png` | Icônes utilisées lors de l'installation sur écran d'accueil |

## Protection par mot de passe

Seule la page d'accueil (`index.html`) est protégée par un écran de mot de passe en
JavaScript (mot de passe : `Adekma2026`). Une fois saisi, l'accès reste ouvert pour la
session du navigateur (fermeture de l'onglet/navigateur = nouvelle saisie demandée).
Les formulaires eux-mêmes ne sont pas protégés individuellement : quelqu'un disposant du
lien direct d'un formulaire peut l'ouvrir sans passer par `index.html`.

### Pas de mot de passe une fois "installé" sur l'écran d'accueil

Le site est un mini PWA (manifest.json + service worker + icônes). Si l'utilisateur
utilise **"Ajouter à l'écran d'accueil"** depuis son navigateur mobile, l'app s'ouvre
ensuite en mode standalone (sans barre d'adresse) et **le mot de passe n'est plus demandé**
— seul l'accès via le lien internet classique (navigateur) le redemande.

Cette détection utilise `window.matchMedia('(display-mode: standalone)')` (Android/Chrome)
et `navigator.standalone` (iOS Safari).

**⚠️ Attention : cette protection est côté client (visible dans le code source de la page,
contournable via les outils développeur du navigateur). Elle sert uniquement à éviter un
accès accidentel ou occasionnel — pas à protéger des données confidentielles.**

Pour changer le mot de passe : dans `index.html`, chercher la ligne
```js
var PASSWORD = "Adekma2026";
```
et remplacer la valeur.

## Utilisation

### En local
Ouvrir simplement `index.html` dans un navigateur. Les liens entre les pages sont
relatifs : **garder tous les fichiers dans le même dossier**.

### Publication avec GitHub Pages
1. Pousser ce dossier à la racine du dépôt (ou dans `/docs` selon la configuration choisie).
2. Dans les paramètres du dépôt GitHub : **Settings → Pages → Source**, sélectionner la
   branche et le dossier utilisés.
3. Le site sera accessible à l'URL `https://<utilisateur>.github.io/<depot>/`.

## Fonctionnement des formulaires

- Chaque formulaire est autonome : remplissage, calculs et génération du PDF se font
  entièrement côté client (JavaScript), sans envoi de données à un serveur.
- La génération du PDF utilise la librairie [jsPDF](https://github.com/parallax/jsPDF)
  chargée depuis un CDN (`cdnjs.cloudflare.com`) — une connexion internet est donc
  nécessaire au moment de générer le PDF (le remplissage du formulaire fonctionne hors-ligne).
- Le formulaire UFL utilise en plus [Leaflet](https://leafletjs.com/) (également via CDN)
  pour la sélection d'un point GPS sur une carte.

## Compatibilité

Testé sur les navigateurs récents (Chrome, Safari, Edge) desktop, tablette et mobile.

## Notes

- Les logos et aperçus visuels sont intégrés directement dans les pages (en base64), aucun
  fichier image externe n'est requis.
- Aucune dépendance de build : ce sont des fichiers HTML statiques prêts à l'emploi.
