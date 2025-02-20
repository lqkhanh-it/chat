import { useEffect, useState } from "react";
import ChatList from "../components/ChatList";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/atoms/LogoutButton";
import ChatBox from "../components/ChatBox";
import Notification from "../components/Notification";

function ChatPage() {
  const navigate = useNavigate();
  const currentUser = useUser((state) => state.currentUser);
  const selectedUser = useUser((state) => state.selectedUser);
  const { fetchCurrentUser, setSelectedUser } = useUser();
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCurrentUser();
    setLoading(false);
  }, [fetchCurrentUser]);

  useEffect(() => {
    if (!currentUser && !loading) {
      navigate("/login");
    }
  }, [navigate, currentUser, loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">Loading chat...</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex w-screen h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="w-1/4 bg-white p-4 shadow-md flex flex-col">
          {currentUser && (
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Logged in as {currentUser.username}</h2>
              <LogoutButton />
            </div>
          )}
          <ChatList onSelectUser={setSelectedUser} />
        </div>

        {/* Chat Area */}
        <div className="w-3/4 p-4 bg-gray-100 flex flex-col">
          <div className="flex-1 overflow-hidden">
            {selectedUser ? (
              <ChatBox selectedUser={selectedUser} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>Select a user to start chatting</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Notification />
    </>
  );
}

export default ChatPage;
