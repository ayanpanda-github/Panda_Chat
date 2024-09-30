import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"
import { io } from "socket.io-client";
import { Socket } from "socket.io";

const URL = "http://localhost:3000";

export const Room = () =>{
    const [searchParams, setSearchParams] = useSearchParams();
    const [lobby, setLobby] = useState(true);
    const name = searchParams.get('name');
    const [socket, setSocket] = useState<null | Socket>(null);
    useEffect(()=>{
        const socket = io(URL);
        socket.on("send-offer", ({roomId})=>{
            setLobby(false);
            socket.emit("offer",{
                sdp: "",
                roomId
            });
        });

        socket.on("offer", ({roomId, offer})=>{
            setLobby(false);
            socket.emit("answer",{
                sdp: "",
                roomId
            });
        });

        socket.on("answer", ({roomId, answer})=>{
            setLobby(false);
        });

        socket.on("lobby", ()=>{
            setLobby(true);
        })

        setSocket(socket);
        //Logic to init the user into a room 
    }, [name])
    if(lobby){
        return<div>
            waiting to connect you to some
        </div>
    }

    return <div>
        hi {name}
        <video width={400} height={400} src="" />
        <video width={400} height={400} src="" />
    </div>
}