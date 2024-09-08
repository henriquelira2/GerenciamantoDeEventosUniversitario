const Stripe = require("stripe");
const Payment = require("../models/Payments");
const Inscription = require("../models/Inscriptions");

require("dotenv").config();

const stripe = new Stripe(process.env.KEY_STRING);

// Função para lidar com eventos do webhook do Stripe
exports.StripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event types from Stripe
  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;

      try {
        // Use metadata to link payment to inscription
        const inscriptionId = paymentIntent.metadata.inscriptionId;

        const inscription = await Inscription.findOne({
          where: { id: inscriptionId },
        });
        if (inscription) {
          inscription.status = "confirmado";
          await inscription.save();
        }

        res.status(200).json({ received: true });
      } catch (err) {
        console.error("Error confirming inscription:", err);
        res.status(500).send("Internal Server Error");
      }
      break;
    }
    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object;
      try {
        const inscriptionId = paymentIntent.metadata.inscriptionId;

        const inscription = await Inscription.findOne({
          where: { id: inscriptionId },
        });
        if (inscription) {
          inscription.status = "cancelado";
          await inscription.save();
        }

        res.status(200).json({ received: true });
      } catch (err) {
        console.error("Error canceling inscription:", err);
        res.status(500).send("Internal Server Error");
      }
      break;
    }
    default:
      res.status(400).end();
  }
};

exports.verifyPayment = async (req, res) => {
  const { inscriptionId } = req.body;

  try {
    // Busca o pagamento relacionado ao inscriptionId
    const payment = await Payment.findOne({ where: { inscriptionId } });

    if (!payment) {
      return res
        .status(404)
        .json({ success: false, message: "Pagamento não encontrado." });
    }

    // Usa o paymentIntentId armazenado para consultar o Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(
      payment.paymentIntentId
    );

    // Verifica o status do pagamento
    if (paymentIntent.status === "succeeded") {
      // Atualiza o status da inscrição
      const inscription = await Inscription.findOne({
        where: { id: inscriptionId },
      });

      if (inscription) {
        inscription.status = "confirmado";
        await inscription.save();
      }

      // Atualiza o pagamento com o status e data de pagamento
      payment.paymentStatus = "pago";
      payment.paymentDate = new Date();
      await payment.save();

      return res
        .status(200)
        .json({
          success: true,
          message: "Pagamento confirmado e inscrição atualizada.",
        });
    } else {
      return res
        .status(400)
        .json({
          success: false,
          message: "Pagamento não foi realizado ou está pendente.",
        });
    }
  } catch (error) {
    console.error("Erro ao verificar pagamento:", error);
    return res
      .status(500)
      .json({ success: false, message: "Erro ao verificar pagamento." });
  }
};

// Atualiza o status de um pagamento no banco de dados
exports.updatePaymentStatus = async (req, res) => {
  const { inscriptionId, paymentStatus } = req.body;

  try {
    const payment = await Payment.findOne({ where: { inscriptionId } });
    if (payment) {
      payment.paymentStatus = paymentStatus;
      payment.paymentDate = new Date();
      await payment.save();
      res.send({ message: "Status do pagamento atualizado com sucesso." });
    } else {
      res.status(404).send({ error: "Pagamento não encontrado." });
    }
  } catch (error) {
    console.error("Erro ao atualizar status do pagamento:", error);
    res.status(500).send({ error: "Erro ao atualizar status do pagamento" });
  }
};

// Função para criar uma requisição de pagamento atraves da API Stripe
exports.createPaymentIntent = async (req, res) => {
  const { amount, currency = 'brl', inscriptionId } = req.body;

  // Log request body to debug if currency is missing
  console.log("Request Body:", req.body);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, 
      currency: currency, // Default to 'brl' if not provided
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: { inscriptionId: inscriptionId },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating Payment Intent:", error);
    res.status(500).send({ error: "Error creating Payment Intent" });
  }
};
