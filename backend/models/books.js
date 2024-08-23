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
    const { sortBy } = sortCriteria;

    let sort = {};
    if (sortBy === "genre") {
      sort = { "genre.name": 1 }; // Sort by genre name (ascending)
    } else if (sortBy === "author") {
      sort = { author: 1 }; // Sort by author name (ascending)
    } else if (sortBy === "location") {
      sort = { "user.location": 1 }; // Sort by user location (ascending)
    } else {
      sort = { title: 1 }; // Default sort by title (ascending)
    }

    const books = await Book.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $lookup: {
          from: "genres",
          localField: "genre",
          foreignField: "_id",
          as: "genre",
        },
      },
      { $unwind: "$genre" },
      { $match: filterCriteria },
      { $sort: sort },
    ]);

    return books;
  } catch (err) {
    console.error("Error fetching books:", err);
    throw err;
  }
};
// Here’s a breakdown of why each stage is used in the aggregation pipeline for sorting:

// $lookup (First Stage):

// Joins the Book collection with the users collection to include user details.
// Adds user details as a new field in the Book documents.
// $unwind (First Stage):

//unwind
// Converts the array of user details into individual documents. Each book now has a single user object instead of an array.
// $lookup (Second Stage):

// Joins the Book collection with the genres collection to include genre details.
// Adds genre details as a new field in the Book documents.
// $unwind (Second Stage):
//unwind
// Converts the array of genre details into individual documents. Each book now has a single genre object instead of an array.
// $match:

//match
// Applies any additional filters specified in the filterCriteria.

//sort
// Sorts the documents based on the fields in the sort object, which can now include the populated fields.

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
