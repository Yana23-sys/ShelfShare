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

beforeEach(() => {
  return seedMongoDB(data);
});

beforeAll(() => {
  return connectToMongo(config.mongo.uri);
});

afterAll(() => {
  return disconnectFromMongo();
});

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
        .then(({ body }) => {
          console.log(body);
          expect(body.books).toHaveLength(10);

          body.books.forEach((book) => {
            expect(book).toHaveProperty("title");
            expect(book).toHaveProperty("author");
            expect(book).toHaveProperty("genre");
            expect(book).toHaveProperty("description");
            expect(book).toHaveProperty("publication_year");
            expect(book).toHaveProperty("posted_date");
            expect(book).toHaveProperty("username");
            expect(book).toHaveProperty("cover_image_url");
          });
        });
    });
  });
});

describe("/api/books/:bookId", () => {
  test("200: returns the correct book by ID", () => {
    return request(app)
      .get("/api/books/1") // Use valid book ID from seed data
      .expect(200)
      .then(({ body }) => {
        expect(body.book).toHaveProperty("title", "To Kill a Mockingbird");
        expect(body.book).toHaveProperty("author", "Harper Lee");
        expect(body.book).toHaveProperty("genre", "Fiction");
        expect(body.book).toHaveProperty(
          "description",
          "A classic novel depicting racial injustice in the American South."
        );
        expect(body.book).toHaveProperty("publication_year", "1960");
        expect(body.book).toHaveProperty("posted_date", "2023");
        expect(body.book).toHaveProperty("username", "user02");
        expect(body.book).toHaveProperty(
          "cover_image_url",
          "https://i.ibb.co/2cXXyXt/To-Kill-a-Mockingbird.jpg"
        );
      });
  });

  test("400: responds with an error message when bookId is not valid", () => {
    return request(app)
      .get("/api/books/invalid-id")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Invalid book ID format");
      });
  });

  test("404: responds with an error when bookId does not exist", () => {
    return request(app)
      .get("/api/books/60c72b2f9b1d4f1a2c8e4b7d") // Use a non-existent book ID
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("Book not found");
      });
  });
});
