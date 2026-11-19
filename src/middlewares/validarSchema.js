const validarSchema = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body ?? {}, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: "Datos invalidos",
      errores: error.details[0].message,
    });
  }
  next();
};

module.exports = validarSchema;
