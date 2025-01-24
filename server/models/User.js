const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require("../config/db.js");
const Role = require("./Role");


const User = sequelize.define(
    'Users',
    {
        user_id:{
            type: DataTypes.UUID,
            primaryKey:true,
        },
        username:{
            type:DataTypes.STRING,
        },
        first_name:{
            type:DataTypes.STRING,
        },
        last_name:{
            type:DataTypes.STRING,
        },
        email:{
            type: DataTypes.STRING,
            unique: true,
        },
        password_user:{
            type: DataTypes.STRING,
        },
        roleId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    },
    {
        timestamps: true,
        createdAt: false,
        updatedAt: false,
    }
)

User.belongsTo(Role, { foreignKey: 'roleId' });
Role.hasMany(User, { foreignKey: 'roleId' });

User.beforeCreate(async (user, options) => {
    const defaultRole = await Role.findOne({ where: { name: 'User' } });
    if (!defaultRole) {
        throw new Error('Роль "User" не найдена в базе данных');
    }
    user.roleId = defaultRole.id;
});


module.exports = User;