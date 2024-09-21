const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

router.post("/create", eventController.createEvent);
router.get("/all", eventController.getAllEvents);
router.get("/:id", eventController.getEventById);
router.get("/confirmed/:userId", eventController.getConfirmedEventsByUser);
router.put("/update/:id", eventController.updateEvent);
router.delete("/delete/:id", eventController.deleteEvent);

module.exports = router;
