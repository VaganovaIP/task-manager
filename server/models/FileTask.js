const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const Task = require('../models/Task')

const FileTask = sequelize.define(
    'FilesTasks', {
        file_id:{
            type: DataTypes.UUID,
            primaryKey:true,
        },
        name_file:{
            type:DataTypes.STRING,
        },
        file_path:{
            type:DataTypes.STRING,
        },
    },
)

Task.hasMany(FileTask,{
    foreignKey: 'task_id',
})
FileTask.belongsTo(Task, {foreignKey:"task_id"})

module.exports = FileTask;
