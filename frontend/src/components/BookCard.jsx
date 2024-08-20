const BookCard = ({ book }) => {
    return (
        <>
            <img src={ book.image } alt='book-image' id='book-image'/>
            <h1 id='book-title'>{ book.title }</h1>
            <h3 id='book-author'>By { book.author }</h3>
        </>
    );
};

export default BookCard;