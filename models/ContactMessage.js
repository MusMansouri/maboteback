const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class ContactMessage extends Model {}

ContactMessage.init(
  {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    tel: DataTypes.STRING,
    message: DataTypes.TEXT,
  },
  { sequelize, modelName: "ContactMessage", tableName: "contact_messages" }
);

module.exports = ContactMessage;
