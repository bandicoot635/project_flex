const { response, request } = require('express')
const Product = require('../models/products')
const Merma = require('../models/mermas')

const mermasGet = async (req = request, res = response) => {
    
    try {

        const mermas = await Merma.findAll()

        res.status(200).json({
            msg: 'Consulta exitosa',
            mermas
        })

    } catch (error) {

        console.log(error);
        res.status(500).json({
            error: error.message,
            msg: 'Error en el servidor'
        })
    }
}

const mermasPost = async (req = request, res = response) => {

    const { codigo_barras, cantidad, motivo, } = req.body

    try {

        //Validar si el producto existe
        const producto = await Product.findOne({ where: { codigo_barras } })

        if (!producto) {
            return res.status(404).json({
                error: `No existe un producto con el codigo de barras ${codigo_barras}`
            })
        }

        //Validar que no este eliminado
        if (!producto.estado) {
            return res.status(404).json({
                error: `No existe un producto con el codigo de barras ${codigo_barras} (eliminado)`
            })
        }

        //Validar que el producto tenga stock
        if (!producto.stock) {
            return res.status(400).json({
                error: `El ${producto.nombre} no tiene stock `
            })
        }

        //Calcular la cantidad a descontar
        const nuevoStock = producto.stock - cantidad

        //Obtener el id del producto
        const id_producto = producto.idproducto

        //Obtener el usuario
        const id_usuario = req.usuario.idusuario

        //Se actualiza el stock del producto
        await Product.update({
            stock: nuevoStock  //Campos a actualizar
        }, {
            where: {
                codigo_barras  //Parametro
            },
        })

        const merma = new Merma({
            id_usuario,
            id_producto,
            cantidad,
            motivo
        })

        await merma.save()


        res.status(200).json({
            msg: 'Merma registrada',

        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message,
            msg: 'Error en el servidor'
        })
    }
}

module.exports = {
    mermasGet,
    mermasPost
};