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

    jest.mock("../../config/db", () =>({
        Assignment: {
            create: jest.fn(),
            destroy: jest.fn(),
        }
    }))

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


    it('Назначение ответсвенного 200 (post(/board/:name_board)', async () =>{
        const assignment = {user_id: userID, task_id:taskID}
        jest.spyOn(db.TaskAssignment, 'create').mockResolvedValue({});
        const res = await request(app)
            .post('/board/test')
            .send({
                formName: "form-add-assignments",
                user_id: userID,
                task_id: taskID,
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(db.TaskAssignment.create).toHaveBeenCalledWith(assignment);
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('message', 'New assignment created')
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
        expect(res.body).toHaveProperty('message', 'Id not found')
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
        jest.spyOn(db.TaskAssignment, 'destroy').mockResolvedValue(8);
        const res = await request(app)
            .delete('/board/test')
            .send({
                formName: "form-delete-assignment",
                assignment_id: 8
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(db.TaskAssignment.destroy).toHaveBeenCalledWith( {
            where:{ members_id: 8}
        })
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
        expect(res.body).toHaveProperty('message', 'Id not found')
    })

    it('Удаление ответсвенного 401 (Unauthorized) (delete(/board/:name_board)', async () =>{
        const res = await request(app)
            .delete('/board/test')
            .send({
                formName: "form-delete-assignment",
                assignment_id: "3"
            })
            .set('Authorization', `Bearer `)
        expect(res.status).toBe(401)
    })

})