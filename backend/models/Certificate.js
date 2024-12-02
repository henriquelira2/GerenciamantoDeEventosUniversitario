const Sequelize = require("sequelize");
const conn = require("../config/database");

const Certificate = conn.define("certificates", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  eventId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  userName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  userEmail: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  eventName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  eventDuration: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  issuedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  isSent: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  certificateUrl: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Certificate;
