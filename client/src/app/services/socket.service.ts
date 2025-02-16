import { io, Socket } from 'socket.io-client';
import { User } from '@nx-chat-assignment/shared-models';
import { WS_URL } from '../constants/httpRequest';

const socket: Socket = io(WS_URL);

interface SocketService {
  login: (username: string) => Promise<User | null>;
  logout: () => void;
  listenForOnlineUsers: (callback: (users: User[]) => void) => void;
}

const socketService: SocketService = {
  login: (username) =>
    new Promise((resolve, reject) => {
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
    socket.on('usersOnline', ({ data }) => {
      callback(data);
    });
  },
};

export { socket, socketService };
