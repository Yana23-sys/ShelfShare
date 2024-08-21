const data = require("../db/seed/data");
const { seedMongoDB } = require("../db/seed/seed");
const config = require("../config");
const {
  connectToMongo,
  disconnectFromMongo,
} = require("../db/mongodb-connection");
const request = require("supertest");
const app = require("../app");
const endpoints = require("../controllers/endpoints");

beforeEach( async () => {
    await seedMongoDB(data);
})

beforeAll( async () => {
    await connectToMongo(config.mongo.uri)
})

afterAll( async () => {
    await disconnectFromMongo()
})

describe("invalid endpoint", () => {
  test("404 status and error message when given an endpoint that doesn't exist", () => {
    return request(app)
      .get("/api/not-a-route")
      .expect(404)
      .then((response) => {
        expect(response.body.message).toBe("path not found");
      });
  });
});

describe("/api", () => {
  test("GET: responds with a json object with all available endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body.endpoints).toEqual(endpoints);
      });
  });
});

describe("/api/books", () => {
  describe("GET", () => {
    test("200: returns all books", () => {
      return request(app)
        .get("/api/books")
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
                    expect(book).toHaveProperty('user')
                    expect(book).toHaveProperty('cover_image_url')
                })
            })
        })
    })

    describe('POST', () => {
        test('201: creates a new book', () => {
            const newBook = {
                title: "TEST BOOK",
                author: "AUTHOR",
                genre: "Fantasy",
                description:
                  "The prequel to The Lord of the Rings, following Bilbo Baggins' journey.",
                publication_year: "1937",
                posted_date: "2021",
                username: "yana53674808",
                cover_image_url: "https://i.ibb.co/PM0BQcf/The-Hobbit.jpg"
            }

            return request(app)
            .post('/api/books')
            .send(newBook)
            .expect(201)
            .then(({ body }) => {
                expect(body.book).toMatchObject(newBook)
            })
        })

        test('cover_image_url will default if not provided', () => {
            const newBook = {
                title: "TEST BOOK (without img)",
                author: "AUTHOR",
                genre: "Fantasy",
                description:
                  "The prequel to The Lord of the Rings, following Bilbo Baggins' journey.",
                publication_year: "1937",
                posted_date: "2021",
                username: "yana53674808"
            }

            return request(app)
            .post('/api/books')
            .send(newBook)
            .expect(201)
            .then(({ body }) => {
                expect(body.book.cover_image_url).toBe('https://media.istockphoto.com/id/483822100/vector/closed-old-book-with-a-red-bookmark.jpg?s=612x612&w=0&k=20&c=OqF55jpQv2EOO1_Ivwbx2rgFFtw1RLCE5DWF93IR8Ic=')
            })
        })

        test('400: returns error if missing required fields', () => {
            const newBook = {
                author: "AUTHOR",
                genre: "Fantasy",
                description:
                  "The prequel to The Lord of the Rings, following Bilbo Baggins' journey.",
                publication_year: "1937",
                posted_date: "2021",
                username: "yana53674808"
            }

            return request(app)
            .post('/api/books')
            .send(newBook)
            .expect(400)
            .then(({ body }) => {
                expect(body.message).toBe('Please provide all required fields')
            })
        })

        test('404: returns error if user not found', () => {
            const newBook = {
                title: "TEST BOOK",
                author: "AUTHOR",
                genre: "Fantasy",
                description:
                  "The prequel to The Lord of the Rings, following Bilbo Baggins' journey.",
                publication_year: "1937",
                posted_date: "2021",
                username: "not-existent-user",
                cover_image_url: "https://i.ibb.co/PM0BQcf/The-Hobbit.jpg"
            }

            return request(app)
            .post('/api/books')
            .send(newBook)
            .expect(404)
            .then(({ body }) => {
                expect(body.message).toBe(`User 'not-existent-user' not found`)
            })
        })

        test('404: returns error if genre not found', () => {
            const newBook = {
                title: "TEST BOOK",
                author: "AUTHOR",
                genre: "not-existent-genre",
                description:
                  "The prequel to The Lord of the Rings, following Bilbo Baggins' journey.",
                publication_year: "1937",
                posted_date: "2021",
                username: "yana53674808",
                cover_image_url: "https://i.ibb.co/PM0BQcf/The-Hobbit.jpg"
            }

            return request(app)
            .post('/api/books')
            .send(newBook)
            .expect(404)
            .then(({ body }) => {
                expect(body.message).toBe(`Genre 'not-existent-genre' not found`)
            })
        })
    })
})

