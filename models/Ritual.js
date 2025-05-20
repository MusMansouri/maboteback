// models/Ritual.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Ritual = sequelize.define("Ritual", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nom: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  prix: { type: DataTypes.FLOAT, allowNull: false },
});

module.exports = Ritual;
