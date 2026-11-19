
const { User } = require('../models');

const buscarUsuarioPorId = async (req, res, next) => {
    try {
        const { id } = req.params;

        const usuario = await User.findByPk(id);

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

module.exports = buscarUsuarioPorId;

