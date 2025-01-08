const List = require("../models/List");

async function createList(req, res) {
    const {board_id, nameList} = req.body;
    await List.create({name_list:nameList, id_board:board_id})
        .then(res.status(200).send({message: 'New list created'}))
        .catch((err) => {console.log(err)})
}

module.exports = {createList}