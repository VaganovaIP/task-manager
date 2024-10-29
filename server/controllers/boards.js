const Board = require('../models/Board');

module.exports = {
    //получение всех досок пользователя
    getBoards: async (req, res)=>{
        const user_id = req.params.user_id;
        Board.findAll({
            attributes:['name_board'],
            where:{owner:"306dcf05-d3d6-4b43-8e06-6b6ffe2331f2"},
        }, {raw:true}).then(board=>{
            res.status(200).json(board);
        }).catch(err=>console.log(err));
    },

    //
    addBoard: async (req, res) => {
        console.log("Console  ");
        console.log(req.body);
        const { first_name } = req.body;


        // const {firstName} = req.body;
        // const owner = "306dcf05-d3d6-4b43-8e06-6b6ffe2331f2";
        // console.log(firstName);
        res.redirect("/boards");
        const board_id = "306dcf05-d3d6-4b43-8e06-6b6ffe2331f1";
        // await Board.create({ board_id: board_id, name_board:nameBoard, owner: owner})
        //     .then(() => {
        //         res.redirect("/boards");
        //     })
    },


}
