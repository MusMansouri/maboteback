const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body } = require("express-validator");
const User = require("../models/User");

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Inscription utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé
 * /auth/login:
 *   post:
 *     summary: Connexion utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie
 */
// Inscription
router.post(
  "/register",
  [
    body("nom").isString().notEmpty(),
    body("prenom").isString().notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    body("telephone").isString().notEmpty(),
  ],
  async (req, res) => {
    const errors = require("express-validator").validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { nom, prenom, email, password, telephone } = req.body;
      // Vérification des champs requis
      if (!nom || !prenom || !email || !password || !telephone) {
        return res.status(400).json({ error: "Tous les champs sont requis." });
      }
      // Vérification format email basique
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: "Email invalide." });
      }
      // Vérification longueur mot de passe
      if (password.length < 6) {
        return res.status(400).json({
          error: "Le mot de passe doit contenir au moins 6 caractères.",
        });
      }
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser)
        return res.status(400).json({ error: "Email déjà utilisé" });
      const hashedPassword = await bcrypt.hash(password, 10);
      // Ajout du rôle par défaut si non fourni
      const user = await User.create({
        nom,
        prenom,
        email,
        password: hashedPassword,
        role: "client",
        telephone,
      });
      // Génère un token pour connexion immédiate si besoin
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      // Supprime le mot de passe de la réponse
      const userSafe = { ...user.toJSON() };
      delete userSafe.password;
      res
        .status(201)
        .json({ message: "Utilisateur créé", user: userSafe, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de l'inscription" });
    }
  }
);

// Connexion
router.post(
  "/login",
  [body("email").isEmail(), body("password").isString().notEmpty()],
  async (req, res) => {
    const errors = require("express-validator").validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: "Email et mot de passe requis." });
      }
      const user = await User.findOne({ where: { email } });
      if (!user)
        return res.status(400).json({ error: "Utilisateur non trouvé" });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ error: "Mot de passe incorrect" });
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      // Supprime le mot de passe de la réponse
      const userSafe = { ...user.toJSON() };
      delete userSafe.password;
      res.json({ token, user: userSafe });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de la connexion" });
    }
  }
);

module.exports = router;
