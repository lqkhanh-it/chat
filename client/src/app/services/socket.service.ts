import { io, Socket } from "socket.io-client";
import { ChatMessage, User } from "@nx-chat-assignment/shared-models";
import { WS_URL } from "../constants/httpRequest";
import useUser from "../hooks/useUser";
import useChatStore from "../hooks/useChatStore";

let socket: Socket | null = null;

export type SendMessagePayload = {
  receiver: Omit<User, "online">;
  message: string;
};

interface SocketService {
  connect: () => void;
  login: (username: string) => Promise<User | null>;
  logout: () => void;
  sendMessage: (message: ChatMessage) => void;
  listenForOnlineUsers: (callback: (users: User[]) => void) => void;
  onError: (callback: (error: string) => void) => void;
  onReceiveMessage: (callback: (message: ChatMessage) => void) => void;
}

const connectSocket = () => {
  if (!socket) {
    socket = io(WS_URL, { autoConnect: false });

    // Global error handling
    socket.on("connect_error", (err) => console.error("Socket Connection Error:", err));
    socket.on("disconnect", (reason) => console.warn("Socket Disconnected:", reason));
  }

  if (!socket.connected) {
    socket.connect();
  }
};

const socketService: SocketService = {
  connect: connectSocket,

  login: (username) =>
    new Promise((resolve, reject) => {
      connectSocket();

      socket?.emit("user:login", username);

      socket?.once("error", ({ message }) => {
        reject(new Error(message));
      });

      socket?.once("usersOnline", ({ data }) => {
        const user = data.find((user: User) => user.username === username);
        resolve(user || null);
      });
    }),

  logout: () => {
    socket?.disconnect();
    socket = null;
  },

  sendMessage: (message) => {
    if (!socket || !socket.connected) connectSocket();

    const payload: SendMessagePayload = {
      receiver: message.receiver,
      message: message.message.trim(),
    };

    if (payload.message.length > 0) {
      socket?.emit("message:send", payload);
    }
  },

  listenForOnlineUsers: (callback) => {
    connectSocket();
    socket?.on("usersOnline", ({ data }) => {
      callback(data);
    });
  },

  onReceiveMessage: (callback) => {
    connectSocket();
    socket?.on("message:receive", ({ data }) => {
      callback(data)
     
    });
  },

  onError: (callback) => {
    socket?.on("connect_error", (err) => callback(`Connection error: ${err.message}`));
    socket?.on("disconnect", (reason) => callback(`Disconnected: ${reason}`));
    socket?.on("error", (error) => callback(`Socket error: ${error.message || "Unknown error"}`));
  },
};

// Handle online user updates
socketService.listenForOnlineUsers((users) => {
  console.log("Online Users Updated:", users);
  useUser.setState({ onlineUsers: users });
});

// Handle incoming messages
socketService.onReceiveMessage((data) => {
  const {currentUser} = useUser.getState();
  if (data.sender.id === currentUser?.id) return;
  useChatStore.setState((state) => ({ messages: [...state.messages, data] }));
});

socketService.onError((message) => {
  console.warn("Socket Disconnected:", message);
  useUser.getState().logout();
});

export { socket, socketService };
