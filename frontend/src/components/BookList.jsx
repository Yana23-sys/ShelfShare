import { getAllBooks } from '../api';
import BookCard from './BookCard';

const BookList = () => {
    const books = getAllBooks();

    return (
        <section>
        {
            books.map((book) => {
                return (
                    <BookCard className='book-card' book= { book } key= { book.id }/>
                );
            })
        }
        </section>
    );
};
export default BookList;