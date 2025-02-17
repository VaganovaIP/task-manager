const db = require("../config/db");
const {v4: uuidv4} = require("uuid");

class AssignmentController{
    static async addAssignments(req, res){
        const {user_id, task_id, text_event} = req.body;
        if (user_id || task_id){
            try{
                const member = await db.TaskAssignment.create({user_id, task_id});
                await db.History.create({
                    event_id: uuidv4(),
                    text_event: text_event,
                    task_id: task_id
                })
                await res.status(201).send({id: member.members_id, message: 'New assignment created'})
            } catch (err) {res.status(500).json({ error: 'Internal Server Error'})}
        } else res.status(400).send({ message: 'Id not found'})
    }

    static async deleteAssignmentTask(req, res){
        const {assignment_id, task_id, text_event} = req.body;
        if(assignment_id){
            try{
                await db.TaskAssignment.destroy({ where:{ members_id:assignment_id }});
                await db.History.create({
                    event_id: uuidv4(),
                    text_event: text_event,
                    task_id: task_id
                })
                await res.status(204).send({ message: 'Delete assignment task'});
            } catch (err) {res.status(500).json({error: 'Internal Server Error'})};
        } else res.status(400).send({ message: 'Id not found'})
    }
}
module.exports = AssignmentController;
