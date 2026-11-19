const { Post } = require("../models");

const buscarPostPorBody = async (req, res, next) => {
  try {
    const { postId } = req.body;

    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" });
    }

    req.post = post;
    next();
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el post" });
  }
};

module.exports = buscarPostPorBody;