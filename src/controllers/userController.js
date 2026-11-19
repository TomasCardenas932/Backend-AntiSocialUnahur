const { User } = require('../models');

// Obtener todos los usuarios
const obtenerUsers = async (req, res) => {
    try {
        const usuarios = await User.findAll();

        return res.status(200).json(usuarios);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener los usuarios'
        });
    }
};

// Obtener un usuario por ID
const obtenerUser = (req, res) => {
    return res.status(200).json(req.usuario);
};

// Crear un usuario
const crearUser = async (req, res) => {
    try {
        const usuario = await User.create(req.body);

        return res.status(201).json(usuario);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({
                message: 'El nickName o email ya está registrado'
            });
        }

        return res.status(500).json({
            message: 'Error al crear el usuario'
        });
    }
};

// Modificar un usuario
const modificarUser = async (req, res) => {
    try {
        await req.usuario.update(req.body);

        return res.status(200).json(req.usuario);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({
                message: 'El nickName o email ya está registrado'
            });
        }

        return res.status(500).json({
            message: 'Error al modificar el usuario'
        });
    }
};

// Eliminar un usuario
const borrarUser = async (req, res) => {
    try {
        await req.usuario.destroy();

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({
            message: 'Error al eliminar el usuario'
        });
    }
};

module.exports = {
    obtenerUsers,
    obtenerUser,
    crearUser,
    modificarUser,
    borrarUser
};
