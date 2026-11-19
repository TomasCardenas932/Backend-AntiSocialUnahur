const { User } = require('../models');

const buscarUsuarioPorNickName = async (req, res, next) => {
    try {
        const { nickName } = req.params;

        const usuario = await User.findOne({
            where: { nickName }
        });

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

module.exports = buscarUsuarioPorNickName;
