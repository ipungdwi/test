const route = require("express").Router();
const controller = require("../controller/user")({
    hash: (password) => {
        return password;
    },
    compare_hash: (cipher, password) => {
        return true;
    },
    sign_token: (payload) => {
        return payload.id;
    }
});
const authMid = {
    isAuth: async (req, res, next) => {
        try {
            const {token} = req.headers;
            if (!token) {
                throw {
                    code: 401
                };
            }
            req.user = await require("../models").User.findByPk(token, {});
            console.log(req.user);
            if (!req.user) {
                throw {
                    code: 401
                };
            }
            next();
        } catch (err) {
            res.sendStatus(err.code || 500);
        }
    }
}

route.post("/register", controller.register);
route.post("/login", controller.login);
route.put("/:userId", authMid.isAuth, controller.updateUser);
route.delete("/:userId", authMid.isAuth, controller.deleteUser);

module.exports = route;