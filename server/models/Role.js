const {DataTypes} = require('sequelize');
const sequelize = require('../db');

const Role = sequelize.define(
    'Roles', {
        role_id:{
            type: DataTypes.UUID,
            primaryKey:true,
        },
        name_role:{
            type:DataTypes.STRING,
        },
    },
)


module.exports = Role;
