const { v4: uuidv4 } = require("uuid");
const date = require('date-and-time');
const db = require("../config/db");


class TaskController {
    static async createTask(req, res) {
        const {board_id, name_task, list_id, task_id, email} = req.body;
        const value = date.format((new Date()),
            'YYYY/MM/DD HH:mm:ss');
        const user = await db.User.findOne({
            attributes:['user_id'],
            where:{
                email:email
            }
        })
        await db.Task.create({task_id, name_task, list_id, board_id:board_id, created_at:new Date(), owner_id:user.user_id})
            .then(res.status(201).send({message: 'New task created'}))
            .catch((err) => {console.log(err)})
    }

    static async saveTask (req, res){
        const {task_id, name_task,description,date_start,date_end,list_id,importance,status} = req.body;
        await db.Task.update({name_task:name_task, description:description, date_start:date_start,
                date_end:date_end, list_id:list_id, importance:importance, status:status },
            {
                where: {
                    task_id:task_id,
                },
            })
            .then(res.status(200).send({message: `Task ${name_task} updated`}))
            .catch((err) => {console.log(err)})
    }

    static async deleteTask(req, res){
        const {task_id, email} = req.body;
        await db.Task.destroy({
            where:{
                task_id:task_id,
            }
        })
        const user = await db.User.findOne({
            attributes:['user_id'],
            where:{
                email:email
            }
        })

        await db.TaskAssignment.destroy({
            where:{
                task_id:task_id,
            }
        })
            .then(res.status(204).send({message: 'Delete task'}))
            .catch((err) => {console.log(err)})
    }

    static async fetchDataTasks(req, res){
        const board_id = req.query.board_id;
        const email = req.query.email;

        try {
            let board = await db.Board.findOne({
                attributes:['name_board', 'user_id'],
                include:{model:db.User, attributes:['user_id', 'username', 'first_name', 'last_name']},
                where: {board_id: board_id},
            })

            let lists = await db.List.findAll({
                attributes: ['list_id', 'name_list'],
                where: {board_id: board_id},
                order:[['createdAt', 'ASC']],
            })

            let tasks = await db.Task.findAll({
                attributes:['task_id', 'board_id', 'name_task', 'description','date_end', 'date_start',
                    'importance', 'owner_id', 'status', 'list_id'],
                include:[
                    {model: db.List},
                    {model: db.User , attributes:['user_id', 'username', 'first_name', 'last_name']},
                    {model: db.Board},
                ],
                where:{board_id:board_id},
                order:[['createdAt', 'DESC']],
            })

            let members = await db.BoardMember.findAll({
                include:[{model: db.User, attributes:['user_id', 'username', 'first_name', 'last_name']}],
                where:{board_id:board_id}
            })

            let assignments = await db.TaskAssignment.findAll({
                attributes:['members_id', 'task_id'],
                include:[{model: db.User, attributes:['user_id', 'username', 'first_name', 'last_name']},
                    {model:db.Task,
                        where:{board_id:board_id},
                        include:[{model: db.User , attributes:['user_id', 'username', 'first_name', 'last_name']},]
                    }
                ]
            })

            let users = await db.User.findAll({
                attributes: ['user_id', 'username', 'first_name', 'last_name'],
            })

            let userAuth = await db.User.findOne({
                attributes:['user_id', 'username','email', 'first_name', 'last_name'],
                where:{
                    email:email
                }
            })

            await res.status(200).json({lists:lists, tasks:tasks, members:members,
                assignments:assignments, users:users, board:board, user:userAuth})
        } catch (err){
            console.log(err)
        }
    }

    static async fetchDataTasksAll(req, res){
        const email = req.query.email;
        try {
            const user = await db.User.findOne({
                attributes:['user_id', 'username','email', 'first_name', 'last_name'],
                where:{
                    email:email
                }
            })

            let tasks = await db.TaskAssignment.findAll({
                include:[
                    {model:db.Task, attributes:['task_id', 'board_id', 'name_task', 'description','date_end', 'date_start',
                            'importance', 'owner_id', 'status', 'list_id'],
                        include:[
                            {model: db.List},
                            {model: db.User , attributes:['user_id', 'username',
                                    'first_name', 'last_name']},
                            {model: db.Board},
                        ]
                    },
                ],
                where:{user_id:user.user_id},
            })

            await res.status(200).json({tasks:tasks, user:user})
        } catch (err){
            console.log(err)
        }
    }

}

module.exports = TaskController;

