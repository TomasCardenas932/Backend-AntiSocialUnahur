const Joi = require('joi');

const mensajeContenido = 'El contenido del comentario debe tener entre 1 y 500 caracteres';
const mensajeUserId = 'El ID del usuario es requerido y debe ser un número positivo';
const contenido = Joi.string().trim().min(1).max(500).required().messages({
    'string.base': mensajeContenido,
    'string.empty': mensajeContenido,
    'string.min': mensajeContenido,
    'string.max': mensajeContenido,
    'any.required': mensajeContenido
});

const crearComentarioSchema = Joi.object({
    contenido,
    userId: Joi.number().integer().positive().required().messages({
        'number.base': mensajeUserId,
        'number.integer': mensajeUserId,
        'number.positive': mensajeUserId,
        'any.required': mensajeUserId
    })
});

const actualizarComentarioSchema = Joi.object({
    contenido
});

module.exports = {
    crearComentarioSchema,
    actualizarComentarioSchema
};