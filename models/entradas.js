const { DataTypes } = require('sequelize')
const sequelize = require('../database/connection')

const Entrada = sequelize.define('Entrada', {

    id_entrada: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    codigo_barras:{
        type: DataTypes.INTEGER,
    },
    id_usuario:{
        type: DataTypes.STRING,
    },
    cantidad_ingresada: {
        type: DataTypes.INTEGER,
    },
    fecha_caducidad: {
        type: DataTypes.DATE,
    }
})

module.exports = Entrada;