import {getAllBooks} from '../../../api';
import BookCard from './Bookcard';

const BookList = () => {
    const books = getAllBooks();

    return (
        <section>
        {
            books.map((book) => {
                return (
                    <BookCard book= {book} key= {book.id}/>
                );
            })
        }
        </section>
    );
};
export default BookList;