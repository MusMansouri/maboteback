const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./config/database.js");

const app = express();
app.use(cors());
app.use(express.json());

sequelize
  .authenticate()
  .then(() => console.log("Connecté à MySQL"))
  .catch((err) => console.error("Erreur connexion MySQL:", err));

// Synchronisation des modèles (à faire une seule fois en prod)
sequelize.sync();

app.listen(process.env.PORT, () => {
  console.log(`Serveur backend sur http://localhost:${process.env.PORT}`);
});
