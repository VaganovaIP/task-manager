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
describe(('Assignment controller'), () => {
    let accessToken;
    let id;

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
            email: "userTest01@example.ru",
            password: "1234"})
        await db.Board.create({board_id:boardID, name_board:"", user_id: userID})
        await db.List.create({
            list_id: listID,
            nameList: "в процессе",
            board_id:boardID
        })
        await db.Task.create({
            board_id: boardID,
            name_task:"test task",
            task_id: taskID,
            list_id: listID,
            email:"user1@example.ru",
        })
    })

    afterAll(async () => {
        await db.User.destroy({ where: {email: "userTest01@example.ru"} });
        await db.List.destroy({ where: {list_id: listID} });
        await db.Task.destroy({ where: {task_id: taskID} });
        await db.Board.destroy({ where: {board_id:boardID} });
    });

    it('Назначение ответсвенного 200 ', async () =>{
        const res = await request(app)
            .post('/board/test/add_assignment')
            .send({
                user_id: userID,
                task_id: taskID,
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(201)
        id = res.body.id;
        console.log(id)
        expect(res.body).toHaveProperty('message', 'New assignment created');
    })

    it('Назначение ответсвенного 500 ', async () =>{
        const res = await request(app)
            .post('/board/test/add_assignment')
            .send({
                user_id: userID+55,
                task_id: taskID,
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(500)
        expect(res.body).toHaveProperty('error', 'Internal Server Error');
    })

    it('Назначение ответсвенного 400 ', async () =>{
        const res = await request(app)
            .post('/board/test/add_assignment')
            .send({
                user_id: "",
                task_id: "",
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('message', 'Id not found');
    })

    it('Удаление ответсвенного 204 (Ok) ', async () =>{
        const res = await request(app)
            .delete('/board/test/delete_assignment')
            .send({
                assignment_id: id
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(204)
    })

    it('Удаление ответсвенного 400 ', async () =>{
        const res = await request(app)
            .delete('/board/test/delete_assignment')
            .send({
                assignment_id: ""
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('message', 'Id not found');
    })

})