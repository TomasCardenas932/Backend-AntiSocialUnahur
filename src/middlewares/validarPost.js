
const {postSchema} =require("../schemas/postSchema")
const validarPost=(req,res,next)=>{
    const {error}=postSchema.validate(req.body)
    if(error){
        return res.status(400).json({message:"datos invalidos para crear el post", error: error.details[0].message})
    }
    next()
}

module.exports=validarPost;