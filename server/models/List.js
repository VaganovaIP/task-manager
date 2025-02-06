
module.exports = (sequelize, DataTypes) => {
    const List = sequelize.define(
        'Lists', {
            list_id:{
                type: DataTypes.UUID,
                primaryKey: true,
            },
            name_list:{
                type:DataTypes.STRING,
            },
        },
        {
            timestamps: true,
            createdAt: true,
            updatedAt: false,
        }
    )
    return List
}
