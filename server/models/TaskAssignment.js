
module.exports = (sequelize, DataTypes) => {
    const TaskAssignment = sequelize.define(
        'TaskAssignments', {
            members_id:{
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            task_id: {
                type: DataTypes.UUID,
                references: {
                    model: 'Tasks',
                    key: 'task_id',
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
            createdAt: false,
            updatedAt: false,
        }
    )

    return TaskAssignment
}


// sequelize.sync({force:true}).then(()=>{
//
//     console.log("Tables have been created");
// }).catch(err=>console.log(err));