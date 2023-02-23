const { DataTypes } = require('sequelize')
const sequelize = require('../database/connection')

const Insumo = sequelize.define('Insumo', {

    id_insumo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    codigo_barras: {
        type: DataTypes.STRING,
    },
    precio_compra: {
        type: DataTypes.DECIMAL,
    },
    unidad_medida: {
        type: DataTypes.STRING,
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    id_proveedor: {
        type: DataTypes.INTEGER,
    },
    id_departamento: {
        type: DataTypes.INTEGER,
    }
})

module.exports = Insumo;