const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const conn = require("./database/database");
const User = require("./model/User");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv-safe").config();
const jwt = require("jsonwebtoken");

conn
  .authenticate()
  .then(() => {
    console.log("conexao feita");
  })
  .catch((msgErro) => {
    console.log("msgErro");
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post("/login", async (req, res) => {
  var cpf = req.body.cpf;
  const user = await User.findOne({ where: { cpf: cpf } });

  if (user) {
    const password_valid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (password_valid) {
      token = jwt.sign(
        {
          password_valid,
        },
        process.env.SECRET,
        { expiresIn: 300 }
      );
      return res.json({ auth: true, cpf: cpf, token: token });
    } else {
      res.status(400).json({ error: "Password Incorrect" });
    }
  } else {
    res.status(404).json({ error: "User does not exist" });
  }
});

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/users/save", async (req, res) => {
  try {
    var cpf = req.body.cpf;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var phoneNumber = req.body.phoneNumber;
    var email = req.body.email;
    const salt = await bcrypt.genSalt();
    var password = await bcrypt.hash(req.body.password, salt);
    User.create({
      cpf: cpf,
      firstName: firstName,
      lastName: lastName,
      password: password,
      email: email,
      phoneNumber: phoneNumber,
      type: "User",
    }).then(() => {
      res.status(201).send();
    });
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
