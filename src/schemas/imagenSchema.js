const Joi = require("joi")

// el archivo llega aparte en req.file
const imagenSchema = Joi.object({
    postId: Joi.number().integer().positive().required().messages({
        "number.base": "El postId debe ser un numero",
        "number.integer": "El postId debe ser entero",
        "number.positive": "El postId debe ser positivo",
        "any.required": "El postId es obligatorio"
    })
})

module.exports = {
    imagenSchema,
}
