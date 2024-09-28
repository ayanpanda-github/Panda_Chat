import { Socket } from "socket.io";



export interface User{
    socket: Socket; 
    name: string;
}

export class userManager{
    private users: User[];
    private queue: string[];
    constructor(){
        this.users  = [];
        this.queue = [];
    }
    addUser(name:string, socket: Socket){
        this.users.push({
            name, socket
        })
        this.queue.push(socket.id);
        this.clearQueue();
    }

    removeUser(socketID: string){
        this.users = this.users.filter( x => x.socket.id === socketID );
        this.queue = this.queue.filter(x => x === socketID);
    }
    clearQueue(){
        if (this.queue.length < 2){
            return;
        }
        const user1 = this.users.find(x => x.socket.id === this.queue.pop());
        const user2 = this.users.find(x => x.socket.id === this.queue.pop());
        
        user1?.socket.emit("new-room",{
            type:"send-offer",
            
        })
    }

    
}
