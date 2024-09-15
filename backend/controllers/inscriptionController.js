const {
  pagSeguroInstance,
  PAGSEGURO_TOKEN,
} = require("../config/pagseguroConfig");

const Inscription = require("../models/Inscriptions");
const Event = require("../models/Events");
const User = require("../models/User");

exports.createPaymentIntent = async (req, res) => {
  const { userId, eventId, paymentMethod, paymentData, customer } = req.body;
  try {
    const event = await Event.findByPk(eventId);
    const user = await User.findByPk(userId);
    const areaCode = user.phoneNumber.substring(0, 2);
    const phone = user.phoneNumber.substring(2);

    if (!event) return res.status(404).json({ error: "Evento não encontrado" });

    const existingInscription = await Inscription.findOne({
      where: { userId, eventId, status: "CONFIRMADA" },
    });

    if (existingInscription) {
      return res.status(408).json({
        error: "Você já está inscrito neste evento.",
      });
    }

    const inscription = await Inscription.create({
      userId,
      eventId,
      status: "pendente",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log(areaCode + " " + phone);

    const requestData = {
      reference_id: inscription.id.toString(),
      customer: {
        name: `${user.firstName}  ${user.lastName}`,
        email: `${user.email}`,
        tax_id: `${user.cpf}`,
        phones: [{ phone: phone, area_code: areaCode }],
      },
      items: [
        {
          name: `Inscrição para o evento ${event.nameEvent}`,
          quantity: 1,
          unit_amount: Number(event.dataValues.priceEvent * 100),
        },
      ],

      payment_methods: [
        {
          type: paymentMethod,
        },
      ],
      notification_urls: [
        "https://8dbf-170-238-99-135.ngrok-free.app/inscriptions/webhook",
      ],
      redirect_urls: {
        success: "https://eventmaneger.com/success", 
        failure: "https://eventmaneger.com/failure", 
      },
    };

    const response = await pagSeguroInstance.post("/checkouts", requestData, {
      headers: {
        Authorization: `Bearer ${PAGSEGURO_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    console.log(response.data);

    if (response.data && response.data.links) {
      const payLink = response.data.links.find((link) => link.rel === "PAY");
      if (payLink) {
        return res.status(200).json({
          message:
            "Inscrição criada com sucesso. Complete o pagamento no link fornecido.",
          paymentLink: payLink.href,
        });
      }
    }

    return res.status(500).json({ error: "Link de pagamento não disponível." });
  } catch (error) {
    console.error(
      "Erro ao processar a inscrição:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Erro ao processar a inscrição." });
  }
};

exports.createWebhook = async (req, res) => {
  const { id, reference_id, charges } = req.body;

  if (charges && charges.length > 0) {
    const charge = charges[0];
    const transactionStatus = charge.status;

    let newStatus;
    switch (transactionStatus) {
      case "PAID":
        newStatus = "CONFIRMADA";
        break;
      case "CANCELED":
        newStatus = "CANCELADA";
        break;
      case "AUTHORIZED":
        newStatus = "AUTORIZADA";
        break;
      default:
        newStatus = "PENDENTE";
        break;
    }

    await Inscription.update(
      { status: newStatus },
      { where: { id: reference_id } }
    );

    return res.status(200).json({ message: "Webhook processado com sucesso" });
  }

  return res.status(400).json({ error: "Dados da notificação incompletos" });
};
