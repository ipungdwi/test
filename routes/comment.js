const route = require("express").Router();
const authMid = require("../middleware/auth");
const {comment} = require("../controller/index");

route.post("/", authMid.isAuth, comment.createComment);
route.get("/", authMid.isAuth, comment.getComments);
route.put("/:commentId", authMid.isAuth, comment.updateComment);
route.delete("/:commentId", authMid.isAuth, comment.deleteComment);

module.exports = route;