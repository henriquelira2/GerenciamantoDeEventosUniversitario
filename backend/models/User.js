const Sequelize = require("sequelize");
const conn = require("../config/database");

const User = conn.define("users", {
  cpf: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    isEmail: true,
  },
  phoneNumber: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  resetToken: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  resetTokenExpires: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

User.sync({ force: false }).then(() => {
  console.log("Tabela de usuário recuperada");
});

module.exports = User;