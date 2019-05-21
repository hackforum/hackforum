'use strict';
module.exports = (sequelize, DataTypes) => {
  const PostCat = sequelize.define('PostCat', {
    PostId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  }, {});
  PostCat.associate = function(models) {
    // associations can be defined here
  };
  return PostCat;
};