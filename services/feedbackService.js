// services/feedbackService.js
const Feedback = require("../models/Feedback");

class FeedbackService {
  async getAllFeedbacks() {
    return await Feedback.findAll();
  }
  async getFeedbackById(id) {
    return await Feedback.findByPk(id);
  }
  async addFeedback(feedback) {
    return await Feedback.create(feedback);
  }
  async updateFeedback(feedback, id) {
    return await Feedback.update(feedback, { where: { id } });
  }
  async deleteFeedbackById(id) {
    return await Feedback.destroy({ where: { id } });
  }
}

module.exports = new FeedbackService();
