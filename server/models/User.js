
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'Users',
        {
            user_id: {
                type: DataTypes.UUID,
                primaryKey: true,
            },
            username: {
                type: DataTypes.STRING,
            },
            first_name: {
                type: DataTypes.STRING,
            },
            last_name: {
                type: DataTypes.STRING,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
            },
            password_user: {
                type: DataTypes.STRING,
            },
        },
        {
            timestamps: true,
            createdAt: false,
            updatedAt: false,
        }
    )

    return User;
}

