const db = require("./connection");

const Section = db.sequelize.define("sections", {
  section: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: db.Sequelize.TEXT,
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
});

//Section.sync({ force: true });

module.exports = Section;
