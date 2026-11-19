const rutaNoEncontrada = (req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
};

const manejarErrores = (err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ message: "El cuerpo de la peticion no es un JSON valido" });
  }
  console.error(err);
  res.status(500).json({ message: "Error interno del servidor" });
};

module.exports = {
  rutaNoEncontrada,
  manejarErrores,
};
