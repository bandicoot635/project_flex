const { response, request } = require('express')
//Modelos
const Insumo = require('../models/insumos');
//Importaciones de terceros


const insumosGet = async (req = request, res = response) => {

    const { codigo_barras, id_proveedor } = req.query

    try {

        if (codigo_barras) {

            const insumo = await Insumo.findOne({ where: { codigo_barras } })

            if (!insumo) {
                return res.status(404).json({
                    error: `No existe insumo con codigo de barras ${codigo_barras}`,
                })
            }

            return res.status(200).json({
                msg: 'Consulta exitosa',
                insumo
            })
        }

        if (id_proveedor) {

            const insumos = await Insumo.findAll({ where: { id_proveedor } })

            if (!insumos) {
                return res.status(404).json({
                    error: `No existe insumo con el proveedor ${id_proveedor}`,
                })
            }

            return res.status(200).json({
                msg: 'Consulta exitosa',
                insumos
            })
        }

        const insumos = await Insumo.findAll({
            where: {
                estado: true
            }
        })

        res.status(200).json({
            msg: 'Consulta exitosa',
            insumos
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message,
            msg: 'Error en el servidor'
        })
    }
}


const insumosPost = async (req = request, res = response) => {

    const {
        nombre,
        codigo_barras,
        precio_compra,
        unidad_medida,
        id_proveedor,
        id_departamento,
    } = req.body

    try {

        const insumo = new Insumo({
            nombre,
            codigo_barras,
            precio_compra,
            unidad_medida,
            id_proveedor,
            id_departamento,
        })


        await insumo.save()

        res.status(200).json({
            msg: 'Insumo guardado correctamente',
            insumo
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message,
            msg: 'Error en el servidor'
        })
    }
}

const insumosPut = async (req = request, res = response) => {

    const { codigo_barras, estado, stock, ...resto } = req.body

    try {

        //Validar que el codigo de barras exista
        const insumo = await Insumo.findOne({ where: { codigo_barras } })

        if (!insumo) {
            return res.status(404).json({
                error: `No existe un insumo con el codigo de barras ${codigo_barras}`
            })
        }

        //Validar que no este eliminado
        if (!insumo.estatus) {
            return res.status(404).json({
                error: `No existe un insumo con el codigo de barras ${codigo_barras} (eliminado)`
            })
        }

        if (stock) {
            return res.status(400).json('Aqui no se puede actulizar el stock')
        }

        if (estado) {
            return res.status(400).json('Aqui no se puede actulizar el estado')
        }

        //Validar que no venga vacio
        if (Object.keys(resto).length === 0) {
            return res.status(400).json({
                error: `No se recibieron parametros para actulizar`
            })
        }

        //Actualizar insumo
        await Insumo.update({
            ...resto  //Campos a actualizar
        }, {
            where: {
                codigo_barras
            },
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

const insumosDelete = async (req = request, res = response) => {

    const { codigo_barras } = req.body;

    try {

        const insumo = await Insumo.findOne({ where: { codigo_barras } })

        //Validar que exista el insumo a eliminar
        if (!insumo) {
            return res.status(404).json({
                error: 'El insumo que desea eliminar no existe',
            })
        }

        //Validar que el insumo no este eliminado
        if (!insumo.estado) {
            return res.status(400).json({
                error: 'El insumo que desea eliminar ya habia sido eliminado',
            })
        }

        //Eliminacion logica del insumo
        await Insumo.update({ estado: false }, {
            where: { codigo_barras }
        });


        res.status(200).json(`El insumo ${insumo.nombre} ha sido elimnado`)

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message,
            msg: 'Error en el servidor'
        })
    }
}

module.exports = {
    insumosGet,
    insumosPost,
    insumosPut,
    insumosDelete
};