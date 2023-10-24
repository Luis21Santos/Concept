const db = require("./connection");

const Subject = db.sequelize.define("subject", {
  subject: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: db.Sequelize.TEXT,
    allowNull: false,
  },
  color: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
  userId: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
  },
});

//Subject.sync({ force: true });

module.exports = Subject;
