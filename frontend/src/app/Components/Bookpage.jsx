
import styles from '../Styles/Bookpage.module.css';

const BookPage = ({book}) => {

    return (
        <section className={styles.bookpage}>

            <img src={book.cover_image_url} alt='book-image' id='book-image'/>
            <h1 id='book-title'>{book.title}</h1>
            <h3 id='book-author'>By {book.author}</h3>
            <p id='book-description'>{book.description}</p>
            <h3 id='book-genre'>{book.genre}</h3>
            <h3 id='book-condition'>{book.condition}</h3>

        </section>    
    );
};

export default BookPage;