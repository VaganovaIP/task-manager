const {DataTypes} = require('sequelize');
const sequelize = require('../db');
const User = require('../models/User');
const Board = require('../models/Board');


const Task = sequelize.define(
    'Tasks', {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        name_task:{
            type:DataTypes.TEXT,
        },
        description:{
            type:DataTypes.TEXT,
        },
        date_start:{
            type: DataTypes.DATE,
        },
        date_last:{
            type: DataTypes.DATE,
        },
        status_task:{
            type: DataTypes.DATE,
        },
    }
);


User.hasMany(Task,{
    foreignKey: 'user_responsible',
    sourceKey: 'id',
});


module.exports = Task;
