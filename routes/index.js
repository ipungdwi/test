const route = require("express").Router();

route.use("/users", require("./user"));
route.use("/photos", require("./photo"));
route.use("/socialmedias", require("./socmed"));
route.use("/comments", require("./comment"));

module.exports = route;