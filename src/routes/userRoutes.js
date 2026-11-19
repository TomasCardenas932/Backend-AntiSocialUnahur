const { Router } = require('express');
const router = Router();

const {
    obtenerUsers,
    obtenerUser,
    crearUser,
    modificarUser,
    borrarUser
} = require('../controllers/userController');

const {
    seguirUsuario,
    dejarDeSeguir,
    obtenerSeguidores,
    obtenerSeguidos
} = require('../controllers/followController');

const validarUser = require('../middlewares/validarUser');
const validarNickName = require('../middlewares/validarNickName');
const buscarUsuarioPorNickName = require('../middlewares/buscarUsuarioPorNickName');

const buscarUsuarioSeguido = require('../middlewares/buscarUsuarioSeguido');
const validarSeguimiento = require('../middlewares/validarSeguimiento');
const buscarSeguimiento = require('../middlewares/buscarSeguimiento');

router.get('/', obtenerUsers);

router.get(
    '/:nickName',
    validarNickName,
    buscarUsuarioPorNickName,
    obtenerUser
);

router.post('/', validarUser, crearUser);

router.put(
    '/:nickName',
    validarNickName,
    buscarUsuarioPorNickName,
    validarUser,
    modificarUser
);

router.delete(
    '/:nickName',
    validarNickName,
    buscarUsuarioPorNickName,
    borrarUser
);


router.post(
    '/:nickName/follow/:seguido',
    buscarUsuarioPorNickName,
    buscarUsuarioSeguido,
    validarSeguimiento,
    buscarSeguimiento,
    seguirUsuario
);

router.delete(
    '/:nickName/follow/:seguido',
    buscarUsuarioPorNickName,
    buscarUsuarioSeguido,
    validarSeguimiento,
    buscarSeguimiento,
    dejarDeSeguir
);

router.get(
    '/:nickName/followers',
    buscarUsuarioPorNickName,
    obtenerSeguidores
);

router.get(
    '/:nickName/following',
    buscarUsuarioPorNickName,
    obtenerSeguidos
);

module.exports = router;