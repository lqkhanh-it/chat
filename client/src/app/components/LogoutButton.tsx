import { useNavigate } from "react-router-dom";
import useChatStore from "../hooks/useChatStore";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useChatStore();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate('/login');
  };

  return (
    <button className="p-2 bg-red-500 text-white rounded" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
