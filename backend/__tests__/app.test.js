const data = require('../db/seed/data')
const { seedMongoDB } = require('../db/seed')
const config = require('../config')
const { connectToMongo, disconnectFromMongo } = require('../db/mongo')
const request = require('supertest')
const app = require('../app')
const endpoints = require('../controllers/endpoints')

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
            expect(response.body.message).toBe('path not found')
        })
    })
})

describe('/api', () => {
    test('GET: responds with a json object with all available endpoints', () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then(({ body}) => {
            expect(body.endpoints).toEqual(endpoints)
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
                expect(body.books).toHaveLength(10)

                body.books.forEach (book => {
                    expect(book).toHaveProperty('title')
                    expect(book).toHaveProperty('author')
                    expect(book).toHaveProperty('genre')
                    expect(book).toHaveProperty('description')
                    expect(book).toHaveProperty('publication_year')
                    expect(book).toHaveProperty('posted_date')
                    expect(book).toHaveProperty('username')
                    expect(book).toHaveProperty('cover_image_url')
                })
            })
        })
    })
})

