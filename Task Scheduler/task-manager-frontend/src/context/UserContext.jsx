import React, { createContext, useContext, useState, useEffect } from "react";
import { userService } from "../services/api";

const UserContext = createContext();

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUsers must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await userService.getUsers();
      setUsers(response);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData) => {
    try {
      const response = await userService.createUser(userData);
      await fetchUsers();
      return response;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const value = {
    users,
    loading,
    fetchUsers,
    createUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
