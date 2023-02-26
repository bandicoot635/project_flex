const Rol = require("../models/roles");


const tieneRol = (...roles) => {

    return async (req, res, next) => {

        //Se obtiene el rol del usuario
        const { idrol } = req.usuario
        try {
            if (!req.usuario) {
                return res.status(500).json({
                    error: 'Se quiere verificar el rol sin validar el token primero'
                })
            }

            //Se hace una busqueda del nombre del rol del usuario
            const rol = await Rol.findOne({
                where: {
                    idrol
                },
                attributes: ['tipo']
            })

            // console.log(rol.tipo);
            if (!roles.includes(rol.tipo)) {
                return res.status(401).json({
                    error: `El servicio requiere uno de estos roles [ ${roles} ]`
                })
            }

            next();
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: error.message,
                msg: 'Error en el servidor'
            })
        }

    }
}

module.exports = {
    tieneRol
};