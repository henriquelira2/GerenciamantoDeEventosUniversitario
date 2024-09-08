const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/create", userController.createUser);
router.post("/login", userController.loginUser);
router.post("/send-password/:cpf", userController.sendPasswordReset);
router.post("/reset-password/:resetToken", userController.resetPassword);
router.get("/all", userController.getAllUsers);
router.get("/admin-managers", userController.getAdminManagers);
router.get("/:cpf", userController.getUserByCpf);
router.get('/id/:id', userController.getUserById);
router.put("/update-tag/:cpf", userController.updateUserType);
router.put("/update2/:cpf", userController.updateUser);
router.delete("/delete/:cpf", userController.deleteUser);

module.exports = router;
