// models/Conseil.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Conseil = sequelize.define("Conseil", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  img: { type: DataTypes.STRING, allowNull: true }, // image principale
  name: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  photo: { type: DataTypes.STRING, allowNull: true }, // icône ou image secondaire
  type: { type: DataTypes.STRING, allowNull: true },
});

module.exports = Conseil;