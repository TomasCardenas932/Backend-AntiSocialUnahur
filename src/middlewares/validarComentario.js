const{
    crearComentarioSchema,
    actualizarComentarioSchema,
}= require("../schemas/comentarioSchemas");


const crearValidador =(schema)=>(req,res,next)=>{
    const{error}= schema.validate(req.body,{abortEarly:false});
    if(error){
        return res.status(400).json({message:"Datos invalidos"});
    }
    next();
};

module.exports = {
    validarCrearComentario: crearValidador(crearComentarioSchema),
    validarActualizarComentario: crearValidador(actualizarComentarioSchema)
};