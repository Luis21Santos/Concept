const express = require("express");
const router = express.Router();
const subjectsController = require("../controllers/subjectsController");

router.get("/create/:userId", subjectsController.createNewSubject);
router.post("/add/:userId", subjectsController.addNewSubject);
router.get("/show/:id", subjectsController.showOneSubject);
router.get("/delete/:id", subjectsController.deleteOneSubject);
router.get("/edit/:id", subjectsController.editOneSubject);
router.post("/edit/:id/save-changes", subjectsController.saveChanges);

module.exports = router;
