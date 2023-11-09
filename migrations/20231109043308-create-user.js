'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            full_name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            email: {
                validate: {
                    isEmail: true,
                },
                unique: {
                    args: true,
                    msg: "email is used"
                },
                allowNull: false,
                type: Sequelize.STRING
            },
            username: {
                unique: {
                    args: true,
                    msg: "username is used"
                },
                allowNull: false,
                type: Sequelize.STRING
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING
            },
            profile_image_url: {
                allowNull: false,
                validate: {
                    isUrl: true,
                },
                type: Sequelize.TEXT
            },
            age: {
                allowNull: false,
                validate: {
                    isInt: true,
                },
                type: Sequelize.INTEGER
            },
            phone_number: {
                allowNull: false,
                validate: {
                    isNumeric: true,
                },
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Users');
    }
};