const jwt = require("jsonwebtoken");
const request = require("supertest");
const app = require("../../server")
const SECRET_KEY = process.env.JWT_SECRET;
const {v4: uuidv4} = require("uuid");
const path = require("path");
const fs = require("fs");
const userID = "524f88f7-246d-40dc-881d-f86cb6d7747d"
const fileID = uuidv4()
const taskID = "6a715c1c-ec38-43b5-9a3f-7e17041acda6"


describe(('Files controller'), () => {
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


    it('Загрузка файла и сохранение данных файла в бд 201', async () => {
        let filePath = path.join(__dirname, '../../uploads', taskID);
        if (!fs.existsSync(filePath)) fs.mkdirSync(filePath, { recursive: true });
        filePath = path.join(__dirname, '../uploads', taskID, '/test.txt');
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, 'создан тест файл.');
        }
        const res = await request(app)
            .post('/board/test')
            .field({
                formName: "form-upload-file",
                fileId:fileID,
                task_id:taskID,
                file_name:"testfile.txt",
            })
            .attach('file', filePath)
            .set('Authorization', `Bearer ${accessToken}`)
            .set('task-id', taskID)
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('message', 'Файл успешно загружен');
    })

    it('Получение списка файлов задачи 200 (get()', async () =>{
        const res = await request(app)
            .get('/board/test')
            .query({
                type:"files",
                task_id:taskID,
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(200)
    })

    it('Удаление файла  (delete(/)', async () =>{
        const res = await request(app)
            .delete('/board/test')
            .send({
                formName: "form-delete-file",
                task_id: taskID,
                file_name: 'test.txt',
                file_id:fileID
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(204)
    })
})