const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");
const auth = require("../middlewares/auth");
const role = require("../middlewares/role");
const { body, param } = require("express-validator");

/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Récupère tous les rendez-vous
 *     responses:
 *       200:
 *         description: Liste des rendez-vous
 *   post:
 *     summary: Ajoute un rendez-vous (authentifié)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *               heure:
 *                 type: string
 *               ritualId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Rendez-vous créé
 */
router.get("/", (req, res) =>
  appointmentController.getAllAppointments(req, res)
);
router.get(
  "/:id",
  param("id").isInt().withMessage("ID invalide"),
  (req, res, next) => {
    const errors = require("express-validator").validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    appointmentController.getAppointmentById(req, res, next);
  }
);
router.post(
  "/",
  [
    body("date").isString().notEmpty(),
    body("heure").isString().notEmpty(),
    body("ritualId").isInt(),
    body("telephone").optional().isString(),
    // userId et userInfo sont optionnels
  ],
  (req, res, next) => {
    const errors = require("express-validator").validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    appointmentController.addAppointment(req, res, next);
  }
);
router.put(
  "/:id",
  auth,
  [
    param("id").isInt(),
    body("date").optional().isString(),
    body("heure").optional().isString(),
    body("ritualId").optional().isInt(),
  ],
  (req, res, next) => {
    const errors = require("express-validator").validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    appointmentController.updateAppointment(req, res, next);
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
    appointmentController.deleteAppointmentById(req, res, next);
  }
);

module.exports = router;
