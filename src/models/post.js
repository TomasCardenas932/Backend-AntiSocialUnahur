'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // hooks: true hace que Sequelize borre las imagenes una por una, asi se ejecuta el afterDestroy que borra el archivo
      Post.hasMany(models.postImages, {
        foreignKey: "postId",
        as: "imagenes",
        onDelete: "CASCADE",
        hooks: true
      });
      Post.belongsTo(models.User, { // belongTo porque establezco una relacion FK con el id del usuario a mi tabla.
        foreignKey: "userId",
        as: "usuario",
        onDelete: "CASCADE"
      });
      // hasMany porque un post puede tener muchos comentarios; si se borra el post se borran sus comentarios
      Post.hasMany(models.Comment, {
        foreignKey: "postId",
        as: "comentarios",
        onDelete: "CASCADE"
      });
      // belongsToMany porque un post puede tener muchos tags y un tag estar en muchos posts (tabla intermedia PostTags)
      Post.belongsToMany(models.Tag, {
        through: models.PostTag,
        foreignKey: "postId",
        otherKey: "tagId",
        as: "tags"
      });
    }
  }
  Post.init({
    descripcion: {
      type: DataTypes.STRING,
      allowNull:false
    },
    userId: {
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};