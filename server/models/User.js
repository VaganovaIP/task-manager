const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require("../db.js");


const User = sequelize.define(
    'Users',
    {
        user_id:{
            type: DataTypes.UUID,
            primaryKey:true,
        },
        username:{
            type:DataTypes.STRING,
        },firstname:{
            type:DataTypes.STRING,
        },
        lastname:{
            type:DataTypes.STRING,
        },
        email:{
            type: DataTypes.STRING,
            unique: true,
        },
        password:{
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: true,
        createdAt: false,
        updatedAt: false,
    }
)

module.exports = User;