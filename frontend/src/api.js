import books from '../../backend/db/seed/data/test/books';

const getAllBooks = () => {
    return books
};

const getBookById = (id) => {
    let fetchedBook = books.find((book) => Number(book.id) === id)
    console.log('TEST: ', fetchedBook)
    return fetchedBook
};

export { getAllBooks, getBookById };

