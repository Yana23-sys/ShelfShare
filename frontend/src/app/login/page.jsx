'use client';

import Login from "../Components/Login";
import { useState, useEffect } from 'react'
import {getAllUsers} from '../api/users';

const loginPage = () => {
   const [users, setUsers] = useState([])

   useEffect(() => {
      getAllUsers()
         .then(fetchedUsers => {
            setUsers(fetchedUsers)
         })
   }, [])

   return (
      <div>
         <Login users={users}/>
      </div>
   );
};

export default loginPage;
