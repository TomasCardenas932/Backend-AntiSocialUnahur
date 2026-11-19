const { Follow } = require('../models');

const buscarSeguimiento = async (req, res, next) => {
    try {
        const seguimiento = await Follow.findOne({
            where: {
                followerId: req.usuario.id,
                followingId: req.usuarioSeguido.id
            }
        });

        req.seguimiento = seguimiento;
        next();

    } catch (error) {
        return res.status(500).json({
            message: 'Error al buscar el seguimiento'
        });
    }
};

module.exports = buscarSeguimiento;
