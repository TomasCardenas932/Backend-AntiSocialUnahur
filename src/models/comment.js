'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    
    static associate(models) {
      Comment.belongsTo(models.Post, { foreignKey: 'postId' ,as: 'post', onDelete: 'CASCADE'}); // igual que la migracion: si se borra el post se borran sus comentarios
      Comment.belongsTo(models.User, { foreignKey: 'userId' ,as: 'user', onDelete: 'CASCADE'});
    }
  }
  Comment.init({
    contenido: {type:DataTypes.TEXT,allowNull: false},
    fecha:{type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW},
    postId: {type: DataTypes.INTEGER, allowNull: false},
    userId: {type: DataTypes.INTEGER, allowNull: false},
    visible:{
      type:DataTypes.VIRTUAL(DataTypes.BOOLEAN, ['fecha']),
      get(){
        const meses = Number(process.env.MESES_VISIBILIDAD) || 6;
        const limite = new Date();
        limite.setMonth(limite.getMonth() - meses);
        return new Date(this.getDataValue('fecha')) >= limite;
      }
    }
  }, {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments',
  });
  return Comment;
};