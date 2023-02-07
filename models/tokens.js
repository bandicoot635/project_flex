const { DataTypes } = require('sequelize')
const sequelize = require('../database/connection')

const Token = sequelize.define('Token', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        // autoIncrement: true,
    },
    user_id: {
        type: DataTypes.STRING,
    },
    refresh_token : {
        type: DataTypes.STRING,
    },
    expires_at : {
        type: DataTypes.DATE,
    }
})

module.exports = Token;