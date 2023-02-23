const { DataTypes } = require('sequelize')
const sequelize = require('../database/connection')

const Merma = sequelize.define('Merma', {

    id_merma: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_usuario:{
        type: DataTypes.STRING,
    },
    id_producto:{
        type: DataTypes.INTEGER,
    },
    cantidad: {
        type: DataTypes.INTEGER,
    },
    motivo:{
        type: DataTypes.STRING,
    },
})

module.exports = Merma;