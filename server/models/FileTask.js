
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
            file_path:{
                type:DataTypes.STRING,
            },
        },
    )
    return FileTask
}


