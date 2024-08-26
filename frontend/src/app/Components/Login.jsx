"use client";
import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import styles from "../Styles/Login.module.css";
import Link from "next/link";


function Login({ users }) {
   const { user, setUser } = useContext(UserContext);

   const handleLogin = (user) => {
      setUser(user);
      console.log(user.username);
   };

   return (
      <div>
         <h2>Enter your crendentials to login</h2>
         <form className={styles.loginFormContainer}>
            <label className={styles.loginEmailLabel} htmlFor="login">
               Email
               <input placeholder="Enter your email address"></input>
            </label>
            <label className={styles.loginPasswordLabel}>
               Password
               <input placeholder="Enter your password"></input>
            </label>
            <button className={styles.loginButton}>Login</button>
         </form>
         <h2>
            Or click on an existing user profile to test some functionalities
         </h2>
         <section className={styles.userButtonsContainer}>
            {users.map((user) => (
               <button
                  onClick={ () => handleLogin(user) }
                  className={styles.userLoginButton}
               >
                  <Link href="/" prefetch={false}>
                     {user.username}
                     <img src={user.avatar} />
                  </Link>
               </button>
            ))}
         </section>
      </div>
   );
}

export default Login;
