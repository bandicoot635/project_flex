const { Router } = require('express');
const { comprasGet, comprasPost } = require('../controllers/compras');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validate-campos');
const { validarJWT } = require('../middlewares/validate-JWT');
const { tieneRol } = require('../middlewares/validate-roles');


const router = Router();


router.get('/', [
    validarJWT,
    tieneRol('ADMIN', 'SUPER'),
], comprasGet)

router.post('/', [
    validarJWT,
    tieneRol('SUPER'),
    check('CFDI', 'Tienes que enviar el CFDI de la compra').notEmpty(),
    check('CFDI', 'El CFDI debe ser G01 o G03').isIn(['G01', 'G03']),
    check('subtotal_compra', 'Envia el subtotal de la compra').notEmpty().isNumeric(),
    check('total_compra', 'Envia el total de la compra').notEmpty().isNumeric(),
    check('productos', 'El parámetro productos debe ser un arreglo y no estar vacio').notEmpty().isArray(),
    validarCampos
], comprasPost)



module.exports = router; 