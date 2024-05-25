const { Sequelize } = require('sequelize');


// Parametros conexion
const sequelize = new Sequelize(
  process.env.DB_DATABASE, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

// Probar conexion
const db = async () => {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
};

db();

// Sincronizar modelos
sequelize.sync()
  .then(() => {
    console.log('-- tablas sincronizadas --');
  })
  .catch((error) => {
    console.log('-- error sincronizar tablas:', error);
});


module.exports = { sequelize }