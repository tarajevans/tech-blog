const sequelize = require('sequelize');
require("dotenv").config();

const db = new sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {host: 'localhost', dialect: 'mysql'});


module.exports = db;