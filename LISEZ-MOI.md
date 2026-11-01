# Portfolio – mode d'emploi

## Les fichiers

| Fichier | Rôle | À modifier ? |
|---|---|---|
| `contenu.js` | Tous les textes, images, sections, le CV | **Oui, c'est le seul** |
| `img/` | Les photos | Oui, pour en ajouter |
| `cv-alizee-famechon.pdf` | Le CV téléchargeable | Oui, pour le remplacer |
| `index.html`, `style.css`, `site.js`, `vase3d.js`, `fonts/`, `3d/` | Structure, design, moteur et vase 3D | Non |

## Modifier le site

1. Ouvre `contenu.js` avec un éditeur de texte (VS Code, Notepad++, ou même le Bloc-notes).
2. Les explications sont en haut du fichier. En résumé :
   - **Nouvelle photo** : dépose-la dans `img/`, puis écris `'img/nom-de-la-photo.jpg'` là où tu veux l'afficher.
   - **Nouvelle réalisation** : copie un bloc `{ titre: ..., avant: ..., apres: ... },` dans une liste `projets` et change les textes.
   - **Nouvelle section** : copie une section entière dans `SECTIONS` ; elle devient un nouvel onglet du menu.
3. Ouvre `index.html` dans ton navigateur pour voir le résultat (double-clic suffit ; le vase 3D,
   lui, ne s'affiche qu'une fois le site en ligne : en local tu vois le vase dessiné).

Si la page reste vide après une modification, il manque souvent une virgule, une accolade `}` ou une apostrophe mal fermée.
Appuie sur F12 → onglet « Console » : le navigateur indique la ligne de `contenu.js` qui pose problème.

## Photos légères

Pour que le site reste rapide : photos en `.jpg`, environ 1600 px de large maximum, idéalement sous 300 Ko.
Le site https://squoosh.app permet de les compresser gratuitement.

## Mettre en ligne avec GitHub Desktop

GitHub Pages héberge le site gratuitement. Avec GitHub Desktop, ce dossier `portfolio` est relié
au site en ligne : tu modifies les fichiers sur ton ordinateur, puis deux clics les publient.
Le site se met à jour tout seul 1 à 2 minutes après.

> Un dépôt GitHub Pages gratuit est **public** : tous les fichiers (photos, CV, police Aruma,
> modèle 3D) peuvent être téléchargés. Vérifie que les licences de la police et du modèle 3D le permettent.

### 1. Relier le dossier à GitHub (une seule fois)
1. Ouvre **GitHub Desktop** et connecte-toi : **File** → **Options** → **Accounts** → **Sign in** (GitHub.com).
2. **File** → **Add local repository…** → **Choose…** → sélectionne `Bureau\portfolio` → **Add repository**.
3. GitHub Desktop indique que ce dossier n'est pas encore un dépôt : clique le lien
   **create a repository**. Garde le nom `portfolio`, laisse *Git ignore* et *License* sur **None**,
   puis **Create repository**.
   (Le fichier `.gitignore` déjà présent écarte le dossier `.claude`, qui ne sert qu'aux tests.)
4. En haut : **Publish repository**. **Décoche « Keep this code private »**
   (GitHub Pages gratuit demande un dépôt public), puis **Publish repository**.

### 2. Activer le site (une seule fois)
1. Dans GitHub Desktop : **Repository** → **View on GitHub** (ouvre la page du dépôt).
2. Sur GitHub : **Settings** → **Pages** (menu de gauche).
3. **Source** : *Deploy from a branch*. **Branch** : `main`, dossier `/ (root)`. **Save**.
4. Attends 1 à 2 minutes : l'adresse du site (`ton-pseudo.github.io/portfolio`) s'affiche en haut de cette page.

### 3. Publier une modification (à chaque fois)
1. Modifie tes fichiers dans `Bureau\portfolio` (texte dans `contenu.js`, photos dans `img/`…).
2. Ouvre GitHub Desktop : la liste de gauche montre ce qui a changé.
3. En bas à gauche, écris un petit résumé (ex. « Ajout du vase Ming »), puis **Commit to main**.
4. En haut : **Push origin**.
5. Le site est à jour 1 à 2 minutes plus tard (onglet **Actions** sur GitHub : rond vert = en ligne).

Si tu modifies un jour un fichier directement sur github.com, clique **Fetch origin** puis
**Pull origin** dans GitHub Desktop avant de reprendre sur ton ordinateur.
