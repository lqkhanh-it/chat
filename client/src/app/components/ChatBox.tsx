import React, { useState, useEffect, useRef } from "react";
import useChatStore from "../hooks/useChatStore";
import { ChatMessage, User } from "@nx-chat-assignment/shared-models";
import useUser from "../hooks/useUser";

interface ChatBoxProps {
  selectedUser: User | null;
}

const ChatBox: React.FC<ChatBoxProps> = ({ selectedUser }) => {
  const [message, setMessage] = useState("");
  const { sendMessage, fetchMessages } = useChatStore();
  const messages = useChatStore((state) => state.messages);
  const currentUser = useUser((state) => state.currentUser);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedUser && currentUser) {
      fetchMessages(currentUser.id, selectedUser.id);
    }
  }, [selectedUser, currentUser, fetchMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim() && selectedUser && currentUser) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: currentUser,
        receiver: selectedUser,
        message,
        timestamp: Date.now(),
      };

      sendMessage(newMessage);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col w-full h-full p-4 bg-white shadow-lg rounded-lg">
      <div className="flex items-center justify-between p-2 border-b">
        <h2 className="text-xl font-bold">{selectedUser ? selectedUser.username : "Select a chat"}</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-100">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-3 rounded-lg max-w-xs ${
              msg.sender.id === currentUser?.id ? "ml-auto bg-blue-500 text-white" : "mr-auto bg-gray-300"
            }`}
          >
            <p>{msg.message}</p>
            <small className="text-xs opacity-80">{new Date(msg.timestamp).toLocaleTimeString()}</small>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-2 border-t flex items-center">
        <input
          type="text"
          className="flex-1 p-2 border rounded-lg"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
