const db = require("../config/db");


class UserController{
    static async updateDataUser(req, res){
        const {user_id, username, first_name, last_name} = req.body;
        await db.User.update({username:username, first_name:first_name, last_name:last_name},
            {
                where:{
                    user_id:user_id
                },
            })
            .then(res.status(200).send({message: `User ${username} updated`}))
            .catch((err) => {console.log(err)})
    }
}

module.exports = UserController