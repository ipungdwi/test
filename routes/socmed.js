const route = require("express").Router();
const controller = require("../controller/socmed");
const authMid = require("../middleware/auth");

route.get("/", authMid.isAuth, controller.getAllSocialMedias);
route.get("/:SocialMediaId", authMid.isAuth, controller.getSocialMediaById);
route.post("/", authMid.isAuth, controller.addSocialMedia);
route.put("/:SocialMediaId", authMid.isAuth, controller.updateSocialMedia);
route.delete("/:SocialMediaId", authMid.isAuth, controller.deleteSocialMediaById);

module.exports = route;