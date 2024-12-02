const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const nodemailer = require("nodemailer");
require("dotenv").config();

const saltRounds = 10;

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

// Função para criar um novo usuário com verificação de CPF
exports.createUser = async (req, res) => {
  try {
    const { cpf, firstName, lastName, phoneNumber, email, password } = req.body;

    const existingUser = await User.findOne({ where: { cpf } });

    if (existingUser) {
      return res.status(400).json({ error: "CPF já está registrado." });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await User.create({
      cpf,
      firstName,
      lastName,
      password: hashedPassword,
      email,
      phoneNumber,
      type: "User",
    });

    res.status(201).json({ message: "Usuário criado com sucesso." });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro do Servidor Interno" });
  }
};

// Função para login de usuário
exports.loginUser = async (req, res) => {
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
        return res.status(400).json({ error: "Senha incorreta" });
      }
    } else {
      return res.status(404).json({ error: "O usuário não existe" });
    }
  } catch (error) {
    console.error("Erro durante o login:", error);
    return res.status(500).json({ error: "Erro do Servidor Interno" });
  }
};

// Função para recuperar a senha de usuário
exports.sendPasswordReset = async (req, res) => {
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
};

// Função para redefinir a senha de usuário
exports.resetPassword = async (req, res) => {
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
    console.error("Erro ao redefinir senha:", error);
    res.status(500).json({ error: "Erro do Servidor Interno" });
  }
};

// Função para obter todos os usuários
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ raw: true });
    res.send(users);
  } catch (error) {
    console.error("Erro ao buscar todos os usuários:", error);
    res.status(500).json({ error: "Erro do Servidor Interno" });
  }
};

// Função para obter todos os administradores e gerentes
exports.getAdminManagers = async (req, res) => {
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
};

// Função para obter um usuário específico por CPF
exports.getUserByCpf = (req, res) => {
  const cpf = req.params.cpf;
  User.findOne({
    where: {
      cpf: cpf,
    },
  })
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      console.error("Erro ao buscar usuário por CPF:", error);
      res.status(500).json({ error: "Erro do Servidor Interno" });
    });
};

// Função para obter um usuário específico por ID
exports.getUserById = (req, res) => {
  const id = req.params.id;
  User.findOne({
    where: { id: id },
  })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).json({ error: "Usuário não encontrado" });
      }
    })
    .catch((error) => {
      console.error("Erro ao buscar usuário por id:", error);
      res.status(500).json({ error: "Erro do Servidor Interno" });
    });
};

// Função para atualizar o tipo de usuário
exports.updateUserType = (req, res) => {
  const cpf = req.params.cpf;
  const type = req.body.type;
  User.update(
    {
      type: type,
    },
    {
      where: {
        cpf: cpf,
      },
    }
  )
    .then(() => {
      res.status(200).send();
    })
    .catch((error) => {
      console.error("Erro ao atualizar o tipo de usuário:", error);
      res.status(500).json({ error: "Erro do Servidor Interno" });
    });
};

// Função para atualizar os dados do usuário
exports.updateUser = async (req, res) => {
  try {
    const cpf = req.params.cpf;
    const updatedFields = req.body;

    if (Object.keys(updatedFields).length === 0) {
      return res.status(400).json({ error: "Nenhum campo para atualizar" });
    }

    const existingUser = await User.findOne({ where: { cpf: cpf } });
    if (!existingUser) {
      return res.status(404).json({ error: "Usuário não encontrado" });
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
    console.error("Erro ao atualizar o usuário:", error);
    res.status(500).json({ error: "Erro do Servidor Interno" });
  }
};

// Função para deletar um usuário
exports.deleteUser = (req, res) => {
  const cpf = req.params.cpf;
  User.destroy({
    where: {
      cpf: cpf,
    },
  })
    .then(() => {
      res.status(200).send();
    })
    .catch((error) => {
      console.error("Erro ao excluir usuário:", error);
      res.status(500).json({ error: "Erro do Servidor Interno" });
    });
};
