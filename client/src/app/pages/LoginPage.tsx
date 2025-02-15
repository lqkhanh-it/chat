import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { create } from "zustand";
import axios from "axios";
import { User } from "@nx-chat-assignment/shared-models";
import Input from "../components/Input";
import Button from "../components/Button";

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  loggedIn: boolean;
  setLoggedIn: (status: boolean) => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  loggedIn: false,
  setLoggedIn: (status) => set({ loggedIn: status }),
}));

export default function LoginPage() {
  const { setUser, setLoggedIn } = useUserStore();
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post<User>("http://localhost:4000/api/auth/login", { username });
      setUser(res.data);
      setLoggedIn(true);
      setError("");
      navigate("/chat");
    } catch (error: any) {
      setError(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="bg-white p-12 rounded-2xl shadow-2xl w-full max-w-2xl">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Welcome Back!</h2>
        <p className="text-lg text-center text-gray-600 mb-8">Login to continue</p>

        <Input placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />

        {error && <p className="text-red-500 text-md mt-3 text-center">{error}</p>}

        <Button text="Login" onClick={handleLogin} disabled={!username} />
      </div>
    </div>
  );
}
