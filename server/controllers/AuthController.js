const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const db = require("../config/db");
const SECRET_KEY = process.env.JWT_SECRET;

class AuthController{
    static async registerUser(req, res){
        const { username, first_name, last_name, email, password } = req.body;
        try{
            if(!email || !password || !username) {
                return res.status(400).send({message: 'Нет полученных данных'})
            }

            if(await db.User.findOne({where: {email}})) {
                return res.status(401).json({ message: 'Пользователь существует' });
            }

            const defaultRole = await db.Role.findOne({
                where: { name_role: 'User' }
            });
            if (!defaultRole) return res.status(404).send({message: 'Роль "User" не найдена в базе данных'})

            await db.User.create({user_id: uuid.v4(), username, first_name, last_name, email,
                password_user: bcrypt.hashSync(password, 8), roleId: defaultRole.role_id});
            return res.status(201).send({message: 'New user created'});
        } catch (err) {res.status(500).json({error: 'Internal Server Error'})}
    }

    static async loginUser(req, res){
        const {email, password } = req.body;
        try{
            const user = await db.User.findOne({where: {email: email}});
            if(!user) {
                return res.status(404).json({ message: 'Пользователь не существует' });
            }

            const passwordIsValid = bcrypt.compareSync(password, user.password_user);
            if (!passwordIsValid) {
                return res.status(401).send({ accessToken: null, message: 'неправильный пароль' });
            }

            const accessToken = jwt.sign({
                        id: user.user_id},
                        SECRET_KEY,
                { expiresIn: "1d" })

            if (!accessToken) res.status(401).send({ accessToken: null, message: 'Ошибка формирования токена' })

            return res.status(200).json({ message: "user logged in", accessToken: accessToken, email: email });
        } catch (err) {res.status(500).json({error: 'Internal Server Error'})}
    }
}

module.exports = AuthController