const { findAllBooks, insertBook, findBookById } = require('../models/books')
const { findUserByName } = require('../models/users')
const { findGenreByName } = require('../models/genres')

// if user has not provided any img -> default img cover url
const DEFAULT_COVER_IMAGE_URL = 'https://media.istockphoto.com/id/483822100/vector/closed-old-book-with-a-red-bookmark.jpg?s=612x612&w=0&k=20&c=OqF55jpQv2EOO1_Ivwbx2rgFFtw1RLCE5DWF93IR8Ic='


exports.getAllBooks = (req, res, next) => {
    findAllBooks()  // Fetch all books from the database
    .then(books => {
        res.status(200).send({ books });
    })
    .catch((error) => {
      console.error("Error fetching books:", error);
      next(error);
    });
};

exports.getBookById = (req, res, next) => {
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

exports.postBook = async (req, res, next) => {
    const { title, author, genre: genreName, description, publication_year, posted_date, username, cover_image_url } = req.body

    if (!title || !author || !genreName || !username) {
        return res.status(400).send({ message: 'Please provide all required fields' })
    }

    const user = await findUserByName(username)
    if (!user) {
        return res.status(404).send({ message: `User '${username}' not found` })
    }
    const genre = await findGenreByName(genreName)
    if (!genre) {
        return res.status(404).send({ message: `Genre '${genreName}' not found` })
    }

    const coverImgUrl = cover_image_url || DEFAULT_COVER_IMAGE_URL

    const newBook = { title, author, description, publication_year, posted_date, cover_image_url: coverImgUrl, user: user._id, genre: genre._id }

    return insertBook(newBook)
    .then(insertedBook => {
        // returned type is not an object -> parse it to obj using toObject()
        const book = {...insertedBook.toObject(), username, genre: genreName}
        res.status(201).send({ book })
    })
    .catch((error) => {
        console.error('Error inserting book:', error)
        next(error)
    })
}