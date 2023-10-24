const db = require("./connection");

const Point = db.sequelize.define("points", {
  point: {
    type: db.Sequelize.TEXT,
    allowNull: false,
  },
  conceptId: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
  },
  sectionId: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
  },
  subjectId: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
  },
  userId: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
  },
  //add mastery level later
  //add image input option
});

//Point.sync({ force: true });

module.exports = Point;
