const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const conn = require("./database/database");
const User = require("./model/User");
const Event = require("./model/event");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;

// Remove this line, as __dirname is already available:
// const __dirname = path.resolve();

const saltRounds = 10;

// Database connection setup
conn
  .authenticate()
  .then(() => {
    console.log("Database connection established.");
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });

// Middleware setup
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const extendFile = file.originalname.split(".").pop();
    const newNameFile = "icode-" + file.originalname.split(".")[0];
    cb(null, `${newNameFile}.${extendFile}`);
  },
});

// Helper function to list files recursively
async function listFiles(directoryPath, files = []) {
  const listPath = await fs.readdir(directoryPath);

  for (const item of listPath) {
    const itemPath = path.join(directoryPath, item);
    const stat = await fs.stat(itemPath);
    if (stat.isDirectory()) {
      await listFiles(itemPath, files);
    } else {
      files.push(itemPath);
    }
  }
  return files;
}

const upload = multer({ storage });

app.post("/image", upload.single("file"), (req, res) => {
  const file = req.file;
  if (file) {
    return res
      .status(200)
      .send({ error: false, message: "File uploaded successfully" });
  } else {
    return res
      .status(400)
      .send({ error: true, message: "File cannot be accepted" });
  }
});

app.get("/image", async (req, res) => {
  try {
    const files = await listFiles(path.join(__dirname, "public/uploads"));
    const containerFiles = files.map((value) =>
      value.replace(`${__dirname}/`, "")
    );
    return res.status(200).send(containerFiles);
  } catch (error) {
    console.error("Error fetching files:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Function to generate a random token
function generateRandomToken(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < length; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}

// Routes for user authentication and management
app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ where: { cpf: req.body.cpf } });
    if (user) {
      const passwordValid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (passwordValid) {
        const token = jwt.sign(
          {
            cpf: user.cpf,
            first_name: user.first_name,
            email: user.email,
            phoneNumber: user.phoneNumber,
          },
          process.env.SECRET
        );
        return res.status(200).json({ token });
      } else {
        return res.status(400).json({ error: "Password Incorrect" });
      }
    } else {
      return res.status(404).json({ error: "User does not exist" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/send-password/:cpf", async (req, res) => {
  try {
    const cpf = req.params.cpf;
    const user = await User.findOne({ where: { cpf: cpf } });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const randomToken = generateRandomToken(32);

    await User.update({ resetToken: randomToken }, { where: { cpf: cpf } });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      connectionTimeout: 30000,
      socketTimeout: 30000,
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Recuperação de Senha",
      text: `
      Token: ${randomToken},
     `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: "Erro ao enviar e-mail" });
      }
      res
        .status(200)
        .json({ success: true, message: "E-mail enviado com sucesso" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

app.post("/reset-password/:resetToken", async (req, res) => {
  try {
    const resetToken = req.params.resetToken;
    const newPassword = req.body.newPassword;

    const user = await User.findOne({ where: { resetToken: resetToken } });

    if (!user) {
      return res.status(404).json({ error: "Token inválido" });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await User.update(
      { password: hashedPassword, resetToken: null },
      { where: { cpf: user.cpf } }
    );

    res
      .status(200)
      .json({ success: true, message: "Senha redefinida com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

app.post("/users/save", async (req, res) => {
  try {
    const { cpf, firstName, lastName, phoneNumber, email, password } = req.body;

    // Hash da senha usando bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await User.create({
      cpf: cpf,
      firstName: firstName,
      lastName: lastName,
      password: hashedPassword,
      email: email,
      phoneNumber: phoneNumber,
      type: "User",
    });

    res.status(201).send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

app.get("/users/all", async (req, res) => {
  try {
    const users = await User.findAll({ raw: true });
    res.send(users);
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/users/admin-managers", async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        type: ["Admin", "Manager"],
      },
      raw: true,
    });
    res.send(users);
  } catch (error) {
    console.error("Erro ao buscar usuários Admin e Manager:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

app.get("/users/:cpf", (req, res) => {
  var cpf = req.params.cpf;
  User.findOne({
    where: {
      cpf: cpf,
    },
  }).then((user) => {
    res.send(user);
  });
});

app.put("/users/update-tag/:cpf", (req, res) => {
  var cpf = req.params.cpf;
  var type = req.body.type;
  User.update(
    {
      type: type,
    },
    {
      where: {
        cpf: cpf,
      },
    }
  ).then(() => {
    res.status(200).send();
  });
});

app.delete("/users/delete/:cpf", (req, res) => {
  var cpf = req.params.cpf;
  User.destroy({
    where: {
      cpf: cpf,
    },
  }).then(() => {
    res.status(200).send();
  });
});

app.put("/users/update2/:cpf", async (req, res) => {
  try {
    const cpf = req.params.cpf;
    const updatedFields = req.body;

    if (Object.keys(updatedFields).length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    const existingUser = await User.findOne({ where: { cpf: cpf } });
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    if (updatedFields.password) {
      const salt = await bcrypt.genSalt();
      updatedFields.password = await bcrypt.hash(updatedFields.password, salt);
    }

    delete updatedFields.resetTokenExpires;

    await User.update(updatedFields, {
      where: { cpf: cpf },
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/events/save", async (req, res) => {
  try {
    const {
      nameEvent,
      descriptionEvent,
      dateEvent,
      hourEvent,
      priceEvent,
      organizerEvent,
      qtdVacanciesEvent,
      imageEvent,
      locationEvent,
      typeEvent,
    } = req.body;

    await Event.create({
      nameEvent,
      descriptionEvent,
      dateEvent,
      hourEvent,
      priceEvent,
      organizerEvent,
      qtdVacanciesEvent,
      imageEvent,
      locationEvent,
      typeEvent,
    });

    res.status(201).send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

app.get("/events/all", async (req, res) => {
  try {
    const events = await Event.findAll({ raw: true });

    res.send(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).send("Error fetching events");
  }
});

app.listen(process.env.PORT || 8080, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});