const jwt = require("jsonwebtoken");
const request = require("supertest");
const app = require("../../server")
const SECRET_KEY = process.env.JWT_SECRET;
const {v4: uuidv4} = require("uuid");
const userID = "524f88f7-246d-40dc-881d-f86cb6d7747d"

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
        expect(res.status).toBe(200)
    })

    it('Изменение данных пользователя 400 (put(/boards) ', async () =>{
        const res = await request(app)
            .put('/board/test')
            .send({
                formName: "form-update-user",
                user_id: userID,
                username: null,
                first_name: "F",
                last_name:"L"
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(400)
    })

    it('Изменение данных пользователя 401 (put(/boards) ', async () =>{
        const res = await request(app)
            .put('/board/test')
            .send({
                formName: "form-update-user",
                user_id: userID,
                username:"updateUser",
                first_name: "F",
                last_name:"L"
            })
            .set('Authorization', `Bearer `)
        expect(res.status).toBe(401)
    })

})