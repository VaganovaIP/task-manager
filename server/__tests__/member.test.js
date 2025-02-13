const jwt = require("jsonwebtoken");
const request = require("supertest");
const app = require("../server")
const SECRET_KEY = process.env.JWT_SECRET;
const {v4: uuidv4} = require("uuid");
const userID = "524f88f7-246d-40dc-881d-f86cb6d7747d"

describe(('Member controller'), () => {
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

    it('Добавление участника доски 201 (post(/board/:name_board)', async () =>{
        const res = await request(app)
            .post('/board/test2')
            .send({
                formName: "form-add-members",
                user_id: userID,
                board_id: "40dbd6c6-374e-c28f-ce89-c89c66ce15f5",
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(201)
    })

    it('Добавление участника доски 500 (post(/board/:name_board)', async () =>{
        const res = await request(app)
            .post('/board/test2')
            .send({
                formName: "form-add-members",
                user_id: userID,
                board_id: "40dbd6c6-374e-c28f-ce89-c89c66ce15f5",
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(500)
    })


    it('Добавление участника доски 400 (post(/board/:name_board)', async () =>{
        const res = await request(app)
            .post('/board/test')
            .send({
                formName: "form-add-members",
                user_id: "",
                board_id: "d5bc5d07-7694-3560-307c-04f40b1d379c",
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(400)
    })

    it('Добавление участника доски. Ошибка 401 (Unauthorized) (post(/board/:name_board)', async () =>{
        const res = await request(app)
            .post('/board/test')
            .send({
                formName: "form-add-members",
                user_id: userID,
                board_id: "87c5cd4f-8fa4-4480-9f1e-2b75133f6d65",
            })
            .set('Authorization', `Bearer `)
        expect(res.status).toBe(401)
    })

    it('Исключение участника доски 204 (No content) (delete(/board/:name_board)', async () =>{
        const res = await request(app)
            .delete('/board/test')
            .send({
                formName: "form-delete-member",
                member_id: "155"
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(204)
    })

    it('Исключение участника доски 400 (delete(/board/:name_board)', async () =>{
        const res = await request(app)
            .delete('/board/test')
            .send({
                formName: "form-delete-member",
                member_id: ""
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(400)
    })

    it('Исключение участника доски. Ошибка 401 (Unauthorized) (delete(/board/:name_board)', async () =>{
        const res = await request(app)
            .delete('/board/test')
            .send({
                formName: "form-delete-member",
                member_id: "1"
            })
            .set('Authorization', `Bearer `)
        expect(res.status).toBe(401)
    })

})