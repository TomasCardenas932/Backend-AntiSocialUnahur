const { userSchema } = require('../schemas/userSchema');

const validarUser = (req, res, next) => {
  const { error, value } = userSchema.validate(req.body, {
    abortEarly: false
  });

  if (error) {
    return res.status(400).json({
      mensaje: 'Datos de usuario inválidos',
      errores: error.details.map(detalle => detalle.message)
    });
  }

  req.body = value;
  next();
};

module.exports = validarUser;
