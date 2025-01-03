
const { v4: uuidv4 } = require('uuid');
const Board = require('../models/Board');
const User = require('../models/User');
const BoardMember = require('../models/BoardMember');

const findUserById = async function (email){
    const user = await User.findOne({
        where:{
            email:email
        }
    })
    return (user.user_id);
}

module.exports = {
    //получение всех досок пользователя
    boardsView: async (req, res)=>{
        const user_id = req.params.user_id;
        await Board.findAll({
            attributes:['board_id', 'name_board'],
            where:{owner:"306dcf05-d3d6-4b43-8e06-6b6ffe2331f2"},
            order:[['createdAt', 'DESC']],
        }, {raw:true}).then(board=>{
            res.status(200).json(board);
        }).catch(err=>console.log(err));
    },

    //
    addBoard: async (req, res) => {
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
        res.status(200).send({ message: 'New list created'});
    },
}
