import { createContext, useState, useRef, useEffect } from "react";

import {io} from 'socket.io-client';

export const AccountContext = createContext(null);

const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState(() => {
    try {
      const saved = localStorage.getItem("whatsapp_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [person, setPerson] = useState({});
  const [activeUsers, setActiveUsers] = useState([]);
  const [newMessageFlag, setnewMessageFlag] = useState(false);

  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:9000");
  }, []);

  const handleSetAccount = (data) => {
    if (data) {
      try {
        localStorage.setItem("whatsapp_user", JSON.stringify(data));
      } catch (e) {
        console.error("Failed to save session:", e);
      }
    } else {
      localStorage.removeItem("whatsapp_user");
    }
    setAccount(data);
  };

  const logout = () => {
    localStorage.removeItem("whatsapp_user");
    setAccount(null);
    setPerson({});
  };

  return (
    <AccountContext.Provider
      value={{
        account,
        setAccount: handleSetAccount,
        logout,
        person,
        setPerson,
        socket,
        activeUsers,
        setActiveUsers,
        newMessageFlag,
        setnewMessageFlag,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
