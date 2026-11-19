const nickNameSchema = require('../schemas/nickNameSchema');

const validarNickName = (req, res, next) => {
    const { error } = nickNameSchema.validate(req.params);

    if (error) {
        return res.status(400).json({
            message: 'El nickName ingresado no es válido'
        });
    }

    next();
};

module.exports = validarNickName;
