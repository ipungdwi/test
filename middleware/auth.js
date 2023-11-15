const {User} = require("../models");

class AuthMid {
    static #verify_token;

    static Init({verify_token}) {
        this.#verify_token = verify_token;
    }

    static isAuth = async (req, res, next) => {
        const {token} = req.headers;
        if(!token) {
            return res.sendStatus(401);
        }
        const claim = await this.#verify_token(token);
        if (!claim) {
            return res.sendStatus(401);
        }
        req.user = await User.findByPk(claim.id);
        if (!req.user) {
            return res.sendStatus(401);
        }
        next();
    }
}

module.exports = AuthMid;