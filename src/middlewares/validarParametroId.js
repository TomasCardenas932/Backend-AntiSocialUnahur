const Joi = require("joi");

const idSchema = Joi.number().integer().positive().required().messages({
  "number.base": "{#label} debe ser un número",
  "number.integer": "{#label} debe ser un entero",
  "number.positive": "{#label} debe ser positivo",
  "any.required": "{#label} es obligatorio",
});

const validarParametroId =
  (...nombres) =>
  (req, res, next) => {
    for (const nombre of nombres) {
      const { error } = idSchema.label(nombre).validate(req.params[nombre]);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
    }
    next();
  };

module.exports = validarParametroId;