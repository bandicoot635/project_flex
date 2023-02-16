const { Router } = require('express');
const { productsGet, productsPost, productsPut, productsDelete } = require('../controllers/products');
const { validarJWT } = require('../middlewares/validate-JWT');
const { isAdminRol } = require('../middlewares/validate-roles');
const { validarCampos } = require('../middlewares/validate-campos');
const { check } = require('express-validator');

const router = Router();


router.get('/', validarJWT, productsGet)

router.post('/', [
    validarJWT,
    isAdminRol,
    check('nombre', 'El nombre es obligario').notEmpty(),
    check('precioVenta', 'El precio de venta es obligario').notEmpty(),
    check('precioCompra', 'El precio de compra es obligario').notEmpty(),
    check('tamanio', 'El tamaño es obligario').notEmpty(), //faltan validaciones del tamanio
    check('fk_proveedor', 'El proveedor es obligario').notEmpty(),
    check('fk_departamento', 'El departamento es obligario').notEmpty(),
    validarCampos
], productsPost)

router.put('/', [
    validarJWT,
    isAdminRol
], productsPut)

router.delete('/', [
    validarJWT,
    isAdminRol
], productsDelete)


module.exports = router; 