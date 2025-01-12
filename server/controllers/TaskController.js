const List = require("../models/List")
const Board = require("../models/Board");
const Task = require("../models/Task");
const User = require("../models/User");
const BoardMembers = require("../models/BoardMember");
const TaskAssignment = require("../models/TaskAssignment");
const { v4: uuidv4 } = require("uuid");
const date = require('date-and-time');
const {createList} = require("./ListController");
const {addAssignments} = require("./AssignmentController");
const {addMemberBoard} = require("./MemberContoller");
const {updateNameBoard} = require("./BoardController");


async function createTask(req, res) {
    const {board_id, name_task, list_id, task_id} = req.body;
    const value = date.format((new Date()),
        'YYYY/MM/DD HH:mm:ss');
    await Task.create({task_id, name_task, list_id, board_id, created_at:new Date()})
        .then(res.status(200).send({message: 'New task created'}))
        .catch((err) => {console.log(err)})
}

async function saveTask (req, res){
    const {task_id, name_task,description,date_start,date_end,list_id,importance,status} = req.body;
    await Task.update({name_task:name_task, description:description, date_start:date_start,
            date_end:date_end, list_id:list_id, importance:importance, status:status },
        {
            where: {
                task_id:task_id,
            },
        })
        .then(res.status(200).send({message: `Task ${name_task} updated`}))
        .catch((err) => {console.log(err)})
}


module.exports = {
    postActions:async (req, res) => {
        const {formName} = req.body;
        switch (formName){
            case "form-add-list":
                await createList(req, res);
                break;
            case "form-add-task":
                await createTask(req, res);
                break;
            case "form-add-assignments":
                await addAssignments(req, res);
                break;
            case "form-add-members":
                await addMemberBoard(req, res);
                break;
        }
    },

    putActions:async (req, res) =>{
        const {formName} = req.body;
        switch (formName) {
            case "form-update-board":
                await updateNameBoard(req, res);
                break;
            case "form-save-task":
                await saveTask(req, res);

        }
    },


    //get
    fetchDataTasks:async (req, res)=>{
        const board_id = req.query.id;
        try{
            let board = await Board.findOne({
                attributes:['name_board'],
                where: {board_id: board_id},
            })

            let lists = await List.findAll({
                attributes: ['list_id', 'name_list'],
                where: {id_board: board_id},
            })

            let tasks = await Task.findAll({
                attributes:['task_id', 'board_id', 'name_task', 'description','date_end', 'date_start',
                     'importance', 'owner_id', 'status', 'list_id'],
                include:[
                        {model: List},
                        {model: User , attributes:['user_id', 'username']},
                        {model: Board},
                ],
                where:{board_id:board_id},
            })

            let members = await BoardMembers.findAll({
                include:[{model: User, attributes:['user_id', 'username']}],
                where:{board_id:board_id}
            })

            let assignments = await TaskAssignment.findAll({
                include:[{model: User, attributes:['user_id', 'username']},
                         {model:Task,
                             where:{board_id:board_id},
                          include:[{model: User , attributes:['user_id', 'username']},]
                         }
                ]
            })

            let users = await User.findAll({
                attributes: ['user_id', 'username'],
            })

            console.log(board.name_board)
            await res.status(200).json({lists:lists, tasks:tasks, members:members,
                                        assignments:assignments, users:users, board:board})
        } catch (err){
            console.log(err)
        }
    },

}

