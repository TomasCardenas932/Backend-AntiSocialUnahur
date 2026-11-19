const{Router}=require("express");
const router = Router();
const controller = require('../controllers/comentariosControllers');
const validarParametroId = require('../middlewares/validarParametroId');
const buscarComentarioPorId = require('../middlewares/buscarComentarioPorId');
const buscarPostPorId = require("../middlewares/buscadorDePostPorId");

const buscarUsuarioPorBody = require("../middlewares/buscarUsuarioPorBody");
const{
    validarActualizarComentario,
    validarCrearComentario
}=require('../middlewares/validarComentario');

router.get('/',controller.obtenerComentarios);
router.get('/post/:id',validarParametroId('id'),buscarPostPorId,controller.obtenerComentariosDePost);
router.get('/:id',validarParametroId('id'),buscarComentarioPorId,controller.obtenerComentario);
router.post('/post/:id',validarParametroId('id'),validarCrearComentario,buscarPostPorId,buscarUsuarioPorBody,controller.crearComentario);
router.put(
    '/:id',
    validarParametroId('id'),
    buscarComentarioPorId,
    validarActualizarComentario,
    controller.actualizarComentario,   
);
router.delete('/:id', validarParametroId('id'), buscarComentarioPorId, controller.eliminarComentario);

module.exports = router;