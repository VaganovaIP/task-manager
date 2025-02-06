const request = require('supertest')
const app = require('../server.js')
const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.JWT_SECRET;

// jest.mock('./config/db.js');

// jest.mock('jsonwebtoken');

describe(('Board API'), () =>{
    let accessToken;

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

    it('Показ всех досок пользователя', async () =>{
        const res = await request(app)
            .get('/boards')
            .query({email: "user1@example.ru"})
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200)
        expect(res.status).toBe(200)
    })

    it('Ошибка базы данных', async () =>{
        const res = await request(app)
            .get('/boards')

            .set('Authorization', `Bearer 122`);

        expect(res.status).toBe(500)
    })
})