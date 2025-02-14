const jwt = require("jsonwebtoken");
const request = require("supertest");
const app = require("../../server")
const SECRET_KEY = process.env.JWT_SECRET;
const {v4: uuidv4} = require("uuid");
const db = require("../../config/db");
const boardID = uuidv4()
const userID = uuidv4()

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

    beforeAll(async () => {
        await db.User.create({
            user_id: userID,
            username: "userTest",
            first_name: "",
            last_name: "",
            email: "userTest00@example.ru",
            password: "1234"})
        await db.Board.create({board_id:boardID, name_board:"", user_id: userID})
    })

    afterAll(async () => {
        await db.User.destroy({ where: {email: "userTest00@example.ru"} });
        await db.Board.destroy({ where: {board_id:boardID}});
    });

    it('Добавление участника доски 201 (post(/board/:name_board)', async () =>{
        const res = await request(app)
            .post('/board/test2')
            .send({
                formName: "form-add-members",
                user_id: userID,
                board_id: boardID,
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty('message', 'New member created');
    })

    it('Добавление участника доски 500 (post(/board/:name_board)', async () =>{
        const res = await request(app)
            .post('/board/test2')
            .send({
                formName: "form-add-members",
                user_id: userID+55,
                board_id: "40dbd6c6-374e-c28f-ce89-c89c66ce1",
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(500)
        expect(res.body).toHaveProperty('error', 'Internal Server Error');
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
        expect(res.body).toHaveProperty('message', 'Id not found');
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
        expect(res.body).toHaveProperty('message', 'Id not found');
    })

})