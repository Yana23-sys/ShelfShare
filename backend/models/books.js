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
const findAllBooks = async (sortCriteria = {}) => {
  try {
    // Fetch books with populated fields
    const books = await Book.find()
      .populate("genre", "name")
      .populate("user", "username location"); // Ensure 'location' is included

    // Sort books based on the sort criteria
    if (sortCriteria["genre.name"]) {
      // Sort by genre name
      books.sort((a, b) => {
        const genreA = a.genre.name || "";
        const genreB = b.genre.name || "";
        return genreA.localeCompare(genreB);
      });
    } else if (sortCriteria["author"]) {
      // Sort by author name
      books.sort((a, b) => a.author.localeCompare(b.author));
    } else if (sortCriteria["user.location"]) {
      // Sort by user location
      books.sort((a, b) => {
        const locationA = a.user.location || "";
        const locationB = b.user.location || "";
        return locationA.localeCompare(locationB);
      });
    } else {
      // Default sort (e.g., by title)
      books.sort((a, b) => {
        const titleA = a.title || "";
        const titleB = b.title || "";
        return titleA.localeCompare(titleB);
      });
    }

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
