const express = require('express')
const cors = require('cors')
const sequelize = require('../database/connection')

class Server {


    constructor() {
        this.app = express()
        this.port = process.env.PORT || 8080; 

        //Rutas
        this.loginPath = '/api/auth'
        this.usersPath = '/api/users'
        this.products  = '/api/products'

        this.middlewares()

        //Conectar base de datos 
        this.dbConnection()

        this.routes()

    }


    async dbConnection() {

        try {
            await sequelize.authenticate()
            console.log('DataBase online.');
        } catch (error) {
            throw new Error(error)
        }
    }

    middlewares() {
        //CORS
        this.app.use(cors())

        //lectura del body
        this.app.use(express.json())

    }

    routes() {
        this.app.use(this.usersPath, require('../routes/users'))
        this.app.use(this.loginPath, require('../routes/auth'))
        this.app.use(this.products, require('../routes/products'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('servidor corriendo en el puerto', this.port);
        })
    }
}

module.exports = Server;