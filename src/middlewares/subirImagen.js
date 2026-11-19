const multer = require("multer");
const fs = require("fs");
const { CARPETA_MEDIA } = require("../config/media");

const FORMATOS_PERMITIDOS = ["image/jpeg", "image/png", "image/webp"];
const TAMANIO_MAXIMO_MB = 5;

// reemplaza espacios y caracteres raros del nombre original para que la url quede limpia
const sanitizar = (nombre) => nombre.replace(/[^a-zA-Z0-9.-]/g, "_");

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, CARPETA_MEDIA),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${sanitizar(file.originalname)}`)
  }),
  fileFilter: (req, file, cb) => {
    const valido = FORMATOS_PERMITIDOS.includes(file.mimetype);
    req.formatoInvalido = !valido;
    cb(null, valido);
  },
  limits: { fileSize: TAMANIO_MAXIMO_MB * 1024 * 1024 }
}).single("imagen");

const datosInvalidos = (res, mensaje) => res.status(400).json({ message: "Datos invalidos", errores: mensaje });

// Recibe el archivo del campo "imagen" (multipart/form-data) y lo deja en req.file.
// Tambien arma req.body con el resto de los campos del formulario (postId).
const subirImagen = (req, res, next) => {
  upload(req, res, (error) => {
    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_FILE_SIZE") {
        return datosInvalidos(res, `La imagen no puede superar los ${TAMANIO_MAXIMO_MB} MB`);
      }
      if (error.code === "LIMIT_UNEXPECTED_FILE") {
        return datosInvalidos(res, "La imagen debe enviarse en el campo 'imagen'");
      }
      return datosInvalidos(res, "Error al subir la imagen");
    }
    if (error) {
      return next(error);
    }
    if (req.formatoInvalido) {
      return datosInvalidos(res, "La imagen debe ser jpg, png o webp");
    }
    if (!req.file) {
      return datosInvalidos(res, "La imagen es obligatoria");
    }

    // multer guarda el archivo antes de que se valide el resto del pedido;
    // si la respuesta termina en error (postId invalido, post inexistente...) se borra para no dejar archivos huerfanos
    res.on("finish", () => {
      if (res.statusCode >= 400) {
        fs.unlink(req.file.path, () => {});
      }
    });
    next();
  });
};

module.exports = subirImagen;
