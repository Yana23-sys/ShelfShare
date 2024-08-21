const { findAllBooks, insertBook, findBookById } = require("../models/books");
const { findUserByName } = require("../models/users");
const { findGenreByName } = require("../models/genres");
const { formatDate } = require("../db/seed/data/utils_data");
const mongoose = require("mongoose");

// if user has not provided any img -> default img cover url
const DEFAULT_COVER_IMAGE_URL =
  "https://media.istockphoto.com/id/483822100/vector/closed-old-book-with-a-red-bookmark.jpg?s=612x612&w=0&k=20&c=OqF55jpQv2EOO1_Ivwbx2rgFFtw1RLCE5DWF93IR8Ic=";

exports.getAllBooks = async (req, res, next) => {
  try {
    // Extract sorting criteria from query parameters
    const sort_by = req.query.sort_by;
    let sortCriteria = {};

    // Validate and set sort criteria
    switch (sort_by) {
      case "genre":
        sortCriteria = { "genre.name": 1 }; // Ascending order by genre name
        break;
      case "author":
        sortCriteria = { author: 1 }; // Ascending order by author
        break;
      case "location":
        sortCriteria = { "user.location": 1 }; // Ascending order by user location
        break;
      default:
        if (sort_by) {
          return res.status(400).send({ message: "Invalid sort_by field" });
        }
    }

    const books = await findAllBooks(sortCriteria);
    res.status(200).send({ books });
  } catch (error) {
    console.error("Error fetching books:", error);
    next(error);
  }
};

exports.getBookById = (req, res, next) => {
  const { bookId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).send({ message: "Invalid book ID format" });
  }

  findBookById(bookId)
    .then((book) => {
      if (!book) {
        return res.status(404).send({ message: "Book not found" });
      }
      book.posted_date = formatDate(book.posted_date);
      res.status(200).send({ book });
    })
    .catch((error) => {
      console.error("Error fetching book by Id:", error);
      next(error);
    });
};

exports.createBook = async (req, res, next) => {
  const {
    title,
    author,
    genre: genreName,
    description,
    publication_year,
    posted_date,
    username,
    cover_image_url,
  } = req.body;

  if (!title || !author || !genreName || !username) {
    return res
      .status(400)
      .send({ message: "Please provide all required fields" });
  }

  const user = await findUserByName(username);
  if (!user) {
    return res.status(404).send({ message: `User '${username}' not found` });
  }
  const genre = await findGenreByName(genreName);
  if (!genre) {
    return res.status(404).send({ message: `Genre '${genreName}' not found` });
  }

  const coverImgUrl = cover_image_url || DEFAULT_COVER_IMAGE_URL;

  // Convert posted_date to Date object
  const [day, month, year] = posted_date.split("/");
  const formattedDate = new Date(`${day}-${month}-${year}`);

  const newBook = {
    title,
    author,
    description,
    publication_year,
    posted_date: formattedDate,
    cover_image_url: coverImgUrl,
    user: user._id,
    genre: genre._id,
  };

  try {
    const insertedBook = await insertBook(newBook);
    const book = { ...insertedBook.toObject(), username, genre: genreName };
    // Reformat date before sending in response
    book.posted_date = formatDate(book.posted_date);
    res.status(201).send({ book });
  } catch (error) {
    console.error("Error inserting book:", error);
    next(error);
  }
};
