const {DataTypes} = require('sequelize');
const sequelize = require('../db');
const User = require('../models/User');

const Board = sequelize.define(
    'Boards', {
        board_id:{
            type: DataTypes.UUID,
            primaryKey:true,
        },
        name_board:{
            type:DataTypes.STRING,
        },
    }
);

User.hasMany(Board,{
    foreignKey: 'owner',
    sourceKey: 'user_id',
});

module.exports = Board;