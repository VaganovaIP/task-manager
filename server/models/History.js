
module.exports = (sequelize, DataTypes) => {
    const History = sequelize.define(
        'Histories', {
            event_id:{
                type: DataTypes.UUID,
                primaryKey: true,
            },
            text_event:{
                type:DataTypes.STRING,
            },
        },
        {
            timestamps: true,
            createdAt: true,
            updatedAt: true,
        }
    )
    return History
}
