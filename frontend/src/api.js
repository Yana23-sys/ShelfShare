import bookData from "./bookData";

const getAllBooks = () => {
    return bookData;
};

const getBookById = () => {
    return bookData[0]; // [0] book_id placeholder
};

export { getAllBooks, getBookById };

