// models/Availability.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Availability = sequelize.define("Availability", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  startTime: { type: DataTypes.STRING, allowNull: false }, // format HH:mm
  endTime: { type: DataTypes.STRING, allowNull: false }, // format HH:mm
});

module.exports = Availability;
