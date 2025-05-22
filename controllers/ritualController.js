// controllers/ritualController.js
const RitualService = require("../services/ritualService");

class RitualController {
  async getAllRituals(req, res) {
    try {
      const rituals = await RitualService.getAllRituals();
      res.json(rituals);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des rituels" });
    }
  }
  async getRitualById(req, res) {
    try {
      const ritual = await RitualService.getRitualById(req.params.id);
      if (!ritual) return res.status(404).json({ error: "Rituel non trouvé" });
      res.json(ritual);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération du rituel" });
    }
  }
  async addRitual(req, res) {
    try {
      const ritual = await RitualService.addRitual(req.body);
      res.status(201).json(ritual);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erreur lors de l'ajout du rituel" });
    }
  }
  async updateRitual(req, res) {
    try {
      const ritual = await RitualService.updateRitual(req.body, req.params.id);
      if (!ritual) return res.status(404).json({ error: "Rituel non trouvé" });
      res.json(ritual);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Erreur lors de la modification du rituel" });
    }
  }
  async deleteRitualById(req, res) {
    try {
      const ritual = await RitualService.deleteRitualById(req.params.id);
      if (!ritual) return res.status(404).json({ error: "Rituel non trouvé" });
      res.json({ message: "Rituel supprimé avec succès" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Erreur lors de la suppression du rituel" });
    }
  }
}

module.exports = new RitualController();
