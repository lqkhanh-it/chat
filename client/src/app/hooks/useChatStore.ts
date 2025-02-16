import { ChatMessage } from '@nx-chat-assignment/shared-models';
import { create } from 'zustand';
import { fetchChatHistory } from '../services/chat.service';
import { socketService } from '../services/socket.service';

interface ChatStore {
  messages: ChatMessage[];
  sendMessage: (message: ChatMessage) => void;
  fetchMessages: (currentUserId: string, selectedUserId: string) => Promise<void>;
}

const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  sendMessage: (message) => {
    socket.emit("send_message", message);
    set((state) => ({ messages: [...state.messages, message] }));
  },
  fetchMessages: async (currentUserId, selectedUserId) => {
    const chatHistory = await fetchChatHistory(currentUserId, selectedUserId);
    set({ messages: chatHistory });
  },
}));

socketService.onReceiveMessage((message) => {
  console.log("Received message:", message);
  useChatStore.setState((state) => ({ messages: [...state.messages, message] }));
});

export default useChatStore;
