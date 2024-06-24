import{createContext, useEffect, useState} from "react";
import { useRecoilValue } from "recoil";
import io from "socket.io-client";
import UserAtom from "../src/atoms/UserAtom";

const SocketContext = createContext();

export const SocketContextProvider = ({children})=>{
    const [socket,setSocket] = useState(null);
    const user = useRecoilValue(UserAtom)
     useEffect(()=>{
        const socket = io("http://localhost:5001",{
            query:{
                userId:user?._id
            }
        });
        setSocket(socket);
        return ()=> socket && socket.close();
     },[socket, user?._id])
    return <SocketContext.Provider value={{socket}}>{children}</SocketContext.Provider>
}