module.exports = (sequelize, DataTypes) => {
    const BoardMember = sequelize.define(
        'BoardMembers', {
        members_id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:true,
        },
        board_id: {
                type: DataTypes.UUID,
                references: {
                    model: 'Boards',
                    key: 'board_id',
                },
            },
        user_id: {
                type: DataTypes.UUID,
                references: {
                    model: 'Users',
                    key: 'user_id',
                },
            },
    },
    {
        timestamps: true,
        createdAt: true,
        updatedAt: true,
    }
    )
    return BoardMember;
}
