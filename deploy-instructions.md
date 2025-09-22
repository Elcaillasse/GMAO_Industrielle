# Instructions de déploiement - GMAO Industrielle

## 🚀 Déploiement rapide (Recommandé)

### Option 1: Vercel (Gratuit)
1. Créez un compte sur [vercel.com](https://vercel.com)
2. Cliquez sur "New Project"
3. Importez ce repository ou uploadez les fichiers
4. Vercel détecte automatiquement le projet React
5. Cliquez sur "Deploy"
6. Votre GMAO sera disponible sur une URL publique

### Option 2: Netlify (Gratuit)
1. Allez sur [netlify.com](https://netlify.com)
2. Glissez-déposez le dossier du projet sur la zone de drop
3. Netlify build et déploie automatiquement
4. URL publique fournie instantanément

## 🛠 Build manuel pour serveur personnel

### Prérequis
```bash
# Installer Node.js (version 16+)
# Installer les dépendances
npm install
```

### Commandes de build
```bash
# Développement local
npm run dev

# Build de production
npm run build

# Prévisualisation du build
npm run preview
```

### Fichiers générés
Après `npm run build`, les fichiers optimisés seront dans le dossier `/dist` :
- `index.html` - Page principale
- `/assets/` - CSS, JS et autres ressources optimisées

### Déploiement sur serveur web
1. Uploadez le contenu du dossier `/dist` sur votre serveur web
2. Configurez votre serveur pour servir `index.html` pour toutes les routes
3. Assurez-vous que votre serveur supporte les Single Page Applications (SPA)

## 📋 Configuration serveur

### Apache (.htaccess)
```apache
RewriteEngine On
RewriteRule ^(.*)$ /index.html [QSA,L]
```

### Nginx
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

## 🔧 Variables d'environnement (Si nécessaire)

Créez un fichier `.env` à la racine :
```env
VITE_API_URL=https://votre-api.com
VITE_APP_TITLE=GMAO Industrielle
```

## 📊 Fonctionnalités de l'application

✅ Tableau de bord avec KPIs en temps réel  
✅ Gestion des sites industriels  
✅ Gestion des équipements et machines  
✅ Planification maintenance préventive/corrective  
✅ Gestion des techniciens et compétences  
✅ Interface responsive (mobile/desktop)  
✅ Données mockées pour démonstration  

## 🔄 Prochaines étapes recommandées

1. **Base de données** : Intégrer Supabase ou PostgreSQL
2. **Authentification** : Système de login utilisateurs
3. **Notifications** : Alertes maintenance en temps réel
4. **Rapports** : Export PDF des interventions
5. **Mobile App** : Version mobile native

## 🆘 Support

L'application est prête à être déployée et utilisée immédiatement avec des données de démonstration.