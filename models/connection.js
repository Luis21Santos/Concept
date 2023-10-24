const Sequelize = require("sequelize");

require("dotenv").config();
const dbName = process.env.DATABASE_NAME;
const dbUser = process.env.DATABASE_USER;
const dbPassword = process.env.DATABASE_PASSWORD;
const dbHost = process.env.DATABASE_HOST;

//Conexão com banco de dados
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: "mysql",
  query: { raw: true },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Conectado ao banco de dados");
  })
  .catch((err) => {
    console.log(
      `Não conseguimos nos conectar ao banco de dados. Error: ${err}`
    );
  });

module.exports = {
  sequelize: sequelize,
  Sequelize: Sequelize,
};
