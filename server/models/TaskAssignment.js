const {DataTypes} = require('sequelize');
const sequelize = require('../db');
const User = require('../models/User');
const Task = require('../models/Task');

const TaskAssignment = sequelize.define(
    'TaskAssignments', {
        members_id:{
            type: DataTypes.UUID,
            primaryKey:true,
        },
    },
    {
        timestamps: true,
        createdAt: false,
        updatedAt: false,
    }
);

User.hasMany(TaskAssignment,{
    foreignKey: 'user_id',
    sourceKey: 'user_id',
});

Task.hasMany(TaskAssignment,{
    foreignKey: 'task_id',
    sourceKey: 'task_id',
});

module.exports = TaskAssignment;