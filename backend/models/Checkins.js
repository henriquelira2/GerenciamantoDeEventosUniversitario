const Sequelize = require("sequelize");
const conn = require("../config/database");
const User = require("./User");
const Event = require("./Events");

const checkins = conn.define("checkins", {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  eventId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Event,
      key: "id",
    },
  },
  
  checkin_time: {
    type: Sequelize.DATE,
    allowNull: true, 
  },

  status: {
    type: Sequelize.STRING,
    defaultValue: "pendente",
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
});


module.exports = checkins;
