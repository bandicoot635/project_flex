const { Router } = require('express');
const {  comprasPost} = require('../controllers/compras');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validate-JWT');
const { isAdminRol } = require('../middlewares/validate-roles');

const router = Router();


// router.get('/', comprasGet)

router.post('/', [
    validarJWT,
    isAdminRol
], comprasPost)


// router.delete('/', productsDelete)


module.exports = router; 