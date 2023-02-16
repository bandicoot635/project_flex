const { DataTypes } = require('sequelize')
const sequelize = require('../database/connection')

const Product = sequelize.define('Product', {

    idproducto: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    codigo_barras: {
        type: DataTypes.STRING,
    },
    precioVenta: {
        type: DataTypes.DECIMAL,
    },
    precioCompra: {
        type: DataTypes.DECIMAL,
        // defaultValue: 0.00
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    tamanio: {
        type: DataTypes.STRING,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    fk_proveedor: {
        type: DataTypes.INTEGER,
    },
    fk_departamento: {
        type: DataTypes.INTEGER,
    }
})

module.exports = Product;