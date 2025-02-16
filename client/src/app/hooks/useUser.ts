import {  User } from '@nx-chat-assignment/shared-models';
import { create } from 'zustand';
import { socketService } from '../services/socket.service';

interface UserStore {
  onlineUsers: User[];
  currentUser: User | null;
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
  fetchCurrentUser: () => void;
  login: (username: string) => Promise<void>;
  logout: () => void;
}

const useUser = create<UserStore>((set) => ({
  onlineUsers: [],
  currentUser: null,
  selectedUser: null,
  setSelectedUser: (user) => set({ selectedUser: user }),
  fetchCurrentUser: () => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      set({ currentUser: JSON.parse(storedUser) });
    }
  },
  login: async (username: string) => {
    try {
      const user = await socketService.login(username);
      if (user) {
        set({ currentUser: user });
        localStorage.setItem("currentUser", JSON.stringify(user));
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  },
  logout: () => {
    socketService.logout();
    localStorage.removeItem("currentUser");
    set({ currentUser: null });
  },
}));

socketService.listenForOnlineUsers((users) => {
  useUser.setState({ onlineUsers: users });
});

export default useUser;
