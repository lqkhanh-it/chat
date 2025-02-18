import React, { useMemo } from 'react';
import { User } from '@nx-chat-assignment/shared-models';
import useUser from '../hooks/useUser';

interface ChatListProps {
  onSelectUser: (user: User) => void;
}

const ChatList: React.FC<ChatListProps> = ({ onSelectUser }) => {
  const selectedUser = useUser((state) => state.selectedUser);
  const currentUser = useUser((state) => state.currentUser);
  const onlineUsers = useUser((state) => state.onlineUsers);

  const sortedUsers = useMemo(() => {
    return [...onlineUsers]
      .filter((user) => user.id !== currentUser?.id)
      .sort((a, b) => {
        return a.online ? -1 : 1; // Online users first
      });
  }, [onlineUsers, currentUser,]);

  return (
    <div className="w-full p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Chats</h2>
      <ul>
        {sortedUsers.length > 0 ? (
          sortedUsers.map((user) => (
            <li
              key={user.id}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition ${
                user.id === selectedUser?.id
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => onSelectUser(user)}
            >
              <span className="text-sm font-medium">{user.username}</span>
              <span className={`w-3 h-3 rounded-full ${user.online ? 'bg-green-500' : 'bg-gray-500'}`}></span>
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-center">No online users</p>
        )}
      </ul>
    </div>
  );
};

export default React.memo(ChatList);
