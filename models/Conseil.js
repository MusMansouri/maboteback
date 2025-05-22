// models/Conseil.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Conseil extends Model {}

Conseil.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize,
    modelName: "Conseil",
    tableName: "conseils",
    timestamps: true,
  }
);

module.exports = Conseil;