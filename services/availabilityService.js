// services/availabilityService.js
const Availability = require("../models/Availability");

class AvailabilityService {
  async getAllAvailabilities() {
    return await Availability.findAll();
  }
  async getAvailabilityById(id) {
    return await Availability.findByPk(id);
  }
  async addAvailability(availability) {
    return await Availability.create(availability);
  }
  async updateAvailability(availability, id) {
    return await Availability.update(availability, { where: { id } });
  }
  async deleteAvailabilityById(id) {
    return await Availability.destroy({ where: { id } });
  }
}

module.exports = new AvailabilityService();
