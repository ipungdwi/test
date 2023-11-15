'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SocialMedia extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.User, {foreignKey: "UserId"});
        }
    }

    SocialMedia.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        social_media_url: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'SocialMedia',
    });
    return SocialMedia;
};