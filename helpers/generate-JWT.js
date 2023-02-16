const jwt = require('jsonwebtoken')


const generarJsonWebToken = (idusuario = '') => {

    return new Promise((resolve, reject) => {

        const payload = { idusuario };

        jwt.sign(payload, process.env.FIRMAJWT, {
            expiresIn: '8hr'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('no se pudo generar el json web token')
            } else {
                resolve(token)
            }
        })
    })
}


module.exports = {
    generarJsonWebToken
}