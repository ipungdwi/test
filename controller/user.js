const {User} = require("../models");

class UserC {
    static #hash;
    static #compare_hash;
    static #sign_token;

    static Init({hash, compare_hash, sign_token}) {
        this.#hash = hash;
        this.#compare_hash = compare_hash;
        this.#sign_token = sign_token;
    }

    static register = async (req, res) => {
        try {
            const {email, full_name, username, password, profile_image_url, age, phone_number} = req.body;
            const newUser = new User({
                email, full_name, username, password: await this.#hash(password), profile_image_url, age, phone_number
            });
            await newUser.save().catch(err => {
                throw {
                    code: 400,
                    err
                };
            });
            res.status(201).json({
                user: {
                    email, full_name, username, profile_image_url, age, phone_number
                }
            });
        } catch (err) {
            res.sendStatus(err.code || 500);
        }
    }
    static login = async (req, res) => {
        try {
            const {email, password} = req.body;
            const newUser = await User.findOne({where: {email}});
            if (!newUser) {
                throw {
                    code: 404, message: "user not found"
                };
            }
            if (!this.#compare_hash(newUser.password, password)) {
                throw {
                    code: 400, message: "user password is wrong"
                };
            }
            res.status(201).json({
                token: this.#sign_token({id: newUser.id})
            });
        } catch (err) {
            res.sendStatus(err.code || 500);
        }
    }
    static updateUser = async (req, res) => {
        try {
            const {userId} = req.params;
            const {
                email = null,
                full_name = null,
                username = null,
                profile_image_url = null,
                age = null,
                phone_number = null
            } = req.body;
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
            }).catch(_ => {
                throw {
                    code: 400
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
    }
    static deleteUser = async (req, res) => {
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
        } catch (err) {
            res.sendStatus(err.code || 500);
        }
    }
}

module.exports = UserC;