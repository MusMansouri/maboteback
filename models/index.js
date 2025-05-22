// models/index.js
const sequelize = require("../config/database");
const User = require("./User");
const Ritual = require("./Ritual");
const Appointment = require("./Appointment");
const Conseil = require("./Conseil");
const Feedback = require("./Feedback");
const Availability = require("./Availability");

User.hasMany(Appointment, { foreignKey: "UserId", as: "appointments" });
Appointment.belongsTo(User, { foreignKey: "UserId", as: "user" });

Ritual.hasMany(Appointment, { foreignKey: "RitualId", as: "appointments" });
Appointment.belongsTo(Ritual, { foreignKey: "RitualId", as: "ritual" });

User.hasMany(Feedback, { foreignKey: "UserId", as: "feedbacks" });
Feedback.belongsTo(User, { foreignKey: "UserId", as: "user" });

module.exports = {
  sequelize,
  User,
  Ritual,
  Appointment,
  Conseil,
  Feedback,
  Availability,
};
