const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const User = require('../models/User');
const Board = require('../models/Board');

const BoardMember = sequelize.define(
    'BoardMembers', {
        members_id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:true,
        },
    },
    {
        timestamps: true,
        createdAt: false,
        updatedAt: false,
    }
)

User.hasMany(BoardMember,{
    foreignKey: 'user_id',
});
BoardMember.belongsTo(User, {foreignKey:"user_id"})

Board.hasMany(BoardMember,{
    foreignKey: 'board_id',
});
BoardMember.belongsTo(Board, {foreignKey:"board_id"})

module.exports = BoardMember;