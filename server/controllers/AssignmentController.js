const TaskAssignment = require("../models/TaskAssignment");

class AssignmentController{
    static async addAssignments(req, res){
        const {user_id, task_id} = req.body;
        await TaskAssignment.create({user_id, task_id})
            .then(res.status(200).send({message: 'New assignment created'}))
            .catch((err) => {console.log(err)})
    }

    static async deleteAssignmentTask(req, res){
        const {members_id} = req.body;
        await TaskAssignment.destroy({
            where:{
                members_id:members_id
            }
        })
            .then(res.status(200).send({message: 'Delete assignment task'}))
            .catch((err) => {console.log(err)})
    }
}

module.exports = AssignmentController;
