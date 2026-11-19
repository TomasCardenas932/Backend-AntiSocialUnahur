const Joi = require('joi');

const nickNameSchema = Joi.object({
    nickName: Joi.string()
        .trim()
        .min(3)
        .max(50)
        .required()
});

module.exports = nickNameSchema;
