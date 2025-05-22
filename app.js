const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
require("dotenv").config();
const db = require("./models");

const app = express();
app.use(cors("*"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(helmet());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/rituals", require("./routes/rituals"));
app.use("/api/appointments", require("./routes/appointments"));
app.use("/api/conseils", require("./routes/conseils"));
app.use("/api/feedbacks", require("./routes/feedbacks"));
app.use("/api/availabilities", require("./routes/availabilities"));
app.use("/api/contact", require("./routes/contact"));

// Swagger documentation
require("./swagger")(app);

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

// Gestion des erreurs de JSON mal formé
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "JSON mal formé" });
  }
  next(err);
});

// Gestion centralisée des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Erreur serveur" });
});

module.exports = app;
