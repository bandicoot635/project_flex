const { response, request } = require('express')
const jwt = require('jsonwebtoken');
const { generarJsonWebToken } = require('../helpers/generate-JWT');
const Usuario = require('../models/usuarios')

const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('authorization');

    //Se verifica que el usuario haya mandado el token
    if (!token) {
        return res.status(401).json({
            error: 'No hay token'
        })
    }

    try {

        // Se verifica que el token sea valido y se estrae el id del usuario
        const { idusuario, exp } = jwt.verify(token, process.env.FIRMAJWT)
        const usuario = await Usuario.findOne({ where: { idusuario } })
        console.log(idusuario, exp);
      

        // Validar que el usuario exista
        // if (!usuario) {
        //     return res.status(404).json({
        //         msg: 'Usuario NO existe'
        //     })
        // }

        //Se manda el alumno en la request
        req.usuario = usuario

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            error: error.message,
            msg: 'Token no valido'
        })
    }

}

const actualizarToken = async (req = request, res = response, next) => {

    const refreshToken = req.header('x-refresh-token');

    if (!refreshToken) {
        return res.status(401).json({
            error: 'No hay refresh token'
        });
    }

    try {

        //Se verifica que el token sea valido y se estrae el id del usuario
        const { idusuario } = jwt.verify(refreshToken, process.env.FIRMAJWT);
        const usuario = await Usuario.findOne({ where: { idusuario } });


        const nuevoToken = generarJsonWebToken(idusuario);
        res.set('Authorization', nuevoToken);


        //Se manda el alumno en la request
        req.usuario = usuario

        next();

    } catch (error) {
        return res.status(401).json({ 
            error: error.message,
            msg: 'Refresh token no válido' 
        });
    }

}

module.exports = {
    validarJWT,
    actualizarToken
}