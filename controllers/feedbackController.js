const FeedbackService = require("../services/feedbackService");

class FeedbackController {
  async getAllFeedbacks(req, res) {
    try {
      const feedbacks = await FeedbackService.getAllFeedbacks();
      res.json(feedbacks);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des feedbacks" });
    }
  }
  async getFeedbackById(req, res) {
    try {
      const feedback = await FeedbackService.getFeedbackById(req.params.id);
      if (!feedback)
        return res.status(404).json({ error: "Feedback non trouvé" });
      res.json(feedback);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération du feedback" });
    }
  }
  async addFeedback(req, res) {
    try {
      const feedback = await FeedbackService.addFeedback(req.body);
      res.status(201).json(feedback);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erreur lors de l'ajout du feedback" });
    }
  }
  async updateFeedback(req, res) {
    try {
      const feedback = await FeedbackService.updateFeedback(
        req.body,
        req.params.id
      );
      if (!feedback)
        return res.status(404).json({ error: "Feedback non trouvé" });
      res.json(feedback);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Erreur lors de la modification du feedback" });
    }
  }
  async deleteFeedbackById(req, res) {
    try {
      const feedback = await FeedbackService.deleteFeedbackById(req.params.id);
      if (!feedback)
        return res.status(404).json({ error: "Feedback non trouvé" });
      res.json({ message: "Feedback supprimé avec succès" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Erreur lors de la suppression du feedback" });
    }
  }
}

module.exports = new FeedbackController();
