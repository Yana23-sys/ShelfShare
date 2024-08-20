import styles from "./Styles/page.module.css";
import { Card, CardHeader, CardMedia } from "@mui/material";

const Home = () => {
  return (
    <div>
      <section className={styles.container}>
        <h2 className={styles.subheading}>Welcome to ShelfShare!</h2>
        <p className={styles.tag}>
          Discover and exchange books with fellow readers in your community.
        </p>
      </section>
      <section className={`${styles.container} ${styles.flexContainer}`}>
        <img
          className={`${styles.homepageImg} ${styles.flexItem}`}
          src="https://static.vecteezy.com/system/resources/previews/015/411/389/non_2x/bookcase-with-books-book-shelves-with-multicolored-book-spines-illustration-in-flat-style-vector.jpg"
          alt="Bookshelf full of books"
        />
        <ol className={`${styles.orderList} ${styles.flexItem}`}>
          <strong>How ShelfShare Works:</strong>
          <li>Sign up and create a profile.</li>
          <li>List books you want to swap.</li>
          <li>Browse available books and connect with other users.</li>
        </ol>
      </section>
      <section className={styles.container}>
        <h2 className={styles.subheading}>Available Books</h2>
        <p className={styles.tag}>
          Find books that you might be interested in swapping.
        </p>
        <section className={styles.bookCard}>
          <Card>
            <CardHeader className={styles.tag} title={"Wind in the Willows"} />
            <CardMedia
              component="img"
              image={
                "https://storage.googleapis.com/lr-assets/kids/covers/_hires_imported/9780141321134.jpg"
              }
              alt={"Book cover for Wind in the Willows novel"}
              className={styles.cardImage}
            />
            <h2 className={styles.tag}>Author: {"Kenneth Grahame"}</h2>
          </Card>
          <Card>
            <CardHeader
              className={styles.tag}
              title={"Harry Potter and the Philosopher's Stone"}
            />
            <CardMedia
              component="img"
              image={
                "https://m.media-amazon.com/images/I/81q77Q39nEL._AC_UF894,1000_QL80_.jpg"
              }
              alt={"Book cover for Harry Potter and the Philosopher's Stone"}
              className={styles.cardImage}
            />
            <h2 className={styles.tag}>Author: {"J.K.Rowling"}</h2>
          </Card>
          <Card>
            <CardHeader className={styles.tag} title={"The Da Vinci Code"} />
            <CardMedia
              component="img"
              image={
                "https://i.ebayimg.com/images/g/PhUAAOSweNNgiphk/s-l600.jpg"
              }
              alt={"Book cover for Harry Potter and the Philosopher's Stone"}
              className={styles.cardImage}
            />
            <h2 className={styles.tag}>Author: {"Dan Brown"}</h2>
          </Card>
        </section>
      </section>
    </div>
  );
};

export default Home;
