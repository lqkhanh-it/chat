import { ChatMessage, User } from '@nx-chat-assignment/shared-models';
import { create } from 'zustand';
import { fetchOnlineUsers } from '../services/user.service';

interface ChatStore {
  messages: ChatMessage[];
  sendMessage: (message: ChatMessage) => void;
  onlineUsers: User[];
  currentUser: User | null;
  loadOnlineUsers: () => Promise<void>;
  setCurrentUser: (user: User | null) => void;
  fetchCurrentUser: () => void;
}

const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  sendMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  onlineUsers: [],
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
  fetchCurrentUser: () => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      set({ currentUser: JSON.parse(storedUser) });
    }
  },
  loadOnlineUsers: async () => {
    const users = await fetchOnlineUsers();
    set({ onlineUsers: users });
  },
}));
export default useChatStore;
