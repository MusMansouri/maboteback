const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { firstName, lastName, email, tel, message } = req.body;
  if (!firstName || !lastName || !email || !message) {
    return res
      .status(400)
      .json({ error: "Tous les champs obligatoires doivent être remplis." });
  }
  // ...traitement éventuel (stockage ou email)...
  res.status(200).json({ message: "Votre message a bien été reçu. Merci !" });
});

module.exports = router;
