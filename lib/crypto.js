const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRETKEY || "secret";

module.exports = {
    Hash: function (plain) {
        return bcrypt.hash(plain, 10);
    },
    Compare: function (hash, real) {
        return bcrypt.compare(real, hash);
    },
    GenerateToken: function (payload, options = {expiresIn: '1h', algorithm: 'HS256'}) {
        return jwt.sign(payload, secretKey, options);
    },
    VerifyToken: function (token, options = {expiresIn: '1h', algorithm: 'HS256'}) {
        return jwt.verify(token, secretKey, options);
    }
}