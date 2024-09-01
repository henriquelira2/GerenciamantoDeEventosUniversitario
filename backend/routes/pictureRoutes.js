const express = require("express");
const router = express.Router();

const upload = require("../services/multer");

const pictureController = require("../controllers/pictureController");

router.post("/imagem", upload.single("file"), pictureController.create);
router.get("/all", pictureController.findAll);

module.exports = router;
