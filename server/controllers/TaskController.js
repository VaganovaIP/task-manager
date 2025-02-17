const { v4: uuidv4 } = require("uuid");
const date = require('date-and-time');
const db = require("../config/db");


class TaskController {
    static async createTask(req, res) {
        const {board_id, name_task, list_id, task_id, email, text_event} = req.body;
        const value = date.format((new Date()),
            'YYYY/MM/DD HH:mm:ss');
        const user = await db.User.findOne({
            attributes:['user_id'],
            where:{ email:email}
        })
        if(user){
            try{
                const task = await db.Task.findOne({where: {task_id: task_id}});
                if (!task) {
                    await db.Task.create({task_id, name_task, list_id, board_id:board_id, created_at:new Date(), owner_id:user.user_id});
                    await db.History.create({
                            event_id: uuidv4(),
                            text_event: text_event,
                            task_id: task_id
                        })
                    await res.status(201).send({message: 'New task created'});
                } else return res.status(409).json({ message: 'Задача существует' });
            } catch (err) {res.status(500).json({error: 'Internal Server Error'})}
        } else {
            res.status(404).send({ message: 'Email not found'})
        }
    }

    static async saveTask (req, res){
        const {task_id, name_task,description,date_start,date_end,list_id,importance,status, statusEdit, text_event} = req.body;
        if (task_id){
            try{
                await db.Task.update({name_task:name_task, description:description, date_start:date_start,
                        date_end:date_end, list_id:list_id, importance:importance, status:status },
                    { where: {task_id: task_id}});
                if(statusEdit){
                    await db.History.create({
                        event_id: uuidv4(),
                        text_event: text_event,
                        task_id: task_id
                    })
                }
                await res.status(200).send({message: `Task ${name_task} updated`})
            } catch (err) {res.status(500).json({error: 'Internal Server Error'})}
        } else res.status(400).send({ message: 'TaskId not found'});
    }

    static async deleteTask(req, res){
        const {task_id} = req.body;
        if (task_id){
            try{
                await db.Task.destroy({where:{task_id:task_id}});
                await db.TaskAssignment.destroy({where:{ task_id:task_id}});
                await res.status(204).send({message: 'Delete task'});
            } catch (err) {res.status(500).json({error: 'Internal Server Error'})}
        } else res.status(400).send({ message: 'TaskId not found'});
    }

    static async fetchDataTasks(req, res){
        const board_id = req.query.board_id;
        const email = req.query.email;
        if(!board_id || !email) return res.status(400).send({ message: 'Data not found'});
        try {
            let board = await db.Board.findOne({
                attributes:['name_board', 'user_id'],
                include:{model:db.User, attributes:['user_id', 'username', 'first_name', 'last_name']},
                where: {board_id: board_id},
            })
            if(!board) return res.status(404).send({ message: 'Data not found'});

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
                    {model: db.Board}],
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
                    }]})

            let users = await db.User.findAll({
                attributes: ['user_id', 'username', 'first_name', 'last_name'],
            })

            let userAuth = await db.User.findOne({
                attributes:['user_id', 'username','email', 'first_name', 'last_name'],
                where:{email:email}
            })
            if(!userAuth) return res.status(404).send({ message: 'Data not found'});
            return await res.status(200).json({lists:lists, tasks:tasks, members:members,
                assignments:assignments, users:users, board:board, user:userAuth})
        } catch (err) {res.status(500).json({error: 'Internal Server Error'})}

    }

    static async fetchDataTasksAll(req, res){
        const email = req.query.email;
        let tasks;
        try {
            let user = await db.User.findOne({
                attributes:['user_id', 'username','email', 'first_name', 'last_name'],
                where:{email:email}
            })
            if(user){
                tasks = await db.TaskAssignment.findAll({
                    include:[
                        {model:db.Task, attributes:['task_id', 'board_id', 'name_task', 'description','date_end', 'date_start',
                                'importance', 'owner_id', 'status', 'list_id'],
                            include:[
                                {model: db.List},
                                {model: db.User , attributes:['user_id', 'username',
                                        'first_name', 'last_name']},
                                {model: db.Board}]}],
                    where:{user_id:user.user_id},
                })
                await res.status(200).json({tasks:tasks, user:user})
            } else return res.status(404).send({ message: 'Email not found'});
        } catch (err) {res.status(500).json({error: 'Internal Server Error'})}
    }
}

module.exports = TaskController;

