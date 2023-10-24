const User = require("../models/User");
const Concept = require("../models/Concept");
const Subject = require("../models/Subject");
const Section = require("../models/Section");
const Point = require("../models/Point");

exports.showOneConcept = async (req, res) => {
  const relatedPoints = await Point.findAll({
    where: { conceptId: req.params.id },
  });

  const concept = await Concept.findOne({ where: { id: req.params.id } });
  const section = await Section.findOne({ where: { id: concept.sectionId } });
  const user = await User.findOne({ where: { id: concept.userId } });

  Subject.findOne({ where: { id: concept.subjectId } })
    .then((subject) => {
      res.render("templates/concept-template", {
        concept: concept,
        section: section,
        subject: subject,
        relatedPoints: relatedPoints,
        user: user,
      });
    })
    .catch((error) => {
      res.send(
        `An error occurred while trying to query this concept in the database. \n Error: \n ${error}`
      );
    });
};
exports.createNewConcept = async (req, res) => {
  const subjects = await Subject.findAll({});
  const user = await User.findOne({ where: { id: req.params.userId } });

  Section.findAll({ where: { userId: user.id } })
    .then((sections) => {
      res.render("pages/add-concept", {
        sections: sections,
        subjects: subjects,
        user: user,
      });
    })
    .catch((error) => {
      res.send(`${error}`);
    });
};
exports.addNewConcept = async (req, res) => {
  const sectionId = req.body.sectionId;
  const section = await Section.findOne({
    where: { id: sectionId },
  });
  const user = await User.findOne({ where: { id: req.params.userId } });
  const subject = await Subject.findOne({ where: { id: section.subjectId } });

  Concept.create({
    concept: req.body.concept,
    description: req.body.description,
    sectionId: sectionId,
    subjectId: subject.id,
    userId: user.id,
  })
    .then((concept) => {
      res.redirect(`/concepts/show/${concept.id}`);
    })
    .catch((error) => {
      res.send(
        `An error occurred while trying to save the concept into the database. ${error}`
      );
    });
};
exports.deleteOneConcept = async (req, res) => {
  const concept = await Concept.findOne({ where: { id: req.params.id } });
  const user = await User.findOne({ where: { id: concept.userId } });
  //delete points related to the concept
  Point.destroy({
    where: {
      conceptId: req.params.id,
    },
  });

  //deleting concept per se
  Concept.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.redirect(`/${user.id}`);
    })
    .catch((error) => {
      res.send(`${error}`);
    });
};
exports.addNewPoint = async (req, res) => {
  const concept = await Concept.findOne({ where: { id: req.params.id } });
  Point.create({
    point: req.body.point,
    conceptId: req.params.id,
    sectionId: req.body.sectionId,
    subjectId: req.body.subjectId,
    userId: concept.userId,
  }).then(() => {
    res.redirect(`/concepts/show/${req.params.id}`);
  });
};
exports.deleteOnePoint = (req, res) => {
  Point.destroy({
    where: {
      id: req.params.pointId,
    },
  })
    .then(() => {
      res.redirect(`/concepts/show/${req.params.id}`);
    })
    .catch((error) => {
      res.send(
        `An error occurred while trying to clean this point off the database. \n Error: \n ${error}`
      );
    });
};
exports.saveChanges = (req, res) => {
  Concept.update(
    {
      concept: req.body.concept,
      id: req.body.id,
      sectionId: req.body.sectionId,
      description: req.body.description,
    },
    { where: { id: req.body.id } }
  )
    .then(() => {
      res.redirect(`/concepts/show/${req.body.id}`);
    })
    .catch((error) => {
      res.send(
        `An error occurred while trying to edit the concept inside the database. ${error}`
      );
    });
};
exports.editOneConcept = async (req, res) => {
  const concept = await Concept.findOne({ where: { id: req.params.id } });
  const points = await Point.findAll({ where: { conceptId: req.params.id } });
  const user = await User.findOne({ where: { id: concept.userId } }); //declare outside

  Section.findAll()
    .then((sections) => {
      res.render("pages/edit-concept", {
        sections: sections,
        concept: concept,
        points: points,
        user: user,
      });
    })
    .catch((error) => {
      res.send(`An error occurred. ${error}`);
    });

};
exports.editOnePoint = async (req, res) => {
  const concept = await Concept.findOne({ where: { id: req.params.id } });
  const user = await User.findOne({ where: { id: concept.userId } });

  Point.findOne({ where: { id: req.params.pointId } })
    .then((point) => {
      res.render("pages/edit-point", {
        point: point,
        conceptId: req.params.id,
        user: user,
      });
    })
    .catch((err) => {
      res.send(
        `An error occurred while trying to find the point inside the database. ${err}`
      );
    });
};
exports.saveChangesOfPoint = (req, res) => {
  Point.update(
    {
      point: req.body.point,
    },
    { where: { id: req.body.id } }
  )
    .then(() => {
      res.redirect(`/concepts/show/${req.params.id}`);
    })
    .catch((err) => {
      res.render(
        `An error occurred while trying to edit the point inside the database. ${err}`
      );
    });
};
