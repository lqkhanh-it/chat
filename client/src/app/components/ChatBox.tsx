import React, { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
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
    <div className="flex flex-col w-full h-full bg-white shadow-lg rounded-lg border border-gray-300">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b rounded-t-lg">
        <h2 className="text-lg font-semibold">
          {selectedUser ? selectedUser.username : "Select a chat"}
        </h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-[75%] p-3 rounded-xl shadow-sm text-sm ${
              msg.sender.id === currentUser?.id
                ? "ml-auto bg-blue-500 text-white rounded-br-none"
                : "mr-auto bg-gray-200 text-gray-800 rounded-bl-none"
            }`}
          >
            <p>{msg.message}</p>
            <small className="block text-xs opacity-70 text-right">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </small>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-3 border-t bg-white flex items-center gap-2 rounded-b-lg">
        <input
          type="text"
          className="flex-1 p-2 border rounded-xl bg-gray-100 focus:outline-none"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded-xl flex items-center gap-1 shadow-md hover:bg-blue-600 transition"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
