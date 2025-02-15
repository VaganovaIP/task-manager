const jwt = require("jsonwebtoken");
const request = require("supertest");
const app = require("../../server")
const SECRET_KEY = process.env.JWT_SECRET;
const {v4: uuidv4} = require("uuid");
const db = require("../../config/db");
const userID = uuidv4()
describe(('User controller'), () => {
    let accessToken;

    beforeEach(() => {
        accessToken = jwt
            .sign({
                    id: "25e13d64-a8d4-4a6f-bd1a-8463f728690b", username: "user1",
                    email: "user1@example.ru"
                },
                SECRET_KEY,
                {expiresIn: "1d"}
            )
    })

    beforeAll(async () => {
        await db.User.create({
            user_id: userID,
            username: "userTest",
            first_name: "",
            last_name: "",
            email: "userTest09@example.ru",
            password: "1234"})
    })

    afterAll(async () => {
        await db.User.destroy({ where: {email: "userTest09@example.ru"} });
    });

    it('Изменение данных пользователя 200 (put(/boards) ', async () =>{
        const res = await request(app)
            .put('/board/test')
            .send({
                formName: "form-update-user",
                user_id: userID,
                username:"updateUser",
                first_name: "F",
                last_name:"L"
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'User updateUser updated');
    })


    it('Изменение данных пользователя 500 (put(/boards) ', async () =>{
        const res = await request(app)
            .put('/board/test')
            .send({
                formName: "form-update-user",
                user_id: userID+55,
                username:"updateUser",
                first_name: "F",
                last_name:"L"
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(500);
        expect(res.body).toHaveProperty('error', 'Internal Server Error');
    })
})