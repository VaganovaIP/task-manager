const BoardMembers = require("../models/BoardMember");


class MemberController{
    static async addMemberBoard(req, res){
        const {user_id, board_id} = req.body;
        await BoardMembers.create({user_id, board_id})
            .then(res.status(200).send({message: 'New member created'}))
            .catch((err) => {console.log(err)})
    }

    static async deleteMemberBoard(req, res){
        const {members_id} = req.body;
        await BoardMembers.destroy({
                where:{
                    members_id:members_id
                }
        })
            .then(res.status(200).send({message: 'Delete member board'}))
            .catch((err) => {console.log(err)})
    }

}

module.exports = MemberController;

