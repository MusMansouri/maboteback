const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");
const auth = require("../middlewares/auth");
const { body } = require("express-validator");

router.get("/", (req, res) => feedbackController.getAllFeedbacks(req, res));
router.get("/:id", (req, res) => feedbackController.getFeedbackById(req, res));
router.post("/", auth, (req, res) => feedbackController.addFeedback(req, res));
router.put("/:id", auth, (req, res) =>
  feedbackController.updateFeedback(req, res)
);
router.delete("/:id", auth, (req, res) =>
  feedbackController.deleteFeedbackById(req, res)
);

module.exports = router;
