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
    const user_id = req.params.user_id;
    await Board.findAll({
                            attributes:['board_id', 'name_board'],
                            where:{owner:"306dcf05-d3d6-4b43-8e06-6b6ffe2331f2"},
                            order:[['createdAt', 'DESC']],
                        }, {raw:true})
        .then(board=>{res.status(200).json(board)})
        .catch(err=>console.log(err));
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
        const {board_id} = req.body;
        await Board.destroy({
            where:{
                board_id:board_id,
            }
        })
            .then(res.status(200).send({message: 'Delete board'}))
            .catch((err) => {console.log(err)})
    }
}

module.exports = BoardController;
