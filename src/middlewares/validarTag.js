const {tagSchema} = require('../schemas/tagSchema');

const validarTag = (req,res,next)=>{
    const{error} = tagSchema.validate(req.body,{abortEarly:false});
    if(error){
        return res.status(400).json({message:"Datos invalidos"});
    }
    next();
};

module.exports = validarTag;