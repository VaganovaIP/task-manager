const jwt = require("jsonwebtoken");
const request = require("supertest");
const app = require("../../server")
const SECRET_KEY = process.env.JWT_SECRET;
const {v4: uuidv4} = require("uuid");
const db = require("../../config/db");
const boardID = uuidv4()
const userID = uuidv4()

describe(('Member controller'), () => {
    let accessToken;

    jest.mock("../../config/db", ()=> ({
        BoardMember: {
            create: jest.fn(),
            destroy: jest.fn(),
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

    it('Добавление участника доски 201 (post(/board/:name_board)', async () =>{
        const member = {user_id: userID, board_id:boardID}
        jest.spyOn(db.BoardMember, 'create').mockResolvedValue({});
        const res = await request(app)
            .post('/board/test2')
            .send({
                formName: "form-add-members",
                user_id: userID,
                board_id: boardID,
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(db.BoardMember.create).toHaveBeenCalledWith(member);
        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty('message', 'New member created')
    })

    it('Добавление участника доски 400 (post(/board/:name_board)', async () =>{
        const res = await request(app)
            .post('/board/test2')
            .send({
                formName: "form-add-members",
                user_id: null,
                board_id: null
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('message', 'Id not found')
    })

    it('Добавление участника доски. Ошибка 401 (Unauthorized) (post(/board/:name_board)', async () =>{
        const res = await request(app)
            .post('/board/test')
            .send({
                formName: "form-add-members",
                user_id: userID,
                board_id: boardID,
            })
            .set('Authorization', `Bearer `)
        expect(res.status).toBe(401)
    })

    it('Исключение участника доски 204 (No content) (delete(/board/:name_board)', async () =>{
        jest.spyOn(db.BoardMember, 'destroy').mockResolvedValue(155);
        const res = await request(app)
            .delete('/board/test')
            .send({
                formName: "form-delete-member",
                member_id: 155
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(db.BoardMember.destroy).toHaveBeenCalledWith( {
            where:{ members_id: 155}
        })
        expect(res.status).toBe(204)
    })

    it('Исключение участника доски 400 (delete(/board/:name_board)', async () =>{
        const res = await request(app)
            .delete('/board/test')
            .send({
                formName: "form-delete-member",
                member_id: null
            })
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('message', 'Id not found')

    })

    it('Исключение участника доски. Ошибка 401 (Unauthorized) (delete(/board/:name_board)', async () =>{
        const res = await request(app)
            .delete('/board/test')
            .send({
                formName: "form-delete-member",
                member_id: "1"
            })
            .set('Authorization', `Bearer `)
        expect(res.status).toBe(401)
    })

})