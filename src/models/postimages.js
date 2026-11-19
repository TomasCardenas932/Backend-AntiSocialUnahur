'use strict';
const {
  Model
} = require('sequelize');
const fs = require('fs');
const path = require('path');
const { CARPETA_MEDIA } = require('../config/media');
module.exports = (sequelize, DataTypes) => {
  class postImages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      postImages.belongsTo(models.Post, {
        foreignKey: "postId",
        as: "post",
        onDelete: "CASCADE"
      });
    }
  }
  postImages.init({
    urlImage: {
      type: DataTypes.STRING,
      allowNull: false
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'postImages',
  });

  // al borrar una imagen (sola o en cascada desde su post o su usuario) se borra tambien el archivo de media/
  postImages.afterDestroy(async (imagen) => {
    const archivo = path.join(CARPETA_MEDIA, path.basename(imagen.urlImage));
    try {
      await fs.promises.unlink(archivo);
    } catch (error) {
      // si el archivo ya no estaba no hay nada que limpiar
      if (error.code !== 'ENOENT') {
        console.error(error);
      }
    }
  });

  return postImages;
};