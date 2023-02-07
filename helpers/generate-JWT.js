const jwt = require('jsonwebtoken')

// Function to generate a new main token
const generarJsonWebToken = (idusuario = '') => {

    return new Promise((resolve, reject) => {

        const payload = { idusuario };

        jwt.sign(payload, process.env.FIRMAJWT, {
            // expiresIn: '1hr',
            expiresIn: 900
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token')
            } else {
                resolve(token) //Token principal se utiliza para autenticar las solicitudes del usuario y tiene un tiempo de expiración limitado
            }
        })

    })
}


// Función para generar un nuevo token de actualización
const refreshJsonWebToken = (idusuario = '') => {

    return new Promise((resolve, reject) => {

        const payload = { idusuario };

        jwt.sign(payload, process.env.FIRMAJWT, {
            expiresIn: 604800
        }, (err, tokenRefresh) => {
            if (err) {
                console.log(err);
                reject({
                    error: err.message,
                    msg: 'Error al actualizar el token'
                })
            } else {
                resolve(tokenRefresh) //Token para actulizar el token principal cuando este vaya a expirar.
            }
        })

    })
}


module.exports = {
    generarJsonWebToken,
    refreshJsonWebToken
}