// models/Appointment.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Ritual = require("./Ritual");

const Appointment = sequelize.define("Appointment", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  heure: { type: DataTypes.STRING, allowNull: false },
});

User.hasMany(Appointment);
Appointment.belongsTo(User);

Ritual.hasMany(Appointment);
Appointment.belongsTo(Ritual);

module.exports = Appointment;