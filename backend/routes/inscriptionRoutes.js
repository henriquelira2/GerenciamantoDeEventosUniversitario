const express = require("express");
const router = express.Router();
const inscriptionController = require("../controllers/inscriptionController");

router.post("/create", inscriptionController.createPaymentIntent);
router.get("/user/:userId", inscriptionController.getInscriptionsByUser);

module.exports = router;
