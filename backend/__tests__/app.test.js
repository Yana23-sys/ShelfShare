const data = require('../db/seed/data')
const { seedMongoDB } = require('../db/seed/run')
const request = require('supertest')
const app = require('../app')

beforeEach(() => {
    return seedMongoDB(data);
})

describe('invalid endpoint', () => {
    test('404 status and error message when given an endpoint that doesn\'t exist', () => {
        return request(app)
        .get('/api/not-a-route')
        .expect(404)
        .then(response => {
            expect(response.body.msg).toBe('path not found')
        })
    })
})