const List = require("../models/List")
const Board = require("../models/Board");
const Task = require("../models/Task");
const User = require("../models/User");
const BoardMembers = require("../models/BoardMember");
const TaskAssignment = require("../models/TaskAssignment");
const { v4: uuidv4 } = require("uuid");
const date = require('date-and-time');
const ListController = require("./ListController");
const {addAssignments} = require("./AssignmentController");
const MemberController = require("./MemberController");
const BoardController = require("./BoardController");
const AssignmentController = require("./AssignmentController");
const FilesTaskController = require("./FilesTaskController");
const path = require("path");


async function createTask(req, res) {
    const {board_id, name_task, list_id, task_id, email} = req.body;
    const value = date.format((new Date()),
        'YYYY/MM/DD HH:mm:ss');
    const user = await User.findOne({
        attributes:['user_id'],
        where:{
            email:email
        }
    })
    await Task.create({task_id, name_task, list_id, board_id, created_at:new Date(), owner_id:user.user_id})
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

async function deleteTask(req, res){
    const {task_id, email} = req.body;
    await Task.destroy({
        where:{
            task_id:task_id,
        }
    })
    const user = await User.findOne({
        attributes:['user_id'],
        where:{
            email:email
        }
    })

    await TaskAssignment.destroy({
        where:{
            task_id:task_id,
        }
    })
        .then(res.status(200).send({message: 'Delete task'}))
        .catch((err) => {console.log(err)})
}


class TaskController {
    static async postActions(req, res){
        const {formName} = req.body;
        switch (formName){
            case "form-add-list":
                await ListController.createList(req, res);
                break;
            case "form-add-task":
                await createTask(req, res);
                break;
            case "form-add-assignments":
                await addAssignments(req, res);
                break;
            case "form-add-members":
                await MemberController.addMemberBoard(req, res);
                break;
            case "form-upload-file":
                await FilesTaskController.uploadFile(req, res);
                break;
        }
    }

    static async putActions(req, res){
        const {formName} = req.body;
        switch (formName) {
            case "form-update-board":
                await BoardController.updateNameBoard(req, res);
                break;
            case "form-update-list":
                await ListController.updateNameList(req, res);
                break;
            case "form-save-task":
                await saveTask(req, res);

        }
    }

    static async deleteActions(req, res) {
        const {formName} = req.body;
        switch (formName) {
            case "form-delete-assignment":
                await AssignmentController.deleteAssignmentTask(req, res);
                break;
            case "form-delete-member":
                await MemberController.deleteMemberBoard(req, res);
                break;
            case "form-delete-task":
                await deleteTask(req, res);
                break;
            case "form-delete-list":
                await ListController.deleteListBoard(req, res);
                break;
        }
    }
    static async fetchDataTasks(req, res){
        const board_id = req.query.board_id;
        const email = req.query.email;

        try {
            let board = await Board.findOne({
                attributes:['name_board', 'owner'],
                include:{model:User, attributes:['user_id', 'username', 'first_name', 'last_name']},
                where: {board_id: board_id},
            })

            let lists = await List.findAll({
                attributes: ['list_id', 'name_list'],
                where: {id_board: board_id},
                order:[['createdAt', 'ASC']],
            })

            let tasks = await Task.findAll({
                attributes:['task_id', 'board_id', 'name_task', 'description','date_end', 'date_start',
                    'importance', 'owner_id', 'status', 'list_id'],
                include:[
                    {model: List},
                    {model: User , attributes:['user_id', 'username', 'first_name', 'last_name']},
                    {model: Board},
                ],
                where:{board_id:board_id},
                order:[['createdAt', 'DESC']],
            })

            let members = await BoardMembers.findAll({
                include:[{model: User, attributes:['user_id', 'username', 'first_name', 'last_name']}],
                where:{board_id:board_id}
            })

            let assignments = await TaskAssignment.findAll({
                attributes:['members_id', 'task_id'],
                include:[{model: User, attributes:['user_id', 'username', 'first_name', 'last_name']},
                    {model:Task,
                        where:{board_id:board_id},
                        include:[{model: User , attributes:['user_id', 'username', 'first_name', 'last_name']},]
                    }
                ]
            })

            let users = await User.findAll({
                attributes: ['user_id', 'username', 'first_name', 'last_name'],
            })

            const userAuth = await User.findOne({
                attributes:['user_id', 'username','email', 'first_name', 'last_name'],
                where:{
                    email:email
                }
            })
            // const fileP = path.join(__dirname, '../uploads', 'giphy.gif');
            // res.download(fileP, 'giphy.gif',(err)=>{
            //     console.log(err)
            // })
            // console.log(fileP)
            await res.status(200).json({lists:lists, tasks:tasks, members:members,
                                           assignments:assignments, users:users, board:board, user:userAuth})
        } catch (err){
            console.log(err)
        }
    }

    static async fetchDataTasksAll(req, res){
        const email = req.query.email;

        try {
            const user = await User.findOne({
                attributes:['user_id', 'username','email', 'first_name', 'last_name'],
                where:{
                    email:email
                }
            })
            //вывод задач из таблицы Assignments, где есть user
            let tasks = await TaskAssignment.findAll({
                include:[
                    {model:Task, attributes:['task_id', 'board_id', 'name_task', 'description','date_end', 'date_start',
                            'importance', 'owner_id', 'status', 'list_id'],
                        include:[
                            {model: List},
                            {model: User , attributes:['user_id', 'username', 'first_name', 'last_name']},
                            {model: Board},
                        ]
                    },
                ],
                where:{user_id:user.user_id},
            })
            // const fileP = path.join(__dirname, '../uploads', 'giphy.gif');
            // res.download(fileP, 'giphy.gif',(err)=>{
            //     console.log(err)
            // })
            await res.status(200).json({tasks:tasks, user:user})
        } catch (err){
            console.log(err)
        }
    }

}

module.exports = TaskController;

