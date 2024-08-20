const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  description: { type: String },
  publication_year: { type: String },
  posted_date: { type: String },
  username: { type: String, required: true },
  cover_image_url: { type: String },
});

// Ensure that `_id` is not required or is explicitly handled
bookSchema.index({ id: 1 }, { unique: true });

const Book = mongoose.model("Book", bookSchema);

const findAllBooks = async () => {
  try {
    const books = await Book.find();
    return books;
  } catch (err) {
    console.error(err);
  }
};

const findBookById = async (id) => {
  try {
    const bookId = Number(id); // Ensure id is a Number
    const book = await Book.findOne({ id: bookId });
    return book;
  } catch (err) {
    console.error("Error fetching book by Id:", err);
    throw err;
  }
};

module.exports = { findAllBooks, findBookById, Book };
