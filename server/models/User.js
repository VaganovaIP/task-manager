const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require("../db.js");


const User = sequelize.define(
    'Users',
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        firstname:{
            type:DataTypes.STRING,
        },
        lastname:{
            type:DataTypes.STRING,
        },
        nickname:{
            type:DataTypes.STRING,
        },
        email:{
            type: DataTypes.STRING,
            unique: true,
        },
        password:{
            type: DataTypes.STRING,
        },
    }
)

module.exports = User;