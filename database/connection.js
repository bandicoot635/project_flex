const  { Sequelize }  = require('sequelize');

const sequelize = new Sequelize('flexzone.v2', 'root', 'admin', {
    host:'localhost',
    port: 3307,
    dialect: 'mysql'
});

module.exports = sequelize