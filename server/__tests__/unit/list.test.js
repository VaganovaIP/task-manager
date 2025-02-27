const {afterAll, beforeAll, beforeEach, describe, expect, test} = require('@jest/globals');
const jwt = require("jsonwebtoken");
const request = require("supertest");
const app = require("../../server")
const SECRET_KEY = process.env.JWT_SECRET;
const {v4: uuidv4} = require("uuid");
const db = require("../../config/db");
const listID = uuidv4()
const boardID = uuidv4()

describe(('List controller'), () => {
    let accessToken;

    jest.mock("../../config/db", ()=> ({
        List: {
            create: jest.fn(),
            update: jest.fn(),
            destroy: jest.fn(),
        },
    }));

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

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeAll(async () => {

    })

    afterAll(async () => {

    });

    it('Создание списка 201 ', async () => {
        const list = {list_id:listID, name_list:'nameList', board_id:boardID}

        jest.spyOn(db.List, 'create').mockResolvedValue({})

        const res = await request(app)
            .post('/board/test/add_list')
            .send({
                list_id: listID,
                board_id: boardID,
                nameList: "nameList"
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(db.List.create).toHaveBeenCalledWith(list)
        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty('message', 'New list created')
    })

    it('Создание списка. Ошибка авторизации 401 (Unauthorized) ', async () =>{
        const res = await request(app)
            .post('/board/test/add_list')
            .send({
                list_id: listID,
                board_id: boardID,
                nameList: "в процессе"
            })
            .set('Authorization', `Bearer 122`)
        expect(res.status).toBe(401)
    })

    it('Изменение названия списка 200 ', async () => {
        jest.spyOn(db.List, 'update').mockResolvedValue(listID)
        const res = await request(app)
            .put('/board/test/update_list')
            .send({
                list_id: listID,
                name_list: "готово"
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(db.List.update).toHaveBeenCalledWith({name_list: "готово"}, {
            where:{ list_id: listID}
        })
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('message', 'List готово updated')
    })

    it('Изменение названия списка 400 ', async () => {
        const res = await request(app)
            .put('/board/test/update_list')
            .send({
                list_id: "",
                name_list: "готово"
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('message', 'List not found')
    })

    it('Изменение названия списка. Ошибка авторизации 401 (Unauthorized)', async () =>{
        const res = await request(app)
            .put('/board/test/update_list')
            .send({
                list_id: listID,
                name_list: "готово"
            })
            .set('Authorization', `Bearer 122`)
        expect(res.status).toBe(401)
    })

    it('Удаление списка 204', async () =>{
        jest.spyOn(db.List, 'destroy').mockResolvedValue(listID);
        const res = await request(app)
            .delete('/board/test/delete_list')
            .send({
                list_id: listID
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(db.List.destroy).toHaveBeenCalledWith( {
            where:{ list_id: listID }
        })
        expect(res.status).toBe(204)
    })

    it('Удаление списка 400 ', async () =>{
        const res = await request(app)
            .delete('/board/test/delete_list')
            .send({
                list_id: ""
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(400)
    })

    it('Удаление списка. Ошибка авторизации 401 (Unauthorized) (delete(/board/:name_board)', async () =>{
        const res = await request(app)
            .delete('/board/test/delete_list')
            .send({
                list_id: listID
            })
            .set('Authorization', `Bearer 122`)
        expect(res.status).toBe(401)
    })

})