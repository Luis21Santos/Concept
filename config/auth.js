const localStrategy = require("passport-local").Strategy;
const sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new localStrategy(
      { usernameField: "email", passwordField: "password" },
      (email, password, done) => {
        //querying the email inside the database
        User.findOne({
          where: {
            email: email,
          },
        }).then((user) => {
          //for non-registered emails
          if (!user) {
            return done(null, false, {
              message: "This email hasn't been registered in the application",
            });
          }

          bcrypt
            .compare(password, user.password)
            .then((user) => {
              return done(null, user);
            })
            .catch((error) => {
              return done(null, false, { message: `${error}` });
            });
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({
      where: {
        id: id,
      },
    }).then((error, user) => {
      done(error, user);
    });
  });
};
