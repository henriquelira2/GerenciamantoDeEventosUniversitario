const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.post("/create-payment-intent", paymentController.createPaymentIntent);
router.post("/update-payment-status", paymentController.updatePaymentStatus);
router.post("/webhook/stripe", paymentController.StripeWebhook);
router.post("/verify", paymentController.verifyPayment);

module.exports = router;
