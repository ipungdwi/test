const route = require("express").Router();
const controller = require("../controller/photo");
const authMid = require("../middleware/auth");

route.get("/", authMid.isAuth, controller.getAllPhotos);
route.get("/:photoId", authMid.isAuth, controller.getPhotoById);
route.post("/", authMid.isAuth, controller.addPhoto);
route.put("/:photoId", authMid.isAuth, controller.updatePhoto);
route.delete("/:photoId", authMid.isAuth, controller.deletePhotoById);

module.exports = route;