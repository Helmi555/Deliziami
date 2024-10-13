import React, { createContext, useContext, useState, useEffect } from 'react';
import { getItem, clearAsyncStorage,removeItem } from '../AsyncStorageHelper'; // Import your async storage functions

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [uuidCode,setUuidCode]=useState(null)

  useEffect(() => {
    const checkAuth = async () => {
      const res = await getItem("user");
      if (res) {
        setIsAuthenticated(true);
        setUser(res)
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await removeItem("user")
    setIsAuthenticated(false);
    console.log("Logged out successfully!");
  };

  const handleLogin = (userData) => {
    setUser(userData)
    console.log("in the auth handlelogin userData is:",userData)
    setIsAuthenticated(true); // Login: set state to true
    console.log("Logged IN successfully!");

  };
  const handleSaveCode=(newCode)=>{
    setUuidCode(newCode)
    console.log("new code setted :",newCode)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, handleLogout,handleLogin, user,uuidCode,handleSaveCode}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
