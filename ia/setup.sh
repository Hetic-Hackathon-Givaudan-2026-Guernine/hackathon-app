#!/bin/bash
# Script pour démarrer l'API Data/IA
# À exécuter sur la machine de l'équipe Data/IA, PAS dans le conteneur Node

cd "$(dirname "$0")"

# Créer et activer l'environnement virtuel
python3 -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

# Installer les dépendances
pip install -r requirements.txt

# Générer une clé secrète et la copier dans .env
API_KEY=$(python3 -c "import secrets; print(secrets.token_hex(16))")
cp .env.example .env

# Remplacer la clé dans .env
sed -i "s/remplacez-moi/$API_KEY/" .env

echo "✅ Clé API générée: $API_KEY"
echo "✅ Fichier .env créé"
echo ""
echo "Pour démarrer l'API avec Ollama:"
echo "  uvicorn main:app --reload --env-file .env"
echo ""
echo "Swagger sera disponible à: http://localhost:8000/docs"
