const express = require('express')
const cors = require('cors')
const sequelize = require('../database/connection')

class Server {


    constructor() {

        this.app = express()
        this.port = process.env.PORT

        //Rutas
        this.loginPath = '/api/auth'
        this.usersPath = '/api/users'
        this.products  = '/api/products'
        this.compras = '/api/compras'
        
        this.proveedores = '/api/proveedores'
        this.mermas = '/api/mermas'
        this.insumos = '/api/insumos'
        
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
        this.app.use(this.compras, require('../routes/compras')),
        this.app.use(this.proveedores, require('../routes/proveedores'))
        this.app.use(this.mermas, require('../routes/mermas'))
        this.app.use(this.insumos, require('../routes/insumos'))
    }

    listen() { 
        this.app.listen(this.port, () => {
            console.log('servidor corriendo en el puerto', this.port);
        })
    }
}

module.exports = Server;