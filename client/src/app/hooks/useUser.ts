import {  User } from '@nx-chat-assignment/shared-models';
import { create } from 'zustand';
import { fetchOnlineUsers } from '../services/user.service';

interface UserStore {
  onlineUsers: User[];
  currentUser: User | null;
  loadOnlineUsers: () => Promise<void>;
  setCurrentUser: (user: User | null) => void;
  fetchCurrentUser: () => void;
}

const useUser = create<UserStore>((set) => ({
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
export default useUser;
