import { createContext, useContext, useEffect, useState } from "react";
import { useRecoilValue, atom, RecoilRoot } from "recoil";
import io from "socket.io-client";

// Define the atom directly in this file
const userAtom = atom({
  key: "userAtom",
  default: JSON.parse(localStorage.getItem("user-threads")),
});

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    const socket = io("/", {
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

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};


