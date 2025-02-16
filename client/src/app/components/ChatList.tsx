import React, { useMemo } from "react";
import { User } from "@nx-chat-assignment/shared-models";
import useUser from "../hooks/useUser";

interface ChatListProps {
  users: User[];
  onSelectUser: (user: User) => void;
}

const ChatList: React.FC<ChatListProps> = ({ users, onSelectUser }) => {
  const currentUser = useUser((state) => state.currentUser);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => user.id !== currentUser?.id);
  }, [users, currentUser]);

  return (
    <div className="w-full p-4 bg-white shadow-md">
      <h2 className="text-xl font-bold mb-4">Chats</h2>
      <ul>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <li
              key={user.id}
              className="p-2 border-b cursor-pointer hover:bg-gray-100"
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
