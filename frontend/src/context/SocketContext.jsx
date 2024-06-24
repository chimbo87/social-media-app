import { createContext, useContext, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import io from "socket.io-client";
import UserAtom from "../atoms/UserAtom";

const SocketContext = createContext();
export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const user = useRecoilValue(UserAtom);
  const [onLineUsers, setOnlineUsers] = useState([]);
  useEffect(() => {
    const socket = io("http://localhost:5001", {
      query: {
        userId: user?._id,
      },
    });
    setSocket(socket);
    socket.on("getOnlineUsers", (users) => {
      setOnlineUsers(users);
    });

  
    return () => socket && socket.close();
  }, [user?._id]);
  console.log("online  users",onLineUsers)
  return (
    <SocketContext.Provider value={{ socket, onLineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
