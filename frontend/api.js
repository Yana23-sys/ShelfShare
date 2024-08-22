import books from '../backend/db/seed/data/test/books';

const getAllBooks = () => {
    return books
};

const getBookById = (id) => {
    return books.find(book => book.id === id)
};

export { getAllBooks, getBookById };