import { Server } from 'socket.io';
import * as crypto from 'crypto';

import { SessionStorage } from './storage';
import { CustomSocket } from './interfaces/socket';
import { Room } from './interfaces/room';

function createIoServer(): Server {
  const _io = new Server();
  return _io;
}

function hashIP(plain: string): string {
  return crypto.createHash('sha1').update(plain).digest('hex');
}

/**
 * rooms -> arreglo que se encarga de almacenar la información de las salas creadas.
 */
const rooms: Room[] = [];
const sessionStorage = new SessionStorage();

const sio: Server = createIoServer();

sio.use((socket: CustomSocket, next: Function) => {

  const sessionID = socket.handshake.auth.sessionID;
  if(sessionID) {

    const session = sessionStorage.findSession(sessionID);
    if(session) {
      socket.sessionID = sessionID;
      socket.userID = session.userID;
      return next();
    }

    const IP_HASH = hashIP(socket.conn.remoteAddress); // aslkjdalehqiuwhge1231 = 0.0.0.0

    socket.sessionID = crypto.randomUUID();
    socket.userID = IP_HASH;
    next();
  }
});

sio.on("connection", (socket: CustomSocket) => {

  console.log("New connection");
  console.log(socket);
  console.log(socket.sessionID)
  console.log(socket.userID) // aslkjdalehqiuwhge1231
  
  sessionStorage.saveSession(socket.sessionID!, {
    userID: socket.userID,
    connected: true
  });

  socket.emit("session", {
    sessionID: socket.sessionID,
    userID: socket.userID
  });

  socket.on("create_room", (data: any) => {
    
  });

  socket.on("join_room", (data: any) => {

  });

  socket.on("message", (data: any) => {

  });

  socket.on("left_room", (data: any) => {

  });

  socket.on("destroy_room", () => {

  });

  socket.on('disconnect', () => {
    console.log("disconnected");
  });

});

export { sio };