
module.exports = (sequelize, DataTypes) => {
    const Board = sequelize.define(
        'Boards', {
            board_id:{
                type: DataTypes.UUID,
                primaryKey:true,
            },
            name_board:{
                type:DataTypes.STRING,
            },
        }, {
            timestamps: true
        }
    )
    return Board;
}
