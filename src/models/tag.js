'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
  
    static associate(models) {
      Tag.belongsToMany(models.Post,
      { through: models.PostTag,
      foreignKey: 'tagId',
      otherKey: 'postId',
       as:{ singular: 'post', plural: 'posts' } });
    }
  }
  Tag.init({
    nombre:{ type: DataTypes.STRING, allowNull: false,unique:true},
  }, {
    sequelize,
    modelName: 'Tag',
    tableName: 'Tags',
  });
  return Tag;
};