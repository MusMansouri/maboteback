// controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { nom, prenom, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ nom, prenom, email, password: hash });
    res.status(201).json({ message: "Utilisateur créé", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: "Utilisateur non trouvé" });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(401).json({ error: "Mot de passe incorrect" });
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.json({ token, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};