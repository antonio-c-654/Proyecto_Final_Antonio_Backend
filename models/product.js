const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');


const ProductoModel = sequelize.define('Producto', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING(200),
    },
    imagen: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    picante: {
        type: DataTypes.BOOLEAN,
    },
    vegano: {
        type: DataTypes.BOOLEAN,
    },
    destacado: {
        type: DataTypes.BOOLEAN,
    },
    favorito: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    ingredientes: { 
        type: DataTypes.TEXT,
    },
    alergenos: { 
        type: DataTypes.TEXT,
    },
    categoria: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
},
{
    tableName: 'productos', // nombre tabla en BD
    timestamps: false, // By default, Sequelize automatically adds the fields createdAt and updatedAt to every model, using the data type DataTypes.DATE
});
// allowNull defaults to true


module.exports = { ProductoModel };