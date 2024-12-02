const express = require("express");
const app = express();
const conn = require("./config/database");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const syncModels = require("./services/associations"); 

// Middleware 
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(cors());

// Database *-
conn
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida.");
    syncModels(); 
  })
  .catch((error) => {
    console.error("Falha na conexão com o banco de dados:", error);
  });

//  Routes
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");
const pictureRouter = require("./routes/pictureRoutes");
const inscriptionRoutes = require("./routes/inscriptionRoutes");
const checkinRoutes = require("./routes/checkinRoutes");
const certificatesRoutes = require("./routes/certificatesRoutes");


app.use("/users", userRoutes);
app.use("/events", eventRoutes);
app.use("/pictures", pictureRouter);
app.use('/uploads', express.static('uploads'));
app.use("/inscriptions", inscriptionRoutes);
app.use("/checkin", checkinRoutes);
app.use("/certificates", certificatesRoutes);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(process.env.PORT || 8083, function () {
  console.log(
    "Servidor expresso execuntando na porta %d no modo %s",
    this.address().port,
    app.settings.env
  );
});
