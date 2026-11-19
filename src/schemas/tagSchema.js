const Joi = require('joi');

const mensajeNombre = 'El nombre del tag debe tener entre 2 y 30 caracteres';

const tagSchema = Joi.object({
    nombre: Joi.string().trim().min(2).max(30).required().messages({
        'string.base': mensajeNombre,
        'string.empty': mensajeNombre,
        'string.min': mensajeNombre,
        'string.max': mensajeNombre,
        'any.required': mensajeNombre
    })
});

module.exports = { tagSchema };
