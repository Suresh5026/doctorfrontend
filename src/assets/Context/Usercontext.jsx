import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [status, setStatus] = useState(null);
  const [name, setName] = useState(null);
  const [userId, setUserid] = useState(null);

 useEffect(()=>{
  const token = localStorage.getItem('token');
  const status = localStorage.getItem('status');
  const name = localStorage.getItem('name');
  const userId = localStorage.getItem('_id')
  
  if(token){
    setIsLoggedIn(true);
        setStatus(status);
        setName(name);
        setUserid(userId)
  }
 },[])

 const login = (status, name) => {
  setIsLoggedIn(true);
  setStatus(status);
  setName(name);
  setUserid(userId)
  
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("status");
  localStorage.removeItem("name");
  localStorage.removeItem("_id");
  setIsLoggedIn(false);
  setStatus(null);
  setName(null);
  setUserid(null);
};



  return (
    <UserContext.Provider value={{ isLoggedIn, status, name, userId, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
