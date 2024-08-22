"use client";
import Navbar from "./Navbar";
import styles from "../Styles/Header.module.css";
import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";

const Header = () => {
   const { user, setUser } = useContext(UserContext);

   return (
      <header className={styles.header}>
         <h1>ShelfShare</h1>
         <Navbar />
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
