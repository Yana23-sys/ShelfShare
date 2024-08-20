import Navbar from "./Navbar";
import styles from "../Styles/Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>ShelfShare</h1>
      <Navbar />
    </header>
  );
};

export default Header;
