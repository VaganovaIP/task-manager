const {DataTypes} = require('sequelize');
const sequelize = require('../db');
const User = require('../models/User');
const Board = require('../models/Board');
const List = require('../models/List');


const Task = sequelize.define(
    'Tasks', {
        task_id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name_task:{
            type:DataTypes.STRING,
        },
        description:{
            type:DataTypes.TEXT,
        },
        date_start:{
            type: DataTypes.DATE,
        },
        date_end:{
            type: DataTypes.DATE,
        },
        created_at:{
            type: DataTypes.TIME,
        },
        status:{
            type: DataTypes.BOOLEAN,
        },
        importance:{
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: true,
        createdAt: false,
        updatedAt: false,
    }
)


User.hasMany(Task,{
    foreignKey: 'owner_id',
    sourceKey: 'user_id',
});

Board.hasMany(Task,{
    foreignKey: 'board_id',
    sourceKey: 'board_id',
});

List.hasMany(Task,{
    foreignKey: 'list_id',
    sourceKey: 'list_id',
});

module.exports = Task;
