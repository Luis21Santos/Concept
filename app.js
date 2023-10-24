const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");
const routes = require("./routes/routes");
const passport = require("passport");
require("./config/auth")(passport);
require("dotenv").config();

const app = express();

//session and cookies
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//middlewares
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", routes);

module.exports = app;
