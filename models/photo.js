'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Photo extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.User, {foreignKey: "UserId"});
            this.hasMany(models.Comment, {foreignKey: "PhotoId", onDelete: 'CASCADE'})
        }
    }

    Photo.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        caption: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        poster_image_url: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                isUrl: true
            },
        },
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Photo',
    });
    return Photo;
};