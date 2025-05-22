// services/ritualService.js
const Ritual = require("../models/Ritual");

class RitualService {
  async getAllRituals() {
    return await Ritual.findAll();
  }
  async getRitualById(id) {
    return await Ritual.findByPk(id);
  }
  async addRitual(ritual) {
    return await Ritual.create(ritual);
  }
  async updateRitual(ritual, id) {
    return await Ritual.update(ritual, { where: { id } });
  }
  async deleteRitualById(id) {
    return await Ritual.destroy({ where: { id } });
  }
}

module.exports = new RitualService();
