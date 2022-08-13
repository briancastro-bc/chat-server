import { Socket } from 'socket.io';

export interface CustomSocket extends Socket {
  sessionID?: string;
  userID?: string;
  userRoom?: string;
}