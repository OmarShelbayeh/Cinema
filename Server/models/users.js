"use strict";
const { Model } = require("sequelize");
var bcrypt = require("bcrypt-nodejs");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {}
    comparePassword = function (passw, cb) {
      bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
          return cb(err);
        }
        cb(null, isMatch);
      });
    };
  }
  users.init(
    {
      email: DataTypes.STRING,
      name: DataTypes.STRING,
      surname: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  users.beforeSave((user, options) => {
    if (user.changed("password")) {
      user.password = bcrypt.hashSync(
        user.password,
        bcrypt.genSaltSync(10),
        null
      );
    }
  });

  return users;
};
