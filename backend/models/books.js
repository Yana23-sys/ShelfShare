const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    description: { type: String },
    publication_year: { type: String },
    posted_date: { type: String },
    username: { type: String, required: true }, // Assuming this links to a user who posted the book
    cover_image_url: { type: String },
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