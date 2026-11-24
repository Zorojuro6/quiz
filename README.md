# Quiz

Petit quiz interactif en HTML, CSS et JavaScript. Les questions sont lues dans un fichier JSON : pour en ajouter, il suffit de modifier `questions.json`, sans toucher au code.

Site en ligne : 

## Fonctionnalités

- Affichage d'une question à la fois, avec son numéro (« Question 1 sur 3 »)
- Un bouton par choix de réponse, créé à partir du fichier `questions.json`
- Retour immédiat : « Bonne réponse ! » ou la bonne réponse en cas d'erreur
- Les réponses sont bloquées après un clic : on ne peut pas changer d'avis
- Bouton « Question suivante », puis écran de fin avec le score et un message selon le résultat
- Bouton « Rejouer » qui remet le score à zéro
- Utilisable entièrement au clavier (`Tab` et `Entrée`) : le focus passe automatiquement sur « Question suivante », puis sur « Rejouer »
- Le résultat de chaque réponse est annoncé aux lecteurs d'écran (`aria-live`)
- Si le fichier de questions ne peut pas être chargé, un message d'erreur s'affiche

## Utilisation

Le quiz lit `questions.json` avec `fetch`, que le navigateur bloque quand la page est ouverte en double-clic (`file://`). Il faut donc un petit serveur local.

1. Cloner le dépôt :
   ```
   git clone <adresse-du-depot>
   cd quiz
   ```
2. Lancer un serveur, au choix :
   - avec Python :
     ```
     py -m http.server 8000
     ```
     puis ouvrir `http://localhost:8000`
   - avec l'extension **Live Server** de VS Code : clic droit sur `index.html`, puis « Open with Live Server »

## Ajouter des questions

Chaque question est un objet dans le tableau de `questions.json` :

```json
{
  "texte": "Quelle est la capitale du Canada ?",
  "choix": ["Vancouver", "Ottawa", "Toronto", "Montréal"],
  "bonne": 1
}
```

- `choix` : la liste des réponses proposées
- `bonne` : la **position** de la bonne réponse, en commençant à 0 (ici, `1` correspond à « Ottawa »)
- Le fichier doit être du JSON valide : guillemets doubles, virgule entre les objets, pas de virgule après le dernier

## Structure

```
quiz/
├── index.html       # structure de la page
├── style.css        # styles (thème sombre, focus visible)
├── script.js        # logique du quiz
└── questions.json   # les questions
```

## Limites connues

- Ne fonctionne pas en double-clic sur `index.html` : un serveur est nécessaire (voir Utilisation)
- Seulement 3 questions pour l'instant
- Les questions sont toujours dans le même ordre
- Le score n'est pas conservé : il disparaît au rechargement de la page
- Testé uniquement dans Chrome

## Améliorations possibles

- Mélanger l'ordre des questions
- Ajouter d'autres questions et des catégories
- Garder le meilleur score dans le navigateur
