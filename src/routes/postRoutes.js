const {Router} =require('express')
const router = Router()
const {obtenerPost,obtenerPosts, crearPost,borrarPost,modificarPost} =require('../controllers/postController')
const buscarPostPorId= require("../middlewares/buscadorDePostPorId")
const validarPost= require("../middlewares/validarPost")
const validarModificarPost= require("../middlewares/validarModificarPost")
const validarId= require("../middlewares/validarId")
const buscarUsuarioPorBody= require("../middlewares/buscarUsuarioPorBody")



router.get('/', obtenerPosts)
router.get('/:id',validarId, buscarPostPorId,obtenerPost)
router.post('/', validarPost,buscarUsuarioPorBody,crearPost) // buscarUsuarioPorBody carga req.usuario a partir del userId del body
router.delete('/:id', validarId,buscarPostPorId, borrarPost);
router.put('/:id',validarId,buscarPostPorId, validarModificarPost, modificarPost);
module.exports = router;