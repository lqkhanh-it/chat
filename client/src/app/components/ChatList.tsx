import React, { useMemo } from "react";
import { User } from "@nx-chat-assignment/shared-models";
import useUser from "../hooks/useUser";

interface ChatListProps {
  users: User[];
  onSelectUser: (user: User) => void;
}

const ChatList: React.FC<ChatListProps> = ({ onSelectUser }) => {
  const selectedUser = useUser((state) => state.selectedUser);
  const currentUser = useUser((state) => state.currentUser);
  const onlineUsers = useUser(state => state.onlineUsers)

  const filteredUsers = useMemo(() => {
    return onlineUsers.filter((user) => user.id !== currentUser?.id);
  }, [onlineUsers, currentUser]);

  return (
    <div className="w-full p-4 bg-white shadow-md">
      <h2 className="text-xl font-bold mb-4">Chats</h2>
      <ul>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <li
              key={user.id}
              className={`p-2 border-b cursor-pointer ${
                user.id === selectedUser?.id
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  :  "hover:bg-gray-100"
              }`}
              onClick={() => onSelectUser(user)}
            >
              {user.username}
            </li>
          ))
        ) : (
          <p className="text-gray-500">No online users</p>
        )}
      </ul>
    </div>
  );
};

export default React.memo(ChatList);
