// services/userService.js
const User = require("../models/User");

class UserService {
  async getAllUser() {
    return await User.findAll();
  }
  async getUserById(id) {
    return await User.findByPk(id);
  }
  async addUser(user) {
    return await User.create(user);
  }
  async updateUser(user, id) {
    return await User.update(user, { where: { id } });
  }
  async deleteUserById(id) {
    return await User.destroy({ where: { id } });
  }
}

module.exports = new UserService();
