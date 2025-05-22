// models/Appointment.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Appointment extends Model {}

Appointment.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    heure: { type: DataTypes.TIME, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: "pending" },
    userId: { type: DataTypes.INTEGER, allowNull: true }, // Lien utilisateur connecté (optionnel)
    ritualId: { type: DataTypes.INTEGER, allowNull: true }, // Lien rituel (optionnel)
    userInfo: { type: DataTypes.JSON, allowNull: true }, // Infos invité (nom, email)
    telephone: { type: DataTypes.STRING, allowNull: true }, // Numéro de téléphone invité ou utilisateur
  },
  {
    sequelize,
    modelName: "Appointment",
    tableName: "appointments",
    timestamps: true,
  }
);

module.exports = Appointment;
