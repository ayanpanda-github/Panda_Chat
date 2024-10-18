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
}