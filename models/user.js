'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Photo, {foreignKey: "UserId", as: "photos"});
      this.hasMany(models.Comment, {foreignKey: "UserId", as: "comments"});
      this.hasMany(models.SocialMedia, {foreignKey: "UserId", as: "social_medias"});
    }
  }
  User.init({
    full_name: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    profile_image_url: DataTypes.TEXT,
    age: DataTypes.INTEGER,
    phone_number: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};