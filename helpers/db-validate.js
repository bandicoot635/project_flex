const Rol = require('../models/roles');
const Usuario = require('../models/usuarios');
const Product = require('../models/products');
const Insumo = require('../models/insumos');

//Valida el idrol exista 
const isRolValido = async (idrol = '') => {

    const existeRol = await Rol.findOne({ where: { idrol } })

    if (!existeRol) {

        throw new Error(`El id ${idrol} no es valido`)
    }
}

//Validamos que no se repita el email
const isEmailValido = async (email = '') => {

    const existeEmail = await Usuario.findOne({ where: { email } })

    if (existeEmail) {
        throw new Error(`El correo ${email} ya esta registrado`)
    }
}

//Validamos que no se repita el numero de celular
const isCelularValido = async (celular = '') => {

    const existeCelular = await Usuario.findOne({ where: { celular } })

    if (existeCelular) {
        throw new Error(`El celular ${celular} ya esta registrado`)
    }
}

//Validamos que no se repita el username
const isUsernameValido = async (username = '') => {
    
    const usuario = await Usuario.findOne({ where: { username } })

    if (usuario) {
        throw new Error(
            `El Username ${username} ya esta registrado`
        )
    }
}

const validarExistenciaProductos = async (productos = []) => {

    //Validar que los codigos de barras del array existan
    for (const producto of productos) {

        const count = await Product.count({
            where: { codigo_barras: producto.codigo_barras },
        });

        if (count === 0) {
            throw new Error(
                `El producto con codigo de barras ${producto.codigo_barras} no existe en la base de datos`
            );
        }
    }
}

const validarExistenciaInsumos = async (productos = []) => {

    //Validar que los codigos de barras del array existan
    for (const insumo of productos) {

        const count = await Insumo.count({
            where: { codigo_barras: insumo.codigo_barras },
        });

        if (count === 0) {
            throw new Error(
                `El insumo con codigo de barras ${insumo.codigo_barras} no existe en la base de datos`
            );
        }
    }
}

module.exports = {
    isRolValido,
    isEmailValido,
    isCelularValido,
    isUsernameValido,
    validarExistenciaProductos,
    validarExistenciaInsumos
}
