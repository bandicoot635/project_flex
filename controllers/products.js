const { response, request } = require('express')
const { Product } = require('../models/products')


const productsGet = async (req = request, res = response) => {

    const { idproducto } = req.body

    if (idproducto) {

        const product = await Product.findOne({ where: { idproducto } })
        return res.status(200).json({
            msg: 'Consulta exitosa',
            product
        })
    }

    const products  = await Product.findAll()

    res.status(200).json({
        msg: 'Consulta exitosa',
        products
    })
}

const productsPost = async (req = request, res = response) => {


    const {
        nombre,
       precioVenta,
       precioCompra,
       
    } = req.body
    

    res.status(200).json({
        msg: 'Consulta exitosa'    
    })
}

const productsPut = async (req = request, res = response) => {

    // const usuarios = await Usuario.findAll()

    res.status(200).json({
        msg: 'Consulta exitosa',
        // usuarios
    })
}

const productsDelete = async (req = request, res = response) => {

    // const usuarios = await Usuario.findAll()

    res.status(200).json({
        msg: 'Consulta exitosa',
        // usuarios
    })
}

module.exports = {
    productsGet,
    productsPost,
    productsPut,
    productsDelete
};