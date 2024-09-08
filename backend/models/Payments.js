const Sequelize = require("sequelize");
const conn = require("../config/database");
const Inscription = require("./Inscriptions");

const Payment = conn.define("payments", {
  inscriptionId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Inscription,
      key: 'id',
    },
  },
  value: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  paymentMethod: {
    type: Sequelize.ENUM("cartao", "boleto", "pix"),
    allowNull: false,
  },
  paymentStatus: {
    type: Sequelize.ENUM("pendente", "pago", "cancelado"),
    defaultValue: "pendente",
    allowNull: false,
  },
  paymentDate: {
    type: Sequelize.DATE,
    allowNull: true,
  },
});

Payment.sync({ force: false }).then(() => {
  console.log("Tabela de pagamentos recuperada");
});

module.exports = Payment;
