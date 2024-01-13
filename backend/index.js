const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const conn = require("./database/database");
const User = require("./model/User");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const saltRounds = 10;
conn
  .authenticate()
  .then(() => {
    console.log("Conexão feita");
  })
  .catch((msgErro) => {
    console.log(msgErro);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Função para gerar um token aleatório
function generateRandomToken(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < length; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}

app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ where: { cpf: req.body.cpf } });

    if (user) {
      const password_valid = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (password_valid) {
        token = jwt.sign(
          {
            cpf: user.cpf,
            first_name: user.first_name,
            email: user.email,
            phoneNumber: user.phoneNumber,
          },
          process.env.SECRET
        );
        res.status(200).json({ token: token });
      } else {
        res.status(400).json({ error: "Password Incorrect" });
      }
    } else {
      res.status(404).json({ error: "User does not exist" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
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

    // Gera um token aleatório
    const randomToken = generateRandomToken(32);

    // Associa o token ao usuário no banco de dados
    await User.update({ resetToken: randomToken }, { where: { cpf: cpf } });

    // Configuração do serviço de e-mail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      connectionTimeout: 30000,
      socketTimeout: 30000,
    });

    // Opções do e-mail
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Recuperação de Senha",
      text: `
      Token: ${randomToken},
     `,
    };

    // Envia o e-mail
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

    // Encontre o usuário com base no token de redefinição de senha
    const user = await User.findOne({ where: { resetToken: resetToken } });

    if (!user) {
      return res.status(404).json({ error: "Token inválido" });
    }

    // Atualize a senha do usuário com a nova senha
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Limpa o token no banco de dados
    await User.update(
      { password: hashedPassword, resetToken: null },
      { where: { cpf: user.cpf } } // Use 'cpf' ou a chave primária correta para a condição WHERE
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

app.get("/users/all", (req, res) => {
  User.findAll({
    raw: true,
  }).then((user) => {
    res.send(user);
  });
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

    // Remova resetTokenExpires do objeto updatedFields antes do update
    delete updatedFields.resetTokenExpires;

    // Adicione a lógica de update
    await User.update(updatedFields, {
      where: { cpf: cpf },
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(process.env.PORT || 8080, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
