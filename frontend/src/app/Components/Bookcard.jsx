import Link from 'next/link';
import styles from '../Styles/Bookcard.module.css';

const BookCard = ({book}) => {
    return (
        <section className={styles.bookcard}>
            <Link href={`/books/${book.id}`}>
            
                <img src={book.cover_image_url} alt='book-image' id='book-image'/>
                <h1 id='book-title'>{book.title}</h1>
                <h3 id='book-author'>By {book.author}</h3>
            </Link>
        </section>
    );
};

export default BookCard;

