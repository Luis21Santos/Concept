const db = require("./connection");

const User = db.sequelize.define("user", {
  username: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

//User.sync({ force: true });

module.exports = User;
