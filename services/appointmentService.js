// services/appointmentService.js
const Appointment = require("../models/Appointment");

class AppointmentService {
  async getAllAppointments() {
    // Inclure User et Ritual pour l'admin
    return await Appointment.findAll({
      include: [
        {
          model: require("../models/User"),
          as: "user",
          attributes: ["id", "nom", "prenom", "email"],
        },
        {
          model: require("../models/Ritual"),
          as: "ritual",
          attributes: ["id", "name"],
        },
      ],
    });
  }
  async getAppointmentById(id) {
    return await Appointment.findByPk(id);
  }
  async addAppointment(appointment) {
    return await Appointment.create(appointment);
  }
  async updateAppointment(appointment, id) {
    return await Appointment.update(appointment, { where: { id } });
  }
  async deleteAppointmentById(id) {
    return await Appointment.destroy({ where: { id } });
  }
}

module.exports = new AppointmentService();
