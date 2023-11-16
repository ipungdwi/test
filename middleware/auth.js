const {User} = require("../models");

class AuthMid {
    static #verify_token;

    static Init({verify_token}) {
        this.#verify_token = verify_token;
    }

    static isAuth = async (req, res, next) => {
        try {
            const {token} = req.headers;
            if (!token) {
                throw {
                    code: 401
                };
            }
            const claim = await this.#verify_token(token).catch(()=>{
                throw {
                    code: 401
                };
            });
            if (!claim) {
                throw {
                    code: 401
                };
            }
            req.user = await User.findByPk(claim.id);
            if (!req.user) {
                throw {
                    code: 401
                };
            }
            next();
        }catch (err) {
            res.sendStatus(err.code || 500);
        }
    }
}

module.exports = AuthMid;