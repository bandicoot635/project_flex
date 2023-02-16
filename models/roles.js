const { DataTypes } = require('sequelize')
const sequelize = require('../database/connection')

const Rol = sequelize.define('Rol', {

    idrol: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    tipo: {
        type: DataTypes.STRING,
    },
    level: {
        type: DataTypes.INTEGER,
    },
    area:{
        type: DataTypes.STRING
    }
    
})

module.exports = Rol;