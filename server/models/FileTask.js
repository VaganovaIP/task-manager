
module.exports = (sequelize, DataTypes) => {
    const FileTask = sequelize.define(
        'FilesTasks', {
            file_id:{
                type: DataTypes.UUID,
                primaryKey:true,
            },
            name_file:{
                type:DataTypes.STRING,
            },
        },
    )
    return FileTask
}


