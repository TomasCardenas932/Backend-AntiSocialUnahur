const path = require("path");

// Carpeta donde multer guarda las imagenes de los posts.
// index.js la sirve como estatico en /media, y el modelo postImages borra de aca el archivo al eliminar una imagen.
const CARPETA_MEDIA = path.join(__dirname, "../../media");

module.exports = {
    CARPETA_MEDIA,
};
