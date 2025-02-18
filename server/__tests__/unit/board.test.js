const jwt = require("jsonwebtoken");
const request = require("supertest");
const app = require("../../server")
const SECRET_KEY = process.env.JWT_SECRET;
const {v4: uuidv4} = require("uuid");
const db = require("../../config/db");
const boardID = uuidv4()
const taskID = uuidv4()
const userID = uuidv4()

describe(('Board controller'), () =>{
    let accessToken;

    jest.mock("../../config/db", ()=> ({
        User: {findOne: jest.fn()},
        Board: {
            create: jest.fn(),
            update: jest.fn(),
            destroy: jest.fn(),
        },
        BoardMember: {
            create: jest.fn(),
            findAll:jest.fn(),
            destroy: jest.fn(),
        }
    }));

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

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Создание новой доски 201 (post(/boards)', async () =>{
        const user = {user_id: userID, username: 'testuser', email: 'userTest00@example.ru'};

        jest.spyOn(db.User, 'findOne').mockResolvedValue(user);
        jest.spyOn(db.Board, 'create').mockResolvedValue({});
        jest.spyOn(db.BoardMember, 'create').mockResolvedValue({});

        const res = await request(app)
            .post('/boards')
            .send({
                board_id: boardID,
                name_board: "test",
                email:"userTest00@example.ru",
            })
            .set('Authorization', `Bearer ${accessToken}`)

        expect(db.User.findOne).toHaveBeenCalledWith({
            attributes: ['user_id', 'username', 'email'],
            where: { email: 'userTest00@example.ru' },
        });

        expect(db.Board.create).toHaveBeenCalledWith({
            board_id: boardID, name_board: "test", user_id: userID})

        expect(db.BoardMember.create).toHaveBeenCalledWith({
            board_id: boardID, user_id: userID})

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('message', 'New board created');
    })

    it('Создание доски. Ошибка авторизации 401 (Unauthorized) (post(/boards)', async () =>{
        const res = await request(app)
            .post('/boards')
            .send({
                board_id: boardID,
                name_board: "test",
                email:"userTest00@example.ru",
            })
            .set('Authorization', `Bearer 122`)
        expect(res.status).toBe(401)
    })

    it('Создание доски. Ошибка 404 Email not found (post(/boards)', async () =>{
        jest.spyOn(db.User, 'findOne').mockResolvedValue(null);
        const res = await request(app)
            .post('/boards')
            .send({
                board_id: boardID,
                name_board: "test",
                email:"userTest00@example.ru",
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(db.User.findOne).toHaveBeenCalledWith({
            attributes: ['user_id', 'username', 'email'],
            where: { email: 'userTest00@example.ru'},
        });
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('message', 'Email not found');
    })

    it('Создание доски. Ошибка входных данных 400 (post(/boards)', async () =>{
        const res = await request(app)
            .post('/boards')
            .send({
                board_id: "",
                name_board: "test",
                email:"userTest00@example.ru",
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('message', 'Id not found');
    })

    it('Получение списка досок пользователя выполнено успешно 200 (get(/boards)', async () =>{
        await db.BoardMember.create({members_id: '100', board_id: boardID, user_id: userID})
        const user = {user_id: userID, username: 'testuser', email: 'userTest00@example.ru',
            first_name:'first_name', last_name:'last_name'};

        const board = {
            members_id: '100', board_id: boardID, user_id: userID,
            Board:[
                {board_id: boardID, name_board: 'test'}
            ]
        }

        jest.spyOn(db.User, 'findOne').mockResolvedValue(user);
        jest.spyOn(db.BoardMember, 'findAll').mockResolvedValue(board);

        const res = await request(app)
            .get('/boards')
            .query({email: "userTest00@example.ru"})
            .set('Authorization', `Bearer ${accessToken}`)

        expect(db.User.findOne).toHaveBeenCalledWith({
            attributes: ['user_id', 'username','email', 'first_name', 'last_name'],
            where: { email: 'userTest00@example.ru' },
        });

        expect(db.BoardMember.findAll).toHaveBeenCalledWith({
            include:[{model: db.Board}],
            where:{user_id:userID}
        });

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('boards')
    })

    it('Получение списка досок. Ошибка 404 (get(/boards)', async () =>{
        jest.spyOn(db.User, 'findOne').mockResolvedValue(null);
        const res = await request(app)
            .get('/boards')
            .query({email: 'userTest00@example.ru'})
            .set('Authorization', `Bearer ${accessToken}`)
        expect(db.User.findOne).toHaveBeenCalledWith({
            attributes: ['user_id', 'username','email', 'first_name', 'last_name'],
            where: { email: 'userTest00@example.ru' },
        });
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('message', 'Email not found');
    })

    it('Ошибка авторизации 401 (Unauthorized) (get(/boards)', async () =>{
        const res = await request(app)
            .get('/boards')
            .query({email: "user1@example.ru"})
            .set('Authorization', `Bearer 122`);
        expect(res.status).toBe(401)
    })

    it('Изменение названия доски 200 (put(/boards) ', async () =>{
        jest.spyOn(db.Board, 'update').mockResolvedValue(boardID);
        const res = await request(app)
            .put('/board/test/update_board')
            .send({
                board_id: boardID,
                name_board: "test - update",
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(db.Board.update).toHaveBeenCalledWith({name_board: 'test - update'}, {
            where:{ board_id: boardID }
        })
        expect(res.status).toBe(200)
    })

    it('Изменение названия доски 400 (put(/boards) ', async () =>{
        const res = await request(app)
            .put('/board/test/update_board')
            .send({
                board_id: "",
                name_board: "test - update",
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(400)
    })

    it('Изменение названия доски 500 (put(/boards) ', async () =>{
        jest.spyOn(db.Board, 'update').mockRejectedValueOnce(new Error('Database connection failed'))
        const res = await request(app)
            .put('/board/test/update_board')
            .send({
                board_id: boardID,
                name_board: "test - update",
            })
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(500)
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toBe('Internal Server Error');

    })

    it('Изменение названия доски. Ошибка авторизации 401 (Unauthorized) (put(/boards) ', async () =>{
        const res = await request(app)
            .put('/board/test/update_board')
            .send({
                board_id: "87c5cd4f-8fa4-4480-9f1e-2b75133f6d65",
                name_board: "test - update",
            })
            .set('Authorization', `Bearer `)
        expect(res.status).toBe(401)
    })

    it('Удаление доски 204 (delete(/boards)', async () =>{
        jest.spyOn(db.Board, 'destroy').mockResolvedValue(null);
        jest.spyOn(db.BoardMember, 'destroy').mockResolvedValue(null);
        const res = await request(app)
            .delete('/boards')
            .query({board_id: boardID})
            .set('Authorization', `Bearer ${accessToken}`)
        expect(db.Board.destroy).toHaveBeenCalledWith( {
            where:{ board_id: boardID }
        })
        expect(db.BoardMember.destroy).toHaveBeenCalledWith( {
            where:{ board_id: boardID }
        })
        expect(res.status).toBe(204)
    })

    it('Удаление доски 404 (delete(/boards)', async () =>{
        jest.spyOn(db.Board, 'destroy').mockResolvedValue(null);
        jest.spyOn(db.BoardMember, 'destroy').mockResolvedValue(null);
        const res = await request(app)
            .delete('/boards')
            .query({board_id: null})
            .set('Authorization', `Bearer ${accessToken}`)

        expect(db.Board.destroy).toHaveBeenCalledWith( {
            where:{ board_id: null }
        })
        expect(db.BoardMember.destroy).toHaveBeenCalledWith( {
            where:{ board_id: boardID }
        })
        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty('message', 'Board not found');
    })

    it('Ошибка авторизации 401 (Unauthorized) (delete(/boards)', async () =>{
        const res = await request(app)
            .delete('/boards')
            .query({board_id: boardID})
            .set('Authorization', `Bearer 122`)
        expect(res.status).toBe(401)
    })
})

