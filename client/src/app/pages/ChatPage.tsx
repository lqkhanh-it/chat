import React, { useState } from "react";
import { create } from "zustand";
import { User, ChatMessage } from "@nx-chat-assignment/shared-models";
import ChatList from "./ChatList";

interface ChatStore {
  messages: ChatMessage[];
  sendMessage: (message: ChatMessage) => void;
  onlineUsers: User[];
}

const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  sendMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  onlineUsers: [],
}));

function ChatPage() {
  const [selectedUser, setSelectedUser] = useState<User>();
  const { onlineUsers } = useChatStore();

  return (
    <div className="flex w-full h-screen">
      <ChatList users={onlineUsers} onSelectUser={setSelectedUser} />
      <div className="w-3/4 p-4 bg-gray-100">
        {selectedUser ? (
          <h2 className="text-xl font-bold">Chat with {selectedUser?.username}</h2>
        ) : (
          <h2 className="text-xl font-bold">Select a user to start chatting</h2>
        )}
      </div>
    </div>
  );
}

export default ChatPage;
