const jwt = require("jsonwebtoken");
const request = require("supertest");
const app = require("../../server")
const SECRET_KEY = process.env.JWT_SECRET;
const {v4: uuidv4} = require("uuid");
const taskID = uuidv4()
const listID = "fa6b3d18-5547-14cb-0b28-f2f168c84588"
const boardID = "40dbd6c6-374e-c28f-ce89-c89c66ce15f5"
describe(('Task controller'), () => {
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

    it('Создание задачи 201 (post(/board/name_board)', async () =>{
        const res = await request(app)
            .post('/board/test')
            .send({
                formName:"form-add-task",
                board_id: boardID,
                name_task:"test task",
                task_id: taskID,
                list_id: listID,
                email:"user1@example.ru",
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(201)
    })

    it('Создание задачи. Task_id уже есть 409 (post(/board/name_board)', async () =>{
        const res = await request(app)
            .post('/board/test')
            .send({
                formName:"form-add-task",
                board_id: boardID,
                name_task:"test task",
                task_id: taskID,
                list_id: listID,
                email:"user1@example.ru",
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(409)
    })

    it('Создание задачи. Ошибка авторизации 401 (Unauthorized) (post(/board/name_board)', async () =>{
        const res = await request(app)
            .post('/board/test')
            .send({
                formName:"form-add-task",
                board_id: boardID,
                name_task:"test task",
                task_id: taskID,
                list_id: listID,
                email:"user1@example.ru",
            })
            .set('Authorization', `Bearer `)
        expect(res.status).toBe(401)
    })

    it('Создание задачи 404 (not found email) (post(/board/name_board)', async () =>{
        const res = await request(app)
            .post('/board/test')
            .send({
                formName:"form-add-task",
                board_id: boardID,
                name_task:"test task",
                task_id: taskID,
                list_id: listID,
                email:"",
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(404)
    })

    it('Изменение задачи 200 (put(/board/name_board) ', async () =>{
        const res = await request(app)
            .put('/board/test')
            .send({
                formName: "form-save-task",
                task_id:taskID,
                name_task: "Update test task",
                description: "text",
                date_start: new Date(),
                date_end: new Date("15/02/2025"),
                list_id: listID,
                importance: "низкая",
                status: false
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(200)
    })

    it('Изменение задачи 400 (put(/board/name_board) ', async () =>{
        const res = await request(app)
            .put('/board/test')
            .send({
                formName: "form-save-task",
                task_id:"",
                name_task: "Update test task",
                description: "text",
                date_start: "10/02/2025",
                date_end: "15/02/2025",
                list_id: listID,
                importance: "низкая",
                status: false
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(400)
    })

    it('Изменение задачи. Ошибка авторизации 401 (Unauthorized) (put(/board/name_board) ', async () =>{
        const res = await request(app)
            .put('/board/test')
            .send({
                formName: "form-save-task",
                name_task: "Update test task",
                description: "text",
                date_start: "10/02/2025",
                date_end: "15/02/2025",
                list_id: listID,
                importance: "низкая",
                status: false
            })
            .set('Authorization', `Bearer `)
        expect(res.status).toBe(401)
    })

    it('Удаление задачи 204 (delete(/boards)', async () =>{
        const res = await request(app)
            .delete('/board/test')
            .send({
                formName:"form-delete-task",
                task_id: taskID
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(204)
    })

    it('Удаление задачи 400 (delete(/boards)', async () =>{
        const res = await request(app)
            .delete('/board/test')
            .send({
                formName:"form-delete-task",
                task_id: ""})
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(400)
    })

    it('Удаление задачи 401 (delete(/boards)', async () =>{
        const res = await request(app)
            .delete('/board/test')
            .send({task_id: taskID})
            .set('Authorization', `Bearer `)
        expect(res.status).toBe(401)
    })

    it('Получение данных задач доски 200 (get(/boards)', async () =>{
        const res = await request(app)
            .get('/board/test')
            .query({
                type:"data",
                board_id:boardID,
                email: "user1@example.ru",
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(200)
    })

    it('Получение данных задач доски 401 (get(/boards)', async () =>{
        const res = await request(app)
            .get('/board/test')
            .query({
                type:"data",
                board_id:boardID,
                email: "user1@example.ru",
            })
            .set('Authorization', `Bearer `)
        expect(res.status).toBe(401)
    })

    it('Получение данных задач доски 400 (get(/boards)', async () =>{
        const res = await request(app)
            .get('/board/test')
            .query({
                type:"data",
                board_id:"",
                email: "user1@example.ru",
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(400)
    })

    it('Получение данных задач доски 404 (get(/boards)', async () =>{
        const res = await request(app)
            .get('/board/test')
            .query({
                type:"data",
                board_id:"fa6b3d18-5547-14cb-0b28-f2f168c84588",
                email: "user1@example.ru",
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(404)
    })

    it('Получение данных задач доски 404 (get(/boards)', async () =>{
        const res = await request(app)
            .get('/board/test')
            .query({
                type:"data",
                board_id:boardID,
                email: "test1@example.ru",
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(404)
    })

    it('Получение всех назначенных задач пользователя 200 (get(/all-tasks)', async () =>{
        const res = await request(app)
            .get('/all-tasks')
            .query({
                email: "user1@example.ru",
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(200)
    })

    it('Получение всех назначенных задач пользователя 401 (get(/all-tasks)', async () =>{
        const res = await request(app)
            .get('/all-tasks')
            .query({
                email: "user1@example.ru",
            })
            .set('Authorization', `Bearer `)
        expect(res.status).toBe(401)
    })

    it('Получение всех назначенных задач пользователя 404 (get(/all-tasks)', async () =>{
        const res = await request(app)
            .get('/all-tasks')
            .query({
                email: "test@example.ru",
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(404)
    })
})