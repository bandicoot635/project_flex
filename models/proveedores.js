const { DataTypes } = require('sequelize')
const sequelize = require('../database/connection')

const Provider = sequelize.define('Provider', {

    id_proveedor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    RFC: {
        type: DataTypes.STRING,
    },
    categoria: {
        type: DataTypes.STRING,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
  
})

module.exports = Provider;