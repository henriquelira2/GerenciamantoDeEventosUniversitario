const express = require("express");
const router = express.Router();
const inscriptionController = require("../controllers/inscriptionController");

router.post("/create", inscriptionController.createPaymentIntent);
router.post("/webhook", inscriptionController.createWebhook);

module.exports = router;
