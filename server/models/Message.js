const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const User = require('../models/User')
const Board = require("./Board");

const Message = sequelize.define(
    'Messages', {
        message_id:{
            type: DataTypes.UUID,
            primaryKey:true,
        },
        text_message:{
            type:DataTypes.STRING,
        },
    },
)

User.hasMany(Message,{
    foreignKey: 'sender_id',
})
Message.belongsTo(User, {foreignKey:"sender_id"})

Board.hasMany(Message,{
    foreignKey: 'board_id',
});
Message.belongsTo(Board, {foreignKey:"board_id"})



module.exports = Message;
