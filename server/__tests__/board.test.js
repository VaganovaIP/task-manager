const jwt = require("jsonwebtoken");
const request = require("supertest");
const app = require("../server")
const SECRET_KEY = process.env.JWT_SECRET;
const {v4: uuidv4} = require("uuid");


describe(('Board controller'), () =>{
    let accessToken;

    afterAll(() => {
        app.close();
    });

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

    it('Получение списка досок пользователя выполнено успешно 200 (get(/boards)', async () =>{
        const res = await request(app)
            .get('/boards')
            .query({email: "user1@example.ru"})
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('boards')
    })

    it('Получение списка досок пользователя выполнено успешно 404 (get(/boards)', async () =>{
        const res = await request(app)
            .get('/boards')
            .query({email: ""})
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(404)
    })

    it('Ошибка авторизации 401 (Unauthorized) (get(/boards)', async () =>{
        const res = await request(app)
            .get('/boards')
            .query({email: "user1@example.ru"})
            .set('Authorization', `Bearer 122`);
        expect(res.status).toBe(401)
    })


    it('Создание новой доски 201 (post(/boards)', async () =>{
        const res = await request(app)
            .post('/boards')
            .send({
                board_id: "87c5cd4f-8fa4-4480-9f1e-2b75133f6d65",
                name_board: "test",
                email:"user1@example.ru",
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(201)
    })

    it('Создание доски. Ошибка авторизации 401 (Unauthorized) (post(/boards)', async () =>{
        const res = await request(app)
            .post('/boards')
            .send({
                board_id: "87c5cd4f-8fa4-4480-9f1e-2b75133f6d65",
                name_board: "test",
                email:"user1@example.ru",
            })
            .set('Authorization', `Bearer 122`)
        expect(res.status).toBe(401)
    })

    it('Создание доски. Ошибка авторизации 404 (Unauthorized) (post(/boards)', async () =>{
        const res = await request(app)
            .post('/boards')
            .send({
                board_id: uuidv4(),
                name_board: "test",
                email:"Erroruser1@example.ru",
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(404)
    })

    it('Изменение названия доски 200 (put(/boards) ', async () =>{
        const res = await request(app)
            .put('/board/test')
            .send({
                formName: "form-update-board",
                board_id: "87c5cd4f-8fa4-4480-9f1e-2b75133f6d65",
                name_board: "test - update",
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(200)
    })


    it('Изменение названия доски. Ошибка авторизации 401 (Unauthorized) (put(/boards) ', async () =>{
        const res = await request(app)
            .put('/board/test')
            .send({
                formName: "form-update-list",
                board_id: "87c5cd4f-8fa4-4480-9f1e-2b75133f6d65",
                name_board: "test - update",
            })
            .set('Authorization', `Bearer `)
        expect(res.status).toBe(401)
    })

    it('Удаление доски 204 (delete(/boards)', async () =>{
        const res = await request(app)
            .delete('/boards')
            .query({board_id: "87c5cd4f-8fa4-4480-9f1e-2b75133f6d65"})
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(204)
    })

    it('Удаление доски 404 (delete(/boards)', async () =>{
        const res = await request(app)
            .delete('/boards')
            .query({
                board_id: ""
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(404)
    })

    it('Ошибка авторизации 401 (Unauthorized) (delete(/boards)', async () =>{
        const res = await request(app)
            .delete('/boards')
            .query({board_id: "87c5cd4f-8fa4-4480-9f1e-2b75133f6d65"})
            .set('Authorization', `Bearer 122`)
        expect(res.status).toBe(401)
    })
})

