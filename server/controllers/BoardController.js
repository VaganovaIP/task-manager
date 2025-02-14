const { v4: uuidv4 } = require('uuid');
const db = require("../config/db");

class BoardController{
    static async  fetchDataBoards(req, res){
        const email = req.query.email;
        const user = await db.User.findOne({
            attributes:['user_id', 'username','email', 'first_name', 'last_name'],
            where:{email:email} })
        if (user){
            let boards =  await db.BoardMember.findAll({
                include:[{model: db.Board}],
                where:{user_id:user.user_id},
            })
            if (boards) await res.status(200).json({boards:boards, user:user})
        } else {
            res.status(404).send({ message: 'Email not found'})
        }
    }

    static async addBoard(req, res){
        const { board_id, name_board, email } = req.body;
        if(!board_id) return res.status(400).send({ message: 'Id not found'})
        const user = await db.User.findOne({
            attributes:['user_id', 'username','email'],
            where:{ email:email }
        })
        if (user){
                await db.Board.create({board_id, name_board, user_id: user.user_id})
                await db.BoardMember.create({
                    user_id: user.user_id,
                    board_id: board_id
                })
                res.status(201).send({ message: 'New board created'})
        } else {
            res.status(404).send({ message: 'Email not found'})
        }
    }

    static async updateNameBoard(req, res){
        const {name_board, board_id} = req.body;
        if(!board_id) res.status(400).send({ message: 'Id not found'})
        try{
            await db.Board.update({name_board: name_board}, {
                where:{ board_id: board_id }
            })
            await res.status(200).send({ message: 'Update board'})
        } catch (err) {res.status(500).json({error: 'Internal Server Error'})}
    }

    static async deleteBoard(req, res){
        const board_id = req.query.board_id;
        try{
            await db.Board.destroy({
                where:{board_id: board_id}
            })
            await db.BoardMember.destroy({
                where:{ board_id: board_id }
            })
            await res.status(204).send({message: 'Delete board' })
        } catch (err){ res.status(404).send({message: 'Board not found' })}
    }
}

module.exports = BoardController;
