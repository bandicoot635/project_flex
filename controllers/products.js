const { response, request } = require('express')
const Product = require('../models/products')


const productsGet = async (req = request, res = response) => {

    const { codigo_barras } = req.body

    try {

        if (codigo_barras) {

            const product = await Product.findOne({ where: { codigo_barras } })

            return res.status(200).json({
                msg: 'Consulta exitosa',
                product
            })
        }

        const products = await Product.findAll()

        res.status(200).json({
            msg: 'Consulta exitosa',
            products
        })

    } catch (error) {

        console.log(error);
        res.status(500).json({
            error: error.message,
            msg: 'Error en el servidor'
        })

    }

}

const productsPost = async (req = request, res = response) => {


    const {
        nombre,
        precioVenta,
        precioCompra,
        tamanio,
        codigo_barras,
        fk_proveedor,
        fk_departamento,
    } = req.body

    try {

        const product = new Product({
            nombre,
            precioVenta,
            precioCompra,
            codigo_barras,
            tamanio,
            fk_proveedor,
            fk_departamento,
        })


        await product.save()

        res.status(200).json({
            msg: 'Producto guardado correctamente',
            product
        })



    } catch (error) {

        console.log(error);
        res.status(500).json({
            error: error.message,
            msg: 'Error en el servidor'
        })

    }
}


const productsPut = async (req = request, res = response) => {

    const { codigo_barras, estado, ...resto } = req.body

    try {

        //Validar si el id existe
        const producto = await Product.findOne({ where: { codigo_barras } })

        if (!producto) {
            return res.status(404).json({
                error: `No existe un producto con el id ${codigo_barras}`
            })
        }

        if (estado) {
            return res.status(400).json('Aqui no se puede actulizar el estado')
        }

        if(Object.keys(resto).length === 0){
            return res.status(400).json({
                error: `No se recibieron parametros para actulizar`
            })
        }
    
        //Actualizar prodcucto
        await Product.update({
            ...resto  // los campos a actualizar que manden
        }, {
            where: { codigo_barras }, // el id a buscar
        })


        res.status(200).json({
            msg: `Campos actulizados correctamente`,
            //Que devuleva los campos actulizados
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message,
            msg: 'Error en el servidor'
        })
    }

}

const productsDelete = async (req = request, res = response) => {

    const { codigo_barras } = req.body;

    try {

        const product = await Product.findOne({ where: { codigo_barras } })


        //Validar que exista el producto a eliminar
        if (!product) {
            return res.status(400).json({
                error: 'El producto que desea eliminar no existe',
            })
        }

        //Validar que el producto no este eliminado
        if (!product.estado) {
            return res.status(400).json({
                error: 'El producto que desea eliminar no existe (eliminado)',
            })
        }


        //Eliminacion logica del producto
        await Product.update({ estado: false }, {
            where: { codigo_barras }
        });


        res.status(200).json(`El usuario ${product.nombre} ha sido elimnado`)

    } catch (error) {

        console.log(error);
        res.status(500).json({
            error: error.message,
            msg: 'Error en el servidor'
        })

    }


}

module.exports = {
    productsGet,
    productsPost,
    productsPut,
    productsDelete
};