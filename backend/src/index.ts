<<<<<<< HEAD
import { Socket } from "socket.io";
import http from "http";

import express from 'express';
import { Server } from 'socket.io';
import { UserManager } from "./managers/UserManger";

const app = express();
const server = http.createServer(http);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

const userManager = new UserManager();

io.on('connection', (socket: Socket) => {
  console.log('a user connected');
  userManager.addUser("randomName", socket);
  socket.on("disconnect", () => {
    console.log("user disconnected");
    userManager.removeUser(socket.id);
  })
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
=======
import {Socket} from "socket.io";
import http from "http";

import express from 'express';
import {Server} from 'socket.io';
import { UserManager } from "./managers/UserManager";

const app = express();
const server = http.createServer(http);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

const userManager = new UserManager();



io.on('connection', (socket: Socket)=>{
    console.log('a user is connected');
    userManager.addUser("randomName", socket);
    socket.on("disconnect", ()=>{
        userManager.removeUser(socket.id);
    })
} );

server.listen(3000, ()=>{
    console.log('listening on *:3000');
});

>>>>>>> 6a04dc102f81a9d97ed92aa97944ebd307fefcb1
