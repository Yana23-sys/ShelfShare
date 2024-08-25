"use client";
import Link from "next/link";
import styles from "../Styles/Header.module.css";
import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";

const Header = () => {
   const { user, setUser } = useContext(UserContext);
   const handleLogout = () => {
      setUser({});
   };

   return (
      <header className={styles.header}>
         <Link href="/" prefetch={false}>
            <h1>ShelfShare</h1>
            </Link>

         <nav className={styles.navbar}>
            <Link href="/books" prefetch={false}>
               Browse Books
            </Link>
            <Link href="/post-book" prefetch={false}>
               Add book
            </Link>
            {!user.username && <Link href="/login" prefetch={false}>
               Login
            </Link>}
            {user.username && <Link onClick={handleLogout} href="/" prefetch={false}>
               Logout
            </Link>}
         </nav>

         {user.username && (
            <img
               className={styles.avatarImg}
               src={user.avatar}
               alt="user avatar"
            />
         )}
      </header>
   );
};

export default Header;
