const { findAllBooks, insertBook } = require('../models/books')

// if user has not provided any img -> default img cover url
const DEFAULT_COVER_IMAGE_URL = 'https://media.istockphoto.com/id/483822100/vector/closed-old-book-with-a-red-bookmark.jpg?s=612x612&w=0&k=20&c=OqF55jpQv2EOO1_Ivwbx2rgFFtw1RLCE5DWF93IR8Ic='


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

exports.postBook = (req, res, next) => {
    const { title, author, genre, description, publication_year, posted_date, username, cover_image_url } = req.body

    if (!title || !author || !genre || !username) {
        return res.status(400).send({ message: 'Please provide all required fields' })
    }

    const coverImgUrl = cover_image_url || DEFAULT_COVER_IMAGE_URL

    const newBook = { title, author, genre, description, publication_year, posted_date, username, cover_image_url: coverImgUrl }

    insertBook(newBook)
    .then(book => res.status(201).send({ book }))
    .catch((error) => {
        console.error('Error inserting book:', error)
        next(error)
    })
}