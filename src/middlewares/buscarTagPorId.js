const{Tag,Post} = require('../models');

const buscarTagPorId = async(req,res,next)=>{
    try{
        const id = req.params.tagId ?? req.params.id;//en /tags/:id el tag viene como :id , en / /tags/:tagId/posts/:id, como :tagId despues de la fusion de los merge de todos
        const tag = await Tag.findByPk(id, {
        include: {
        model: Post,
        as: "posts",
        attributes: ["id", "descripcion", ["createdAt", "fecha"]], // Post no tiene columna fecha: se usa createdAt
        through: { attributes: [] },
            },
        });
        if(!tag){
            return res.status(404).json({message:"Tag no encontrado"});
        }
        req.tag = tag;
        next();
    }   catch(error){
        console.error(error);
        res.status(500).json({message:"Error al obtener el Tag"});
    }
};

module.exports = buscarTagPorId;