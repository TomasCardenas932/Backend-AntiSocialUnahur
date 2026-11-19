const { postImages, Post } = require("../models")

const obtenerPostImages = async (req, res) => {
    try {
        const images = await postImages.findAll({
            attributes: ["id", "urlImage", "postId"]
        })
        res.status(200).json(images)
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error al obtener las imagenes"})
    }
}

const obtenerPostImgPorId= async (req, res) => {
    try {
        res.status(200).json(req.imagen)
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error al obtener la imagen"})
    }
}

const crearPostImage= async (req, res) => {
    try {
        const {postId} = req.body

        const post = await Post.findByPk(postId)
        if (!post) {
            return res.status(404).json({message: "Post no encontrado"})
        }

        // multer ya guardo el archivo en media
        const imagen = await postImages.create({ urlImage: `/media/${req.file.filename}`, postId: post.id})
        res.status(201).json({
            message: "Imagen creada con exito",
            imagen: { id: imagen.id, urlImage: imagen.urlImage, postId: imagen.postId }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error al crear la imagen"})   
    }
}

const borrarImagen = async (req, res) => {
    try {
        await req.imagen.destroy()
        res.status(200).json({message: "Imagen eliminada con exito"})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error al borrar la imagen"})
    }
}

module.exports = {
    obtenerPostImages,
    obtenerPostImgPorId,
    crearPostImage,
    borrarImagen,
}