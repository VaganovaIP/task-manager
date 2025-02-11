const jwt = require("jsonwebtoken");
const request = require("supertest");
const app = require("../server")
const SECRET_KEY = process.env.JWT_SECRET;
const {v4: uuidv4} = require("uuid");
const userID = "25e13d64-a8d4-4a6f-bd1a-8463f728690b"

describe(('Assignment controller'), () => {
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

    it('Назначение ответсвенного 200 (post(/board/:name_board)', async () =>{
        const res = await request(app)
            .post('/board/test')
            .send({
                formName: "form-add-assignments",
                user_id: userID,
                task_id: "5d2c1e91-aba3-b25b-f948-b20b5fd04a9a",
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(201)
    })

    it('Назначение ответсвенного 400 (post(/board/:name_board)', async () =>{
        const res = await request(app)
            .post('/board/test')
            .send({
                formName: "form-add-assignments",
                user_id: "",
                task_id: "",
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(400)
    })

    it('Назначение ответсвенного 401 (Unauthorized) (post(/board/:name_board)', async () =>{
        const res = await request(app)
            .post('/board/test')
            .send({
                formName: "form-add-assignments",
                user_id: userID,
                task_id: "87c5cd4f-8fa4-4480-9f1e-2b75133f6d65",
            })
            .set('Authorization', `Bearer `)
        expect(res.status).toBe(401)
    })

    it('Удаление ответсвенного 204 (Ok) (delete(/board/:name_board)', async () =>{
        const res = await request(app)
            .delete('/board/test')
            .send({
                formName: "form-delete-assignment",
                assignment_id: "8"
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(204)
    })

    it('Удаление ответсвенного 400 (delete(/board/:name_board)', async () =>{
        const res = await request(app)
            .delete('/board/test')
            .send({
                formName: "form-delete-assignment",
                assignment_id: ""
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(400)
    })

    it('Удаление ответсвенного 401 (Unauthorized) (delete(/board/:name_board)', async () =>{
        const res = await request(app)
            .delete('/board/test')
            .send({
                formName: "form-delete-assignment",
                assignment_id: "1"
            })
            .set('Authorization', `Bearer `)
        expect(res.status).toBe(401)
    })

})