'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.User, {foreignKey: "UserId"});
            this.belongsTo(models.Photo, {foreignKey: "PhotoId"});
        }
    }

    Comment.init({
        UserId: {type: DataTypes.INTEGER, allowNull: false},
        PhotoId: {type: DataTypes.INTEGER, allowNull: false},
        comment: {type: DataTypes.TEXT, allowNull: false}
    }, {
        sequelize,
        modelName: 'Comment',
    });
    return Comment;
};