const Sequelize = require("sequelize");
const conn = require("../config/database");

const Picture = conn.define("pictures", {
  name: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  src: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
});

Picture.sync({ force: false }).then(() => {
  console.log("Tabela de Imagens recuperada");
});

module.exports = Picture;
