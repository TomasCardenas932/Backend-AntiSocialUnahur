const { User } = require('../models');

const buscarUsuarioSeguido = async (req, res, next) => {
    try {
        const { seguido } = req.params;

        const usuarioSeguido = await User.findOne({
            where: { nickName: seguido }
        });

        if (!usuarioSeguido) {
            return res.status(404).json({
                message: 'El usuario que querés seguir no existe'
            });
        }

        req.usuarioSeguido = usuarioSeguido;

        next();

    } catch (error) {
        return res.status(500).json({
            message: 'Error al buscar el usuario seguido'
        });
    }
};

module.exports = buscarUsuarioSeguido;
