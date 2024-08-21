const mongoose = require('mongoose')
const { Genre } = require('./genres')
const { User } = require('./users')
const Schema = mongoose.Schema

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: Schema.Types.ObjectId, ref: 'Genre', required: true },
    description: { type: String },
    publication_year: { type: String },
    posted_date: { type: String }, // change type to Date
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Assuming this links to a user who posted the book
    cover_image_url: { type: String },
});

const Book = mongoose.model('Book', bookSchema);


// Mongoose .populate() method to automatically replace the references with the actual documents from the genres and users collections
const findAllBooks = () => {
  return Book.find()
    .populate('genre', 'name') // Populates the 'genre' field with the 'name' from the Genre collection
    .populate('user', 'username') // Populates the 'username' field with 'username' from the User collection
    .then(books => {
      return books
    })
    .catch(err => {
      console.error('Error fetching books:', err)
      throw err
    })

}

const insertBook = (newBook) => {

  const book = new Book(newBook)
  return book.save()
    .then(savedBook => savedBook)
    .catch(err => {
      console.error('Error inserting book:', err)
      throw err
    })
}

module.exports = { findAllBooks, insertBook }