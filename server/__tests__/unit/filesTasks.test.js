const {afterAll, beforeAll, beforeEach, describe, expect, test} = require('@jest/globals');
const jwt = require("jsonwebtoken");
const request = require("supertest");
const app = require("../../server")
const SECRET_KEY = process.env.JWT_SECRET;
const {v4: uuidv4} = require("uuid");
const path = require("path");
const fs = require("fs");
const db = require("../../config/db");
const userID = uuidv4()
const fileID = uuidv4()
const taskID = '6a715c1c-ec38-43b5-9a3f-7e17041acda6'


describe(('Files controller'), () => {
    let accessToken;

    jest.mock("../../config/db", ()=> ({
        User: {findOne: jest.fn()},
        FilesTask: {
            create: jest.fn(),
            destroy: jest.fn(),
            findAll:jest.fn(),
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

    it('Файл не был загружен 404', async () => {
        const res = await request(app)
            .post('/board/test/files')
            .send({
                file: '',
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(404);
    });

    it('Загрузка файла и сохранение данных файла в бд 201', async () => {
        let filePath = path.join(__dirname, '../../uploads', taskID);
        if (!fs.existsSync(filePath)) fs.mkdirSync(filePath, { recursive: true });
        filePath = path.join(__dirname, '../uploads', taskID, '/test.txt');
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, 'создан тест файл.');
        }

        jest.spyOn(db.FileTask, 'create').mockResolvedValue({});

        const res = await request(app)
            .post('/board/test/upload_file')
            .field({
                fileId:fileID,
                task_id:taskID,
                file_name:"testfile.txt",
            })
            .attach('file', filePath)
            .set('Authorization', `Bearer ${accessToken}`)
            .set('task-id', taskID)

        expect(db.FileTask.create).toHaveBeenCalledWith(
        {file_id: fileID, task_id: taskID, name_file: "testfile.txt"})
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('message', 'Файл успешно загружен');
    })

    it('Получение списка файлов задачи 200 (get()', async () =>{
        const file = {file_id: fileID, task_id: taskID, name_file: "testfile.txt"}

        jest.spyOn(db.FileTask, 'findAll').mockResolvedValue(file);

        const res = await request(app)
            .get('/board/test/files')
            .query({
                task_id:taskID,
            })
            .set('Authorization', `Bearer ${accessToken}`)

        expect(db.FileTask.findAll).toHaveBeenCalledWith({where:{task_id:taskID}});
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('files');
    })

    it('Получение списка файлов задачи 400 (get()', async () =>{
        const res = await request(app)
            .get('/board/test/files')
            .query({
                task_id:"",
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(400)
    })

    it('Скачивание файла 200 ', async () =>{
        const res = await request(app)
            .get('/board/test/download')
            .set('Authorization', `Bearer ${accessToken}`)
            .set('task_id', taskID)
            .set('file_name', 'test.txt')
        expect(res.status).toBe(200)
    })

    it('Удаление файла  (delete(/)', async () =>{
        jest.spyOn(db.FileTask, 'destroy').mockResolvedValue(fileID);
        const res = await request(app)
            .delete('/board/test/delete_file')
            .send({
                task_id: taskID,
                file_name: 'test.txt',
                file_id:fileID
            })
            .set('Authorization', `Bearer ${accessToken}`)

        expect(db.FileTask.destroy).toHaveBeenCalledWith( {
            where:{ file_id:fileID}
        })
        expect(res.status).toBe(204)
    })
})