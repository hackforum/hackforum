'use strict';
module.exports = (sequelize, DataTypes) => {
  const PostCat = sequelize.define('PostCat', {
    PostId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  }, {});
  PostCat.associate = function(models) {
    models.Category.belongsToMany(models.Post, {through: 'PostCat', foreignKey: 'CategoryId'})
    models.Post.belongsToMany(models.Category, {through: 'PostCat', foreignKey: 'PostId'})

    PostCat.belongsTo(models.Post, {foreignKey: 'PostId'})
    PostCat.belongsTo(models.Category, {foreignKey: 'CategoryId'})
  };
  return PostCat;
};