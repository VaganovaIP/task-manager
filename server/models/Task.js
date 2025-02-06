
module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define(
        'Tasks', {
            task_id:{
                type: DataTypes.UUID,
                primaryKey: true,
            },
            name_task:{
                type:DataTypes.STRING,
            },
            description:{
                type:DataTypes.TEXT,
            },
            date_start:{
                type: DataTypes.DATE,
            },
            date_end:{
                type: DataTypes.DATE,
            },
            createdAt:{
                type: DataTypes.DATE,
            },
            status:{
                type: DataTypes.BOOLEAN,
            },
            importance:{
                type: DataTypes.STRING,
            },
        },
        {
            timestamps: true,
            createdAt: true,
            updatedAt: false,
        }
    )
    return Task
}
