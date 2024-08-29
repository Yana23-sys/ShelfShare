import styles from "./Styles/page.module.css";
import { Card, CardHeader, CardMedia } from "@mui/material";
import Map from "./Components/Map";

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
          src="https://as2.ftcdn.net/v2/jpg/00/65/70/77/1000_F_65707740_9dy3kO5vd8NsuoN1vAmVuTHr82DvCUvB.jpg"
          alt="Bookshelf full of books"
        />
        
        <ul className={`${styles.orderList} ${styles.flexItem}`}>
          <strong>How ShelfShare Works:</strong>
          <p/>
          <li>Sign up and create a profile.</li>
          <li>List books you want to swap.</li>
          <li>Browse available books and connect with other users.</li>
        </ul>
      </section>
      <section className={styles.mapContainer}>
            <strong className={styles.orderList}>Check the map for swaps in your area:</strong>
            <p className={styles.container}>
            Select a book location on the map to get started
            </p>
            <Map />
      </section>
      <section className={styles.container}>
        <h2 className={styles.subheading}>Available Books</h2>
        <p className={styles.tag}>
          Find books you may be interested in.
        </p>
        <section className={styles.bookCard}>

          <Card>
            <CardMedia
              component="img"
              image={
                "https://storage.googleapis.com/lr-assets/kids/covers/_hires_imported/9780141321134.jpg"
              }
              alt={"Book cover for Wind in the Willows novel"}
              className={styles.cardImage}
            />
            <CardHeader className={styles.tag} title={"Wind in the Willows"} />
            <h2 className={styles.tag}>Author: {"Kenneth Grahame"}</h2>
          </Card>
          <Card>
            <CardMedia
              component="img"
              image={
                "https://m.media-amazon.com/images/I/81q77Q39nEL._AC_UF894,1000_QL80_.jpg"
              }
              alt={"Book cover for Harry Potter and the Philosopher's Stone"}
              className={styles.cardImage}
            />
            <CardHeader
              className={styles.tag}
              title={"Harry Potter and the Philosopher's Stone"}
            />
            <h2 className={styles.tag}>Author: {"J.K.Rowling"}</h2>
          </Card>
          <Card>
            <CardMedia
              component="img"
              image={
                "https://i.ebayimg.com/images/g/PhUAAOSweNNgiphk/s-l600.jpg"
              }
              alt={"Book cover for Harry Potter and the Philosopher's Stone"}
              className={styles.cardImage}
            />
            <CardHeader className={styles.tag} title={"The Da Vinci Code"} />
            <h2 className={styles.tag}>Author: {"Dan Brown"}</h2>
          </Card>

        </section>
      </section>
    </div>
  );
};

export default Home;