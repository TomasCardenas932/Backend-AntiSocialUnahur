const {Post,User,Comment,Tag} =require('../models')

const incluirImagenesYTags = [
    { association: "imagenes", attributes: ["id", "urlImage"] },
    { model: Tag, as: "tags", attributes: ["id", "nombre"], through: { attributes: [] } }
]

const obtenerPosts =async (req,res)=>{
    try {
            const posts = await Post.findAll({
                attributes: ["id","userId","descripcion","createdAt"],
                include:[{
                    model : User ,
                    as: "usuario",
                    attributes:["nickName"]
                }, ...incluirImagenesYTags], // es como hacer un Join
                order: [["createdAt", "DESC"]]
            }) //metodo del  squilize
    res.json(posts)
    } catch (error) {
        res.status(500).json({message: "Error al obtener los post", error:error.message})
    }
}
const obtenerPost = async (req, res) => {
    try {
        const comentarios = await Comment.findAll({
            where: { postId: req.post.id },
            order: [["fecha", "DESC"]],
        });
        // cambio de obtenerPost para que obtenga solo los comentarios visibles con el filter(virtual)
        const imagenes = await req.post.getImagenes({ attributes: ["id", "urlImage"] });
        const tags = await req.post.getTags({ attributes: ["id", "nombre"], joinTableAttributes: [] });
        const usuario = await req.post.getUsuario({
            attributes: ["id", "nickName"]
        });

        res.json({
            ...req.post.toJSON(),
            usuario,
            imagenes,
            tags,
            comentarios: comentarios.filter((c) => c.visible),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los comentarios del post" });
    }
};
const crearPost = async (req, res) => {
    try {
        const { descripcion } = req.body; //obtiene del cuerpo

        const post = await Post.create({
            descripcion,
            userId: req.usuario.id
        });

        res.status(201).json({
            message: "Post creado con éxito",
            post
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el post",
            error: error.message
        });
    }
};

const modificarPost = async (req, res) => {
    try {
        const { descripcion } = req.body;

        req.post.descripcion = descripcion;
        await req.post.save();

        res.json({ message: "Post modificado con éxito" });
    } catch (error) {
        res.status(500).json({
            message: "Error al modificar el post",
            error: error.message
        });
    }
};
const borrarPost = async (req, res) => {
    try {
        await req.post.destroy();

        res.json({ message: "Post eliminado con éxito" });
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el post"
        });
    }
};
module.exports={
    obtenerPosts,
    obtenerPost,
    modificarPost,
    crearPost,
    borrarPost
} ;
