const List = require("../models/List");
require("../models/Board");
require("../models/BoardMember");


class ListController {
    static async createList(req, res) {
        const {list_id, board_id, nameList} = req.body;
        await List.create({list_id:list_id, name_list:nameList, id_board:board_id})
            .then(res.status(200).send({message: 'New list created'}))
            .catch((err) => {console.log(err)})
    }

    static async updateNameList (req, res){
        const {name_list, list_id} = req.body;
        await List.update({name_list: name_list},
            {
                where:{
                    list_id:list_id
                },
            })
            .then(res.status(200).send({message: `List ${name_list} updated`}))
            .catch((err) => {console.log(err)})
    }

    static async deleteListBoard(req, res){
        const {list_id} = req.body;
        await List.destroy({
            where:{
                list_id:list_id,
            }
        })
            .then(res.status(200).send({message: 'Delete member board'}))
            .catch((err) => {console.log(err)})
    }
}


module.exports = ListController;