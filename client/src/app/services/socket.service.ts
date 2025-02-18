import { io, Socket } from 'socket.io-client';
import { ChatMessage, User } from '@nx-chat-assignment/shared-models';
import { WS_URL } from '../constants/httpRequest';
import useUser from '../hooks/useUser';
import useChatStore from '../hooks/useChatStore';

let socket: Socket = io(WS_URL);

export type SendMessagePayload = {
  receiver: Omit<User, "online">;
  message: string;
}

interface SocketService {
  login: (username: string) => Promise<User | null>;
  logout: () => void;
  connect: () => void;
  sendMessage: (message: ChatMessage) => void;
  listenForOnlineUsers: (callback: (users: User[]) => void) => void;
  onError: (callback: (error: string) => void) => void;
  onReceiveMessage: () => void;
}

const socketService: SocketService = {
  connect: () => {
    if (!socket || !socket.connected) {
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

  sendMessage: (message) => {
    socketService.connect();

    const payload: SendMessagePayload = {
      receiver: message.receiver,
      message: message.message
    };

    socket.emit('message:send', payload);
  },

  listenForOnlineUsers: (callback) => {
    socketService.connect();
    socket.on('usersOnline', ({ data }) => {
      callback(data);
    });
  },

  onReceiveMessage: () => {
    socket.on('message:receive', ({data}) => {
      useChatStore.setState((state) => ({ messages: [...state.messages, data] }));
    });
  },
  onError: (callback) => {
    socket.on('connect_error', (err) => {
      callback(`Connection error: ${err.message}`);
    });

    socket.on('disconnect', (reason) => {
      callback(`Disconnected: ${reason}`);
    });

    socket.on('error', (error) => {
      callback(`Socket error: ${error.message || 'Unknown error'}`);
    });
  },
};

socketService.listenForOnlineUsers((users) => {
  console.log('Online User Listening...');
  useUser.setState({ onlineUsers: users });
});

socket.on('message:receive', ({data}) => {
  useChatStore.setState((state) => ({ messages: [...state.messages, data] }));
});

export { socket, socketService };
