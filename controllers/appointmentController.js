const AppointmentService = require("../services/appointmentService");

class AppointmentController {
  async getAllAppointments(req, res) {
    try {
      const appointments = await AppointmentService.getAllAppointments();
      res.json(appointments);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des rendez-vous" });
    }
  }
  async getAppointmentById(req, res) {
    try {
      const appointment = await AppointmentService.getAppointmentById(
        req.params.id
      );
      if (!appointment)
        return res.status(404).json({ error: "Rendez-vous non trouvé" });
      res.json(appointment);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération du rendez-vous" });
    }
  }
  async addAppointment(req, res) {
    try {
      const appointment = await AppointmentService.addAppointment(req.body);
      res.status(201).json(appointment);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erreur lors de l'ajout du rendez-vous" });
    }
  }
  async updateAppointment(req, res) {
    try {
      const appointment = await AppointmentService.updateAppointment(
        req.body,
        req.params.id
      );
      if (!appointment)
        return res.status(404).json({ error: "Rendez-vous non trouvé" });
      res.json(appointment);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Erreur lors de la modification du rendez-vous" });
    }
  }
  async deleteAppointmentById(req, res) {
    try {
      const appointment = await AppointmentService.deleteAppointmentById(
        req.params.id
      );
      if (!appointment)
        return res.status(404).json({ error: "Rendez-vous non trouvé" });
      res.json({ message: "Rendez-vous supprimé avec succès" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Erreur lors de la suppression du rendez-vous" });
    }
  }
}

module.exports = new AppointmentController();
