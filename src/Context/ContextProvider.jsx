import React, { createContext, useState } from 'react';

export const MyContext = createContext();

export const ContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (username, password) => {
    setCurrentUser(username);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const contextData = {
    user: currentUser,
    isLoggedIn: !!currentUser,
    login,
    logout,
  };

  return (
    <MyContext.Provider value={contextData}>{children}</MyContext.Provider>
  );
};
