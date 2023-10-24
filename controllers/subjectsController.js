const User = require("../models/User");
const Subject = require("../models/Subject");
const Section = require("../models/Section");
const Concept = require("../models/Concept");
const Point = require("../models/Point");

exports.showOneSubject = async (req, res) => {
  const relatedSections = await Section.findAll({
    where: { subjectId: req.params.id },
  });

  Subject.findOne({ where: { id: req.params.id } }).then((subject) => {
    User.findOne({ where: { id: subject.userId } })
      .then((user) => {
        res.render("templates/subject-template", {
          subject: subject,
          relatedSections: relatedSections,
          user: user,
        });
      })
      .catch((error) => {
        res.send(
          `An error occurred while trying to fetch data of the selected subject. ${error}`
        );
      });
  });
};
exports.createNewSubject = (req, res) => {
  const userId = req.params.userId;

  User.findOne({ where: { id: userId } }).then((user) => {
    res.render("pages/add-subject", { user: user });
  });
};
exports.addNewSubject = (req, res) => {
  Subject.create({
    userId: req.params.userId,
    subject: req.body.subject,
    description: req.body.description,
    color: req.body.color,
  })
    .then((subject) => {
      res.redirect(`/subjects/show/${subject.id}`);
    })
    .catch((error) => {
      res.render(
        `An error occurred while trying to save the new subject into the database. \n Error: \n ${error}`
      );
    });
};
exports.deleteOneSubject = async (req, res) => {
  const subject = await Subject.findOne({ where: { id: req.params.id } });
  const user = await User.findOne({ where: { id: subject.userId } });

  //deleting related points
  Point.destroy({ where: { userId: user.id, subjectId: req.params.id } });

  //deleting related concepts
  Concept.destroy({ where: { userId: user.id, subjectId: req.params.id } });

  //deleting related sections
  Section.destroy({ where: { userId: user.id, subjectId: req.params.id } });

  //deleting subject per se
  Subject.destroy({ where: { userId: user.id, id: req.params.id } })
    .then(() => {
      res.redirect(`/${user.id}`);
    })
    .catch((err) => {
      res.send(`${err}`);
    });
};
exports.editOneSubject = async (req, res) => {
  Subject.findOne({ where: { id: req.params.id } }).then((subject) => {
    User.findOne({ where: { id: subject.userId } })
      .then((user) => {
        res.render("pages/edit-subject", { subject: subject, user: user });
      })
      .catch((err) => {
        res.send(
          `An error occurred while trying to read the concept info inside the database. ${err}`
        );
      });
  });
};
exports.saveChanges = (req, res) => {
  Subject.update(
    {
      subject: req.body.subject,
      description: req.body.description,
    },
    { where: { id: req.body.id } }
  )
    .then(() => {
      res.redirect(`/subjects/show/${req.params.id}`);
    })
    .catch((err) => {
      res.send(
        `An error occurred while trying to update the subject inside the database. ${err}`
      );
    });
};
