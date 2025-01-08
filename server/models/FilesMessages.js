const {DataTypes} = require('sequelize');
const sequelize = require('../db');
const Message = require("./Message");

const FileMessages = sequelize.define(
    'FilesMessages', {
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

Message.hasMany(FileMessages,{
    foreignKey: 'message_id',
})
FileMessages.belongsTo(Message, {foreignKey:"message_id"})


module.exports = FileMessages;
