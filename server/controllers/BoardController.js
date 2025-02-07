const { v4: uuidv4 } = require('uuid');
const db = require("../config/db");


class BoardController{
    static async  fetchDataBoards(req, res){
        const email = req.query.email;
        try{
            const user = await db.User.findOne({
                attributes:['user_id', 'username','email', 'first_name', 'last_name'],
                where:{
                    email:email
                }
            })
            let boards =  await db.BoardMember.findAll({
                include:[
                    {model: db.Board},
                ],
                where:{user_id:user.user_id},
            })
            await res.status(200).json({boards:boards, user:user})
        }  catch (err){
            console.log(err)
        }
    }

    static async addBoard(req, res){
        const { board_id, name_board, email } = req.body;
        const user = await db.User.findOne({
            attributes:['user_id', 'username','email'],
            where:{
                email:email
            }
        })
        await db.Board.create({board_id, name_board, user_id: user.user_id})
        await db.BoardMember.create({
            user_id: user.user_id,
            board_id: board_id
        })
        .then(res.status(201).send({ message: 'New list created'}))
        .catch((err) => {console.log(err)})
    }

    static async updateNameBoard(req, res){
        const {name_board, board_id} = req.body;
        await db.Board.update({name_board: name_board},
            {
                where:{
                    board_id:board_id
                },
            })
            .then(res.status(200).send({message: `Board ${name_board} updated`}))
            .catch((err) => {console.log(err)})
    }

    static async deleteBoard(req, res){
        const board_id = req.query.board_id;
        try{
            await db.Board.destroy({
                where:{
                    board_id:board_id,
                }
            })
            await db.BoardMember.destroy({
                where:{
                    board_id:board_id,
                }
            }).then(res.status(204).send({message: 'Delete board' }))
        } catch (err){
            console.log(err)
        }
    }
}

module.exports = BoardController;
