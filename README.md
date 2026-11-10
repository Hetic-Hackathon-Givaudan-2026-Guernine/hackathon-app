# Hackathon

Application de démonstration full-stack : une interface web envoie des questions à
une API Node.js, qui appelle un fournisseur d'IA et enregistre les échanges dans
PostgreSQL.

## Prérequis

- Git
- Docker Desktop (ou Docker Engine avec Docker Compose)
- Visual Studio Code avec l'extension **Dev Containers**

Le projet utilise un dev container pour fournir le même environnement à toute
l'équipe. Node.js, npm et le client PostgreSQL sont installés dans ce conteneur.

## Démarrage rapide

1. Clonez le dépôt et ouvrez-le dans VS Code :

   ```bash
   git clone https://github.com/Hetic-Hackathon-Givaudan-2026-Guernine/hackathon-app.git
   cd hackathon-app
   code .
   ```

2. Dans VS Code, exécutez **Dev Containers: Reopen in Container** depuis la
   palette de commandes. À la première ouverture, le projet construit le
   conteneur, démarre PostgreSQL, installe les dépendances avec `npm ci` et crée
   `api/.env` depuis `api/.env.example`.

3. Dans un terminal **du conteneur**, démarrez l'API et le front :

   ```bash
   npm run dev
   ```

4. Ouvrez <http://localhost:5173>. L'API est disponible sur le port `3000` et
   son endpoint de santé est <http://localhost:3000/api/health>.

La base est initialisée au premier démarrage avec le schéma et les données de
test de `db/init/`. Les données PostgreSQL sont conservées dans un volume Docker
nommé entre les redémarrages.

## Configuration de l'IA

L'API lit sa configuration dans `api/.env`. Ce fichier est local et ne doit pas
être ajouté au dépôt. Choisissez un fournisseur compatible avec l'API
Chat Completions et renseignez `AI_BASE_URL`, `AI_MODEL` et, si nécessaire,
`AI_API_KEY`.

### Ollama sur la machine hôte

Le fichier `api/.env.example` est préconfiguré pour un Ollama accessible depuis
le conteneur à `host.docker.internal:11434`. Installez et démarrez Ollama sur
votre machine, puis téléchargez le modèle configuré :

```bash
ollama pull llama3.2:1b
```

### Ollama dans Docker (optionnel)

Le service Ollama est optionnel et déclaré derrière le profil `ollama`. Depuis
un terminal où Docker Compose est disponible, démarrez-le :

```bash
docker compose --profile ollama up -d ollama
docker compose exec ollama ollama pull llama3.2:1b
```

Dans `api/.env`, utilisez alors `AI_BASE_URL=http://ollama:11434/v1` et le
modèle `llama3.2:1b`, puis relancez `npm run dev` dans le conteneur de
développement.

### API de l'équipe Data/IA

Pour utiliser l'API de l'équipe Data/IA au lieu du fournisseur configuré
ci-dessus, renseignez `DATA_AI_URL` et `DATA_AI_KEY` dans `api/.env`. Son
démarrage et la configuration du tunnel sont décrits dans
[ia/TUNNEL_NGROK.md](./ia/TUNNEL_NGROK.md).

## Vérifications

Depuis la racine du dépôt, dans le conteneur :

```bash
npm run lint
npm run format:check
npm run build
```

La CI exécute ces trois vérifications sur les pull requests. Aucun script de
tests automatisés n'est actuellement défini ; pour vérifier le parcours
fonctionnel, démarrez l'application, ouvrez le front, envoyez une question et
vérifiez que la réponse apparaît dans la liste et que l'endpoint de santé
retourne `status: "ok"`.

## Développement et contribution

- Créez une branche `feature/...` à partir de `develop`.
- Ouvrez une pull request vers `develop` et demandez une revue.
- Avant de committer, le hook `pre-commit` lance `lint-staged` (ESLint et
  Prettier) sur les fichiers concernés.
- Les fichiers listés dans [CODEOWNERS](./.github/CODEOWNERS) déclenchent une
  demande de revue aux tech leads, et leur approbation est requise par GitHub.
- La stratégie de branches et les règles de contribution sont détaillées dans
  [GITFLOW.md](./.github/GITFLOW.md) et
  [CONTRIBUTING.md](./.github/CONTRIBUTING.md).

Ne commitez jamais de fichier `.env` ni de clé d'API. Les identifiants présents
dans la configuration Docker sont destinés au développement local uniquement.

## Stack

- **Front** : TypeScript et Vite
- **API** : Node.js, TypeScript et Express
- **Base de données** : PostgreSQL
- **IA** : Ollama, fournisseur compatible OpenAI ou API de l'équipe Data/IA
- **Qualité** : ESLint, Prettier, Husky et GitHub Actions

## Choix techniques, budget et périmètre

Le dev container et Docker Compose donnent à l'équipe un environnement
reproductible. TypeScript est utilisé côté front et API pour partager un langage
et détecter des erreurs avant l'exécution. Express fournit une API légère,
PostgreSQL stocke les questions et réponses, et Vite sert le front en
développement.

Le fournisseur d'IA est configurable pour éviter de dépendre d'un seul service.
Le scénario de développement par défaut utilise Ollama en local : il n'entraîne
pas de coût d'API, mais nécessite une machine capable d'exécuter le modèle. Un
fournisseur hébergé ou le tunnel de l'équipe Data/IA peut entraîner des coûts ou
être soumis à un quota. Aucun budget de fournisseur payant n'est présumé :
n'activez pas de clé payante sans accord préalable sur le plafond de dépenses.

Le périmètre est une démonstration locale de la chaîne full-stack. L'application
n'inclut pas d'authentification, de déploiement public, de paiement, ni de
garantie de conservation ou de suppression des données. Elle ne doit donc pas
recevoir de données sensibles ou personnelles. Les tests automatisés métier ne
sont pas encore inclus.

Les branches `main` et `develop` nécessitent une pull request, une approbation
et le succès du check `qualite`. Pour les fichiers listés dans
[CODEOWNERS](./.github/CODEOWNERS), cette approbation doit venir de l'équipe
`tech-leads`, qui valide les décisions affectant l'ensemble du projet.
