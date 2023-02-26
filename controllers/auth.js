const { response, request } = require('express')
const { generarJsonWebToken } = require('../helpers/generate-JWT')
const Usuario = require('../models/usuarios')
const bcryptjs = require('bcryptjs')

const authUsers = async (req = request, res = response) => {

    const { username, password } = req.body

    try {

        //Validamos que sea un username
        const exReg = /^[a-zA-Z]+[a-zA-Z]+(?:-\d{8})$/;
        if (!exReg.test(username)) {
            return res.status(400).json({
                error: 'Username invalido'
            })
        }

        //Validamos que el username exista
        const usuario = await Usuario.findOne({ where: { username } })
        if (!usuario) {
            return res.status(400).json({
                error: 'El usuario y/o contraseñas no son correctos | Username'
            })
        }

        //Validamos que el password sea correcto
        const validatePassword = bcryptjs.compareSync(password, usuario.password) //La funcion devuelve true o false
        if (!validatePassword) {
            return res.status(400).json({
                error: 'El usuario y/o contraseñas no son correctos | Contraseña'
            })
        }


        // Validamos que el usuario no haya sido eliminado
        if (!usuario.estado) {
            return res.status(401).json({
                error: 'Acceso denegado | El usuario esta eliminado'
            })
        }

        //Generar json web token
        const token = await generarJsonWebToken(usuario.idusuario)

         //Validar que el usuario ya haya cambiado su contraseña temporal
         if (usuario.password_temporary) {
           return res.status(200).json({
                msg: `Usuario ${usuario.nombre} autenticado correctamente`,
                token,    //Se manda el token
                aviso: `Redirige al usuario al modulo de actulizar cotraseña`
            })
         }

        res.status(200).json({
            msg: `Usuario ${usuario.nombre} autenticado correctamente`,
            token    //Se manda el token
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