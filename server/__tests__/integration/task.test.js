const jwt = require("jsonwebtoken");
const request = require("supertest");
const app = require("../../server")
const SECRET_KEY = process.env.JWT_SECRET;
const {v4: uuidv4} = require("uuid");
const db = require("../../config/db");
const listID = uuidv4()
const boardID = uuidv4()
const taskID = uuidv4()
const userID = uuidv4()
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

    beforeAll(async () => {
        await db.User.create({
            user_id: userID,
            username: "userTest",
            first_name: "",
            last_name: "",
            email: "userTest00@example.ru",
            password: "1234"})
        await db.Board.create({board_id:boardID, name_board:"", user_id: userID})
        await db.List.create({
            list_id: listID,
            nameList: "в процессе",
            board_id:boardID
        })
    })

    afterAll(async () => {
        await db.List.destroy({ where: {list_id: listID} });
        await db.Task.destroy({ where: {task_id: taskID} });
        await db.Board.destroy({ where: {board_id:boardID} });
        await db.User.destroy({ where: {email: "userTest00@example.ru"} });
    });

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
        expect(res.body).toHaveProperty('message', 'New task created');
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
        expect(res.body).toHaveProperty('message', 'Задача существует');
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
        expect(res.body).toHaveProperty('message', 'Email not found');
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
        expect(res.body).toHaveProperty('message', 'Task Update test task updated');
    })

    it('Изменение задачи 500 (put(/board/name_board) ', async () =>{
        const res = await request(app)
            .put('/board/test')
            .send({
                formName: "form-save-task",
                task_id:taskID,
                name_task: "Update test task",
                description: "text",
                date_start: new Date(),
                date_end: new Date("15/02/2025"),
                list_id: listID+55,
                importance: "низкая",
                status: false
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(500)
        expect(res.body).toHaveProperty('error', 'Internal Server Error');
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
        expect(res.body).toHaveProperty('message', 'TaskId not found');
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

    it('Получение данных задач доски 404 Not taskId(get(/boards)', async () =>{
        const res = await request(app)
            .get('/board/test')
            .query({
                type:"data",
                board_id:boardID,
                email: "user1NoDB@example.ru",
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty('message', 'Data not found');
    })

    it('Получение данных задач доски 404 Not boardId (get(/boards)', async () =>{
        const res = await request(app)
            .get('/board/test')
            .query({
                type:"data",
                board_id:taskID,
                email: "user1@example.ru",
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty('message', 'Data not found');
    })

    it('Получение данных задач доски 500 (get(/boards)', async () =>{
        const res = await request(app)
            .get('/board/test')
            .query({
                type:"data",
                board_id:boardID+55,
                email: "user1@example.ru",
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(500)
        expect(res.body).toHaveProperty('error', 'Internal Server Error');
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

    it('Получение всех назначенных задач пользователя 404 Email not found (get(/all-tasks)', async () =>{
        const res = await request(app)
            .get('/all-tasks')
            .query({
                email: "user1NoDB@example.ru",
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty('message', 'Email not found');
    })
})