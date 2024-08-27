const data = require("../db/seed/data");
const { seedMongoDB } = require("../db/seed/seed");
const config = require("../config");
const {connectToMongo, disconnectFromMongo} = require("../db/mongodb-connection");
const request = require("supertest");
const app = require("../app");
const endpoints = require("../controllers/endpoints");
require("jest-extended");

let testData = {};

beforeEach(async () => {
  testData = await seedMongoDB(data);
});

beforeAll(async () => {
  await connectToMongo(config.mongo.uri);
});

afterAll(async () => {
  await disconnectFromMongo();
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
          expect(body.books).toHaveLength(10);

          body.books.forEach((book) => {
            expect(book).toHaveProperty("title");
            expect(book).toHaveProperty("author");
            expect(book).toHaveProperty("genre");
            expect(book).toHaveProperty("description");
            expect(book).toHaveProperty("publication_year");
            expect(book).toHaveProperty("posted_date");
            expect(book).toHaveProperty("user");
            expect(book).toHaveProperty("cover_image_url");
          });
        });
    });
    test("200: returns all books for given user", () => {
      const userId = testData.users[0]._id;

      return request(app)
        .get(`/api/books?user_id=${userId}`)
        .expect(200)
        .then(({ body }) => {
          expect(body.books).toHaveLength(2);

          body.books.forEach((book) => {
            expect(book.user._id).toEqual(userId.toString());
          });
        });
    });
  });

  describe("POST", () => {
    test("201: creates a new book", () => {
      const newBook = {
        title: "TEST BOOK",
        author: "AUTHOR",
        genre: "Fantasy",
        description:
          "The prequel to The Lord of the Rings, following Bilbo Baggins' journey.",
        publication_year: "1937",
        posted_date: "2021-01-01T00:00:00.000Z",
        username: "yana53674808",
        cover_image_url: "https://i.ibb.co/PM0BQcf/The-Hobbit.jpg",
      };

      return request(app)
        .post("/api/books")
        .send(newBook)
        .expect(201)
        .then(({ body }) => {
          expect(body.book).toMatchObject(newBook);
        });
    });

    test("cover_image_url will default if not provided", () => {
      const newBook = {
        title: "TEST BOOK (without img)",
        author: "AUTHOR",
        genre: "Fantasy",
        description:
          "The prequel to The Lord of the Rings, following Bilbo Baggins' journey.",
        publication_year: "1937",
        posted_date: "2021-01-01T00:00:00.000Z",
        username: "yana53674808",
      };

      return request(app)
        .post("/api/books")
        .send(newBook)
        .expect(201)
        .then(({ body }) => {
          expect(body.book.cover_image_url).toBe(
            "https://media.istockphoto.com/id/483822100/vector/closed-old-book-with-a-red-bookmark.jpg?s=612x612&w=0&k=20&c=OqF55jpQv2EOO1_Ivwbx2rgFFtw1RLCE5DWF93IR8Ic="
          );
        });
    });

    test("400: returns error if missing required fields", () => {
      const newBook = {
        author: "AUTHOR",
        genre: "Fantasy",
        description:
          "The prequel to The Lord of the Rings, following Bilbo Baggins' journey.",
        publication_year: "1937",
        posted_date: "2021-01-01T00:00:00.000Z",
        username: "yana53674808",
      };

      return request(app)
        .post("/api/books")
        .send(newBook)
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("Please provide all required fields");
        });
    });

    test("404: returns error if user not found", () => {
      const newBook = {
        title: "TEST BOOK",
        author: "AUTHOR",
        genre: "Fantasy",
        description:
          "The prequel to The Lord of the Rings, following Bilbo Baggins' journey.",
        publication_year: "1937",
        posted_date: "2021-01-01T00:00:00.000Z",
        username: "not-existent-user",
        cover_image_url: "https://i.ibb.co/PM0BQcf/The-Hobbit.jpg",
      };

      return request(app)
        .post("/api/books")
        .send(newBook)
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe(`User 'not-existent-user' not found`);
        });
    });

    test("404: returns error if genre not found", () => {
      const newBook = {
        title: "TEST BOOK",
        author: "AUTHOR",
        genre: "not-existent-genre",
        description:
          "The prequel to The Lord of the Rings, following Bilbo Baggins' journey.",
        publication_year: "1937",
        posted_date: "2021-01-01T00:00:00.000Z",
        username: "yana53674808",
        cover_image_url: "https://i.ibb.co/PM0BQcf/The-Hobbit.jpg",
      };

      return request(app)
        .post("/api/books")
        .send(newBook)
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe(`Genre 'not-existent-genre' not found`);
        });
    });
  });
});

describe("/api/books/:bookId", () => {
  test("200: returns the correct book by ID", () => {
    const bookId = testData.books[0]._id;

    return request(app)
      .get(`/api/books/${bookId}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.book).toHaveProperty("title", "To Kill a Mockingbird");
        expect(body.book).toHaveProperty("author", "Harper Lee");
        expect(body.book).toHaveProperty("genre");
        expect(body.book.genre).toHaveProperty("name", "Fiction");
        expect(body.book).toHaveProperty(
          "description",
          "A classic novel depicting racial injustice in the American South."
        );
        expect(body.book).toHaveProperty("publication_year", "1960");
        expect(body.book).toHaveProperty(
          "posted_date",
          "2023-12-14T00:00:00.000Z"
        );

        expect(body.book).toHaveProperty("user");
        expect(body.book.user).toHaveProperty("username", "danleonard23");

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

describe("GET /api/books, for sort_by query", () => {
  test("?sort_by=genre responds with an array of books ordered by genre", () => {
    return request(app)
      .get("/api/books?sort_by=genre")
      .expect(200)
      .then(({ body }) => {
        expect(body.books.length).toBeGreaterThan(0); // Adjust this based on the number of books you have

        // Flatten the genre field for sorting validation
        const booksWithGenre = body.books.map((book) => ({
          ...book,
          genre: book.genre.name,
        }));

        // Manually check if sorted
        const sortedBooks = [...booksWithGenre].sort((a, b) =>
          a.genre.localeCompare(b.genre)
        );
        expect(booksWithGenre).toEqual(sortedBooks); // Check if manually sorted array matches the result
      });
  });

  test("?sort_by=author responds with an array of books ordered by author", () => {
    return request(app)
      .get("/api/books?sort_by=author")
      .expect(200)
      .then(({ body }) => {
        expect(body.books.length).toBeGreaterThan(0); // Adjust this based on the number of books you have
        expect(body.books).toBeSortedBy("author", { ascending: true });
      });
  });

  test("?sort_by=location responds with an array of books ordered by location", () => {
    return request(app)
      .get("/api/books?sort_by=location")
      .expect(200)
      .then(({ body }) => {
        expect(body.books.length).toBeGreaterThan(0); // Ensure there are books returned

        const booksWithLocation = body.books.map((book) => ({
          ...book,
          location: book.user.location,
        }));

        // Manually check if sorted
        const sortedBooks = [...booksWithLocation].sort((a, b) =>
          a.location.localeCompare(b.location)
        );
        expect(booksWithLocation).toEqual(sortedBooks); // Check if manually sorted array matches the result
      });
  });

  test('400: responds with "Invalid sort_by field" error message when given an invalid sort_by query', () => {
    return request(app)
      .get("/api/books?sort_by=invalid-query")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Invalid sort_by field");
      });
  });
});

describe("GET /api/users", () => {
  test("200: responds with an array of users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        expect(body.users.length).toEqual(5);
      });
  });
})

describe("/api/swaps", () => {
  describe("POST", () => {
  test("201: creates a new swap", () => {
    const newSwap = {
      sender: testData.users[0]._id.toString(),
      receiver: testData.users[1]._id.toString(),
      sender_book: testData.books[0]._id.toString(),
      receiver_book: testData.books[1]._id.toString()
    };
    return request(app)
      .post("/api/swaps")
      .send(newSwap)
      .expect(201)
      .then(({ body }) => {
        console.log(body)
        expect(body.swap).toMatchObject(newSwap);
        expect(body.swap.status).toBe("pending");
      });
  });

  test("400: responds with error code 400 when some information is not provided", () => {
    const newSwap = {
      sender: testData.users[0]._id.toString(),
      receiver: testData.users[1]._id.toString(),
      receiver_book: testData.books[1]._id.toString()
    };
    return request(app)
    .post("/api/swaps")
    .send(newSwap)
    .expect(400)
    .then(({body}) => {
      expect(body.message).toBe("Please provide all required fields")
    })
  })

  test("400: responds with error code 400 when an invalid ID is given", () => {
    const newSwap = {
      sender: "113545",
      receiver: testData.users[1]._id.toString(),
      sender_book: testData.books[0]._id.toString(),
      receiver_book: testData.books[1]._id.toString()
    };
    return request(app)
    .post("/api/swaps")
    .send(newSwap)
    .expect(400)
    .then(({body}) => {
      expect(body.message).toBe("Invalid ID format")
    })
  })

  test("404: responds with error code 404 when a non-existent user Id is provided", () => {
    const newSwap = {
      sender: "66cda4cd325ea63cf40758b2",
      receiver: testData.users[1]._id.toString(),
      sender_book: testData.books[0]._id.toString(),
      receiver_book: testData.books[1]._id.toString()
    };
    return request(app)
    .post("/api/swaps")
    .send(newSwap)
    .expect(404)
    .then(({body}) => {
      expect(body.message).toBe("Non existent userId provided")
    })
  })

  test("404: responds with error code 404 when a non-existent book Id is provided", () => {
    const newSwap = {
      sender: testData.users[0]._id.toString(),
      receiver: testData.users[1]._id.toString(),
      sender_book: "66cda4ce123ea63cf20259ad",
      receiver_book: testData.books[1]._id.toString()
    };
    return request(app)
    .post("/api/swaps")
    .send(newSwap)
    .expect(404)
    .then(({body}) => {
      expect(body.message).toBe("Non existent bookId provided")
    })
  })

})
})
