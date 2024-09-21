const Inscription = require("../models/Inscriptions");
const Checkin = require("../models/Checkins");
const Event = require("../models/Events");

exports.checkInEvent = async (req, res) => {
  const { credential_code } = req.body;

  try {
    const inscription = await Inscription.findOne({
      where: { credential_code },
    });

    if (!inscription) {
      return res.status(404).json({ error: "Inscrição não encontrada." });
    }

    const event = await Event.findByPk(inscription.eventId);

    if (!event) {
      return res.status(404).json({ error: "Evento não encontrado." });
    }

    const dataAtual = new Date();
    const dataEvento = new Date(event.dateEvent); 

    const dataAtualString = dataAtual.toISOString().split("T")[0]; 
    const dataEventoString = dataEvento.toISOString().split("T")[0]; 

    console.log(
      "data atual: " +
        dataAtualString +
        "   data do evento:  " +
        dataEventoString
    );

    const isSameDay = dataAtualString === dataEventoString;

    if (!isSameDay) {
      return res.status(400).json({
        error: "O evento não está programado para a data atual.",
      });
    }

    const checkin = await Checkin.findOne({
      where: { userId: inscription.userId, eventId: inscription.eventId },
    });

    if (!checkin) {
      return res
        .status(404)
        .json({ error: "Registro de check-in não encontrado." });
    }

    if (checkin.status === "CONFIRMADO") {
      return res.status(400).json({
        error: "O check-in já foi realizado para este evento.",
      });
    }

    await Checkin.update(
      { checkin_time: new Date(), status: "CONFIRMADO" },
      { where: { id: checkin.id } }
    );

    return res.status(200).json({
      message: "Check-in realizado com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao realizar o check-in:", error);
    return res.status(500).json({ error: "Erro ao processar o check-in." });
  }
};
