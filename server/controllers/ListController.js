const List = require("../models/List");
const Board = require("../models/Board");

async function createList(req, res) {
    const {list_id, board_id, nameList} = req.body;
    await List.create({list_id:list_id, name_list:nameList, id_board:board_id})
        .then(res.status(200).send({message: 'New list created'}))
        .catch((err) => {console.log(err)})
}

async function updateNameList (req, res){
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

module.exports = {createList, updateNameList}