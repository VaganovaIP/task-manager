const {DataTypes} = require('sequelize');
const sequelize = require('../db');
const Board = require('../models/Board');

const List = sequelize.define(
    'Lists', {
        list_id:{
            type: DataTypes.UUID,
            primaryKey:true,
        },
        name_list:{
            type:DataTypes.STRING,
        },
    },
{
        timestamps: true,
        createdAt: false,
        updatedAt: false,
    }
);

Board.hasMany(List,{
    foreignKey: 'id_board',
    sourceKey: 'board_id',
});

module.exports = List;