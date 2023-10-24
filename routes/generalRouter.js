const express = require("express");
const router = express.Router();
const generalController = require("../controllers/generalController");

router.get("/", generalController.home);
router.get("/register", generalController.registerForm);
router.get("/settings/:userId", generalController.settings);
router.get("/:userId", generalController.showAll);

module.exports = router;
