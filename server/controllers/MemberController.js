const db = require("../config/db");


class MemberController{
    static async addMemberBoard(req, res){
        const {user_id, board_id} = req.body;
        if (user_id && board_id){
            try{
                await db.BoardMember.create({board_id:board_id, user_id:user_id});
                await res.status(201).send({message: 'New member created'});
            } catch (err) {res.status(500).json({error: 'Internal Server Error'})}
        } else res.status(400).send({ message: 'Id not found'})
    }

    static async deleteMemberBoard(req, res){
        const {member_id} = req.body;
        if(member_id){
            try{
                await db.BoardMember.destroy({where:{ members_id:member_id }})
                await res.status(204).send({message: 'Delete member board'});
            } catch (err) {res.status(500).json({error: 'Internal Server Error'})};
        } else res.status(400).send({ message: 'Id not found'})
    }

}

module.exports = MemberController;

