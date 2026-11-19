const {Router} = require('express');
const router = Router();
const controller = require("../controllers/tagControllers");
const validarParametroId = require('../middlewares/validarParametroId');
const buscarTagPorId = require('../middlewares/buscarTagPorId');
const buscarPostPorId = require("../middlewares/buscadorDePostPorId");
const validarTag = require('../middlewares/validarTag');

router.get('/',controller.obtenerTags);
router.get('/:id',validarParametroId('id'),buscarTagPorId,controller.obtenerTag);
router.post('/',validarTag,controller.crearTag);
router.put('/:id',validarParametroId('id'),buscarTagPorId,validarTag,controller.actualizarTag);
router.delete('/:id',validarParametroId('id'), buscarTagPorId , controller.eliminarTag);

router.post("/:tagId/posts/:id", validarParametroId("tagId", "id"), buscarTagPorId,buscarPostPorId, controller.agregarTagAPost);
router.delete("/:tagId/posts/:id", validarParametroId("tagId", "id"), buscarTagPorId, buscarPostPorId,controller.quitarTagDePost);

module.exports=router;