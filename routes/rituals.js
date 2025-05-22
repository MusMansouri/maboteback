// routes/rituals.js
const express = require("express");
const router = express.Router();
const ritualController = require("../controllers/ritualController");
const auth = require("../middlewares/auth");
const role = require("../middlewares/role");
const { body, param } = require("express-validator");

/**
 * @swagger
 * /rituals:
 *   get:
 *     summary: Récupère tous les rituels
 *     responses:
 *       200:
 *         description: Liste des rituels
 *   post:
 *     summary: Ajoute un rituel (admin)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               longDescription:
 *                 type: string
 *               steps:
 *                 type: array
 *                 items:
 *                   type: string
 *               duration:
 *                 type: integer
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Rituel créé
 */
router.get("/", (req, res) => ritualController.getAllRituals(req, res));
router.get(
  "/:id",
  param("id").isInt().withMessage("ID invalide"),
  (req, res, next) => {
    const errors = require("express-validator").validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    ritualController.getRitualById(req, res, next);
  }
);
router.post(
  "/",
  auth,
  role("admin"),
  [
    body("name").isString().notEmpty(),
    body("duration").isInt({ min: 1 }),
    body("price").isNumeric(),
  ],
  (req, res, next) => {
    const errors = require("express-validator").validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    ritualController.addRitual(req, res, next);
  }
);
router.put(
  "/:id",
  auth,
  role("admin"),
  [
    param("id").isInt(),
    body("name").optional().isString(),
    body("duration").optional().isInt({ min: 1 }),
    body("price").optional().isNumeric(),
  ],
  (req, res, next) => {
    const errors = require("express-validator").validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    ritualController.updateRitual(req, res, next);
  }
);
router.delete(
  "/:id",
  auth,
  role("admin"),
  param("id").isInt(),
  (req, res, next) => {
    const errors = require("express-validator").validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    ritualController.deleteRitualById(req, res, next);
  }
);

module.exports = router;
