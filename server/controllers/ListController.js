const db = require("../config/db");


class ListController {
    static async createList(req, res) {
        const {list_id, board_id, nameList} = req.body;
        await db.List.create({list_id:list_id, name_list:nameList, board_id:board_id})
            .then(res.status(201).send({message: 'New list created'}))
            .catch((err) => {console.log(err)})
    }

    static async updateNameList (req, res){
        const {name_list, list_id} = req.body;
        await db.List.update({name_list: name_list},
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
        await db.List.destroy({
            where:{
                list_id:list_id,
            }
        })
            .then(res.status(204).send({message: 'Delete member board'}))
            .catch((err) => {console.log(err)})
    }
}


module.exports = ListController;