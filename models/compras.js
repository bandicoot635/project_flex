const { DataTypes } = require('sequelize')
const sequelize = require('../database/connection')

const Compras = sequelize.define('Compra', {

    id_compra: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario: {
        type: DataTypes.STRING,
    },
    //Es el total de productos comprados
    total_productos: {
        type: DataTypes.INTEGER,
    },
    subtotal_compra:{
        type: DataTypes.DECIMAL,
    },
    total_compra: {
        type: DataTypes.DECIMAL,
    },
    CFDI: {
        type: DataTypes.STRING,
    }
})

module.exports = Compras;