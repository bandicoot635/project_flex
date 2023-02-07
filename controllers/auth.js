const { response, request } = require('express')
const { generarJsonWebToken, refreshJsonWebToken } = require('../helpers/generate-JWT')
const Usuario = require('../models/usuarios')
const Token = require('../models/tokens')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');

const authUsers = async (req = request, res = response) => {

    const { username, password } = req.body

    try {

        //Validamos que sea un username
        const exReg = /^[a-zA-Z]+[a-zA-Z]+(?:-\d{8})$/;
        if (!exReg.test(username)) {
            return res.status(400).json({
                msg: 'Username invalido'
            })
        }

        //Validamos que el username exista
        const usuario = await Usuario.findOne({ where: { username } })
        if (!usuario) {
            return res.status(400).json({
                msg: 'El usuario y/o contraseñas no son correctos | Username'
            })
        }

        //Validamos que el password sea correcto
        const validatePassword = bcryptjs.compareSync(password, usuario.password) //La funcion devuelve true o false
        if (!validatePassword) {
            return res.status(400).json({
                msg: 'El usuario y/o contraseñas no son correctos | Contraseña)'
            })
        }


        // Validamos que el usuario no haya sido eliminado
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Acceso denegado | El usuario fue eliminado'
            })
        }

        //Generar json web token
        const token = await generarJsonWebToken(usuario.idusuario)// Duracion 15 minutos

        const tokenRefresh = await refreshJsonWebToken(usuario.idusuario) //Duracion 7 dias
        // console.log(tokenRefresh);

        // const decoded = jwt.decode(tokenRefresh, { complete: true });
        // const expiry = decoded.payload.exp;
        // console.log("El token expira el:", new Date(expiry * 1000).toUTCString())

        const { exp } = jwt.decode(tokenRefresh, { complete: true });
        console.log("El token expira el:", new Date(exp * 1000).toUTCString())
        


        // Aqui se debe de guardar el token de actualizacion
        const tokenRefreshData = new Token({
            user_id: usuario.idusuario,
            refresh_token: tokenRefresh,
            expires_at: exp
        })

        await tokenRefreshData.save()


        res.json({
            msg: `Usuario ${usuario.nombre} autenticado correctamente`,
            token    //Se manda token principal
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message,
            msg: 'Error en el servidor'
        })
    }

}

module.exports = { authUsers };