const AvailabilityService = require("../services/availabilityService");

class AvailabilityController {
  async getAllAvailabilities(req, res) {
    try {
      const availabilities = await AvailabilityService.getAllAvailabilities();
      res.json(availabilities);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des disponibilités" });
    }
  }
  async getAvailabilityById(req, res) {
    try {
      const availability = await AvailabilityService.getAvailabilityById(
        req.params.id
      );
      if (!availability)
        return res.status(404).json({ error: "Disponibilité non trouvée" });
      res.json(availability);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération de la disponibilité" });
    }
  }
  async addAvailability(req, res) {
    try {
      const availability = await AvailabilityService.addAvailability(req.body);
      res.status(201).json(availability);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Erreur lors de l'ajout de la disponibilité" });
    }
  }
  async updateAvailability(req, res) {
    try {
      const availability = await AvailabilityService.updateAvailability(
        req.body,
        req.params.id
      );
      if (!availability)
        return res.status(404).json({ error: "Disponibilité non trouvée" });
      res.json(availability);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Erreur lors de la modification de la disponibilité" });
    }
  }
  async deleteAvailabilityById(req, res) {
    try {
      const availability = await AvailabilityService.deleteAvailabilityById(
        req.params.id
      );
      if (!availability)
        return res.status(404).json({ error: "Disponibilité non trouvée" });
      res.json({ message: "Disponibilité supprimée avec succès" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Erreur lors de la suppression de la disponibilité" });
    }
  }
}

module.exports = new AvailabilityController();
