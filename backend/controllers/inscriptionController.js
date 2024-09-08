const Event = require("../models/Events");
const Inscription = require("../models/Inscriptions");
const User = require("../models/User");
const Stripe = require("stripe");
const stripe = new Stripe(process.env.KEY_STRING);
// Função para criar uma nova inscrição

exports.createPaymentIntent = async (req, res) => {
  const { amount, eventId, userId } = req.body;
  console.log(req.body);
  if (!amount || !eventId || !userId) {
    return res
      .status(400)
      .send({ error: "Dados insuficientes para criar o PaymentIntent" });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Certifique-se de que o valor está em centavos
      currency: "brl", // Defina a moeda
      metadata: { eventId: eventId, userId: userId },
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Erro ao criar Payment Intent:", error);
    res.status(500).send({ error: "Erro ao processar o pagamento" });
  }
};

// Função para obter inscrições de um usuário
exports.getInscriptionsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const inscriptions = await Inscription.findAll({
      where: { userId },
      include: [Event],
    });

    res.status(200).json(inscriptions);
  } catch (error) {
    console.error("Erro ao buscar inscrições:", error);
    res.status(500).json({ error: "Erro do Servidor Interno" });
  }
};
