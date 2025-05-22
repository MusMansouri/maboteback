const express = require("express");
const router = express.Router();
const availabilityController = require("../controllers/availabilityController");
const auth = require("../middlewares/auth");
const role = require("../middlewares/role");

router.get("/", (req, res) =>
  availabilityController.getAllAvailabilities(req, res)
);
router.get("/:id", (req, res) =>
  availabilityController.getAvailabilityById(req, res)
);
router.post("/", auth, role("admin"), (req, res) =>
  availabilityController.addAvailability(req, res)
);
router.put("/:id", auth, role("admin"), (req, res) =>
  availabilityController.updateAvailability(req, res)
);
router.delete("/:id", auth, role("admin"), (req, res) =>
  availabilityController.deleteAvailabilityById(req, res)
);

module.exports = router;
