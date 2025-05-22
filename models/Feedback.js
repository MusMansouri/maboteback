// models/Feedback.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Feedback extends Model {}

Feedback.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    comment: { type: DataTypes.TEXT, allowNull: true },
    photo: { type: DataTypes.STRING, allowNull: true },
    UserId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: "Feedback",
    tableName: "feedbacks",
    timestamps: true,
  }
);

module.exports = Feedback;
