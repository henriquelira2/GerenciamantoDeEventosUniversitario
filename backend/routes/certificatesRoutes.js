const express = require("express");
const router = express.Router();
const certificatesController = require("../controllers/certificatesController");

router.post("/send-certificates", certificatesController.sendCertificates);

module.exports = router;
