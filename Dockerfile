# Utilisez une image Node.js en tant qu'image de base
FROM node:18.17.1

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers nécessaires
COPY package*.json ./

# Installer les dépendances
RUN npm install
RUN npm install -g @angular/cli
# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application
RUN ng build

# Exposer le port sur lequel l'application Angular s'exécute généralement
EXPOSE 4200

# Commande pour démarrer l'application lorsque le conteneur est lancé
CMD ["ng", "serve", "--host", "0.0.0.0"]
