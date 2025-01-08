const TaskAssignment = require("../models/TaskAssignment");

async function addAssignments(req, res){
    const {user_id, task_id} = req.body;
    await TaskAssignment.create({user_id, task_id})
        .then(res.status(200).send({message: 'New assignment created'}))
        .catch((err) => {console.log(err)})
}


module.exports = {addAssignments}
