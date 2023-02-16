const { response, request } = require('express')
const Provider = require('../models/proveedores')


const proveedoresGet = async (req = request, res = response) => {


    const { id_proveedor } = req.body

    try {

        if (id_proveedor) {

            const provedor = await Provider.findOne({ where: { id_proveedor } })

            //Validar que exista
            if (!provedor) {
                return res.status(404).json({
                    error: `El proveedor ${id_proveedor} no existe`,
                })
            }

            return res.status(200).json({
                msg: 'Consulta exitosa',
                provedor
            })

        }

        const proveedores = await Provider.findAll()

        res.status(200).json({
            msg: 'Consulta exitosa',
            proveedores
        })

    } catch (error) {

        console.log(error);
        res.status(500).json({
            error: error.message,
            msg: 'Error en el servidor'
        })

    }

}

const proveedoresPost = async (req = request, res = response) => {

    const {
        nombre,
        RFC,
        categoria
    } = req.body


    try {

        //Buscar el RFC proporcionado
        const validarRfc = await Provider.findOne({ where: { RFC } })

        //Validar que NO este registrado el RCF
        if (validarRfc) {
            return res.status(400).json({
                error: `El RFC ${RFC} ya esta registrado`,
            })
        }


        const proveedor = new Provider({
            nombre,
            RFC,
            categoria
        })


        //Guardando proveedor en BD
        await proveedor.save()


        res.status(200).json({
            msg: 'Proveedor generado correctamente',
            proveedor
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message,
            msg: 'Error en el servidor'
        })
    }

}

const proveedoresPut = async (req = request, res = response) => {

    const { id_proveedor, estado, ...resto } = req.body;

    try {

        //Validar si el id existe
        const provedor = await Provider.findOne({ where: { id_proveedor } })
        if (!provedor) {
            return res.status(404).json({
                error: `No existe un proveedor con el id ${id_proveedor}`
            })
        }

        if (estado) {
            return res.status(400).json('Aqui no se puede actulizar el estado')
        }


        if (Object.keys(resto).length === 0) {
            return res.status(400).json({
                error: `No se recibieron parametros para actulizar`
            })
        }

        //Actualizar usuario
        await Provider.update({
            ...resto  // los campos a actualizar que manden
        }, {
            where: { id_proveedor }, // el id a buscar
        })


        res.status(200).json({
            msg: `Campos actulizados`,
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

const proveedoresDelete = async (req = request, res = response) => {

    const { id_proveedor } = req.body;

    try {

        //Busca el usuario a elminar por id
        const provedor = await Provider.findOne({ where: { id_proveedor } })

        //Validar que exista el proveedor a eliminar
        if (!provedor) {
            return res.status(404).json({
                error: `No existe un proveedor con el id ${id_proveedor}`
            })
        }

        //Eliminacion logica del proveedor
        await Provider.update({ estado: false }, {
            where: { id_proveedor }
        });


        res.status(200).json({
            msg: `El proveedor ${provedor.nombre} ha sido elimnado`
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
    proveedoresGet,
    proveedoresPost,
    proveedoresPut,
    proveedoresDelete

}