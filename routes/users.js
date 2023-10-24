const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

//ok
router.post("/register", usersController.register);
router.get("/logout", usersController.logout);
router.get("/reset/:userId", usersController.reset);
router.post("/login", usersController.login);
router.get("/delete-account/:userId", usersController.deleteAccount);
router.post("/change-account/:userId", usersController.changeAccountInfo);

module.exports = router;
