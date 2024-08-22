import Link from 'next/link';
import styles from '../Styles/Bookcard.module.css';

const BookCard = ({book}) => {
    return (
        <section className={styles.bookcard}>
            {console.log(book)}
            <img src={book.cover_image_url} alt='book-image' id='book-image'/>
            <h1 id='book-title'>{book.title}</h1>
            <h3 id='book-author'>By {book.author}</h3>

            <button key={styles.booklink}>
            <Link href={`/books/${book.id}`}>Book Link</Link>
            </button>

        </section>
    );
};

export default BookCard;

