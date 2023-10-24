const db = require("./connection");

const Concept = db.sequelize.define("concepts", {
  concept: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: db.Sequelize.TEXT,
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
});

//Concept.sync({ force: true });

module.exports = Concept;
