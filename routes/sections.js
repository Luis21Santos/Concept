const express = require("express");
const router = express.Router();
const sectionsController = require("../controllers/sectionsController");

router.get("/create/:userId", sectionsController.createNewSection);
router.post("/add/:userId", sectionsController.addNewSection);
router.get("/show/:id", sectionsController.showOneSection);
router.get("/delete/:id", sectionsController.deleteOneSection);
router.get("/edit/:id", sectionsController.editOneSection);
router.post("/edit/:id/save-changes", sectionsController.saveChanges);

module.exports = router;
