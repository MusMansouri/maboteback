const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Ritual extends Model {}

Ritual.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    longDescription: { type: DataTypes.TEXT, allowNull: true },
    steps: { type: DataTypes.JSON, allowNull: true },
    duration: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    image: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize,
    modelName: "Ritual",
    tableName: "rituals",
    timestamps: true,
  }
);

module.exports = Ritual;