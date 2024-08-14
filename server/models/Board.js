const {Sequelize, DataTypes, Deferrable} = require('sequelize');
const sequelize = require('../db');
const User = require('../models/User');
const Task = require('../models/Task');

const Board = sequelize.define(
    'Boards', {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        name_board:{
            type:DataTypes.STRING,
        },
    }
);

User.hasMany(Task,{
    foreignKey: 'user_fk',
    sourceKey: 'id',
});

User.hasMany(Board,{
    foreignKey: 'user_fk',
    sourceKey: 'id',
});


module.exports = Board;