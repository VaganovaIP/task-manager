const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
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
)

User.hasMany(Board,{
    foreignKey: 'owner',
})
Board.belongsTo(User, {foreignKey:"owner"})


module.exports = Board;
