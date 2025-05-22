# Guide Backend Complet Node.js + Express + Sequelize (Style Classe et Service)

Ce guide vous accompagne étape par étape pour créer un backend complet, sécurisé et structuré avec Node.js, Express, MySQL et Sequelize (définition des modèles en classe).  
Chaque étape est détaillée : création des fichiers, explications, exemples de code pour **tous** les modèles, services, controllers et routes, en suivant une architecture claire et réutilisable.

---

## 1. Prérequis

- Node.js (LTS)
- MySQL ou MariaDB
- Un éditeur de code (VS Code recommandé)

---

## 2. Initialisation du projet

```bash
mkdir backend
cd backend
npm init -y
```

---

## 3. Installation des dépendances

```bash
npm install express mysql2 sequelize jsonwebtoken bcrypt dotenv cors
npm install --save-dev nodemon express-validator
```

---

## 4. Structure du projet

```
backend/
├── config/
│   └── database.js
├── controllers/
├── middlewares/
├── models/
├── routes/
├── services/
├── .env
├── app.js
└── package.json
```

---

## 5. Configuration de l'environnement

**.env**

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=motdepasse
DB_NAME=mabote
PORT=3001
JWT_SECRET=unSecretTresLong
```

---

## 6. Configuration Sequelize

**config/database.js**

```js
const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

module.exports = sequelize;
```

---

## 7. Exemple de modèle (style classe)

```js
// models/Ritual.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Ritual extends Model {}

Ritual.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    longDescription: { type: DataTypes.TEXT, allowNull: true },
    steps: { type: DataTypes.JSON, allowNull: true },
    duration: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    image: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize,
    modelName: "Ritual",
    tableName: "rituals",
    timestamps: true,
  }
);

module.exports = Ritual;
```

---

## 8. Exemple de service (style centreService.js)

```js
// services/ritualService.js
const Ritual = require("../models/Ritual");

class RitualService {
  async getAllRituals() {
    return await Ritual.findAll();
  }
  async getRitualById(id) {
    return await Ritual.findByPk(id);
  }
  async addRitual(ritual) {
    return await Ritual.create(ritual);
  }
  async updateRitual(ritual, id) {
    return await Ritual.update(ritual, { where: { id } });
  }
  async deleteRitualById(id) {
    return await Ritual.destroy({ where: { id } });
  }
}

module.exports = new RitualService();
```

---

## 9. Exemple de controller (style centreController.js)

```js
// controllers/ritualController.js
const RitualService = require("../services/ritualService");

class RitualController {
  async getAllRituals(req, res) {
    try {
      const rituals = await RitualService.getAllRituals();
      res.json(rituals);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des rituels" });
    }
  }
  async getRitualById(req, res) {
    try {
      const ritual = await RitualService.getRitualById(req.params.id);
      if (!ritual) return res.status(404).json({ error: "Rituel non trouvé" });
      res.json(ritual);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération du rituel" });
    }
  }
  async addRitual(req, res) {
    try {
      const ritual = await RitualService.addRitual(req.body);
      res.status(201).json(ritual);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erreur lors de l'ajout du rituel" });
    }
  }
  async updateRitual(req, res) {
    try {
      const ritual = await RitualService.updateRitual(req.body, req.params.id);
      if (!ritual) return res.status(404).json({ error: "Rituel non trouvé" });
      res.json(ritual);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Erreur lors de la modification du rituel" });
    }
  }
  async deleteRitualById(req, res) {
    try {
      const ritual = await RitualService.deleteRitualById(req.params.id);
      if (!ritual) return res.status(404).json({ error: "Rituel non trouvé" });
      res.json({ message: "Rituel supprimé avec succès" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Erreur lors de la suppression du rituel" });
    }
  }
}

module.exports = new RitualController();
```

---

## 10. Exemple de route

```js
// routes/rituals.js
const express = require("express");
const router = express.Router();
const ritualController = require("../controllers/ritualController");
const auth = require("../middlewares/auth");
const role = require("../middlewares/role");

router.get("/", (req, res) => ritualController.getAllRituals(req, res));
router.get("/:id", (req, res) => ritualController.getRitualById(req, res));
router.post("/", auth, role("admin"), (req, res) =>
  ritualController.addRitual(req, res)
);
router.put("/:id", auth, role("admin"), (req, res) =>
  ritualController.updateRitual(req, res)
);
router.delete("/:id", auth, role("admin"), (req, res) =>
  ritualController.deleteRitualById(req, res)
);

module.exports = router;
```

---

## 11. app.js (Serveur Express)

```js
// app.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./models");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/rituals", require("./routes/rituals"));
// Ajoutez les autres routes ici...

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connecté à MySQL");
    return db.sequelize.sync();
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Serveur backend sur http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => console.error("Erreur connexion MySQL:", err));

module.exports = app;
```

---

## 12. Middlewares

**middlewares/auth.js**

```js
const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Token manquant" });
  const token = authHeader.split(" ")[1];
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Token invalide" });
  }
};
```

**middlewares/role.js**

```js
module.exports = (role) => (req, res, next) => {
  if (req.user.role !== role)
    return res.status(403).json({ error: "Accès interdit" });
  next();
};
```

---

## 13. Conseils

- Séparez bien modèles, services, controllers, routes.
- Utilisez les services pour la logique métier réutilisable.
- Ajoutez des validations avec `express-validator`.
- Ajoutez des logs (`morgan`, `winston`).
- Documentez votre API (Swagger).

---

**Ce guide couvre toutes les étapes : modèles (style classe), services, controllers, routes, middlewares, branchement dans Express, validation, tests et seed. Inspirez-vous de la structure du modèle centre et centreService pour tous vos modèles.**
