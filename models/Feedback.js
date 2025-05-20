// models/Feedback.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Feedback = sequelize.define("Feedback", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  message: { type: DataTypes.TEXT, allowNull: false },
  photo: { type: DataTypes.STRING, allowNull: true }, // URL ou base64
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

User.hasMany(Feedback);
Feedback.belongsTo(User);

module.exports = Feedback;
