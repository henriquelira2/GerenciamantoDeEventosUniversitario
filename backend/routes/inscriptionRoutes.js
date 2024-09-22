const express = require("express");
const router = express.Router();
const inscriptionController = require("../controllers/inscriptionController");

router.post("/create", inscriptionController.createPaymentIntent);
router.post("/webhook", inscriptionController.createWebhook);
router.post("/createFreeEventInscription", inscriptionController.createFreeEventInscription);
router.get("/event/:eventId/users", inscriptionController.listUsersByEvent);

module.exports = router;
