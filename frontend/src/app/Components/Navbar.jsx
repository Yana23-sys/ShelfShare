import Link from "next/link";
import styles from "../Styles/Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link href="/">Home</Link>
      <Link href="/books">Browse Books</Link>
      <Link href="/login">Login</Link>
    </nav>
  );
};

export default Navbar;
