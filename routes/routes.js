const express = require("express");
const app = express();

const generalRouter = require("./generalRouter");
const conceptsRouter = require("./concepts");
const sectionsRouter = require("./sections");
const subjectsRouter = require("./subjects");
const usersRouter = require("./users");

app.use("/", generalRouter);
app.use("/users", usersRouter);
app.use("/concepts", conceptsRouter);
app.use("/sections", sectionsRouter);
app.use("/subjects", subjectsRouter);

module.exports = app;
