const db = require("../config/db");

class AssignmentController{
    static async addAssignments(req, res){
        const {user_id, task_id} = req.body;
        await db.TaskAssignment.create({user_id, task_id})
            .then(res.status(201).send({message: 'New assignment created'}))
            .catch((err) => {console.log(err)})
    }

    static async deleteAssignmentTask(req, res){
        const {assignment_id} = req.body;
        await db.TaskAssignment.destroy({
            where:{
                members_id:assignment_id
            }
        })
            .then(res.status(204).send({message: 'Delete assignment task'}))
            .catch((err) => {console.log(err)})
    }
}

module.exports = AssignmentController;
