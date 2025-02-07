const jwt = require("jsonwebtoken");
const request = require("supertest");
const app = require("../server")
const SECRET_KEY = process.env.JWT_SECRET;
const {v4: uuidv4} = require("uuid");


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

    it('Создание списка 200 (post(/board/:name_board)', async () =>{
        const res = await request(app)
            .post('/board/test')
            .send({
                formName: "form-add-list",
                list_id: uuidv4(),
                board_id: "87c5cd4f-8fa4-4480-9f1e-2b75133f6d65",
                nameList: "в процессе"
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(201)
    })

    it('Создание списка. Ошибка авторизации 401 (Unauthorized) (post(/board/:name_board)', async () =>{
        const res = await request(app)
            .post('/board/test')
            .send({
                formName: "form-add-list",
                list_id: uuidv4(),
                board_id: "87c5cd4f-8fa4-4480-9f1e-2b75133f6d65",
                nameList: "в процессе"
            })
            .set('Authorization', `Bearer 122`)
        expect(res.status).toBe(401)
    })

    it('Изменение названия списка 200 (put(/board/:name_board)', async () =>{
        const res = await request(app)
            .put('/board/test')
            .send({
                formName: "form-update-list",
                list_id: "ed5a1562-3f66-4a82-a233-23a709ea657b",
                name_list: "готово"
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(200)
    })

    it('Изменение названия списка. Ошибка авторизации 401 (Unauthorized) (put(/board/:name_board)', async () =>{
        const res = await request(app)
            .put('/board/test')
            .send({
                formName: "form-update-list",
                list_id: "ed5a1562-3f66-4a82-a233-23a709ea657b",
                name_list: "готово"
            })
            .set('Authorization', `Bearer 122`)
        expect(res.status).toBe(401)
    })

    it('Удаление списка 200 (delete(/board/:name_board)', async () =>{
        const res = await request(app)
            .delete('/board/test')
            .send({
                formName: "form-delete-list",
                list_id: "ed5a1562-3f66-4a82-a233-23a709ea657b"
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(204)
    })

    // it('', async () =>{
    //     const error = jest.spyOn(console, 'log');
    //     const res = await request(app)
    //         .delete('/board/test')
    //         .send({
    //             formName: "form-delete-list",
    //             list_id: ""
    //         })
    //         .set('Authorization', `Bearer ${accessToken}`)
    //     expect(error).toHaveBeenCalledWith(error);
    //     error.mockRestore();
    // })


    it('Удаление списка. Ошибка авторизации 401 (Unauthorized) (delete(/board/:name_board)', async () =>{
        const res = await request(app)
            .delete('/board/test')
            .send({
                formName: "form-delete-list",
                list_id: "ed5a1562-3f66-4a82-a233-23a709ea657b"
            })
            .set('Authorization', `Bearer 122`)
        expect(res.status).toBe(401)
    })

})