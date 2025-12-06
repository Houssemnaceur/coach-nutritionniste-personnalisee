# Guide de Test CRUD avec Postman

Ce guide vous explique comment tester toutes les fonctionnalités CRUD (Create, Read, Update, Delete) de l'API FitPlus avec Postman.

## 📋 Prérequis

1. **Démarrer le serveur Django** :
   ```bash
   cd backend
   .\venv\Scripts\python.exe manage.py runserver
   ```
   Le serveur sera accessible sur `http://127.0.0.1:8000`

2. **Installer Postman** (si ce n'est pas déjà fait)
3. **Créer une collection Postman** pour organiser vos requêtes

---

## 🔐 Étape 1 : Authentification

### 1.1. Créer un compte (Register)

**Méthode** : `POST`  
**URL** : `http://127.0.0.1:8000/api/auth/register/`

**Headers** :
```
Content-Type: application/json
```

**Body** (raw JSON) :
```json
{
  "email": "test@example.com",
  "password": "testpassword123",
  "name": "Test User",
  "age": 25,
  "gender": "male",
  "height": 175,
  "weight": 70
}
```

**Réponse attendue** (200 OK) :
```json
{
  "user": {
    "id": 1,
    "email": "test@example.com",
    "name": "Test User",
    ...
  },
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

**⚠️ IMPORTANT** : Copiez le token `access` - vous en aurez besoin pour les autres requêtes !

---

### 1.2. Se connecter (Login)

**Méthode** : `POST`  
**URL** : `http://127.0.0.1:8000/api/auth/login/`

**Headers** :
```
Content-Type: application/json
```

**Body** (raw JSON) :
```json
{
  "email": "test@example.com",
  "password": "testpassword123"
}
```

**Réponse attendue** (200 OK) :
```json
{
  "user": {...},
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

**💡 Astuce Postman** : Créez une variable d'environnement `access_token` et utilisez `{{access_token}}` dans vos requêtes.

---

### 1.3. Rafraîchir le token (Refresh Token)

**Méthode** : `POST`  
**URL** : `http://127.0.0.1:8000/api/auth/refresh/`

**Headers** :
```
Content-Type: application/json
```

**Body** (raw JSON) :
```json
{
  "refresh": "votre_refresh_token_ici"
}
```

**Réponse attendue** (200 OK) :
```json
{
  "access": "nouveau_access_token"
}
```

---

## 🍽️ Étape 2 : Meal Plan CRUD

### 2.1. CREATE - Créer/Mettre à jour un Meal Plan

**Méthode** : `POST`  
**URL** : `http://127.0.0.1:8000/api/meal-plan/`

**Headers** :
```
Content-Type: application/json
Authorization: Bearer {{access_token}}
```

**Body** (raw JSON) :
```json
{
  "breakfast": [
    {
      "name": "Oatmeal with berries",
      "calories": 280,
      "protein": 8,
      "carbs": 54,
      "fat": 5
    },
    {
      "name": "Greek yogurt with nuts",
      "calories": 250,
      "protein": 20,
      "carbs": 15,
      "fat": 12
    }
  ],
  "lunch": [
    {
      "name": "Grilled chicken salad",
      "calories": 320,
      "protein": 35,
      "carbs": 12,
      "fat": 14
    }
  ],
  "dinner": [
    {
      "name": "Baked salmon with vegetables",
      "calories": 450,
      "protein": 40,
      "carbs": 20,
      "fat": 24
    }
  ],
  "snacks": [
    {
      "name": "Apple with almond butter",
      "calories": 190,
      "protein": 6,
      "carbs": 20,
      "fat": 12
    }
  ]
}
```

**Réponse attendue** (200 OK) :
```json
{
  "status": "ok",
  "user": {
    "id": 1,
    "email": "test@example.com",
    "name": "Test User"
  },
  "total_nutrition": {
    "calories": 1490,
    "protein": 109,
    "carbs": 121,
    "fat": 67
  },
  "meal_count": 5,
  "updated_at": "2025-12-06T16:00:00Z"
}
```

---

### 2.2. READ - Récupérer un Meal Plan

**Méthode** : `GET`  
**URL** : `http://127.0.0.1:8000/api/meal-plan/`

**Headers** :
```
Authorization: Bearer {{access_token}}
```

**Body** : Aucun

**Réponse attendue** (200 OK) :
```json
{
  "user": {
    "id": 1,
    "email": "test@example.com",
    "name": "Test User"
  },
  "breakfast": [...],
  "lunch": [...],
  "dinner": [...],
  "snacks": [...],
  "total_nutrition": {
    "calories": 1490,
    "protein": 109,
    "carbs": 121,
    "fat": 67
  },
  "meal_count": 5,
  "updated_at": "2025-12-06T16:00:00Z"
}
```

---

### 2.3. UPDATE - Mettre à jour un Meal Plan

**Méthode** : `POST` (même endpoint que CREATE)  
**URL** : `http://127.0.0.1:8000/api/meal-plan/`

**Headers** :
```
Content-Type: application/json
Authorization: Bearer {{access_token}}
```

**Body** (raw JSON) - Exemple : Ajouter un aliment au déjeuner :
```json
{
  "breakfast": [
    {
      "name": "Oatmeal with berries",
      "calories": 280,
      "protein": 8,
      "carbs": 54,
      "fat": 5
    }
  ],
  "lunch": [
    {
      "name": "Grilled chicken salad",
      "calories": 320,
      "protein": 35,
      "carbs": 12,
      "fat": 14
    },
    {
      "name": "Quinoa bowl",
      "calories": 380,
      "protein": 14,
      "carbs": 58,
      "fat": 12
    }
  ],
  "dinner": [
    {
      "name": "Baked salmon with vegetables",
      "calories": 450,
      "protein": 40,
      "carbs": 20,
      "fat": 24
    }
  ],
  "snacks": []
}
```

**Réponse attendue** (200 OK) : Même format que CREATE

---

### 2.4. DELETE - Supprimer un Meal Plan

**Note** : L'API ne fournit pas de DELETE direct. Pour "supprimer", envoyez un POST avec des tableaux vides :

**Méthode** : `POST`  
**URL** : `http://127.0.0.1:8000/api/meal-plan/`

**Headers** :
```
Content-Type: application/json
Authorization: Bearer {{access_token}}
```

**Body** (raw JSON) :
```json
{
  "breakfast": [],
  "lunch": [],
  "dinner": [],
  "snacks": []
}
```

**Réponse attendue** (200 OK) :
```json
{
  "status": "ok",
  "total_nutrition": {
    "calories": 0,
    "protein": 0,
    "carbs": 0,
    "fat": 0
  },
  "meal_count": 0
}
```

---

## 💪 Étape 3 : Workout Session CRUD

### 3.1. CREATE - Créer une Workout Session

**Méthode** : `POST`  
**URL** : `http://127.0.0.1:8000/api/workout-session/`

**Headers** :
```
Content-Type: application/json
Authorization: Bearer {{access_token}}
```

**Body** (raw JSON) :
```json
{
  "date": "2025-12-06",
  "type": "Full Body",
  "duration": 45,
  "workoutId": 1,
  "workout_title": "Full Body HIIT"
}
```

**Réponse attendue** (200 OK) :
```json
{
  "status": "logged",
  "id": 1
}
```

---

### 3.2. READ - Récupérer toutes les Workout Sessions

**Méthode** : `GET`  
**URL** : `http://127.0.0.1:8000/api/workout-session/`

**Headers** :
```
Authorization: Bearer {{access_token}}
```

**Body** : Aucun

**Réponse attendue** (200 OK) :
```json
[
  {
    "id": 1,
    "date": "2025-12-06",
    "type": "Full Body",
    "duration": 45,
    "workoutId": 1,
    "workout_title": "Full Body HIIT",
    "created_at": "2025-12-06T16:00:00Z"
  },
  {
    "id": 2,
    "date": "2025-12-05",
    "type": "Upper Body",
    "duration": 30,
    "workoutId": 2,
    "workout_title": "Upper Body Strength",
    "created_at": "2025-12-05T14:00:00Z"
  }
]
```

---

### 3.3. UPDATE - Mettre à jour une Workout Session

**Note** : L'API actuelle ne fournit pas de PUT/PATCH. Pour mettre à jour, vous devez :
1. Supprimer l'ancienne session (via l'admin Django)
2. Créer une nouvelle session avec les données mises à jour

**Alternative** : Utiliser l'admin Django pour modifier directement.

---

### 3.4. DELETE - Supprimer une Workout Session

**Note** : L'API actuelle ne fournit pas de DELETE. Utilisez l'admin Django pour supprimer.

**Admin Django** : `http://127.0.0.1:8000/admin/core/workoutsession/`

---

## 👤 Étape 4 : User Profile CRUD

### 4.1. READ - Récupérer le profil utilisateur

**Méthode** : `GET`  
**URL** : `http://127.0.0.1:8000/api/profile/`

**Headers** :
```
Authorization: Bearer {{access_token}}
```

**Body** : Aucun

**Réponse attendue** (200 OK) :
```json
{
  "id": 1,
  "email": "test@example.com",
  "name": "Test User",
  "age": 25,
  "gender": "male",
  "height": 175.0,
  "weight": 70.0,
  "goal": "maintain",
  "activity_level": "moderate",
  "calorie_goal": 2000,
  "dark_mode": false,
  "notifications": true
}
```

---

### 4.2. UPDATE - Mettre à jour le profil utilisateur

**Méthode** : `PATCH`  
**URL** : `http://127.0.0.1:8000/api/profile/`

**Headers** :
```
Content-Type: application/json
Authorization: Bearer {{access_token}}
```

**Body** (raw JSON) - Exemple : Mettre à jour le poids et l'objectif :
```json
{
  "weight": 72,
  "goal": "lose",
  "calorie_goal": 1800
}
```

**Réponse attendue** (200 OK) :
```json
{
  "id": 1,
  "email": "test@example.com",
  "name": "Test User",
  "weight": 72.0,
  "goal": "lose",
  "calorie_goal": 1800,
  ...
}
```

---

### 4.3. DELETE - Supprimer un utilisateur

**Note** : L'API ne fournit pas de DELETE. Utilisez l'admin Django.

**Admin Django** : `http://127.0.0.1:8000/admin/users/customuser/`

---

## 🚪 Étape 5 : Logout

**Méthode** : `POST`  
**URL** : `http://127.0.0.1:8000/api/auth/logout/`

**Headers** :
```
Authorization: Bearer {{access_token}}
```

**Body** : Aucun

**Réponse attendue** (200 OK) :
```json
{
  "detail": "Déconnecté avec succès"
}
```

---

## 📝 Configuration Postman - Variables d'environnement

Pour faciliter les tests, créez un environnement Postman avec ces variables :

1. **Base URL** : `base_url` = `http://127.0.0.1:8000`
2. **Access Token** : `access_token` = (copié après login)
3. **Refresh Token** : `refresh_token` = (copié après login)

### Utilisation dans les requêtes :

- **URL** : `{{base_url}}/api/meal-plan/`
- **Header Authorization** : `Bearer {{access_token}}`

---

## 🧪 Scénarios de test complets

### Scénario 1 : Créer un utilisateur et son meal plan

1. ✅ Register → Copier `access_token`
2. ✅ POST Meal Plan → Créer un plan de repas
3. ✅ GET Meal Plan → Vérifier que le plan est sauvegardé
4. ✅ POST Meal Plan → Modifier le plan
5. ✅ GET Meal Plan → Vérifier les modifications

### Scénario 2 : Créer des workout sessions

1. ✅ Login → Obtenir `access_token`
2. ✅ POST Workout Session → Créer une session
3. ✅ GET Workout Sessions → Vérifier toutes les sessions
4. ✅ POST Workout Session → Créer une autre session
5. ✅ GET Workout Sessions → Vérifier que les deux sessions sont présentes

### Scénario 3 : Mettre à jour le profil

1. ✅ Login → Obtenir `access_token`
2. ✅ GET Profile → Voir le profil actuel
3. ✅ PATCH Profile → Modifier le poids et l'objectif
4. ✅ GET Profile → Vérifier les modifications

---

## ❌ Codes d'erreur courants

### 401 Unauthorized
- **Cause** : Token manquant, expiré ou invalide
- **Solution** : Se reconnecter ou rafraîchir le token

### 400 Bad Request
- **Cause** : Données invalides dans le body
- **Solution** : Vérifier le format JSON et les champs requis

### 404 Not Found
- **Cause** : URL incorrecte
- **Solution** : Vérifier l'URL de l'endpoint

### 500 Internal Server Error
- **Cause** : Erreur serveur
- **Solution** : Vérifier les logs Django

---

## 💡 Astuces Postman

1. **Collection Runner** : Exécutez plusieurs requêtes en séquence
2. **Tests automatiques** : Ajoutez des scripts de test dans l'onglet "Tests"
3. **Pre-request Scripts** : Automatisez la récupération du token
4. **Variables d'environnement** : Facilite le changement entre dev/prod

---

## 📚 Exemple de script Pre-request (Optionnel)

Pour automatiser la récupération du token, ajoutez ce script dans les Pre-request Scripts :

```javascript
// Vérifier si le token existe et n'est pas expiré
const accessToken = pm.environment.get("access_token");
if (!accessToken) {
    // Si pas de token, faire un login automatique
    pm.sendRequest({
        url: pm.environment.get("base_url") + "/api/auth/login/",
        method: 'POST',
        header: {
            'Content-Type': 'application/json'
        },
        body: {
            mode: 'raw',
            raw: JSON.stringify({
                email: "test@example.com",
                password: "testpassword123"
            })
        }
    }, function (err, res) {
        if (res.json().access) {
            pm.environment.set("access_token", res.json().access);
        }
    });
}
```

---

## ✅ Checklist de test

- [ ] Register fonctionne
- [ ] Login fonctionne
- [ ] Refresh token fonctionne
- [ ] GET Meal Plan fonctionne
- [ ] POST Meal Plan (CREATE) fonctionne
- [ ] POST Meal Plan (UPDATE) fonctionne
- [ ] POST Workout Session (CREATE) fonctionne
- [ ] GET Workout Sessions fonctionne
- [ ] GET Profile fonctionne
- [ ] PATCH Profile fonctionne
- [ ] Logout fonctionne
- [ ] Gestion des erreurs 401, 400, 404

---

**Bon test ! 🚀**

