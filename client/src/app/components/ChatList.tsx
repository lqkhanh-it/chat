import { User } from "@nx-chat-assignment/shared-models";

function ChatList({ users, onSelectUser }: { users: User[]; onSelectUser: (user: User) => void }) {
  return (
    <div className="w-1/4 p-4 bg-white shadow-md">
      <h2 className="text-xl font-bold mb-4">Chats</h2>
      <ul>
        {users?.map((user) => (
          <li
            key={user.id}
            className="p-2 border-b cursor-pointer hover:bg-gray-100"
            onClick={() => onSelectUser(user)}
          >
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
}


export default ChatList;
