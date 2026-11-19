const Joi = require('joi');

const userSchema = Joi.object({
  nickName: Joi.string()
    .trim()
    .min(3)
    .max(50)
    .required(),

  email: Joi.string()
    .trim()
    .email()
    .required()
});

module.exports = { userSchema };
