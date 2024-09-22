const User = require("../models/User");
const Event = require("../models/Events");
const Inscription = require("../models/Inscriptions");

Event.hasMany(Inscription, { foreignKey: "eventId", as: "inscriptions" });
User.hasMany(Inscription, { foreignKey: "userId", as: "inscriptions" });
Inscription.belongsTo(User, { foreignKey: "userId", as: "user" });
Inscription.belongsTo(Event, { foreignKey: "eventId", as: "event" });

const syncModels = async () => {
  try {
    await User.sync({ alter: true });  
    await Event.sync({ alter: true });
    await Inscription.sync({ alter: true });
    console.log("Todos os modelos sincronizados com sucesso.");
  } catch (error) {
    console.error("Erro ao sincronizar modelos: ", error);
  }
};

module.exports = syncModels;
