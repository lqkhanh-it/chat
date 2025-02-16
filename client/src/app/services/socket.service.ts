import { io, Socket } from 'socket.io-client';
import { User } from '@nx-chat-assignment/shared-models';
import { WS_URL } from '../constants/httpRequest';

let socket: Socket = io(WS_URL);

interface SocketService {
  login: (username: string) => Promise<User | null>;
  logout: () => void;
  connect: () => void;
  listenForOnlineUsers: (callback: (users: User[]) => void) => void;
  onError: (callback: (error: string) => void) => void;
}

const socketService: SocketService = {
  connect: () => {
    if (!socket || !socket.connected ) {
      socket = io(WS_URL);
    }
  },
  login: (username) =>
    new Promise((resolve, reject) => {
      socketService.connect();
      socket.emit('user:login', username);

      socket.once('error', (error) => {
        if (error.event === 'user:login') {
          reject(new Error(error.message));
        }
      });

      socket.once('usersOnline', ({ data }) => {
        const user = data.find((user: User) => user.username === username);
        resolve(user || null);
      });
    }),

  logout: () => {
    socket.disconnect();
  },

  listenForOnlineUsers: (callback) => {
    socketService.connect();
    socket.on('usersOnline', ({ data }) => {
      callback(data);
    });
  },
  onError: (callback) => {
    socket.on("connect_error", (err) => {
      callback(`Connection error: ${err.message}`);
    });

    socket.on("disconnect", (reason) => {
      callback(`Disconnected: ${reason}`);
    });

    socket.on("error", (error) => {
      callback(`Socket error: ${error.message || "Unknown error"}`);
    });
  },
};

export { socket, socketService };
