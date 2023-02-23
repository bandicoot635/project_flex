const { response, request } = require('express')
const Product = require('../models/products')
const Insumo = require('../models/insumos')
const Compra = require('../models/compras')
const Entrada = require('../models/entradas');
const { Sequelize } = require('sequelize');
const { validarExistenciaProductos, validarExistenciaInsumos } = require('../helpers/db-validate');

const comprasGet = async (req = request, res = response) => {

    try {

        const compras = await Compra.findAll()

        res.status(200).json({
            msg: 'Consulta exitosa',
            compras
        })

    } catch (error) {

        console.log(error);
        res.status(500).json({
            error: error.message,
            msg: 'Error en el servidor'
        })

    }
}

const comprasPost = async (req = request, res = response) => {

    // const productos = req.body.productos;
    const { CFDI, subtotal_compra, total_compra, productos } = req.body;

    console.log(typeof subtotal_compra);
    try {

        //Obtener el usuario
        const id_usuario = req.usuario.idusuario


        //Validar que sea adquisición de mercancías.
        if (CFDI === 'G01') {


            //Validar que los codigos de barras del array existan
            try {
                await validarExistenciaProductos(productos)
            } catch (error) {
                return res.status(400).json({
                    error: error.message
                });
            }


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
                        `No se pudo actualizar el stock del producto con el codigo de barras ${codigo_barras}`
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
        }

        //Validar que san gastos.
        if (CFDI === 'G03') {

            try {
                await validarExistenciaInsumos(productos)
            } catch (error) {
                return res.status(400).json({
                    error: error.message
                });
            }

            //Aumentar el stock en la tabla correspondiente
            for (const insumo of productos) {
                const { codigo_barras, cantidad_ingresada } = insumo;

                const [updated] = await Insumo.update({
                    stock: Sequelize.literal(`stock + ${cantidad_ingresada}`)
                }, {
                    where: {
                        codigo_barras
                    }
                });

                if (!updated) {
                    throw new Error(
                        `No se pudo actualizar el stock del producto con el codigo de barras ${codigo_barras}`
                    );
                }
            }

            //Se inserta a la tabla entradas
            for (const insumo of productos) {
                const { codigo_barras, cantidad_ingresada, fecha_caducidad } = insumo;

                await Entrada.create({
                    id_usuario,
                    codigo_barras,
                    cantidad_ingresada,
                    fecha_caducidad
                });
            }
        }

        //Obtener el total de productos
        const total_productos = productos.reduce((acumulador, insumo) => {
            return acumulador + insumo.cantidad_ingresada;
        }, 0);

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
    comprasGet,
    comprasPost
};