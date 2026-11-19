const Joi = require('joi');

const postSchema = Joi.object({
    userId: Joi.number().integer().positive().required(),
    descripcion: Joi.string().trim().min(3).max(500).required()
});

// al modificar solo se cambia la descripcion; userId se acepta pero no es obligatorio
const modificarPostSchema = Joi.object({
    userId: Joi.number().integer().positive(),
    descripcion: Joi.string().min(3).max(500).required()
});

module.exports = {
    postSchema,
    modificarPostSchema
};