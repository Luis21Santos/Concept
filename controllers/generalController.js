const User = require("../models/User");
const Subject = require("../models/Subject");
const Section = require("../models/Section");
const Concept = require("../models/Concept");

exports.registerForm = (req, res) => {
  res.render("pages/register");
};
exports.showAll = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    const subjects = await Subject.findAll({ where: { userId: user.id } });
    const sections = await Section.findAll({ where: { userId: user.id } });
    const concepts = await Concept.findAll({ where: { userId: user.id } });

    res.render("pages/index", {
      concepts: concepts,
      sections: sections,
      subjects: subjects,
      user: user,
    });
  } catch {
    res.redirect("/");
  }
};
exports.settings = async (req, res) => {
  const user = await User.findOne({ where: { id: req.params.userId } });
  res.render("pages/settings", { user: user });
};
exports.home = (req, res) => {
  res.render("pages/home");
};
