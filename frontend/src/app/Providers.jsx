"use client";

import { UserProvider } from "./Contexts/UserContext";

const Providers = ({ children }) => {
  return <UserProvider>{children}</UserProvider>;
};

export default Providers;

//Providers
