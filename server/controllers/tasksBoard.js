const List = require("../models/List")
const Board = require("../models/Board");
const Task = require("../models/Task");
const User = require("../models/User");
const BoardMembers = require("../models/BoardMember");
const TaskAssignment = require("../models/TaskAssignment");
const {values} = require("pg/lib/native/query");
const { v4: uuidv4 } = require("uuid");

async function createTask(req, res) {
    const {board_id, date_end, date_start,
        description, importance, list_id,
        name_task, owner_id, status} = req.body;
    await Task.create({
        task_id: uuidv4(), board_id, date_end, date_start,
        description, importance, list_id,
        name_task, owner_id, status
    }).then(
        res.status(200).send({message: 'New task created'})
    ).catch((err) => {console.log(err)})
}

async function createList(req, res) {
    const {board_id, nameList} = req.body;
    await List.create({name_list:nameList, id_board:board_id})
        .then(res.status(200).send({message: 'New list created'}))
        .catch((err) => {console.log(err)})
}

async function createTask(req, res) {
    const {board_id, name_task, list_id} = req.body;
    await Task.create({task_id:uuidv4(), name_task, list_id, board_id, created_at:new Date()})
        .then(res.status(200).send({message: 'New task created'}))
        .catch((err) => {console.log(err)})
}



async function addAssignments(req, res){
    const {user_id, task_id} = req.body;
    await TaskAssignment.create({user_id, task_id})
        .then(res.status(200).send({message: 'New assignment created'}))
        .catch((err) => {console.log(err)})
}

module.exports = {
    createListTask:async (req, res) => {
        const {formName} = req.body;
        switch (formName){
            case "form-add-lis":
                await createList(req, res);
                break;
            case "form-add-task":
                await createTask(req, res);
                break;
            case "form-add-assignments":
                await addAssignments(req, res);
                break;
        }
    },

    tasksView:async (req, res)=>{
        const board_id = req.query.id;
        try{
            let list = await List.findAll({
                attributes: ['list_id', 'name_list'],
                where: {id_board: board_id},
            })

            let tasks = await Task.findAll({
                attributes:['task_id', 'board_id', 'name_task', 'description','date_end', 'date_start',
                     'importance', 'owner_id', 'status', 'list_id'],
                include:[
                        {model: List},
                        {model: User},
                        {model: Board},
                ],
                where:{board_id:board_id},
            })

            let members = await BoardMembers.findAll({
                include:[{model: User}],
                where:{board_id:board_id}
            })

            let assignments = await TaskAssignment.findAll({
                include:[{model: User},
                         {model:Task,
                             where:{board_id:board_id},
                          include:[{model: User},]
                         }
                ]
            })
            await res.status(200).json({lists:list, tasks:tasks, members:members, assignments:assignments})
        } catch (err){
            console.log(err)
        }
    },

    listsViewAll:async (req, res)=>{
        const {board_id} = req.body.board_id;
        await Board.findAll({
            attributes:['board_id', 'name_board'],
            where:{owner:"306dcf05-d3d6-4b43-8e06-6b6ffe2331f2"},
            order:[['createdAt', 'DESC']],
        }, {raw:true}).then(board=>{
            res.status(200).json(board);
            console.log(board)
        }).catch(err=>console.log(err));
    },

    saveTask:async (req, res)=>{
        const {task_id, name_task,description,date_start,date_end,list_id,importance,status} = req.body;
        await Task.update({name_task, description, date_start, date_end, list_id, importance, status}, {
            where: {
                task_id:task_id
            }})
            .then(res.status(200).send({message: `Task ${name_task} updated`}))
            .catch((err) => {console.log(err)})
    },
}