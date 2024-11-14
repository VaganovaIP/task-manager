const List = require("../models/List")
const Board = require("../models/Board");


module.exports = {
    addList:async (req, res) => {
        const {board_id, nameList} = req.body;
        await List.create({name_list:nameList, id_board:board_id})
        res.status(200).send({ message: 'New list created'});
    },

    listsView:async (req, res)=>{
        const {board_id} = req.body;
        try{
            let list = await List.findAll({
                attributes: ['list_id', 'name_list'],
                where: {id_board: board_id},
            })

            let board = await Board.findAll({
                attributes:['board_id', 'name_board'],
                where:{owner:"306dcf05-d3d6-4b43-8e06-6b6ffe2331f2"},
                order:[['createdAt', 'DESC']],
            })

            
            await res.status(200).json({lists:list, board:board })
        } catch (err){
            console.log(err)
        }



    },

    listsViewAll:async (req, res)=>{
        const {board_id} = req.body;
        await Board.findAll({
            attributes:['board_id', 'name_board'],
            where:{owner:"306dcf05-d3d6-4b43-8e06-6b6ffe2331f2"},
            order:[['createdAt', 'DESC']],
        }, {raw:true}).then(board=>{
            res.status(200).json(board);
            console.log(board)
        }).catch(err=>console.log(err));
    }
}