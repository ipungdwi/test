const route = require("express").Router();
const controller = require("../controller/user");
const authMid = require("../middleware/auth");

route.post("/register", controller.register);
route.post("/login", controller.login);
route.put("/:userId", authMid.isAuth, controller.updateUser);
route.delete("/:userId", authMid.isAuth, controller.deleteUser);

module.exports = route;