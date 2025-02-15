const request = require("supertest");
const app = require("../../server")
const {v4: uuidv4} = require("uuid");
const db = require("../../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userID = uuidv4()
const roleID = uuidv4()
const SECRET_KEY = process.env.JWT_SECRET;
describe(('Auth controller'), () => {

    jest.mock("../../config/db", ()=> ({
        User: {
            create: jest.fn(),
            findOne: jest.fn(),
        },
        Role:{
            findOne: jest.fn(),
            create: jest.fn(),
        }
    }));
    jest.mock('bcryptjs');
    jest.mock('jsonwebtoken');

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Создание пользователя 201 (post(/register)', async () =>{
        let passwd = '1234';
        const role = {role_id: roleID, name_role:'User'};
        const userReg = { username:'user1', first_name:'f', last_name:'n',
            email:'userTest00@example.ru',
            password_user: passwd, roleId: roleID}

        jest.spyOn(db.Role, 'findOne').mockResolvedValue(role);
        jest.spyOn(db.Role, 'create').mockResolvedValue({});
        jest.spyOn(db.User, 'findOne').mockResolvedValue(null);
        jest.spyOn(db.User, 'create').mockResolvedValue(userReg);
        jest.spyOn(bcrypt, 'hashSync').mockReturnValue(passwd);

        const res = await request(app)
            .post('/register')
            .send({
                username: "user1",
                first_name: "f",
                last_name: "n",
                email: 'userTest00@example.ru',
                password: passwd
            })
        expect(db.Role.findOne).toHaveBeenCalledWith({where: { name_role:'User' }});
        expect(db.User.findOne).toHaveBeenCalledWith({where: {email: 'userTest00@example.ru'}})
        expect(db.User.create).toHaveBeenCalledWith(expect.objectContaining(userReg));
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('message', 'New user created')
    })

    it('Создание пользователя 404 Нет роли User (post(/register)', async () =>{
        jest.spyOn(db.Role, 'findOne').mockResolvedValue(null);

        const res = await request(app)
            .post('/register')
            .send({
                username: "user1",
                first_name: "f",
                last_name: "n",
                email: 'userTest00@example.ru',
                password: 'passwd'
            })
        expect(db.Role.findOne).toHaveBeenCalledWith({where: { name_role:'User' }});
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('message', 'Роль "User" не найдена в базе данных')
    })

    it('Создание пользователя. Ошибка (пользователь существует) 409 (post(/register)', async () =>{
        let passwd = '1234';
        jest.spyOn(db.User, 'findOne').mockResolvedValue('userTest00@example.ru');

        const res = await request(app)
            .post('/register')
            .send({
                username: "user1",
                first_name: "f",
                last_name: "n",
                email: 'userTest00@example.ru',
                password: passwd
            })
        expect(db.User.findOne).toHaveBeenCalledWith({where: {email: 'userTest00@example.ru'}})
        expect(res.status).toBe(409);
        expect(res.body).toHaveProperty('message', 'Пользователь существует')
    })

    it('Создание пользователя. Ошибка ввода данных 400 (post(/register)', async () =>{
        const res = await request(app)
            .post('/register')
            .send({
                username: "",
                first_name: "Ирина",
                last_name: "Ваганова",
                email: "",
                password: ""
            })
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('message', 'Нет полученных данных')
    })

    it('Авторизация пользователя 500 (post(/)', async () =>{
        const res = await request(app)
            .post('/login')
            .send({
                email: "irinaV@example.ru",
                password: "1234"
            })
        expect(res.status).toBe(500);
        expect(res.body).toHaveProperty('error', 'Internal Server Error')
    })

    it('Авторизация пользователя 200 (post(/register)', async () =>{
        let passwd = '1234';
        const user = {
            email:'userTest00@example.ru',
            password_user: passwd}
        jest.spyOn(db.User, 'findOne').mockResolvedValue(user);
        jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true);

        const res = await request(app)
            .post('/login')
            .send({
                email: 'userTest00@example.ru',
                password: passwd
            })

        expect(db.User.findOne).toHaveBeenCalledWith({where: {email: 'userTest00@example.ru'}})
        expect(bcrypt.compareSync).toHaveBeenCalledWith('1234', '1234');
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'user logged in');
    })

    it('Авторизация пользователя. Неверный пароль 401 (post(/)', async () =>{
        let passwd = '1234';
        const user = {
            email:'userTest00@example.ru',
            password_user: passwd}
        jest.spyOn(db.User, 'findOne').mockResolvedValue(user);
        jest.spyOn(bcrypt, 'compareSync').mockReturnValue(false);

        const res = await request(app)
            .post('/login')
            .send({
                email: 'userTest00@example.ru',
                password: passwd
            })

        expect(db.User.findOne).toHaveBeenCalledWith({where: {email: 'userTest00@example.ru'}})
        expect(bcrypt.compareSync).toHaveBeenCalledWith('1234', '1234');
        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('message', 'неправильный пароль');
    })

    it('Авторизация пользователя. Нет пользователя 404 (post(/)', async () =>{
        let passwd = '1234';
        jest.spyOn(db.User, 'findOne').mockResolvedValue(null);
        jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true);

        const res = await request(app)
            .post('/login')
            .send({
                email: 'userTest00@example.ru',
                password: passwd
            })

        expect(db.User.findOne).toHaveBeenCalledWith({where: {email: 'userTest00@example.ru'}})
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('message', 'Пользователь не существует');
    })

    it('Авторизация пользователя 200 (post(/register)', async () =>{
        let passwd = '1234';
        let token = 'token';
        const user = {
            email:'userTest00@example.ru',
            password_user: passwd}
        jest.spyOn(db.User, 'findOne').mockResolvedValue(user);
        jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true);
        jest.spyOn(jwt, 'sign').mockReturnValue(token);

        const res = await request(app)
            .post('/login')
            .send({
                email: 'userTest00@example.ru',
                password: passwd
            })
        expect(jwt.sign).toHaveBeenCalledWith({
                id: user.user_id},
                SECRET_KEY,
            { expiresIn: "1d"}
        )
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'user logged in');
    })
})


