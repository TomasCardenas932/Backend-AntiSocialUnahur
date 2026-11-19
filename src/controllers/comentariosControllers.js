const {Comment} = require('../models');

const obtenerComentarios = async(req,res)=>{
    try{
        const where = {};
        if(req.query.postId) where.postId = req.query.postId;
        const comentarios = await Comment.findAll({where});
        res.status(200).json(comentarios)
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Error al obtener los comentarios"})
    }
};

const obtenerComentariosDePost = async(req,res)=>{
    try{
        const comentarios = await Comment.findAll({
            where:{postId: req.post.id },
            order:[["fecha","DESC"]],
        });
        res.status(200).json(comentarios.filter((c)=>c.visible));
    }   catch(error){
        console.error(error);
        res.status(500).json({message:"Error al obtener el post"});
    }
};

const obtenerComentario = async (req, res) => {
  res.status(200).json(req.comentario);
};

const crearComentario = async(req,res)=>{
    try{
        const comentario = await Comment.create({
            contenido: req.body.contenido,
            postId: req.post.id,
            userId: req.usuario.id
        });
        res.status(201).json({message:"Comentario creado con exito!",comentario});
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Error al crear el comentario"});
    }
};


const actualizarComentario=async(req,res)=>{
    try{
        await req.comentario.update({contenido:req.body.contenido});
        res.status(200).json({message:"Comentario actualizado con exito",
            comentario:req.comentario,
        });
    } catch(error){
        console.error(error);
        res.status(500).json({message:"Error al actualizar el comentario"})
    }
};

const eliminarComentario = async(req,res)=>{
    try{
        await req.comentario.destroy();
        res.status(200).json({message:"Comentario eliminado con exito"});
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Error al eliminar el comentario"});
    }
};

module.exports ={
    obtenerComentarios,
    obtenerComentariosDePost,
    obtenerComentario,
    crearComentario,
    actualizarComentario,
    eliminarComentario
};