import styles from './Styles/Bookpage.module.css'
import BookPage from './Components/Bookpage'

const Bookpage = () => {
return (
    <div>
        <section className={styles.bookpage}>
        <BookPage/>
        </section>
    </div>
)};

export default Bookpage;