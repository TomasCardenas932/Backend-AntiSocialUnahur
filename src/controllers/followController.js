const { Follow } = require('../models');

// Seguir a un usuario
const seguirUsuario = async (req, res) => {
    if (req.seguimiento) {
        return res.status(409).json({
            message: 'Ya seguís a este usuario'
        });
    }

    try {
        const seguimiento = await Follow.create({
            followerId: req.usuario.id,
            followingId: req.usuarioSeguido.id
        });

        return res.status(201).json({
            message: 'Usuario seguido correctamente',
            seguimiento
        });

    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({
                message: 'Ya seguís a este usuario'
            });
        }

        return res.status(500).json({
            message: 'Error al seguir al usuario'
        });
    }
};

// Dejar de seguir a un usuario
const dejarDeSeguir = async (req, res) => {
    if (!req.seguimiento) {
        return res.status(404).json({
            message: 'No seguís a este usuario'
        });
    }

    try {
        await req.seguimiento.destroy();

        return res.status(204).send();

    } catch (error) {
        return res.status(500).json({
            message: 'Error al dejar de seguir al usuario'
        });
    }
};

// Consultar seguidores
const obtenerSeguidores = async (req, res) => {
    try {
        const seguidores = await req.usuario.getSeguidores({
            attributes: ['id', 'nickName', 'email'],
            joinTableAttributes: []
        });

        return res.status(200).json(seguidores);

    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener los seguidores'
        });
    }
};

// Consultar seguidos
const obtenerSeguidos = async (req, res) => {
    try {
        const seguidos = await req.usuario.getSeguidos({
            attributes: ['id', 'nickName', 'email'],
            joinTableAttributes: []
        });

        return res.status(200).json(seguidos);

    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener los usuarios seguidos'
        });
    }
};

module.exports = {
    seguirUsuario,
    dejarDeSeguir,
    obtenerSeguidores,
    obtenerSeguidos
};
