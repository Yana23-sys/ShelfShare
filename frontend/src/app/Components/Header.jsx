"use client";
import Link from "next/link";
import styles from "../Styles/Header.module.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { getUnseenNotificationsByUserId, markNotificationAsSeen } from "../api/notifications";
import NotificationMenu from "./NotificationMenu";
import { useRouter } from 'next/navigation';


const Header = () => {
   const { user, setUser } = useContext(UserContext);
   const [ notifications, setNotifications ] = useState([])
   const router = useRouter()

   useEffect(() => {
      const fetchNotifications = async () => {
        if (user && user._id) {
          const notifications = await getUnseenNotificationsByUserId(user._id);
          setNotifications(notifications);
        }
      };
  
      fetchNotifications();
    }, [user]);

   const handleLogout = () => {
      setUser({});
   };
   
   const handleNotificationClick = (notificationId) => {
      console.log('marking notification as seen', notificationId)
      markNotificationAsSeen(notificationId).then(() => {
         setNotifications(notifications.map(notification => {
            return notification._id !== notificationId ? notification : {...notification, seen: true}
         }))
      })
      router.push('/my-profile')
   }

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
            {user.username && <NotificationMenu notifications={notifications} onNotificationClick={handleNotificationClick} />}
            {user.username && (
               <Link href={`/my-profile`}>
                  <img
                     className={styles.avatarImg}
                     src={user.avatar}
                     alt="user avatar"
                  />
               </Link>
            )}
         </nav>

      </header>
   );
};

export default Header;
