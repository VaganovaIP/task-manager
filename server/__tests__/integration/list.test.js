const jwt = require("jsonwebtoken");
const request = require("supertest");
const app = require("../../server")
const SECRET_KEY = process.env.JWT_SECRET;
const {v4: uuidv4} = require("uuid");
const listID = uuidv4()

describe(('List controller'), () => {
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

    it('Создание списка 201 (post(/board/:name_board)', async () =>{
        const res = await request(app)
            .post('/board/test')
            .send({
                formName: "form-add-list",
                list_id: listID,
                board_id: "87c5cd4f-8fa4-4480-9f1e-2b75133f6d65",
                nameList: "в процессе"
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('message', 'New list created');
    })

    it('Изменение названия списка 200 (Ok) (put(/board/:name_board)', async () =>{
        const res = await request(app)
            .put('/board/test')
            .send({
                formName: "form-update-list",
                list_id: listID,
                name_list: "готово"
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('message', 'List готово updated');
    })

    it('Изменение названия списка 400 (put(/board/:name_board)', async () =>{
        const res = await request(app)
            .put('/board/test')
            .send({
                formName: "form-update-list",
                list_id: "",
                name_list: "готово"
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('message', 'List not found');
    })

    it('Удаление списка 204 (delete(/board/:name_board)', async () =>{
        const res = await request(app)
            .delete('/board/test')
            .send({
                formName: "form-delete-list",
                list_id: listID
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(204)
    })

    it('Удаление списка 400 (delete(/board/:name_board)', async () =>{
        const res = await request(app)
            .delete('/board/test')
            .send({
                formName: "form-delete-list",
                list_id: ""
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('message', 'List not found');
    })





})