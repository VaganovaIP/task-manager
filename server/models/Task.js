const {DataTypes} = require('sequelize');
const sequelize = require('../db');
const User = require('../models/User');
const Board = require('../models/Board');
const List = require('../models/List');
const db = require("../db");


const Task = sequelize.define(
    'Tasks', {
        task_id:{
            type: DataTypes.UUID,
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
        createdAt:{
            type: DataTypes.DATE,
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
        createdAt: true,
        updatedAt: false,
    }
)


User.hasMany(Task,{
    foreignKey: 'owner_id',
});
Task.belongsTo(User, {foreignKey:"owner_id"})

Board.hasMany(Task,{
    foreignKey: 'board_id',
});
Task.belongsTo(Board, {foreignKey:"board_id"})

List.hasMany(Task,{
    foreignKey: 'list_id',
});
Task.belongsTo(List, {foreignKey:"list_id"});


module.exports = Task;
