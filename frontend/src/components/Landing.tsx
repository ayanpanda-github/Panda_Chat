<<<<<<< HEAD
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom";
import { Room } from "./Room";

export const Landing = () => {
    const [name, setName] = useState("");
    const [localAudioTrack, setLocalAudioTrack] = useState<MediaStreamTrack | null>(null);
    const [localVideoTrack, setlocalVideoTrack] = useState<MediaStreamTrack | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const [joined, setJoined] = useState(false);

    const getCam = async () => {
        const stream = await window.navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        })
        // MediaStream
        const audioTrack = stream.getAudioTracks()[0]
        const videoTrack = stream.getVideoTracks()[0]
        setLocalAudioTrack(audioTrack);
        setlocalVideoTrack(videoTrack);
        if (!videoRef.current) {
            return;
        }
        videoRef.current.srcObject = new MediaStream([videoTrack])
        videoRef.current.play();
        // MediaStream
    }

    useEffect(() => {
        if (videoRef && videoRef.current) {
            getCam()
        }
    }, [videoRef]);

    if (!joined) {
            
    return <div>
            <video autoPlay ref={videoRef}></video>
            <input type="text" onChange={(e) => {
                setName(e.target.value);
            }}>
            </input>
            <button onClick={() => {
                setJoined(true);
            }}>Join</button>
        </div>
    }

    return <Room name={name} localAudioTrack={localAudioTrack} localVideoTrack={localVideoTrack} />
=======
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export const Landing = () =>{
    const [name, setName] = useState("");
    const [joined, seJoined] = useState(false);
    
    const getCan = async ()=>{
        const stream = window.navigator.mediaDevices.getUserMedia({
            video:true,
            audio:true
        })

        const videoTracks = stream.getAudioTracks()[0]
    }

    useEffect(()=>{
        getCan();
    }, []);
    
    
    return <div>
        <input type="text" onChange={(e) => {
            setName(e.target.value);
        }}>
        
        </input>
        <Link to={`/room/?name=${name}`} onClick={() =>{
            //join room logic
        }}>Join

        </Link>
    </div>
>>>>>>> 6a04dc102f81a9d97ed92aa97944ebd307fefcb1
}