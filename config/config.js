require("dotenv").config();
module.exports = {
    "development": {
        "username": process.env.DB_USERNAME || "postgres",
        "password": process.env.DB_PASSWORD || "secret",
        "database": process.env.DB_NAME || "my_gram_development",
        "host": process.env.DB_HOST || "127.0.0.1",
        "dialect": process.env.DB_DIALECT || "postgres"
    },
    "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "production": {
        "username": process.env.DB_USERNAME || "root",
        "password": process.env.DB_PASSWORD || "secret",
        "database": process.env.DB_NAME || "my_gram_production",
        "host": process.env.DB_HOST || "127.0.0.1",
        "dialect": process.env.DB_DIALECT || "mysql"
    }
}