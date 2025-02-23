const {afterAll, beforeAll, beforeEach, describe, expect, test} = require('@jest/globals');
const jwt = require("jsonwebtoken");
const request = require("supertest");
const app = require("../../server")
const SECRET_KEY = process.env.JWT_SECRET;
const {v4: uuidv4} = require("uuid");
const db = require("../../config/db");
const boardID = uuidv4()

describe(('Board controller'), () =>{
    let accessToken;

    beforeEach(() =>{
        accessToken = jwt
            .sign({
                    id: "25e13d64-a8d4-4a6f-bd1a-8463f728690b", username: "user1",
                    email: "user1@example.ru"
                },
                SECRET_KEY,
                { expiresIn: "1d" }
            )
    })


    it('Создание новой доски 201 ', async () =>{
        const res = await request(app)
            .post('/boards')
            .send({
                board_id: boardID,
                name_board: "test",
                email:"user1@example.ru",
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty('message', 'New board created');
    })

    it('Создание доски 404', async () =>{
        const res = await request(app)
            .post('/boards')
            .send({
                board_id: uuidv4(),
                name_board: "test",
                email:"Erroruser1@example.ru",
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty('message', 'Email not found');
    })

    it('Изменение названия доски 200  ', async () =>{
        const res = await request(app)
            .put('/board/test/update_board')
            .send({
                board_id: boardID,
                name_board: "test - update",
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('message', 'Update board');
    })

    it('Изменение названия доски 500 ', async () =>{
        jest.spyOn(db.Board, 'update').mockRejectedValueOnce(new Error('Database connection failed'))
        const res = await request(app)
            .put('/board/test/update_board')
            .send({
                board_id: boardID+55,
                name_board: "test - update",
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(500)
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toBe('Internal Server Error');

    })

    it('Получение списка досок пользователя выполнено успешно 200 ', async () =>{
        const res = await request(app)
            .get('/boards')
            .query({email: "user1@example.ru"})
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('boards')
    })

    it('Получение списка досок пользователя 404', async () =>{
        const res = await request(app)
            .get('/boards')
            .query({email: ""})
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty('message', 'Email not found');
    })

    it('Удаление доски 204 ', async () =>{
        const res = await request(app)
            .delete('/boards')
            .query({board_id: boardID})
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(204)
    })

    it('Удаление доски 404 ', async () =>{
        const res = await request(app)
            .delete('/boards')
            .query({
                board_id: ""
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty('message', 'Board not found');

    })

})

