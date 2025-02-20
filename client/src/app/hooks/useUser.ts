import { User } from "@nx-chat-assignment/shared-models";
import { create } from "zustand";
import { socketService } from "../services/socket.service";

interface UserStore {
  onlineUsers: User[];
  currentUser: User | null;
  selectedUser: User | null;
  error: string | null;

  setSelectedUser: (user: User) => void;
  fetchCurrentUser: () => void;
  login: (username: string) => Promise<void>;
  logout: () => void;
}

const useUser = create<UserStore>((set, get) => ({
  error: null,
  onlineUsers: [],
  currentUser: null,
  selectedUser: null,

  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },

  fetchCurrentUser: () => {
    if (get().currentUser) return;

    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      get().login(user?.username);
      set({ currentUser: user });
    }
  },

  login: async (username: string) => {
    try {
      set({ error: null }); // Reset error state before attempting login

      const user = await socketService.login(username);
      if (user) {
        set({ currentUser: user });
        localStorage.setItem("currentUser", JSON.stringify(user));
      }
    } catch (error) {
      set({ error: error?.message || "Login failed" });
      console.error("Login failed:", error);
    }
  },

  logout: () => {
    socketService.logout();
    localStorage.removeItem("currentUser");
    set({ currentUser: null, selectedUser: null, error: null });
  },
}));

export default useUser;
