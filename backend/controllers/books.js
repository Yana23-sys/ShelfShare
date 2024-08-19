const { findAllBooks } = require('../models/books')

exports.getAllBooks = (req, res) => {
    findAllBooks()  // Fetch all books from the database
    .then(books => {
        res.status(200).send({ books });
    })
    .catch(error => {
        console.error('Error fetching books:', error);
        res.status(500).send({ msg: 'Internal Server Error' });
    });
};

