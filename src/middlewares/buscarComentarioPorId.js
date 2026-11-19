const {Comment,User} = require('../models');

const buscarComentarioPorId = async(req,res,next)=>{
    try{
        const comentario = await Comment.findByPk(req.params.id,{
            include:{model:User,as:"user",attributes:["id", "nickName"]},
        });
        if(!comentario){
            return res.status(404).json({message:"Comentario no encontrado"});
        }
        req.comentario = comentario;
        next();
    }   catch(error){
        console.error(error);
        res.status(500).json({message:"Error al obtener el comentario"});
    }
};

module.exports = buscarComentarioPorId;