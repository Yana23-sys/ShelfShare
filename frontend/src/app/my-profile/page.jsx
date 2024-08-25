"use client";
import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";

const MyProfile = () => {
   const { user, setUser } = useContext(UserContext);
   
   return (
      <section>
         <p>My profile</p>
         <p>Username: {user.username}</p>
      </section>
   )
}

export default MyProfile