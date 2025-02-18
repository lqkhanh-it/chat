import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import useNotification from "../../hooks/useNotification";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useUser();
  const { addNotification } = useNotification();


  const handleLogout = () => {
    if (!currentUser) {
      addNotification("You are not logged in.");
      return;
    };
    logout()
    navigate('/login');
  };

  return (
    <button
    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all"
    onClick={handleLogout}
  >
    <LogOut size={20} />
    <span>Logout</span>
  </button>
  );
};

export default LogoutButton;
