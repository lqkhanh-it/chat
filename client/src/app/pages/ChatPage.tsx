import { useEffect, useState, useRef } from "react";
import { Menu, ArrowLeftFromLine} from "lucide-react";
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
  const [isChatListOpen, setIsChatListOpen] = useState(false);
  const chatListRef = useRef<HTMLDivElement>(null); // Ref for sidebar

  useEffect(() => {
    fetchCurrentUser();
    setLoading(false);
  }, [fetchCurrentUser]);

  useEffect(() => {
    if (!currentUser && !loading) {
      navigate("/login");
    }
  }, [navigate, currentUser, loading]);

  // Click outside to close chat list
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (chatListRef.current && !chatListRef.current.contains(event.target as Node)) {
        setIsChatListOpen(false);
      }
    }
    if (isChatListOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isChatListOpen]);

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
        <div
          ref={chatListRef}
          className={`fixed inset-y-0 left-0 z-50 w-3/4 max-w-xs bg-white p-4 shadow-md transition-transform duration-300 md:relative md:w-1/4 
          ${isChatListOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        >
        
          {currentUser && (
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Logged in as {currentUser.username}</h2>
              <LogoutButton />
            </div>
          )}
          <ChatList onSelectUser={(user) => {
            setSelectedUser(user);
            setIsChatListOpen(false);
          }} />
            <button
            onClick={() => setIsChatListOpen(false)}
            className="absolute bottom-3 right-3 md:hidden text-gray-600 hover:text-gray-900"
          >
            <ArrowLeftFromLine className="w-8 h-8" />
          </button>

        </div>

        <div className="w-full md:w-3/4 p-4 bg-gray-100 flex flex-col">
          <button
            onClick={() => setIsChatListOpen(true)}
            className="md:hidden p-2 bg-blue-500 text-white rounded-lg flex items-center mb-2"
          >
            <Menu className="h-6 w-6 mr-2" /> Chats
          </button>

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
