const Event = require("../models/Events");
const Inscription = require("../models/Inscriptions");
const { Sequelize } = require("sequelize");
const moment = require("moment");
// Função para criar um novo evento

exports.createEvent = async (req, res) => {
  try {
    const {
      nameEvent,
      descriptionEvent,
      dateEventStart,
      dateEventEnd,
      hourEventStart,
      hourEventEnd,
      priceEvent,
      organizerEvent,
      qtdVacanciesEvent,
      durationEvent,
      imageEvent,
      locationEvent,
      typeEvent,
    } = req.body;

    await Event.create({
      nameEvent,
      descriptionEvent,
      dateEventStart,
      dateEventEnd,
      hourEventStart,
      hourEventEnd,
      priceEvent,
      organizerEvent,
      qtdVacanciesEvent,
      durationEvent,
      imageEvent,
      locationEvent,
      typeEvent,
    });

    res.status(201).send();
  } catch (error) {
    console.error("Erro ao criar evento:", error);
    res.status(500).json({ error: "Erro do Servidor Interno" });
  }
};

// Função para obter todos os eventos
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    const currentDate = new Date();

    // Mapear os eventos e ajustar o caminho da imagem
    const eventsWithImagePath = events.map((event) => {
      const eventData = event.toJSON();
      if (eventData.imageEvent) {
        eventData.imageEvent = `${eventData.imageEvent}`;
      }
      return eventData;
    });

    // Ordenar os eventos com base na data
    const sortedEvents = eventsWithImagePath.sort((a, b) => {
      const dateA = new Date(a.dateEventStart);
      const dateB = new Date(b.dateEventStart);

      //  (ordem crescente)
      if (dateA >= currentDate && dateB >= currentDate) {
        return dateA - dateB;
      }

      //  (ordem decrescente)
      if (dateA < currentDate && dateB < currentDate) {
        return dateB - dateA;
      }

      // Eventos futuros/atuais vêm antes dos passados
      return dateA >= currentDate ? -1 : 1;
    });

    res.send(sortedEvents);
  } catch (error) {
    console.error("Erro ao buscar todos os eventos:", error);
    res.status(500).json({ error: "Erro do Servidor Interno" });
  }
};

// Função para obter um evento específico por ID
exports.getEventById = async (req, res) => {
  try {
    const id = req.params.id;
    const event = await Event.findOne({
      where: { id: id },
      raw: true,
    });

    if (!event) {
      return res.status(404).json({ error: "Evento não encontrado" });
    }

    event.imageEvent = `${event.imageEvent}`;

    res.send(event);
  } catch (error) {
    console.error("Erro ao buscar evento por ID:", error);
    res.status(500).json({ error: "Erro do Servidor Interno" });
  }
};

// Função para atualizar um evento
exports.updateEvent = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedFields = req.body;

    if (Object.keys(updatedFields).length === 0) {
      return res.status(400).json({ error: "Nenhum campo para atualizar" });
    }

    const existingEvent = await Event.findOne({ where: { id: id } });
    if (!existingEvent) {
      return res.status(404).json({ error: "Evento não encontrado" });
    }

    if (updatedFields.hourEvent) {
      const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;

      if (!timeRegex.test(updatedFields.hourEvent)) {
        return res.status(402).json({ error: "Formato de hora inválido" });
      }
    }

    await Event.update(updatedFields, {
      where: { id: id },
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Erro ao atualizar evento:", error);
    res.status(500).json({ error: "Erro do Servidor Interno" });
  }
};

// Função para deletar um evento
exports.deleteEvent = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await Event.destroy({
      where: {
        id: id,
      },
    });

    if (result === 0) {
      return res.status(404).json({ error: "Evento não encontrado" });
    }

    res.status(200).json({ message: "Evento excluído com sucesso" });
  } catch (error) {
    if (error instanceof Sequelize.ForeignKeyConstraintError) {
      console.error(
        "Tentativa de excluir evento com inscrições associadas:",
        error
      );
      return res.status(400).json({
        error: "Não é possível excluir o evento. Existem usuários cadastrados.",
      });
    }

    console.error("Erro ao excluir evento:", error);
    res.status(500).json({ error: "Erro do Servidor Interno" });
  }
};

// Função para pegar todos os eventos que o usario esta inscrito(com status="CONFIRMADA")
exports.getConfirmedEventsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Encontrar todas as inscrições com status CONFIRMADA para o usuário
    const confirmedEvents = await Inscription.findAll({
      where: {
        userId: userId,
        status: "CONFIRMADA",
      },
      include: [
        {
          model: Event,
          as: "event",
        },
      ],
    });

    const eventsWithImagePath = confirmedEvents.map((inscription) => {
      const eventData = inscription.event;
      if (eventData && eventData.imageEvent) {
        eventData.imageEvent = `${eventData.imageEvent}`;
      }
      return inscription;
    });

    res.status(200).json(eventsWithImagePath);
  } catch (error) {
    console.error("Erro ao buscar eventos confirmados:", error);
    res.status(500).json({ message: "Erro ao buscar eventos confirmados" });
  }
};

// Função para pegar todos os eventos organizados por um usuário com base no CPF
exports.getEventsByOrganizer = async (req, res) => {
  try {
    const { cpf } = req.params;

    const events = await Event.findAll({
      where: { organizerEvent: cpf },
    });

    if (events.length === 0) {
      return res
        .status(404)
        .json({ error: "Nenhum evento encontrado para este organizador." });
    }

    const eventsWithImagePath = events.map((event) => {
      const eventData = event.toJSON();
      if (eventData.imageEvent) {
        eventData.imageEvent = `${eventData.imageEvent}`;
      }
      return eventData;
    });

    res.status(200).json(eventsWithImagePath);
  } catch (error) {
    console.error("Erro ao buscar eventos por organizador:", error);
    res.status(500).json({ error: "Erro do Servidor Interno" });
  }
};
