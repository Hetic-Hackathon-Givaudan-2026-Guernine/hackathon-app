# API Data/IA - Tunnel ngrok

Pour rendre l'API Data/IA joignable depuis Internet et l'utiliser dans le hackathon.

## Installation et configuration

1. **Créez un compte gratuit** sur [ngrok.com](https://ngrok.com)
2. **Copiez votre jeton** ("Your Authtoken" dans le tableau de bord)
3. **Installez ngrok**:
   - macOS: `brew install ngrok`
   - Autres: [ngrok.com/download](https://ngrok.com/download)

## Démarrer le tunnel

En supposant que l'API Data/IA tourne sur `http://localhost:8000`:

```bash
ngrok config add-authtoken VOTRE_JETON
ngrok http 8000
# Affiche: Forwarding  https://nom-attribue.ngrok-free.app -> http://localhost:8000
```

Le domaine est **permanent** pour votre compte ngrok.

## Tester le tunnel

```bash
curl -X POST https://nom-attribue.ngrok-free.app/answer \
  -H 'X-API-Key: dev-key-12345678' \
  -H 'Content-Type: application/json' \
  -d '{"question": "Quelle est la capitale du Japon ?"}'
```

Le Swagger est public: `https://nom-attribue.ngrok-free.app/docs`

## Configurer l'API Node pour utiliser le tunnel

Dans `/workspace/api/.env`:

```env
# Décommentez ces lignes et remplacez par votre URL ngrok:
# DATA_AI_URL=https://nom-attribue.ngrok-free.app
# DATA_AI_KEY=dev-key-12345678
```

Relancez `npm run dev`. Les questions vont maintenant à l'API Data/IA via ngrok.

## ⚠️ Attention au quota

- **20 000 requêtes par mois** pour toute l'équipe sur ngrok gratuit
- Pas de tests automatiques en boucle
- Pas de web scraping

## Dépannage

- Machine en veille ? → L'API retombe sur la config Ollama/Mistral dans `.env`
- Tunnel coupé ? → Les appels timeout après 30 secondes et retombent sur le plan B
- Clé invalide ? → Erreur 401 "Clé d'API invalide"
