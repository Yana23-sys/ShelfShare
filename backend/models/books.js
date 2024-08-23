const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { formatDate } = require("../db/seed/data/utils_data");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: Schema.Types.ObjectId, ref: "Genre", required: true },
  description: { type: String },
  publication_year: { type: String },
  posted_date: { type: Date, default: Date.now }, // change type to Date
  user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Assuming this links to a user who posted the book
  cover_image_url: { type: String },
});

const Book = mongoose.model("Book", bookSchema);

// Mongoose .populate() method to automatically replace the references with the actual documents from the genres and users collections
const findAllBooks = async (sortCriteria = {}, filterCriteria = {}) => {
  try {
    let sort = {};
    if (sortCriteria.sortBy === "genre") {
      sort = { "genre.name": 1 }; // Sort by genre name (ascending)
    } else if (sortCriteria.sortBy === "author") {
      sort = { author: 1 }; // Sort by author name (ascending)
    } else if (sortCriteria.sortBy === "location") {
      sort = { "user.location": 1 }; // Sort by user location (ascending)
    } else {
      sort = { title: 1 }; // Default sort by title (ascending)
    }

    const books = await Book.find(filterCriteria)
      .populate("genre", "name")
      .populate("user", "username location")
      .sort(sort); // Apply sorting directly in MongoDB query

    return books;
  } catch (err) {
    console.error("Error fetching books:", err);
    throw err;
  }
};

const insertBook = (newBook) => {
  if (newBook.posted_date) {
    newBook.posted_date = formatDate(newBook.posted_date, "DD-MM-YYYY"); // Convert to Date format
  }

  const book = new Book(newBook);
  return book
    .save()
    .then((savedBook) => savedBook)
    .catch((err) => {
      console.error("Error inserting book:", err);
      throw err;
    });
};

const findBookById = (id) => {
  return Book.findById(id)
    .populate("genre", "name")
    .populate("user", "username")
    .catch((err) => {
      console.error("Error fetching book by Id:", err);
      throw err;
    });
};

module.exports = { findAllBooks, insertBook, findBookById };
