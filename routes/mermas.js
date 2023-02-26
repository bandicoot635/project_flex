const { Router } = require('express');
const { mermasGet, mermasPost } = require('../controllers/mermas');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validate-JWT');
const { tieneRol } = require('../middlewares/validate-roles');
const { validarCampos } = require('../middlewares/validate-campos');

const router = Router();


router.get('/', [
    validarJWT,
    tieneRol('ADMIN', 'SUPER'),
], mermasGet)

router.post('/', [
    validarJWT,
    tieneRol('SUPER'),
    check('codigo_barras', 'Tienes que enviar el codigo de barras del producto a mermar').notEmpty(),
    check('cantidad', 'Tienes que enviar la cantidad de productos a mermar').notEmpty(),
    check('motivo', 'Tienes que enviar el motivo de la merma').notEmpty(),
    validarCampos
], mermasPost)

module.exports = router; 