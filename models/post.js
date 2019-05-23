'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {});
  Post.associate = function(models) {
    Post.belongsTo(models.User, {foreignKey: 'UserId'})

    Post.hasMany(models.PostCat, {foreignKey: 'PostId'})
  };
  return Post;
};