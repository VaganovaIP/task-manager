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
    },

);

Board.hasMany(User);

module.exports = Board;
