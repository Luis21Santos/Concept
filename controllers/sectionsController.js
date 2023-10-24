const User = require("../models/User");
const Section = require("../models/Section");
const Concept = require("../models/Concept");
const Subject = require("../models/Subject");
const Point = require("../models/Point");

exports.showOneSection = async (req, res) => {
  const relatedConcepts = await Concept.findAll({
    where: {
      sectionId: req.params.id,
    },
  });
  const section = await Section.findOne({ where: { id: req.params.id } });
  const user = await User.findOne({ where: { id: section.userId } });
  Subject.findOne({ where: { id: section.subjectId } })
    .then((subject) => {
      res.render("templates/section-template", {
        section: section,
        subject: subject,
        user: user,
        relatedConcepts: relatedConcepts,
      });
    })
    .catch((error) => {
      res.send(
        `An error occurred while trying to take data of the selected section. ${error}`
      );
    });
};
exports.createNewSection = async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findOne({ where: { id: userId } });

  Subject.findAll({ where: { userId: userId } })
    .then((subjects) => {
      res.render("pages/add-section", {
        subjects: subjects,
        userId: userId,
        user: user,
      });
    })
    .catch((error) => {
      res.send(
        `An error occurred while trying to list all the subjects of the database. ${error}`
      );
    });
};
exports.addNewSection = (req, res) => {
  Section.create({
    section: req.body.section,
    description: req.body.description,
    subjectId: req.body.subjectId,
    userId: req.params.userId,
  })
    .then((section) => {
      res.redirect(`/sections/show/${section.id}`);
    })
    .catch((error) => {
      res.send(
        `An error occurred while trying to add this section into the database. ${error}`
      );
    });
};
exports.deleteOneSection = async (req, res) => {
  const section = await Section.findOne({ where: { id: req.params.id } });
  const user = await User.findOne({ where: { id: section.userId } });

  //deleting related points
  Point.destroy({
    where: {
      userId: user.id,
      sectionid: req.params.id,
    },
  });
  //deleting related concepts
  Concept.destroy({
    where: {
      userId: user.id,
      sectionid: req.params.id,
    },
  });

  Section.destroy({ where: { id: req.params.id, userId: user.id } })
    .then(() => {
      res.redirect(`/${user.id}`);
    })
    .catch((err) => {
      res.send(`${err}`);
    });
};
exports.editOneSection = async (req, res) => {
  const section = await Section.findOne({ where: { id: req.params.id } });

  User.findOne({ where: { id: section.userId } }).then((user) => {
    res.render("pages/edit-section", { section: section, user: user });
  });
};
exports.saveChanges = (req, res) => {
  Section.update(
    {
      section: req.body.section,
      description: req.body.description,
    },
    { where: { id: req.body.id } }
  )
    .then(() => {
      res.redirect(`/sections/show/${req.params.id}`);
    })
    .catch((err) => {
      res.send(
        `An error occurred while trying to update the section inside the database. ${err}`
      );
    });
};
