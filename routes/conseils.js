const express = require("express");
const router = express.Router();
const conseilController = require("../controllers/conseilController");
const auth = require("../middlewares/auth");
const role = require("../middlewares/role");

router.get("/", (req, res) => conseilController.getAllConseils(req, res));
router.get("/:id", (req, res) => conseilController.getConseilById(req, res));
router.post("/", auth, role("admin"), (req, res) =>
  conseilController.addConseil(req, res)
);
router.put("/:id", auth, role("admin"), (req, res) =>
  conseilController.updateConseil(req, res)
);
router.delete("/:id", auth, role("admin"), (req, res) =>
  conseilController.deleteConseilById(req, res)
);

module.exports = router;
