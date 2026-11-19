const {Tag}=require('../models');

const obtenerTags= async(req,res)=>{
    try {
        const tags = await Tag.findAll();
        res.status(200).json(tags);
    }catch(error){
        console.error(error);
        res.status(500).json({message:'Error al obtener los tags'});
    }
};

const obtenerTag = async (req, res) => {
  try {
    const posts = await req.tag.getPosts({
      attributes: ["id", "descripcion", ["createdAt", "fecha"]], // Post no tiene columna fecha: se usa createdAt
      joinTableAttributes: [], // oculta la tabla intermedia
    });
    res.status(200).json({ ...req.tag.toJSON(), posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el tag" });
  }
};

// el nombre del tag es unique en la base
const esNombreRepetido = (error) => error.name === "SequelizeUniqueConstraintError";

const crearTag = async (req, res) => {
  try {
    const tag = await Tag.create({ nombre: req.body.nombre });
    res.status(201).json({ message: "Tag creado con exito", tag });
  } catch (error) {
    if (esNombreRepetido(error)) {
      return res.status(409).json({ message: "Ya existe un tag con ese nombre" });
    }
    console.error(error);
    res.status(500).json({ message: "Error al crear el tag" });
  }
};

const actualizarTag = async(req,res)=>{
    try {
        await req.tag.update({nombre:req.body.nombre});
        res.status(200).json({message:'Tag actualizado'});
    } catch (error) {
        if (esNombreRepetido(error)) {
            return res.status(409).json({ message: "Ya existe un tag con ese nombre" });
        }
        console.error(error);
        res.status(500).json({message:"Error al actualizar el tag"});
    }
};

const eliminarTag=async(req,res)=>{
    try {
        await req.tag.destroy();
        res.status(200).json({message:'Tag eliminado con éxtio'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Error al eliminar el Tag'});
    }
};

const agregarTagAPost= async(req,res)=>{
    try {
        if (await req.tag.hasPost(req.post)) {
            return res.status(409).json({ message: "El post ya tiene ese tag" });
        }
        await req.tag.addPost(req.post);
        res.status(200).json({message:"Tag asignado al post!"})
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Error al asignar el tag al post"});
    }
};

const quitarTagDePost=async(req,res)=>{
    try {
         if(!(await req.tag.hasPost(req.post))){
            return res.status(404).json({message:"El post no tiene ese tag"});
        }
        await req.tag.removePost(req.post);
        res.status(200).json({message:"Tag borrado al post!"})
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Error al borrar el tag al post"});
    }
};

module.exports={
    obtenerTags,
    obtenerTag,
    crearTag,
    actualizarTag,
    eliminarTag,
    agregarTagAPost,
    quitarTagDePost
};