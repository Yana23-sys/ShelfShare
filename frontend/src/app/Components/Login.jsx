"use client";
import { useContext, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import styles from "../Styles/Login.module.css";
import Link from "next/link";

const userData = [
   {
      username: "danleonard23",
      name: "Daniel Leonard",
      avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Midnight",
      email: "alice@example.com", // to be updated
      password: "hashedpassword123",
      location: "New York, USA",
   },
   {
      username: "BelMo92",
      name: "Belhaj Mohamed",
      avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Rose",
      email: "belhadj.mohamad@gmail.com",
      password: "hashedpassword456",
      location: "London, UK",
   },
   {
      username: "anitacampbell17",
      name: "Anita Campbell",
      avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Max",
      email: "charlie@example.com", // to be updated
      password: "hashedpassword789",
      location: "Sydney, Australia",
   },
   {
      username: "yana53674808",
      name: "Yana",
      avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Aneka",
      email: "yana@example.com", // to be updated
      password: "hashedpassword101",
      location: "Toronto, Canada",
   },
   {
      username: "geraintsjj",
      name: "Geraint",
      avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Cali",
      email: "geraint@example.com", // to be updated
      password: "hashedpassword120",
      location: "Toronto, Canada",
   },
];

function Login() {
   const { user, setUser } = useContext(UserContext);
   const [loggedInUser, setLoggedInUser] = useState();

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
            <button
               onClick={() => {
                  handleLogin(userData[0]);
               }}
               className={styles.userLoginButton}
            >
               <Link href="/" prefetch={false}>
                  {userData[0].username}
                  <img src={userData[0].avatar} />
               </Link>
            </button>
            <button
               onClick={() => {
                  handleLogin(userData[1]);
               }}
               className={styles.userLoginButton}
            >
               <Link href="/" prefetch={false}>
                  {userData[1].username}
                  <img src={userData[1].avatar} />
               </Link>
            </button>
            <button
               onClick={() => {
                  handleLogin(userData[2]);
               }}
               className={styles.userLoginButton}
            >
               <Link href="/" prefetch={false}>
                  {userData[2].username}
                  <img src={userData[2].avatar} />
               </Link>
            </button>
            <button
               onClick={() => {
                  handleLogin(userData[3]);
               }}
               className={styles.userLoginButton}
            >
               <Link href="/" prefetch={false}>
                  {userData[3].username}
                  <img src={userData[3].avatar} />
               </Link>
            </button>
            <button
               onClick={() => {
                  handleLogin(userData[4]);
               }}
               className={styles.userLoginButton}
            >
               <Link href="/" prefetch={false}>
                  {userData[4].username}
                  <img src={userData[4].avatar} />
               </Link>
            </button>
         </section>
      </div>
   );
}

export default Login;
