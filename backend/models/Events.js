const Sequelize = require("sequelize");
const conn = require("../config/database");

const Event = conn.define("events", {
  nameEvent: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  descriptionEvent: {
    type: Sequelize.STRING(550),
    allowNull: false,
  },
  dateEvent: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  hourEvent: {
    type: Sequelize.TIME,
    allowNull: false,
  },
  priceEvent: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  organizerEvent: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  qtdVacanciesEvent: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  imageEvent: {
    type: Sequelize.BLOB,
    allowNull: false,
  },
  locationEvent: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  typeEvent: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
});

Event.sync({ force: false }).then(() => {
  console.log("Tabela de eventos recuperada");
});

module.exports = Event;
