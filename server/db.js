const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'pm', 'postgres', 'passwd',
    {
        dialect: "postgres",
    });
