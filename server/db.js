const {Sequelize} = require('sequelize');

const db = new Sequelize(
    'chat', 'postgres', '',
    {
        dialect:'postgres'
    }
);
module.exports = db;