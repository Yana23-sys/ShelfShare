import styles from '../Styles/Bookcard.module.css';
import BookList from '../Components/Booklist';

const Booklist = () => {
return (
    <div>
        <section className={styles.booklist}>
        <BookList/>
        </section>
    </div>
)};

export default Booklist;