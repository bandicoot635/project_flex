const { Router } = require('express');
const { productsGet, productsPost, productsPut, productsDelete } = require('../controllers/products');
const { validarJWT } = require('../middlewares/validate-JWT');
const { tieneRol } = require('../middlewares/validate-roles');
const { validarCampos } = require('../middlewares/validate-campos');
const { check } = require('express-validator');

const router = Router();


router.get('/', [
    validarJWT,
    tieneRol('ADMIN', 'SUPER'),
], productsGet)

router.post('/', [
    validarJWT,
    tieneRol('SUPER'),
    check('nombre', 'El nombre es obligario').notEmpty(),
    check('codigo_barras', 'El codigo de barras es obligario').notEmpty(),
    check('precio_venta', 'El precio de venta es obligario').notEmpty(),
    check('precio_compra', 'El precio de compra es obligario').notEmpty(),
    check('tamanio', 'El tamaño es obligario').notEmpty(), //faltan validaciones del tamanio
    check('id_proveedor', 'El proveedor es obligario').notEmpty(),
    check('id_departamento', 'El departamento es obligario').notEmpty(),
    validarCampos
], productsPost)

router.put('/', [
    validarJWT,
    tieneRol('SUPER'),
    check('codigo_barras', 'Tienes que enviar el codigo de barras del producto a actulizar').notEmpty(),
    validarCampos
], productsPut)

router.delete('/', [
    validarJWT,
    tieneRol('SUPER'),
    check('codigo_barras', 'Tienes que enviar el codigo de barras del producto a eliminar').notEmpty(),
    validarCampos
], productsDelete)


module.exports = router; 