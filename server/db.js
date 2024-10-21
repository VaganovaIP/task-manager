const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'auth', 'postgres', '',
    {
        host: "localhost",
        dialect: "postgres",
    });