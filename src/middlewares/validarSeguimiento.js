const validarSeguimiento = (req, res, next) => {
    const usuario = req.usuario;
    const usuarioSeguido = req.usuarioSeguido;

    if (usuario.id === usuarioSeguido.id) {
        return res.status(400).json({
            message: 'Un usuario no puede seguirse a sí mismo'
        });
    }

    next();
};

module.exports = validarSeguimiento;
