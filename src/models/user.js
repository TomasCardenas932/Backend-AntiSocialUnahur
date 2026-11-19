'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      if (models.Post) {
        // si se borra el usuario se borran sus posts (y en cascada sus imagenes, comentarios y tags asignados)
        // hooks: true para que cada post se borre uno por uno y a su vez borre los archivos de sus imagenes
        User.hasMany(models.Post, {
          foreignKey: 'userId',
          as: 'publicaciones',
          onDelete: 'CASCADE',
          hooks: true
        });
      }

      if (models.Comment) {
        // si se borra el usuario se borran sus comentarios
        User.hasMany(models.Comment, {
          foreignKey: 'userId',
          as: 'comentarios',
          onDelete: 'CASCADE'
        });
      }
        //Dos relaciones para follow, para tener las dos perspectivas (seguidos y seguidores).
      if (models.Follow) {
        User.belongsToMany(models.User, {
          through: models.Follow,
          foreignKey: 'followerId',
          otherKey: 'followingId',
          as: 'seguidos'
        });

        User.belongsToMany(models.User, {
          through: models.Follow,
          foreignKey: 'followingId',
          otherKey: 'followerId',
          as: 'seguidores'
        });
      }
    }
  }

  User.init({
    nickName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'User'
  });

  return User;
};
