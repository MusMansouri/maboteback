// services/conseilService.js
const Conseil = require("../models/Conseil");

class ConseilService {
  async getAllConseils() {
    return await Conseil.findAll();
  }
  async getConseilById(id) {
    return await Conseil.findByPk(id);
  }
  async addConseil(conseil) {
    return await Conseil.create(conseil);
  }
  async updateConseil(conseil, id) {
    return await Conseil.update(conseil, { where: { id } });
  }
  async deleteConseilById(id) {
    return await Conseil.destroy({ where: { id } });
  }
}

module.exports = new ConseilService();
