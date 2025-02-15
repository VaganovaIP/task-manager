const request = require("supertest");
const app = require("../../server")
const {v4: uuidv4} = require("uuid");
const db = require("../../config/db");
const roleID = uuidv4()

describe(('Auth controller'), () => {

    beforeAll(async () => {
        // await db.Role.create({ role_id: roleID, name_role: 'User' });
    })

    afterAll(async () => {
        await db.User.destroy({ where: {email: "userTest04@example.ru"} });
    });

    it('Создание пользователя 201 (post(/register)', async () =>{
        const res = await request(app)
            .post('/register')
            .send({
                username: "user",
                first_name: "",
                last_name: "",
                email: "userTest04@example.ru",
                password: "1234"
            })
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('message', 'New user created')

        const user = await db.User.findOne({ where: { email: 'userTest04@example.ru' } });
        expect(user).not.toBeNull();
        expect(user.username).toBe('user');
    })

    it('Создание пользователя. Ошибка ввода данных 400 (post(/register)', async () =>{
        const res = await request(app)
            .post('/register')
            .send({
                username: "",
                first_name: "Ирина",
                last_name: "Ваганова",
                email: "irinaV@example.ru",
                password: ""
            })
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('message', 'Нет полученных данных')
    })

    it('Создание пользователя. Ошибка (пользователь существует) 409 (post(/register)', async () =>{
        const res = await request(app)
            .post('/register')
            .send({
                username: "user3",
                first_name: "Ирина",
                last_name: "Ваганова",
                email: "irinaV@example.ru",
                password: "1234"
            })
        expect(res.status).toBe(409);
        expect(res.body).toHaveProperty('message', 'Пользователь существует')
    })

    // it('Создание пользователя. Отсутствует роль User в бд 404 (post(/register)', async () =>{
    //     await db.Role.destroy({where:{ name_role: 'User'}});
    //     const res = await request(app)
    //         .post('/register')
    //         .send({
    //             username: "user3",
    //             first_name: "Ирина",
    //             last_name: "Ваганова",
    //             email: "irinaV@example.ru",
    //             password: "1234"
    //         })
    //     expect(res.status).toBe(404);
    //     expect(res.body).toHaveProperty('message', 'Роль "User" не найдена в базе данных')
    //     await db.Role.create({ role_id: uuidv4(), name_role: 'User' });
    // })

    it('Авторизация пользователя 200 (ok) (post(/)', async () =>{
        const res = await request(app)
            .post('/login')
            .send({
                email: "irinaV@example.ru",
                password: "1234"
            })
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'user logged in')
    })

    it('Авторизация пользователя. Неверный пароль 401 (post(/)', async () =>{
        const res = await request(app)
            .post('/login')
            .send({
                email: "irinaV@example.ru",
                password: "0000"
            })
        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('message', 'неправильный пароль')
    })

    it('Авторизация пользователя. Нет пользователя 404 (post(/)', async () =>{
        const res = await request(app)
            .post('/login')
            .send({
                email: "notBD@example.ru",
                password: "1234"
            })
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('message', 'Пользователь не существует');
    })
})