const { postImages } = require("../models")
const buscarImagenPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const imagen = await postImages.findByPk(id, {
      attributes: ["id", "urlImage", "postId"]
    });
    if (!imagen) {
      return res.status(404).json({ message: "Imagen no encontrada" });
    }
    req.imagen = imagen;
    next();
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error al obtener la imagen" });
  }
};

module.exports = buscarImagenPorId;