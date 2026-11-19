const fs = require("fs");
const path = require("path");
const YAML = require("yaml");

const documento = {
  openapi: "3.0.3",
  info: {
    title: "UnaHur Anti-Social Net",
    version: "1.0.0",
    description:
      "API de la red social UnaHur Anti-Social Net. Todas las peticiones y respuestas usan JSON, " +
      "salvo la subida de imagenes (multipart/form-data). " +
      "Si se borra un usuario se borran en cascada sus posts y comentarios; " +
      "si se borra un post se borran sus imagenes, comentarios y asignaciones de tags.",
  },
  servers: [{ url: `http://localhost:${process.env.PORT || 3000}` }],
  tags: [],
  paths: {},
  components: {},
};


fs.readdirSync(__dirname)
  .filter((archivo) => archivo.endsWith(".yaml"))
  .forEach((archivo) => {
    const parcial = YAML.parse(fs.readFileSync(path.join(__dirname, archivo), "utf8"));

    Object.assign(documento.paths, parcial.paths);

   
    Object.entries(parcial.components || {}).forEach(([seccion, definiciones]) => {
      documento.components[seccion] = {
        ...documento.components[seccion],
        ...definiciones,
      };
    });

    (parcial.tags || []).forEach((tag) => {
      if (!documento.tags.some((t) => t.name === tag.name)) {
        documento.tags.push(tag);
      }
    });
  });

module.exports = documento;