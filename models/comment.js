'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    UserId: DataTypes.INTEGER,
    PostId: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {});
  Comment.associate = function(models) {

    // models.User.belongsToMany(models.Post, {through: 'Comment', foreignKey: 'UserId'})
    // models.Post.belongsToMany(models.User, {through: 'Comment', foreignKey: 'PostId'})

    // Comment.belongsTo(models.Post, {foreignKey: 'PostId'})
    // Comment.belongsTo(models.User, {foreignKey: 'UserId'})
  };
  return Comment;
};