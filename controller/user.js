const {User} = require("../models");

module.exports = ({hash, compare_hash, sign_token}) => ({
    register: async (req, res) => {
        try {
            const {email, full_name, username, password, profile_image_url, age, phone_number} = req.body;
            const newUser = new User({
                email, full_name, username, password: hash(password), profile_image_url, age, phone_number
            });
            await newUser.validate();
            await newUser.save();
            res.status(201).json({
                user: {
                    email, full_name, username, profile_image_url, age, phone_number
                }
            });
        } catch (err) {
            res.sendStatus(500);
        }
    }, login: async (req, res) => {
        try {
            const {email, password} = req.body;
            const newUser = await User.findOne({where: {email}});
            if (!newUser) {
                throw {
                    code: 404, message: "user not found"
                };
            }
            if (!compare_hash(newUser.password, password)) {
                throw {
                    code: 400, message: "user password is wrong"
                };
            }
            res.status(201).json({
                token: sign_token({id: newUser.id})
            });
        } catch (err) {
            res.sendStatus(err.code || 500);
        }
    }, updateUser: async (req, res) => {
        try {
            const {userId} = req.params;
            const {email, full_name, username, profile_image_url, age, phone_number} = req.body;
            if (parseInt(userId) !== req.user.id) {
                throw {
                    code: 403,
                    message: "unauthorized"
                }
            }
            await User.update({
                email,
                full_name,
                username,
                profile_image_url,
                age,
                phone_number
            }, {
                where: {
                    id: parseInt(userId)
                }
            });
            res.json({
                user: {
                    email, full_name, username, profile_image_url, age, phone_number
                }
            });
        } catch (err) {
            res.sendStatus(err.code || 500);
        }
    }, deleteUser: async (req,res) => {
        try {
            const {userId} = req.params;
            if (parseInt(userId) !== req.user.id) {
                throw {
                    code: 403,
                    message: "unauthorized"
                }
            }
            await User.destroy({
                where: {
                    id: parseInt(userId)
                }
            });
            res.json({
                message: "Your account has been successfully deleted"
            })
        }catch (err) {
            res.sendStatus(err.code || 500);
        }
    }
})