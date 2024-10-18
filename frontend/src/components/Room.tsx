import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"
import { io } from "socket.io-client";
import { Socket } from "socket.io";

const URL = "http://localhost:3000";

export const Room = () =>{
    const [searchParams, setSearchParams] = useSearchParams();
    const name = searchParams.get('name');
    const [lobby, setLobby] = useState(true);
    const [socket, setSocket] = useState<null | Socket>(null);
    const [sendingPc, setSendingPc] = useState<null | RTCPeerConnection>(null);
    const [recivingPc, setRecivingPc] = useState<null | RTCPeerConnection>(null);
    const [remoteVideoTrack, setRemoteVideoTrack] = useState<MediaStreamTrack | null>(null);
    const [localVideoTrack, setLocalVideoTrack] = useState<MediaStreamTrack | null>(null);
    const [remoteAudioTrack, setRemoteAudioTrack] = useState<MediaStreamTrack | null>(null); 
    const [localAudioTrack, setLocalAudioTrack] = useState<MediaStreamTrack | null>(null);
    
    
    useEffect(()=>{
        const socket = io(URL);
        socket.on("send-offer", async ({roomId})=>{
            setLobby(false);
            
            const pc = new RTCPeerConnection();
            setSendingPc(pc);

            const sdp = await pc.createOffer();

            socket.emit("offer",{
                sdp: "",
                roomId
            });
        });

        socket.on("offer", async ({roomId, offer})=>{
            setLobby(false);

            const pc = new RTCPeerConnection();
            pc.setRemoteDescription({sdp: offer, type: "offer"});
            const sdp = await pc.createAnswer();
            //trikel ice
            setRecivingPc(pc);

            pc.ontrack = (({track, type})=>{
                if (type == 'audio'){
                    setRemoteAudioTrack(track);
                }else{
                    setRemoteVideoTrack(track);
                }
            })

            socket.emit("answer",{
                sdp: "",
                roomId
            });
        });

        socket.on("answer", ({roomId, answer})=>{
            setLobby(false);
            setSendingPc(pc => {
                pc?.setRemoteDescription({
                    type: "answer",
                    sdp: answer
                })
                return pc;
            })

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