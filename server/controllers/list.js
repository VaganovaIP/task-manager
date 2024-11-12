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
        await List.findAll({
            attributes:['list_id', 'name_list'],
            where:{id_board: board_id},
        }, {raw:true}).then(board=>{
            res.status(200).json(board);
        }).catch(err=>console.log(err));
    }

}