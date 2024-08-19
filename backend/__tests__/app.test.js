const data = require('../db/seed/data')
const { seedMongoDB } = require('../db/seed')
const config = require('../config')
const { connectToMongo, disconnectFromMongo } = require('../db/mongo')
const request = require('supertest')
const app = require('../app')

beforeEach(() => {
    return seedMongoDB(data);
})

beforeAll(() => {
    return connectToMongo(config.mongo.uri)
})

afterAll(() => {
    return disconnectFromMongo()
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

describe('/api/books', () => {
    describe('GET', () => {
        test('200: returns all books', () => {
            return request(app)
            .get('/api/books')
            .expect(200)
            .then(( { body } ) => {
                expect(body.books).toHaveLength(2)

                body.books.forEach (book => {
                    expect(book).toHaveProperty('title')
                    expect(book).toHaveProperty('author')
                    expect(book).toHaveProperty('genre')
                    expect(book).toHaveProperty('available')
                })
            })
        })
    })
})

