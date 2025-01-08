const BoardMembers = require("../models/BoardMember");

async function addMemberBoard(req, res){
    const {user_id, board_id} = req.body;
    await BoardMembers.create({user_id, board_id})
        .then(res.status(200).send({message: 'New member created'}))
        .catch((err) => {console.log(err)})
}

module.exports = {addMemberBoard}