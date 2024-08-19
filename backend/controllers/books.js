const { findAllBooks } = require('../models/books')

exports.getAllBooks = (req, res, next) => {
    findAllBooks()  // Fetch all books from the database
    .then(books => {
        res.status(200).send({ books });
    })
    .catch(error => {
        console.error('Error fetching books:', error);
        next(error)
    });
};

