const db = require("../config/db");

class AssignmentController{
    static async addAssignments(req, res){
        const {user_id, task_id} = req.body;
        if (user_id || task_id){
            try{
                const member = await db.TaskAssignment.create({user_id, task_id});
                await res.status(201).send({id: member.members_id, message: 'New assignment created'})
            } catch (err) {res.status(500).json({ error: 'Internal Server Error'})}
        } else res.status(400).send({ message: 'Id not found'})
    }

    static async deleteAssignmentTask(req, res){
        const {assignment_id} = req.body;
        if(assignment_id){
            try{
                await db.TaskAssignment.destroy({ where:{ members_id:assignment_id }});
                await res.status(204).send({ message: 'Delete assignment task'});
            } catch (err) {res.status(500).json({error: 'Internal Server Error'})};
        } else res.status(400).send({ message: 'Id not found'})
    }
}
module.exports = AssignmentController;
