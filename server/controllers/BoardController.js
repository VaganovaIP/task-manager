const { v4: uuidv4 } = require('uuid');
const Board = require('../models/Board');
const User = require('../models/User');
const BoardMember = require('../models/BoardMember');
const List = require("../models/List");

const findUserById = async function (email){
    const user = await User.findOne({
        where:{
            email:email
        }
    })
    return (user.user_id);
}

class BoardController{
    static async  fetchDataBoards(req, res){
        const email = req.query.email;
        try{
            const user = await User.findOne({
                attributes:['user_id', 'username','email', 'first_name', 'last_name'],
                where:{
                    email:email
                }
            })
            let boards =  await BoardMember.findAll({
                include:[
                    {model: Board},
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
        const user = await User.findOne({
            attributes:['user_id', 'username','email'],
            where:{
                email:email
            }
        })
        await Board.create({board_id, name_board, owner: user.user_id})
        await BoardMember.create({
            user_id:user.user_id,
            board_id
        })
        .then(res.status(200).send({ message: 'New list created'}))
        .catch((err) => {console.log(err)})
    }

    static async updateNameBoard(req, res){
        const {name_board, board_id} = req.body;
        console.log(name_board)
        await Board.update({name_board: name_board},
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
            await Board.destroy({
                where:{
                    board_id:board_id,
                }
            })
            await BoardMember.destroy({
                where:{
                    board_id:board_id,
                }
            }).then(res.status(200).send({message: 'Delete board' }))
        } catch (err){
            console.log(err)
        }
    }
}

module.exports = BoardController;
