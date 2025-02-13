const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    'ProjectManagement', 'postgres', '', {
        dialect: "postgres",
        logging: false,
    });

const db = {}

db.Role = require('../models/Role')(sequelize, DataTypes);
db.Board = require('../models/Board')(sequelize, DataTypes);
db.User = require('../models/User') (sequelize, DataTypes);
db.BoardMember = require('../models/BoardMember')(sequelize, DataTypes);
db.List = require('../models/List')(sequelize, DataTypes);
db.Task = require('../models/Task')(sequelize, DataTypes);
db.TaskAssignment = require('../models/TaskAssignment')(sequelize, DataTypes);
db.FileTask = require('../models/FileTask')(sequelize, DataTypes);

//
db.Role.hasMany(db.User, { foreignKey: 'roleId' });
db.User.belongsTo(db.Role, { foreignKey: 'roleId' });

//
db.User.hasMany(db.Board,{foreignKey: 'user_id'});
db.Board.belongsTo(db.User,{foreignKey: 'user_id'});

//
db.Board.hasMany(db.List,{foreignKey: 'board_id'});
db.List.belongsTo(db.Board,{foreignKey: 'board_id'});

//
db.Board.hasMany(db.Task, {foreignKey: 'board_id'});
db.Task.belongsTo(db.Board, {foreignKey: 'board_id'});
db.List.hasMany(db.Task, {foreignKey: 'list_id'});
db.Task.belongsTo(db.List, {foreignKey: 'list_id'});
db.User.hasMany(db.Task, {foreignKey: 'owner_id'});
db.Task.belongsTo(db.User, {foreignKey: 'owner_id'});


//
db.Task.hasMany(db.FileTask,{foreignKey: 'task_id'});
db.FileTask.belongsTo(db.Task,{foreignKey: 'task_id'});

//
db.Board.belongsToMany(db.User, {through: db.BoardMember, foreignKey:'board_id'});
db.User.belongsToMany(db.Board, {through: db.BoardMember, foreignKey:'user_id'});
// Ассоциации между BoardMember и Board
db.BoardMember.belongsTo(db.Board, { foreignKey: 'board_id' });
db.Board.hasMany(db.BoardMember, { foreignKey: 'board_id' });

// Ассоциации между BoardMember и User
db.BoardMember.belongsTo(db.User, { foreignKey: 'user_id' });
db.User.hasMany(db.BoardMember, { foreignKey: 'user_id' });

//
db.User.belongsToMany(db.Task, {through: db.TaskAssignment, foreignKey:'user_id'});
db.Task.belongsToMany(db.User, {through: db.TaskAssignment, foreignKey:'task_id'});

// Ассоциации между TaskAssignment и Task
db.TaskAssignment.belongsTo(db.Task, { foreignKey: 'task_id' });
db.Task.hasMany(db.TaskAssignment, { foreignKey: 'task_id' });

// Ассоциации между TaskAssignment и User
db.TaskAssignment.belongsTo(db.User, { foreignKey: 'user_id' });
db.User.hasMany(db.TaskAssignment, { foreignKey: 'user_id' });

db.Sequelize = Sequelize;
db.sequelize = sequelize;


// sequelize.sync({force:true}).then(()=>{
//     console.log("Tables  created");
// }).catch(err=>console.log(err));

module.exports = db;