const ConseilService = require("../services/conseilService");

class ConseilController {
  async getAllConseils(req, res) {
    try {
      const conseils = await ConseilService.getAllConseils();
      res.json(conseils);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des conseils" });
    }
  }
  async getConseilById(req, res) {
    try {
      const conseil = await ConseilService.getConseilById(req.params.id);
      if (!conseil)
        return res.status(404).json({ error: "Conseil non trouvé" });
      res.json(conseil);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération du conseil" });
    }
  }
  async addConseil(req, res) {
    try {
      const conseil = await ConseilService.addConseil(req.body);
      res.status(201).json(conseil);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erreur lors de l'ajout du conseil" });
    }
  }
  async updateConseil(req, res) {
    try {
      const conseil = await ConseilService.updateConseil(
        req.body,
        req.params.id
      );
      if (!conseil)
        return res.status(404).json({ error: "Conseil non trouvé" });
      res.json(conseil);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Erreur lors de la modification du conseil" });
    }
  }
  async deleteConseilById(req, res) {
    try {
      const conseil = await ConseilService.deleteConseilById(req.params.id);
      if (!conseil)
        return res.status(404).json({ error: "Conseil non trouvé" });
      res.json({ message: "Conseil supprimé avec succès" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Erreur lors de la suppression du conseil" });
    }
  }
}

module.exports = new ConseilController();
