const { Router } = require("express")
const router = Router()
const validarId = require("../middlewares/validarId.js")
const buscarImagenPorId = require("../middlewares/buscarImagenPorId.js")
const validarSchema = require("../middlewares/validarSchema.js")
const subirImagen = require("../middlewares/subirImagen.js")
const { imagenSchema } = require("../schemas/imagenSchema.js")
const {
    obtenerPostImages,
    obtenerPostImgPorId,
    crearPostImage,
    borrarImagen
}= require("../controllers/postImagesController.js")

router.get("/", obtenerPostImages)
router.get("/:id", validarId, buscarImagenPorId,obtenerPostImgPorId)
router.post("/", subirImagen, validarSchema(imagenSchema), crearPostImage)
router.delete("/:id", validarId, buscarImagenPorId, borrarImagen)

module.exports = router