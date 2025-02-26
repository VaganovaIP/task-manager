const {afterAll, beforeAll, beforeEach, describe, expect, test, it, afterEach} = require('@jest/globals');
const jwt = require("jsonwebtoken");
const request = require("supertest");
const app = require("../../server")
const SECRET_KEY = process.env.JWT_SECRET;
const {v4: uuidv4} = require("uuid");
const db = require("../../config/db");
const taskID = uuidv4()
const listID = uuidv4()
const boardID = uuidv4()
const userID = uuidv4()





describe(('Task controller'), () => {
    let accessToken;

    jest.mock("../../config/db", ()=> ({
        User: {findOne: jest.fn()},
        Task: {
            create: jest.fn(),
            update: jest.fn(),
            destroy: jest.fn(),
            findAll:jest.fn(),
            findOne: jest.fn()
        },
        TaskAssignment:{
            findAll: jest.fn(),
            destroy: jest.fn()
        },
        History:{
            create: jest.fn()
        }
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

    it('Создание задачи 201 ', async () =>{
        const user = {user_id: userID, username: 'testuser', email: 'userTest00@example.ru'};
        const task = {task_id:taskID, name_task:'task', list_id:listID, board_id:boardID,
                owner_id:userID}
        const event = {text_event: "text_event", task_id: taskID}
        jest.spyOn(db.History, 'create').mockResolvedValue({});
        jest.spyOn(db.User, 'findOne').mockResolvedValue(user);
        jest.spyOn(db.Task, 'create').mockResolvedValue({});

        const res = await request(app)
            .post('/board/test/add_task')
            .send({
                board_id: boardID,
                name_task:"task",
                task_id: taskID,
                list_id: listID,
                email:"userTest00@example.ru",
                text_event: "text_event",
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(db.User.findOne).toHaveBeenCalledWith({
            attributes: ['user_id'],
            where: { email: 'userTest00@example.ru' },
        });
        expect(db.Task.create).toHaveBeenCalledWith(expect.objectContaining(task));
        expect(db.History.create).toHaveBeenCalledWith(expect.objectContaining(event));
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('message', 'New task created');
    })

    it('Создание задачи. Task_id уже есть 409 ', async () =>{
        const user = {user_id: userID, username: 'testuser', email: 'userTest00@example.ru'};
        const task = {task_id:taskID, name_task:'task', list_id:listID, board_id:boardID,
            owner_id:userID}
        jest.spyOn(db.User, 'findOne').mockResolvedValue(user);
        jest.spyOn(db.Task, 'findOne').mockResolvedValue(taskID);
        jest.spyOn(db.Task, 'create').mockResolvedValue();

        const res = await request(app)
            .post('/board/test/add_task')
            .send({
                board_id: boardID,
                name_task:"task",
                task_id: taskID,
                list_id: listID,
                email:"userTest00@example.ru",
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(db.User.findOne).toHaveBeenCalledWith({
            attributes: ['user_id'],
            where: { email: 'userTest00@example.ru' },
        });
        expect(db.Task.findOne).toHaveBeenCalledWith(
        {where: {task_id: taskID}}
        );
        expect(res.status).toBe(409);
        expect(res.body).toHaveProperty('message', 'Задача существует');
    })

    it('Создание задачи. Ошибка авторизации 401 (Unauthorized)', async () =>{
        const res = await request(app)
            .post('/board/test/add_task')
            .send({
                board_id: boardID,
                name_task:"test task",
                task_id: taskID,
                list_id: listID,
                email:"user1@example.ru",
            })
            .set('Authorization', `Bearer `)
        expect(res.status).toBe(401)
    })

    it('Создание задачи 404 (not found email)', async () =>{
        const user = {user_id: userID, username: 'testuser', email: 'userTest00@example.ru'};
        jest.spyOn(db.User, 'findOne').mockResolvedValue(null);

        const res = await request(app)
            .post('/board/test/add_task')
            .send({
                board_id: boardID,
                name_task:"task",
                task_id: taskID,
                list_id: listID,
                email:"userTest00@example.ru",
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(db.User.findOne).toHaveBeenCalledWith({
            attributes: ['user_id'],
            where: { email: 'userTest00@example.ru' },
        });
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('message', 'Email not found');
    })

    it('Изменение задачи 200 ', async () =>{
        const task = {name_task:"task", description:"text", date_start:'',
                 date_end:'', list_id:listID, importance: "низкая", status: false}
        const event = {text_event: "text_event", task_id: taskID}
        jest.spyOn(db.Task, 'update').mockResolvedValue(taskID);
        jest.spyOn(db.History, 'create').mockResolvedValue({});

        const res = await request(app)
            .put('/board/test/update_task')
            .send({
                task_id:taskID,
                name_task: "task",
                description: "text",
                date_start: '',
                date_end: '',
                list_id: listID,
                importance: "низкая",
                status: false,
                text_event: "text_event",
                statusEdit:true,
            })
            .set('Authorization', `Bearer ${accessToken}`)

        expect(db.Task.update).toHaveBeenCalledWith(expect.objectContaining(task),
            { where: {task_id: taskID}})
        expect(db.History.create).toHaveBeenCalledWith(expect.objectContaining(event));
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'Task task updated');
    })

    it('Изменение задачи 400 (put(/board/name_board) ', async () =>{
        const res = await request(app)
            .put('/board/test/update_task')
            .send({
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
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('message', 'TaskId not found');
    })

    it('Изменение задачи. Ошибка авторизации 401 (Unauthorized)  ', async () =>{
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

    it('Удаление задачи 204 ', async () =>{
        jest.spyOn(db.Task, 'destroy').mockResolvedValue(taskID);
        jest.spyOn(db.TaskAssignment, 'destroy').mockResolvedValue(taskID);
        const res = await request(app)
            .delete('/board/test/delete_task')
            .send({
                task_id: taskID
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(db.Task.destroy).toHaveBeenCalledWith( {
            where:{ task_id: taskID }
        })
        expect(db.TaskAssignment.destroy).toHaveBeenCalledWith( {
            where:{ task_id: taskID }
        })
        expect(res.status).toBe(204)
    })

    it('Удаление задачи 400 ', async () =>{
        const res = await request(app)
            .delete('/board/test/delete_task')
            .send({
                task_id: ""})
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(400)
    })

    it('Удаление задачи 401', async () =>{
        const res = await request(app)
            .delete('/board/test/delete_task')
            .send({task_id: taskID})
            .set('Authorization', `Bearer `)
        expect(res.status).toBe(401)
    })

    // it('Получение данных задач доски 200 (get(/boards)', async () =>{
    //     const res = await request(app)
    //         .get('/board/test')
    //         .query({
    //             type:"data",
    //             board_id:boardID,
    //             email: "user1@example.ru",
    //         })
    //         .set('Authorization', `Bearer ${accessToken}`)
    //     expect(res.status).toBe(200)
    // })

    it('Получение данных задач доски 401 ', async () =>{
        const res = await request(app)
            .get('/board/test/task')
            .query({
                board_id:boardID,
                email: "user1@example.ru",
            })
            .set('Authorization', `Bearer `)
        expect(res.status).toBe(401)
    })

    it('Получение данных задач доски 400 ', async () =>{
        const res = await request(app)
            .get('/board/test/task')
            .query({
                board_id:"",
                email: "user1@example.ru",
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(400)
    })

    it('Получение данных задач доски 404 ', async () =>{
        const res = await request(app)
            .get('/board/test/task')
            .query({
                board_id:"fa6b3d18-5547-14cb-0b28-f2f168c84588",
                email: "user1@example.ru",
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(404)
    })

    it('Получение данных задач доски 404 ', async () =>{
        const res = await request(app)
            .get('/board/test/task')
            .query({
                board_id:boardID,
                email: "test1@example.ru",
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(404)
    })

    it('Получение всех назначенных задач пользователя 200 (get(/all-tasks)', async () =>{
        const user = {user_id: userID, username: 'testuser',
            first_name:'first_name', last_name:'last_name'};
        const tasks = {
            members_id: 1, task_id:taskID, user_id: userID,
            Task:{task_id:taskID, board_id: boardID, name_task:'task', description:'text',
                date_start:'', date_end:'', list_id:listID, importance: "низкая", status: false,
                List:{list_id:listID, name_list:'nameList', board_id:boardID},
                User:{user}},
                Board:{board_id: boardID, name_board: "test", user_id: userID}
        }
        jest.spyOn(db.User, 'findOne').mockResolvedValue(user);
        jest.spyOn(db.TaskAssignment, 'findAll').mockResolvedValue(tasks);
        const res = await request(app)
            .get('/all-tasks')
            .query({
                email: "userTest00@example.ru",
            })
            .set('Authorization', `Bearer ${accessToken}`)

        expect(db.User.findOne).toHaveBeenCalledWith({
            attributes: ['user_id', 'username','email', 'first_name', 'last_name'],
            where: { email: 'userTest00@example.ru' },
        });

        expect(db.TaskAssignment.findAll).toHaveBeenCalledWith({
            include:[
                {model:db.Task, attributes:['task_id', 'board_id', 'name_task', 'description','date_end', 'date_start',
                        'importance', 'owner_id', 'status', 'list_id'],
                    include:[
                        {model: db.List},
                        {model: db.User , attributes:['user_id', 'username',
                                'first_name', 'last_name']},
                        {model: db.Board}]}],
            where:{user_id:user.user_id},
        });
        expect(res.status).toBe(200)
    })


    it('Получение всех назначенных задач пользователя 404 (get(/all-tasks)', async () =>{
        jest.spyOn(db.User, 'findOne').mockResolvedValue(null);
        const res = await request(app)
            .get('/all-tasks')
            .query({
                email: "test@example.ru",
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('message', 'Email not found');
    })
})