const {
  pagSeguroInstance,
  PAGSEGURO_TOKEN,
} = require("../config/pagseguroConfig");

const { Op } = require("sequelize");
const Inscription = require("../models/Inscriptions");
const Event = require("../models/Events");
const User = require("../models/User");
const checkins = require("../models/Checkins");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Função para enviar o e-mail de confirmação
const sendConfirmationEmail = async (user, event, cod) => {
  const mailOptions = {
    from: `EventManager`,
    to: user.email,
    subject: `Confirmação de Inscrição - ${event.nameEvent}`,
    text: `Olá, ${user.firstName} ${user.lastName},

Parabéns! Sua inscrição para o evento **${event.nameEvent}** foi confirmada com sucesso.

**Detalhes do Evento:**
- **Data:** ${event.dateEventStart.toLocaleDateString()} 
- **Horário:** ${event.hourEventStart} - ${event.hourEventEnd}
- **Local:** ${event.locationEvent}
- **Tipo:** ${event.typeEvent}

**Código de Credencial:**
Guarde este código com você para realizar o check-in no evento:
${cod}

**Dica Importante:** Recomendamos utilizar o QR Code gerado diretamente no aplicativo, no ícone "Eventos Inscritos". Com ele, você poderá fazer o check-in de forma rápida e prática.

Estamos muito animados para receber você! Caso tenha dúvidas ou precise de mais informações, não hesite em entrar em contato conosco.

Aguardamos você no evento!

Atenciosamente,
Equipe do <strong>EVENTMANAGER</strong></p>
`,
    html: `<p>Olá, <strong>${user.firstName} ${user.lastName}</strong>,</p>
<p>Parabéns! Sua inscrição para o evento <strong>${event.nameEvent}</strong> foi confirmada com sucesso.</p>

<h3>Detalhes do Evento:</h3>
<ul>
  <li><strong>Data:</strong> ${event.dateEventStart.toLocaleDateString()}</li>
  <li><strong>Horário:</strong> ${event.hourEventStart} - ${event.hourEventEnd}</li>
  <li><strong>Local:</strong> ${event.locationEvent}</li>
  <li><strong>Tipo:</strong> ${event.typeEvent}</li>
</ul>

<h3>Código de Credencial:</h3>
<p>Guarde este código com você para realizar o check-in no evento:</p>
<p style="font-size: 20px; font-weight: bold; color: #2a7ae4;">${cod}</p>

<p><strong>Dica Importante:</strong> Recomendamos utilizar o QR Code gerado diretamente no aplicativo, no ícone <strong>"Eventos Inscritos"</strong>. Com ele, você poderá fazer o check-in de forma rápida e prática.</p>

<p>Estamos muito animados para receber você! Caso tenha dúvidas ou precise de mais informações, não hesite em entrar em contato conosco.</p>

<p>Atenciosamente,<br>
Equipe do <strong>EVENTMANAGER</strong></p>
`,
  };

  await transporter.sendMail(mailOptions);
};


// Função para gerar codigo de verificação para realizar o Chekin
const generateCredentialCode = async () => {
  let credentialCode;
  let codeExists = true;

  do {
    credentialCode = Math.floor(
      100000000 + Math.random() * 900000000
    ).toString();

    const existingCode = await Inscription.findOne({
      where: { credential_code: credentialCode },
    });

    if (!existingCode) {
      codeExists = false;
    }
  } while (codeExists);

  return credentialCode;
};

// Função para gerar pagamento atravez do cartao de credito usando o PagSeguro
exports.createPaymentIntent = async (req, res) => {
  const { userId, eventId, paymentMethod, paymentData, customer } = req.body;
  try {
    const event = await Event.findByPk(eventId);
    const user = await User.findByPk(userId);

    if (!event) return res.status(404).json({ error: "Evento não encontrado" });

    if (event.qtdVacanciesEvent <= 0) {
      return res.status(409).json({ error: "Evento esgotado" });
    }

    const areaCode = user.phoneNumber.substring(0, 2);
    const phone = user.phoneNumber.substring(2);

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
        phones: [
          {
            country: "55",
            area: areaCode,
            number: phone,
            type: "MOBILE",
          },
        ],
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
      notification_urls: [`${process.env.PAYMENT_URL}/inscriptions/webhook`],
      redirect_urls: {
        success: "https://eventmaneger.com/success",
        failure: "https://eventmaneger.com/failure",
      },
    };

    console.log(requestData.customer.phones);

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

// Função para verificar se o pagamento foi realizado com sucesso e atualizar no banco
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

    const credentialCode = await generateCredentialCode();
    console.log("credenciais " + credentialCode);

    await Inscription.update(
      { status: newStatus, credential_code: credentialCode },
      { where: { id: reference_id } }
    );

    const inscription = await Inscription.findByPk(reference_id);
    const event = await Event.findByPk(inscription.eventId);
    const user = await User.findByPk(inscription.userId);

    if (newStatus === "CONFIRMADA") {
      await checkins.create({
        userId: inscription.userId,
        eventId: inscription.eventId,
        status: "pendente",
        checkin_time: new Date(),
      });

      await sendConfirmationEmail(user, event, credentialCode);

      await Event.update(
        { qtdVacanciesEvent: event.qtdVacanciesEvent - 1 },
        { where: { id: event.id } }
      );
    }

    return res.status(200).json({ message: "Webhook processado com sucesso" });
  }

  return res.status(400).json({ error: "Dados da notificação incompletos" });
};

// Rota para criar inscrição para eventos gratuitos
exports.createFreeEventInscription = async (req, res) => {
  const { userId, eventId } = req.body;

  try {
    const event = await Event.findByPk(eventId);
    const user = await User.findByPk(userId);

    if (!event) {
      return res.status(404).json({ error: "Evento não encontrado" });
    }

    if (event.qtdVacanciesEvent <= 0) {
      return res.status(409).json({ error: "Evento esgotado" });
    }

    const existingInscription = await Inscription.findOne({
      where: { userId, eventId, status: "CONFIRMADA" },
    });

    if (existingInscription) {
      return res
        .status(408)
        .json({ error: "Você já está inscrito neste evento." });
    }

    const inscription = await Inscription.create({
      userId,
      eventId,
      status: "CONFIRMADA",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const credentialCode = await generateCredentialCode();

    await Inscription.update(
      { credential_code: credentialCode },
      { where: { id: inscription.id } }
    );

    await checkins.create({
      userId: inscription.userId,
      eventId: inscription.eventId,
      status: "pendente",
      checkin_time: new Date(),
    });

    await sendConfirmationEmail(user, event, credentialCode);

    await Event.update(
      { qtdVacanciesEvent: event.qtdVacanciesEvent - 1 },
      { where: { id: event.id } }
    );

    return res.status(200).json({
      message: "Inscrição para evento gratuito realizada com sucesso.",
      credentialCode: credentialCode,
    });
  } catch (error) {
    console.error("Erro ao processar a inscrição gratuita:", error.message);
    res.status(500).json({ error: "Erro ao processar a inscrição gratuita." });
  }
};

exports.listUsersByEvent = async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ error: "Evento não encontrado" });
    }

    const inscriptions = await Inscription.findAll({
      where: { eventId, status: "CONFIRMADA" },
      include: {
        model: User,
        as: "user",
        attributes: ["id", "firstName", "lastName", "email"],
      },
    });

    if (!inscriptions.length) {
      return res
        .status(404)
        .json({ error: "Nenhum usuário inscrito neste evento." });
    }

    const users = inscriptions.map((inscription) => ({
      userId: inscription.user.id,
      name: `${inscription.user.firstName} ${inscription.user.lastName}`,
      email: inscription.user.email,
      inscriptionId: inscription.id,
      eventId: inscription.eventId,
      status: inscription.status,
    }));

    return res.status(200).json({
      eventId: eventId,
      eventName: event.nameEvent,
      users: users,
    });
  } catch (error) {
    console.error(
      "Erro ao listar usuários inscritos no evento:",
      error.message
    );
    return res
      .status(500)
      .json({ error: "Erro ao listar usuários inscritos no evento." });
  }
};
