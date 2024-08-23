import books from '../backend/db/seed/data/test/books';

const getAllBooks = () => {
    return books
};

const getBookById = (id) => {
    let fetchedBook = books.find((book) => book.id === id)
    return fetchedBook
};

export { getAllBooks, getBookById };