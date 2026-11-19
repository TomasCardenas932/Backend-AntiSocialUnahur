require("dotenv").config();
const express = require("express")
const cors = require("cors")
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./docs/swagger")
const { CARPETA_MEDIA } = require("./config/media")
const app = express()

const userRoutes = require('./routes/userRoutes');
const postImagesRouter = require("./routes/postImagesRouter")
const postRoutes = require("./routes/postRoutes")
const routerComentarios = require("./routes/comentariosRoutes");
const routerTags = require("./routes/tagsRoutes");
const { rutaNoEncontrada, manejarErrores } = require("./middlewares/manejoErrores")

const db = require("./models")

const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:5173" }))
app.use(express.json())
// las imagenes subidas a los posts se sirven tal cual desde /media (la url queda guardada en postImages.urlImage)
app.use("/media", express.static(CARPETA_MEDIA))
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/users', userRoutes);
app.use("/postImages", postImagesRouter)
app.use('/post', postRoutes)
app.use("/comments", routerComentarios);
app.use("/tags", routerTags);

app.use(rutaNoEncontrada)
app.use(manejarErrores)

// primero se sincroniza la base y despues se empieza a escuchar,
// asi ninguna peticion llega antes de que existan las tablas
const iniciar = async () => {
  try {
    await db.sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
      console.log(`Documentacion en http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error("No se pudo conectar con la base de datos:", error);
    process.exit(1);
  }
};

iniciar();
