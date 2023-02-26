const { Router } = require('express');

//Middlewares
const { validarJWT } = require('../middlewares/validate-JWT');
const { validarCampos } = require('../middlewares/validate-campos');
const { tieneRol } = require('../middlewares/validate-roles');
const { passwordSeguro } = require('../middlewares/validate-password');
const { isEmail } = require('../middlewares/validate-email');
const { check } = require('express-validator');

//Helpers
const { isRolValido, isEmailValido, isCelularValido, isUsernameValido } = require('../helpers/db-validate');

const { usersGet, usersPost, usersDelete, usersPut, passwordPut } = require('../controllers/users');
const router = Router();

router.get('/', [
    validarJWT,
     tieneRol('ADMIN'),
], usersGet)

router.post('/', [
    validarJWT,
    tieneRol('ADMIN'),
    isEmail,
    check('nombre', 'El nombre es obligario').notEmpty(),
    check('nombre', 'No es un nombre valido').matches(/^[a-zA-Z ]+$/),
    check('apellidoPaterno', 'Los apellidos son obligatorios').notEmpty(),
    check('apellidoPaterno', 'No es un apellido valido').matches(/^[a-zA-Z]+$/),
    check('apellidoMaterno', 'Los apellidos son obligatorios').notEmpty(),
    check('apellidoMaterno', 'No es un apellido valido').matches(/^[a-zA-Z]+$/),
    check('idrol', 'El rol es obligatorio').notEmpty(),
    check('idrol').custom(isRolValido),
    check('email', 'El correo es obligatorio').notEmpty(),
    check('email').custom(isEmailValido),
    check('celular', 'El celular es obligatorio').notEmpty(),
    check('celular').matches(/^\d{10}$/).withMessage('No es un numero celular valido | solo escribe tu numero a 10 digitos'),
    check('celular').custom(isCelularValido),
    validarCampos
], usersPost)

router.put('/', [
    validarJWT,
    tieneRol('ADMIN'),
    isEmail,
    check('idusuario', 'Tienes que enviar el ID del usuario a actulizar').notEmpty(),
    check('nombre').optional().matches(/^[a-zA-Z ]+$/).withMessage('No es un nombre valido'),
    check('apellidoPaterno', 'No es un apellido valido').optional().matches(/^[a-zA-Z]+$/),
    check('apellidoMaterno', 'No es un apellido valido').optional().matches(/^[a-zA-Z]+$/),
    check('idrol').optional().custom(isRolValido),
    check('username').optional().custom(isUsernameValido),
    check('username').optional().matches(/^[a-zA-Z]+[a-zA-Z]+(?:-\d{8})$/),
    check('email').optional().custom(isEmailValido),
    check('celular').optional().matches(/^\d{10}$/).withMessage('No es un numero celular valido | solo escribe tu numero a 10 digitos'),
    check('celular').optional().custom(isCelularValido),
    validarCampos
], usersPut)

router.put('/password', [
    validarJWT,
    tieneRol('ADMIN', 'SUPER', 'VENTAS'),
    check('password', 'La contraseña es obligaria').notEmpty(),
    passwordSeguro,
    validarCampos
], passwordPut)

router.delete('/', [
    validarJWT,
    tieneRol('ADMIN'),
    check('idusuario', 'Tienes que enviar el ID del usuario a eliminar').notEmpty(),
    validarCampos
], usersDelete)


module.exports = router; 