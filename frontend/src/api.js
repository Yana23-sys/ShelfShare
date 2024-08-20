import bookData from "./components/bookData";

const getAllBooks = () => {
    return bookData;
};

const getBookById = () => {
    return bookData[0];
};

export { getAllBooks, getBookById };

