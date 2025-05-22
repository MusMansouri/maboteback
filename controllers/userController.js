const UserService = require("../services/userService");
// on importe le service User
class UserController {
  // on declare la classe UserController
  async getAllUser(req, res) {
    // on declare la fonction getAllUsers
    try {
      // on declare le try
      const user = await UserService.getAllUser();
      // on declare la const Users qui va recuperer tous les Users
      res.json(user);
      // on renvoie les Users au format json
    } catch (error) {
      // on declare le catch
      console.log(error); // on affiche l'erreur dans la console;
      res.status(500); // on declare le status 500
      res.json({ error: "Erreur lors de la récupération des Users" });
      // on renvoie l'erreur au format json
    }
  }
  async addUser(req, res) {
    try {
      const user = await UserService.addUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      console.log(error);
      res.status(500);
      res.json({ error: "Erreur lors de l'ajout de la User" });
    }
  }
  async getUserById(req, res) {
    try {
      const user = await UserService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User non trouvé" });
      }
      res.status(201).json(user);
    } catch (error) {
      console.log(error);
      res.status(500);
      res.json({ error: "Erreur lors de la recuperation de la formnation" });
    }
  }
  async updateUser(req, res) {
    try {
      const user = await UserService.updateUser(req.body, req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User non trouvé" });
      }
      res.status(201).json(user);
    } catch (error) {
      console.log(error);
      res.status(500);
      res.json({ error: "Erreur lors de la modification du Stagiare" });
    }
  }
  async deleteUserById(req, res) {
    try {
      const user = await UserService.deleteUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User non trouvé" });
      }
      res.status(201).json("User suprimer avec succes");
    } catch (error) {
      console.log(error);
      res.status(500);
      res.json({ error: "Erreur lors de la supression du User" });
    }
  }
}
module.exports = new UserController();
// on exporte la classe UserController
