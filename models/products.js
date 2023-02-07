const { DataTypes } = require('sequelize')
const sequelize = require('../database/connection')

const Product = sequelize.define('Product', {

    idproducto: {
        type: DataTypes.STRING,
        primaryKey: true,
        // autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    precioVenta: {
        type: DataTypes.DECIMAL,
    },
    precioCompra: {
        type: DataTypes.DECIMAL,
        defaultValue: 0.00
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    fechaCaducidad: {
        type: DataTypes.DATE,
        defaultValue:  '0000-00-00'
    },
    tamanio: {
        type: DataTypes.STRING,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    idproveedor: {
        type: DataTypes.INTEGER,
    },
    iddepartamento: {
        type: DataTypes.INTEGER,
    },
    idcategoria: {
        type: DataTypes.INTEGER,
    },

})

module.exports = Product;