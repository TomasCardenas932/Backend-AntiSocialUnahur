const { User } = require('../models');

const buscarUsuarioPorBody = async (req, res, next) => {
    try {
        const { userId } = req.body;

        const usuario = await User.findByPk(userId);

        if (!usuario) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }

        req.usuario = usuario;
        next();

    } catch (error) {
        return res.status(500).json({
            message: 'Error al buscar el usuario'
        });
    }
};

module.exports = buscarUsuarioPorBody;
