const User = require("../models/User");
const Event = require("../models/Events");
const Inscription = require("../models/Inscriptions");
const Checkins = require("../models/Checkins"); 
const Certificate = require("../models/Certificate"); 
const sequelize = require("../config/database");

// Definindo os relacionamentos
Event.hasMany(Inscription, { foreignKey: "eventId", as: "inscriptions", onDelete: "CASCADE" });
User.hasMany(Inscription, { foreignKey: "userId", as: "inscriptions", onDelete: "CASCADE" });
Inscription.belongsTo(User, { foreignKey: "userId", as: "user" });
Inscription.belongsTo(Event, { foreignKey: "eventId", as: "event" });

User.hasMany(Checkins, { foreignKey: "userId", as: "checkins", onDelete: "CASCADE" });
Event.hasMany(Checkins, { foreignKey: "eventId", as: "checkins", onDelete: "CASCADE" });
Checkins.belongsTo(User, { foreignKey: "userId", as: "user" });
Checkins.belongsTo(Event, { foreignKey: "eventId", as: "event" });

// Sincronizando os modelos
const syncModels = async () => {
  try {
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0;");

    // Sincronizar todos os modelos em uma ordem que respeite dependências
    await User.sync({ alter: true });
    await Event.sync({ alter: true });
    await Inscription.sync({ alter: true });
    await Checkins.sync({ alter: true });
    await Certificate.sync({ alter: true });

    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1;");

    console.log("Todos os modelos sincronizados com sucesso.");
  } catch (error) {
    console.error("Erro ao sincronizar modelos: ", error);
  }
};

module.exports = syncModels;
