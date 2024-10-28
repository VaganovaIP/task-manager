const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'ProjectManagement', 'postgres', '',
    {
        dialect: "postgres",
    });
