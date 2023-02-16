const { response, request } = require('express')
const Product = require('../models/products')
const Compra = require('../models/compras')
const Entrada = require('../models/entradas');
const { Sequelize } = require('sequelize');


const comprasPost = async (req = request, res = response) => {


    // const productos = req.body.productos;
    const { CFDI, productos } = req.body;

    try {

        //Sacar el idsusuario
        const id_usuario = req.usuario.idusuario

        //Validar que no este vacio y que sea un array
        if (!Array.isArray(productos) && productos.length === 0) {
            return res.status(400).json({
                error: 'El parámetro productos debe ser un arreglo y no estar vacio'
            });
        }

        //Validar que los codigos de barra del array existan
        for (const producto of productos) {

            const count = await Product.count({
                where: { codigo_barras: producto.codigo_barras },
            });

            if (count === 0) {
                return res.status(400).json({
                    error: `El producto con codigo de barras ${producto.codigo_barras} no existe en la base de datos`
                });
            }
        }

        //Obtener el total de productos
        const total_productos = productos.reduce((acumulador, producto) => {
            return acumulador + producto.cantidad_ingresada;
        }, 0);


        //Se obtienen los precios de compra de la bd
        const precios = await Product.findAll({
            where: {
                codigo_barras: {
                    [Sequelize.Op.in]: productos.map(p => p.codigo_barras)
                }
            },
            attributes: ['codigo_barras', 'precioCompra']
        });

        // console.log(precios);


        //Calcular total de la compra (piezas totales * precio de compra)
        const subtotal_compra = productos.reduce((acumulador, producto) => {
            const precio_producto = precios.find(p => p.codigo_barras === producto.codigo_barras).precioCompra;
            return acumulador + (precio_producto * producto.cantidad_ingresada);
        }, 0);

        // console.log(total_productos, total_compra);

        //Aumentar el stock en la tabla correspondiente
        for (const producto of productos) {
            const { codigo_barras, cantidad_ingresada } = producto;

            const [updated] = await Product.update({
                stock: Sequelize.literal(`stock + ${cantidad_ingresada}`)
            }, {
                where: {
                    codigo_barras
                }
            });

            if (!updated) {
                throw new Error(
                    `No se pudo actualizar el stock del producto con id ${codigo_barras}`
                );
            }
        }

        //Se inserta a la tabla entradas
        for (const producto of productos) {
            const { codigo_barras, cantidad_ingresada, fecha_caducidad } = producto;

            await Entrada.create({
                id_usuario,
                codigo_barras,
                cantidad_ingresada,
                fecha_caducidad
            });
        }

        const total_compra = subtotal_compra * (1 +  0.16)

        const compra = new Compra({
            id_usuario,
            CFDI,
            subtotal_compra,
            total_compra,
            total_productos,
        })

        await compra.save()




        res.status(200).json({
            msg: 'Productos recibidos correctamente',
            compra
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
    comprasPost
};