import { createContext, useState, useEffect } from "react";
import { getAllBooksByUserId } from "../api/books";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (user._id) {
      getAllBooksByUserId(user._id).then((books) => {
         setUser({ ...user, books });
      })
    }
  }, [user._id]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
