// models/Availability.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Availability extends Model {}

Availability.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    startTime: { type: DataTypes.TIME, allowNull: false },
    endTime: { type: DataTypes.TIME, allowNull: false },
    isBooked: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    sequelize,
    modelName: "Availability",
    tableName: "availabilities",
    timestamps: true,
  }
);

module.exports = Availability;