const { findAllBooks, findBookById } = require("../models/books");

const getAllBooks = (req, res, next) => {
  findAllBooks() // Fetch all books from the database
    .then((books) => {
      res.status(200).send({ books });
    })
    .catch((error) => {
      console.error("Error fetching books:", error);
      next(error);
    });
};

const getBookById = (req, res, next) => {
  const { bookId } = req.params;

  // Ensure the bookId is a number
  const numericId = parseInt(bookId, 10);

  if (isNaN(numericId)) {
    return res.status(400).send({ message: "Invalid book ID format" });
  }

  findBookById(numericId)
    .then((book) => {
      if (!book) {
        return res.status(404).send({ message: "Book not found" });
      }
      res.status(200).send({ book });
    })
    .catch((error) => {
      console.error("Error fetching book by Id:", error);
      next(error);
    });
};

module.exports = { getBookById, getAllBooks };
