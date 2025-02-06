
module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define(
            'Roles', {
                role_id:{
                    type: DataTypes.UUID,
                    primaryKey:true,
                },
                name_role:{
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
            },
    )
    return Role;
}
