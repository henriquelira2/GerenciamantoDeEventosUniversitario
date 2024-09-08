const Sequelize = require("sequelize");
const conn = require("../config/database");
const User = require("./User");
const Event = require("./Events");

const inscriptions = conn.define("inscriptions", {
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
  status: {
    type: Sequelize.ENUM("pendente", "confirmado", "cancelado"),
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

inscriptions.sync({ force: false }).then(() => {
  console.log("Tabela de inscrições recuperada");
});

module.exports = inscriptions;
