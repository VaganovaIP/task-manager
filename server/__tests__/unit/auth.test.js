const request = require("supertest");
const app = require("../../server")
const {v4: uuidv4} = require("uuid");
const userID = "25e13d64-a8d4-4a6f-bd1a-8463f728690b"

describe(('Auth controller'), () => {

    it('Создание пользователя 201 (post(/register)', async () =>{
        await request(app)
            .post('/register')
            .send({
                username: "user6",
                first_name: "",
                last_name: "",
                email: "user12@example.ru",
                password: "1234"
            })
            .expect(201)
    })

    it('Создание пользователя. Ошибка ввода данных 400 (post(/register)', async () =>{
        await request(app)
            .post('/register')
            .send({
                username: "",
                first_name: "Ирина",
                last_name: "Ваганова",
                email: "irinaV@example.ru",
                password: ""
            })
            .expect(400)
    })

    it('Создание пользователя. Ошибка (пользователь существует) 401 (post(/register)', async () =>{
        await request(app)
            .post('/register')
            .send({
                username: "user3",
                first_name: "Ирина",
                last_name: "Ваганова",
                email: "irinaV@example.ru",
                password: "1234"
            })
            .expect(401)
    })

    it('Создание пользователя. Отсутствует роль User в бд 404 (post(/register)', async () =>{
        await request(app)
            .post('/register')
            .send({
                username: "user3",
                first_name: "Ирина",
                last_name: "Ваганова",
                email: "irinaV@example.ru",
                password: "1234"
            })
            .expect(404)
    })

    it('Авторизация пользователя 200 (ok) (post(/register)', async () =>{
        await request(app)
            .post('/login')
            .send({
                email: "irinaV@example.ru",
                password: "1234"
            })
            .expect(200)
    })

    it('Авторизация пользователя. Неверный пароль 401 (post(/register)', async () =>{
        await request(app)
            .post('/login')
            .send({
                email: "irinaV@example.ru",
                password: "0000"
            })
            .expect(401)
    })

    it('Авторизация пользователя. Нет пользователя 404 (post(/register)', async () =>{
        await request(app)
            .post('/login')
            .send({
                email: "notBD@example.ru",
                password: "1234"
            })
            .expect(404)
    })
})