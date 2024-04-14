"use client";

import { getUserDetails, getUserLinks } from "@/utils/api";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();
export const useUser = () => {
  return useContext(UserContext);
};
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [pending, setPending] = useState(true);
  const router = useRouter();
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    router.push("/");
  };

  useEffect(() => {
    const getuser = async () => {
      setPending(true);
      try {
        const response = await getUserDetails();

        if (response) setUser(response);
      } catch (error) {
        console.log(error);
      } finally {
        setPending(false);
      }
    };

    getuser();
  }, []);

  const value = {
    user,
    logout,
    pending,
    setUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
