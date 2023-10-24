const User = require("../models/User");
const Subject = require("../models/Subject");
const Section = require("../models/Section");
const Concept = require("../models/Concept");
const Point = require("../models/Point");

const bcrypt = require("bcryptjs");
const passport = require("passport");

exports.register = (req, res) => {
  //input validations
  //verify if the email does already exist in the database
  const newUser = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  };
  //hashing process
  bcrypt.genSalt(10, (error, salt) => {
    newUser.password = bcrypt.hash(newUser.password, salt).then((password) => {
      newUser.password = password;
      //saving the new user inside the database
      User.create(newUser)
        .then((newUser) => {
          res.redirect(`/${newUser.id}`);
        })
        .catch((err) => {
          res.send(`${err}`);
        });
    });
  });
};
exports.login = async (req, res, next) => {
  const userData = await User.findOne({ where: { email: req.body.email } });

  passport.authenticate("local", (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/");
    }
    const userId = userData.id;
    res.redirect(`/${userId}`);
  })(req, res, next);
};
exports.reset = (req, res) => {
  Subject.destroy({ where: { userId: req.params.userId } });
  Section.destroy({ where: { userId: req.params.userId } });
  Concept.destroy({ where: { userId: req.params.userId } });
  Point.destroy({ where: { userId: req.params.userId } }).then(() => {
    req.flash("success_msg", "The account has been successfully reset");
    res.redirect(`/settings/${req.params.userId}`);
  });
};
exports.logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
exports.deleteAccount = (req, res) => {
  User.destroy({ where: { id: req.params.userId } });
  Subject.destroy({ where: { id: req.params.userId } });
  Section.destroy({ where: { id: req.params.userId } });
  Concept.destroy({ where: { id: req.params.userId } });
  Point.destroy({ where: { id: req.params.userId } })
    .then(() => {
      res.redirect(`/`);
    })
    .catch((err) => {
      res.send(`${err}`);
    });
};
exports.changeAccountInfo = (req, res) => {
  User.update(
    {
      email: req.body.email,
      username: req.body.username,
    },
    { where: { id: req.params.userId } }
  )
    .then(() => {
      res.redirect(`/settings/${req.params.userId}`);
    })
    .catch((err) => {
      res.send(`${err}`);
    });
};
