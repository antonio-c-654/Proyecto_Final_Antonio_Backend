const { Sequelize, DataTypes } = require('sequelize');

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

// allowNull defaults to true
const UsuarioModel = sequelize.define('Usuario', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(50),
    },
    foto_perfil: {
      type: DataTypes.STRING(200),
    },
    medallas: {
      type: DataTypes.STRING(100),
    },
    isAdmin: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
}, 
{
    tableName: 'usuarios', // nombre tabla en BD
    timestamps: false, // By default, Sequelize automatically adds the fields createdAt and updatedAt to every model, using the data type DataTypes.DATE
});

// Sincronizar modelos
sequelize.sync()
  .then(() => {
    console.log('-- tablas sincronizadas --');
  })
  .catch((error) => {
    console.log('-- error sincronizar tablas:', error);
});

module.exports = { sequelize, UsuarioModel };