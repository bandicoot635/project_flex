const { Router } = require('express');
const { proveedoresGet, proveedoresPost, proveedoresPut, proveedoresDelete } = require('../controllers/proveedores');
const { validarCampos } = require('../middlewares/validate-campos');
const { validarJWT } = require('../middlewares/validate-JWT');
const { isAdminRol } = require('../middlewares/validate-roles');
const { check } = require('express-validator');

const router = Router();


router.get('/', [
    validarJWT,
    isAdminRol
], proveedoresGet)

router.post('/', [
    validarJWT,
    isAdminRol,
    check('nombre', 'El nombre es obligario').notEmpty(),
    check('RFC', 'El RFC es obligario').notEmpty(),
    check('RFC').matches(/^[A-Z&Ñ]{3,4}(\d{2})(0[1-9]|1[0-2])(0[1-9]|[1-2]\d|3[0-1])[A-Z\d]{3}$/).withMessage('Ingresa un RFC valido'),
    check('categoria', 'La categoria es obligario').notEmpty(),
    validarCampos
], proveedoresPost)

router.put('/', [
    validarJWT,
    isAdminRol,
    check('RFC').optional().matches(/^[A-Z&Ñ]{3,4}(\d{2})(0[1-9]|1[0-2])(0[1-9]|[1-2]\d|3[0-1])[A-Z\d]{3}$/).withMessage('Ingresa un RFC valido'),
    validarCampos
], proveedoresPut)

router.delete('/', [
    validarJWT,
    isAdminRol,
    check('id_proveedor', 'Tienes que enviar el ID del proveedor a eliminar').notEmpty(),
    validarCampos
], proveedoresDelete)


module.exports = router; 