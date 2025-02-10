const db = require("../config/db");


class UserController{
    static async updateDataUser(req, res){
        const {user_id, username, first_name, last_name} = req.body;
        if (user_id && username){
            try{
                await db.User.update({username:username, first_name:first_name, last_name:last_name},
                    { where:{ user_id:user_id }});
                await res.status(200).send({message: `User ${username} updated`});
            } catch (e) {res.status(500).json({error: 'Internal Server Error'})}
        } else {
            await res.status(400).send({ message: 'Data not found'})
        }
    }
}

module.exports = UserController