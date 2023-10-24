const express = require("express");
const router = express.Router();
const conceptsController = require("../controllers/conceptsController");

//concepts
router.get("/create/:userId", conceptsController.createNewConcept);
router.post("/add/:userId", conceptsController.addNewConcept);
router.get("/show/:id", conceptsController.showOneConcept);
router.get("/delete/:id", conceptsController.deleteOneConcept);
router.get("/edit/:id", conceptsController.editOneConcept);
router.post("/edit/:id/save-changes", conceptsController.saveChanges);

//points
router.post("/show/:id/points/add", conceptsController.addNewPoint);
router.get(
  "/show/:id/points/delete/:pointId",
  conceptsController.deleteOnePoint
);
router.get("/show/:id/points/edit/:pointId", conceptsController.editOnePoint);
router.post(
  "/show/:id/points/edit/:pointId/save-changes-of-point",
  conceptsController.saveChangesOfPoint
);

module.exports = router;
