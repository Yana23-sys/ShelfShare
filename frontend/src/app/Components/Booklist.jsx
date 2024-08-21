import { getAllBooks } from '../../api';
import styles from '../Styles/Booklist.module.css';

import BookCard from './BookCard';

const BookList = () => {
    const books = getAllBooks();

    return (
        <section>
        {
            books.map((book) => {
                return (
                    <BookCard className={styles.booklist} book= { book } key= { book.id }/>
                );
            })
        }
        </section>
    );
};
export default BookList;