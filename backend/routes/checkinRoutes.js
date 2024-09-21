const express = require("express");
const router = express.Router();
const chekinController = require("../controllers/chekinController");

router.post("/checkin", chekinController.checkInEvent);


module.exports = router;
