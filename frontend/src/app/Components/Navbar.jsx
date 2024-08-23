"use client";
import Link from "next/link";
import styles from "../Styles/Navbar.module.css";
import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";

const Navbar = () => {
   const { user, setUser } = useContext(UserContext);
   const handleLogout = () => {
      setUser({});
   };

   return (
      <nav className={styles.navbar}>
         <Link href="/" prefetch={false}>
            Home
         </Link>
         <Link href="/books" prefetch={false}>
            Browse Books
         </Link>
         <Link href="/post-book" prefetch={false}>
            Add book
         </Link>
         <Link href="/login" prefetch={false}>
            Login
         </Link>
         <Link onClick={handleLogout} href="/" prefetch={false}>
            Logout
         </Link>
      </nav>
   );
};

export default Navbar;

//Navbar
