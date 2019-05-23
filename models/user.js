'use strict';

var bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: {
      type : DataTypes.STRING,
      validate : {
        len : {
          args : [5,15],
          msg : "Username min 5 character and max 15 character"
        },
        isUnique : function(value, next){
                  User.findOne({
                    where : {username : value}
                  })
                  .then((gotData) => {
                    if(gotData){
                      throw new Error("Username Already Exist!")
                    } else {
                      next()
                    }
                  })
                  .catch((err) => {
                    next(err)
                  })
        } 
      }
    },
    email: {
      type : DataTypes.STRING,
      validate : {
        isEmail : {
          args : true,
          msg : "Email Format Not Valid"
        },
        isUnique : function(value, next){
                  User.findOne({
                    where : {email : value}
                  })
                  .then((gotData) => {
                    if(gotData){
                      throw new Error("This Email Use")
                    } else {
                      next()
                    }
                  })
                  .catch((err) => {
                    next(err)
                  })
        } 
      }
    },
    password: DataTypes.STRING,
    avatar: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    token: DataTypes.STRING,
  }, {
    hooks : {
      beforeCreate : (value, option) => {
        let salt = bcrypt.genSaltSync(10)
        var hash = bcrypt.hashSync(value.password, salt);
        value.password = hash
        value.status = false
        value.avatar = "userProfile/defaultPhoto.png"
      }
    }
  });
  User.associate = function(models) {
    User.hasMany(models.Post, {foreignKey: 'UserId'})
  };

 
  
  User.prototype.getFullName = function() {
    return [this.firstName, this.lastName].join(" ")  
  }
  
  User.prototype.joinDate = function() {
    let date = this.createdAt.toISOString() 
    return date.substring(0,10)  
  }

  return User;
};