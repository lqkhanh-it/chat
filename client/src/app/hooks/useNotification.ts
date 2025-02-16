import { create } from "zustand";

interface ChatStore {
  notifications: string[];
  addNotification: (message: string) => void;
  clearNotification: () => void;
}

const useChatStore = create<ChatStore>((set) => ({
  notifications: [],
  addNotification: (message) => {
    set((state) => ({ notifications: [...state.notifications, message] }));
  },
  clearNotification: () => {
    set({ notifications: [] });
  },
}));

export default useChatStore;
