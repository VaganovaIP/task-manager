const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

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




module.exports = Message;
