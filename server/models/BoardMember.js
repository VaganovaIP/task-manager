const {DataTypes} = require('sequelize');
const sequelize = require('../db');
const User = require('../models/User');
const Board = require('../models/Board');

const BoardMember = sequelize.define(
    'BoardMembers', {
        members_id:{
            type: DataTypes.UUID,
            primaryKey:true,
        },
    }
);

User.hasMany(BoardMember,{
    foreignKey: 'user_id',
    sourceKey: 'user_id',
});

Board.hasMany(BoardMember,{
    foreignKey: 'board_id',
    sourceKey: 'board_id',
});

module.exports = BoardMember;