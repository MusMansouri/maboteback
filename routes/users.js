const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");
const role = require("../middlewares/role");

router.get("/", (req, res) => userController.getAllUser(req, res));
router.get("/:id", (req, res) => userController.getUserById(req, res));
router.post("/", (req, res) => userController.addUser(req, res));
router.put("/:id", auth, (req, res) => userController.updateUser(req, res));
router.delete("/:id", auth, role("admin"), (req, res) =>
  userController.deleteUserById(req, res)
);

module.exports = router;
