
const {modificarPostSchema} =require("../schemas/postSchema")
const validarModificarPost=(req,res,next)=>{
    const {error}=modificarPostSchema.validate(req.body)
    if(error){
        return res.status(400).json({message:"datos invalidos para modificar el post", error: error.details[0].message})
    }
    next()
}

module.exports=validarModificarPost;
