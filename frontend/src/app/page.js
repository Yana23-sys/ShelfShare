
import styles from "./page.module.css";

import BookList from "@/components/BookList";
import BookPage from "@/components/BookPage";

const Home = () => {
  return (
    <main className={styles.main}>

    <BookList/>

    <BookPage/>

    </main>
  );
};

// const Book = () => {
//   return (
//     <main className={styles.main}>

//     <BookPage/>

//     </main>
//   );
// };

export default Home;
