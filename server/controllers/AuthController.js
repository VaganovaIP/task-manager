const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const SECRET_KEY = process.env.JWT_SECRET;

class AuthController{
    static async registerUser(req, res){
        const { username, first_name, last_name, email, password } = req.body;
        try{
            if(!email || !password || !username) {
                return res.status(400).send({message: 'заполните поля'})
            }

            if(await User.findOne({where: {email}})) {
                return res.status(401).json({ message: 'Пользователь существует' });
            }

            await User.create({user_id: uuid.v4(), username, first_name, last_name, email, password_user: bcrypt.hashSync(password, 8)})
                .then(res.status(201).send({message: 'New user created'}))
                .catch((err) => {console.log(err)})
        } catch (err){console.log(err)}

    }

    static async loginUser(req, res){
        const {email, password } = req.body;
        try{
            const user = await User.findOne({where: {email: email}});
            if(!user) {
                return res.status(404).json({ message: 'Пользователь не существует' });
            }

            const passwordIsValid = bcrypt.compareSync(password, user.password_user);
            if (!passwordIsValid) {
                return res.status(401).send({ accessToken: null, message: 'неправильный пароль' });
            }

            const accessToken = jwt
                .sign(
                    {
                        id: user.user_id,
                    },
                    SECRET_KEY,
                    { expiresIn: "1d" }
                )
            return res
                .status(200)
                .json({ message: "user logged in", accessToken: accessToken, email: email });
        } catch (err){console.log(err)}
    }
}

module.exports = AuthController