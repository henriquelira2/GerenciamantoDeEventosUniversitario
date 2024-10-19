const User = require("../models/User");
const Event = require("../models/Events");
const Inscription = require("../models/Inscriptions");
const Checkins = require("../models/Checkins"); // Certifique-se de que o modelo Checkins está definido e importado

// Definindo os relacionamentos
Event.hasMany(Inscription, { foreignKey: "eventId", as: "inscriptions" });
User.hasMany(Inscription, { foreignKey: "userId", as: "inscriptions" });
Inscription.belongsTo(User, { foreignKey: "userId", as: "user" });
Inscription.belongsTo(Event, { foreignKey: "eventId", as: "event" });

// Sincronizando os modelos
const syncModels = async () => {
  try {
    await User.sync({ force: true });
    await Event.sync({ force: true });
    await Checkins.sync({ force: true });
    await Inscription.sync({ force: true });

    console.log("Todos os modelos sincronizados com sucesso.");
  } catch (error) {
    console.error("Erro ao sincronizar modelos: ", error);
  }
};

module.exports = syncModels;
 