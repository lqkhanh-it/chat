import React, { useState, useEffect } from 'react';
import { User } from '@nx-chat-assignment/shared-models';
import ChatList from '../components/ChatList';
import useChatStore from '../hooks/useChatStore';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';

function ChatPage() {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState<User>();
  const currentUser = useChatStore((state) => state.currentUser);
  const { onlineUsers, loadOnlineUsers, fetchCurrentUser } = useChatStore();

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    } else {
      loadOnlineUsers();
    }
  }, [navigate, loadOnlineUsers, currentUser]);

  return (
    <div className="flex w-full h-screen">
      <div className="w-1/4">
        {currentUser && (
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Logged in as {currentUser.username}</h2>
            <LogoutButton />
          </div>
        )}

        <ChatList users={onlineUsers} onSelectUser={setSelectedUser} />
      </div>
      <div className="w-3/4 p-4 bg-gray-100">
        {selectedUser ? (
          <h2 className="text-xl font-bold">Chat with {selectedUser.username}</h2>
        ) : (
          <h2 className="text-xl font-bold">Select a user to start chatting</h2>
        )}
      </div>
    </div>
  );
}

export default ChatPage;
