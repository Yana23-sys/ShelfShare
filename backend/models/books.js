const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    available: { type: Boolean, required: true }
});

const Book = mongoose.model('Book', bookSchema);

const findAllBooks = async () => {
    try {
      const books = await Book.find();
      return books;
    } catch (err) {
      console.error(err);
    }
}

module.exports = { findAllBooks }