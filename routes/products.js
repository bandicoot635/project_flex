const { Router } = require('express');
const { productsGet, productsPost, productsPut, productsDelete } = require('../controllers/products');

const router = Router();


router.get('/', productsGet)

router.post('/', productsPost)

router.put('/', productsPut)

router.delete('/', productsDelete)


module.exports = router; 