const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');


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
    forgotToken: {
      type: DataTypes.STRING(700),
      allowNull: false,
    },
}, 
{
    tableName: 'usuarios', // nombre tabla en BD
    timestamps: false, // By default, Sequelize automatically adds the fields createdAt and updatedAt to every model, using the data type DataTypes.DATE
});
// allowNull defaults to true


module.exports = { UsuarioModel };